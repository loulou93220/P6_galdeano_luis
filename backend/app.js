//Appel des despendances et framework
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");

const stuffRoutes = require("./routes/stuff");
const userRoutes = require("./routes/user");
const useXssClean = require("xss-clean");
const useSanitize = require("express-mongo-sanitize");

// Connection à la base de donnée MongoDB
mongoose
  .connect(
    "mongodb+srv://clolou:Lun713705@cluster0.lunmx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

const app = express();

//Mise en conformité du CORS de sécurité
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use(express.json());

//Sécurité de la base de donnée
app.use(useSanitize());
app.use(useXssClean());

app.use("/images", express.static(path.join(__dirname, "images")));

//Appel des routes
app.use("/api/stuff", stuffRoutes);
app.use("/api/auth", userRoutes);
app.use("/api/sauces", stuffRoutes);

module.exports = app;
