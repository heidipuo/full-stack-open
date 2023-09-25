const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')


const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
const Book = require('./models/book')
const Author = require('./models/author')

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
    authorCount: () => authors.length,
    allBooks: async (root, args) => {
      return Book.find({})

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
      
      if(!author) {
        const newAuthor = new Author({
            name: args.author
          })
        newAuthor.save()
        author = await Author.findOne({name: args.author})   
      }
      
      const book = new Book({ ...args, author: author.id })
      return book.save()    
    },
    editAuthor: (root, args) => {
      const author = authors.find(author => author.name === args.name)
      if(!author) {
        return null
      }

      const updatedAuthor = {...author, born: args.setBornTo}
      authors = authors.map(author => author.name === args.name ? updatedAuthor : author)
      return updatedAuthor
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