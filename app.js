const taxRate = 0.18;
const shippingPrice = 15;

window.addEventListener("load", () => {
    localStorage.setItem("taxRate", taxRate);
    localStorage.setItem("shippingPrice", shippingPrice);
})

let products = document.querySelector(".products");

products.addEventListener("click", (event) => {
    if (event.target.className == "minus") {
        if (event.target.nextElementSibling.innerText > 1) {
            event.target.nextElementSibling.innerText--;

            ProductTotal(event.target.parentElement.previousElementSibling.firstElementChild.firstElementChild.innerText, event.target.nextElementSibling.innerText, event.target.parentElement);  
        }
        else {
            if (confirm("Do you want to delete the product?")) {
                event.target.parentElement.parentElement.parentElement.remove();
                Total();
            }
        }
    }
    else if (event.target.classList.contains("plus")) {
        event.target.previousElementSibling.innerText++;

        ProductTotal(event.target.parentElement.previousElementSibling.firstElementChild.firstElementChild.innerText, event.target.previousElementSibling.innerText, event.target.parentElement);
    }

    else if (event.target.classList.contains("remove-product")) {
        if (confirm("Do you want to delete the product?")) {
            event.target.parentElement.parentElement.parentElement.remove();
            Total();
          }
        }    
}
)

function ProductTotal( price, productCount, parentDiv) {
    parentDiv.parentElement.lastElementChild.innerText = (productCount * price).toFixed(2);

    Total()
}


function Total() {
    let payment = document.querySelectorAll(".product-line-price");
    let subtotal = 0;

    payment.forEach((x) => subtotal += parseFloat(x.innerText));
    document.querySelector("#cart-subtotal").lastElementChild.innerText = subtotal.toFixed(2);

    let tax = subtotal * localStorage.getItem("taxRate");

    document.querySelector("#cart-tax").lastElementChild.innerText = tax.toFixed(2);

    let ship = document.querySelector("#cart-shipping").lastElementChild;
    ship.innerText = ((tax > 0) ? localStorage.getItem("shippingPrice") : 0);

    document.querySelector("#cart-total").lastElementChild.innerText = (subtotal + tax + parseFloat(ship.innerText)).toFixed(2);
}

Total()