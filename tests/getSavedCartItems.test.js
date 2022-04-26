const localStorageSimulator = require('../mocks/localStorageSimulator');
const getSavedCartItems = require('../helpers/getSavedCartItems');

localStorageSimulator('getItem');

describe('4 - Teste a função getSavedCartItems', () => {
  // implemente seus testes aqui
  //fail('Teste vazio');

  test('verifica se a função getSavedCartItems foi chamada', async ()=>{
    const getLocalStorage = getSavedCartItems();
    expect(localStorage.getItem).toHaveBeenCalled()
  })

  test('verifica se a função getSavedCartItems foi chamada com cartItems', async ()=>{
    const getLocalStorage = getSavedCartItems();
    expect(localStorage.getItem).toHaveBeenCalledWith('cartItems')
  })
});
