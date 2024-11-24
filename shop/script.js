const menu = document.getElementById('menu-icon');
const nav = document.querySelector('nav');
const men = document.getElementById('men');
const women = document.getElementById('women');
const electronics = document.getElementById('electronics');
const jewellery = document.getElementById('jewellery');
const filterBtn = document.querySelectorAll('.filter');
const output = document.getElementById('output');
const input = document.getElementById('search');

const range = document.getElementById('range');

const produtc = {
  id: 1,
  title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
  price: 109.95,
  description:
    "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
  category: "men's clothing",
  image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
  rating: { rate: 3.9, count: 120 },
};


// toggle menu
let toggleMenu = false;
menu.addEventListener('click', ()=>{
    toggleMenu = !toggleMenu;
    if(toggleMenu){
        nav.style.display = 'none';
    }else{
        nav.style.display = 'block';
    }
})

let products = [];
// fetch the data 
function getData(){
  fetch('https://fakestoreapi.com/products')
  .then(response => response.json())
  .then(data => {
    products = data;
    renderData("All");
  })
  .catch(error => {
    console.log(error);
  })
}

getData();

// render the data at their location
function renderData(filter){

    men.parentElement.style.display = 'block';
    women.parentElement.style.display = 'block';
    electronics.parentElement.style.display = 'block';
    jewellery.parentElement.style.display = 'block';


    const menProducts = products.filter(product => {
      return product.category == "men's clothing";
    });
    const womenProducts = products.filter(product => {
      return product.category == "women's clothing";
    });
    const electronicProducts = products.filter(product => {
      return product.category == "electronics";
    });
    const jewelleryProducts = products.filter(product => {
      return product.category == "jewelery";
    });
    
    render(menProducts, men);
    render(womenProducts, women);
    render(electronicProducts, electronics);
    render(jewelleryProducts, jewellery);

    filterData(filter);
}

// filte data according to the filter button;
function filterData(filter){
  if(filter == "All"){
    men.parentElement.style.display = 'block';
    women.parentElement.style.display = 'block';
    electronics.parentElement.style.display = 'block';
    jewellery.parentElement.style.display = 'block';
  }else if(filter == "Mens"){
    men.parentElement.style.display = 'block';
    women.parentElement.style.display = 'none';
    electronics.parentElement.style.display = 'none';
    jewellery.parentElement.style.display = 'none';
  }else if(filter == "Womens"){
    men.parentElement.style.display = 'none';
    women.parentElement.style.display = 'block';
    electronics.parentElement.style.display = 'none';
    jewellery.parentElement.style.display = 'none';
  }else if(filter == "Electronics"){
    men.parentElement.style.display = 'none';
    women.parentElement.style.display = 'none';
    electronics.parentElement.style.display = 'block';
    jewellery.parentElement.style.display = 'none';
  }else if(filter == "Jewellery"){
    men.parentElement.style.display = 'none';
    women.parentElement.style.display = 'none';
    electronics.parentElement.style.display = 'none';
    jewellery.parentElement.style.display = 'block';
  }
}

function render(products, div){
  div.innerHTML = "";
  products.map(product => {
    div.innerHTML += `
            <div class="item">
              <img src="${product.image}" alt="Item" />
              <div class="info">
                <p class="nameTitle">${product.title}<p>
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
              <button id="addBtn" onclick="handleAddToCart(${product.id})">Add to Cart</button>
            </div>
    `;
  })
}

filterBtn.forEach(button => {
  button.addEventListener('click', function(){
    this.classList.add('active');

    renderData(this.textContent);

    filterBtn.forEach(function(otherButton){
      if(otherButton !== button){
        otherButton.classList.remove('active');
      }
    })
  })
})


input.addEventListener('input', ()=>{
  const value = input.value.trim();
  if(value){
    const filteredData = products.filter(product => {
      return product.title.toLowerCase().includes(value.toLowerCase());
    })
    men.parentElement.style.display = 'none';
    women.parentElement.style.display = 'none';
    electronics.parentElement.style.display = 'none';
    jewellery.parentElement.style.display = 'none';
    
    output.parentElement.style.display = 'block';
    render(filteredData, output);
  }else{
    output.parentElement.style.display = 'none';
    renderData();

  }
});

// add listener when range change
range.addEventListener('change', ()=>{

    // filter data according to range
    if(range.value > 0){
      men.parentElement.style.display = 'none';
      women.parentElement.style.display = 'none';
      electronics.parentElement.style.display = 'none';
      jewellery.parentElement.style.display = 'none';

      const filteredData = products.filter(product => {
        return Math.floor(product.rating.rate) == range.value;
      });
      output.parentElement.style.display = 'block';
      render(filteredData, output);
    }else{
      output.parentElement.style.display = 'none';
      renderData();
    }


});

function handleAddToCart(id){
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const product = products.find(product => product.id == id)
  cart.push(product);
  localStorage.setItem('cart', JSON.stringify(cart));
  setTimeout(() => {
    alert('Item added to cart, successfully.');
  }, 100);
}


document.addEventListener('DOMContentLoaded', ()=>{
  if(localStorage.getItem('login')){
      nav.innerHTML = `
      <ul>
          <li><a href="/shop/index.html">Home</a></li>
          <li><a href="#" onclick="handleLogout()">Logout</a></li>
          <li><a href="/auth/signup.html">Signup</a></li>
          <li><a href="/cart/index.html">My Cart</a></li>
          <li><a href="/profile/index.html">Profile</a></li>
      </ul> 
      `;
  }else{
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
function handleLogout(){
  localStorage.removeItem('login');
  location.href = '/index.html';
  alert('user logout, successful.')
}