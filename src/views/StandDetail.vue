<template>
  <div>
    <div v-if="stand">
      <div class="stand-details">
        <img src="/store.png" alt="Badge Image" class="badge-img" />
        <div class="stand-details-header">
          <h1 class="stand-name">{{ stand.name }}</h1>
          <div class="rating-container">
            <span class="stand-rating">{{ stand.rating }} / 5</span>
            <button @click="toggleFavoriteStand" class="favorite-stand-btn">
              <i :class="isFavoriteStand ? 'fas fa-star active' : 'far fa-star'"></i>
            </button>
          </div>
        </div>
        <!-- Categorias estilizadas -->
        <div class="stand-categories">
          <span v-for="category in stand.categories" :key="category" class="category">{{ category }}</span>
        </div>
        <p><strong>Número da Bancada:</strong> {{ stand.number }}</p>
        <p><strong>Descrição:</strong> {{ stand.description }}</p>
      </div>
    </div>
    <div v-else>
      <p>Stand não encontrado.</p>
    </div>
    <!-- Bloco de Produtos -->
    <div class="products-section">
      <h2 class="products-title">Produtos</h2>
      <div class="product-container">
        <div class="product" v-for="(product, i) in products" :key="i">
          <div class="product-image-wrapper">
            <button @click="toggleFavoriteProduct(i)" class="favorite-product-btn">
              <i :class="isFavoriteProduct(i) ? 'fas fa-heart' : 'far fa-heart'"></i>
            </button>
            <img :src="product.img" class="product-img" alt="Product Image" />
          </div>
          <h2 class="product-title">{{ product.title }}</h2>
          <h4 class="product-subtitle">{{ product.subtitle }}</h4>
          <p class="product-price">{{ product.price }}</p>
          <div class="product-actions">
            <button @click="decrement(i)" class="action-btn">-</button>
            <strong class="bpm">{{ product.quantity }}</strong>
            <button @click="increment(i)" class="action-btn">+</button>
            <button class="add-to-cart-btn">Adicionar</button>
          </div>
        </div>
      </div>
    </div>
    <Footer :footerLogoUrl="footerLogoUrl" />
  </div>
</template>


<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import Navbar from '../components/Navbar.vue';
import Footer from '../components/Footer.vue'; 

interface Stand {
  name: string;
  number: string;
  description: string;
  rating: number;
  categories: string[];
}

interface Product {
  img: string;
  title: string;
  subtitle: string;
  price: string;
  quantity: number; // Adicionado para rastrear a quantidade de cada produto
}

export default defineComponent({
  components: {
    Navbar,
    Footer, 
  },
  setup() {
    const route = useRoute();
    const favoriteStands = ref<Set<number>>(new Set());
    const favoriteProducts = ref<Set<number>>(new Set());

    const stands: Stand[] = [
      {
        name: "Fernando Jorge",
        number: "Bancada 4",
        description: "Especializado em produtos eletrônicos e acessórios inovadores.",
        rating: 4.3,
        categories: ["Eletrônicos", "Acessórios"],
      },
      {
        name: "Roberto Firmino",
        number: "Bancada 5",
        description: "Oferece uma seleção diversificada de produtos de beleza e cuidados pessoais.",
        rating: 4.1,
        categories: ["Beleza", "Cuidados Pessoais"],
      },
      {
        name: "Carlos Afonso",
        number: "Bancada 6",
        description: "Especialista em artigos de decoração e design de interiores.",
        rating: 4.1,
        categories: ["Decoração", "Design"],
      },
      {
        name: "Costa Vilola",
        number: "Bancada 7",
        description: "Venda de produtos gourmet e alimentos importados de alta qualidade.",
        rating: 3.9,
        categories: ["Gourmet", "Alimentos"],
      },
      {
        name: "Pedro Ricardo",
        number: "Bancada 8",
        description: "Aqui você encontra uma vasta gama de artigos esportivos e equipamentos de fitness.",
        rating: 3.9,
        categories: ["Esportes", "Fitness"],
      },
      {
        name: "João Kapamba",
        number: "Bancada 9",
        description: "Especializado em livros e material para leitura.",
        rating: 3.8,
        categories: ["Livros", "Material de Leitura"],
      },
    ];

    const products: Product[] = [
      { img: "/pr1.png", title: "Alface", subtitle: "1kg", price: "1.000AOA", quantity: 1 },
      { img: "/pr2.png", title: "Gelado", subtitle: "1kg", price: "1.000AOA", quantity: 1 },
      { img: "/pr3.png", title: "Batata", subtitle: "1kg", price: "11.000AOA", quantity: 1 },
      { img: "/pr4.png", title: "Petiscos de frutas", subtitle: "500g", price: "4.000AOA", quantity: 1 },
      { img: "/pr5.png", title: "Bolacha", subtitle: "270GM", price: "10.000AOA", quantity: 1 },
      { img: "/pr6.png", title: "Mamão", subtitle: "1kg", price: "10.000AOA", quantity: 1 },
    ];

    const standId = computed(() => Number(route.params.id));
    
    const stand = computed(() => {
      return stands[standId.value] || null;
    });

    const isFavoriteStand = computed(() => {
      return favoriteStands.value.has(standId.value);
    });

    const toggleFavoriteStand = () => {
      if (isFavoriteStand.value) {
        favoriteStands.value.delete(standId.value);
      } else {
        favoriteStands.value.add(standId.value);
      }
    };

    const isFavoriteProduct = (index: number) => {
      return favoriteProducts.value.has(index);
    };

    const toggleFavoriteProduct = (index: number) => {
      if (isFavoriteProduct(index)) {
        favoriteProducts.value.delete(index);
      } else {
        favoriteProducts.value.add(index);
      }
    };

    const decrement = (index: number) => {
      if (products[index].quantity > 1) {
        products[index].quantity--;
      }
    };

    const increment = (index: number) => {
      products[index].quantity++;
    };

    return {
      stands,
      products,
      stand,
      navbarLogoUrl: '/store.png', 
      footerLogoUrl: '/1.png', 
      isFavoriteStand,
      toggleFavoriteStand,
      isFavoriteProduct,
      toggleFavoriteProduct,
      decrement,
      increment
    };
  }
});
</script>


