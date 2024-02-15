import { html } from '../../node_modules/lit-html/lit-html.js';
import { getAllDataInSystem } from '../api/data.js';


const dashboardTemplate = (offers) => html`
`;

export async function dashboardPage(ctx){
    const offers = await getAllDataInSystem();
   
    ctx.render(dashboardTemplate(offers))
}