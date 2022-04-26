require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - Teste a função fecthItem', () => {
  // implemente seus testes aqui
  //fail('Teste vazio');

  test('testa se fetchItem é função',async () => {
    await expect(typeof fetchItem).toBe('function')
  })

  test('testa fetchItem se chama fetch',async () => {
    const resposta = await fetchItem('MLB1615760527')
    await expect(fetch).toHaveBeenCalled()
  })

  test ('testa seretorno da função com argumento é correto', async () =>{
    const URLAPI = 'https://api.mercadolibre.com/items/MLB1615760527'
    const resposta = await fetchItem('MLB1615760527');
    await expect(fetch).toHaveBeenCalledWith(URLAPI)
  })

  test ('testa seretorno da função com argumento é correto', async () =>{
    const resposta = await fetchItem('MLB1615760527');
    await expect(resposta).toEqual(item)
  })

  test('testa se lança erro com função sem argumento', async () => {
    await expect(fetchItem()).rejects.toThrow('You must provide an url')
  })
});
