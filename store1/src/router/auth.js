export default {
	login(username, password) {
	  // Implementação do login aqui
	  // Retorna uma promessa que resolve com o resultado do login
	  return new Promise((resolve, reject) => {
		// Simulação de login bem-sucedido
		const res = {
		  exc_type: 'login_success',
		};
		resolve(res);
	  });
	},
  };