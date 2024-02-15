import { html } from '../../node_modules/lit-html/lit-html.js';
import { searchAlbums } from '../api/data.js';
import { getUser } from '../utility.js';


const searchTemplate = (onSearch,albums,user) => html`
<section id="searchPage">
<h1>Search by Name</h1>

<div class="search">
    <input id="search-input" type="text" name="search" placeholder="Enter desired albums's name">
    <button class="button-list" @click=${onSearch}>Search</button>
</div>

<h2>Results:</h2>

<!--Show after click Search button-->
<div class="search-result">
    <!--If have matches-->
    ${albums && albums.length == 0 ? html `
    <p class="no-result">No result.</p>
    ` : albums.map(album => html `
    <div class="card-box">
    <img src=${album.imgUrl}>
        <div>
            <div class="text-center">
                <p class="name">Name: ${album.name}</p>
                <p class="artist">Artist: ${album.artist}</p>
                <p class="genre">Genre: ${album.genre}</p>
                <p class="price">Price: $${album.price}</p>
                <p class="date">Release Date: ${album.releaseDate}</p>
            </div>
            ${user ? html `
            <div class="btn-group">
              <a href="/details/${album._id}" id="details">Details</a>
            </div>
            ` : null}            
        </div>
    </div>
    `)}
    
</div>
</section>
`

export async function searchPage(ctx) {
    let albums = [];
    let user;
    ctx.render(searchTemplate(onSearch,albums,user));

    document.querySelector('.search-result').style.display = 'none';

    async function onSearch() {

        const query = document.querySelector('#search-input').value;
        if (query == '') {
            return alert('write sommething')
        }

         user = getUser()
         albums = await searchAlbums(query);
         console.log(albums);
        document.querySelector('.search-result').style.display = ''

        ctx.render(searchTemplate(onSearch,albums,user));
    }

}