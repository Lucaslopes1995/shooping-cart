const getSavedCartItems = () => {
  // seu código aqui
    const elementosLocalStorage = localStorage.getItem('cartItems');
    return elementosLocalStorage;
};

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}