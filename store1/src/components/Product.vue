<template>
  <div class="carousel-container">
    <button class="arrow left-arrow" @click="scrollLeft">&#10094;</button>
    <div class="product-box">
      <div ref="scrollBox" class="product-scroll-box">
        <div class="product" v-for="(product, i) in products" :key="i">
          <img :src="product.img" class="product-img" alt="Product Image" />
          <h2 class="product-title">{{ product.title }}</h2>
          <div class="product-actions">
            <button @click="goToBancadas(product.title)" class="add-to-cart-btn">
              Ver Bancadas
            </button>
          </div>
        </div>
      </div>
    </div>
    <button class="arrow right-arrow" @click="scrollRight">&#10095;</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';

interface Product {
  img: string;
  title: string;
  subtitle: string;
  price: string;
  quantity: number;
}

export default defineComponent({
  setup() {
    const router = useRouter();
    const scrollBox = ref<HTMLElement | null>(null);

    const products = ref<Product[]>([
      { img: 'Phone11.png', title: 'Samsung Galaxy A14', subtitle: '1kg', price: '1.000AOA', quantity: 1 },
      { img: 'phone12.png', title: 'Poco X3 Pro', subtitle: '1kg', price: '1.000AOA', quantity: 1 },
      { img: 'phone13.jpeg', title: 'Samsung Galaxy S23 Ultra', subtitle: '1kg', price: '11.000AOA', quantity: 1 },
      { img: 'TV1.webp', title: '55" Qled 4k Q70d Tizen Os Smart Tv', subtitle: '500g', price: '4.000AOA', quantity: 1 },
      { img: 'pc1.jpeg', title: 'HP COMPUTADOR ', subtitle: '270GM', price: '10.000AOA', quantity: 1 },
      { img: 'watch1.png', title: 'Smartwatch Y68', subtitle: '1kg', price: '10.000AOA', quantity: 1 },
      { img: 'phone14.jpeg', title: 'iPhone 15 Pro Max', subtitle: '1kg', price: '10.000AOA', quantity: 1 },
    ]);

    const goToBancadas = (productTitle: string) => {
      router.push({ name: 'bancadas', params: { title: productTitle } });
    };

    const scrollLeft = () => {
      if (scrollBox.value) {
        scrollBox.value.scrollBy({ left: -250, behavior: 'smooth' });
      }
    };

    const scrollRight = () => {
      if (scrollBox.value) {
        scrollBox.value.scrollBy({ left: 250, behavior: 'smooth' });
      }
    };

    return {
      products,
      scrollBox,
      goToBancadas,
      scrollLeft,
      scrollRight,
    };
  },
});
</script>

<style scoped>
.carousel-container {
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
  max-width: 100%;
  margin: 0 auto;
  padding: 16px;
}

.product-box {
  background-color: #f0f0f0;
  padding: 16px;
  border-radius: 8px;
  overflow: hidden;
  max-width: 100%;
  display: flex;
  flex: 1;
  height: 400px;
}

.product-scroll-box {
  display: flex;
  overflow-x: auto;
  scroll-behavior: smooth;
  gap: 16px;
  padding: 16px 0;
  width: 100%;
  height: 100%;
  -webkit-overflow-scrolling: touch; /* Para suavizar a rolagem no iOS */
  
  /* Esconde a barra de rolagem no Firefox */
  scrollbar-width: none;
}

.product-scroll-box::-webkit-scrollbar {
  display: none; /* Esconde a barra de rolagem no Chrome, Safari e navegadores baseados no WebKit */
}

.product {
  flex: 0 0 auto;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(56, 85, 180, 0.747);
  text-align: center;
  padding: 16px;
  min-width: 250px;
  max-width: 250px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.product-img {
  width: 100%;
  max-height: 200px;
  object-fit: contain;
}

.product-title {
  font-size: 1rem;
  margin: 8px 0;
}

.product-actions {
  display: flex;
  justify-content: center;
  margin-top: 8px;
}

.add-to-cart-btn {
  background: #0f76d1;
  border: none;
  border-radius: 4px;
  color: #fff;
  padding: 8px 12px;
  cursor: pointer;
}

.arrow {
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 2rem;
  color: #00796b;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
  transition: color 0.2s; /* Adiciona uma transição de cor suave */
}

.left-arrow {
  left: 0;
}

.right-arrow {
  right: 0;
}

.arrow:hover {
  color: #004d40; /* Muda a cor ao passar o mouse para dar feedback visual */
}

@media (max-width: 768px) {
  .product {
    min-width: 180px;
    max-width: 180px;
  }
}

</style>
