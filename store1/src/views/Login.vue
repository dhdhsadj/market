<template>
  <div class="login-container">
    <div class="login-form">
      <div class="branding">
        <img src="/store.png" alt="Logo" class="logo" />
        <div class="company-name">
          <span class="blue-text">P.</span>mercado
        </div>
      </div>
      <h2>Entrar na sua conta</h2>
      
      <!-- Área de Mensagens -->
      <div v-if="message" :class="{'success-message': isSuccess, 'error-message': !isSuccess}">
        {{ message }}
      </div>

      <form @submit.prevent="login">
        <div class="form-group">
          <label for="username">Username:</label>
          <input id="username" type="text" v-model="username" required />
        </div>
        <div class="form-group">
          <label for="password">Password:</label>
          <input id="password" type="password" v-model="password" required />
        </div>
        <button type="submit" class="login-button" :disabled="isLoading">
          <span v-if="isLoading">Entrando...</span>
          <span v-else>Entrar</span>
        </button>
      </form>
      <p class="signup-message">
        Não tem uma conta? <router-link to="/signup">Crie uma aqui</router-link>.
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';

interface LoginComponent {
  $auth: any;
  message: string;
  username: string;
  password: string;
  isLoading: boolean;
  isSuccess: boolean;
  router: any;
}

export default defineComponent({
  name: 'Login',
  data() {
    return {
      username: '',
      password: '',
      isLoading: false,
      message: '',
      isSuccess: false,
    };
  },
  setup() {
    const router = useRouter();
    return { router };
  },
  methods: {
    async login(this: LoginComponent) {
      this.message = ''; // Limpa a mensagem ao iniciar o login
      if (this.username && this.password) {
        this.isLoading = true;
        try {
          const res = await this.$auth.login(this.username, this.password);
          console.log('Resposta do login:', res); // Para depuração

          if (res && typeof res === 'object') {
            if (res.message == "Logged In") {
              this.message = "Login realizado com sucesso!";
              this.isSuccess = true;
              localStorage.setItem('isLoggedIn', 'true'); // Salvando status de login
              this.$router.replace('/home'); // Redirecionamento direto
            
            } else {
              this.message = "Login falhou. Verifique suas credenciais.";
              this.isSuccess = false;
            }
          } else {
            this.message = "Erro inesperado: resposta do servidor não é válida.";
            this.isSuccess = false;
          }
        } catch (error: unknown) {
          console.error("Erro durante o login:", error);
          if (error instanceof Error) {
            if ((error as any).response && (error as any).response.data) {
              this.message = (error as any).response.data.message || "Ocorreu um erro durante o login. Tente novamente.";
            } else {
              this.message = "Ocorreu um erro durante o login. Tente novamente.";
            }
          } else {
            this.message = "Ocorreu um erro desconhecido durante o login. Tente novamente.";
          }
          this.isSuccess = false;
        } finally {
          this.isLoading = false; // Certifique-se de parar o loading após o processo
        }
      }
    }
  }
});
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f3f4f6;
}
.login-form {
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 500px;
}
.branding {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
}
.logo {
  width: 38px;
  height: auto;
  margin-right: 0.5rem;
}
.company-name {
  font-size: 1.4rem;
  font-weight: bold;
}
.blue-text {
  color: #2183da;
}
h2 {
  text-align: center;
  margin-bottom: 1.5rem;
  color: #333;
}
.form-group {
  margin-bottom: 1rem;
}
label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
  color: #4a5568;
}
input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  font-size: 1rem;
}
input:focus {
  outline: none;
  border-color: #2183da;
  box-shadow: 0 0 0 3px rgba(33, 131, 218, 0.1);
}
.login-button {
  width: 100%;
  padding: 0.75rem;
  background-color: #2183da;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s;
}
.login-button:hover {
  background-color: #1a65a3;
}
.login-button:disabled {
  background-color: #a0c4e3;
  cursor: not-allowed;
}
.signup-message {  
  text-align: center;
  margin-top: 1rem;
}

/* Estilos para mensagens de sucesso e erro */
.success-message {
  color: #28a745; /* Verde para sucesso */
  margin-bottom: 1rem;
  text-align: center;
}

.error-message {
  color: #dc3545; /* Vermelho para erro */
  margin-bottom: 1rem;
  text-align: center;
}
</style>
