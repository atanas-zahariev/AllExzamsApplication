import {render} from '../node_modules/lit-html/lit-html.js';
import page from '../node_modules/page/page.mjs';
import { get } from './api/api.js';

import { createPage } from './view/create.js';


import { showAlbums } from './view/dashboard.js';
import { detailsPage } from './view/details.js';
import { editPage } from './view/edit.js';
import { homePage } from './view/home.js';
import { loginPage } from './view/login.js';
import { registerPage } from './view/register.js';

const main = document.querySelector('main');


page(middleware);
page('/',homePage);
page('/dashboard',showAlbums);
page('/register',registerPage);
page('/login',loginPage);
page('/create',createPage);
page('/logout',onLogout);
page("/details/:id",detailsPage);
page("/edit/:id",editPage);

page.start();

updateNav();

function middleware(ctx,next){
    ctx.render = (content) => render(content,main);
    ctx.updateNav = updateNav;

    next()
}

function updateNav(){
    const user = JSON.parse(localStorage.getItem('user'));
    if(user){
        document.querySelector('.user').style.display = 'block'
        document.querySelector('.guest').style.display = 'none';
    }else{
        document.querySelector('.guest').style.display = 'block';
        document.querySelector('.user').style.display = 'none'
    }
}


export async function onLogout(ctx){
    await get('/users/logout');

    localStorage.removeItem('user');

    ctx.updateNav()

    ctx.page.redirect('/dashboard');
    
}



