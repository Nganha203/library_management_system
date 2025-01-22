const mongoose = require('mongoose');
var mongoose_delete = require('mongoose-delete');

const bookSchema = new mongoose.Schema({
    title: String,
    category: String,
    author: String,
    image: String,
    isBorrowed: { type: Boolean, default: false },
    borrowedBy: { type: String, default: null }, 
    borrowedAt: { type: Date, default: null },
    dueDate: { type: Date, default: null }, 
});

bookSchema.plugin(mongoose_delete, { deletedAt: true, overrideMethods: 'all' });
const Book = mongoose.model('book', bookSchema);

module.exports = Book;
