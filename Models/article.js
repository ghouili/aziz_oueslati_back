const mongoose = require('mongoose');

const articleSchema = mongoose.Schema({
    serial_number: { type: Number, required: true },
    nom: { type: String, required: true },
    etat: { type: String, required: true },
    date: { type: String, required: true },
    place: { type: String, required: true },
    userid:{ type: mongoose.Types.ObjectId, required: true, ref: "user" },
});

module.exports = mongoose.model('article', articleSchema);