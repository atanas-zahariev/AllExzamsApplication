import { html } from '../../node_modules/lit-html/lit-html.js'
import { getUser } from '../utility.js'
// todo replace with actual layout..
const user = getUser()
export const leyoutTemplate = (user, content) => html`
<header>
            <nav>
                <a class="active" href="/">Home</a>
                <a href="/dasboard">All Listings</a>
                <a href="/search">By Year</a>
                <!-- Guest users -->
                ${user ? html `
                <div id="profile">
                <a>Welcome ${user.username}</a>
                  <a href="/profile">My Listings</a>
                  <a href="/create">Create Listing</a>
                  <a href="/logout">Logout</a>
                </div>` :  html `
                <div id="guest">
                  <a href="/login">Login</a>
                  <a href="/register">Register</a>
                </div>`}
               
               
            </nav>
        </header>
<main id="site-content">
   ${content}
</main>
<footer>
 <p>&copy; All rights reserved</p>
</footer>
`;