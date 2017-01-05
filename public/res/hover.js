var elementList = document.querySelectorAll('.🌎');
var body = document.querySelector('body');
window.hovered = undefined;
for (var link of elementList) {
	var str = link.innerHTML.trim().split('');
	var i = -1;
	str = str.map(function(str){
		i++;
		return '<span class="🌎-⏹"" style="animation-delay:'+i/15+'s">'+str+'</span>';
	});
	link.innerHTML = str.join('');

	link.addEventListener('mouseenter',function(){
		try {
			document.body.className = 'body--hover body--hover-'+this.attributes['data-type'].value;
			hovered = this.attributes['data-type'].value
		} catch (e) {
			console.error('Undefined data-type');
		}
	});
	link.addEventListener('mouseleave',function(){
		document.body.className = '';
		hovered = undefined
	});
}
