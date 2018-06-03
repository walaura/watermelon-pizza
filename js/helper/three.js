const loadJsonPromise = (loader, item) =>
	new Promise(yay => {
		new loader().load(item, function(geometry) {
			yay(geometry);
		});
	});

const itemsMatch = (item1, item2) => {
	if (!item1 || !item1.for) return null;
	if (!item2 || !item2.for) return null;
	return item1.for === item2.for;
};

export { loadJsonPromise, itemsMatch };
