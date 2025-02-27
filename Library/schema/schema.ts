import { parseArgs } from "node:util";
import Author from "../models/author.model";
import Book from "../models/book.model";

import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
  GraphQLEnumType,
  GraphQLFloat,
  GraphQLInt,
} from "graphql";

// //////----------------Author type

const AuthorResponseType = new GraphQLObjectType({
  name: "AuthorResponseType",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    message: { type: GraphQLString },
    statusCode: { type: GraphQLInt },
  }),
});

///----------------- Book type
const BookResponseType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    price: { type: GraphQLFloat },
    author: {
        type: AuthorResponseType,
        async resolve(parent, args) {
          console.log("Fetching author for book:", parent.authorId);
          return await Author.findByPk(parent.authorId);
        },
      },      
    message: { type: GraphQLString },
    statusCode: { type: GraphQLInt },
  }),
});

/////////------------ Root query

const RootQuery = new GraphQLObjectType({
  name: "RootQuery",
  fields: {
    authors: {
      type: new GraphQLList(AuthorResponseType),
      resolve(parent, args) {
        return Author.findAll();
      },
    },

    author: {
      type: AuthorResponseType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Author.findByPk(args.id);
      },
    },

    books: {
      type: new GraphQLList(BookResponseType),
      resolve(parent, args) {
        return Book.findAll();
      },
    },

    book: {
      type: BookResponseType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Book.findByPk(args.id);
      },
    },
  },
});

/// -----------------Mutations

const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    //- Add author
    addAuthor: {
      type: AuthorResponseType,
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
      },
      async resolve(parent, args) {
        const author = await Author.create({ name: args.name });
        return {id:author.id, name:author.name, message:'Author added successfully', statusCode: 201};
      },
    },

    //- Update Author
    updateAuthor: {
      type: AuthorResponseType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
        name: { type: GraphQLNonNull(GraphQLString) },
      },
      async resolve(parent, args) {
        const author = await Author.findByPk(args.id);
        if (!author) {
          return { message: "Author not found", statusCode: 404 };
        }
        return author?.update({ name: args.name });
      },
    },
    // - Delete Author
    deleteAuthor: {
      type: AuthorResponseType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
      },
      async resolve(parent, args) {
        const author = await Author.findByPk(args.id);
        if (!author) {
          return { message: "Author not found", statusCode: 404 };
        }
        await Author.destroy({ where: { id: args.id } });
        return {id:args.id, message: "Author deleted successfully", statusCode: 200 };
      },
    },

    // -- addBook
    addBook: {
      type: BookResponseType,
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        price: { type: GraphQLNonNull(GraphQLFloat) },
        authorId: { type: GraphQLNonNull(GraphQLID) },
      },
      async resolve(parent, args) {
try {
    const author = await Author.findByPk(args.authorId);
    if (!author) {
      return { message: "Author not found", statusCode: 404 };
    }

    return Book.create({
      name: args.name,
      price: args.price,
      authorId: args.authorId,
    });
} catch (error) {
    return { message: "Error adding book", statusCode: 500 };
}
      },
    },

    //- delete book

    deleteBook:{
        type: BookResponseType,
        args:{
            id: {type: GraphQLNonNull(GraphQLID)}
        },
        async resolve(parent, args){
            const book = await Book.findByPk(args.id)
            if(!book){
                return {message: 'Book not found', statusCode: 404}
            }
            await Book.destroy({where: {id: args.id}})
            return {message: 'Book deleted successfully', statusCode: 200}
        }
    },

    //- update book
   updateBook: {
    type: BookResponseType,
    args:{
        id: {type: GraphQLNonNull(GraphQLID)},
        name: {type: GraphQLString},
        price: {type: GraphQLFloat},
        authorId: {type: GraphQLID}
    },
   async resolve(parent, args){
        const book = await Book.findByPk(args.id)
        if(!book){
            return {message: 'Book not found', statusCode: 404}
        }
       return book?.update({
            name: args.name,
            price: args.price,
            authorId: args.authorId
        })

    }
   }
    
  },
});

export default new GraphQLSchema({
  query: RootQuery,
  mutation,
});
