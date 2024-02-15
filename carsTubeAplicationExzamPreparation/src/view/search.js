import { html } from '../../node_modules/lit-html/lit-html.js'
import { searchByQuery } from '../api/data.js';

const searchTemplate = (searchByYear, matches) => html`
<section id="search-cars">
<h1>Filter by year</h1>

<div class="container">
    <input id="search-input" type="text" name="search" placeholder="Enter desired production year">
    <button class="button-list" @click=${searchByYear}>Search</button>
</div>

<h2>Results:</h2>
<div class="listings">
     ${matches.length == 0 ? html`
     <p class="no-cars"> No results.</p>
     ` : matches.map(car => html`
     <div class="listing">
        <div class="preview">
            <img src=${car.imageUrl}>
        </div>
        <h2>${car.brand} ${car.model}</h2>
        <div class="info">
            <div class="data-info">
                <h3>Year: ${car.year}</h3>
                <h3>Price: ${car.price} $</h3>
            </div>
            <div class="data-buttons">
                <a href="/details/${car._id}" class="button-carDetails">Details</a>
            </div>
        </div>
     </div>
     `)}
    
    
</div>
</section>
`

export async function searchPage(ctx) {
    let matches = []
    
    ctx.render(searchTemplate(searchByYear, matches));
    
    document.querySelector('.listings').style.display = 'none'

    async function searchByYear() {
        const input = document.querySelector('input');
        const query = input.value;
        let regexpi = /[0-9]+/
        let test = regexpi.test(query);

        if(test){
            const result = await searchByQuery(query);
            matches = result
            ctx.render(searchTemplate(searchByYear, matches));            
        }else{
            ctx.render(searchTemplate(searchByYear, matches));            
        }

        document.querySelector('.listings').style.display = ''
    }

}