// Função para carregar produtos da API e renderizar na página
function renderProducts() {
	fetch('https://pixinterativo.vercel.app/load_products')
		.then(response => response.json())
		.then(data => {
			const products = data.products || [];

			console.log('Produtos carregados:', products);
			const container = document.getElementById('products_container');
			if (!container) return;

			container.innerHTML = '';

			products.forEach(product => {

				// Adicionar apenas se todos os dados necessários estiverem presentes
				if (!product.product_id || !product.name || !product.price) {
					console.warn('Produto com dados incompletos ignorado:', product);
					return;
				}

				const section = document.createElement('section');
				section.className = 'glass-card row mb-3';

				// Imagem
				const colImg = document.createElement('div');
				colImg.className = 'col-2';
				const img = document.createElement('img');
				img.src = product.product_image || '../assets/minecraft_images/Mobs/Zombie.png';
				img.width = 50;
				img.alt = product.name;
				img.className = 'product-img m-2';
				colImg.appendChild(img);

				// Info
				const colInfo = document.createElement('div');
				colInfo.className = 'col d-flex flex-column justify-content-center';
				const h4 = document.createElement('h4');
				h4.textContent = product.name;
				const p = document.createElement('p');
				p.textContent = `Valor: R$ ${(product.price/100).toFixed(2)}`;
				colInfo.appendChild(h4);
				colInfo.appendChild(p);

				// Botão
				const colBtn = document.createElement('div');
				colBtn.className = 'col justify-content-end d-flex align-items-center';
				const btn = document.createElement('button');
				btn.className = 'btn-cta';
				btn.textContent = 'Comprar';
				btn.onclick = () => buy(product.product_id);
				colBtn.appendChild(btn);

				section.appendChild(colImg);
				section.appendChild(colInfo);
				section.appendChild(colBtn);

				container.appendChild(section);
			});
		})
		.catch(error => {
			console.error('Erro ao carregar produtos:', error);
		});
}

// Chame renderProducts ao carregar a página
document.addEventListener('DOMContentLoaded', renderProducts);
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
	let price = 100; // valor padrão em centavos
	let description = 'Interação na live';
	let order_id = 'pedido_01' ;

	if (interactionType === '10zombies') {
		price = 100;
		description = '10 Zumbis na live GGTEC';
		order_id = 'zombies_001';
	}
	// Monte o corpo da requisição
	const body = {
		//utilizar um ID único para cada cliente
		customer_id: customer_name,
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
		if (data && data.url) {
			// Redireciona para o link de pagamento
			window.location.href = data.url;
		} else {
			console.error('Resposta inesperada:', data);
		}
	})
	.catch(error => {
		console.error('Erro ao criar checkout:', error);
	});
}