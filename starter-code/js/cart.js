/* global Cart */
'use strict';

// Create an event listener so that when the delete link is clicked, the removeItemFromCart method is invoked.
var table = document.getElementById('cart');
table.addEventListener('click', removeItemFromCart);
var cart;

function loadCart() {
  var cartItems = JSON.parse(localStorage.getItem('cart')) || [];
  cart = new Cart(cartItems);
}

// Make magic happen --- re-pull the Cart, clear out the screen and re-draw it
function renderCart() {
  loadCart();
  clearCart();
  showCart();
}

// TODO: Remove all of the rows (tr) in the cart table (tbody)
function clearCart() {
  let tableBody = table.getElementsByTagName('tbody');
  tableBody[0].innerHTML = '';
}

// TODO: Fill in the <tr>'s under the <tbody> for each item in the cart
function showCart() {
  for (let i = 0; i < cart.items.length; i++) {
    let tableBody = table.getElementsByTagName('tbody');
    let itemRow = document.createElement('tr');
    let removeColumn = document.createElement('td');
    let productColumn = document.createElement('td');
    let img = document.createElement('img');
    Product.allProducts.forEach(function(item) {
      if (item.name === cart.items[i].product) {
        img.setAttribute('src', item.filePath);
        img.setAttribute('width', 75);
        img.setAttribute('height', 75);
        img.setAttribute('alt', item.name);
        img.setAttribute('title', item.name);
      }
    });
    let quantityColumn = document.createElement('td');
    removeColumn.textContent = 'X';
    quantityColumn.textContent = cart.items[i].quantity;
    itemRow.appendChild(removeColumn);
    itemRow.appendChild(quantityColumn);
    itemRow.appendChild(img);
    tableBody[0].appendChild(itemRow);
  }


  // TODO: Find the table body

  // TODO: Iterate over the items in the cart
  // TODO: Create a TR
  // TODO: Create a TD for the delete link, quantity,  and the item
  // TODO: Add the TR to the TBODY and each of the TD's to the TR

}

function removeItemFromCart(event) {
  if (event.target.textContent === 'X' && event.target.parentNode.rowIndex > 0) {
    cart.removeItem(parseInt(event.target.parentNode.rowIndex - 1));
    console.log('what going on');
    console.log(cart);
    cart.saveToLocalStorage();
    renderCart();
  }
  // TODO: When a delete link is clicked, use cart.removeItem to remove the correct item
  // TODO: Save the cart back to local storage
  // TODO: Re-draw the cart table

}

// This will initialize the page and draw the cart on screen
renderCart();
