const menu = document.getElementById('menu-icon');
const nav = document.querySelector('nav');

let toggleMenu = false;
menu.addEventListener('click', ()=>{
    toggleMenu = !toggleMenu;
    if(toggleMenu){
        nav.style.display = 'none';
    }else{
        nav.style.display = 'block';
    }
})