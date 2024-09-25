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

    <div class="user-icon" @mouseenter="showUserMenu" @mouseleave="hideUserMenu">
      <v-avatar color="#F8F8F8" size="45" class="icon-btn" @click="goToUserAccount">
        <v-icon x-small color="#2183da" class="icon-user">fas fa-user</v-icon>
      </v-avatar>
      <div v-if="userMenuVisible" class="user-menu">
        <span v-if="isUserLoggedIn">{{ userName }}</span>
        <button v-if="isUserLoggedIn" @click.stop="logout">Logout</button>
        <router-link v-else to="/login">Login</router-link>
      </div>
    </div>

    <div class="cart-container" @click="toggleCart">
      <v-avatar color="#F8F8F8" size="45" class="icon-btn">
        <v-icon x-small color="#2183da" class="icon-cart">fas fa-shopping-cart</v-icon>
      </v-avatar>
      <span class="cart-item-count">{{ getCartItemCount }}</span>
    </div>

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
                <div>{{ item.quantity }} x {{ formatCurrency(item.price) }}</div>
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
import { defineComponent, computed, ref, inject } from 'vue';
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
    const auth = inject('$auth');
    const isCartVisible = ref(false);
    const userMenuVisible = ref(false);

    const toggleCart = () => {
      isCartVisible.value = !isCartVisible.value;
    };

    const showUserMenu = () => {
      userMenuVisible.value = true;
    };

    const hideUserMenu = () => {
      userMenuVisible.value = false;
    };

    const goToUserAccount = () => {
      router.push({ name: 'UserAccount' });
    };

    const logout = () => {
      auth.logout(); 
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

    };

    const checkout = () => {

    };

    const isUserLoggedIn = computed(() => !!auth.user); 

    return {
      isCartVisible,
      toggleCart,
      showUserMenu,
      hideUserMenu,
      goToUserAccount,
      logout,
      getCartItemCount,
      cartTotal,
      formatCurrency,
      removeFromCart,
      checkout,
      userMenuVisible,
      userName: computed(() => auth.user?.name || auth.user?.email),
      isUserLoggedIn
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
  border: 0.1px solid black;
  cursor: pointer;
  font-size: 1rem;
  margin-left: 8px;
  display: flex;
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
  font-size: 1.25rem;
}

.user-icon {
  position: relative;
  margin-left: 16px;
}

.user-menu {
  position: absolute;
  top: 40px; 
  left: -20px; 
  background: white;
  border: 1px solid #ddd;
  padding: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  z-index: 1000;
  min-width: 150px; 
}

.user-menu button,
.user-menu a {
  background: none;
  border: none;
  cursor: pointer;
  text-align: left;
  width: 100%;
}

.user-menu button:hover,
.user-menu a:hover {
  background-color: #f0f0f0;
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
