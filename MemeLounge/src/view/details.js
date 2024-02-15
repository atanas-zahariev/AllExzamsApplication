import { html } from '../../node_modules/lit-html/lit-html.js';
import { getSpecificDataWithId,  onDelete } from '../api/data.js';
import { getUser } from '../utility.js';


const detailsTemplate = (item,isOwner,deleteData) => html`
<section id="meme-details">
<h1>Meme Title: ${item.title}</h1>

<div class="meme-details">
    <div class="meme-img">
        <img alt="meme-alt" src=${item.imageUrl}>
    </div>
    <div class="meme-description">
        <h2>Meme Description</h2>
        <p>${item.description}</p>

        ${isOwner ? html `
        <a class="button warning" href="/edit/${item._id}">Edit</a>
        <button class="button danger" @click=${deleteData}>Delete</button>`: null}                
    </div>
</div>
</section>
`;

export async function detailsPage(ctx) {
    const actId = ctx.params.id;
    const item = await getSpecificDataWithId(actId);
    const ownerId = item._ownerId;

    const user = getUser();

    let isOwner;
    
    if (user) {
        const userId = user._id;
        if (ownerId == userId) {
            isOwner = true;
        }
    }

    ctx.render(detailsTemplate(item,isOwner,deleteData))

    async function deleteData() {
        const confirmed = confirm('are you shour')
        if (confirmed) {
            await onDelete(actId);
            ctx.page.redirect('/dashboard')
        }
    }  

}