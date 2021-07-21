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
        }else {
            globalFiltered = data
            .filter( ad => ad.name.toLowerCase().includes(searchInput.value.toLowerCase()))
            .filter( ad => ad.price <= Number(inputMax.value) + 1 && ad.price > 0)
            .filter(ad => checked.includes(ad.category))
        }

        populatePagination();
        order();
        paginate();

    }

    function order() {
        let orderInput = document.querySelectorAll('.order-input');

        let selected = Array.from(orderInput).find( el => el.checked).value;
    
                switch (selected) {
                    case '1':
                        globalFiltered.sort( (a,b) => a.id - b.id);
                        paginate();
                        break;
                    case '2':
                        globalFiltered.sort( (a,b) => b.id - a.id);
                        paginate();
                        break;
                    case '3':
                        globalFiltered.sort( (a,b) => Number(a.price) - Number(b.price));
                        paginate();
                        break;
                    case '4':
                        globalFiltered.sort( (a,b) => Number(b.price) - Number(a.price));
                        paginate();
                        break;
                    case '5':
                        globalFiltered.sort( (a,b) => {
                        let nameA = a.name.toUpperCase();
                        let nameB = b.name.toUpperCase();
                        if (nameA < nameB) {
                            return -1;
                        }
                        if (nameA > nameB) {
                            return 1;
                        }
                        return 0;
                        })
                        paginate();
                        break;
                    case '6':
                        globalFiltered.sort( (a,b) => {
                        let nameA = a.name.toUpperCase();
                        let nameB = b.name.toUpperCase();
                        if (nameA < nameB) {
                            return 1;
                        }
                        if (nameA > nameB) {
                            return -1;
                        }
                        return 0;
                        })
                        paginate();
                        break;
                }
        
        orderInput.forEach( input => {
            input.addEventListener('input', function () {
                let selected = Array.from(orderInput).find( el => el.checked).value;
    
                switch (selected) {
                    case '1':
                        globalFiltered.sort( (a,b) => a.id - b.id);
                        paginate();
                        break;
                    case '2':
                        globalFiltered.sort( (a,b) => b.id - a.id);
                        paginate();
                        break;
                    case '3':
                        globalFiltered.sort( (a,b) => Number(a.price) - Number(b.price));
                        paginate();
                        break;
                    case '4':
                        globalFiltered.sort( (a,b) => Number(b.price) - Number(a.price));
                        paginate();
                        break;
                    case '5':
                        globalFiltered.sort( (a,b) => {
                        let nameA = a.name.toUpperCase();
                        let nameB = b.name.toUpperCase();
                        if (nameA < nameB) {
                            return -1;
                        }
                        if (nameA > nameB) {
                            return 1;
                        }
                        return 0;
                        })
                        paginate();
                        break;
                    case '6':
                        globalFiltered.sort( (a,b) => {
                        let nameA = a.name.toUpperCase();
                        let nameB = b.name.toUpperCase();
                        if (nameA < nameB) {
                            return 1;
                        }
                        if (nameA > nameB) {
                            return -1;
                        }
                        return 0;
                        })
                        paginate();
                        break;
                }
            })
        })
    }

    function populatePagination() {
        let paginator = document.querySelector('#paginator');

        paginator.innerHTML = '';

        let pages = Math.ceil(globalFiltered.length / 6);

        for (let i = 1; i <= pages; i++) {
            let li = document.createElement('li');

            li.classList.add('page-item');

            if (i === 1) {
                li.innerHTML = `<a class="page-link pagination-active" value="${i}">${i}</a>`;
            } else {
                li.innerHTML = `<a class="page-link" value="${i}">${i}</a>`;
            }

            paginator.appendChild(li);       
        }

        clickPaginate();
    }

    function paginate(selectedPage = 0) {
        
        // let selectedPage = 0;
        let perPage = 6;

        let paginated = globalFiltered.slice( (selectedPage * perPage) , (selectedPage * perPage) + perPage); 

        populateAds(paginated);
    }

    function clickPaginate() {
        let pagesBtn = document.querySelectorAll('.page-link');

        pagesBtn.forEach( btn => {
            btn.addEventListener('click', function () {

                pagesBtn.forEach( btn => btn.classList.remove('pagination-active'));
                btn.classList.add('pagination-active');
                paginate(btn.innerHTML - 1);
            })
        })
    }

    function resetFilter() {
        let resetBtn = document.querySelector('#reset-filter');

        resetBtn.addEventListener('click', function () {
            
        })
    }

    order();
    
    populatePriceFilter();
    populateCategoriesFilter();

    filterByCategory();
    filterByPrice();

    filterBySearch()

    populatePagination();
    paginate();

    resetFilter();

})