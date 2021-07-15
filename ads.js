fetch('./annunci.json')
.then( response => response.json())
.then( data => {
    
    let globalFiltered = Array.from(data);

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

    function populateAds(data) {
        const adsWrapper = document.querySelector('#ads-wrapper');

        adsWrapper.innerHTML = ''

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
            
        })

        favs();
    }

    function populateCategoriesFilter(){
        let categories = new Set (data.map(ad => ad.category))
        const wrapper = document.querySelector('#filters-category-wrapper')
        categories.forEach(cat => {
            let div = document.createElement('div')

            div.classList.add('form-check')

            div.innerHTML =
            `
            
            <input class="form-check-input category-filter" type="checkbox" value="${cat}" id="category-${cat}">
            <label class="form-check-label" for="category-${cat}">
              ${cat}
            </label>
            
            `
            wrapper.appendChild(div)
        })
    }

    function filterByCategory() {
        const input = document.querySelectorAll('.category-filter')

        input.forEach(el => {
            el.addEventListener('input', globalFilters)
        })

    }

    function populatePriceFilter() {
        const inputMax = document.querySelector('#max-input');
        const labelMax = document.querySelector('#max-label');

        let sorted = Array.from(data).sort( (a,b) => Number(a.price) - Number(b.price));
        let max = Number(sorted[sorted.length - 1].price);

        labelMax.innerHTML = `${max} €`;
        inputMax.max = max;
        inputMax.value = max;

        console.log(max);
    }

    function filterByPrice(){
        const inputMax = document.querySelector('#max-input');

        inputMax.addEventListener('input', function () {
            const labelMax = document.querySelector('#max-label');

            labelMax.innerHTML = inputMax.value + ' €';

            globalFilters();
    
        })
    }

    function filterBySearch() {
        const searchInput = document.querySelector('#search-input');

        searchInput.addEventListener('input', globalFilters);

    }

    function globalFilters() {
        const searchInput = document.querySelector('#search-input');
        const inputMax = document.querySelector('#max-input');
        const categories = document.querySelectorAll('.category-filter');

        let checked = Array.from(categories).filter(el => el.checked).map(el => el.value)

        if(checked.length === 0){
            globalFiltered = data
            .filter( ad => ad.name.toLowerCase().includes(searchInput.value.toLowerCase()))
            .filter( ad => ad.price <= Number(inputMax.value) + 1 && ad.price > 0)

            populateAds(globalFiltered);
        }else {
            globalFiltered = data
            .filter( ad => ad.name.toLowerCase().includes(searchInput.value.toLowerCase()))
            .filter( ad => ad.price <= Number(inputMax.value) + 1 && ad.price > 0)
            .filter(ad => checked.includes(ad.category))
            
            populateAds(globalFiltered);
        }

    }

    populatePriceFilter();
    populateCategoriesFilter();

    filterByCategory();
    filterByPrice();

    filterBySearch()

    populateAds(data);

})