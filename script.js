const Products = [
    { id: 1, name: 'Product-1', price: 100 },
    { id: 2, name: 'Product-2', price: 200 },
    { id: 3, name: 'Product-3', price: 300 },
  ];

  const cart = [];

  function renderProductList() {
    const productListElement = document.getElementById('productList');
    productListElement.innerHTML = '<h2>Product List</h2>';

    Products.forEach((product) => {
      const productElement = document.createElement('div');
      productElement.innerHTML = `
        <span>${product.name}  ${product.price}</span>
        <button onclick="addToCart(${product.id})">+</button>
      `;
      productListElement.appendChild(productElement);
      productElement.style.alignItems = 'center';
      productElement.style.alignContent = 'center';
      productElement.style.width = '80%';
      productElement.style.backgroundColor = ' rgb(166,166,166)';
      productElement.style.margin = '5%';
      productElement.style.padding = '5%';
      productElement.style.display = 'flex';
      productElement.style.alignItems = 'center';
      productElement.style.justifyContent = 'space-around';
    });
  }

  function renderCart() {
    const cartElement = document.getElementById('cart');
    cartElement.innerHTML = '<h2>Cart</h2>';

    if (cart.length === 0) {
      const noProductElement = document.createElement('p');
      noProductElement.textContent = 'No Product added to the cart';
      cartElement.appendChild(noProductElement);
      cartElement.style.width = '40%';
      cartElement.style.height = '40%';
      

    } else {
      cart.forEach((item) => {
        const cartItemElement = document.createElement('div');
        cartItemElement.innerHTML = `
          <span>${item.product.name} - ${item.product.price} x ${item.quantity}</span>
          <button onclick="removeFromCart(${item.product.id})">-</button>
        `;
        cartElement.appendChild(cartItemElement);
        cartElement.style.margin = '5%';
        cartElement.style.padding = '3%';
      });

      const totalPriceElement = document.createElement('p');
      const totalPrice = cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
      // totalPriceElement.textContent = Total_Price: $${totalPrice};
      totalPriceElement.textContent = `Total_Price: ${totalPrice}`;

      cartElement.appendChild(totalPriceElement);
      totalPriceElement.style.backgroundColor =  'rgb(166,166,166)';
      totalPriceElement.style.margin = '5% 0';
      totalPriceElement.style.padding = '5%';

    }
  }

  function addToCart(productId) {
    const product = Products.find((p) => p.id === productId);
    const existingItem = cart.find((item) => item.product.id === productId);

    if (existingItem) {
      existingItem.quantity++;
    } else {
      cart.push({ product, quantity: 1 });
    }

    renderCart();
  }

  function removeFromCart(productId) {
    const existingItem = cart.find((item) => item.product.id === productId);

    if (existingItem && existingItem.quantity > 1) {
      existingItem.quantity--;
    } else {
      const index = cart.findIndex((item) => item.product.id === productId);
      cart.splice(index, 1);
    }

    renderCart();
  }

  renderProductList();
  renderCart();