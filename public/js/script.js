// navbar 
let navbar = document.querySelector('.header .navbar')

document.querySelector('#menu-btn').onclick = () =>{
    navbar.classList.add('active');
}
let accountForm = document.querySelector('.account-form')

document.querySelector('#account-btn').onclick = () =>{
    accountForm.classList.add('active');
}

document.querySelector('#close-form').onclick = () =>{
    accountForm.classList.remove('active');
}


document.querySelector('#close-navbar').onclick = () =>{
    navbar.classList.remove('active');
}

  const isStrongPassword = (password) => {
    // Regular expressions to check for at least one uppercase letter, one lowercase letter, one digit, and one special character
    const uppercaseRegex = /[A-Z]/;
    const lowercaseRegex = /[a-z]/;
    const digitRegex = /[0-9]/;
    const specialCharRegex = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/;
    
    // Check if the password meets all criteria
    return (
      password.length >= 8 &&  // Minimum length of 8 characters
      uppercaseRegex.test(password) &&  // At least one uppercase letter
      lowercaseRegex.test(password) &&  // At least one lowercase letter
      digitRegex.test(password) &&      // At least one digit
      specialCharRegex.test(password)   // At least one special character
    );
  };
  // register and login forms
  let registerBtn = document.querySelector('.account-form .register-btn');
  let loginBtn = document.querySelector('.account-form .login-btn');
  let registerForm = document.getElementById('register-form');
  let loginForm = document.getElementById('login-form');
  let contactForm = document.getElementById('contactForm');
  

  registerBtn.onclick = () =>{
      registerBtn.classList.add('active');
      loginBtn.classList.remove('active');
      document.querySelector('.account-form .login-form').classList.remove('active');
      document.querySelector('.account-form .register-form').classList.add('active');
  };

  registerForm.onsubmit = (e) =>{ 
      e.preventDefault();
      let name = e.target.name.value;
      let email = e.target.email.value;
      let password1 = e.target.password1.value;
      let password = e.target.password.value;

       if(password1 !== password){
        console.log('password does not match');
         // set inner html of error
           document.getElementById('register-error').innerHTML = 'password does not match';
       } else if (!isStrongPassword(password)) {
           document.getElementById('register-error').innerHTML = 'Password should be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character !@#$%^&*()_+-=[]{};:"\\|,.<>/?';
         }  else{
        // send data to server
          fetch('/register', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                  "name": name,
                  "email": email,
                  "password": password
              })
          })
          .then(res => {
              console.log(res)
              if (res?.status==401) {
                document.getElementById('register-error').innerHTML = 'Not a staff member';
              }
            if (res?.status==400) {
              document.getElementById('register-error').innerHTML = 'User already exists';
            }        
            if(res?.status==201){
              document.getElementById('successful-registration').innerHTML = `${name} registered successfully. You can login now.`;
              openLogin()
            }
          })
          .catch(err => {
              console.log(err);
          })
     };
//Monday.1111
  }

  loginForm.onsubmit = (e) =>{
    e.preventDefault();
    let email = e.target.email.value;
    let password = e.target.password.value;
    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "email": email,
            "password": password
        })
    })
    .then(res => {
        if (res?.status==401) {
          document.getElementById('login-error').innerHTML = 'Invalid email or password';
        } else if(res?.status==200){
          window.location.href = 'dashboard.html';
        }
    })
    .catch(err => {
        console.log(err);
    })
  } 
  
  loginBtn.onclick = () =>{
    openLogin()
  };

  
  function openLogin(){
    registerBtn.classList.remove('active');
    loginBtn.classList.add('active');
    document.querySelector('.account-form .login-form').classList.add('active');
    document.querySelector('.account-form .register-form').classList.remove('active');
  }
  
  contactForm.onsubmit = (e) =>{
    e.preventDefault();
    let name = e.target.name.value;
    let email = e.target.email.value;
    let phoneNumber = e.target.phoneNumber.value;
    let message = e.target.message.value;
    fetch('/contact', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "name": name,
            "email": email,
            "phoneNumber": phoneNumber,
            "message": message
        })
    })
    .then(res => {
        if (res?.status==200) {
          document.getElementById('contact-error').innerHTML = 'Message sent successfully';
        } else if(res?.status==400){
          document.getElementById('contact-error').innerHTML = 'Failed to send message';
        }
        document.getElementById('contactForm').reset();
    })
    .catch(err => {
        console.log(err);
    })
  }
  

// homepage slider
var swiper = new Swiper(".mySwiper", {
    effect: "cube",
    autoplay: {
        delay: 20000
    },
    grabCursor: true,
    cubeEffect: {
      shadow: true,
      slideShadows: true,
      shadowOffset: 20,
      shadowScale: 0.94,
    },
    loop:true,
    pagination: {
      el: ".swiper-pagination",
      clickable:true,
    },
  });


// home courses slider
var swiper = new Swiper(".home-course-slider",{
    loop:true,
    grabCursor:true,
    spaceBetween: 20,
    breakpoints: {
        0: {
          slidesPerView: 1,
        },
        768: {
          slidesPerView: 2,
        },
        991: {
          slidesPerView: 3,
        },
    },
});


// teacher's slider
var swiper = new Swiper(".teachers-slider",{
  loop:true,
  grabCursor:true,
  spaceBetween: 20,
  breakpoints: {
      0: {
        slidesPerView: 1,
      },
      768: {
        slidesPerView: 2,
      },
      991: {
        slidesPerView: 3,
      },
  },
});


// reviews slider
var swiper = new Swiper(".reviews-slider",{
  loop:true,
  grabCursor:true,
  spaceBetween: 20,
  breakpoints: {
      0: {
        slidesPerView: 1,
      },
      768: {
        slidesPerView: 2,
      },
      991: {
        slidesPerView: 3,
      },
  },
});


// accordion content
let accordion = document.querySelectorAll('.faq .accordion-container .accordion');

accordion.forEach(acco => {
  acco.onclick = () => {
    accordion.forEach(dion => dion.classList.remove('active'));
    acco.classList.toggle('active');
  }
});

  document.querySelector('.load-more .btn').onclick = () => {
    document.querySelectorAll('.courses .box-container .hide').forEach(show =>{
      show.style.display = 'block';
    });
    document.querySelector('.load-more .btn').style.display = 'none';
  };