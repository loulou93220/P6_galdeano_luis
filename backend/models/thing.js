const mongoose = require("mongoose");

const thingSchema = mongoose.Schema({
  likes: { type: Number },
  dislikes: { type: Number },
  usersLiked: { type: String },
  usersDisliked: { type: String },
  email: { type: String },
  password: { type: String },
  name: { type: String, required: true},
    manufacturer: { type: String, required: true},
    description: { type: String, required: true},
    heat: { type: Number, required: true},
    likes: { type: Number, required: false, default: 0 },
    dislikes: { type: Number, required: false, default:0 },
    imageUrl: { type: String, required: true },
    mainPepper: { type: String, required: true},
    usersLiked: { type: [String], required: false, defaultValue:[]},
    usersDisliked: { type: [String], required: false, defaultValue:[]},
    userId: { type: String, required: true },
     // FIN DE MODIF
});

module.exports = mongoose.model("Thing", thingSchema);
