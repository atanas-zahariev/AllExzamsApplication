import { html } from '../../node_modules/lit-html/lit-html.js';
import { getAllDataInSystem } from '../api/data.js';


const dashboardTemplate = (offers) => html`
<h2>Fruits</h2>
<section id="dashboard">
  <!-- Display a div with information about every post (if any)-->
  ${offers.length == 0 ? html `
  <h2>No fruit info yet.</h2>
  ` : offers.map( offer => html `
  <div class="fruit">
    <img src="${offer.imageUrl}" alt="example1" />
    <h3 class="title">${offer.name}</h3>
    <p class="description">${offer.description}</p>
    <a class="details-btn" href="/details/${offer._id}">More Info</a>
  </div>
  `)}


  
</section>
 
`;

export async function dashboardPage(ctx){
    const offers = await getAllDataInSystem();
   
    ctx.render(dashboardTemplate(offers))
};