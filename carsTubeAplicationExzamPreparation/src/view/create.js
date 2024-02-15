import { html } from '../../node_modules/lit-html/lit-html.js';
import { addInSystem} from '../api/data.js';
import { formHandller } from '../utility.js';
 
const createTemplate = (onCreate) => html`
<section id="create-listing">
            <div class="container">
                <form id="create-form" @submit=${onCreate}>
                    <h1>Create Car Listing</h1>
                    <p>Please fill in this form to create an listing.</p>
                    <hr>

                    <p>Car Brand</p>
                    <input type="text" placeholder="Enter Car Brand" name="brand">

                    <p>Car Model</p>
                    <input type="text" placeholder="Enter Car Model" name="model">

                    <p>Description</p>
                    <input type="text" placeholder="Enter Description" name="description">

                    <p>Car Year</p>
                    <input type="number" placeholder="Enter Car Year" name="year">

                    <p>Car Image</p>
                    <input type="text" placeholder="Enter Car Image" name="imageUrl">

                    <p>Car Price</p>
                    <input type="number" placeholder="Enter Car Price" name="price">

                    <hr>
                    <input type="submit" class="registerbtn" value="Create Listing">
                </form>
            </div>
        </section>
`

        export function createPage(ctx){
            ctx.render(createTemplate(formHandller(onCreate)))

            async function onCreate(data){
                if(Object.values(data).some(x => x == '')){
                    return alert('all fields are required')
                }
                if(Number(data.price) < 0 || Number(data.year < 0)){
                    return alert('year and price must be positive number')
                } 
                const brand = data.brand;
                const model = data.model;
                const description = data.description;
                const year = data.year.toString();
                const imageUrl = data.imageUrl;
                const price = data.price.toString()              

                await addInSystem({
                    brand,
                    model,
                    description,
                    year:Number(year),
                    imageUrl,
                    price:Number(price)
                });
                ctx.page.redirect('/dasboard')
            }
        }