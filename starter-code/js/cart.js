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
    let quantityColumn = document.createElement('td');
    removeColumn.textContent = 'X';
    productColumn.textContent = cart.items[i].product;
    quantityColumn.textContent = cart.items[i].quantity;
    itemRow.appendChild(removeColumn);
    itemRow.appendChild(productColumn);
    itemRow.appendChild(quantityColumn);
    tableBody[0].appendChild(itemRow);
  }




  let consumerBlock = table.parentNode;
  let consumerForm = document.createElement('form');
  let consumerField = document.createElement('fieldset')

  let nameInput = document.createElement('input');
  let addressInput = document.createElement('input');
  let cityInput = document.createElement('input');
  let stateInput = document.createElement('input');
  let zipCodeInput = document.createElement('input');
  let phoneNumberInput = document.createElement('input');
  let creditCardInput = document.createElement('input');
  let submitInput = document.createElement('input');
  submitInput.setAttribute('type', 'submit');
  submitInput.setAttribute('onclick', 'removeItemFromCart(event)');

  let nameLabel = document.createElement('label');
  nameLabel.textContent = 'Name';
  let addressLabel = document.createElement('label');
  addressLabel.textContent = 'Address';
  let cityLabel = document.createElement('label');
  cityLabel.textContent = 'City';
  let stateLabel = document.createElement('label');
  stateLabel.textContent = 'State';
  let zipCodeLabel = document.createElement('label');
  zipCodeLabel.textContent = 'Zip';
  let phoneLabel = document.createElement('label');
  phoneLabel.textContent = 'Phone';
  let creditCardLabel = document.createElement('label');
  creditCardLabel.textContent = 'Credit Card';

  consumerField.appendChild(nameLabel);
  consumerField.appendChild(nameInput);

  consumerField.appendChild(addressLabel);
  consumerField.appendChild(addressInput);

  consumerField.appendChild(cityLabel);
  consumerField.appendChild(cityInput);

  consumerField.appendChild(stateLabel);
  consumerField.appendChild(stateInput);

  consumerField.appendChild(zipCodeLabel);
  consumerField.appendChild(zipCodeInput);

  consumerField.appendChild(phoneLabel);
  consumerField.appendChild(phoneNumberInput);

  consumerField.appendChild(creditCardLabel);
  consumerField.appendChild(creditCardInput);
  consumerField.appendChild(submitInput);

  consumerForm.appendChild(consumerField);
  consumerBlock.appendChild(consumerForm);

  // TODO: Find the table body

  // TODO: Iterate over the items in the cart
  // TODO: Create a TR
  // TODO: Create a TD for the delete link, quantity,  and the item
  // TODO: Add the TR to the TBODY and each of the TD's to the TR

}

function removeItemFromCart(event) {
  event.preventDefault();
  if (event.target.textContent === 'X' && event.target.parentNode.rowIndex > 0) {
    cart.removeItem(parseInt(event.target.parentNode.rowIndex - 1));
    cart.saveToLocalStorage();
    renderCart();
  } else if (event.type === 'click') {

    cart.items = [];

    cart.saveToLocalStorage();
    clearCart();

    let animation = document.getElementsByTagName('form')[0].parentNode;
    let message = document.createElement('p');
    message.textContent = 'Order Confirm';
    animation.appendChild(message);
    event.preventDefault();
  }
  // TODO: When a delete link is clicked, use cart.removeItem to remove the correct item
  // TODO: Save the cart back to local storage
  // TODO: Re-draw the cart table

}

// This will initialize the page and draw the cart on screen
renderCart();
