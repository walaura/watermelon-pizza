(function(){

	var makeMaterial = function(color){
		return new THREE.MeshLambertMaterial({
			emissive: color,
			emissiveIntensity: 1,
			color: color,
		});
	}

	var getCssColor = function(name) {
		var color = window
			.getComputedStyle(document.documentElement)
			.getPropertyValue('--color-'+name)
			.replace(/#/g,'')
			.trim();
		return parseInt(color,16);
	}

	/*0xff4e18*/
	var neutralItem = {
		color: getCssColor('rain'),
		material: makeMaterial(getCssColor('rain'))
	};
	var items = {
		twitter: {
			color: 0xeeeeee,
			model: 'birb',
			material: makeMaterial(0xcccccc),
			scale: 1
		},
		linkedin: {
			color: 0xeeeeee,
			model: 'coffee',
			material: makeMaterial(0xcccccc),
			scale: .33
		},
		mail: {
			color: 0xeeeeee,
			model: 'mail',
			material: makeMaterial(0xcccccc),
			scale: 1
		},
		itch: {
			color: 0xeeeeee,
			model: 'pad',
			material: makeMaterial(0xcccccc),
			scale: .33
		},
		github: {
			color: 0xeeeeee,
			model: 'screen',
			material: makeMaterial(0xcccccc),
			scale: 1
		},
		flickr: {
			color: 0xeeeeee,
			model: 'camera',
			material: makeMaterial(0xcccccc),
			scale: 1
		}

	};

	var go = function(ev){

		var scene = new THREE.Scene();
		var camera = new THREE.PerspectiveCamera( 5, window.innerWidth/window.innerHeight, 0.1, 1000 );
		var renderer = new THREE.WebGLRenderer({
			alpha: true
		});

		renderer.setSize( window.innerWidth, window.innerHeight );
		document.body.appendChild( renderer.domElement );
		var directionalLight = new THREE.DirectionalLight( 0xffffff, .25);
		directionalLight.position.set( 0, 0, .1 );
		scene.add( directionalLight );

		var directionalLight = new THREE.DirectionalLight( 0xffffff, .25 );
		directionalLight.position.set( 0, 1, 0 );
		scene.add( directionalLight );

		camera.position.z = 25;
		window.document.addEventListener('mousemove',function(ev){
			var pos = [
				.5 - (ev.clientX / window.innerWidth),
				.5 - (ev.clientY / window.innerHeight)
			];

			camera.rotation.z = pos[0] / 100 * -1;
			camera.rotation.y = pos[0] / 100 * -1;
			camera.position.z = 25 + pos[1];
		});

		var loader = new THREE.JSONLoader();

		var itemsToLoad = 0;
		var itemsLoaded = 0;

		for(var i in items) {
			if(items[i].model) itemsToLoad++;
			loader.load(
				'res/model/'+items[i].model+'.json',
				function(geometry){
					itemsLoaded++;
					console.log(this.i);
					items[this.i]["geometry"] = geometry;
					if(itemsLoaded >= itemsToLoad) gogogo();
				}.bind({i:i})
			);

		}

		var gogogo = function(geometry){
			var cubes = [];
			setInterval(function(){
				var material, geometry, cube, item, from;
				if(items[window.hovered]) {
					item = items[window.hovered];
					material = items[window.hovered].material;
					from = window.hovered;
				} else {
					item = items[Object.keys(items)[Math.floor(Math.random()*Object.keys(items).length)]];
					material = neutralItem.material;
					from = 'gen';
				}

				cube = new THREE.Mesh( item.geometry, material );
				cube.position.z = Math.random() * 60 - 40;
				cube.position.y = 2.75;
				cube.position.x = Math.random() * 10 - 5;

				cube.rotation.z += Math.random() / 10;
				cube.rotation.y += Math.random() / 10;

				cube._direction = Math.random() > .5;
				cube._from = from;
				cube._maxSpeed = 1;
				cube._speed = 1;
				cube._maxScale = item.scale;

				cube.scale.set(0,0,0);

				cubes.push(cube);
				scene.add( cube );

				cubes.map(function(cube){
					if (cube.position.y < -5) scene.remove(cube);
				});
			},300);

			var render = function () {
				requestAnimationFrame( render );

				cubes.map(function(cube){

					if(window.hovered && window.hovered !== cube._from) {
						cube._maxSpeed = -5;
					}
					if(!window.hovered && cube._from !== 'gen') {
						cube._maxSpeed = -5;
					}

					if(cube._maxSpeed > cube._speed) {
						cube._speed += .25;
					}
					if(cube._maxSpeed < cube._speed) {
						cube._speed -= .25;
					}

					if(cube.scale.y < cube._maxScale) {
						var update = cube.scale.y + .025;
						cube.scale.set(update,update,update);
					}

					if(cube._direction) {
						cube.rotation.y += Math.random() / 500;
						cube.rotation.z += Math.random() / 500;
						cube.rotation.x += Math.random() / 500;
					}
					else {
						cube.rotation.y -= Math.random() / 500;
						cube.rotation.z -= Math.random() / 500;
						cube.rotation.x -= Math.random() / 500;
					}

					cube.position.y -= 0.0075 * cube._speed;
				});

				renderer.render(scene, camera);
			};

			render();
		}

	};

	if(document.readyState === "interactive") go();
	else window.addEventListener('DOMContentLoaded',go);

})();
