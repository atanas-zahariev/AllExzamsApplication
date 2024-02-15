import { html } from '../../node_modules/lit-html/lit-html.js'
// todo replace with actual layout..
export const leyoutTemplate = (user, content) => html`
       <header>
            <!-- Navigation -->
            <h1><a href="/">Orphelp</a></h1>
            <nav>
                <a href="/dashboard">Dashboard</a>
                ${user ? html`
                <div id="user">
                <a href="/post">My Posts</a>
                <a href="/create">Create Post</a>
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