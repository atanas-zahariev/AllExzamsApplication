import { html } from '../../node_modules/lit-html/lit-html.js';
import { login } from '../api/data.js';
import { formHandller } from '../utility.js';

const loginTemplate = (onLogin) => html`
<section id="login-page" class="auth">
<form id="login" @submit=${onLogin}>
    <h1 class="title">Login</h1>

    <article class="input-group">
        <label for="login-email">Email: </label>
        <input type="email" id="login-email" name="email">
    </article>

    <article class="input-group">
        <label for="password">Password: </label>
        <input type="password" id="password" name="password">
    </article>

    <input type="submit" class="btn submit-btn" value="Log In">
</form>
</section>
`;

export function loginPage(ctx){
    ctx.render(loginTemplate(formHandller(onLogin)));

    async function onLogin(data,form){
      if(data.email == '' || data.password == ''){
          return alert('all fields required')
      }
      
      await login(data);
      form.reset();
      ctx.page.redirect('/dashboard')
    }

}
