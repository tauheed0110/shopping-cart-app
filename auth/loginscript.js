const menu = document.getElementById('menu-icon');
const nav = document.querySelector('nav');
// take refrence of all the form element.
const email = document.getElementById('email');
const password = document.getElementById('password');
const login = document.getElementById('login');

let toggleMenu = false;
menu.addEventListener('click', ()=>{
    toggleMenu = !toggleMenu;
    if(toggleMenu){
        nav.style.display = 'none';
    }else{
        nav.style.display = 'block';
    }
})

login.addEventListener('click', (e)=>{
    e.preventDefault();
    if(email.value.trim() && password.value){
        // good to go
        // take the user from localStorage if field matches provide the token to user.
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(user => user.email == email.value.trim());
        
        if(user){
            if(password.value == user.password){
                const tokenHelper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
                let token = '';
                const length = 16
                for(let i=0; i<length; i++){
                    token += tokenHelper.charAt(Math.floor(Math.random()*tokenHelper.length)+1);
                }
                const login = {
                    token: token,
                    user: user
                }
                alert(`User logged in, with token: ${token}`);
                localStorage.setItem('login', JSON.stringify(login));
                location.href = '/shop/index.html';
            }else{
                alert('email or password is wrong.');
            }
        }else{
            alert('User not found, You need to signup first.')
        }
    }else{
        alert('email and password is required');
    }
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