import { html } from '../../node_modules/lit-html/lit-html.js';
import { getAllDataInSystem } from '../api/data.js';


const dashboardTemplate = (offers,memesTemplate) => html`
<section id="meme-feed">
            <h1>All Memes</h1>
            <div id="memes">
				<!-- Display : All memes in database ( If any ) -->
               ${offers.length == 0 ? html`
               <p class="no-memes">No memes in database.</p>
               ` : offers.map( memesTemplate)}
               
				<!-- Display : If there are no memes in database -->
				
			</div>
        </section>
`;

export async function dashboardPage(ctx){
    const offers = await getAllDataInSystem();
   
    const memesTemplate = (meme) => html `
    <div class="meme">
        <div class="card">
            <div class="info">
                <p class="meme-title">${meme.title}</p>
                <img class="meme-image" alt="meme-img" src=${meme.imageUrl}>
            </div>
            <div id="data-buttons">
                <a class="button" href="/details/${meme._id}">Details</a>
            </div>
        </div>
   </div>
    `
    ctx.render(dashboardTemplate(offers,memesTemplate))
}