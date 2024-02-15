import { html } from '../../node_modules/lit-html/lit-html.js'
// todo replace with actual layout..
export const leyoutTemplate = (user, content) => html`
<header id="site-header">
<!-- Navigation -->
<nav class="navbar">
    <section class="navbar-dashboard">
        <a href="/">Dashboard</a>
        ${user ? html`
        <div id="user">
            <span>Welcome, ${user.email}</span>
            <a class="button" href="/myBook">My Books</a>
            <a class="button" href="/create">Add Book</a>
            <a class="button" href="/logout">Logout</a>
        </div>`: html`
        <div id="guest">
            <a class="button" href="/login">Login</a>
            <a class="button" href="/register">Register</a>
        </div>
        `}             
    </section>
</nav>
</header>
<main id="site-content">
   ${content}
</main>
`