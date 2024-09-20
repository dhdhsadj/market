<template>
  <footer class="footer">
    <div class="footer-content">
      <div class="footer-section logo-section">
        <div class="logo">
          <img :src="logoUrl" alt="Logo" class="logo-img" />
          <h1 class="logo-title">
            <span class="logo-text">P.</span><strong>mercado</strong>
          </h1>
        </div>
        <div class="social-icons">
          <button v-for="icon in icons" :key="icon" class="social-btn">
            <i :class="icon" class="social-icon"></i>
          </button>
        </div>
      </div>
      <div class="footer-links">
        <div class="footer-section">
          <h3>Sobre</h3>
          <ul>
            <li><a href="#">Como funciona</a></li>
            <li><a href="#">Nossa história</a></li>
            <li><a href="#">Termos de uso</a></li>
          </ul>
        </div>
        <div class="footer-section">
          <h3>Método de pagamento</h3>
          <ul>
            <li><a href="#">Opções de pagamento</a></li>
            <li><a href="#">Devoluções</a></li>
            <li><a href="#">Garantia</a></li>
          </ul>
        </div>
        <div class="footer-section">
          <h3>Contato</h3>
          <address>
            <p>AAE IdeaPro</p>
            <p>216 / C EAST Road</p>
            <p><a href="https://aae.idapro.com">aae.idapro.com</a></p>
            <p>Tel: +244 922 222 222</p>
          </address>
        </div>
      </div>
    </div>
    <div class="attribution-section">
      <h4>Atribuições de Ícones</h4>
      <ul class="attribution-list">
        <li v-for="(attribution, index) in attributions" :key="index">
          <a :href="attribution.url" :title="attribution.title">{{ attribution.text }}</a>
        </li>
      </ul>
    </div>
  </footer>
</template>

<script lang="ts">
export default {
  data() {
    return {
      icons: [
        'fab fa-google-plus-g',
        'fab fa-twitter',
        'fab fa-facebook-f',
      ],
      logoUrl: '/store.png',
      attributions: [
        { url: "https://www.flaticon.com/br/icones-gratis/jogador-de-futebol", title: "jogador de futebol ícones", text: "Jogador de futebol ícones criados por Culmbio - Flaticon" },
        { url: "https://www.flaticon.com/br/icones-gratis/cuidados-com-a-pele", title: "cuidados com a pele ícones", text: "Cuidados com a pele ícones criados por Ria Fitriana - Flaticon" },
        { url: "https://www.flaticon.com/br/icones-gratis/livro", title: "livro ícones", text: "Livro ícones criados por mavadee - Flaticon" },
        { url: "https://www.flaticon.com/br/icones-gratis/ferramentas", title: "ferramentas ícones", text: "Ferramentas ícones criados por Freepik - Flaticon" },
        { url: "https://www.flaticon.com/br/icones-gratis/pata", title: "pata ícones", text: "Pata ícones criados por Creatype - Flaticon" },
        { url: "https://www.flaticon.com/br/icones-gratis/joalheria", title: "joalheria ícones", text: "Joalheria ícones criados por surang - Flaticon" },
        { url: "https://www.flaticon.com/br/icones-gratis/moveis", title: "móveis ícones", text: "Móveis ícones criados por Freepik - Flaticon" },
        { url: "https://www.flaticon.com/br/icones-gratis/brinquedos", title: "brinquedos ícones", text: "Brinquedos ícones criados por iconixar - Flaticon" },
        { url: "https://www.flaticon.com/br/icones-gratis/obra", title: "obra ícones", text: "Obra ícones criados por Gajah Mada - Flaticon" },
        { url: "https://www.flaticon.com/br/icones-gratis/banda", title: "banda ícones", text: "Banda ícones criados por tulpahn - Flaticon" },
        { url: "https://www.flaticon.com/br/icones-gratis/decoracao", title: "decoração ícones", text: "Decoração ícones criados por Freepik - Flaticon" },
        { url: "https://www.flaticon.com/br/icones-gratis/pecas-do-carro", title: "peças do carro ícones", text: "Peças do carro ícones criados por Eucalyp - Flaticon" },
      ]
    };
  },
};
</script>

<style scoped>
.footer {
  background-color: #1a1a1a;
  color: #fff;
  padding: 3rem 2rem;
  font-family: Arial, sans-serif;
}

.footer-content {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto;
}

.footer-section {
  flex: 1;
  min-width: 200px;
  margin-bottom: 2rem;
}

.logo-section {
  flex-basis: 100%;
  text-align: center;
  margin-bottom: 2rem;
}

.logo {
  display: inline-flex;
  align-items: center;
  margin-bottom: 1rem;
}

.logo-img {
  width: 40px;
  height: auto;
}

.logo-title {
  margin-left: 0.5rem;
  font-size: 1.5rem;
}

.logo-text {
  color: #3498db;
}

.social-icons {
  display: flex;
  justify-content: center;
  gap: 1rem;
}

.social-btn {
  background: none;
  border: none;
  color: #fff;
  font-size: 1.2rem;
  cursor: pointer;
  transition: color 0.3s ease;
}

.social-btn:hover {
  color: #3498db;
}

.footer-links {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;
}

.footer-section h3 {
  font-size: 1.2rem;
  margin-bottom: 1rem;
  color: #3498db;
}

.footer-section ul {
  list-style-type: none;
  padding: 0;
}

.footer-section ul li {
  margin-bottom: 0.5rem;
}

.footer-section a {
  color: #ccc;
  text-decoration: none;
  transition: color 0.3s ease;
}

.footer-section a:hover {
  color: #fff;
}

.attribution-section {
  margin-top: 2rem;
  text-align: center;
  border-top: 1px solid #333;
  padding-top: 1rem;
}

.attribution-section h4 {
  font-size: 1rem;
  margin-bottom: 1rem;
  color: #3498db;
}

.attribution-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
  font-size: 0.8rem;
}

.attribution-list a {
  color: #999;
  text-decoration: none;
  transition: color 0.3s ease;
}

.attribution-list a:hover {
  color: #fff;
}

@media (max-width: 768px) {
  .footer-content,
  .footer-links {
    flex-direction: column;
  }

  .footer-section {
    text-align: center;
  }

  .attribution-list {
    flex-direction: column;
    align-items: center;
  }
}
</style>