import { html } from '../../node_modules/lit-html/lit-html.js';
import { getSpecificDataWithId, onEdit } from '../api/data.js';
import { formHandller } from '../utility.js';
 
const editTemplate = (edit,product) => html`
<section id="editPage">
<form class="editForm" @submit=${edit}>
    <img src=${product.image}>
    <div>
        <h2>Edit PetPal</h2>
        <div class="name">
            <label for="name">Name:</label>
            <input name="name" id="name" type="text" value="${product.name}">
        </div>
        <div class="breed">
            <label for="breed">Breed:</label>
            <input name="breed" id="breed" type="text" value="${product.breed}">
        </div>
        <div class="Age">
            <label for="age">Age:</label>
            <input name="age" id="age" type="text" value="${product.age}">
        </div>
        <div class="weight">
            <label for="weight">Weight:</label>
            <input name="weight" id="weight" type="text" value="${product.weight}">
        </div>
        <div class="image">
            <label for="image">Image:</label>
            <input name="image" id="image" type="text" value=${product.image}>
        </div>
        <button class="btn" type="submit">Edit Pet</button>
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