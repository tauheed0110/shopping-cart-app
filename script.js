const menu = document.getElementById('menu-icon');
const nav = document.querySelector('nav');
const loginBtn = document.getElementById('login');
const signupBtn = document.getElementById('signup');


let toggleMenu = false;
menu.addEventListener('click', ()=>{
    toggleMenu = !toggleMenu;
    if(toggleMenu){
        nav.style.display = 'none';
    }else{
        nav.style.display = 'block';
    }
})

// when i click on login button or signup i should go to desired route
loginBtn.addEventListener('click', (e)=>{
    e.preventDefault();
    location.href = '/auth/login.html';
})
signupBtn.addEventListener('click', (e)=>{
    e.preventDefault();
    location.href = '/auth/signup.html';
})

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