import { html } from '../../node_modules/lit-html/lit-html.js';
import { addInSystem} from '../api/data.js';
import { formHandller } from '../utility.js';
 
const createTemplate = (onCreate) => html`
`

        export function createPage(ctx){
            ctx.render(createTemplate(formHandller(onCreate)))

            async function onCreate(data){
                if(Object.values(data).some(x => x == '')){
                    return alert('all fields are required')
                }

                await addInSystem(data);
                ctx.page.redirect('/dashboard')
            }
        }