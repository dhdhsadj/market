<template>
  <div class="bancadas-page">
    <Navbar />
    <div class="content-wrapper">
      <h1 class="page-title">Bancadas para {{ productTitle }}</h1>

      <!-- Seção de Vendedores Populares -->
      <section class="stands-section popular-section">
        <div class="section-header">
          <h2 class="section-title">Populares</h2>
        </div>
        <div class="stand-container">
          <div v-for="(stand, i) in popularStands" :key="i" class="stand">
            <div class="stand-header">
              <span class="rating"><i class="fas fa-star"></i> {{ stand.rating.toFixed(1) }}</span>
              <h3 class="stand-name">{{ stand.name }}</h3>
              <p class="stand-number">{{ stand.number }}</p>
            </div>
            <p class="stand-description">{{ stand.description }}</p>
            <div class="stand-categories">
              <span v-for="category in stand.categories" :key="category" class="category">{{ category }}</span>
            </div>
            <div class="stand-actions">
              <router-link :to="{ name: 'stand-detail1', params: { id: stand.number } }" class="btn-view">Ver Bancada</router-link>
            </div>
          </div>
        </div>
      </section>

      <!-- Seção de Vendedores Menos Populares -->
      <section class="stands-section less-popular-section">
        <div class="section-header">
          <h2 class="section-title">Outros Vendedores</h2>
        </div>
        <div class="stand-container">
          <div v-for="(stand, i) in lessPopularStands" :key="i" class="stand">
            <div class="stand-header">
              <span class="rating"><i class="fas fa-star"></i> {{ stand.rating.toFixed(1) }}</span>
              <h3 class="stand-name">{{ stand.name }}</h3>
              <p class="stand-number">{{ stand.number }}</p>
            </div>
            <p class="stand-description">{{ stand.description }}</p>
            <div class="stand-categories">
              <span v-for="category in stand.categories" :key="category" class="category">{{ category }}</span>
            </div>
            <div class="stand-actions">
              <router-link :to="{ name: 'stand-detail1', params: { id: stand.number } }" class="btn-view">Ver Bancada</router-link>
            </div>
          </div>
        </div>
      </section>
    </div>
    <Footer />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRoute } from 'vue-router';
import Navbar from '@/components/Navbar.vue'; 
import Footer from '@/components/Footer.vue'; 
interface Stand {
  name: string;
  number: string;
  description: string;
  rating: number;
  categories: string[];
}

export default defineComponent({
  components: {
    Navbar,
    Footer,
  },
  setup() {
    const route = useRoute();
    const productTitle = route.params.title as string;

    const stands: Stand[] = [
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

  
    const popularStands = stands.filter(stand => stand.rating >= 4.0);
    const lessPopularStands = stands.filter(stand => stand.rating < 4.0);

    return {
      productTitle,
      popularStands,
      lessPopularStands,
    };
  },
});
</script>

<style scoped>
.bancadas-page {
  font-family: 'Arial', sans-serif;
  background-color: #f5f5f5;
  min-height: 100vh;
}

.content-wrapper {
  max-width: 1200px;
  margin: 0 auto;
  padding: 80px 20px 40px;
}

.page-title {
  font-size: 2.5rem;
  color: #333;
  text-align: center;
  margin-bottom: 40px;
}

.stands-section {
  margin-bottom: 60px;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.section-title {
  font-size: 1.8rem;
  color: #2c3e50;
  margin: 0;
}

.stand-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 30px;
}

.stand {
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.stand:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.stand-header {
  background: #3498db;
  color: white;
  padding: 20px;
  position: relative;
}

.rating {
  position: absolute;
  top: 10px;
  right: 10px;
  background: rgba(255, 255, 255, 0.2);
  padding: 5px 10px;
  border-radius: 20px;
  font-weight: bold;
}

.stand-name {
  font-size: 1.4rem;
  margin: 0 0 5px;
}

.stand-number {
  font-size: 0.9rem;
  opacity: 0.8;
  margin: 0;
}

.stand-description {
  padding: 20px;
  color: #555;
  font-size: 0.95rem;
  line-height: 1.5;
}

.stand-categories {
  padding: 0 20px 20px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.category {
  background: #e0e0e0;
  color: #333;
  padding: 5px 10px;
  border-radius: 15px;
  font-size: 0.8rem;
}

.stand-actions {
  padding: 0 20px 20px;
  text-align: center;
}

.btn-view {
  display: inline-block;
  background: #2ecc71;
  color: white;
  text-decoration: none;
  padding: 10px 20px;
  border-radius: 5px;
  transition: background 0.3s ease;
}

.btn-view:hover {
  background: #27ae60;
}

@media (max-width: 768px) {
  .content-wrapper {
    padding: 60px 15px 30px;
  }

  .page-title {
    font-size: 2rem;
  }

  .section-title {
    font-size: 1.5rem;
  }

  .stand-container {
    grid-template-columns: 1fr;
  }
}
</style>