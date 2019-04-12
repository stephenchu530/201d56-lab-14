/* global Product, Cart */

'use strict';

// Set up an empty cart for use on this page.
var cart = new Cart([]);

// On screen load, we call this method to put all of the busmall options
// (the things in the Product.allProducts array) into the drop down list.
function populateForm() {

  //TODO: Add an <option> tag inside the form's select for each product
  var selectElement = document.getElementById('items');
  for (let i = 0; i < Product.allProducts.length; i++) {
    var option = document.createElement('option');
    option.text = Product.allProducts[i].name;
    selectElement.appendChild(option);
  }

}

// When someone submits the form, we need to add the selected item to the cart
// object, save the whole thing back to local storage and update the screen
// so that it shows the # of items in the cart and a quick preview of the cart itself.
function handleSubmit(event) {

  // TODO: Prevent the page from reloading
  event.preventDefault();

  // Do all the things ...
  addSelectedItemToCart();
  cart.saveToLocalStorage();
  updateCounter();
  updateCartPreview();

}

// TODO: Add the selected item and quantity to the cart
function addSelectedItemToCart() {
  // TODO: suss out the item picked from the select list
  // TODO: get the quantity
  // TODO: using those, add one item to the Cart
  var item = document.getElementById('items').value;
  var quanity = document.getElementById('quantity').value;
  cart.addItem(item, quanity);
}

// TODO: Update the cart count in the header nav with the number of items in the Cart
function updateCounter() {
  var itemCount = document.getElementById('itemCount');
  itemCount.textContent = cart.items.length;

}

// TODO: As you add items into the cart, show them (item & quantity) in the cart preview div
function updateCartPreview() {
  let aTag = document.getElementById('name-link');
  if (aTag !== null) {
    aTag.parentNode.removeChild(aTag);
  }
  // TODO: Get the item and quantity from the form
  // TODO: Add a new element to the cartContents div with that information
  var cartContents = document.getElementById('cartContents');
  var lastItem = cart.items[cart.items.length - 1];
  var p = document.createElement('p');
  p.textContent = 'You added ' + lastItem.quantity + ' ' + lastItem.product;
  cartContents.appendChild(p);

  let pLink = document.createElement('p');
  let link = document.createElement('a');
  link.setAttribute('id','name-link');
  link.textContent = 'Good Choice. Click to see your cart!';
  link.href = 'cart.html';

  cartContents.appendChild(pLink);
  pLink.appendChild(link);
  document.getElementById('catalog').reset();
}

// Set up the "submit" event listener on the form.
// This is the trigger for the app. When a user "submits" the form, it will
// Call that handleSubmit method above and kick off the whole process
var catalogForm = document.getElementById('catalog');
catalogForm.addEventListener('submit', handleSubmit);

// Before anything else of value can happen, we need to fill in the select
// drop down list in the form.
populateForm();
