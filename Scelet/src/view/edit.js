import { html } from '../../node_modules/lit-html/lit-html.js';
import { getSpecificDataWithId, onEdit } from '../api/data.js';
import { formHandller } from '../utility.js';
 
const editTemplate = (edit,product) => html`

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