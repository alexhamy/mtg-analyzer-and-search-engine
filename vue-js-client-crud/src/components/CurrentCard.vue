<template>
  <div>
    <div v-if="currentCard" class="card-container">
      <div class="card-image">
        <img :src="currentCard.image_uris.normal" alt="Card image" />
      </div>
      <div class="card-details">
        <h1>{{ currentCard.name }}</h1>
        <h2>{{ currentCard.printed_name }}</h2>
        <p><strong>Type:</strong> {{ currentCard.type_line }}</p>
        <p><strong>Mana Cost:</strong> {{ currentCard.mana_cost }}</p>
        <p><strong>CMC:</strong> {{ currentCard.cmc }}</p>
        <p><strong>Released At:</strong> {{ formattedReleaseDate }}</p>
        <p><strong>Oracle Text:</strong> {{ currentCard.oracle_text }}</p>
        <p><strong>Set:</strong> {{ currentCard.set_name }} ({{ currentCard.set }})</p>
        <p><strong>Rarity:</strong> {{ currentCard.rarity }}</p>
        <p><strong>Artist:</strong> {{ currentCard.artist }}</p>
        <p v-if="currentCard.legalities">
          <strong>Legalities:</strong>
          <ul>
            <li v-for="(status, format) in currentCard.legalities" :key="format">
              {{ format }}: {{ status }}
            </li>
          </ul>
        </p>
        <div class="card-links">
          <a :href="currentCard.scryfall_uri" target="_blank">View on Scryfall</a>
          <a :href="currentCard.purchase_uris.tcgplayer" target="_blank">Buy on TCGPlayer</a>
          <a :href="currentCard.purchase_uris.cardmarket" target="_blank">Buy on CardMarket</a>
          <a :href="currentCard.purchase_uris.cardhoarder" target="_blank">Buy on CardHoarder</a>
        </div>
      </div>
    </div>
    <div v-else>
      <br />
      <p>Please click on a Card...</p>
    </div>
  </div>
</template>

<script>
import MtgDataService from "../services/MtgDataService";

export default {
  name: "Current-Card",
  data() {
    return {
      currentCard: null,
      message: ''
    };
  },
  computed: {
    formattedReleaseDate() {
      return this.currentCard ? new Date(this.currentCard.released_at).toLocaleDateString() : '';
    }
  },
  methods: {
    getCard(id) {
      MtgDataService.get(id)
        .then(response => {
          this.currentCard = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },
    updateCard() {
      MtgDataService.update(this.currentCard.id, this.currentCard)
        .then(response => {
          console.log(response.data);
          this.message = 'The card was updated successfully!';
        })
        .catch(e => {
          console.log(e);
        });
    },
    deleteCard() {
      MtgDataService.delete(this.currentCard._id)
        .then(response => {
          console.log(response.data);
          this.$router.push({ name: "cards" });
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  mounted() {
    this.message = '';
    const cardId = this.$route.params.id;
    if (cardId) {
      this.getCard(cardId);
    }
  }
};
</script>

<style scoped>
.card-container {
  display: flex;
  flex-direction: row;
  border: 1px solid #ccc;
  padding: 10px;
  margin: 10px;
  border-radius: 8px;
  background-color: #f9f9f9;
}

.card-image img {
  max-width: 200px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.card-details {
  margin-left: 20px;
}

.card-links a {
  display: block;
  margin: 5px 0;
}

.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>