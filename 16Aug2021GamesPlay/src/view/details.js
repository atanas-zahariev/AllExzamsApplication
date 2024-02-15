import { html } from '../../node_modules/lit-html/lit-html.js';
import { getSpecificDataWithId, getTotalAction, makeAction, onDelete } from '../api/data.js';
import { formHandller, getUser } from '../utility.js';


const detailsTemplate = (item, totalAction, isOwner, deleteData, comment, user) => html`
<section id="game-details">
<h1>Game Details</h1>
<div class="info-section">

    <div class="game-header">
        <img class="game-img" src=${item.imageUrl} />
        <h1>${item.title}</h1>
        <span class="levels">MaxLevel: ${item.maxLevel}</span>
        <p class="type">${item.category}</p>
    </div>

    <p class="text">
        ${item.summary}
    </p>

    <div class="details-comments">
        <h2>Comments:</h2>
        <ul>
            ${totalAction == 0 ? html`
            <p class="no-comment">No comments.</p>` :
        totalAction.map(c => html`
            <li class="comment">
              <p>Content: ${c.comment}</p>
            </li>`)}                      
        </ul>        
    </div>

    ${isOwner ? html`
    <div class="buttons">
        <a href="/edit/${item._id}" class="button">Edit</a>
        <a href="javascript:void(0)" class="button" @click=${deleteData}>Delete</a>
    </div>`: null}
    
</div>

    ${user && !isOwner ? html`
    <article class="create-comment">
        <label>Add new comment:</label>
        <form class="form" @submit=${comment}>
            <textarea name="comment" placeholder="Comment......"></textarea>
            <input class="btn submit" type="submit" value="Add Comment">
        </form>
    </article>`: null}

</section>
`;

export async function detailsPage(ctx) {
    const actId = ctx.params.id;
  
    const item = await getSpecificDataWithId(actId);
    console.log(item);
    
    const ownerId = item._ownerId;

    const totalAction = await getTotalAction(actId)
   

    const user = getUser();

    let isOwner;


    if (user) {
        const userId = user._id;
        if (ownerId == userId) {
            isOwner = true;
        }

    }

    ctx.render(detailsTemplate(item, totalAction, isOwner, deleteData, formHandller(comment), user))

    async function deleteData() {
        const confirmed = confirm('are you shour')
        if (confirmed) {
            await onDelete(actId);
            ctx.page.redirect('/')
        }
    }

    async function comment(data,form) {
        const result = {
            gameId: actId,
            comment: data.comment
        }
        await makeAction(result);
        form.reset()

        detailsPage(ctx)

    }

}