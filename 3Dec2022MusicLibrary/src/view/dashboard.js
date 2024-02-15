import { html } from '../../node_modules/lit-html/lit-html.js';
import { getAllAlbums } from '../api/data.js';

const dashboardTemplate = (albums) => html`<h2>Albums</h2>
<section id="dashboard">
<ul class="card-wrapper">
 ${albums.length == 0 ?
    html`<h2>There are no albums added yet.</h2>` :
    albums.map((a) => html`<li class="card">
      <img src="${a.imageUrl}" alt="travis" />
      <p>
        <strong>Singer/Band: </strong><span class="singer">${a.singer}</span>
      </p>
      <p>
        <strong>Album name: </strong><span class="album">${a.album}</span>
      </p>
      <p><strong>Sales:</strong><span class="sales">${a.sales}</span></p>
      <a class="details-btn" href="/details/${a._id}">Details</a>
    </li> `
    )}
    </ul>
</section>`

export async function showAlbums(ctx) {
  const albums = await getAllAlbums();
 
  ctx.render(dashboardTemplate(albums))
}