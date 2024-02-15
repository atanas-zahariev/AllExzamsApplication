import { html } from '../../node_modules/lit-html/lit-html.js'
// todo replace with actual layout..
export const leyoutTemplate = (user, content) => html`
<header>
<nav>
    <a href="/">Theater</a>
    <ul>
        ${user ? html `
        <li><a href="/profile">Profile</a></li>
        <li><a href="/create">Create Event</a></li>
        <li><a href="/logout">Logout</a></li>
        ` : html `
        <li><a href="/login">Login</a></li>
        <li><a href="/register">Register</a></li>
        `}       
    </ul>
</nav>
</header>
<main id="content">
   ${content}
</main>
<footer>
<div>© 2021
    <h3>JS Application</h3>
</div>
</footer>
`