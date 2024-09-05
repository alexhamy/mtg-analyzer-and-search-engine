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
        <div class="card-item"
          v-for="(card, index) in cards"
          :key="card.id"
          @click="setActiveCard(card, index)"
          :class="{ active: index === currentIndex }"
        >
          <img v-if="card.image_uris && card.image_uris.small" :src="card.image_uris.small" alt="Card image" />
          <span v-else>{{ card.name }}</span>
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
        <a class="badge badge-warning" :href="'/mtg/' + currentCard.id">Edit</a>
      </div>
    </div>
  </div>
</template>

<script>
import MtgDataService from "../services/MtgDataService";

export default {
  data() {
    return {
      cards: [],
      currentCard: null,
      currentIndex: -1,
      
      name: this.$route.query.name || "", // Load from URL query params
      
      selectedLanguage: this.$route.query.lang || "en",
      languages: ["en", "ja", "de", "fr", "es", "pt", "it"], // Available languages

      currentPage: parseInt(this.$route.query.page) || 1,
      itemsPerPage: parseInt(this.$route.query.limit) || 8,

      totalPages: 1,
      totalItems: 0,
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
          this.cards = response.data.cards;
          this.totalPages = response.data.totalPages;
          this.totalItems = response.data.totalItems;
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
      // Update the URL with current search parameters
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
    // Watch the route for changes, e.g., when the user manually edits the URL
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
  max-width: 750px;
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
</style>

<style>
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}

.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 15px;
}

.card-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  transition: transform 0.2s;
  cursor: pointer;
}

.card-item:hover {
  transform: scale(1.05);
}

.card-item img {
  max-width: 100%;
  height: auto;
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