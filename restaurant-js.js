import { menuArray } from "./data.js";

console.log(menuArray);


const modalForm = document.getElementById("modal-form");



modalForm.style.display="flex";

modalForm.addEventListener("submit", function(e){
    e.preventDefault();

    let customerPaymentInfo = new FormData(modalForm);
    const customerName = customerPaymentInfo.get("name-input");
    const creditCardNumber = customerPaymentInfo.get("card-number-input");
    const cvv = customerPaymentInfo.get("cvv-input");
    console.log(customerName, creditCardNumber, cvv, customerPaymentInfo);
    modalForm.style.display = "none";
    document.getElementById("thank-you-container").style.display="flex";
    document.getElementById("thank-you-message").style.display="flex";
    return customerPaymentInfo;

})


