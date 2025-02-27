import Author from '../models/author.model'
import Book from '../models/book.model'

import {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull,
    GraphQLEnumType,
    GraphQLFloat
  } from 'graphql';
  

  const AuthorType = new GraphQLObjectType({
    name: 'writer',
    fields: () => ({
      id: { type: GraphQLID },
      name: { type: GraphQLString }
    })
});


const BookType = new GraphQLObjectType({
    name: "Book",
    fields: () =>({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        price: {type: GraphQLFloat},
        author: {type: AuthorType,
            resolve(parent, args){
                return Author.findByPk(parent.authorId)
            }
        }
    })
})

const RootQuery = new GraphQLObjectType({
    name: "RootQuery",
    fields: {
        authors: {
            type: new GraphQLList(AuthorType),
            resolve(parent, args){
                return Author.findAll()
            },
        },
        
        author: {
            type: AuthorType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args){
                return Author.findByPk(args.id)
            },
        },

        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args){
                return Book.findAll()
            },
        },

        book: {
            type: BookType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args){
                return Book.findByPk(args.id)
            }
        }
    }
})

export default new GraphQLSchema({
    query: RootQuery
})