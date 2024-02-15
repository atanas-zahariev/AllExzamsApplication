import { html } from '../../node_modules/lit-html/lit-html.js';
import { getUserList } from '../api/data.js';
import { getUser } from '../utility.js';
  

const profileTemplate = (myList) => html `
<section id="my-listings">
<h1>My car listings</h1>
<div class="listings">
    ${myList.length == 0 ? html `
    <p class="no-cars"> You haven't listed any cars yet.</p>
    ` : myList.map(car => html`
    <div class="listing">
        <div class="preview">
            <img src=${car.imageUrl}>
        </div>
     <h2>${car.brand} ${car.model}</h2>
        <div class="info">
                <div class="data-info">
                    <h3>Year: ${car.year}</h3>
                    <h3>Price: ${car.price} $</h3>
                </div>
                <div class="data-buttons">
                    <a href="/details/${car._id}" class="button-carDetails">Details</a>
                </div>
         </div>
    </div>
    `)}  
</div>
</section>
`

export async function profilePage(ctx){
    const user = getUser();
    console.log(user);
    const userId = user._id;
    const myList = await getUserList(userId);
    
    ctx.render(profileTemplate(myList))
}