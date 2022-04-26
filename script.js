const sectionItems = document.querySelector('.items');

function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

const getInnerHTMLOl = () => document.getElementsByClassName('cart__items')[0].innerHTML;

function cartItemClickListener(event) {
  // coloque seu código aqui
  event.target.remove();
  saveCartItems(getInnerHTMLOl());
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

async function addItemCart(event) {
  const productCart = await fetchItem(getSkuFromProductItem(event.target.parentNode));
  const productCartAjustado = await 
  { sku: productCart.id, name: productCart.title, salePrice: productCart.price };
  const itemLi = createCartItemElement(productCartAjustado);
  const olCart = document.querySelector('.cart__items');
  olCart.appendChild(itemLi);
  saveCartItems(getInnerHTMLOl());
}

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  const botao = createCustomElement('button', 'item__add', 'Adicionar ao carrinho!');
  botao.addEventListener('click', (e) => addItemCart(e));
  section.appendChild(botao);
  return section;
}

const createElementInDom = async () => {
  const todosProdutos = await fetchProducts('computador');
  // console.log(todosProdutos)
  sectionItems.innerHTML = '';
  todosProdutos.results.map((produto) => {
    const produtoAjustado = { sku: produto.id, name: produto.title, image: produto.thumbnail };
    sectionItems.appendChild(createProductItemElement(produtoAjustado));
    return true;
  });
  return true;
};

const createElementsLocalStorage = () => {
  // seu código aqui

  const itemsLocalStorage = JSON.parse(getSavedCartItems());
  const olCart = document.getElementsByClassName('cart__items')[0];
  olCart.innerHTML = itemsLocalStorage;
  [...olCart.children].forEach((element) => {
    element.addEventListener('click', (e) => window.cartItemClickListener(e));
  });
};

window.onload = () => { 
  createElementInDom();
  createElementsLocalStorage();
};
