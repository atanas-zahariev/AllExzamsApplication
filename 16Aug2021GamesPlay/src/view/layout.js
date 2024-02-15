import { html } from '../../node_modules/lit-html/lit-html.js'
// todo replace with actual layout..
export const leyoutTemplate = (user, content) => html`
<header>
<!-- Navigation -->
<h1><a class="home" href="/">GamesPlay</a></h1>
<nav>
    <a href="/dasboard">All games</a>
    <!-- Logged-in users -->
    ${user ? html`
    <div id="user">
      <a href="/create">Create Game</a>
      <a href="/logout">Logout</a>
    </div>`: html`
    <div id="guest">
      <a href="/login">Login</a>
      <a href="/register">Register</a>
    </div>`}  
</nav>
</header>
<main id="main-content">
   ${content}
</main>
`