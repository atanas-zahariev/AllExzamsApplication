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
import { dashboardPage } from './view/dashboard.js'
import { detailsPage } from './view/details.js'
import { userPostPage } from './view/userPost.js'

const main = document.querySelector('#box');

page(middleware);
page('/index.html', '/');
page('/', homePage);
page('/login',loginPage);
page('/register',registerPage);
page('/logout',logoutAction);
page('/edit/:id',editPage);
page('/create',createPage);
page('/dashboard',dashboardPage);
page('/details/:id',detailsPage);
page('/post',userPostPage)


page.start()

function middleware(ctx, next) {
    ctx.render = renderView;

    next()
}

function renderView(content) {
    const user = getUser()
    render(leyoutTemplate(user, content), main)
}

function logoutAction(ctx){
    logout();
    ctx.page.redirect('/dashboard')
}

