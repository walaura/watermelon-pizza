(function(){

	var go = function(ev){

		var elementList = document.querySelectorAll('.🌎');

		for (var link of elementList) {
			var str = link.innerHTML.trim().split('');
			var i = -1;
			str = str.map(function(str){
				i++;
				return '<span class="🌎-⏹"" style="animation-delay:'+i/15+'s">'+str+'</span>';
			});
			link.innerHTML = str.join('');
		}

	};

	if(document.readyState === "interactive") go();
	else window.addEventListener('DOMContentLoaded',go);

})();
