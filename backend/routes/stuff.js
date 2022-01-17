const express = require("express");
const router = express.Router();

const stuffCtrl = require("../controllers/stuff");
const auth = require("../middleware/auth");
const multer = require('../middleware/multer-config');
router.post('/', auth, multer, stuffCtrl.createThing);

router.get("/", auth, stuffCtrl.getAllStuff);
router.get("/:id", auth, multer, stuffCtrl.getOneThing);
router.put("/:id", auth, multer, stuffCtrl.modifyThing);
router.delete("/:id", auth, multer, stuffCtrl.deleteThing);

module.exports = router;
