//Création des routes

const express = require("express");
const router = express.Router();
const stuffCtrl = require("../controllers/stuff");
const auth = require("../middleware/auth");
const multer = require('../middleware/multer-config');

router.post('/', auth, multer, stuffCtrl.createThing);
router.get("/", auth, stuffCtrl.getAllStuff);
router.get("/:id", auth, multer, stuffCtrl.getOneThing);
router.put("/:id", auth, multer, stuffCtrl.modifyThing);
router.delete("/:id", auth, stuffCtrl.deleteThing);
router.post("/:id/like", auth, stuffCtrl.likeDislikeThing);


module.exports = router;
