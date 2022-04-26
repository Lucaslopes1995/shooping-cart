const fetchItem = async (itemId) => {
  // seu código aqui
  if (itemId === undefined) {
    throw new Error('You must provide an url');
  }

  const URL = `https://api.mercadolibre.com/items/${itemId}`;
  
  const result = await fetch(URL);
  const data = await result.json();
  return data;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
