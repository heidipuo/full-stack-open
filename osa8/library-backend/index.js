const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')


const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
const Book = require('./models/book')
const Author = require('./models/author')
const { GraphQLError } = require('graphql')

require('dotenv').config()

const MONGODB_URI = 'mongodb+srv://puotiniemiheidi:almajaReino2020@cluster0.dmd09uj.mongodb.net/libraryApp?retryWrites=true&w=majority'

console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

const typeDefs = `
  
type Author {
  name: String!
  born: Int
  id: ID!
  bookCount: Int!
}

type Book {
  title: String!
  published: Int!
  author: Author!
  id: ID!
  genres: [String!]!
}

type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }

type Mutation {
  addBook(
    title: String!
    author: String!
    published: Int!
    genres: [String]!
  ): Book
  editAuthor(
    name: String!
    setBornTo: Int!
  ): Author
}
`

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      console.log(args.genre)
     if(args.author && args.genre) {
        const author = await Author.findOne({name: args.author})
        return Book.find({author: author.id, genres: args.genre})
      }else if(args.author) {
        const author = await Author.findOne({name: args.author})
        return Book.find({author: author.id})
      }else if(args.genre) {
        return Book.find({genres: args.genre})
      }else{
        console.log(Book.find({}))
        return Book.find({})
      }
    },
    allAuthors: async () => Author.find({})
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
    addBook: async (root, args) => {
      let author = await Author.findOne({name: args.author})
      console.log(author)
      if(!author) {
        const newAuthor = new Author({
            name: args.author
          })
        
        try{
          newAuthor.save()
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
      
      return book
    },
    editAuthor: async (root, args) => {
      const author = await Author.findOne({name: args.name})
    
      if(!author) {
        return null
      }

      author.born = args.setBornTo
      return author.save()
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})