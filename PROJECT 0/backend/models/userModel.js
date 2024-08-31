import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['User', 'Admin'],
        default: 'User'
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
},);

userSchema.pre('save', async function (next) {

    if (!this.isModified('password')) {
        next();
    }

    const salt = await bcrypt.genSalt(10);
    
    this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}

userSchema.virtual('reviews', {
    ref: 'Review',
    foreignField: 'user',
    localField: '_id'
})

const User = mongoose.model('User', userSchema);

export default User;