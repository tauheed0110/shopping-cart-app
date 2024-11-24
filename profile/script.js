// Write your script here
const saveInfo = document.getElementById('saveInfo');
const changePass = document.getElementById('changePass');
// take refrences of the inptu elements 
const fname = document.getElementById('fname');
const lname = document.getElementById('lname');
const oldPass = document.getElementById('oldPass');
const newPass = document.getElementById('newPass');
const confirmNewPass = document.getElementById('confirmNewPass');


saveInfo.addEventListener('click', (e) => {
    e.preventDefault();
    let login = JSON.parse(localStorage.getItem('login'));

    if (login) {
        // allow making changes.
        let users = JSON.parse(localStorage.getItem('users'))  || [];
        if (fname.value.trim() && lname.value.trim()) {
            users = users.map(user => {
                if(user.id == login.user.id){
                    user.fname = fname.value.trim();
                    user.lname = lname.value.trim();
                }
                return user;
            })
            // update the login information tooo
            login.user.fname = fname.value.trim()
            login.user.lname = lname.value.trim()

            localStorage.setItem('users', JSON.stringify(users));
            localStorage.setItem('login', JSON.stringify(login));
            alert('Successfully updated name of the user.');
        } else {
            alert('first and last name is required');
        }
    }
});

changePass.addEventListener('click', (e) => {
    e.preventDefault();
    let login = JSON.parse(localStorage.getItem('login'));
    if (login) {
        // allow making changes.

        if (oldPass.value && newPass.value && confirmNewPass.value) {
            // if old password matches allow making change
            if (oldPass.value == login.user.password) {
                // now check if the password and confirm password matches then 
                // save the data to local storage
                if (newPass.value == confirmNewPass.value) {
                    let users = JSON.parse(localStorage.getItem('users')) || [];
                    users = users.map(user => {
                        if(user.id == login.user.id){
                            user.password = newPass.value;
                        }
                        return user;
                    })
                    // update the pass in login data too.
                    login.user.password = newPass.value;
                    localStorage.setItem('login', JSON.stringify(login));
                    localStorage.setItem('users', JSON.stringify(users));
                    alert('password updated successfully.')
                    // empty the all three fields.
                    oldPass.value = "";
                    newPass.value = "";
                    confirmNewPass.value = "";
                }else{
                    alert('New Password and Confirm New Password do not match.')
                }
            } else {
                alert('old password do not match');
            }
        } else {
            alert('All* the fields are mandatory')
        }
    }
});

// logout when user click the button

function handleLogout(){
    localStorage.removeItem('login');
    location.href = '/index.html';
    alert('User logged out.');
}


// preload the data
document.addEventListener('DOMContentLoaded', ()=>{
    if(localStorage.getItem('login')){
        const user = JSON.parse(localStorage.getItem('login')).user;
        setTimeout(() => {
            fname.value = user.fname;
            lname.value = user.lname;
        }, 100);
        
    }else{
        setTimeout(() => {
            alert('You are guest and not allowed to make any change.');
        }, 100);
    }
})
