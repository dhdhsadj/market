<!-- src/views/StandDetail1.vue -->
<template>
  <div class="stand-page">
    <Navbar />
    <div v-if="stand" class="stand-details">
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
      <div class="stand-categories">
        <span v-for="category in stand.categories" :key="category" class="category">{{ category }}</span>
      </div>
      <p class="stand-info"><strong>Número da Bancada:</strong> {{ stand.number }}</p>
      <p class="stand-info"><strong>Descrição:</strong> {{ stand.description }}</p>
    </div>
    <div v-else class="not-found">
      <p>Stand não encontrado.</p>
    </div>

    <div class="products-section">
      <h2 class="products-title">Produtos</h2>
      <div class="products-box">
        <div class="product-container">
          <div class="product" v-for="(product, i) in products" :key="i" @click="goToProductDetail(product.title)">
            <div class="product-image-wrapper">
              <img :src="product.img" class="product-img" alt="Product Image" />
              <!-- Botão de favorito para o produto -->
              <button @click.stop="toggleFavoriteProduct(i)" class="favorite-product-btn">
                <i :class="isFavoriteProduct(i) ? 'fas fa-heart active' : 'far fa-heart'"></i>
              </button>
            </div>
            <h2 class="product-title">{{ product.title }}</h2>
            <h4 class="product-subtitle">{{ product.subtitle }}</h4>
            <p class="product-price">{{ product.price }}</p>
            <p v-if="product.discount" class="product-discount">Desconto: {{ product.discount }}</p>
            <p class="product-shipping">Frete: {{ product.shippingCost }}</p>
          </div>
        </div>
      </div>
    </div>  
  </div>
  <!-- Passando a classe personalizada como prop -->
  <Footer :customClass="'custom-footer'" />
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
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
  discount?: string;
  shippingCost: string;
}

export default defineComponent({
  name: 'StandDetail1',
  components: {
    Navbar,
    Footer,
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const stand = ref<Stand | null>(null);
    const products = ref<Product[]>([
      {
        img: '/pc1.jpeg',
        title: 'PC',
        subtitle: 'Subtítulo do Produto 1',
        price: '510.000 AOA',
        discount: '10%',
        shippingCost: 'Grátis',
      },
      {
        img: '/Phone11.png',
        title: 'Samsung',
        subtitle: 'Subtítulo do Produto 2',
        price: '250.000 AOA',
        shippingCost: '1.500 AOA',
      },
    ]);

    const isFavoriteStand = ref(false);
    const toggleFavoriteStand = () => {
      isFavoriteStand.value = !isFavoriteStand.value;
    };

    const favoriteProducts = ref<Set<number>>(new Set());

    const isFavoriteProduct = (index: number) => {
      return favoriteProducts.value.has(index);
    };

    const toggleFavoriteProduct = (index: number) => {
      if (favoriteProducts.value.has(index)) {
        favoriteProducts.value.delete(index);
      } else {
        favoriteProducts.value.add(index);
      }
    };

    const goToProductDetail = (productTitle: string) => {
      router.push({ name: 'product-detail', params: { id: productTitle } });
    };

    onMounted(() => {
      const standId = route.params.id as string;
  
      const mockStands: Stand[] = [
        {
          name: 'Fernando Jorge',
          number: 'Bancada 4',
          description: 'Especializado em produtos eletrônicos e acessórios inovadores.',
          rating: 4.3,
          categories: ['Eletrônicos', 'Acessórios'],
        },
        {
          name: 'Roberto Firmino',
          number: 'Bancada 5',
          description: 'Oferece uma seleção diversificada de produtos de beleza e cuidados pessoais.',
          rating: 4.1,
          categories: ['Beleza', 'Cuidados Pessoais'],
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

      stand.value = mockStands.find(stand => stand.number === standId) || null;
    });

    return {
      stand,
      products,
      isFavoriteStand,
      toggleFavoriteStand,
      isFavoriteProduct,
      toggleFavoriteProduct,
      goToProductDetail,
    };
  },
});
</script>

<style scoped>
.stand-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

.stand-details {
  position: relative;
  padding: 24px;
  border-radius: 12px;
  background-color: #fff;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
  margin-top: 30px;
  border: 2px solid #e0e0e0; 
  margin-top:50px;
}

.badge-img {
  position: absolute;
  bottom: 16px;
  right: 16px;
  width: 60px;
  height: auto;
  z-index: 10;
}

.stand-details-header {
  position: relative;
  text-align: center;
  margin-bottom: 16px;
}

.stand-name {
  font-size: 2rem;
  margin-bottom: 8px;
  color: #333;
}

.rating-container {
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  align-items: center;
}

.stand-rating {
  font-size: 1.2rem;
  margin-right: 8px;
  color: #555;
}

.favorite-stand-btn {
  background: none;
  border: none;
  cursor: pointer;
  color: #ffd700;
  font-size: 1.8rem;
  transition: transform 0.2s ease;
}

.favorite-stand-btn:hover {
  transform: scale(1.1);
}

.favorite-stand-btn i.active {
  color: #ffd700;
}

.stand-categories {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: center;
  margin: 16px 0;
}

.category {
  background: #e0f7fa;
  color: #00796b;
  border-radius: 20px;
  padding: 6px 12px;
  font-size: 0.9rem;
  font-weight: 500;
  border: 1px solid #00796b;
  transition: background-color 0.2s ease;
}

.category:hover {
  background-color: #b2ebf2;
}

.stand-info {
  margin: 8px 0;
  font-size: 1rem;
  color: #555;
}

.products-section {
  margin: 30px 0;
}

.products-title {
  font-size: 1.8rem;
  margin-bottom: 16px;
  color: #333;
  text-align: center;
}

.products-box {
  background-color: #f5f5f5;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
}

.product-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  justify-content: center;
}

.product {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
  background: #fff;
  padding: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  position: relative;
}

.product:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

.product-image-wrapper {
  position: relative;
  margin-bottom: 12px;
}

.product-img {
  width: 100%;
  height: auto;
  border-radius: 4px;
}

.favorite-product-btn {
  position: absolute;
  top: 8px;
  right: 8px;
  background: rgba(255, 255, 255, 0.8);
  border: none;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  color: #ff4081;
  transition: background-color 0.2s ease;
}

.favorite-product-btn:hover {
  background-color: rgba(255, 255, 255, 1);
}

.favorite-product-btn i {
  font-size: 1.2rem;
}

.product-title {
  font-size: 1.1rem;
  margin: 8px 0 4px;
  color: #333;
}

.product-subtitle {
  font-size: 0.9rem;
  color: #777;
  margin-bottom: 8px;
}

.product-price {
  font-size: 1.2rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 8px;
}

.product-discount {
  font-size: 0.9rem;
  color: #e53935;
  margin-bottom: 4px;
}

.product-shipping {
  font-size: 0.9rem;
  color: #1976d2;
}

.not-found {
  text-align: center;
  font-size: 1.2rem;
  color: #777;
  margin-top: 30px;
}


.custom-footer {
  background-color: #000; 
  color: #fff; 
  padding: 1rem 2rem;
  margin: 0; 
  width: 100%;
  min-height: 300px; 
  box-sizing: border-box;
  position: relative;
  display: flex;
  align-items: center; 
  justify-content: center;
}

</style>
