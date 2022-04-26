require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fecthProducts', () => {
  // implemente seus testes aqui
  //fail('Teste vazio');

  test('valida se fetchProducts é uma função', async ()=>{
    expect(typeof fetchProducts).toBe('function');
  })


  test('verifica se a função fetchProducts foi chamada', async ()=>{
    await fetchProducts('computador');
    expect(fetch).toHaveBeenCalled()
  })

  test('verifica se utiliza o URL correto', async ()=>{
    const URL = 'https://api.mercadolibre.com/sites/MLB/search?q=computador'
     await fetchProducts('computador');
    expect(fetch).toHaveBeenCalledWith(URL)
  })

  test('verifica a resposta da API', async ()=>{
     const respostaAPI = await fetchProducts('computador');
    expect(respostaAPI).toBe(computadorSearch)
  })

  test('verifica a resposta da API sem Entrada', async ()=>{

    await expect(fetchProducts()).rejects.toThrow('You must provide an url');
    
 })

});
