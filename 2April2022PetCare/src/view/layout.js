import { html } from '../../node_modules/lit-html/lit-html.js'
// todo replace with actual layout...
export const leyoutTemplate = (user, content) => html`
<header>
<nav>
    <section class="logo">
        <img src="./images/logo.png" alt="logo">
    </section>
    <ul>
        <!--Users and Guest-->
        <li><a href="/">Home</a></li>
        <li><a href="/dashboard">Dashboard</a></li>
        ${user ? html`
        <li><a href="/create">Create Postcard</a></li>
        <li><a href="/logout">Logout</a></li>`:
      html`
      <li><a href="/login">Login</a></li>
        <li><a href="/register">Register</a></li>`}       
       
    </ul>
</nav>
</header>
<main id="content">
   ${content}
</main>
`;