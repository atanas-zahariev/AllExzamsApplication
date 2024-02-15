import { html } from '../../node_modules/lit-html/lit-html.js'
import { getProfileTheaters } from '../api/data.js';
import { getUser } from '../utility.js';
  

const profileTemplate = (userList,user) => html`
<section id="profilePage">
<div class="userInfo">
    <div class="avatar">
        <img src="./images/profilePic.png">
    </div>
    <h2>${user.email}</h2>
</div>
<div class="board">
    ${userList.length > 0 ? userList.map(theater => html`
    <div class="eventBoard">
        <div class="event-info">
            <img src=${theater.imageUrl}>
            <h2>${theater.title}</h2>
            <h6>${theater.date}</h6>
            <a href="/details/${theater._id}" class="details-button">Details</a>
        </div>
    </div>
    `) : html `
        <div class="no-events">
            <p>This user has no events yet!</p>
        </div>
    `}     
</div>
</section>
`



export async function profilePage(ctx){
    const user = getUser();
    const userId = user._id;
    const userList = await getProfileTheaters(userId);
    
    ctx.render(profileTemplate(userList,user));
}