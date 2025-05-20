import spriteUrl from '/img/sprite.svg';

// === api ===
import axios from 'axios';

async function getArtistsData(pg = 1) {
  axios.defaults.baseURL = 'https://sound-wave.b.goit.study/api';
  try {
    const response = await axios.get('/artists', {
      params: {
        limit: 8,
        page: pg ? pg : 1,
      },
    });

    return response.data;
  } catch (error) {
    console.log(error.message);
    return null;
  }
}

async function getArtistById(id = '') {
  axios.defaults.baseURL = 'https://sound-wave.b.goit.study/api/artists';
  try {
    const response = await axios.get(id);
    return response.data;
  } catch (error) {
    console.log(error.message);
    return null;
  }
}

// === main ===

const NO_BIO = `Sorry there is no information about biography`;
const NO_GENRES = `mix`;
const NO_INFO = '-';
const You_Tube_Btn = `<svg class="artist-backdrop-youTube-icon" width="24" height="24">

      <use href="${spriteUrl}#icon-youtube"></use>
    </svg>`;
const NO_ALBUMS = 'No albums found';

const refs = {
  artistsListEl: document.querySelector('.js-artists-list'),
  artistsLoaderEl: document.querySelector('.artist-loader.loader'),
  artistsLoadMoreBtnEl: document.querySelector('.js-load-more-btn'),
  artistModalEl: document.querySelector('.js-artist-modal'),
};

document.addEventListener('DOMContentLoaded', handlePageFirstArtistsLoad);
refs.artistsLoadMoreBtnEl.addEventListener('click', handleLoadMoreArtistBtn);
refs.artistsListEl.addEventListener('click', handleLearnMoreBtnOnArtistList);
document.addEventListener('keydown', onEscKeyPress);
refs.artistModalEl.addEventListener('click', onBackdropClick);

async function handlePageFirstArtistsLoad() {
  showArtistLoader();
  try {
    const response = await getArtistsData();
    if (!response) {
      showErrorMessage('Network error. Please check your internet connection.');
      return;
    }

    const { artists, totalArtists } = response;
    renderArtistList(artists);
    paginator.setTotal(totalArtists);
  } catch (error) {
    console.log(error.message);
    showErrorMessage('Something went wrong');
  } finally {
    hideArtistLoader();
  }
}

async function handleLoadMoreArtistBtn() {
  showArtistLoader();
  lockLoadMoreBtn();

  try {
    paginator.setNewPage();
    const newPage = paginator.getPage();
    if (!paginator.isArtistLeft()) {
      showErrorMessage('No more artists');
      hideArtistLoader();
      hideLoadMoreBtn();
      return;
    }

    const response = await getArtistsData(newPage);
    if (!response) {
      showErrorMessage('Network error. Please check your internet connection.');
      return;
    }

    renderArtistList(response.artists);
  } catch (error) {
    console.log(error);
    showErrorMessage('Something went wrong');
  } finally {
    hideArtistLoader();
    unlockLoadMoreBtn();
  }
}

async function handleLearnMoreBtnOnArtistList(e) {
  const learnMoreBtn = e.target.closest('.js-learn-more-btn');
  if (e.target.nodeName !== 'BUTTON' || !learnMoreBtn) {
    return;
  }

  showArtistModalLoader();
  learnMoreBtn.disabled = true;
  learnMoreBtn.classList.add('is-disabled');
  try {
    const artistId = e.target.closest('.artists-list-item').id;
    const genres = e.target
      .closest('.artists-list-item')
      .children[1].outerText.split('\n');

    const artist = await getArtistById(artistId);
    if (!artist) {
      hideArtistModalLoader();
      showErrorMessage('Network error. Please check your internet connection.');
      return;
    }

    openArtistModal();
    renderSingleArtistModalCard(artist, genres);
  } catch (error) {
    console.log(error.message);
  } finally {
    learnMoreBtn.classList.remove('is-disabled');
    learnMoreBtn.disabled = false;
  }
}

// === errorMSg ===
function showErrorMessage(msg) {
  refs.artistsListEl.innerHTML = `<li class="error-msg">${msg}</li>`;
}

// === lock/unlock load more btn ===

