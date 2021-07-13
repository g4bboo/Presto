document.addEventListener('scroll', function() {
    const navbar = document.querySelector('.p-navbar');
    if(window.scrollY > 250){
        navbar.classList.add('active');
    } else {
        navbar.classList.remove('active');
    }
})

const navbarToggler = document.querySelector('.navbar-toggler')

navbarToggler.addEventListener('click', function(){
    navbarToggler.children[0].classList.toggle('fa-rotate-90')
})