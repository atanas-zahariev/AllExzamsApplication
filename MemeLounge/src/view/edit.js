import { html } from '../../node_modules/lit-html/lit-html.js';
import { getSpecificDataWithId, onEdit } from '../api/data.js';
import { notify } from '../app.js';
import { formHandller } from '../utility.js';
 
const editTemplate = (edit,product) => html`
<section id="edit-meme">
<form id="edit-form" @submit=${edit}>
    <h1>Edit Meme</h1>
    <div class="container">
        <label for="title">Title</label>
        <input id="title" type="text" placeholder="Enter Title" name="title" .value="${product.title}">

        <label for="description">Description</label>
        <textarea id="description" placeholder="Enter Description" name="description" .value="${product.description}"></textarea>

        <label for="imageUrl">Image Url</label>
        <input id="imageUrl" type="text" placeholder="Enter Meme ImageUrl" name="imageUrl" .value="${product.imageUrl}">

        <input type="submit" class="registerbtn button" value="Edit Meme">
    </div>
</form>
</section>
`

export async function editPage(ctx){
    const productId = ctx.params.id;
    const product = await getSpecificDataWithId(productId);


    ctx.render(editTemplate(formHandller(edit),product))

    async function edit(data){
        if(Object.values(data).some(x => x == '')){
            return notify('all fields required')
        }

        await onEdit(productId,data);
        ctx.page.redirect(`/details/${productId}`)
    }

}