function lockLoadMoreBtn() {
  refs.artistsLoadMoreBtnEl.disabled = true;
  refs.artistsLoadMoreBtnEl.classList.add('is-disabled');
}

function unlockLoadMoreBtn() {
  refs.artistsLoadMoreBtnEl.classList.remove('is-disabled');
  refs.artistsLoadMoreBtnEl.disabled = false;
}

function hideLoadMoreBtn() {
  refs.artistsLoadMoreBtnEl.style.display = 'none';
}

// === artist list markup ===

function renderArtistList(array = []) {
  if (!array || array.length === 0) return;
  refs.artistsListEl.insertAdjacentHTML('beforeend', createArtistList(array));
}

function createArtistList(array = []) {
  return array.map(createArtistMarkup).join('');
}

function createArtistMarkup(obj = {}) {
  const { genres = [], strArtist, strArtistThumb, strBiographyEN, _id } = obj;

  const img = checkIfArtistHasImg(strArtistThumb, strArtist);

  const genresMarkup = checkIfArtistHasGenres(genres);

  return `<li class="artists-list-item" id=${_id}>
  <div class="artist-item-img-wrapper">${img}</div>
            <ul class="artist-item-tags-list">
            ${genresMarkup}
            </ul>
            <div class="artist-bio-wrapper"><h3 class="artist-info-name">${strArtist}</h3>
              <p class="artist-info-bio">${strBiographyEN || NO_BIO}</p></div>
            <button
              type="button"
              class="artists-learn-more-btn js-learn-more-btn"
            >
              Learn More
              <svg class="learn-more-svg" width="8" height="15">

                <use href="${spriteUrl}#icon-learn-more"></use>

              </svg>
            </button>
          </li>
        </ul>`;
}

function checkIfArtistHasGenres(genres = []) {
  if (genres.length === 0) {
    return `<li class="artist-tags-genres">${NO_GENRES}</li>`;
  }

  const uniqueTags = [
    ...new Set(genres.flatMap(g => g.split('/').map(tag => tag.trim()))),
  ];

  return uniqueTags
    .map(genre => {
      return `<li class="artist-tags-genres">${genre}</li>`;
    })
    .join('');
}

function checkIfArtistHasImg(link = '', name) {
  if (!link) {
    return `<div class="artist-placeholder">
  <span>${name || 'Artist'}</span>
</div>`;
  }

  return `<img class="artists-list-item-img" src=${link} alt="${
    name || 'Artist'
  }"/>`;
}

function renderModalImg(link = '', name) {
  if (!link) {
    return `<div class="artist-placeholder">
  <span>${name || 'Artist'}</span>
</div>`;
  }

  return `<img class="art-mod-img" src=${link} alt="${name || 'Artist'}"/>`;
}

// === pagination ===

const paginator = {
  page: 1,
  totalArtists: null,
  limit: 8,

  getPage() {
    return this.page;
  },

  setNewPage() {
    this.page += 1;
  },

  setTotal(total) {
    this.totalArtists = total;
  },

  isArtistLeft() {
    return this.totalArtists > this.page * this.limit;
  },

  reset() {
    this.page = 1;
    this.totalArtists = null;
    this.limit = 8;
  },
};

// === loaders ===

function showArtistLoader() {
  refs.artistsLoaderEl.style.display = 'block';
}

function hideArtistLoader() {
  refs.artistsLoaderEl.style.display = 'none';
}

function showArtistModalLoader() {
  const loader = `<div class="modal-loader-container"><span class="artist-modal-loader loader"></span></div>`;
  if (!document.querySelector('.modal-loader-container')) {
    document.body.insertAdjacentHTML('beforeend', loader);
  }
}

function hideArtistModalLoader() {
  const loader = document.querySelector('.modal-loader-container');
  if (loader) {
    loader.remove();
  }
  refs.artistModalEl.innerHTML = '';
}

// === open/close modal ===

function openArtistModal() {
  hideArtistModalLoader();
  refs.artistModalEl.classList.add('artist-is-open');
  document.body.classList.add('modal-open');
}

function closeArtistModal() {
  refs.artistModalEl.classList.remove('artist-is-open');
  document.body.classList.remove('modal-open');
  deleteSingleArtistModalCard();
}

function onEscKeyPress(e) {
  if (e.key === 'Escape') {
    closeArtistModal();
  }
}

