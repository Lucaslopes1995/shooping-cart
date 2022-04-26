const saveCartItems = (innerHTMLOl) => {
  // seu código aqui
  localStorage.setItem('cartItems', JSON.stringify(innerHTMLOl));
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
