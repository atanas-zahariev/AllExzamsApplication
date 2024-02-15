import { html } from '../../node_modules/lit-html/lit-html.js';
import { addApplication, getOwnApplication, getSpecificDataWithId, getTotalAplication, onDelete } from '../api/data.js';
import { getUser } from '../utility.js';

const detailsTemplate = (offer, isOwner, deleteOffer, totalApplication, isAplaieble, makeApplay) => html`
<section id="details">
          <div id="details-wrapper">
            <img id="details-img" src="${offer.imageUrl}" alt="example1" />
            <p id="details-title">${offer.title}</p>
            <p id="details-category">
              Category: <span id="categories">${offer.category}</span>
            </p>
            <p id="details-salary">
              Salary: <span id="salary-number">${offer.salary}</span>
            </p>
            <div id="info-wrapper">
              <div id="details-description">
                <h4>Description</h4>
                <span>${offer.description}</span>
              </div>
              <div id="details-requirements">
                <h4>Requirements</h4>
                <span>${offer.requirements}</span>
              </div>
            </div>
            <p>Applications: <strong id="applications">${totalApplication}</strong></p>

            <!--Edit and Delete are only for creator-->
            ${isOwner ? html`
            <div id="action-buttons">
            <a href="/edit/${offer._id}" id="edit-btn">Edit</a>
            <a href="javascript:void(0)" id="delete-btn" @click=${deleteOffer}>Delete</a>
            </div>` : null}

            ${!isOwner && isAplaieble ? html`
            <div id="action-buttons">
            <a href="javascript:void(0)" id="apply-btn" @click=${makeApplay}>Apply</a>
            </div>`: null}
               
          </div>
        </section>`;

export async function detailsPage(ctx) {
    const offerId = ctx.params.id;
    const offer = await getSpecificDataWithId(offerId);
    const ownerId = offer._ownerId;

    let totalApplication = await getTotalAplication(offerId);


    const user = getUser();

    let isOwner;

    let isAplaieble;

    if (user != null) {
        const userId = user._id;

        const ownApplication = await getOwnApplication(offerId, userId);

        if (ownerId == userId) {
            isOwner = true;
        }
        if (ownApplication == 0) {
            isAplaieble = true;
        }
    }

    ctx.render(detailsTemplate(offer, isOwner, deleteOffer, totalApplication, isAplaieble, makeApplay))

    async function deleteOffer() {
        await onDelete(offerId);

        ctx.page.redirect('/dashboard')
    }

    async function makeApplay() {
        await addApplication(offerId);
        isAplaieble = false;
        totalApplication++
        ctx.render(detailsTemplate(offer, isOwner, deleteOffer, totalApplication, isAplaieble, makeApplay))

        //detailsPage(ctx);

    }
}