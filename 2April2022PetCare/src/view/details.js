import { html } from '../../node_modules/lit-html/lit-html.js';
import { getSpecificDataWithId, getTotalDonation, getUserDonation, makeDonation, onDelete } from '../api/data.js';
import { getUser } from '../utility.js';


const detailsTemplate = (pet,deletePet,donatePet,totalDonation,isOwner,isDonate,user) => html`
<section id="detailsPage">
<div class="details">
    <div class="animalPic">
        <img src=${pet.image}>
    </div>
    <div>
        <div class="animalInfo">
            <h1>Name: ${pet.name}</h1>
            <h3>Breed: ${pet.breed}</h3>
            <h4>Age: ${pet.age}</h4>
            <h4>Weight: ${pet.weight}</h4>
            <h4 class="donation">Donation: ${totalDonation * 100}$</h4>
        </div>
        <!-- if there is no registered user, do not display div-->
        ${user ? html `
          <div class="actionBtn">
            <!-- Only for registered user and creator of the pets-->
            ${isOwner ? html `
            <a href="/edit/${pet._id}" class="edit">Edit</a>
            <a href="javascript:void(0)" class="remove" @click=${deletePet}>Delete</a>
            ` : null}
            
            <!--(Bonus Part) Only for no creator and user-->
            ${isDonate && !isOwner ? html `
            <a href="javascript:void(0)" class="donate" @click=${donatePet}>Donate</a>
            `: null}            
         </div>
        `: null}      
    </div>
</div>
</section>
`;

export async function detailsPage(ctx){
    const petId = ctx.params.id;
    const pet = await getSpecificDataWithId(petId);
    const ownerId = pet._ownerId;

    const totalDonation = await getTotalDonation(petId)

    const user = getUser();

    let isOwner;
    let isDonate;
    
    if(user){
        const userId = user._id;
        const userDonation = await getUserDonation(petId,userId);
        if(ownerId == userId){
            isOwner = true;
        }

        if(userDonation == 0){
          isDonate = true;
        }

    }

    ctx.render(detailsTemplate(pet,deletePet,donatePet,totalDonation,isOwner,isDonate,user))

    async function deletePet(){      
       const confirmed = confirm('are you shour')
       if (confirmed) {
           await onDelete(petId);
           ctx.page.redirect('/')
       }
    }

    async function donatePet(){
       await makeDonation(petId);
       detailsPage(ctx);       
    }

}