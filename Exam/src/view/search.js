import { html } from '../../node_modules/lit-html/lit-html.js'
import { searchingFruits } from '../api/data.js';
import { formHandller } from '../utility.js';


const searchTemplate = (onSearch, matches) => html`
<section id="search">

        <div class="form">
          <h2>Search</h2>
          <form class="search-form" @submit=${onSearch}>
            <input
              type="text"
              name="search"
              id="search-input"
            />
            <button class="button-list">Search</button>
          </form>
        </div>
        <h4>Results:</h4>
          <div class="search-result">
                ${matches.length == 0 ? html`
                <p class="no-result">No result.</p>
                ` : matches.map(fruit => html`
                <div class="fruit">
                    <img src="${fruit.imageUrl}" />
                    <h3 class="title">${fruit.name}</h3>
                    <p class="description">${fruit.description}</p>
                    <a class="details-btn" href="/details/${fruit._id}">More Info</a>
               </div>
                `)}                              
         </div>
    </section>
`

export async function searchPage(ctx) {
    let matches = []
    ctx.render(searchTemplate(formHandller(onSearch), matches));

    document.querySelector('.search-result').style.display = 'none';

    async function onSearch(data) {
        if (data.search == '') {
            return alert('make request');
        }
        const query = data.search;

        const isFound = await searchingFruits(query);
        matches = isFound;
        ctx.render(searchTemplate(formHandller(onSearch), matches));
        document.querySelector('.search-result').style.display = '';
    }
}