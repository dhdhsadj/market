<template>
  <div class="signup-container">
    <div class="signup-form">
      <div class="branding">
        <img src="/store.png" alt="Logo" class="logo" />
        <div class="company-name">
          <span class="blue-text">P.</span>mercado
        </div>
      </div>
      <h2>Crie sua conta</h2>
      <form @submit.prevent="handleSignup">
        <div class="form-group">
          <label for="email">Email:</label>
          <input id="email" type="email" v-model="email" required />
        </div>
        <div class="form-group">
          <label for="username">Nome de Usuário:</label>
          <input id="username" type="text" v-model="username" required />
        </div>
        <div class="form-group">
          <label for="password">Senha:</label>
          <input id="password" type="password" v-model="password" required />
        </div>
        <button type="submit" class="signup-button">Criar Conta</button>
      </form>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
  name: 'Signup',
  setup() {
    const email = ref('');
    const username = ref('');
    const password = ref('');
    const router = useRouter();

    const handleSignup = async () => {
      try {
        alert('Conta criada com sucesso!');
        router.push('/login');
      } catch (error) {
        console.error('Erro ao criar conta:', error);
        alert('Ocorreu um erro. Tente novamente.');
      }
    };

    return {
      email,
      username,
      password,
      handleSignup,
    };
  }
};
</script>

<style scoped>
.signup-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f3f4f6;
}
.signup-form {
  background-color: white;
  padding: 2.0rem;
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
.signup-button {
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
.signup-button:hover {
  background-color: #1a65a3;
}
</style>
