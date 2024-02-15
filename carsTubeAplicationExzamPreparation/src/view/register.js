import { html } from '../../node_modules/lit-html/lit-html.js';
import { register } from '../api/data.js';
import { formHandller } from '../utility.js';

const registerTemplate = (onRegister) => html`
<section id="register">
<div class="container">
    <form id="register-form" @submit=${onRegister}>
        <h1>Register</h1>
        <p>Please fill in this form to create an account.</p>
        <hr>

        <p>Username</p>
        <input type="text" placeholder="Enter Username" name="username" required>

        <p>Password</p>
        <input type="password" placeholder="Enter Password" name="password" required>

        <p>Repeat Password</p>
        <input type="password" placeholder="Repeat Password" name="repeatPass" required>
        <hr>

        <input type="submit" class="registerbtn" value="Register">
    </form>
    <div class="signin">
        <p>Already have an account?
            <a href="/login">Sign in</a>.
        </p>
    </div>
</div>
</section>
`;

export function registerPage(ctx) {
  ctx.render(registerTemplate(formHandller(onRegister)));

  async function onRegister(data, form) {
    if (Object.values(data).some(x => x == '')) {
      return alert('all fields are required')
    };

    const username = data.username;
    const password = data.password;
    
    await register({username,password});
    form.reset();
    ctx.page.redirect('/dasboard');
  }

}