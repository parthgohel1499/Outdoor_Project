import mongoose from 'mongoose';

const bookSchema = mongoose.Schema({

    b_author: { type: String, required: false },
    b_price: { type: Number, required: false },
    b_qty: { type: Number, required: false }

})

const bookDetailSchema = mongoose.Schema({
    bookName: { type: String, required: true },
    bookData: [bookSchema],
    realeaseDate: { type: Date, required: true },
    language: { type: String, required: true },
})

const DemoModel = mongoose.model('DemoModel', bookDetailSchema);
module.exports = DemoModel;
