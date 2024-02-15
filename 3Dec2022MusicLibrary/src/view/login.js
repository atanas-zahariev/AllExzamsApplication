import {html} from '../../node_modules/lit-html/lit-html.js';
import { onLogin } from '../api/data.js';

const loginTemplate = (onSubmit) => html`<section id="login">
<div class="form">
  <h2>Login</h2>
  <form class="login-form" @submit=${onSubmit}>
    <input type="text" name="email" id="email" placeholder="email" />
    <input type="password" name="password" id="password" placeholder="password" />
    <button type="submit">login</button>
    <p class="message">
      Not registered? <a href="/register">Create an account</a>
    </p>
  </form>
</div>
</section>`

export function loginPage(ctx){
    ctx.render(loginTemplate(onSubmit));

    async function onSubmit(event){
      event.preventDefault();

      const myForm = new FormData(event.target);
      const data = Object.fromEntries(myForm.entries());
       
      if(data.email == '' || data.password == ''){
        return alert('all fields are required!')
      }

      const result = await onLogin(data);
      event.target.reset();
      localStorage.setItem('user',JSON.stringify(result));
      ctx.updateNav();
      ctx.page.redirect('/dashboard');
    }
}