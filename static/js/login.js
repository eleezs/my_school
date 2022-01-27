
$(document).ready(function() {             
  $('#loginModal').modal('show');

  });

$('#loginModal').modal({
  backdrop: 'static',
  keyboard: false
});

const loginForm = document.getElementById("loginForm");
const email = document.getElementById('email');
const password = document.getElementById("password");
const user_err = document.getElementById('user_err');

function checkInputs() {
  if (email.value === "")
  { 
    email.style.border = "1px solid red";
    document.getElementById("user_div").style.color = "red";
    user_err.textContent = "Enter Email Address";
    email.focus();
    return true
  } 
  else 
  {
    email.style.border = "1px solid green";
    document.getElementById("user_div").style.color = "green";
    user_err.textContent = "";
  }

  if (password.value === "")
  { 
    password.style.border = "1px solid red";
    document.getElementById("pass_div").style.color = "red";
    pass_err.textContent = "Enter Password";
    password.focus();
    return true
    
  } 
  else 
  {
    password.style.border = "1px solid green";
    document.getElementById("user_div").style.color = "green";
    pass_err.textContent = "";
  }
  return false
}

function toToggle(){
  if(password.type === 'password'){
    password.type = 'text'
  }
  else{
    password.type = 'password';
  }
  // return false
}

loginForm.addEventListener("submit", function(e) {
  e.preventDefault();
  let valid = checkInputs()
  console.log(valid)
  if(valid === false){
    e.currentTarget.submit();
  }
});

togglePassword.addEventListener('click', function (e) {
  e.preventDefault();
  toToggle();
});
