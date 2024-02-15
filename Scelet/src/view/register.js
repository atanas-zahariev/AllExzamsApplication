import { html } from '../../node_modules/lit-html/lit-html.js';
import { register } from '../api/data.js';
import { formHandller } from '../utility.js';

const registerTemplate = () => html`

`;

export function registerPage(ctx) {
  ctx.render(registerTemplate(formHandller(onRegister)));

  async function onRegister(data, form) {
    if (Object.values(data).some(x => x == '')) {
      return alert('all fields are required')
    };
    
    await register(data);
    form.reset();
    ctx.page.redirect('/')
  }

}