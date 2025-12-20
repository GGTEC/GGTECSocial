// Função chamada ao clicar em "Comprar" na index.html
function buy(interactionType) {
	// Salva o tipo de interação no localStorage para usar na próxima página
	localStorage.setItem('interactionType', interactionType);
	// Redireciona para a página do produto
	window.location.href = 'productpage.html';
}

// Função chamada ao clicar em "Comprar" na productpage.html
function buyProduct() {
	// Exemplo de dados, pode ser customizado conforme o produto/interação
	const interactionType = localStorage.getItem('interactionType') || '10zombies';
	const customer_name = document.getElementById('product_user_name')?.value || 'Cliente';
	// Defina os dados do produto conforme o tipo de interação
	let price = 1000; // valor padrão em centavos
	let description = 'Interação na live';
	let order_id = 'pedido_' + Math.floor(Math.random() * 1000000);
	if (interactionType === '10zombies') {
		price = 1000;
		description = '10 Zumbis na live GGTEC';
	}
	// Monte o corpo da requisição
	const body = {
		customer_id: 'cliente_001',
		customer_name: customer_name,
		price: price,
		description: description,
		order_id: order_id
	};
	// Envia a requisição para criar o checkout
	fetch('https://pixinterativo.vercel.app/create_checkout_infinitepay', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(body)
	})
	.then(response => response.json())
	.then(data => {
		if (data && data.checkout_url) {
			// Redireciona para o link de pagamento
			window.location.href = data.checkout_url;
		} else {
			alert('Erro ao criar checkout. Tente novamente.');
			console.error('Resposta inesperada:', data);
		}
	})
	.catch(error => {
		alert('Erro ao criar checkout.');
		console.error('Erro ao criar checkout:', error);
	});
}