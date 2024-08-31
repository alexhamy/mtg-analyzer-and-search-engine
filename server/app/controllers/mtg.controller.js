const db = require("../models");
const mongoose = require('mongoose');
const Mtg = db.MtgCard;

exports.create = (req, res) => {
    // Create a new MTG card instance
    const mtg = new Mtg({
        _id: new mongoose.Types.ObjectId(),
        object: req.body.object,
        id: req.body.id,
        oracle_id: req.body.oracle_id,
        multiverse_ids: req.body.multiverse_ids,
        name: req.body.name,
        printed_name: req.body.printed_name,
        lang: req.body.lang,
        released_at: req.body.released_at,
        uri: req.body.uri,
        scryfall_uri: req.body.scryfall_uri,
        layout: req.body.layout,
        highres_image: req.body.highres_image,
        image_status: req.body.image_status,
        image_uris: req.body.image_uris,
        mana_cost: req.body.mana_cost,
        cmc: req.body.cmc,
        type_line: req.body.type_line,
        printed_type_line: req.body.printed_type_line,
        oracle_text: req.body.oracle_text,
        printed_text: req.body.printed_text,
        power: req.body.power,
        toughness: req.body.toughness,
        colors: req.body.colors,
        color_identity: req.body.color_identity,
        keywords: req.body.keywords,
        legalities: req.body.legalities,
        games: req.body.games,
        reserved: req.body.reserved,
        foil: req.body.foil,
        nonfoil: req.body.nonfoil,
        finishes: req.body.finishes,
        oversized: req.body.oversized,
        promo: req.body.promo,
        reprint: req.body.reprint,
        variation: req.body.variation,
        set_id: req.body.set_id,
        set: req.body.set,
        set_name: req.body.set_name,
        set_type: req.body.set_type,
        set_uri: req.body.set_uri,
        set_search_uri: req.body.set_search_uri,
        scryfall_set_uri: req.body.scryfall_set_uri,
        rulings_uri: req.body.rulings_uri,
        prints_search_uri: req.body.prints_search_uri,
        collector_number: req.body.collector_number,
        digital: req.body.digital,
        rarity: req.body.rarity,
        card_back_id: req.body.card_back_id,
        artist: req.body.artist,
        artist_ids: req.body.artist_ids,
        illustration_id: req.body.illustration_id,
        border_color: req.body.border_color,
        frame: req.body.frame,
        full_art: req.body.full_art,
        textless: req.body.textless,
        booster: req.body.booster,
        story_spotlight: req.body.story_spotlight,
        edhrec_rank: req.body.edhrec_rank,
        penny_rank: req.body.penny_rank,
        prices: req.body.prices,
        related_uris: req.body.related_uris,
        purchase_uris: req.body.purchase_uris
    });

    // Save the MTG card in the database
    mtg.save()
        .then(data => {
            res.status(201).send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the card."
            });
        });
};


// Retrieve all Cards matching the string from the database.
exports.findAll = (req, res) => {
    let condition = {};

    // Loop through all query parameters and build the condition object
    Object.keys(req.query).forEach((key) => {
        const value = req.query[key];
        if (value) {
            // Check the type of the field in the schema
            const schemaType = Mtg.schema.path(key).instance;

            if (schemaType === 'String') {
                // Use regex for string fields
                condition[key] = { $regex: new RegExp(value), $options: "i" };
            } else if (schemaType === 'Number') {
                // Convert to number for number fields
                condition[key] = Number(value);
            } else if (schemaType === 'Boolean') {
                // Convert to boolean for boolean fields
                condition[key] = value.toLowerCase() === 'true';
            } else if (schemaType === 'Array' || schemaType === 'Embedded') {
                // Handle array or embedded objects (nested objects)
                try {
                    const parsedValue = JSON.parse(value);
                    if (Array.isArray(parsedValue)) {
                        condition[key] = { $all: parsedValue };
                    } else if (typeof parsedValue === 'object') {
                        condition[key] = parsedValue;
                    }
                } catch (e) {
                    // Handle as string if JSON parsing fails
                    condition[key] = { $regex: new RegExp(value), $options: "i" };
                }
            }
        }
    });

    Mtg.find(condition)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving cards."
            });
        });
};



// Find a single Card with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Mtg.findById(id)
        .then(data => {
            if(!data)
                res.status(404).send({ message: "Not found Card with ID " + id})
            else res.send(data)
        })
        .catch(err =>{
            res 
                .status(500)
                .send({ message :"Error retrieving Card with id=" + id});
        });
};

// Update a Card by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
      return res.status(400).send({
        message: "Data to update can not be empty!"
      });
    }
  
    const id = req.params.id;
    Mtg.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
            res.status(404).send({
                message: `Cannot update Card with id=${id}. Maybe Card was not found!`
            });
            } else res.send({ message: "Card was updated successfully." });
        })
        .catch(err => {
            res.status(500).send({
            message: "Error updating Card with id=" + id
            });
        });
  };

exports.delete = (req, res) => {
  const id = req.params.id;

  Mtg.findByIdAndDelete(id)
    .then(data => {
        if (!data) {
            res.status(404).send({
            message: `Cannot delete Card with id=${id}. Maybe Card was not found!`
            });
        } else {
            res.send({
            message: "Card was deleted successfully!"
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Could not delete Card with id=" + id
        });
    });
};
