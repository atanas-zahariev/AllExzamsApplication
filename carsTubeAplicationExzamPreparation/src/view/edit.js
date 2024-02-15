import { html } from '../../node_modules/lit-html/lit-html.js';
import { getSpecificDataWithId, onEdit } from '../api/data.js';
import { formHandller } from '../utility.js';

const editTemplate = (edit, product) => html`
<section id="edit-listing">
            <div class="container">

                <form id="edit-form" @submit=${edit}>
                    <h1>Edit Car Listing</h1>
                    <p>Please fill in this form to edit an listing.</p>
                    <hr>

                    <p>Car Brand</p>
                    <input type="text" placeholder="Enter Car Brand" name="brand" value="${product.brand}">

                    <p>Car Model</p>
                    <input type="text" placeholder="Enter Car Model" name="model" value="${product.model}">

                    <p>Description</p>
                    <input type="text" placeholder="Enter Description" name="description" value="${product.description}">

                    <p>Car Year</p>
                    <input type="number" placeholder="Enter Car Year" name="year" value="${product.year}">

                    <p>Car Image</p>
                    <input type="text" placeholder="Enter Car Image" name="imageUrl" value="${product.imageUrl}">

                    <p>Car Price</p>
                    <input type="number" placeholder="Enter Car Price" name="price" value="${product.price}">

                    <hr>
                    <input type="submit" class="registerbtn" value="Edit Listing">
                </form>
            </div>
        </section>

`

export async function editPage(ctx) {
    const productId = ctx.params.id;
    const product = await getSpecificDataWithId(productId);
    console.log(product);

    ctx.render(editTemplate(formHandller(edit), product))

    async function edit(data) {
        if (Object.values(data).some(x => x == '')) {
            return alert('all fields required')
        }
        const brand = data.brand;
        const model = data.model;
        const description = data.description;
        const year = data.year.toString();
        const imageUrl = data.imageUrl;
        const price = data.price.toString()

        await onEdit(productId, {
            brand,
            model,
            description,
            year: Number(year),
            imageUrl,
            price: Number(price)
        });
        ctx.page.redirect(`/details/${productId}`)
    }

}