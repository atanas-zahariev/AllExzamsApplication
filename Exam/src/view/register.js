import { html } from '../../node_modules/lit-html/lit-html.js';
import { register } from '../api/data.js';
import { formHandller } from '../utility.js';

const registerTemplate = (onRegister) => html`
<section id="register">
<div class="form">
  <h2>Register</h2>
  <form class="register-form" @submit=${onRegister}>
    <input
      type="text"
      name="email"
      id="register-email"
      placeholder="email"
    />
    <input
      type="password"
      name="password"
      id="register-password"
      placeholder="password"
    />
    <input
      type="password"
      name="re-password"
      id="repeat-password"
      placeholder="repeat password"
    />
    <button type="submit">register</button>
    <p class="message">Already registered? <a href="/login">Login</a></p>
  </form>
</div>
</section>
`;

export function registerPage(ctx) {
  ctx.render(registerTemplate(formHandller(onRegister)));

  async function onRegister(data, form) {
    if (Object.values(data).some(x => x == '')) {
      return alert('all fields are required')
    };

    const email = data.email;
    const password = data.password;
    
    await register({email,password});
    form.reset();
    ctx.page.redirect('/')
  }

}