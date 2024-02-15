import { html } from '../../node_modules/lit-html/lit-html.js';


const homeTemplate = () => html`
  <h1>Hello World<h1>
`

export function homePage(ctx){
    ctx.render(homeTemplate())
}