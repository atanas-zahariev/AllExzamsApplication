import { login } from './data/data.js';
import { showHome } from './home.js';
import { formHandlle } from './data/handleForm.js';

const loginSection = document.getElementById('login');

const loginForm = loginSection.querySelector('#login-form');
formHandlle(loginForm,onLogin)

let context = null;

export function showLogin(newContext) {
    document.querySelector('main').replaceChildren(loginSection);

    context = newContext;
}

async function onLogin(data) {
    const {email,password} = data;

    await login(email, password );

    loginForm.reset();

    context.showView('home-link')
}