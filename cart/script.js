const menu = document.getElementById('menu-icon');
const nav = document.querySelector('nav');
const items = document.getElementById('items');
const paylist = document.getElementById('paylist');
const payTotal = document.getElementById('payTotal');
const rpay = document.getElementById('rpay');
const asside = document.querySelector('asside');

let toggleMenu = false;
menu.addEventListener('click', () => {
    toggleMenu = !toggleMenu;
    if (toggleMenu) {
        nav.style.display = 'none';
    } else {
        nav.style.display = 'block';
    }
})

// take the data from localstorage and reder the items.
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function renderData() {

    items.innerHTML = "";
    paylist.innerHTML = "";
    payTotal.innerHTML = "";

    if (cart.length > 0) {
        asside.style.display = 'block';
        cart.map(product => {
            items.innerHTML += `
        <div class="item">
            <img src="${product.image}" alt="Item" />
            <div class="info">
            <p class="productTitle">${product.title}</p>
            <div class="row">
                <div class="price">$${product.price}</div>
                <div class="sized">S,M,L</div>
            </div>
            <div class="colors">
                Colors:
                <div class="row">
                <div class="circle" style="background-color: #000"></div>
                <div class="circle" style="background-color: #4938af"></div>
                <div class="circle" style="background-color: #203d3e"></div>
                </div>
            </div>
            <div class="row">Rating: ${product.rating.rate}</div>
            </div>
            <button id="removeBtn" onclick="handleRemove(${product.id})">Remove from Cart</button>
        </div>
        `;
        });
        // handle paylist also
        let sum = 0;
        cart.map((product, index) => {
            paylist.innerHTML += `
        <div class="flexdata">
            <p class="productTitle">${index + 1}. ${product.title.substring(0, 20)}..</p>
            <p>$${product.price}</p>
        </div>
        `;
            sum += product.price;
        });
        // render paytotal
        payTotal.innerHTML += `
            <div class="flexdata">
                <p>Total</p>
                <p>$${sum}/-</p>
            </div>
        `;
    } else {
        // render a text dsplaying cart has npthing to show.
        // and disable the checkout button.
        items.innerHTML = `<h1 style="text-align: center;">Cart is empty.</h1>`;
        asside.style.display = 'none';
    }
}

renderData();

function handleRemove(id) {
    cart = cart.filter(product => product.id != id);
    localStorage.setItem('cart', JSON.stringify(cart));
    setTimeout(() => {
        alert('Item removed from cart, successfully.');
    }, 100);
    renderData();
}

rpay.addEventListener('click', (e) => {
    e.preventDefault();
    location.href = '/razorpay/index.html';
})

document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('login')) {
        nav.innerHTML = `
        <ul>
            <li><a href="/shop/index.html">Home</a></li>
            <li><a href="#" onclick="handleLogout()">Logout</a></li>
            <li><a href="/auth/signup.html">Signup</a></li>
            <li><a href="/cart/index.html">My Cart</a></li>
            <li><a href="/profile/index.html">Profile</a></li>
        </ul> 
        `;
    } else {
        nav.innerHTML = `
        <ul>
            <li><a href="#">Home</a></li>
            <li><a href="/auth/login.html">Login</a></li>
            <li><a href="/auth/signup.html">Signup</a></li>
            <li><a href="#">My Cart</a></li>
            <li><a href="#">Profile</a></li>
        </ul> 
        `;
    }
});
function handleLogout() {
    localStorage.removeItem('login');
    location.href = '/index.html';
    alert('user logout, successful.')
}