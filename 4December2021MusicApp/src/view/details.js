import { html } from '../../node_modules/lit-html/lit-html.js';
import { getSpecificDataWithId, onDelete } from '../api/data.js';
import { getUser } from '../utility.js';


const detailsTemplate = (item,isOwner,deleteData) => html`
<section id="detailsPage">
<div class="wrapper">
    <div class="albumCover">
        <img src="${item.imgUrl}">
    </div>
    <div class="albumInfo">
        <div class="albumText">

            <h1>Name: ${item.name}</h1>
            <h3>Artist: ${item.artist}</h3>
            <h4>Genre: ${item.genre}</h4>
            <h4>Price: ${item.price}</h4>
            <h4>Date: ${item.releaseDate}</h4>
            <p>Description: ${item.description}</p>
        </div>
         ${isOwner ? html `
         <div class="actionBtn">
                <a href="/edit/${item._id}" class="edit">Edit</a>
                <a href="javascript:void(0)" class="remove" @click=${deleteData}>Delete</a>
         </div>
         ` : null}      
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