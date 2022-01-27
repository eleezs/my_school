// DASHBOARD JS
//Declearing html elements

const picHolder = document.querySelector('.pic-holder')
const profilePics = document.querySelector('#profilePic')
const file = document.querySelector('#newProfilePhoto')
const uploadBtn = document.querySelector('#uploadBtn')
const profile = document.querySelector('#profile')
const profileBtn = document.querySelector("#profileBtn")
const dashboard  = document.querySelector('#dashboard')
const dashboardBtn = document.querySelector('#dashboardBtn')
const btn = document.querySelector("#btn")


//image display functionality
file.addEventListener('change', function(){
  const choosedFile = this.files[0];

  if(choosedFile){
    const reader = new FileReader();

    reader.addEventListener("load", () =>{
      profilePics.setAttribute("src", reader.result);
    });

    reader.readAsDataURL(choosedFile);
  }
})


//AN ALERT MESSAGE TO LOGOUT (TRIAL)
btn.addEventListener('click', () =>{
  let modal = alert('Do you want to leave the page?')
  location.assign("login_page.html")
})



//made a one page display for the nav menus (TRIAL)
dashboardBtn.addEventListener('click', () =>{
  profile.style.display = 'none'
  dashboard.style.display = 'block'
})

profileBtn.addEventListener('click', ()=>{
  profile.style.display = 'block'
  dashboard.style.display = 'none'
})

