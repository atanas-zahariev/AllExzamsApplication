import { html } from '../../node_modules/lit-html/lit-html.js';
import { getDetails, onEdit } from '../api/data.js';
import { formHandller } from '../utility.js';
 
const editTemplate = (edit,product) => html`
<section id="edit">
<div class="form" @submit=${edit}>
  <h2>Edit item</h2>
  <form class="edit-form">
    <input
      type="text"
      name="brand"
      id="shoe-brand"
      placeholder="Brand"
      .value=${product.brand}
    />
    <input
      type="text"
      name="model"
      id="shoe-model"
      placeholder="Model"
      .value=${product.model}
    />
    <input
      type="text"
      name="imageUrl"
      id="shoe-img"
      placeholder="Image url"
      .value=${product.imageUrl}
    />
    <input
      type="text"
      name="release"
      id="shoe-release"
      placeholder="Release date"
      .value=${product.release}
    />
    <input
      type="text"
      name="designer"
      id="shoe-designer"
      placeholder="Designer"
      .value=${product.designer}
    />
    <input
      type="text"
      name="value"
      id="shoe-value"
      placeholder="Value"
      .value=${product.value}
    />

    <button type="submit">post</button>
  </form>
</div>
</section>`

export async function editPage(ctx){
    const productId = ctx.params.id;
    const product = await getDetails(productId);


    ctx.render(editTemplate(formHandller(edit),product))

    async function edit(data){
        if(Object.values(data).some(x => x == '')){
            return alert('all fields required')
        }

        await onEdit(productId,data);
        ctx.page.redirect(`/details/${productId}`)
    }

}