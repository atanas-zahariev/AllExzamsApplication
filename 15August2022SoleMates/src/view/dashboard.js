import { html } from '../../node_modules/lit-html/lit-html.js';
import { getAllProductInSystem } from '../api/data.js';


const dashboardTemplate = (products) => html`
<section id="dashboard">
          <h2>Collectibles</h2>
          <ul class="card-wrapper">
            ${products.length == 0 ? html`
            <h2>There are no items added yet.</h2>`:
        products.map( (p) => html`
            <li class="card">
            <img src="${p.imageUrl}" alt="travis" />
            <p>
              <strong>Brand: </strong><span class="brand">${p.brand}</span>
            </p>
            <p>
              <strong>Model: </strong
              ><span class="model">${p.model}</span>
            </p>
            <p><strong>Value:</strong><span class="value">${p.value}</span>$</p>
            <a class="details-btn" href="/details/${p._id}">Details</a>
          </li>`
        )
    }
           
          
          </ul>

          <!-- Display an h2 if there are no posts -->
          
        </section>`;

export async function dashboardPage(ctx) {
    const products = await getAllProductInSystem()
    ctx.render(dashboardTemplate(products))

}