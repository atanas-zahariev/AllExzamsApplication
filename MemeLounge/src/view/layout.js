import { html } from '../../node_modules/lit-html/lit-html.js'
// todo replace with actual layout..
export const leyoutTemplate = (user, content) => html`
<section id="notifications">
<div id="errorBox" class="notification">
    <span>MESSAGE</span>
</div>
</section>

<nav>
<a href="/dashboard">All Memes</a>
 ${user ? html `
 <div class="user">
    <a href="/create">Create Meme</a>
    <div class="profile">
        <span>Welcome, ${user.email}</span>
        <a href="/profile">My Profile</a>
        <a href="/logout">Logout</a>
    </div>
</div>` : html `
<div class="guest">
    <div class="profile">
        <a href="/login">Login</a>
        <a href="/register">Register</a>
    </div>
    <a class="active" href="/">Home Page</a>
</div>`}
</nav>
<main>
   ${content}
</main>
<footer class="footer">
   <p>Created by SoftUni Delivery Team</p>
</footer>
`