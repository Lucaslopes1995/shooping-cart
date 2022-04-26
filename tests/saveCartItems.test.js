const localStorageSimulator = require('../mocks/localStorageSimulator');
const saveCartItems = require('../helpers/saveCartItems');

localStorageSimulator('setItem');

describe('4 - Teste a função saveCartItems', () => {
  // implemente seus testes aqui
  //fail('Teste vazio');


  test('verifica se localStorage.setItem foi chamada', async ()=>{
    const salvaDados = saveCartItems('<ol><li>Item</li></ol>');
    expect(localStorage.setItem).toHaveBeenCalled()
  })

  test('verifica se localStorage.setItem foi chamada com dois parametros', async ()=>{
    const parametroLocalStorage = '<ol><li>Item</li></ol>'
    const salvaDados = saveCartItems(parametroLocalStorage);
    expect(localStorage.setItem).toHaveBeenCalledWith('cartItems',`\"${parametroLocalStorage}\"`)
  })


});
