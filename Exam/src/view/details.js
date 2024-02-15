import { html } from '../../node_modules/lit-html/lit-html.js';
import { getSpecificDataWithId, onDelete } from '../api/data.js';
import { getUser } from '../utility.js';


const detailsTemplate = (item,isOwner,deleteData) => html`
<section id="details">
<div id="details-wrapper">
  <img id="details-img" src=${item.imageUrl} alt="example1" />
  <p id="details-title">${item.name}</p>
  <div id="info-wrapper">
        <div id="details-description">
                <p>
                ${item.description}
                </p>
            <p id="nutrition">Nutrition</p>
                <p id = "details-nutrition">
                ${item.nutrition}
                </p>
        </div>
       ${isOwner ? html `
       <div id="action-buttons">
            <a href="/edit/${item._id}" id="edit-btn">Edit</a>
            <a href="javascript:void(0)" id="delete-btn" @click=${deleteData}>Delete</a>
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