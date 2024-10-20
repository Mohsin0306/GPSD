// models/Principal.js
const mongoose = require('mongoose');

const PrincipalSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
    uniqueCode: { type: String, required: true }, // e.g., 'Mohsin0307'
});

module.exports = mongoose.model('Principal', PrincipalSchema);
