import { html } from '../../node_modules/lit-html/lit-html.js';
import {  register } from '../api/data.js';
import { formHandller } from '../utility.js';

const registerTemplate = (onRegister) => html`
<section id="register-page" class="auth">
<form id="register" @submit=${onRegister}>
    <h1 class="title">Register</h1>

    <article class="input-group">
        <label for="register-email">Email: </label>
        <input type="email" id="register-email" name="email">
    </article>

    <article class="input-group">
        <label for="register-password">Password: </label>
        <input type="password" id="register-password" name="password">
    </article>

    <article class="input-group">
        <label for="repeat-password">Repeat Password: </label>
        <input type="password" id="repeat-password" name="repeatPassword">
    </article>

    <input type="submit" class="btn submit-btn" value="Register">
</form>
</section>
`;

export function registerPage(ctx){
    ctx.render(registerTemplate(formHandller(onRegister)));

    async function onRegister(data,form){
      const email = data.email;
      const password = data.password;
      const repeatPassword = data.repeatPassword;

      if(email == '' || password == '' || repeatPassword == ''){
        return alert('all fields required')
      }

      await register({email,password});
      form.reset();
      ctx.page.redirect('/dashboard')
    }

}