import { getItems, getNeutralItem } from './three/items.js';
import { linkStatusChangeEvent } from './hover.js';
import { randomArrKey, loadRemote } from 'helper/etc';
import { loadJsonPromise, itemsMatch } from 'helper/three';

const setup = three => {
	const scene = new three.Scene();
	const camera = new three.PerspectiveCamera(
		5,
		window.innerWidth / window.innerHeight,
		0.1,
		1000
	);
	const renderer = new three.WebGLRenderer({
		alpha: true,
	});

	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);

	[[0, 0, 0.1], [0, 1, 0]].forEach(lightParams => {
		const directionalLight = new three.DirectionalLight(0xffffff, 0.25);
		directionalLight.position.set(...lightParams);
		scene.add(directionalLight);
	});

	camera.position.z = 25;

	return { camera, renderer, scene };
};

const getItemsWithGeometry = (three, items) =>
	Promise.all(
		items.map(item =>
			loadJsonPromise(
				three.JSONLoader,
				'res/model/' + item.model + '.json'
			).then(geometry => ({
				...item,
				geometry,
			}))
		)
	);

const makeMesh = (three, { itemsWithGeometry, neutralItem, hovered }) => {
	const item = hovered ? hovered : randomArrKey(itemsWithGeometry);
	const itemName = hovered ? item.for : null;
	const maxSpeed = 1;
	const speed = 1;
	const direction = Math.random() > 0.5;
	const maxScale = item.scale;

	const mesh = new THREE.Mesh(
		item.geometry,
		hovered ? hovered.material : neutralItem.material
	);

	Object.entries({
		x: Math.random() * 10 - 5,
		y: 2.75,
		z: Math.random() * 60 - 40,
	}).forEach(([axis, value]) => {
		mesh.position[axis] = value;
	});

	Object.entries({
		y: Math.random() / 10,
		z: Math.random() / 10,
	}).forEach(([axis, value]) => {
		mesh.rotation[axis] += value;
	});

	mesh.scale.set(0, 0, 0);

	mesh.userData = {
		itemName,
		maxSpeed,
		speed,
		maxScale,
		direction,
	};

	return mesh;
};

const updateMesh = (mesh, hovered) => {
	if (
		(!hovered && mesh.userData.itemName !== null) ||
		(hovered && !itemsMatch(hovered, { for: mesh.userData.itemName }))
	) {
		mesh.userData.maxSpeed = 10;
	}

	if (mesh.userData.maxSpeed > mesh.userData.speed) {
		mesh.userData.speed += 0.15;
	}
	if (mesh.userData.maxSpeed < mesh.userData.speed) {
		mesh.userData.speed -= 0.15;
	}

	if (mesh.scale.y < mesh.userData.maxScale) {
		mesh.scale.set(...Array(3).fill(mesh.scale.y + 0.025));
	}

	if (mesh.userData.direction) {
		mesh.rotation.y += Math.random() / 500;
		mesh.rotation.z += Math.random() / 500;
		mesh.rotation.x += Math.random() / 500;
	} else {
		mesh.rotation.y -= Math.random() / 500;
		mesh.rotation.z -= Math.random() / 500;
		mesh.rotation.x -= Math.random() / 500;
	}

	mesh.position.y -= 0.0075 * mesh.userData.speed;

	return mesh;
};

const onLoad = () =>
	loadRemote('https://cdnjs.cloudflare.com/ajax/libs/three.js/r79/three.min.js')
		.then(() => {
			if (!window.THREE) throw new Error('error loading threejs');
			return window.THREE;
		})
		.then(three =>
			Promise.all([
				three,
				setup(three),
				getItemsWithGeometry(three, getItems(three)),
			])
		)
		.then(([three, { camera, renderer, scene }, itemsWithGeometry]) => {
			const meshes = [];
			const neutralItem = getNeutralItem(three);
			let hovered;

			window.addEventListener('mousemove', function(ev) {
				const pos = [
					0.5 - ev.clientX / window.innerWidth,
					0.5 - ev.clientY / window.innerHeight,
				];

				camera.rotation.z = pos[0] / 100 * -1;
				camera.rotation.y = pos[0] / 100 * -1;
				camera.position.z = 25 + pos[1];
			});

			window.addEventListener(linkStatusChangeEvent, ev => {
				hovered =
					ev.detail && ev.detail.name
						? itemsWithGeometry.find(_ => _.for === ev.detail.name)
						: null;
			});

			const updateMeshes = setInterval(() => {
				const mesh = makeMesh(three, {
					itemsWithGeometry,
					neutralItem,
					hovered,
				});

				meshes.push(mesh);
				scene.add(mesh);

				meshes.forEach((mesh, i) => {
					if (mesh.position.y < -5) {
						scene.remove(mesh);
						delete meshes[i];
					}
				});
			}, 300);

			const renderLoop = () => {
				meshes.forEach(mesh => updateMesh(mesh, hovered));
				requestAnimationFrame(renderLoop);
				renderer.render(scene, camera);
			};
			renderLoop();
		});

export default onLoad;
