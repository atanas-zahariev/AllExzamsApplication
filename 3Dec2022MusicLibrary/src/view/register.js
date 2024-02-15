import {html} from '../../node_modules/lit-html/lit-html.js';
import { onRegister } from '../api/data.js';


const registerTemplate = (onSubmit) => html`<section id="register">
<div class="form">
  <h2>Register</h2>
  <form class="login-form" @submit=${onSubmit}>
    <input type="text" name="email" id="register-email" placeholder="email" />
    <input type="password" name="password" id="register-password" placeholder="password" />
    <input type="password" name="re-password" id="repeat-password" placeholder="repeat password" />
    <button type="submit">register</button>
    <p class="message">Already registered? <a href="/login">Login</a></p>
  </form>
</div>
</section>`

export function registerPage(ctx){
    ctx.render(registerTemplate(onSubmit))

    async function onSubmit(event){
      event.preventDefault();

      const myForm = new FormData(event.target);
      const data = Object.fromEntries(myForm.entries());
      const email = data.email;
      const password = data.password;
      const rePass = data['re-password']

       
      if(email == '' || password == ''){
        return alert('all fields are required!')
      }

      if(password != rePass){
        return alert("Password don't match")
      }

      const result = await onRegister({email,password});
      event.target.reset();
      localStorage.setItem('user',JSON.stringify(result));
      ctx.updateNav();
      ctx.page.redirect('/dashboard');
    }
};

