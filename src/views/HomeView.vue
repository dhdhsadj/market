<template>
  <div class="container">
    <Navbar />
    <main>
      <!-- Card Section -->
      <div class="card mx-auto rounded-xl">
        <div class="img-container">
          <img src="cover.png" class="card-img" alt="Cover Image" />
          <div class="card-overlay"></div>
        </div>
        <div class="card-content">
          <h2 class="title1">Faça já</h2>
          <h2 class="title2">as suas compras</h2>

          <div class="search-bar">
            <input
              type="text"
              class="search-input"
              placeholder="Procurar"
            />
            <button class="search-btn">Pesquisar</button>
          </div>
        </div>
      </div>

      <!-- Category Section -->
      <div class="toolbar">
        <h4>Categorias</h4>
        <div class="toolbar-buttons">
          <button
            class="btn-nav"
            @click="prevCategory"
            :disabled="currentPage === 1"
          >
            <i class="arrow left"></i>
          </button>
          <button
            class="btn-nav"
            @click="nextCategory"
            :disabled="currentPage === totalPages"
          >
            <i class="arrow right"></i>
          </button>
        </div>
      </div>

      <Category :current-page="currentPage" :items-per-page="itemsPerPage" />

      <!-- Product Section -->
      <div class="toolbar popular-products-toolbar">
        <h4>Eletrônicos</h4>
      </div>
      <Product />

      <!-- Bundle Section -->
      <div class="card bundle-card">
        <div class="bundle-header">
          <h4 class="hr">Jogos</h4>
        </div>
        <Pack />
      </div>
    </main>
    <Footer />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import Navbar from '../components/Navbar.vue';
import Footer from '../components/Footer.vue';
import Category from '../components/Category.vue';
import Product from '../components/Product.vue';
import Pack from '../components/Pack.vue';

@Options({
  components: {
    Navbar,
    Footer,
    Category,
    Product,
    Pack,
  }
})
export default class HomeView extends Vue {
  currentPage = 1;
  itemsPerPage = 10;

  get totalPages() {
    // Atualize o cálculo com base no número real de categorias
    const totalCategories = 20; // Atualize com o número real de categorias
    return Math.ceil(totalCategories / this.itemsPerPage);
  }

  prevCategory() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  nextCategory() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }
}
</script>



<style scoped>
html, body {
  height: 100%;
  margin: 0;
}

.container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

main {
  flex: 1;
}

.card {
  position: relative;
  border-radius: 15px;
  overflow: hidden;
  width: 100%;
  margin-bottom: 2rem;
}

.img-container {
  position: relative;
  width: 100%;
  max-height: 75vh;
  overflow: hidden;
}

.card-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.card-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1;
}

.card-content {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  margin-top: 10px !important;
  flex-direction: column;
  justify-content: center;
  padding: 20px;
  color: #fff;
  z-index: 2;
}

.title1,
.title2 {
  margin: 0;
  font-size: 2rem;
}

.title1 {
  margin-bottom: 0.5rem;
}

.search-bar {
  display: flex;
  align-items: center;
  margin-top: 1rem;
}

.search-input {
  padding: 0.5rem;
  border-radius: 5px;
  border: 1px solid #ddd;
}

.search-input::placeholder {
  color: #aaa;
}

.search-btn {
  margin-left: 0.5rem;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 5px;
  background-color: #0f76d1;
  color: #fff;
  cursor: pointer;
}

.toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 2rem;
}

.toolbar-buttons {
  display: flex;
}

.btn-nav {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  margin: 0 10px;
  display: flex;
  align-items: center;
}

.btn-nav:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.arrow {
  display: inline-block;
  width: 10px;
  height: 10px;
  border: solid #0f76d1;
  border-width: 0 3px 3px 0;
  padding: 3px;
}

.left {
  transform: rotate(135deg);
}

.right {
  transform: rotate(-45deg);
}

.popular-products-toolbar {
  margin-top: 2rem;
}

h4 {
  margin-left: 30px;
}

.bundle-card {
  margin-top: 2rem;
}

.bundle-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
}

.bundle-header .btn-see-all1 {
  background-color: #0f76d1;
  color: #fff;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  cursor: pointer;
}

@media only screen and (max-width: 600px) {
  .title1, .title2 {
    font-size: 1.2rem;
  }
}

@media only screen and (min-width: 600px) {
  .card-content {
    margin-top: 70px;
  }
}

@media only screen and (min-width: 768px) {
  .card-content {
    margin-top: 120px;
  }
}
</style>
