// accordion functionalities
let descriptionHead = document.querySelectorAll(".accordion");


descriptionHead.forEach((event) => {
    event.addEventListener("click", () => {
      if (event.classList.contains("active")) {
        event.classList.remove("active");
      } else {
        event.classList.add("active");
      }
    });
  });

// dynamic drop-down

let programObj = {
  "Short Term Program": ["Oluaka Developer's Program", "Entrepreneurial Development", "Product Design", "UI/UX Design"],
  "Two Years Full-time Program" :["Computer Hardware Engineering","Computer Software Engineering","Network & Software Security"]
}

let courseSel = document.getElementById('course');

function changeCos(value) {
  if(value.length == 0) {
    courseSel.innerHTML ="<option></option>";
  }
  else {
    let cosOption = "";
    for(cosId in programObj[value]) {
      cosOption += "<option>" + programObj[value][cosId] + "</option>";
    }
    courseSel.innerHTML = cosOption;
  }
}

// form validation

// Here we get the elements by their id's
const form = document.getElementById("form");
const firstname = document.getElementById("firstname");
const lastname = document.getElementById("lastname");
const email = document.getElementById("email");
const password = document.getElementById("password")
const radios = document.getElementsByName("sex");
let programSelect = document.forms["RegForm"]["programs"];
let agree = document.forms["RegForm"]["agree"];
const Regbtn = document.getElementById('regbtn');
const fname_err = document.getElementById('fname_err');
const lname_err = document.getElementById('lname_err');
const gender_err = document.getElementById('gender_err');
const program_err = document.getElementById("program_err");
const agree_err = document.getElementById("agree_err");


function checkInputs() {
  // Here we get the value of the inputs and use the .trim() function to remove white spaces that might be entered by the user
  const firstnameValue = firstname.value.trim();
  const lastnameValue = lastname.value.trim();
  const emailValue = email.value.trim();
  const passwordValue = password.value.trim();

  if (firstnameValue === "")
  { 
    // Here it checks if the value of firstname is empty
    // Then we call the function showError

    firstname.style.border = "1px solid red";
    document.getElementById("fname_div").style.color = "red";
    fname_err.textContent = "First name is required";
    firstname.focus();
    return true
    
  } 
  else 
  {
    firstname.style.border = "1px solid green";
    document.getElementById("fname_div").style.color = "green";
    fname_err.textContent = "";
  }


  if (lastnameValue === "") 
  {  // Here it checks if the value of firstname is empty
    // Then we call the function showError
    lastname.style.border = "1px solid red";
    document.getElementById("lname_div").style.color = "red";
    lname_err.textContent = "Last name is required";
    lastname.focus();
    return true
     
  } 
  else
  {
    lastname.style.border = "1px solid green";
    document.getElementById("lname_div").style.color = "green";
    lname_err.textContent = "";
  }


  if (emailValue === "") 
  { // Here we check if the email input box is empty
    email.style.border = "1px solid red";
    document.getElementById("email_div").style.color = "red";
    email_err.textContent = "Email is required";
    email.focus();
    return true
  } 
  else if (!checkEmail(emailValue)) 
  { // Here we check if the email is not equal to the standard email format
    email.style.border = "1px solid red";
    document.getElementById("email_div").style.color = "red";
    email_err.textContent = "Email is invalid";
    email.focus();
    return true
  } 
  else 
  {
    email.style.border = "1px solid green";
    document.getElementById("email_div").style.color = "green";
    email_err.textContent = "";
  }


  if (passwordValue === "")
  { 
    // Here it checks if the value of password is empty
    // Then we call the function showError

    password.style.border = "1px solid red";
    document.getElementById("password_div").style.color = "red";
    password_err.textContent = "Password is required";
    password.focus();
    return true
  } 
  else 
  {
    password.style.border = "1px solid green";
    document.getElementById("password_div").style.color = "green";
    password_err.textContent = "";
  }


  let formValid;
  for (let i of  radios) {
    if (i.checked) {
      formValid = i.value;  
      gender_err.textContent = "";
      break;
    }  
    else {
    gender_err.style.color = "red";
    gender_err.textContent = "Select a gender";
    }    
  }

  if (programSelect.selectedIndex < 1) {
    program_err.style.color = "red";
    program_err.textContent = "Select a program"
    return true
  }
  else {
    // program_err.style.color = "red";
    program_err.textContent = ""
  }
  if (!form.agree.checked){
    agree_err.style.color = "red";
    agree_err.textContent = "Acecpt Terms and Conditions"
    return true
  }
  else {
    agree_err.textContent = "";
  }
  return false
}
 

function checkEmail(email) 
{
  // Here the value of return is the stardard format every valid email should follow or adhere to.
  // And we use the .test() function to check if the email matches the standard format.
  return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
};


form.addEventListener("submit", function (e) {
  e.preventDefault();
  let valid = checkInputs()
  console.log(valid)
  if(valid === false){
    e.currentTarget.submit();
//   return Swal.fire({
//     title: 'Successfully Registered!',
//     text: 'A message has been sent your mail to complete the registration. Click the button below to proceed to Login Page',
//     icon: 'success',
//     // showCancelButton: true,
//     confirmButtonColor: '#3085d6',
//     cancelButtonColor: '#d33',
//     confirmButtonText: 'CONTINUE'
//  }).then(function(result) {
//    if (result.isConfirmed) {
//      location.assign("login_page.html")
//    }
//  })
}
});


// TogglePassword
function toToggle(){
  if(password.type === 'password'){
    password.type = 'text'
  }
  else{
    password.type = 'password';
  }
  // return false
}

togglePassword.addEventListener('click', function (e) {
  e.preventDefault();
  toToggle();
});
