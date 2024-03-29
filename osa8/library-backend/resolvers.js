const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')

const { GraphQLError } = require('graphql')
const jwt = require('jsonwebtoken')

const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()

const resolvers = {
    Query: {
      bookCount: async () => Book.collection.countDocuments(),
      authorCount: () => Author.collection.countDocuments(),
      allBooks: async (root, args) => {
       if(args.author && args.genre) {
          const author = await Author.findOne({name: args.author})
          return Book.find({author: author.id, genres: args.genre})
        }else if(args.author) {
          const author = await Author.findOne({name: args.author})
          return Book.find({author: author.id})
        }else if(args.genre) {
          return Book.find({genres: args.genre})
        }else{
          return Book.find({})
        }
      },
      allAuthors: async () => Author.find({}),
      me: (root, args, context) => {
        return context.currentUser
      }
    },
    Author: {
      bookCount: async (root) => {
        const books = await Book.find({author: root.id})
        return books.length
      }
    },
    Book: {
      author: async (root) => {
        const author = await Author.findOne({_id: root.author.toString()})
        return {
          name: author.name,
          born: author.born,
        }
      }
    },
    Mutation: {
      addBook: async (root, args, context) => {
        const currentUser = context.currentUser
  
        if(!currentUser) {
          throw new GraphQLError('not authenticated', {
            extensions: {
              code: 'BAD_USER_INPUT'
            }
          })
        }
  
        let author = await Author.findOne({name: args.author})
        
        if(!author) {
          const newAuthor = new Author({
              name: args.author
            })
          
          try{
            await newAuthor.save()
          }catch (error) {
            throw new GraphQLError('Saving author failed', {
              extensions: {
                code: 'BAD_USER_INPUT', 
                invalidArgs: args.author, 
                error
              }
            })
          }
          
          author = await Author.findOne({name: args.author})   
        }
        
        const book = new Book({ ...args, author: author.id })
       
        try{
          await book.save()  
        } catch (error) {
          throw new GraphQLError('Saving book failed', {
            extensions: {
              code: 'BAD_USER_INPUT', 
              invalidArgs: args.title, 
              error
            }
          })
        }
        
        pubsub.publish('BOOK_ADDED', {bookAdded: book})

        return book
      },
      editAuthor: async (root, args, context) => {
        const currentUser = context.currentUser
  
        if(!currentUser) {
          throw new GraphQLError('not authenticated', {
            extensions: {
              code: 'BAD_USER_INPUT'
            }
          })
        }
        
        const author = await Author.findOne({name: args.name})
      
        if(!author) {
          return null
        }
  
        author.born = args.setBornTo
        return author.save()
      },
      createUser: async (root, args) => {
        const user = new User({ username: args.username, favoriteGenre: args.favoriteGenre })
    
        return user.save()
          .catch(error => {
            throw new GraphQLError('Creating the user failed', {
              extensions: {
                code: 'BAD_USER_INPUT',
                invalidArgs: args.name,
                error
              }
            })
          })
      },
      login: async (root, args) => {
        const user = await User.findOne({ username: args.username })
    
        if ( !user || args.password !== 'secret' ) {
          throw new GraphQLError('wrong credentials', {
            extensions: {
              code: 'BAD_USER_INPUT'
            }
          })        
        }
    
        const userForToken = {
          username: user.username,
          id: user._id,
        }
    
        return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
      }
    },
    Subscription: {
        bookAdded: {
          subscribe: () => pubsub.asyncIterator('BOOK_ADDED')
        },
      },
  }

  module.exports = resolvers