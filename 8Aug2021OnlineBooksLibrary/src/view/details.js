import { html } from '../../node_modules/lit-html/lit-html.js';
import { getSpecificDataWithId, getTotalAction, getUserAction, makeAction, onDelete } from '../api/data.js';
import { getUser } from '../utility.js';


const detailsTemplate = (item,isOwner,isAct,deleteData,action,totalAction) => html`
<section id="details-page" class="details">
<div class="book-information">
    <h3>${item.title}</h3>
    <p class="type">Type: ${item.type}</p>
    <p class="img"><img src="${item.imageUrl}"></p>
    <div class="actions">
        ${isOwner ? html `
        <a class="button" href="/edit/${item._id}">Edit</a>
        <a class="button" href="javascript:void(0)" @click=${deleteData}>Delete</a>
        `: null}

        ${isAct && !isOwner ? html `
        <a class="button" href="javascript:void(0)" @click=${action}>Like</a>
        ` : null}
 
        <div class="likes">
            <img class="hearts" src="/images/heart.png">
            <span id="total-likes">Likes: ${totalAction}</span>
        </div>       
    </div>
</div>
<div class="book-description">
    <h3>Description:</h3>
    <p>${item.description}</p>
</div>
</section>
`;

export async function detailsPage(ctx) {
    const actId = ctx.params.id;
   
    const item = await getSpecificDataWithId(actId);
   
    const ownerId = item._ownerId;

    const totalAction = await getTotalAction(actId)
    
    const user = getUser();

    let isOwner;
    let isAct;

    if (user) {
        const userId = user._id;
        const userAction = await getUserAction(actId, userId);
        
        if (ownerId == userId) {
            isOwner = true;
        }

        if (userAction == 0) {
            isAct = true;
        }

    }

    ctx.render(detailsTemplate(item,isOwner,isAct,deleteData,action,totalAction))

    async function deleteData() {
        const confirmed = confirm('are you shour')
        if (confirmed) {
            await onDelete(actId);
            ctx.page.redirect('/')
        }
    }

    async function action() {
        const result = {
            bookId: actId
        }
        await makeAction(result);

        detailsPage(ctx);
    }

}