import { html } from '../../node_modules/lit-html/lit-html.js';
import { getAllDataInSystem } from '../api/data.js';
import { getUser } from '../utility.js';


const dashboardTemplate = (offers,user) => html`
<section id="catalogPage">
<h1>All Albums</h1>
${offers.length == 0 ? html `
  <p>No Albums in Catalog!</p>
`: offers.map(album => html `
        <div class="card-box">
        <img src="${album.imgUrl}">
            <div>
                <div class="text-center">
                    <p class="name">Name: ${album.name}</p>
                    <p class="artist">Artist: ${album.artist}</p>
                    <p class="genre">Genre: ${album.genre}</p>
                    <p class="price">Price: $${album.price}</p>
                    <p class="date">Release Date: ${album.releaseDate}</p>
                </div>
                ${user ? html `
                        <div class="btn-group">
                          <a href="/details/${album._id}" id="details">Details</a>
                        </div>
                `: null}               
            </div>
        </div>
`)}
</section>
`;

export async function dashboardPage(ctx){
    const offers = await getAllDataInSystem();
    
    const user = getUser()
    
    ctx.render(dashboardTemplate(offers,user))
}