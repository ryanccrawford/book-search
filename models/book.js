const mongoose = require("mongoose")
console.log(mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/googlebooks"));
const Schema = mongoose.Schema;

const bookSchema = new Schema({
    title: { type: String, required: true },
    author: { type: String, required: false },
    link: { type: String, required: true },
    image: { type: String, required: false },
    date: { type: Date, default: Date.now }
});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
