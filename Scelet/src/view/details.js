import { html } from '../../node_modules/lit-html/lit-html.js';
import { getSpecificDataWithId, getTotalAction, getUserAction, makeAction, onDelete } from '../api/data.js';
import { getUser } from '../utility.js';


const detailsTemplate = () => html`

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

    ctx.render(detailsTemplate())

    async function deleteData() {
        const confirmed = confirm('are you shour')
        if (confirmed) {
            await onDelete(actId);
            ctx.page.redirect('/')
        }
    }

    async function action() {
        await makeAction(actId);
        detailsPage(ctx);
    }

}