function onBackdropClick(e) {
  const modalCloseBtn = e.target.closest('.artist-modal-backdrop-close-btn');
  if (e.target === e.currentTarget || modalCloseBtn) {
    closeArtistModal();
  }
}

// === render artist by id ===

function deleteSingleArtistModalCard() {
  refs.artistModalEl.innerHTML = '';
}

function renderSingleArtistModalCard(artist = {}, genres = []) {
  refs.artistModalEl.insertAdjacentHTML(
    'beforeend',
    createSingleArtistMarkup(artist, genres)
  );
}

function createSingleArtistMarkup(obj = {}, array = []) {
  const {
    strArtistThumb,
    strArtist,
    intFormedYear,
    intDiedYear,
    strGender,
    intMembers,
    strCountry,
    strBiographyEN,
    tracksList = [],
  } = obj;

  const genresMarkup = checkIfArtistHasGenres(array);
  const albumsMarkup = createArtistAlbums(tracksList);
  const imgMarkup = renderModalImg(strArtistThumb, strArtist);

  return `
  <div class="artist-modal-container">
  <button type="button" class="artist-modal-backdrop-close-btn">
    <svg class="artist-backdrop-close-icon" width="32" height="32">

      <use href="${spriteUrl}#icon-x-close"></use>

    </svg>
  </button>
  <p class="artist-modal-title">${strArtist || 'Artist'}</p>
  <div class="artist-modal-about-wrapper">
  <div class="artist-modal-img-wrapper">${imgMarkup}</div>
    <div class="artist-modal-info-wrapper">
      <ul class="art-mod-years-sex">
        <li class="art-mod-years">
          Years active
          <p>${Number(intFormedYear) > 0 ? intFormedYear + ' - ' : NO_INFO}
          ${intDiedYear || 'present'}</p>
        </li>
        <li class="art-mod-sex">
          Sex
          <p>${strGender || NO_INFO}</p>
        </li>
      </ul>
      <ul class="art-mod-members-country">
        <li class="art-mod-members">
          Members
          <p>${intMembers || NO_INFO}</p>
        </li>
        <li class="art-mod-country">
          Country
          <p>${strCountry || NO_INFO}</p>
        </li>
      </ul>
      <h3 class="art-mod-biography">
          Biography
          <p class="bio-text">${strBiographyEN || NO_BIO}</p>
      </h3>
      <ul class="artist-item-tags-list">${genresMarkup}</ul>
      </div>
    </div>
    <div class="modal-artist-albums-wrapper">
      <p class="modal-artist-albums-title">Albums</p>
      <ul class="modal-artist-albums-list">${albumsMarkup}</ul>
    </div>
    </div>`;
}

function createArtistAlbums(array = []) {
  if (array.length === 0) {
    return `<li class=no-alb-found>${NO_ALBUMS}</li>`;
  }
  const markup = [];

  const albumsList = array.reduce((res, track) => {
    if (!res.includes(track.strAlbum)) {
      res.push(track.strAlbum);
    }
    return res;
  }, []);

  for (const title of albumsList) {
    const songs = array
      .filter(track => track.strAlbum === title)
      .map(createAlbumSongsList)
      .join('');

    markup.push(
      `<li class="modal-artist-albums-item">
      <p class="alb-list-title">${title}</p>
      <div class="table-scroll-wrapper">
      <table class="single-album-table">
        <thead>
          <tr class="album-head">
            <th>Track</th>
            <th>Time</th>
            <th>Link</th>
          </tr>
        </thead>
        <tbody class="album-table-body">${songs}</tbody>
      </table>
      </div>
    </li>`
    );
  }

  return markup.join('');
}

function createAlbumSongsList(obj = {}) {
  const { intDuration, movie, strTrack, _id } = obj;

  const time = formatDuration(intDuration);

  return `<tr class="table-songs" id=${_id}>
            <td>${strTrack}</td>
            <td>${time || NO_INFO}</td>
            <td><a href="${movie || '#'}" target="_blank">${
    movie ? You_Tube_Btn : ''
  }</a></td>
          </tr>`;
}

function formatDuration(ms) {
  const time = Number(ms);
  if (!time || time <= 0) {
    return '0:00';
  }

  const totalSeconds = Math.floor(time / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}
