const fetchProducts = async (produto) => {
  // seu código aqui
  if (produto === undefined) {
   throw new Error('You must provide an url');
  }

  const URL = `https://api.mercadolibre.com/sites/MLB/search?q=${produto}`;
  
  const Result = await fetch(URL);
  const data = await Result.json();
  return data;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
