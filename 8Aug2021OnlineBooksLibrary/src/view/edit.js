import { html } from '../../node_modules/lit-html/lit-html.js';
import { getSpecificDataWithId, onEdit } from '../api/data.js';
import { formHandller } from '../utility.js';
 
const editTemplate = (edit,product) => html`
<section id="edit-page" class="edit">
<form id="edit-form" action="#" method="" @submit=${edit}>
    <fieldset>
        <legend>Edit my Book</legend>
        <p class="field">
            <label for="title">Title</label>
            <span class="input">
                <input type="text" name="title" id="title" value="${product.title}">
            </span>
        </p>
        <p class="field">
            <label for="description">Description</label>
            <span class="input">
                <textarea name="description"
                    id="description" .value="${product.description}"></textarea>
            </span>
        </p>
        <p class="field">
            <label for="image">Image</label>
            <span class="input">
                <input type="text" name="imageUrl" id="image" value=${product.imageUrl}>
            </span>
        </p>
        <p class="field">
            <label for="type">Type</label>
            <span class="input">
                <select id="type" name="type" value="${product.type}">
                    <option value="Fiction" selected>Fiction</option>
                    <option value="Romance">Romance</option>
                    <option value="Mistery">Mistery</option>
                    <option value="Classic">Clasic</option>
                    <option value="Other">Other</option>
                </select>
            </span>
        </p>
        <input class="button submit" type="submit" value="Save">
    </fieldset>
</form>
</section>
`

export async function editPage(ctx){
    const productId = ctx.params.id;
    const product = await getSpecificDataWithId(productId);


    ctx.render(editTemplate(formHandller(edit),product))

    async function edit(data){
        if(Object.values(data).some(x => x == '')){
            return alert('all fields required')
        }

        await onEdit(productId,data);
        ctx.page.redirect(`/details/${productId}`)
    }

}