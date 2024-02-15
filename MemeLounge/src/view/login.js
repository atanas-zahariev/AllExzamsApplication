import { html } from '../../node_modules/lit-html/lit-html.js';
import { login } from '../api/data.js';
import { notify } from '../app.js';
import { formHandller } from '../utility.js';

const loginTemplate = (onLogin) => html`
<section id="login">
<form id="login-form" @submit=${onLogin}>
    <div class="container">
        <h1>Login</h1>
        <label for="email">Email</label>
        <input id="email" placeholder="Enter Email" name="email" type="text">
        <label for="password">Password</label>
        <input id="password" type="password" placeholder="Enter Password" name="password">
        <input type="submit" class="registerbtn button" value="Login">
        <div class="container signin">
            <p>Dont have an account?<a href="#">Sign up</a>.</p>
        </div>
    </div>
</form>
</section>
`;

export function loginPage(ctx){
    ctx.render(loginTemplate(formHandller(onLogin)));

    async function onLogin(data,form){
      if(Object.values(data).some(x => x == '')){
        return notify('all fields are requiered')
      }
      await login(data);
      form.reset();
      ctx.page.redirect('/dashboard')
    }

}
