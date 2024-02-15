import { html } from '../../node_modules/lit-html/lit-html.js';
import { getSpecificDataWithId, onEdit } from '../api/data.js';
import { formHandller } from '../utility.js';
 
const editTemplate = (edit,product) => html`
<section id="edit-page" class="auth">
<form id="edit" @submit=${edit}>
    <div class="container">

        <h1>Edit Game</h1>
        <label for="leg-title">Legendary title:</label>
        <input type="text" id="title" name="title" value="${product.title}">

        <label for="category">Category:</label>
        <input type="text" id="category" name="category" value="${product.category}">

        <label for="levels">MaxLevel:</label>
        <input type="number" id="maxLevel" name="maxLevel" min="1" value="${product.maxLevel}">

        <label for="game-img">Image:</label>
        <input type="text" id="imageUrl" name="imageUrl" value="${product.imageUrl}">

        <label for="summary">Summary:</label>
        <textarea name="summary" id="summary" .value="${product.summary}"></textarea>
        <input class="btn submit" type="submit" value="Edit Game">

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
            return alert('all fields required')
        }

        await onEdit(productId,data);
        ctx.page.redirect(`/details/${productId}`)
    }

}