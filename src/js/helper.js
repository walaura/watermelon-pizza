export const randomButPrefersEdges = () => {
  const rnd = Math.random() * 0.3;
  return Math.random() >= 0.5 ? rnd : 1 - rnd;
};
