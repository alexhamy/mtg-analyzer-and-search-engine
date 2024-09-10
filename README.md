# mtg-analyzer-and-search-engine

A search engine and analyzer for Magic: The Gathering cards built using MongoDB, Express, and Node as the back-end and Vue.js as the front-end

The data was retrieved from https://scryfall.com/docs/api/bulk-data 

To install the node modules run "npm install" in both the server and vue-js-client-crud folder. To start the database, run "node server.js". To start the front end, run "npm run serve".

You will have to host your database or change the URL in config/db.config.js

## Current Features:
- Card Search by name and language
- Front and back-end pagination
- Display of card details
- Aggregation of the card copies and cards in the same set using MongoDB

## To Add:
- Realtime data of expected value for booster packs of each set
- Analytics of each set, ranging from the amount of commons and rares to the average cost of each rarity
- Advanced search component similar to Scryfall
