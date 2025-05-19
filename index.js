import{a as S,S as F,N as _}from"./assets/vendor-BQQhhK1p.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const o of s)if(o.type==="childList")for(const m of o.addedNodes)m.tagName==="LINK"&&m.rel==="modulepreload"&&r(m)}).observe(document,{childList:!0,subtree:!0});function i(s){const o={};return s.integrity&&(o.integrity=s.integrity),s.referrerPolicy&&(o.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?o.credentials="include":s.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function r(s){if(s.ep)return;s.ep=!0;const o=i(s);fetch(s.href,o)}})();const R=document.querySelector(".header-burger-btn"),x=document.querySelector(".header-mobile-menu"),U=document.querySelector(".header-mobile-menu-close");R.addEventListener("click",()=>{x.classList.add("is-open")});U.addEventListener("click",()=>{x.classList.remove("is-open")});const V=document.querySelectorAll(".mobile-menu-link");V.forEach(t=>{t.addEventListener("click",()=>{x.classList.remove("is-open")})});async function N(t=1){S.defaults.baseURL="https://sound-wave.b.goit.study/api";try{return(await S.get("/artists",{params:{limit:8,page:t||1}})).data}catch(e){return console.log(e.message),null}}async function Y(t=""){S.defaults.baseURL="https://sound-wave.b.goit.study/api/artists";try{return(await S.get(t)).data}catch(e){return console.log(e.message),null}}const B=`Lorem ipsum dolor sit amet consectetur adipisicing elit. At, nemo aperiam? Possimus quibusdam velit molestias minus minima illo corporis labore aut recusandae facilis, sapiente repellendus ad voluptatum voluptatibus ducimus ipsa?
Sunt provident, eveniet architecto quaerat fugiat commodi id aut ad tempore nobis pariatur vitae recusandae dolore beatae incidunt consequuntur ipsam numquam, autem maxime. Asperiores quisquam omnis quae autem impedit nostrum.
Necessitatibus sint animi, harum quia nostrum magnam dolores quasi deleniti molestias omnis nesciunt aperiam neque natus impedit iure aliquam itaque, sed delectus obcaecati quo commodi voluptatum. Sed, necessitatibus. Maiores, qui?
Ab nobis vitae quaerat corrupti? Ullam, vitae nesciunt! Voluptatum asperiores ad, modi recusandae dolore iusto vero vitae sunt impedit minus eaque quaerat magnam cumque. Dicta inventore veniam dolore iusto sunt?
Autem porro possimus, repellat qui quidem architecto incidunt, suscipit libero numquam quisquam sequi totam nesciunt sapiente nulla quia iste neque esse laboriosam nihil est. Architecto, odit excepturi. Aliquid, amet ipsa!
Quo quaerat enim quibusdam, dolor accusantium aliquid hic corrupti, nesciunt beatae sequi, libero iste facere culpa nulla officia sapiente ab necessitatibus tempora! Rerum quaerat molestiae dolore molestias debitis libero modi.
Error, nemo veniam. Officia aliquid explicabo excepturi qui delectus similique magni dolore unde veniam pariatur magnam rem perferendis debitis nesciunt, nihil nostrum at ex cupiditate quos maiores vero repellat ab!
Odio quod ducimus earum atque saepe voluptas reiciendis sunt? Ipsum alias omnis quia repellat quo soluta voluptates repellendus vero vitae! Sint facere labore quisquam quam sed atque ex blanditiis officiis.
Saepe aperiam debitis ipsum laborum officia, assumenda quia consectetur corrupti, numquam totam amet suscipit possimus mollitia dicta quaerat, delectus ex necessitatibus. Debitis iure, eius dolorem laborum magni facere sit impedit.
Quibusdam, voluptatum ut tenetur soluta fugit qui incidunt corporis. Ea, maiores est! Cumque maxime, officia consequatur nisi rem laboriosam assumenda. Voluptate reprehenderit adipisci ab magnam quo temporibus exercitationem repudiandae ut?`,G="mix",y="-",K=`<svg class="artist-backdrop-youTube-icon" width="24" height="24">
      <use href="img/sprite.svg#icon-youtube"></use>
    </svg>`,Q="No albums found",u={artistsListEl:document.querySelector(".js-artists-list"),artistsLoaderEl:document.querySelector(".artist-loader.loader"),artistsLoadMoreBtnEl:document.querySelector(".js-load-more-btn"),artistModalEl:document.querySelector(".js-artist-modal")};document.addEventListener("DOMContentLoaded",J);u.artistsLoadMoreBtnEl.addEventListener("click",W);u.artistsListEl.addEventListener("click",z);document.addEventListener("keydown",ot);u.artistModalEl.addEventListener("click",nt);async function J(){D();try{const t=await N();if(!t){h("Network error. Please check your internet connection.");return}const{artists:e,totalArtists:i}=t;O(e),k.setTotal(i)}catch(t){console.log(t.message),h("Something went wrong")}finally{T()}}async function W(){D(),X();try{if(!k.isArtistLeft()){h("No more artists"),T();return}k.setNewPage();const t=k.getPage(),e=await N(t);if(!e){h("Network error. Please check your internet connection.");return}O(e.artists)}catch(t){console.log(t),h("Something went wrong")}finally{T(),Z()}}async function z(t){const e=t.target.closest(".js-learn-more-btn");if(!(t.target.nodeName!=="BUTTON"||!e)){at(),e.disabled=!0,e.classList.add("is-disabled");try{const i=t.target.closest(".artists-list-item").id,r=t.target.closest(".artists-list-item").children[1].outerText.split(`
