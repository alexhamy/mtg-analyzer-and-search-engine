<template>
    <div class="submit-form">
      <div v-if="!submitted">
        <div class="form-group">
          <label for="name">Name</label>
          <input
            type="text"
            class="form-control"
            id="name"
            required
            v-model="card.name"
            name="name"
          />
        </div>
  
        <div class="form-group">
          <label for="oracle_text">Oracle Text</label>
          <input
            class="form-control"
            id="oracl_text"
            required
            v-model="card.oracle_text"
            name="oracl_text"
          />
        </div>
  
        <button @click="saveCard" class="btn btn-success">Submit</button>
      </div>
  
      <div v-else>
        <h4>You submitted successfully!</h4>
        <button class="btn btn-success" @click="newCard">Add</button>
      </div>
    </div>
  </template>
  
  <script>
  import MtgDataService from "../services/MtgDataService";
  
  export default {
    name: "add-card",
    data() {
      return {
        card: {
          id: null,
          name: "",
          oracle_text: "",
        },
        submitted: false
      };
    },
    methods: {
      saveCard() {
        var data = {
          name: this.card.name,
          oracle_text: this.card.oracle_text
        };
  
        MtgDataService.create(data)
          .then(response => {
            this.card.id = response.data.id;
            console.log(response.data);
            this.submitted = true;
          })
          .catch(e => {
            console.log(e);
          });
      },
      
      newCard() {
        this.submitted = false;
        this.card = {
          id: null,
          name: "",
          oracle_text: ""
        };
      }
    }
  };
  </script>
  
  <style>
  .submit-form {
    max-width: 300px;
    margin: auto;
  }
  </style>
  ../services/MtgDataService