import { html } from '../../node_modules/lit-html/lit-html.js';
import { getUserMemes } from '../api/data.js';
import { getUser } from '../utility.js';
  

const profileTemplate = (userMemes,memesTemplate,user) => html `
<section id="user-profile-page" class="user-profile">
<article class="user-info">
    <img id="user-avatar-url" alt="user-profile" src="/images/${user.gender}.png">
    <div class="user-content">
        <p>Username: ${user.username}</p>
        <p>Email: ${user.email}</p>
        <p>My memes count: ${userMemes.length}</p>
    </div>
</article>
<h1 id="user-listings-title">User Memes</h1>
<div class="user-meme-listings">
    ${userMemes.length == 0 ? html `
    <p class="no-memes">No memes in database.</p>
    ` : userMemes.map(memesTemplate)}
  
</div>
</section>
`

export async function profilePage(ctx){
    const user = getUser();
    const userId = user._id;
    const userMemes = await getUserMemes(userId)

    const memesTemplate = (meme) => html `
    <div class="user-meme">
        <p class="user-meme-title">${meme.title}</p>
        <img class="userProfileImage" alt="meme-img" src=${meme.imageUrl}>
        <a class="button" href="details/${meme._id}">Details</a>
    </div>
    `
    ctx.render(profileTemplate(userMemes,memesTemplate,user))
}