`),s=await Y(i);if(!s){C(),h("Network error. Please check your internet connection.");return}rt(),ct(s,r)}catch(i){console.log(i.message)}finally{e.classList.remove("is-disabled"),e.disabled=!1}}}function h(t){u.artistsListEl.innerHTML=`<li class="error-msg">${t}</li>`}function X(){u.artistsLoadMoreBtnEl.disabled=!0,u.artistsLoadMoreBtnEl.classList.add("is-disabled")}function Z(){u.artistsLoadMoreBtnEl.classList.remove("is-disabled"),u.artistsLoadMoreBtnEl.disabled=!1}function O(t=[]){!t||t.length===0||u.artistsListEl.insertAdjacentHTML("beforeend",tt(t))}function tt(t=[]){return t.map(et).join("")}function et(t={}){const{genres:e=[],strArtist:i,strArtistThumb:r,strBiographyEN:s,_id:o}=t,m=st(r,i),v=P(e);return`<li class="artists-list-item" id=${o}>
  <div class="artist-item-img-wrapper">${m}</div>
            <ul class="artist-item-tags-list">
            ${v}
            </ul>
            <ul class="artist-item-info-list">
              <li class="artist-info-name">${i}</li>
              <li class="artist-info-bio">${s||B}</li>
            </ul>
            <button
              type="button"
              class="artists-learn-more-btn js-learn-more-btn"
            >
              Learn More
              <svg class="learn-more-svg" width="8" height="15">
                <use href="img/sprite.svg#icon-learn-more"></use>
              </svg>
            </button>
          </li>
        </ul>`}function P(t=[]){return t.length===0?`<li class="artist-tags-genres">${G}</li>`:[...new Set(t.flatMap(i=>i.split("/").map(r=>r.trim())))].map(i=>`<li class="artist-tags-genres">${i}</li>`).join("")}function st(t="",e){return t?`<img class="artists-list-item-img" src=${t} alt="${e||"Artist"}"/>`:`<div class="artist-placeholder">
  <span>${e||"Artist"}</span>
</div>`}function it(t="",e){return t?`<img class="art-mod-img" src=${t} alt="${e||"Artist"}"/>`:`<div class="artist-placeholder">
  <span>${e||"Artist"}</span>
