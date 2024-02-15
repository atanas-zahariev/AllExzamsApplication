import { html } from '../../node_modules/lit-html/lit-html.js';
import { searchItem } from '../api/data.js';
import { formHandller, getUser } from '../utility.js';


const searchTemplate = (serchingBrand, searchForItem, isLogedIn) => html`
<section id="search">
<h2>Search by Brand</h2>

<form class="search-wrapper cf" @submit=${serchingBrand}>
  <input
    id="#search-input"
    type="text"
    name="search"
    placeholder="Search here..."
    required
  />
  <button type="submit">Search</button>
</form>

<h3>Results:</h3>

<div id="search-container">
  <ul class="card-wrapper">
    <!-- Display a li with information about every post (if any)-->
    ${searchForItem && searchForItem.length != 0 ? searchForItem.map(item =>
  html`
      <li class="card">
      <img src="${item.imageUrl}" alt="travis" />
      <p>
        <strong>Brand: </strong><span class="brand">${item.brand}</span>
      </p>
      <p>
        <strong>Model: </strong
        ><span class="model">${item.model}</span>
      </p>
      <p><strong>Value:</strong><span class="value">${item.value}</span>$</p>  
      ${isLogedIn ?
      html`
      <a class="details-btn" href="/details/${item._id}">Details</a>` : ''}    
    </li>`) :
    html`
  <h2>There are no results found.</h2>`}   
  </ul>
 
</div>
</section>`

export function searhPage(ctx) {
  let isLogedIn;
  let searchForItem;
  ctx.render(searchTemplate(formHandller(serchingBrand), searchForItem, isLogedIn))

  document.querySelector('main div').style.display = 'none'


  async function serchingBrand(data) {

    const query = data.search;

    const items = await searchItem(query);

    searchForItem = items

    const user = getUser();

    if (user) {
      isLogedIn = true;
    }

    ctx.render(searchTemplate(formHandller(serchingBrand), searchForItem, isLogedIn))

    document.querySelector('main div').style.display = ''
  }
}