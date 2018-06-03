const randomArrKey = items => items[Math.floor(Math.random() * items.length)];

const loadRemote = url =>
	new Promise((resolve, reject) => {
		const script = document.createElement('script');
		script.type = 'text/javascript';
		script.src = url;
		script.addEventListener('load', () => resolve(script), false);
		script.addEventListener('error', () => reject(script), false);
		document.body.appendChild(script);
	});

export { randomArrKey, loadRemote };