</div>`}const k={page:1,totalArtists:null,limit:8,getPage(){return this.page},setNewPage(){this.page+=1},setTotal(t){this.totalArtists=t},isArtistLeft(){return this.totalArtists>this.page*this.limit},reset(){this.page=1,this.totalArtists=null,this.limit=8}};function D(){u.artistsLoaderEl.style.display="block"}function T(){u.artistsLoaderEl.style.display="none"}function at(){document.querySelector(".modal-loader-container")||document.body.insertAdjacentHTML("beforeend",'<div class="modal-loader-container"><span class="artist-modal-loader loader"></span></div>')}function C(){const t=document.querySelector(".modal-loader-container");t&&t.remove(),u.artistModalEl.innerHTML=""}function rt(){C(),u.artistModalEl.classList.add("artist-is-open"),document.body.classList.add("modal-open")}function j(){u.artistModalEl.classList.remove("artist-is-open"),document.body.classList.remove("modal-open"),lt()}function ot(t){t.key==="Escape"&&j()}function nt(t){const e=t.target.closest(".artist-modal-backdrop-close-btn");(t.target===t.currentTarget||e)&&j()}function lt(){u.artistModalEl.innerHTML=""}function ct(t={},e=[]){u.artistModalEl.insertAdjacentHTML("beforeend",dt(t,e))}function dt(t={},e=[]){const{strArtistThumb:i,strArtist:r,intFormedYear:s,intDiedYear:o,strGender:m,intMembers:v,strCountry:$,strBiographyEN:p,tracksList:q=[]}=t,b=P(e),E=ut(q),w=it(i,r);return`
  <div class="artist-modal-container">
  <button type="button" class="artist-modal-backdrop-close-btn">
    <svg class="artist-backdrop-close-icon" width="32" height="32">
      <use href="img/sprite.svg#icon-x-close"></use>
    </svg>
  </button>
  <p class="artist-modal-title">${r||"Artist"}</p>
  <div class="artist-modal-about-wrapper">
  <div class="artist-modal-img-wrapper">${w}</div>
    <div class="artist-modal-info-wrapper">
      <ul class="art-mod-years-sex">
        <li class="art-mod-years">
          Years active
          <p>${Number(s)>0?s+" - ":y}
          ${o||"present"}</p>
        </li>
        <li class="art-mod-sex">
          Sex
          <p>${m||y}</p>
        </li>
      </ul>
      <ul class="art-mod-members-country">
        <li class="art-mod-members">
          Members
          <p>${v||y}</p>
        </li>
        <li class="art-mod-country">
          Country
          <p>${$||y}</p>
        </li>
      </ul>
      <ul class="art-mod-biography">
        <li class="art-mod-bio">
          Biography
          <p class="bio-text">${p||B}</p>
        </li>
      </ul>
      <ul class="artist-item-tags-list">${b}</ul>
      </div>
    </div>
    <div class="modal-artist-albums-wrapper">
      <p class="modal-artist-albums-title">Albums</p>
      <ul class="modal-artist-albums-list">${E}</ul>
    </div>
    </div>`}function ut(t=[]){if(t.length===0)return`<li class=no-alb-found>${Q}</li>`;const e=[],i=t.reduce((r,s)=>(r.includes(s.strAlbum)||r.push(s.strAlbum),r),[]);for(const r of i){const s=t.filter(o=>o.strAlbum===r).map(mt).join("");e.push(`<li class="modal-artist-albums-item">
      <p class="alb-list-title">${r}</p>
      <div class="table-scroll-wrapper">
      <table class="single-album-table">
        <thead>
          <tr class="album-head">
            <th>Track</th>
            <th>Time</th>
            <th>Link</th>
          </tr>
        </thead>
        <tbody class="album-table-body">${s}</tbody>
      </table>
      </div>
    </li>`)}return e.join("")}function mt(t={}){const{intDuration:e,movie:i,strTrack:r,_id:s}=t,o=pt(e);return`<tr class="table-songs" id=${s}>
            <td>${r}</td>
            <td>${o||y}</td>
            <td><a href="${i||"#"}" target="_blank">${i?K:""}</a></td>
          </tr>`}function pt(t){const e=Number(t);if(!e||e<=0)return"0:00";const i=Math.floor(e/1e3),r=Math.floor(i/60),s=i%60;return`${r}:${s.toString().padStart(2,"0")}`}document.addEventListener("DOMContentLoaded",()=>{if(console.log("DOM is ready"),!document.querySelector(".feedback-section")){console.warn("Feedback section отсутствует на этой странице");return}function e(){const a=document.getElementById("loader");a&&(a.classList.remove("hidden"),a.classList.add("show"))}function i(){const a=document.getElementById("loader");a&&(a.classList.remove("show"),a.classList.add("hidden"))}function r(a){const c=[];for(let d=1;d<=5;d++){const A=d<=Math.round(a)?"icon-star-filled":"icon-star-empty";c.push(`
      <svg class="star-icon" width="20" height="20">
        <use href="#${A}"></use>
      </svg>
    `)}return c.join("")}async function s(){e();try{const a=await fetch("https://sound-wave.b.goit.study/api/feedbacks");if(!a.ok)throw new Error(`HTTP error! Status: ${a.status}`);const{data:c}=await a.json();return c}catch(a){return console.error("Error fetching feedbacks:",a),[]}finally{i()}}async function o(){const a=await s(),c=document.querySelector(".swiper-wrapper"),d=document.querySelector(".custom-pagination");c.innerHTML="",d.innerHTML="",a.forEach(n=>{const l=document.createElement("div");l.classList.add("swiper-slide"),l.innerHTML=`
      <div class="feedback-card">
        <div class="feedback-rating">${r(n.rating)}</div>
        <p class="feedback-text">${n.descr}</p>
        <div class="feedback-info">
          <h3 class="feedback-name">${n.name}</h3>
        </div>
      </div>
    `,c.appendChild(l)});const f=new F(".feedback-swiper",{modules:[_],loop:!1,navigation:{nextEl:".my-button-next",prevEl:".my-button-prev"},slidesPerView:1,spaceBetween:0,on:{slideChange:()=>M(f.realIndex,f.slides.length)}});function A(n){const l=document.createElement("span"),g=document.createElement("span"),L=document.createElement("span");l.classList.add("pagination-dot"),l.dataset.index=0,g.classList.add("pagination-dot"),g.dataset.index=Math.floor(n/2),L.classList.add("pagination-dot"),L.dataset.index=n-1,d.append(l,g,L)}function M(n,l){const[g,L,I]=document.querySelectorAll(".pagination-dot");g.classList.toggle("active",n===0),L.classList.toggle("active",n!==0&&n!==l-1),I.classList.toggle("active",n===l-1)}d.addEventListener("click",n=>{if(n.target.classList.contains("pagination-dot")){const l=Number(n.target.dataset.index);f.slideTo(l)}}),A(a.length),M(f.realIndex,a.length)}setTimeout(()=>{o()},200);const m=document.querySelector(".modal"),v=document.querySelector(".btn-open"),$=document.querySelector(".btn-close"),p=document.querySelector(".feedback-form"),q=document.querySelectorAll(".star");let b=0;v.addEventListener("click",()=>{m.classList.remove("hidden"),setTimeout(()=>{m.classList.add("show")},10)}),$.addEventListener("click",()=>{w()}),q.forEach((a,c)=>{a.addEventListener("click",()=>{b=c+1,E(b)})});function E(a){q.forEach((c,d)=>{const f=c.querySelector("use");d<a?(f.setAttribute("href","#icon-star-filled"),c.classList.add("active-star")):(f.setAttribute("href","#icon-star-empty"),c.classList.remove("active-star"))})}function w(){m.classList.remove("show"),setTimeout(()=>{m.classList.add("hidden"),p.reset(),E(0),b=0,H()},300)}function H(){p.querySelectorAll(".error-message").forEach(d=>{d.classList.add("hidden"),d.textContent=""}),p.querySelectorAll(".error").forEach(d=>d.classList.remove("error"))}p.addEventListener("submit",async a=>{a.preventDefault();const c=p.elements.name.value.trim(),d=p.elements.message.value.trim();let f=!0;if([{input:p.elements.name,errorEl:p.elements.name.nextElementSibling,message:"Text error"},{input:p.elements.message,errorEl:p.elements.message.nextElementSibling,message:"Text error"}].forEach(({input:n,errorEl:l,message:g})=>{n.value.trim()?(n.classList.remove("error"),l.classList.add("hidden"),l.textContent=""):(n.classList.add("error"),l.textContent=g,l.classList.remove("hidden"),f=!1)}),!f)return;const M={name:c,rating:b,descr:d};e();try{if(!(await fetch("https://sound-wave.b.goit.study/api/feedbacks",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(M)})).ok)throw new Error("Error");alert("Thanks for the feedback!"),w()}catch(n){alert("Error sending. Please try again later."),console.error(n)}finally{i()}})});
//# sourceMappingURL=index.js.map
