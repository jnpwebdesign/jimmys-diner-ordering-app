import { menuArray } from "./data.js";

const pizzaBtn = document.getElementById("increment-pizza-btn");
const burgerBtn = document.getElementById("increment-burger-btn");
const beerBtn = document.getElementById("increment-beer-btn");
const modalForm = document.getElementById("modal-form");
let itemCount = 0;
let totalItemPrice = 0;
console.log(itemCount, totalItemPrice);

document.addEventListener("click", function(e) {
        if(e.target.dataset.add) {
            addItemToOrder(e.target.dataset.add);
            console.log(e.target.dataset.add)
        } else if (e.target.id == "complete-order-btn") {
         console.log(e.target.id);
     }   
})

let emptyCartText = document.getElementById("empty-cart-text");
let pizzaDisplayedPrice = document.getElementById("pizza-cost");


function addItemToOrder(item) {
    for (let food of menuArray) {
        if (food.name === item) {
            itemCount++;
            totalItemPrice = food.price * itemCount;
            console.log(`price: ${totalItemPrice}, count: ${itemCount}`)
        }
    }
    renderOrder();  
}



function addPizzaToOrder() {
    pizzaCount++;
    pizzaCost += 14;
    if (pizzaCount === 1) {
        emptyCartText.style.display="none";
        document.getElementById("order-pizza-text").innerHTML = `Pizza <button class="remove">remove</button>`;

    } 
    pizzaDisplayedPrice.innerHTML = `$${pizzaCost}`; 

//     orderItemsAndTotal.innerHTML = `
//     <div class="order-items-container">
//         <p id="order-item-text" class="order-item-text">Pizzaplaceholder 
//             <span class="remove">remove</span>
//         </p>
//     <p class="order-item-text align-right">$12</p>
// </div>`

    console.log(pizzaCount);
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







//modalForm.style.display="flex";                               //displays credit card pop-up

modalForm.addEventListener("submit", function(e){
    e.preventDefault();

    let customerPaymentInfo = new FormData(modalForm);
    const customerName = customerPaymentInfo.get("name-input");
    const creditCardNumber = customerPaymentInfo.get("card-number-input");
    const cvv = customerPaymentInfo.get("cvv-input");
    console.log(customerName, creditCardNumber, cvv, customerPaymentInfo);
    modalForm.style.display = "none";
    displayThankYou();
    return customerPaymentInfo;

})

//function getCustomerPaymentInfo () {
//  }

function displayThankYou() {
    document.getElementById("thank-you-container").style.display="flex";
    document.getElementById("thank-you-message").style.display="flex";
}


//order item container: 

// <div class="order-items-container">
//     <p 
//         id="order-${food.name}-text" 
//         class="order-item-text">${food.name}
//         <button class="remove">remove<button>
//     </p>
//     <p class="order-${food.name}-text align-right" id="${food.name}-cost">$${food.price}</p>
// </div> 