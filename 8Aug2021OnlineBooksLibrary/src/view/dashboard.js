import { html } from '../../node_modules/lit-html/lit-html.js';
import { getAllDataInSystem } from '../api/data.js';


const dashboardTemplate = (offers) => html`
<section id="dashboard-page" class="dashboard">
<h1>Dashboard</h1>
<ul class="other-books-list">
  ${offers.length == 0 ? html`
  <p class="no-books">No books in database!</p>
  ` : offers.map(offer => html `
  <li class="otherBooks">
        <h3>${offer.title}</h3>
        <p>Type: ${offer.type}</p>
        <p class="img"><img src="${offer.imageUrl}"></p>
        <a class="button" href="/details/${offer._id}">Details</a>
  </li>
  `)}    
</ul>
</section>
`;

export async function dashboardPage(ctx){
    const offers = await getAllDataInSystem();
   
    ctx.render(dashboardTemplate(offers));
}