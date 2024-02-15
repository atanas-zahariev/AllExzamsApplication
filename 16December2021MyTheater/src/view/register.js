import { html } from '../../node_modules/lit-html/lit-html.js';
import { register } from '../api/data.js';
import { formHandller } from '../utility.js';

const registerTemplate = (onRegister) => html`
<section id="registerPage">
<form class="registerForm" @submit=${onRegister}>
    <h2>Register</h2>
    <div class="on-dark">
        <label for="email">Email:</label>
        <input id="email" name="email" type="text" placeholder="steven@abv.bg" value="">
    </div>

    <div class="on-dark">
        <label for="password">Password:</label>
        <input id="password" name="password" type="password" placeholder="********" value="">
    </div>

    <div class="on-dark">
        <label for="repeatPassword">Repeat Password:</label>
        <input id="repeatPassword" name="repeatPassword" type="password" placeholder="********" value="">
    </div>

    <button class="btn" type="submit">Register</button>

    <p class="field">
        <span>If you have profile click <a href="/login">here</a></span>
    </p>
</form>
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