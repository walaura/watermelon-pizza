const $year = document.querySelector("x-year");
$year.innerText = new Date().getFullYear();

const links = document.querySelector("nav.links");

links.addEventListener("wheel", (e) => {
  if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
    return;
  }

  // Check if the element can scroll horizontally
  const canScrollHorizontally = links.scrollWidth > links.clientWidth;
  if (!canScrollHorizontally) {
    return;
  }
  e.preventDefault();
  links.scrollLeft += e.deltaY;
});
