document.addEventListener('DOMContentLoaded', () => {
	const themeToggle = document.getElementById('theme-toggle');
	const body = document.body;
	const storageKey = 'site-theme';

	function updateThemeButton(isLight) {
		themeToggle.textContent = isLight ? 'Modo Claro' : 'Modo Escuro';
		themeToggle.setAttribute('aria-pressed', String(isLight));
	}

	function applyTheme(theme) {
		const isLight = theme === 'light';
		body.classList.toggle('light-mode', isLight);
		updateThemeButton(isLight);
		localStorage.setItem(storageKey, theme);
	}

	function getInitialTheme() {
		const savedTheme = localStorage.getItem(storageKey);
		if (savedTheme) {
			return savedTheme;
		}
		const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
		return prefersDark ? 'dark' : 'light';
	}

	if (themeToggle) {
		themeToggle.addEventListener('click', () => {
			const nextTheme = body.classList.contains('light-mode') ? 'dark' : 'light';
			applyTheme(nextTheme);
		});

		const initialTheme = getInitialTheme();
		applyTheme(initialTheme);
	}

	const perfilLinks = document.querySelectorAll('.perfil');

	perfilLinks.forEach(link => {
		link.addEventListener('click', (event) => {
			// Encontrar o elemento de nome e a imagem dentro do perfil clicado
			const item = link.closest('.item-perfil');
			if (!item) return;

			const nomeEl = item.querySelector('.nome-perfil');
			const imgEl = item.querySelector('img');

			const nome = nomeEl ? nomeEl.textContent.trim() : '';
			let imgSrc = imgEl ? imgEl.getAttribute('src') : '';

			// Ajusta caminho relativo para que funcione a partir de catalogo/catalogo.html
			// Se for um caminho relativo como "assets/1.webp", prefixa "../" para apontar ao root
			if (imgSrc && !imgSrc.startsWith('http') && !imgSrc.startsWith('/') && !imgSrc.startsWith('..')) {
				imgSrc = '../' + imgSrc;
			}

			try {
				localStorage.setItem('perfilAtivoNome', nome);
				localStorage.setItem('perfilAtivoImagem', imgSrc);
			} catch (e) {
				// Silenciar erros de localStorage (ex: modo privado)
				console.warn('Não foi possível salvar o perfil ativo no localStorage', e);
			}

			// Deixar o link navegar normalmente para catalogo.html
		});
	});
});
