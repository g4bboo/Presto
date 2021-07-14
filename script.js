document.addEventListener('scroll', function() {
    const navbar = document.querySelector('.p-navbar');
    if(window.scrollY > 250){
        navbar.classList.add('active');
    } else {
        navbar.classList.remove('active');
    }
});


// CATEGORIE //
let categories = [
    { 'nome' : 'Market' , 'icon' : 'fas fa-handshake'},
    { 'nome' : 'Immobili' , 'icon' : 'fas fa-home'},
    { 'nome' : 'Lavoro' , 'icon' : 'fas fa-briefcase'},
    { 'nome' : 'Motori' , 'icon' : 'fas fa-car'}
];

const categoryWrapper = document.querySelector('#category-wrapper');

if(categoryWrapper){
    categories.forEach( category => {

        let card = document.createElement('div');
        card.classList.add('col-xl-3' , 'col-lg-6' , 'col-12');
    
        card.innerHTML = 
        `  
        <div class="card p-5 shadow my-2">
            <div class="card-body text-center">
                <h5><i class="${category.icon}"></i> ${category.nome}</h5>
                <button class="btn-custom">Cerca in ${category.nome}</button>
            </div>
        </div>
    
        `;
    
        categoryWrapper.appendChild(card);
    
    });
}



//animazione button
const navbarToggler = document.querySelector('.navbar-toggler')
navbarToggler.addEventListener('click', function(){
(navbarToggler.children[0].classList.toggle('fa-rotate-90'))
})

//animazione cuore
let favs = document.querySelectorAll('.btn-heart');

        favs.forEach( fav => {
            fav.addEventListener('click', function () {
                fav.children[0].classList.toggle('fas');
                fav.children[0].classList.toggle('far');
            })
        })