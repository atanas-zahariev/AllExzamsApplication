import { html } from '../../node_modules/lit-html/lit-html.js';
import { deleteItem, getDetails } from '../api/data.js';
import { getUser } from '../utility.js';


const detailsTemplate = (product, isOwner, onDelete) => html`
<section id="details">
          <div id="details-wrapper">
            <p id="details-title">Shoe Details</p>
            <div id="img-wrapper">
              <img src="${product.imageUrl}" alt="example1" />
            </div>
            <div id="info-wrapper">
              <p>Brand: <span id="details-brand">${product.brand}</span></p>
              <p>
                Model: <span id="details-model">${product.model}</span>
              </p>
              <p>Release date: <span id="details-release">${product.release}</span></p>
              <p>Designer: <span id="details-designer">${product.designer}</span></p>
              <p>Value: <span id="details-value">${product.value}</span></p>
            </div>
            ${isOwner ? html`
            <div id="action-buttons">
              <a href="/edit/${product._id}" id="edit-btn">Edit</a>
              <a href="javascript:void(0)" id="delete-btn" @click=${onDelete}>Delete</a>
            </div>` : ''}

            <!--Edit and Delete are only for creator-->
            
          </div>
        </section>`

export async function detailsPage(ctx) {
    const productId = ctx.params.id;
    const product = await getDetails(productId);
    const ownerId = product._ownerId;
    const user = getUser();
    let userId;
    if (user) {
        userId = user._id
    }

    const isOwner = ownerId == userId;
    ctx.render(detailsTemplate(product, isOwner, onDelete));

    async function onDelete() {
        const confirmed = confirm('are you shour')
        if (confirmed) {
            await deleteItem(productId);;
            ctx.page.redirect('/dashboard')
        }
        
    }
}