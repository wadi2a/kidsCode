const mongoose = require('mongoose');
const jwt = require('jwt-simple');
const config = require('../config/config');
let historiqueSchema = mongoose.Schema({

	user: {
		type: String,
		lowercase: true,
		required: true
	},
	score: {
		type: String,
		lowercase: true,
		required: true
	},
	gain: {
		type: String,
		lowercase: true,
		required: true
	},
	map: {
		type: String,
		lowercase: true,
		required: true
	},
	date: {
		type: String,
		Uppercase: true,
		required: true
	},
},{ timestamps: { createdAt: 'created_at' }})


historiqueSchema.methods = {

	getUtilisateur: function () {
		return jwt.encode(this.user,config);
	},
	getScore: function () {
		return this.score;
	},
	getMap: function () {
		return this.map;
	},
	getGain: function () {
		return this.gain;
	},
	getDate: function () {
		return this.date;
	},

}

module.exports = mongoose.model('Historique', historiqueSchema);