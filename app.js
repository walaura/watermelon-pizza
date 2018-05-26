const express = require('express');
const path = require('path');
const config = require('./.watermelonrc');

const app = express();

app.use(express.static(config.files.out));
app.get('/', (req, res) => {
	res.sendFile(path.join(config.files.out + '/index.html'));
});

app.listen(config.ports.live, () =>
	console.log(`🍦 Running on http://localhost:${config.ports.live}/ !`)
);
