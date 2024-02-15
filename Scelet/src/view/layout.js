import { html } from '../../node_modules/lit-html/lit-html.js'
// todo replace with actual layout..
export const leyoutTemplate = (user, content) => html`
<nav>
   ${user ? html`
   ` : html`
   `}
</nav>
<main>
   ${content}
</main>
`