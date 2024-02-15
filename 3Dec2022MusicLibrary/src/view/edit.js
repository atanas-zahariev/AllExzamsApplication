import {html} from '../../node_modules/lit-html/lit-html.js';
import { getAlbumsDetails, onEdit } from '../api/data.js';

const editTemplate = (album,onSubmit) => html` 
<section id="edit">
<div class="form">
  <h2>Edit Album</h2>
  <form class="edit-form" @submit=${onSubmit}>
    <input type="text" name="singer" id="album-singer" placeholder="Singer/Band" value="${album.singer}" />
    <input type="text" name="album" id="album-album" placeholder="Album" value="${album.album}"/>
    <input type="text" name="imageUrl" id="album-img" placeholder="Image url" value="${album.imageUrl}"/>
    <input type="text" name="release" id="album-release" placeholder="Release date" value="${album.release}"/>
    <input type="text" name="label" id="album-label" placeholder="Label" value="${album.label}" />
    <input type="text" name="sales" id="album-sales" placeholder="Sales" value="${album.sales}"/>

    <button type="submit">post</button>
  </form>
</div>
</section>`

export async function editPage(ctx){
    const albumId = ctx.params.id;
    const album = await getAlbumsDetails(albumId);

    ctx.render(editTemplate(album,onSubmit))

    async function onSubmit(event){
      event.preventDefault()

      const myForm = new FormData(event.target);
      const data = Object.fromEntries(myForm.entries());

      if(Object.values(data).some(x => x == '')){
        return alert('all fields are required')
      }
      
      await onEdit(data,albumId);
      event.target.reset();
      ctx.page.redirect(`/details/${albumId}`)

    }
}