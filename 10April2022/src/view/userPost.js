import { html } from '../../node_modules/lit-html/lit-html.js';
import { getUserPost } from '../api/data.js';
import { getUser } from '../utility.js';
  

const userPostTemplate = (posts) => html`
<section id="my-posts-page">
            <h1 class="title">My Posts</h1>

            <!-- Display a div with information about every post (if any)-->
            <div class="my-posts">
            ${posts.length == 0 ? html`
            <h1 class="title no-posts-title">You have no posts yet!</h1>`:
              posts.map( post => html `
              <div class="post">
              <h2 class="post-title">${post.title}</h2>
              <img class="post-image" src="${post.imageUrl}" alt="Material Image">
              <div class="btn-wrapper">
                  <a href="/details/${post._id}" class="details-btn btn">Details</a>
              </div>
             </div>`)}              
            </div>
        </section>`;


export async function userPostPage(ctx){
    const user = getUser();
    const userId = user._id;
   
    const posts = await getUserPost(userId);
    
    ctx.render(userPostTemplate(posts));
}