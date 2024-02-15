import { html } from '../../node_modules/lit-html/lit-html.js';
import { getSpecificDataWithId, onEdit } from '../api/data.js';
import { formHandller } from '../utility.js';
 
const editTemplate = (edit,product) => html`
<section id="editPage">
<form class="theater-form" @submit=${edit}>
    <h1>Edit Theater</h1>
    <div>
        <label for="title">Title:</label>
        <input id="title" name="title" type="text" placeholder="Theater name" value="${product.title}">
    </div>
    <div>
        <label for="date">Date:</label>
        <input id="date" name="date" type="text" placeholder="Month Day, Year" value="${product.date}">
    </div>
    <div>
        <label for="author">Author:</label>
        <input id="author" name="author" type="text" placeholder="Author"
            value="${product.author}">
    </div>
    <div>
        <label for="description">Theater Description:</label>
        <textarea id="description" name="description"
            placeholder="Description" .value="${product.description}"></textarea>
    </div>
    <div>
        <label for="imageUrl">Image url:</label>
        <input id="imageUrl" name="imageUrl" type="text" placeholder="Image Url"
            value=${product.imageUrl}>
    </div>
    <button class="btn" type="submit">Submit</button>
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