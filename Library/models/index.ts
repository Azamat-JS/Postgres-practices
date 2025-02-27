import Author from "./author.model";
import Book from "./book.model";

Author.hasMany(Book, { foreignKey: "authorId", as: "books" });
Book.belongsTo(Author, { foreignKey: "authorId", as: "author" });

export { Author, Book };
