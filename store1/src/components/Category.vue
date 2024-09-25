<template>
  <div class="item-group">
    <div class="container">
      <transition-group name="slide" tag="div" class="row" mode="out-in">
        <div
          class="col"
          v-for="(category, i) in pagedCategories"
          :key="i"
        >
          <Card
            :img="category.img"
            :title="category.title"
            :is-active="selectedCategory === (currentPage - 1) * itemsPerPage + i"
            :on-click="() => selectCategory((currentPage - 1) * itemsPerPage + i)"
          />
        </div>
      </transition-group>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue';
import Card from './card.vue';

interface Category {
  img: string;
  title: string;
  route: string;
}

export default defineComponent({
  components: { Card },
  props: {
    currentPage: {
      type: Number as PropType<number>,
      required: true,
    },
    itemsPerPage: {
      type: Number as PropType<number>,
      required: true,
    },
  },
  data() {
    return {
      categories: [
        { img: 'food.png', title: 'Alimentos e Bebidas', route: '/bancadas/comida' },
        { img: 'games.png', title: 'Jogos', route: '/bancadas/vegetais' },
        { img: '3.png', title: 'Saúde', route: '/bancadas/medicina' },
        { img: 'Bebê.png', title: 'Bebê', route: '/bancadas/bebe' },
        { img: '5.png', title: 'Escritório', route: '/bancadas/escritorio' },
        { img: 'Electrodomesticos.png', title: 'Electrodomésticos', route: '/bancadas/beleza' },
        { img: 'roupa.png', title: 'Vestuário', route: '/bancadas/beleza' },
        { img: 'cozinha.png', title: 'Cozinha', route: '/bancadas/beleza' },
        { img: 'esporte.png', title: 'Esportes', route: '/bancadas/esportes' },
        { img: 'beleza.png', title: 'Beleza', route: '/bancadas/beleza' },
        { img: 'livro.png', title: 'Livros', route: '/bancadas/livros' },
        { img: 'ferramentas.png', title: 'Ferramentas', route: '/bancadas/ferramentas' },
        { img: 'pet.png', title: 'Pet Shop', route: '/bancadas/pet' },
        { img: 'joias.png', title: 'Joias e Acessórios', route: '/bancadas/joias' },
        { img: 'moveis.png', title: 'Móveis', route: '/bancadas/moveis' },
        { img: 'brinquedos.png', title: 'Brinquedos', route: '/bancadas/brinquedos' },
        { img: 'construção.png', title: 'Construção', route: '/bancadas/Construção' },
        { img: 'bateria.png', title: 'Instrumentos Musicais', route: '/bancadas/Instrumentos Musicais' },
        { img: 'decoracao.png', title: 'Decoração', route: '/bancadas/Decoração' },
        { img: 'carro.png', title: 'Veículos e Acessórios', route: '/bancadas/Veículos e Acessórios' },
      ] as Category[],
      selectedCategory: null as number | null,
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.categories.length / this.itemsPerPage);
    },
    pagedCategories() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.categories.slice(start, end);
    },
  },
  methods: {
    selectCategory(index: number) {
      this.selectedCategory = index;
      const selected = this.categories[index];
      this.$router.push(selected.route);
    },
  },
});
</script>
<style scoped>
.item-group {
  margin-top: -8px;
}

.container {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  width: 100%;
}

.row {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: center;
}

.col {
  flex: 1 1 calc(20% - 16px); /* Ajuste o valor de acordo com o espaço do gap */
  max-width: calc(20% - 16px); /* Ajuste o valor de acordo com o espaço do gap */
  box-sizing: border-box;
  display: flex;
  justify-content: center;
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.5s ease;
}

.slide-enter,
.slide-leave-to {
  transform: translateX(100%);
}

.slide-leave,
.slide-enter-to {
  transform: translateX(-100%);
}
</style>
