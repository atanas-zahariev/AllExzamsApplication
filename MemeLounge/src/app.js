import page from '../node_modules/page/page.mjs'
import { render } from '../node_modules/lit-html/lit-html.js'

import { leyoutTemplate } from './view/layout.js'
import { getUser } from './utility.js'
import { homePage } from './view/home.js'
import { loginPage } from './view/login.js'
import { registerPage } from './view/register.js'
import { logout } from './api/data.js'
import { editPage } from './view/edit.js'
import { createPage } from './view/create.js'
import { detailsPage } from './view/details.js'
import { dashboardPage } from './view/dashboard.js'
import { profilePage } from './view/profile.js'

const main = document.querySelector('#container');

page('index.html', '/');
page(middleware);
page('/', homePage);
page('/login',loginPage);
page('/register',registerPage);
page('/logout',logoutAction);
page('/edit/:id',editPage);
page('/create',createPage);
page('/details/:id',detailsPage);
page('/dashboard',dashboardPage);
page('/profile',profilePage);


page.start()

function middleware(ctx, next) {
    ctx.render = renderView;
    ctx.notify = notify;

    next()
}

function renderView(content) {
    const user = getUser()
    render(leyoutTemplate(user, content), main)
}

function logoutAction(ctx){
    logout();
    ctx.page.redirect('/')
}


export function notify(msg){
    const element = document.getElementById('errorBox');
    const output = element.querySelector('span');

    output.textContent = msg;
    element.style.display = 'block'

    setTimeout(() => element.style.display = 'none',3000)
}

