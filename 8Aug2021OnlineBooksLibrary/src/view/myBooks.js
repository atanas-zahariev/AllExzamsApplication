import { html,render} from '../../node_modules/lit-html/lit-html.js';
import { toGetMyBooks } from '../api/data.js';
import { getUser } from '../utility.js';
  

const myBooksTemplate = (myBooks) => html `
<section id="my-books-page" class="my-books">
<h1>My Books</h1>
 ${myBooks.length == 0 ? html ` 
 <p class="no-books">No books in database!</p>
 ` : html `
 <ul class="my-books-list">
    ${ myBooks.map(b => 
        html `
        <li class="otherBooks">
        <h3>${b.title}</h3>
        <p>Type: ${b.type}</p>
        <p class="img"><img src=${b.imageUrl}></p>
        <a class="button" href="/details/${b._id}">Details</a>
         </li> `)}
 </ul>`}
</section>
`

export async function myBooksPage(ctx){
    const user = await getUser();
    const userId = user._id
    
    const myBooks = await toGetMyBooks(userId);
   
    ctx.render(myBooksTemplate(myBooks))
}