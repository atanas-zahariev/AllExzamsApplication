import { html } from '../../node_modules/lit-html/lit-html.js';
import { getAllDonation, getSpecificDataWithId, getUserDonation, makeDonation, onDelete } from '../api/data.js';
import { getUser } from '../utility.js';

const detailsTemplate = (item, isOwner, deleteItem, totalDonation, donation, isDonate) => html`
<section id="details-page">
            <h1 class="title">Post Details</h1>

            <div id="container">
                <div id="details">
                    <div class="image-wrapper">
                        <img src="${item.imageUrl}" alt="Material Image" class="post-image">
                    </div>
                    <div class="info">
                        <h2 class="title post-title">${item.title}</h2>
                        <p class="post-description">Description:${item.description} </p>
                        <p class="post-address">${item.address}</p>
                        <p class="post-number">Phone number: ${item.phone}</p>
                        <p class="donate-Item">Donate Materials: ${totalDonation}</p>

                        <!--Edit and Delete are only for creator-->
                        <div class="btns">
                        ${isOwner ? html`
                        <a href="/edit/${item._id}" class="edit-btn btn">Edit</a>
                            <a href="javascript:void(0)" class="delete-btn btn" @click=${deleteItem}>Delete</a>` : null}
                            
                            <!--Bonus - Only for logged-in users ( not authors )-->
                         ${!isOwner && isDonate ? html`
                         <a href="javascript:void(0)" class="donate-btn btn" @click=${donation}>Donate</a>` : null}                              
                        </div>

                    </div>
                </div>
            </div>
        </section>`

export async function detailsPage(ctx) {
    const itemId = ctx.params.id;
    const item = await getSpecificDataWithId(itemId);
    const ownerId = item._ownerId;

    let totalDonation = await getAllDonation(itemId);

    const user = getUser();


    let isOwner;
    let isDonate;

    if (user) {
        const userId = user._id;
        const userDonation = await getUserDonation(itemId, userId);

        if (userId == ownerId) {
            isOwner = true;
        }
        if (userDonation == 0) {
            isDonate = true;
        }
    }

    ctx.render(detailsTemplate(item, isOwner, deleteItem, totalDonation, donation, isDonate));

    async function deleteItem() {
        const confirmed = confirm('are you shour')
        if (confirmed) {
            await onDelete(itemId);
            ctx.page.redirect('/dashboard')
        }
    }

    async function donation() {
        await makeDonation(itemId);

        detailsPage(ctx)
    }
}