<style scoped>
.stand-details {
  position: relative;
  padding: 10px; 
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  margin-top: 40px;
  border: 2px solid #ccc;
}

.badge-img {
  position: absolute;
  bottom: 2px; 
  right: 2px; 
  width: 30px; 
  height: auto;
  z-index: 10;
  filter: invert(41%) sepia(82%) saturate(5593%) hue-rotate(183deg) brightness(93%) contrast(89%);
}

.stand-details-header {
  position: relative;
  text-align: center;
  margin-bottom: 6px; 
}

.stand-name {
  font-size: 1.2rem; 
  margin-bottom: 4px;
}

.rating-container {
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  align-items: center;
  margin: 4px; 
}

.stand-rating {
  font-size: 1rem; 
  margin-right: 4px; 
  margin-top: 0; 
}

.favorite-stand-btn {
  background: none;
  border: none;
  cursor: pointer;
  color: #ffcc00;
  font-size: 1.2rem; 
  margin-top: 0; 
}

.favorite-stand-btn i.active {
  color: #ffcc00;
}


.stand-categories {
  display: flex;
  flex-wrap: wrap;
  gap: 6px; 
  justify-content: center;
  margin-top: 4px; 
}

.category {
  background: #e0f7fa;
  color: #00796b;
  border-radius: 12px;
  padding: 4px 8px; 
  font-size: 0.85rem; 
  font-weight: 500;
  border: 1px solid #00796b;
}

.products-section {
  margin: 8px; 
}

.products-title {
  font-size: 1.2rem; 
  margin-bottom: 8px;
}

.product-container {
  display: flex;
  flex-wrap: wrap;
  gap: 16px; 
  justify-content: center; 
}

.product {
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  width: calc(25% - 16px); 
  background: #fff;
  padding: 8px; 
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: center; 
}

.product-image-wrapper {
  position: relative;
  margin-bottom: 8px; 
}

.product-img {
  width: 100%;
  height: auto;
  border-bottom: 1px solid #ddd;
}

.favorite-product-btn {
  position: absolute;
  top: 4px; 
  right: 4px; 
  background: none;
  border: none;
  cursor: pointer;
  color: #ff0000;
}

.favorite-product-btn i {
  font-size: 1.2rem; 
}

.product-title {
  font-size: 1rem; 
  margin: 4px 0 2px;
}

.product-subtitle {
  font-size: 0.85rem; 
  color: #555;
  margin-bottom: 4px;
}

.product-price {
  font-size: 1rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 8px; 
}

.product-actions {
  display: flex;
  align-items: center;
  gap: 4px;
  justify-content: center; 
}

.number-container {
  display: flex;
  align-items: center; 
  gap: 4px;
}

.number-container button {
  background: #00796b;
  color: #fff;
  border: none;
  padding: 4px 8px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem; 
}

.number-container strong {
  font-size: 1.2rem; 
}

.add-to-cart-btn {
  background: #ffcc00;
  color: #00796b;
  border: none;
  padding: 6px 12px; 
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  font-size: 1rem; 
}
</style>