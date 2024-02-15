import { html } from '../../node_modules/lit-html/lit-html.js';
import { getSpecificDataWithId, onDelete } from '../api/data.js';
import { getUser } from '../utility.js';


const detailsTemplate = (item,isOwner,deleteData) => html`
<section id="listing-details">
<h1>Details</h1>
<div class="details-info">
    <img src=${item.imageUrl}>
    <hr>
    <ul class="listing-props">
        <li><span>Brand:</span>${item.brand}</li>
        <li><span>Model:</span>${item.model}</li>
        <li><span>Year:</span>${item.year}</li>
        <li><span>Price:</span>${item.price}$</li>
    </ul>

    <p class="description-para">${item.description}</p>
    ${isOwner ? html `
    <div class="listings-buttons">
        <a href="/edit/${item._id}" class="button-list">Edit</a>
        <a href="javascript:void(0)" class="button-list" @click=${deleteData}>Delete</a>
    </div>
    ` : null}
   
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
            ctx.page.redirect('/dasboard')
        }
    }
   

}