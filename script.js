document.addEventListener('scroll', function() {
    const navbar = document.querySelector('.p-navbar');
    if(window.scrollY > 500){
        navbar.classList.add('active');
    } else {
        navbar.classList.remove('active');
    }
})