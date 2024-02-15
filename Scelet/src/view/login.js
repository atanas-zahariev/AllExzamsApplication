import { html } from '../../node_modules/lit-html/lit-html.js';
import { login } from '../api/data.js';
import { formHandller } from '../utility.js';

const loginTemplate = () => html`

`;

export function loginPage(ctx){
    ctx.render(loginTemplate(formHandller(onLogin)));

    async function onLogin(data,form){
      if(Object.values(data).some(x => x == '')){
        return alert('all fields are requiered')
      }
      await login(data);
      form.reset();
      ctx.page.redirect('/')
    }

}
