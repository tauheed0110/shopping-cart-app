const menu = document.getElementById('menu-icon');
const nav = document.querySelector('nav');
// all the form element
const fname = document.getElementById('fname');
const lname = document.getElementById('lname');
const email = document.getElementById('email');
const password = document.getElementById('password');
const cpassword = document.getElementById('cpassword');
const signup = document.getElementById('signup');


let toggleMenu = false;
menu.addEventListener('click', ()=>{
    toggleMenu = !toggleMenu;
    if(toggleMenu){
        nav.style.display = 'none';
    }else{
        nav.style.display = 'block';
    }
});

// when user click on the signup button setup the data into localstorage 
// and hanlde, appropriate things


signup.addEventListener('click', (e)=>{
    e.preventDefault();
    if(fname.value.trim() && lname.value.trim() && email.value.trim() && password.value && cpassword.value){
        // check if the user exists with the email id, don't allow to signup again.
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(user => user.email == email.value.trim());
        if(user){
            setTimeout(() => {
                alert('email id is already registered with us.');
            }, 100);
            return;
        }
        // now assign create user data and save it to local storage;
        // create user only when password and confirm password matches;
        if(password.value == cpassword.value){
            const userData = {
                id: users.length + 1,
                fname: fname.value.trim(),
                lname: lname.value.trim(),
                email : email.value.trim(),
                password: password.value
            }
            users.push(userData);
            localStorage.setItem('users', JSON.stringify(users));
            alert('User signup successful.');
            location.href = '/auth/login.html';
        }else{
            alert("Password and Confirm Password does not matche.");
        }
    }else{
        alert('All* the fields are mendatory.')
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