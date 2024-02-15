import { html } from '../../node_modules/lit-html/lit-html.js';
import { getAllDataInSystem } from '../api/data.js';


const dashboardTemplate = (offers) => html`
<section id="catalog-page">
<h1>All Games</h1>
<!-- Display div: with information about every game (if any) -->
${offers.length == 0 ? html`
<h3 class="no-articles">No articles yet</h3>`:
  offers.map(game => html`
  <div class="allGames">
    <div class="allGames-info">
        <img src=${game.imageUrl}>
        <h6>${game.category}</h6>
        <h2>${game.title}</h2>
        <a href="/details/${game._id}" class="details-button">Details</a>
    </div>
  </div>`)}
</section>
`;

export async function dashboardPage(ctx){
    const offers = await getAllDataInSystem();
    
    ctx.render(dashboardTemplate(offers))
}