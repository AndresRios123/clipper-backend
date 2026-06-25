//Schema y modelo del usuario
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    rol: {
        type: String,
        enum: ['admin', 'barbero'],
        default: 'barbero'
    },
    activo: {
        type: Boolean,
        default: true
    },
    barberia: {
        type: mongoose.Schema.ObjectId,
        ref: 'Barbershop'
    }
},
{timestamps: true});


userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next()
        this.password = await bcrypt.hash(this.password, 12)
})

userSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password)
}

const User = mongoose.model('User', userSchema);

module.exports = User;