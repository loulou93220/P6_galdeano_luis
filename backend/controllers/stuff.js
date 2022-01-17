const Thing = require('../models/thing');

exports.createThing = (req, res, next) => {
  const {
        name, manufacturer, description, mainPepper, heat, userId
    } = JSON.parse(req.body.sauce);
    if(!name || !req.file || !manufacturer || !description || !mainPepper
        || !heat
        || !userId) {
        return res.status(400).json({ message: "Bad request !"});
    }

    const thingObject = JSON.parse(req.body.sauce); 
    delete thingObject._id; 
    const sauce = new Thing({
        ...thingObject, 
        imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`, 
        likes: 0,
        dislikes: 0,
        usersLiked: [],
        usersDisLiked: []
    });
    sauce
        .save() 
        .then(() => res.status(201).json({ message: `Votre sauce est enregistrée !` }))
        .catch((error) => res.status(500).json({ error }));
};


exports.getOneThing = (req, res, next) => {
  Thing.findOne({
    _id: req.params.id
  }).then(
    (thing) => {
      res.status(200).json(thing);
    }
  ).catch(
    (error) => {
      res.status(404).json({
        error: error
      });
    }
  );
};

exports.modifyThing = (req, res, next) => {
  const thing = new Thing({
    _id: req.params.id,
    name: req.body.name,
    manufacturer: req.body.manufacturer,
    description: req.body.description,
    mainPepper: req.body.mainPepper,
    imageUrl: req.body.imageUrl,
    heat: req.body.heat,
    likes: req.body.likes,
    dislikes: req.body.dislikes,
    usersLiked: req.body.usersLiked,
    usersDisliked: req.body.usersDisliked,
  });
  Thing.updateOne({_id: req.params.id}, thing).then(
    () => {
      res.status(201).json({
        message: 'Thing updated successfully!'
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};

exports.deleteThing = (req, res, next) => {
  Thing.deleteOne({_id: req.params.id}).then(
    () => {
      res.status(200).json({
        message: 'Deleted!'
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};

exports.getAllStuff = (req, res, next) => {
  Thing.find().then(
    (things) => {
      res.status(200).json(things);
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};