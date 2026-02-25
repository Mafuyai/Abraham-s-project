const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); 

const UserSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        otp: {
            type: String,
        },
        // fallbackotp: {
        //     type: String
        // },
        otpExpiry: {
            type: Date,
        },
        isVerified: {
            type: Boolean,
            default: false,
        },
        gender: {
            type: String,
            enum: ['Men', 'Women'],
        },
        ageRange: {
            type: String,
        },
        profileCompleted: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

// Hash password before saving
UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

// Method to compare passwords
UserSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model('User', UserSchema);

const ProductSchema = new mongoose.Schema({
    name: String,
    price: Number,
    description: String,
    image: String,
});

const Product = mongoose.model('Product', ProductSchema);

module.exports = { User, Product };