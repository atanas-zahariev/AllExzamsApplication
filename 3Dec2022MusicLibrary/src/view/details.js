import { html } from '../../node_modules/lit-html/lit-html.js';
import { addLike, getAlbumsDetails, getOwnLike, getTotalLikes, onDelete} from '../api/data.js';

const detailsTemplate = (album, totalLikes, isOwner, albumId, itsLiked, renderLike,deleteAlbum) => html`
<section id="details">
<div id="details-wrapper">
  <p id="details-title">Album Details</p>
  <div id="img-wrapper">
    <img src="${album.imageUrl}" alt="example1" />
  </div>
  <div id="info-wrapper">
    <p><strong>Band:</strong><span id="details-singer">${album.singer}</span></p>
    <p>
      <strong>Album name:</strong><span id="details-album">${album.album}</span>
    </p>
    <p><strong>Release date:</strong><span id="details-release">${album.release}</span></p>
    <p><strong>Label:</strong><span id="details-label">${album.label}</span></p>
    <p><strong>Sales:</strong><span id="details-sales">${album.sales}</span></p>
  </div>
  <div id="likes">Likes: <span id="likes-count">${totalLikes}</span></div>
  <!--Edit and Delete are only for creator-->
  <div id="action-buttons">
  ${isOwner ?
    html`
    <a href="/edit/${albumId}" id="edit-btn">Edit</a>
    <a href="javascript:void(0)" id="delete-btn"  @click=${deleteAlbum}>Delete</a>`
    : ''
  }
  ${renderLike(itsLiked)}      
  </div>
</div>
</section>`

export async function detailsPage(ctx) {
  const albumId = ctx.params.id;
  const user = JSON.parse(localStorage.getItem('user'));
  const album = await getAlbumsDetails(albumId);
  const totalLikes = await getTotalLikes(albumId);

  let itsLiked;

  if (user != null) {
    const ownLike = await getOwnLike(albumId, user._id);
    itsLiked = ownLike;
  }

  const isOwner = user != null && album._ownerId == user._id;

  function renderLike(ownLike) {
    if (ownLike == 0) {
      if (!isOwner) {
        return html`<a href="javascript:void(0)" id="like-btn" @click=${userLike}>Like</a>`
      } else {
        return ''
      }
    }
  }

  ctx.render(detailsTemplate(album, totalLikes, isOwner, albumId, itsLiked, renderLike,deleteAlbum));

  async function userLike() {
    await addLike({ albumId });
    detailsPage(ctx)
  }

  async function deleteAlbum() {
    const confirmed  =  confirm('are you shour')
    if(confirmed){
      await onDelete(albumId);  
      ctx.page.redirect('/dashboard')
    }
  }
}

