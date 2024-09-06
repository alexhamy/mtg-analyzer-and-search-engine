<template>
  <div class="list row">
    <div class="col-md-8">
      <div class="input-group mb-3">
        <input type="text" class="form-control" placeholder="Search by name" v-model="name" />
        <div class="input-group-append">
          <button class="btn btn-outline-secondary" type="button" @click="updateQueryParams">Search</button>
        </div>
      </div>
    </div>
    <div class="col-md-4">
      <div class="form-group">
        <label for="language">Select Language:</label>
        <select id="language" class="form-control" v-model="selectedLanguage" @change="updateQueryParams">
          <option v-for="lang in languages" :key="lang" :value="lang">
            {{ lang.toUpperCase() }}
          </option>
        </select>
      </div>
    </div>
    <div class="col-md-12">
      <h4>Cards</h4>
      <div class="card-grid">
        <div
          class="card-item"
          v-for="(cardGroup, index) in cards"
          :key="cardGroup.cards._id"
          @click="setActiveCard(cardGroup.cards, index)"
          :class="{ active: index === currentIndex }"
        >
          <!-- Display card image if available, else show card name -->
          <img v-if="cardGroup.cards.image_uris && cardGroup.cards.image_uris.normal" 
               :src="cardGroup.cards.image_uris.normal" alt="Card image" />
          <span v-else>{{ cardGroup.cards.name }}</span>
        </div>
      </div>
      <div class="pagination">
        <button
          class="btn btn-outline-primary"
          :disabled="currentPage <= 1"
          @click="changePage(currentPage - 1)"
        >
          Previous
        </button>
        <span>Page {{ currentPage }} of {{ totalPages }}</span>
        <button
          class="btn btn-outline-primary"
          :disabled="currentPage >= totalPages"
          @click="changePage(currentPage + 1)"
        >
          Next
        </button>
      </div>
      <div class="items-per-page">
        <label for="itemsPerPage">Items per page:</label>
        <select id="itemsPerPage" v-model="itemsPerPage" @change="updateQueryParams">
          <option v-for="size in pageSizes" :key="size" :value="size">
            {{ size }}
          </option>
        </select>
      </div>
    </div>
    <div class="col-md-6">
      <div v-if="currentCard">
        <h4>Card</h4>
        <div>
          <label><strong>Name:</strong></label> {{ currentCard.name }}
        </div>
        <div>
          <label><strong>Oracle Text:</strong></label> {{ currentCard.oracle_text }}
        </div>
        <a class="badge badge-warning" :href="'/mtg/' + currentCard._id">Edit</a>
      </div>
    </div>
  </div>
</template>


<script>
import MtgDataService from "../services/MtgDataService";

export default {
  data() {
    return {
      cards: [], // Now holds only the first card from each group
      currentCard: null,
      currentIndex: -1,
      
      name: this.$route.query.name || "",
      selectedLanguage: this.$route.query.lang || "en",
      languages: ["en", "ja", "de", "fr", "es", "pt", "it"],

      currentPage: parseInt(this.$route.query.page) || 1,
      itemsPerPage: parseInt(this.$route.query.limit) || 8,

      totalPages: 1,
      totalUniqueItems: 0,
      pageSizes: [8, 16, 32, 64]
    };
  },
  methods: {
    retrieveCards() {
      MtgDataService.getAll({
        page: this.currentPage,
        limit: this.itemsPerPage,
        lang: this.selectedLanguage,
        name: this.name
      })
        .then(response => {
          this.cards = response.data.cards; // Now each entry in cards is the first card from each group
          this.totalPages = response.data.totalPages;
          this.totalUniqueItems = response.data.totalUniqueItems;
        })
        .catch(e => {
          console.log(e);
        });
    },
    setActiveCard(card, index) {
      this.currentCard = card;
      this.currentIndex = index;
      this.$router.push(`/mtg/${card._id}`);
    },
    changePage(page) {
      this.currentPage = page;
      this.updateQueryParams();
    },
    updateQueryParams() {
      this.$router.push({
        path: "/mtg",
        query: {
          name: this.name,
          lang: this.selectedLanguage,
          page: this.currentPage,
          limit: this.itemsPerPage
        }
      });
      this.retrieveCards();
    }
  },
  watch: {
    '$route.query': {
      immediate: true,
      handler(newQuery) {
        this.name = newQuery.name || "";
        this.selectedLanguage = newQuery.lang || "en";
        this.currentPage = parseInt(newQuery.page) || 1;
        this.itemsPerPage = parseInt(newQuery.limit) || 8;
        this.retrieveCards();
      }
    }
  },
  mounted() {
    this.retrieveCards();
  }
};
</script>


<style>
.list {
  text-align: left;
  max-width: 1000px; /* Adjust to change how far the grid reaches the end of the page */
  margin: auto;
}

.pagination {
  display: flex;
  justify-content: space-between; 
  margin-top: 20px;
}

.items-per-page {
  margin-top: 20px;
}

.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); /* Adjust to change size */
  gap: 10px;
}

.card-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  transition: transform 0.2s;
  cursor: pointer;
  width: 100%; /* Full width of the grid cell */
  position: relative; /* For correct positioning of the img */
  padding-top: 140%; /* This maintains the aspect ratio */
}

.card-item img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover; /* Ensures the image fills the container without distortion */
  border-radius: 5px;
}

.card-item span {
  margin-top: 10px;
  font-weight: bold;
}

.pagination {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.items-per-page {
  margin-top: 20px;
}


</style>