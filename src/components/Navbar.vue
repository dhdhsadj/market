<template>
  <div class="app-bar">
    <router-link to="/" class="logo-link">
      <div class="badge">
        <img :src="logoUrl" alt="Logo" class="badge-img" />
      </div>
      <div class="toolbar-title">
        <span class="blue-text">P.</span><strong>mercado</strong>
      </div>
    </router-link>

    <div class="spacer"></div>

    <!-- Ícone de carrinho de compras com Vuetify -->
    <div class="cart-container" @click="toggleCart">
      <v-avatar color="#ECF7EE" size="40" class="icon-btn">
        <v-icon x-small color="#41AB55" class="icon-cart">fas fa-shopping-cart</v-icon>
      </v-avatar>
      <span class="cart-item-count">{{ getCartItemCount }}</span>
    </div>

    <!-- Botão de login -->
    <button class="login-btn" @click="redirectToLogin">
      Iniciar Sessão
    </button>

    <!-- Modal do Carrinho de Compras -->
    <v-dialog v-model="isCartVisible" max-width="500px">
      <v-card>
        <v-card-title>
          Seu Carrinho
        </v-card-title>
        <v-card-text>
          <v-list>
            <v-list-item v-for="item in cart" :key="item.id">
              <v-list-item-content>
                <div>{{ item.title }}</div>
                <div>
                  {{ item.quantity }} x {{ formatCurrency(item.price) }}
                </div>
              </v-list-item-content>
              <v-list-item-action>
                <v-btn icon @click="removeFromCart(item)">
                  <v-icon color="red">mdi-delete</v-icon>
                </v-btn>
              </v-list-item-action>
            </v-list-item>
          </v-list>
          <div>
            <strong>Total: {{ formatCurrency(cartTotal) }}</strong>
          </div>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" @click="checkout">Finalizar Compra</v-btn>
          <v-btn @click="toggleCart">Fechar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { VAvatar, VIcon, VDialog, VCard, VCardTitle, VCardText, VList, VListItem, VBtn } from 'vuetify/components';

interface CartItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
}

export default defineComponent({
  name: 'Navbar',
  components: {
    VAvatar,
    VIcon,
    VDialog,
    VCard,
    VCardTitle,
    VCardText,
    VList,
    VListItem,
    VBtn
  },
  props: {
    logoUrl: {
      type: String,
      default: '/store.png'
    },
    cart: {
      type: Array as () => CartItem[],
      default: () => []
    }
  },
  setup(props) {
    const router = useRouter();
    const isCartVisible = ref(false);

    const toggleCart = () => {
      isCartVisible.value = !isCartVisible.value;
    };

    const redirectToLogin = () => {
      router.push('/login');
    };

    const getCartItemCount = computed(() => {
      return props.cart.reduce((total, item) => total + item.quantity, 0);
    });

    const cartTotal = computed(() => {
      return props.cart.reduce((total, item) => total + item.price * item.quantity, 0);
    });

    const formatCurrency = (value: number) => {
      return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
    };

    const removeFromCart = (product: CartItem) => {
      // Lógica para remover o item do carrinho
    };

    const checkout = () => {
      // Lógica para finalizar a compra
    };

    return {
      isCartVisible,
      toggleCart,
      redirectToLogin,
      getCartItemCount,
      cartTotal,
      formatCurrency,
      removeFromCart,
      checkout
    };
  }
});
</script>

<style scoped>
.app-bar {
  position: fixed; 
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  background-color: white;
  padding: 10px 20px;
  border-bottom: 1px solid rgb(133, 129, 129);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 1000; 
}

.logo-link {
  display: flex;
  align-items: center;
  text-decoration: none;
  color: inherit;
}

.badge {
  margin-right: 16px;
}

.badge-img {
  width: 30px;
  height: 35px;
 
}

.toolbar-title {
  flex: 1;
  font-size: 1.5rem;
}

.blue-text {
  color: #2183da;
}

.spacer {
  flex-grow: 1;
}

.icon-btn {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1rem; /* Ajuste o tamanho da fonte para o ícone */
  margin-left: 8px;
  display: flex; /* Adiciona flexbox para centralizar o ícone */
  align-items: center;
  justify-content: center;
}

.cart-container {
  position: relative;
  display: flex;
  align-items: center;
}

.cart-item-count {
  position: absolute;
  top: -8px;
  right: -8px;
  background: #ff0000;
  color: white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
}
.icon-cart {
  font-size: 1.25rem; /* Ajuste o tamanho do ícone */
}

.login-btn {
  background-color: #2183da; 
  color: white; 
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  font-size: 1rem;
  cursor: pointer;
  margin-left: 16px;
  transition: background-color 0.3s ease;
}

.login-btn:hover {
  background-color: #1a6ab8; 
}

@media only screen and (max-width: 600px) {
  .toolbar-title {
    font-size: 1rem;
  }
}

body {
  padding-top: 60px; 
}
</style>
