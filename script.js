document.addEventListener('scroll', function() {
    const navbar = document.querySelector('.p-navbar');
    if(window.scrollY > 250){
        navbar.classList.add('active');
    } else {
        navbar.classList.remove('active');
    }
})