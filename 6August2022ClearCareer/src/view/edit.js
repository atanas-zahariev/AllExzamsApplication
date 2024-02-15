import { html } from '../../node_modules/lit-html/lit-html.js';
import { getSpecificDataWithId, onEdit } from '../api/data.js';
import { formHandller } from '../utility.js';
 
const editTemplate = (edit,offer) => html`
<section id="edit">
          <div class="form">
            <h2>Edit Offer</h2>
            <form class="edit-form" @submit=${edit}>
              <input
                type="text"
                name="title"
                id="job-title"
                placeholder="Title"
                .value=${offer.title}
              />
              <input
                type="text"
                name="imageUrl"
                id="job-logo"
                placeholder="Company logo url"
                .value=${offer.imageUrl}
              />
              <input
                type="text"
                name="category"
                id="job-category"
                placeholder="Category"
                .value=${offer.category}
              />
              <textarea
                id="job-description"
                name="description"
                placeholder="Description"
                rows="4"
                cols="50"
                .value=${offer.description}
              ></textarea>
              <textarea
                id="job-requirements"
                name="requirements"
                placeholder="Requirements"
                rows="4"
                cols="50"
                .value=${offer.requirements}
              ></textarea>
              <input
                type="text"
                name="salary"
                id="job-salary"
                placeholder="Salary"
                .value=${offer.salary}
              />

              <button type="submit">post</button>
            </form>
          </div>
        </section>`

export async function editPage(ctx){
    const offerId = ctx.params.id;
    const offer = await getSpecificDataWithId(offerId);
    console.log(offer);


    ctx.render(editTemplate(formHandller(edit),offer))

    async function edit(data){
        if(Object.values(data).some(x => x == '')){
            return alert('all fields required')
        }

        await onEdit(offerId,data);
        ctx.page.redirect(`/details/${offerId}`)
    }

}