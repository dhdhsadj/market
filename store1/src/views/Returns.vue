<template>
  <div class="returns">
    <Navbar />
    <div class="content">
      <h1>Devoluções</h1>
      <p>Informações sobre o processo de devolução...</p>
    </div>
   
  </div>
    <Footer :customClass="'custom-footer'" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Navbar from '../components/Navbar.vue';
import Footer from '../components/Footer.vue';

export default defineComponent({
  name: 'Returns',
  components: {
    Navbar,
    Footer,
  },
});
</script>

<style scoped>
.returns {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

.content {
  margin-top: 60px;
  padding: 24px;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
}
</style>
