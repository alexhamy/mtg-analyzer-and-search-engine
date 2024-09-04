<template>
  <div id="app">
    <nav class="navbar navbar-expand navbar-dark bg-dark">
      <router-link to="/" class="navbar-brand">MTG Cards</router-link>
      <div class="navbar-nav mr-auto">
        <li class="nav-item">
          <router-link to="/mtg" class="nav-link">Card List</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/add" class="nav-link">Add a Card</router-link>
        </li>
      </div>
    </nav>

    <div class="container mt-3">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  name: "app"
};
</script>
