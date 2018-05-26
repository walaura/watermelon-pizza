const makeMaterial = color => {
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

const neutralItem = {
	color: getCssColor('rain'),
	material: makeMaterial(getCssColor('rain')),
};

const items = [
	{
		for: 'twitter',
		color: 0xeeeeee,
		model: 'birb',
		material: makeMaterial(0xcccccc),
		scale: 1,
	},
	{
		for: 'linkedin',
		color: 0xeeeeee,
		model: 'coffee',
		material: makeMaterial(0xcccccc),
		scale: 0.33,
	},
	{
		for: 'mail',
		color: 0xeeeeee,
		model: 'mail',
		material: makeMaterial(0xcccccc),
		scale: 1,
	},
	{
		for: 'itch',
		color: 0xeeeeee,
		model: 'pad',
		material: makeMaterial(0xcccccc),
		scale: 0.33,
	},
	{
		for: 'github',
		color: 0xeeeeee,
		model: 'screen',
		material: makeMaterial(0xcccccc),
		scale: 1,
	},
	{
		for: 'flickr',
		color: 0xeeeeee,
		model: 'camera',
		material: makeMaterial(0xcccccc),
		scale: 1,
	},
	{
		for: 'behance',
		color: 0xeeeeee,
		model: 'paintbrush',
		material: makeMaterial(0xcccccc),
		scale: 0.2,
	},
];

export { items, neutralItem };
