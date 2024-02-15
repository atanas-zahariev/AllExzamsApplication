import { html } from '../../node_modules/lit-html/lit-html.js';
import { getSpecificDataWithId, getTotalAction, getUserAction, makeAction, onDelete } from '../api/data.js';
import { getUser } from '../utility.js';


const detailsTemplate = (item, isOwner, isAct, deleteData, action, totalAction) => html`
<section id="detailsPage">
<div id="detailsBox">
    <div class="detailsInfo">
        <h1>Title: ${item.title}</h1>
        <div>
            <img src="${item.imageUrl}"/>
        </div>
    </div>

    <div class="details">
        <h3>Theater Description</h3>
        <p>${item.description}</p>
        <h4>Date: ${item.date}</h4>
        <h4>Author: ${item.author}</h4>
        <div class="buttons">
             ${isOwner ? html`
             <a class="btn-delete" href="javascript:void(0)" @click=${deleteData}>Delete</a>
             <a class="btn-edit" href="/edit/${item._id}">Edit</a>
             ` : null}
             ${isAct && !isOwner ? html`
             <a class="btn-like" href="javascript:void(0)" @click=${action}>Like</a>
             ` : null}           
        </div>
        <p class="likes">Likes: ${totalAction}</p>
    </div>
</div>
</section>
`;

export async function detailsPage(ctx) {
    const theaterId = ctx.params.id;
    const item = await getSpecificDataWithId(theaterId);
    const ownerId = item._ownerId;

    let totalAction = await getTotalAction(theaterId)

    const user = getUser();

    let isOwner;
    let isAct;

    if (user) {
        const userId = user._id;
        const userAction = await getUserAction(theaterId, userId);

        if (ownerId == userId) {
            isOwner = true;
        }

        if (userAction == 0) {
            isAct = true;
        }

    }

    ctx.render(detailsTemplate(item, isOwner, isAct, deleteData, action, totalAction))

    async function deleteData() {
        const confirmed = confirm('are you shour')
        if (confirmed) {
            await onDelete(theaterId);
            ctx.page.redirect('/')
        }
    }

    async function action() {
        await makeAction(theaterId);

        detailsPage(ctx);      
    }

}