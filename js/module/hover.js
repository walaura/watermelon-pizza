const parseLink = $link => ({
	name: $link.attributes['data-type'].value,
});

const linkStatusChangeEvent = 'link-status-change';

const onLoad = () => {
	window.addEventListener(linkStatusChangeEvent, ev => {
		if (ev.detail && ev.detail.name) {
			document.body.dataset.hovered = ev.detail.name;
		} else {
			delete document.body.dataset.hovered;
		}
	});

	[...document.querySelectorAll('.🌎')].forEach($link => {
		$link.innerHTML = $link.innerHTML
			.trim()
			.split('')
			.map(
				(str, i) =>
					`<span class="🌎-⏹"" style="animation-delay:${(i - 1) / 15}s">
						${str}
					</span>`
			)
			.join('');

		$link.addEventListener('mouseenter', () => {
			window.dispatchEvent(
				new CustomEvent(linkStatusChangeEvent, { detail: parseLink($link) })
			);
		});
		$link.addEventListener('mouseleave', () => {
			window.dispatchEvent(
				new CustomEvent(linkStatusChangeEvent, { detail: null })
			);
		});
	});
};

export { linkStatusChangeEvent };
export default onLoad;
