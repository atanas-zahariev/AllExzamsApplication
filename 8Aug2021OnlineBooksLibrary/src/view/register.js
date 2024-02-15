import { html } from '../../node_modules/lit-html/lit-html.js';
import { register } from '../api/data.js';
import { formHandller } from '../utility.js';

const registerTemplate = (onRegister) => html`
<section id="register-page" class="register">
<form id="register-form" action="" method="" @submit=${onRegister}>
    <fieldset>
        <legend>Register Form</legend>
        <p class="field">
            <label for="email">Email</label>
            <span class="input">
                <input type="text" name="email" id="email" placeholder="Email">
            </span>
        </p>
        <p class="field">
            <label for="password">Password</label>
            <span class="input">
                <input type="password" name="password" id="password" placeholder="Password">
            </span>
        </p>
        <p class="field">
            <label for="repeat-pass">Repeat Password</label>
            <span class="input">
                <input type="password" name="confirm-pass" id="repeat-pass" placeholder="Repeat Password">
            </span>
        </p>
        <input class="button submit" type="submit" value="Register">
    </fieldset>
</form>
</section>
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