import { html } from '../../node_modules/lit-html/lit-html.js';
import { register } from '../api/data.js';
import { notify } from '../app.js';
import { formHandller } from '../utility.js';

const registerTemplate = (onRegister) => html`
<section id="register">
<form id="register-form" @submit=${onRegister}>
    <div class="container">
        <h1>Register</h1>
        <label for="username">Username</label>
        <input id="username" type="text" placeholder="Enter Username" name="username">
        <label for="email">Email</label>
        <input id="email" type="text" placeholder="Enter Email" name="email">
        <label for="password">Password</label>
        <input id="password" type="password" placeholder="Enter Password" name="password">
        <label for="repeatPass">Repeat Password</label>
        <input id="repeatPass" type="password" placeholder="Repeat Password" name="repeatPass">
        <div class="gender">
            <input type="radio" name="gender" id="female" value="female">
            <label for="female">Female</label>
            <input type="radio" name="gender" id="male" value="male" checked>
            <label for="male">Male</label>
        </div>
        <input type="submit" class="registerbtn button" value="Register">
        <div class="container signin">
            <p>Already have an account?<a href="#">Sign in</a>.</p>
        </div>
    </div>
</form>
</section>
`;

export function registerPage(ctx) {
  ctx.render(registerTemplate(formHandller(onRegister)));

  async function onRegister(data, form) {
    if (Object.values(data).some(x => x == '')) {
      return notify('all fields are required')
    };
    const username = data.username;
    const email = data.email;
    const password = data.password;
    const gender = data.gender;
    
    await register({username,email,password,gender});
    form.reset();
    ctx.page.redirect('/dashboard')
  }

}