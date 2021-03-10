import mongoose from 'mongoose';
mongoose.set('useCreateIndex', true);

const Orders = mongoose.Schema({

    FirstName: { type: String, required: true },
    LastName: { type: String, required: true },
    Address: { type: String, required: true },
    Discription: { type: String, required: true },
    Image: { type: String, default: null, required: true },
    Category: { type: mongoose.Schema.Types.ObjectId, default: null, required: true, ref: 'hordingsCategory' },
    OrderStatus: { type: Boolean, default: false, required: true },
    Area: { type: mongoose.Schema.Types.ObjectId, default: null, required: false, ref: 'areaModel' },
    Package: { type: mongoose.Schema.Types.ObjectId, default: null, required: true, ref: 'Packages' },

}, { timestamps: true, versionKey: false });

const OrderModel = mongoose.model('Orders', Orders);

export default OrderModel;