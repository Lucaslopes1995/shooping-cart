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

const addInDomPriceCart = (totalcart) => {
  const valorTotal = document.getElementsByClassName('tag-total-price')[0];
  valorTotal.innerText = 'Subtotal: ';

  const stringTotal = document.createElement('span');
  stringTotal.className = 'total-price';
  stringTotal.innerText = totalcart;

  const tagStrong = document.createElement('strong');
  tagStrong.innerText = 'R$ ';
  tagStrong.appendChild(stringTotal);

  valorTotal.appendChild(tagStrong);
};

const getPriceCart = () => {
  const cartList = [...document.getElementsByClassName('cart__item')];
  const totalcart = cartList.reduce((ant, at) => {
    const a = parseFloat(at.innerText.replace(/.+\$(.+)/, function (total, parte2) {
      // console.log(parte2)
      return parte2;
    }));
    const soma = ant + a;
    return soma;
  }, 0);

  addInDomPriceCart(totalcart);
};

function cartItemClickListener(event) {
  // coloque seu código aqui
  // console.log(event.target.parentNode);
  event.target.parentNode.remove();
  saveCartItems(getInnerHTMLOl());
  getPriceCart();
}

function createCartItemElement({ sku, name, salePrice, img }) {
  const li = document.createElement('li');

  const imgEl = document.createElement('img');
  imgEl.src = img;

  const span = document.createElement('span');
  span.className = 'cart__item';
  span.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.appendChild(imgEl);
  li.appendChild(span);

  li.addEventListener('click', cartItemClickListener);
  li.className = 'class-li-cart';

  return li;
}

async function addItemCart(event) {
  const productCart = await fetchItem(getSkuFromProductItem(event.target.parentNode));
  // console.log(productCart);
  const productCartAjustado = await 
  { sku: productCart.id,
name: productCart.title, 
salePrice: productCart.price,
img: productCart.thumbnail };
  const itemLi = createCartItemElement(productCartAjustado);
  const olCart = document.querySelector('.cart__items');
  olCart.appendChild(itemLi);
  saveCartItems(getInnerHTMLOl());
  getPriceCart();
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

const waitingAPI = () => {
  const loading = document.createElement('p');
  loading.innerText = 'carregando...';
  loading.className = 'loading';
  sectionItems.appendChild(loading);
};

const createElementInDom = async () => {
  waitingAPI();
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

const renderizavalorTotal = () => {
  const sectionCarrinho = document.getElementsByClassName('cart')[0];
  const valorTotal = document.createElement('p');
  valorTotal.className = 'tag-total-price';
  valorTotal.innerText = 0;
  sectionCarrinho.appendChild(valorTotal);
};

const emptCart = () => {
  const botaoEsvaziarCarrinho = document.getElementsByClassName('empty-cart')[0];
  const olListaItems = document.getElementsByClassName('cart__items')[0];
  botaoEsvaziarCarrinho.addEventListener('click', () => {
    olListaItems.innerHTML = '';
    getPriceCart();
    saveCartItems(getInnerHTMLOl());
  });
};

const createElementsLocalStorage = () => {
  // seu código aqui

  const itemsLocalStorage = JSON.parse(getSavedCartItems());
  const olCart = document.getElementsByClassName('cart__items')[0];
  olCart.innerHTML = itemsLocalStorage;
  [...olCart.children].forEach((element) => {
    element.addEventListener('click', (e) => cartItemClickListener(e));
  });
};

window.onload = () => { 
  createElementInDom();
  createElementsLocalStorage();
  renderizavalorTotal();
  getPriceCart();
  emptCart();
};