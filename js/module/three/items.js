const makeMaterial = (three, color) => {
	return new THREE.MeshLambertMaterial({
		emissive: color,
		emissiveIntensity: 1,
		color: color,
	});
};

const getCssColor = name => {
	var color = window
		.getComputedStyle(document.documentElement)
		.getPropertyValue('--color-' + name)
		.replace(/#/g, '')
		.trim();
	return parseInt(color, 16);
};

const getNeutralItem = three => ({
	color: getCssColor('rain'),
	material: makeMaterial(three, getCssColor('rain')),
});

const getItems = three => [
	{
		for: 'twitter',
		color: 0xeeeeee,
		model: 'birb',
		material: makeMaterial(three, 0xcccccc),
		scale: 1,
	},
	{
		for: 'linkedin',
		color: 0xeeeeee,
		model: 'coffee',
		material: makeMaterial(three, 0xcccccc),
		scale: 0.33,
	},
	{
		for: 'mail',
		color: 0xeeeeee,
		model: 'mail',
		material: makeMaterial(three, 0xcccccc),
		scale: 1,
	},
	{
		for: 'itch',
		color: 0xeeeeee,
		model: 'pad',
		material: makeMaterial(three, 0xcccccc),
		scale: 0.33,
	},
	{
		for: 'github',
		color: 0xeeeeee,
		model: 'screen',
		material: makeMaterial(three, 0xcccccc),
		scale: 1,
	},
	{
		for: 'flickr',
		color: 0xeeeeee,
		model: 'camera',
		material: makeMaterial(three, 0xcccccc),
		scale: 1,
	},
	{
		for: 'behance',
		color: 0xeeeeee,
		model: 'paintbrush',
		material: makeMaterial(three, 0xcccccc),
		scale: 0.2,
	},
];

export { getItems, getNeutralItem };
