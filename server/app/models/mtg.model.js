const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const CardSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  object: { type: String },
  id: { type: String },
  oracle_id: { type: String },
  multiverse_ids: [{ type: Number }],
  name: { type: String },
  printed_name: { type: String }, 
  lang: { type: String },
  released_at: { type: Date },
  uri: { type: String },
  scryfall_uri: { type: String },
  layout: { type: String },
  highres_image: { type: Boolean },
  image_status: { type: String },
  image_uris: {
    small: { type: String },
    normal: { type: String },
    large: { type: String },
    png: { type: String },
    art_crop: { type: String },
    border_crop: { type: String }
  },
  mana_cost: { type: String },
  cmc: { type: Number },
  type_line: { type: String },
  printed_type_line: { type: String }, 
  oracle_text: { type: String },
  printed_text: { type: String }, 
  power: { type: String }, 
  toughness: { type: String }, 
  colors: [{ type: String }],
  color_identity: [{ type: String }],
  keywords: [{ type: String }],
  legalities: {
    standard: { type: String },
    future: { type: String },
    historic: { type: String },
    timeless: { type: String },
    gladiator: { type: String },
    pioneer: { type: String },
    explorer: { type: String },
    modern: { type: String },
    legacy: { type: String },
    pauper: { type: String },
    vintage: { type: String },
    penny: { type: String },
    commander: { type: String },
    oathbreaker: { type: String },
    standardbrawl: { type: String },
    brawl: { type: String },
    alchemy: { type: String },
    paupercommander: { type: String },
    duel: { type: String },
    oldschool: { type: String },
    premodern: { type: String },
    predh: { type: String }
  },
  games: [{ type: String }],
  reserved: { type: Boolean },
  foil: { type: Boolean },
  nonfoil: { type: Boolean },
  finishes: [{ type: String }],
  oversized: { type: Boolean },
  promo: { type: Boolean },
  reprint: { type: Boolean },
  variation: { type: Boolean },
  set_id: { type: String },
  set: { type: String },
  set_name: { type: String },
  set_type: { type: String },
  set_uri: { type: String },
  set_search_uri: { type: String },
  scryfall_set_uri: { type: String },
  rulings_uri: { type: String },
  prints_search_uri: { type: String },
  collector_number: { type: String },
  digital: { type: Boolean },
  rarity: { type: String },
  card_back_id: { type: String },
  artist: { type: String },
  artist_ids: [{ type: String }],
  illustration_id: { type: String },
  border_color: { type: String },
  frame: { type: String },
  full_art: { type: Boolean },
  textless: { type: Boolean },
  booster: { type: Boolean },
  story_spotlight: { type: Boolean },
  edhrec_rank: { type: Number }, // Added
  penny_rank: { type: Number }, // Added
  prices: {
    usd: { type: String, default: null },
    usd_foil: { type: String, default: null },
    usd_etched: { type: String, default: null },
    eur: { type: String, default: null },
    eur_foil: { type: String, default: null },
    tix: { type: String, default: null }
  },
  related_uris: {
    gatherer: { type: String },
    tcgplayer_infinite_articles: { type: String },
    tcgplayer_infinite_decks: { type: String },
    edhrec: { type: String }
  },
  purchase_uris: {
    tcgplayer: { type: String },
    cardmarket: { type: String },
    cardhoarder: { type: String }
  }
});

CardSchema.plugin(mongoosePaginate);

const MtgCard = mongoose.model('MtgCard', CardSchema);

module.exports = MtgCard;