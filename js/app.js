import hover from 'module/hover';
import three from 'module/three';

const go = () => [hover(), three()];

if (document.readyState === 'interactive') go();
else window.addEventListener('DOMContentLoaded', go);
