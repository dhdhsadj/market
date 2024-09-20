<template>
    <div class="product-detail-page">
      <Navbar />
      <div class="content-wrapper">
        <div v-if="product" class="product-detail-box">
          <div class="product-detail">
            <div class="product-image">
              <img :src="product.img" :alt="product.title" class="product-detail-img" />
            </div>
            <div class="product-info">
              <h1 class="product-detail-title">{{ product.title }}</h1>
              <h4 class="product-detail-subtitle">{{ product.subtitle }}</h4>
              
              <div class="product-rating">
                <span v-for="star in 5" :key="star" class="star">
                  <i :class="star <= Math.floor(product.rating) ? 'fas fa-star' : 'far fa-star'"></i>
                </span>
                <span class="rating-value">({{ product.rating }})</span>
              </div>
              
              <div class="product-price-info">
                <p class="product-detail-price">{{ product.price }}</p>
                <p v-if="product.discount" class="product-detail-discount">{{ product.discount }} OFF</p>
              </div>
              
              <p class="product-detail-shipping">
                <i class="fas fa-truck"></i> {{ product.shippingCost }}
              </p>
              
              <div class="quantity-selector">
                <label for="quantity">Quantidade:</label>
                <div class="select-wrapper">
                  <select v-model="quantity" id="quantity">
                    <option v-for="n in 10" :key="n" :value="n">{{ n }}</option>
                  </select>
                </div>
              </div>
              
              <div class="actions">
                <button @click="addToCart" class="btn btn-primary">
                  <i class="fas fa-shopping-cart"></i> Adicionar ao Carrinho
                </button>
                <button @click="toggleFavorite" class="btn btn-secondary" :class="{ 'is-favorite': isFavorite }">
                  <i :class="isFavorite ? 'fas fa-heart' : 'far fa-heart'"></i> Favoritar
                </button>
              </div>
            </div>
          </div>
          
          <div class="product-details-section">
            <h2>Detalhes do produto</h2>
            <p class="product-detail-description">{{ product.description }}</p>
            
            <div class="product-features">
              <h3>Características</h3>
              <ul>
                <li v-for="(feature, index) in product.features" :key="index">{{ feature }}</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div v-else class="not-found">
          <p>Produto não encontrado.</p>
        </div>
      </div>
      <Footer class="custom-footer" />
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  import Navbar from '@/components/Navbar.vue';
  import Footer from '@/components/Footer.vue';
  
  interface Product {
    img: string;
    title: string;
    subtitle: string;
    price: string;
    discount?: string;
    shippingCost: string;
    description: string;
    rating: number;
    features: string[];
  }
  
  export default defineComponent({
    name: 'ProductDetail',
    components: {
      Navbar,
      Footer,
    },
    setup() {
      const route = useRoute();
      const product = ref<Product | null>(null);
      const quantity = ref(1);
      const isFavorite = ref(false);
  
      onMounted(() => {
        const productId = route.params.id as string;
        // Simular uma chamada para buscar dados do produto com base no `productId`
        const mockProducts: Product[] = [
          {
            img: '/pc1.jpeg',
            title: 'PC Gamer High-End',
            subtitle: 'Desempenho Excepcional para Jogos',
            price: '510.000 AOA',
            discount: '10%',
            shippingCost: 'Frete Grátis',
            description: 'PC Gamer de última geração com componentes de alta performance para uma experiência de jogo imersiva.',
            rating: 4.5,
            features: ['Processador Intel i7 de 11ª geração', '32GB RAM DDR4', '1TB NVMe SSD', 'Placa de Vídeo NVIDIA RTX 3070', 'Sistema de Refrigeração Líquida'],
          },
          {
            img: '/Phone11.png',
            title: 'Samsung Galaxy S21',
            subtitle: 'Smartphone Topo de Linha',
            price: '250.000 AOA',
            shippingCost: '1.500 AOA',
            description: 'O mais recente smartphone Samsung com câmera de última geração e desempenho excepcional.',
            rating: 4.7,
            features: ['Tela Dynamic AMOLED 2X de 6.2"', '128GB Armazenamento', 'Câmera Tripla de 64MP', 'Bateria de 4000mAh', '5G'],
          },
        ];
  
        product.value = mockProducts.find(p => p.title.toLowerCase().includes(productId.toLowerCase())) || null;
      });
  
      const addToCart = () => {
        console.log(`Adicionado ao carrinho: ${product.value?.title}, Quantidade: ${quantity.value}`);
        // Aqui você implementaria a lógica real para adicionar ao carrinho
      };
  
      const toggleFavorite = () => {
        isFavorite.value = !isFavorite.value;
        console.log(`Produto ${isFavorite.value ? 'adicionado aos' : 'removido dos'} favoritos`);
        // Aqui você implementaria a lógica real para favoritar/desfavoritar
      };
  
      return {
        product,
        quantity,
        isFavorite,
        addToCart,
        toggleFavorite,
      };
    },
  });
  </script>
  
  <style scoped>
  .product-detail-page {
    font-family: Arial, sans-serif;
    background-color: #ededed;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }
  
  .content-wrapper {
    flex-grow: 1;
    max-width: 1200px;
    margin: 0 auto;
    padding: 80px 20px 20px; /* Aumentado o padding-top para evitar sobreposição com a navbar */
  }
  
  .product-detail-box {
    background-color: #ffffff;
    border-radius: 8px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
    padding: 30px;
    margin-bottom: 20px;
  }
  
  .product-detail {
    display: flex;
    gap: 30px;
    margin-bottom: 30px;
  }
  
  .product-image {
    flex: 0 0 40%;
  }
  
  .product-detail-img {
    width: 100%;
    border-radius: 8px;
  }
  
  .product-info {
    flex: 1;
  }
  
  .product-detail-title {
    font-size: 24px;
    margin-bottom: 5px;
    color: #333;
  }
  
  .product-detail-subtitle {
    font-size: 16px;
    color: #666;
    margin-bottom: 15px;
  }
  
  .product-rating {
    margin-bottom: 15px;
  }
  
  .star {
    color: #3483fa;
    font-size: 18px;
  }
  
  .rating-value {
    margin-left: 5px;
    color: #3483fa;
  }
  
  .product-price-info {
    margin-bottom: 15px;
  }
  
  .product-detail-price {
    font-size: 36px;
    font-weight: bold;
    margin-bottom: 5px;
    color: #333;
  }
  
  .product-detail-discount {
    font-size: 14px;
    color: #00a650;
  }
  
  .product-detail-shipping {
    font-size: 16px;
    color: #00a650;
    margin-bottom: 20px;
  }
  
  .quantity-selector {
    margin-bottom: 20px;
  }
  
  .quantity-selector label {
    display: block;
    margin-bottom: 5px;
    color: #666;
  }
  
  .select-wrapper {
    position: relative;
    display: inline-block;
  }
  
  .select-wrapper::after {
    content: '\25BC';
    position: absolute;
    top: 50%;
    right: 10px;
    transform: translateY(-50%);
    pointer-events: none;
    color: #3483fa;
  }
  
  .quantity-selector select {
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    padding: 10px 30px 10px 10px;
    font-size: 16px;
    border: 1px solid #ddd;
    border-radius: 4px;
    background-color: white;
    cursor: pointer;
    width: 100%;
    min-width: 100px;
  }
  
  .quantity-selector select:focus {
    outline: none;
    border-color: #3483fa;
    box-shadow: 0 0 0 2px rgba(52, 131, 250, 0.2);
  }
  
  .actions {
    display: flex;
    gap: 10px;
  }
  
  .btn {
    padding: 12px 20px;
    font-size: 16px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.1s ease;
  }
  
  .btn:active {
    transform: translateY(1px);
  }
  
  .btn-primary {
    background-color: #3483fa;
    color: white;
  }
  
  .btn-primary:hover {
    background-color: #2968c8;
  }
  
  .btn-secondary {
    background-color: #e4e4e4;
    color: #3483fa;
  }
  
  .btn-secondary:hover {
    background-color: #d4d4d4;
  }
  
  .btn-secondary.is-favorite {
    background-color: #fff0f0;
    color: #ff4f4f;
  }
  
  .btn-secondary.is-favorite:hover {
    background-color: #ffe0e0;
  }
  
  .product-details-section {
    margin-top: 30px;
    border-top: 1px solid #eee;
    padding-top: 20px;
  }
  
  .product-details-section h2 {
    font-size: 20px;
    color: #333;
    margin-bottom: 15px;
  }
  
  .product-detail-description {
    margin-bottom: 20px;
    line-height: 1.6;
    color: #666;
  }
  
  .product-features h3 {
    font-size: 18px;
    color: #333;
    margin-bottom: 10px;
  }
  
  .product-features ul {
    list-style-type: none;
    padding-left: 0;
  }
  
  .product-features li {
    margin-bottom: 10px;
    padding-left: 20px;
    position: relative;
    color: #666;
  }
  
  .product-features li::before {
    content: '•';
    position: absolute;
    left: 0;
    color: #3483fa;
  }
  
  .not-found {
    text-align: center;
    font-size: 18px;
    color: #666;
    background-color: #ffffff;
    border-radius: 8px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
    padding: 30px;
  }
  
  @media (max-width: 768px) {
    .product-detail {
      flex-direction: column;
    }
    
    .product-image {
      flex: 0 0 100%;
    }
    
    .actions {
      flex-direction: column;
    }
    
    .btn {
      width: 100%;
    }
  }
  </style>