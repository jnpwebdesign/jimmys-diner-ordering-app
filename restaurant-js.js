import { menuArray } from "./data.js";

const pizzaBtn = document.getElementById("increment-pizza-btn");
const burgerBtn = document.getElementById("increment-burger-btn");
const beerBtn = document.getElementById("increment-beer-btn");
const modalForm = document.getElementById("modal-form");
let itemCount = 0;
let totalItemPrice = 0;

menuArray.forEach(function(food){
    food.myOrderCount = 0;                  //creates myOrderCount = 0 in each food object in the array menuArray
})

document.addEventListener("click", function(e) {
        if(e.target.dataset.add) {
            addItemToOrder(e.target.dataset.add);
        } else if (e.target.id == "complete-order-btn" && totalOrderPrice != 0) {
            modalForm.style.display="flex";
            document.getElementById("totalLine").style.borderTop ="1px solid black";                     
        } else if (e.target.id == "remove") {
            removeItemFromOrder(e.target.dataset.remove);                          
        }      
})

let emptyCartText = document.getElementById("empty-cart-text");
let pizzaDisplayedPrice = document.getElementById("pizza-cost");

function addItemToOrder(item) {
    for (let food of menuArray) {
        if (food.name === item) {
            food.myOrderCount++;
        }
    }
    renderYourOrder();  
}

function removeItemFromOrder(item) {
    for (let food of menuArray) {
        if (food.name === item) {
            food.myOrderCount = 0;
        }
    }
    renderYourOrder();  
}
let totalOrderPrice = 0;
function renderYourOrder() {
    let yourOrderFeed = "";
    totalOrderPrice = 0;
    menuArray.forEach(function(food){
        if (food.myOrderCount > 0) {
            yourOrderFeed += `
            <div class="item-info">
                <p id="order-item-text" class="order-item-text">${food.name}     
                </p>
                <button class="remove" id="remove" data-remove="${food.name}">remove</button>
                <p class="order-item-text align-right">
                $${food.myOrderCount * food.price}
                </p>
            </div>
            `
        }    
    });  
    printYourOrder(yourOrderFeed); 
}

function printYourOrder(yourOrderFeed) {
    menuArray.forEach(function(food) {
        food.totalItemPrice = food.price * food.myOrderCount;
        totalOrderPrice += food.totalItemPrice;
    });  

    document.getElementById("your-order-container").innerHTML = `
        <h4>Your Order</h4>
        <div id="item-info">
            ${yourOrderFeed}
        </div>
        <div id="order-items">
            <div id="totalLine" class="order-items-container">
                <p class="order-item-text total-price">Total price:</p>
                <p id="total-price" class="order-item-text align-right total-price">
                $${totalOrderPrice}</p>
            </div>
            <div class="complete-order-container">
            <button id="complete-order-btn" class="btn"data-complete="total-price">Complete order</button>
            </div> 
        </div>                          
    `
}  

function getMenuItems() {
    let menuFeed = "";
     menuArray.forEach(function(food){
         menuFeed += `
        <div class="menu-item-container">
            <p class="emoji">${food.emoji}<p>
            <div class="food-card">
                <h3 class="menu-item-title" id="${food.name}">${food.name}</h3>
                <p class="menu-item-description">${food.ingredients}</p>
                <p class="menu-item-price">$${food.price}</p>
            </div>
            <button class="increment-btn align-right" id="increment-${food.name}-btn" data-add="${food.name}">+</button>
        </div>
        `
     })
    return menuFeed;
}

function renderMenu() {
    document.getElementById("menu-container").innerHTML = getMenuItems();
}

renderMenu();

modalForm.addEventListener("submit", function(e){
    e.preventDefault();

    let customerPaymentInfo = new FormData(modalForm);
    const customerName = customerPaymentInfo.get("name-input");
    const creditCardNumber = customerPaymentInfo.get("card-number-input");
    const cvv = customerPaymentInfo.get("cvv-input");
    modalForm.style.display = "none";
    displayThankYou(customerName);
})

function displayThankYou(customerName) {
    document.getElementById("your-order-container").innerHTML = `
        <div id="thank-you-container">
            <p id="thank-you-message">Thanks, ${customerName}! Your order is on its way!</p>
        </div>
    `
}
