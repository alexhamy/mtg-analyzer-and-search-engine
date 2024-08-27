module.exports = app => {
    const mtg = require("../controllers/mtg.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Card
    router.post("/", mtg.create);
  
    // Retrieve all Cards matching string
    router.get("/", mtg.findAll);
 
    // Retrieve a single Card with id
    router.get("/:id", mtg.findOne);
  
    // Update a Card with id
    router.put("/:id", mtg.update);
  
    // Delete a Card with id
    router.delete("/:id", mtg.delete);
  
    app.use('/api/mtg', router);
  };