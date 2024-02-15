import { html } from '../../node_modules/lit-html/lit-html.js';
import { getSpecificDataWithId, onEdit } from '../api/data.js';
import { formHandller } from '../utility.js';
 
const editTemplate = (edit,product) => html`
<section class="editPage">
<form @submit=${edit}>
    <fieldset>
        <legend>Edit Album</legend>

        <div class="container">
            <label for="name" class="vhide">Album name</label>
            <input id="name" name="name" class="name" type="text" value="${product.name}">

            <label for="imgUrl" class="vhide">Image Url</label>
            <input id="imgUrl" name="imgUrl" class="imgUrl" type="text" value="${product.imgUrl}">

            <label for="price" class="vhide">Price</label>
            <input id="price" name="price" class="price" type="text" value="${product.price}">

            <label for="releaseDate" class="vhide">Release date</label>
            <input id="releaseDate" name="releaseDate" class="releaseDate" type="text" value="${product.releaseDate}">

            <label for="artist" class="vhide">Artist</label>
            <input id="artist" name="artist" class="artist" type="text" value="${product.artist}">

            <label for="genre" class="vhide">Genre</label>
            <input id="genre" name="genre" class="genre" type="text" value="${product.genre}">

            <label for="description" class="vhide">Description</label>
            <textarea name="description" class="description" rows="10"
                cols="10" .value="${product.description}"></textarea>

            <button class="edit-album" type="submit">Edit Album</button>
        </div>
    </fieldset>
</form>
</section>
`

export async function editPage(ctx){
    const productId = ctx.params.id;
    const product = await getSpecificDataWithId(productId);


    ctx.render(editTemplate(formHandller(edit),product))

    async function edit(data){
        if(Object.values(data).some(x => x == '')){
            return alert('all fields required')
        }

        await onEdit(productId,data);
        ctx.page.redirect(`/details/${productId}`)
    }

}