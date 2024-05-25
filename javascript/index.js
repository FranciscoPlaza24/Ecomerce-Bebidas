const database = {
  cervezas: [
    { nombre: "Cerveza 1", precio: 5.99 },
    { nombre: "Cerveza 2", precio: 6.99 },
    { nombre: "Cerveza 3", precio: 4.99 },
  ],
  vinos: [
    { nombre: "Vino 1", precio: 9.99 },
    { nombre: "Vino 2", precio: 12.99 },
    { nombre: "Vino 3", precio: 7.99 },
  ],
  licores: [
    { nombre: "Licor 1", precio: 15.99 },
    { nombre: "Licor 2", precio: 18.99 },
    { nombre: "Licor 3", precio: 14.99 },
  ],
  otros: [
    { nombre: "Otro 1", precio: 8.99 },
    { nombre: "Otro 2", precio: 10.99 },
    { nombre: "Otro 3", precio: 6.99 },
  ],
  masProductos1: [
    { nombre: "Más Producto 1", precio: 20.99 },
    { nombre: "Más Producto 2", precio: 22.99 },
    { nombre: "Más Producto 3", precio: 18.99 },
  ],
  masProductos2: [
    { nombre: "Más Producto 4", precio: 16.99 },
    { nombre: "Más Producto 5", precio: 14.99 },
    { nombre: "Más Producto 6", precio: 19.99 },
  ],
};

let cartCount = 0;
let cartItems = [];
let cartTotal = 0;

document.getElementById("cart-button").addEventListener("click", function () {
  let cartPopup = document.getElementById("cart-popup");
  cartPopup.style.display =
    cartPopup.style.display === "block" ? "none" : "block";

  displayCartItems();
  displayCartTotal();
});

let addToCartButtons = document.querySelectorAll(".add-to-cart");
addToCartButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    const productName = this.parentNode.querySelector("img").alt;
    const productPrice = parseFloat(
      database[this.parentNode.parentNode.id][
        Array.from(this.parentNode.parentNode.children).indexOf(
          this.parentNode
        )
      ].precio
    );

    cartItems.push({ nombre: productName, precio: productPrice });

    cartCount++;

    document.getElementById("cart-count").textContent = cartCount;

    displayCartItems();
    displayCartTotal();
    saveCartToLocalStorage(); 
  });
});

function displayCartItems() {
  const cartItemsDiv = document.getElementById("cart-items");
  cartItemsDiv.innerHTML = "";
  cartItems.forEach((item, index) => {
    const itemDiv = document.createElement("div");
    itemDiv.textContent = `${item.nombre}: $${item.precio.toFixed(2)}`;
    const removeButton = document.createElement("button");
    removeButton.textContent = "X";
    removeButton.className = "remove-item";
    removeButton.addEventListener("click", function () {
      cartItems.splice(index, 1); 
      cartCount--; 
      document.getElementById("cart-count").textContent = cartCount; 
      displayCartItems(); 
      displayCartTotal(); 
      saveCartToLocalStorage();
    });
    itemDiv.appendChild(removeButton); 
    cartItemsDiv.appendChild(itemDiv);
  });
}

function displayCartTotal() {
  const cartTotalSpan = document.getElementById("cart-total");
  cartTotal = cartItems.reduce((total, item) => total + item.precio, 0);
  cartTotalSpan.textContent = `$${cartTotal.toFixed(2)}`;
}

// Guardar el estado del carrito en localStorage
function saveCartToLocalStorage() {
  localStorage.setItem('cartItems', JSON.stringify(cartItems));
  localStorage.setItem('cartCount', cartCount);
}

// Cargar el estado del carrito desde localStorage
function loadCartFromLocalStorage() {
  const savedCartItems = localStorage.getItem('cartItems');
  const savedCartCount = localStorage.getItem('cartCount');

  if (savedCartItems) {
    cartItems = JSON.parse(savedCartItems);
  }

  if (savedCartCount) {
    cartCount = parseInt(savedCartCount, 10);
  }

  document.getElementById("cart-count").textContent = cartCount;
  displayCartItems();
  displayCartTotal();
}

window.addEventListener('load', loadCartFromLocalStorage);

document.getElementById("search-button").addEventListener("click", function () {
  performSearch();
});

document.getElementById("search-input").addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    performSearch();
  }
});

document.getElementById("search-input").addEventListener("input", function () {
  const searchTerm = this.value.trim().toLowerCase();

  if (searchTerm === "") {
    resetImages();
  }
});

function performSearch() {
  const searchTerm = document.getElementById("search-input").value.trim().toLowerCase();
  let category;

  const searchMessage = document.getElementById("search-message");

  if (searchTerm === "cervezas") {
    category = "cervezas";
  } else if (searchTerm === "vinos") {
    category = "vinos";
  } else if (searchTerm === "otros") {
    category = "otros";
  } else if (searchTerm === "licores") {
    category = "licores";
  } else if (searchTerm === "cigarrillos") {
    category = "masProductos1";
  } else if (searchTerm === "alfajores") {
    category = "masProductos2";
  } else {
    searchMessage.textContent = "No se encontraron resultados para la búsqueda.";
    searchMessage.style.display = "block";
    return;
  }

  searchMessage.textContent = ""; 
  searchMessage.style.display = "none"; 
  displayProducts(category);
}

function displayProducts(category) {
  const productCategories = document.querySelectorAll(".product-category");
  productCategories.forEach((category) => {
    category.style.display = "none";
  });

  const categorySection = document.getElementById(category);
  categorySection.style.display = "block";
}

function resetImages() {
  const productCategories = document.querySelectorAll(".product-category");
  productCategories.forEach((category) => {
    category.style.display = "block";
  });
}
