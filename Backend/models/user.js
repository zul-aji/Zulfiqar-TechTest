import { Schema, model } from 'mongoose'

const userSchema = new Schema({
    nama: {
        type: String,
        required: true
    },
    tempat_lahir: {
        type: String,
        required: false
    },
    tanggal_lahir: {
        type: Date,
        required: false
    },
    jenis_kelamin: {
        type: String,
        required: true
    },
    telepon: {
        type: String,
        required: false
    },
    whatsapp: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }
})

export default model('User', userSchema)