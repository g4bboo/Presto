fetch('./annunci.json')
.then( response => response.json())
.then( data => {
    
    function truncate(str) {
        return str.split(' ')[0] + '...';
    }

    function favs() {
        let favs = document.querySelectorAll('.btn-heart');

        favs.forEach( fav => {
            fav.addEventListener('click', function () {
                fav.children[0].classList.toggle('fas');
                fav.children[0].classList.toggle('far');
            })
        })
    }

    function populateAds() {
        const adsWrapper = document.querySelector('#ads-wrapper');

        data.forEach( ad => {
            let div = document.createElement('div');

            div.classList.add('col-12','col-md-6','col-lg-4');

            div.innerHTML = 
            `           
            <div class="card card-ad mb-4">
                <img src="https://picsum.photos/300" class="card-img-top" alt="annuncio">
                <div class="card-body">
                    <h5 class="card-title position-relative">
                        <span class="tooltip-ad">${ad.name}</span>
                        ${truncate(ad.name)}
                    </h5>
                    <div class="d-flex justify-content-between my-2">
                        <span class="tc-main">${ad.category}</span>
                        <span>€ ${ad.price}</span>       
                    </div>
                    <div class="d-flex justify-content-between">
                        <a href="#" class="btn btn-custom-sec">Esplora</a>
                        <button class="btn-heart"><i class="far fa-heart"></i></button>
                    </div>
                </div>
            </div>
            `;
            adsWrapper.appendChild(div);
        });
        favs();
    }

    populateAds();
    
})