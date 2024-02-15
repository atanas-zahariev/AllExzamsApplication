import { html } from '../../node_modules/lit-html/lit-html.js';
import { getSpecificDataWithId, onEdit } from '../api/data.js';
import { formHandller } from '../utility.js';
 
const editTemplate = (edit,product) => html`
<section id="edit">
<div class="form">
  <h2>Edit Fruit</h2>
  <form class="edit-form" @submit=${edit}>
    <input
      type="text"
      name="name"
      id="name"
      placeholder="Fruit Name"
      .value="${product.name}"
    />
    <input
      type="text"
      name="imageUrl"
      id="Fruit-image"
      placeholder="Fruit Image URL"
      .value="${product.imageUrl}"
    />
    <textarea
      id="fruit-description"
      name="description"
      placeholder="Description"
      rows="10"
      cols="50"
      .value="${product.description}"
    ></textarea>
    <textarea
      id="fruit-nutrition"
      name="nutrition"
      placeholder="Nutrition"
      rows="10"
      cols="50"
      .value="${product.nutrition}"
    ></textarea>
    <button type="submit">post</button>
  </form>
</div>
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