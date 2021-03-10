import mongoose from 'mongoose';
mongoose.set('useCreateIndex', true);

const RegSchema = mongoose.Schema({

    isAdmin: { type: Boolean, default: false, required: true },
    isDeleted: { type: Boolean, default: false, required: true },
    username: { type: String, required: true },
    mobile: { type: Number, required: true },
    dob: { type: Date, required: true },
    email: { type: String, required: true, unique: true },
    gender: { type: String, required: true },
    resetToken: { type: String, required: false, default: null },
    isVerified: { default: false },
    password: { type: Object, required: true },

}, { timestamps: true, versionKey: false });


RegSchema.statics.checkEmail = async function (query) {
    try {
        return await RegModel.findOne(query);
    } catch (error) {
        return { error: error };
    }
};

RegSchema.statics.verifyAndModify = async function (filter, update) {
    try {
        return await RegModel.findOneAndUpdate(filter, update);
    } catch (error) {
        return { error: error };
    }
};

RegSchema.statics.verifyIdAndModify = async function (filter, update) {
    try {
        return await RegModel.findByIdAndUpdate(filter, update);
    } catch (error) {
        return { error: error };
    }
};

RegSchema.statics.CheckById = async function (query) {
    try {
        return await RegModel.findById(query);
    } catch (error) {
        return { error: error };
    }
};

RegSchema.statics.findData = async function () {
    try {
        return await RegModel.find().sort({ createdAt: -1 });
    } catch (error) {
        return { error: error };
    }
};

RegSchema.statics.findAndDelete = async function (query) {
    try {
        return await RegModel.findByIdAndRemove(query);
    } catch (error) {
        return { error: error };
    }
};

RegSchema.statics.modifyOne = async function (filter, update) {
    try {
        return await RegModel.updateOne(filter, update);
    } catch (error) {
        return { error: error };
    }
};

const RegModel = mongoose.model('RegSchema', RegSchema);
export { RegModel }


