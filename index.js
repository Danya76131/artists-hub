import{i as B,a as v,S as R,N as U}from"./assets/vendor-J4A_YXt_.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))a(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const f of i.addedNodes)f.tagName==="LINK"&&f.rel==="modulepreload"&&a(f)}).observe(document,{childList:!0,subtree:!0});function r(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function a(s){if(s.ep)return;s.ep=!0;const i=r(s);fetch(s.href,i)}})();const Y=document.querySelector(".header-burger-btn"),N=document.querySelector(".header-mobile-menu"),V=document.querySelector(".header-mobile-menu-close");Y.addEventListener("click",()=>{N.classList.add("is-open")});V.addEventListener("click",()=>{N.classList.remove("is-open")});const W=document.querySelectorAll(".mobile-menu-link");W.forEach(t=>{t.addEventListener("click",()=>{N.classList.remove("is-open")})});const G=localStorage.getItem("lightmode");G==="active"&&document.documentElement.classList.add("lightmode");const C="/artists-hub/assets/sprite-B3TWM_qx.svg";async function P(t=1){v.defaults.baseURL="https://sound-wave.b.goit.study/api";try{return(await v.get("/artists",{params:{limit:8,page:t||1}})).data}catch(e){return console.log(e.message),null}}async function K(t=""){v.defaults.baseURL="https://sound-wave.b.goit.study/api/artists";try{return(await v.get(t)).data}catch(e){return console.log(e.message),null}}const O="Sorry there is no information about biography",z="mix",w="-",J=`<svg class="artist-backdrop-youTube-icon" width="24" height="24" fill="currentColor">

      <use href="${C}#icon-youtube"></use>
    </svg>`,Q="No albums found",c={artistsListEl:document.querySelector(".js-artists-list"),artistsLoaderEl:document.querySelector(".artist-loader.loader"),artistsLoadMoreBtnEl:document.querySelector(".js-load-more-btn"),artistModalEl:document.querySelector(".js-artist-modal")};document.addEventListener("DOMContentLoaded",X);c.artistsLoadMoreBtnEl.addEventListener("click",Z);c.artistsListEl.addEventListener("click",tt);document.addEventListener("keydown",dt);c.artistModalEl.addEventListener("click",ut);async function X(){j();try{const t=await P();if(!t){M("Network error. Please check your internet connection.");return}const{artists:e,totalArtists:r}=t;D(e),T.setTotal(r)}catch(t){console.log(t.message),M("Something went wrong")}finally{x()}}async function Z(){j(),et();try{T.setNewPage();const t=T.getPage();if(!T.isArtistLeft()){Lt(),x(),rt();return}const e=await P(t);if(!e){M("Network error. Please check your internet connection.");return}D(e.artists)}catch(t){console.log(t),M("Something went wrong")}finally{x(),st()}}async function tt(t){const e=t.target.closest(".js-learn-more-btn");if(!(t.target.nodeName!=="BUTTON"||!e)){lt(),e.disabled=!0,e.classList.add("is-disabled");try{const r=t.target.closest(".artists-list-item").id,a=t.target.closest(".artists-list-item").children[1].outerText.split(`
`),s=await K(r);if(!s){H(),M("Network error. Please check your internet connection.");return}ct(),gt(s,a)}catch(r){console.log(r.message)}finally{e.classList.remove("is-disabled"),e.disabled=!1}}}function M(t){c.artistsListEl.innerHTML=`<li class="error-msg">${t}</li>`}function et(){c.artistsLoadMoreBtnEl.disabled=!0,c.artistsLoadMoreBtnEl.classList.add("is-disabled")}function st(){c.artistsLoadMoreBtnEl.classList.remove("is-disabled"),c.artistsLoadMoreBtnEl.disabled=!1}function rt(){c.artistsLoadMoreBtnEl.style.display="none"}function D(t=[]){!t||t.length===0||c.artistsListEl.insertAdjacentHTML("beforeend",at(t))}function at(t=[]){return t.map(ot).join("")}function ot(t={}){const{genres:e=[],strArtist:r,strArtistThumb:a,strBiographyEN:s,_id:i}=t,f=nt(a,r),y=I(e);return`<li class="artists-list-item" id=${i}>
  <div class="artist-item-img-wrapper">${f}</div>
            <ul class="artist-item-tags-list">
            ${y}
            </ul>
            <div class="artist-bio-wrapper"><h3 class="artist-info-name">${r}</h3>
              <p class="artist-info-bio">${s||O}</p></div>
            <button
              type="button"
              class="artists-learn-more-btn js-learn-more-btn"
            >
              Learn More
              <svg class="learn-more-svg" width="8" height="15" fill="currentColor">

                <use href="${C}#icon-learn-more"></use>

              </svg>
            </button>
          </li>
        </ul>`}function I(t=[]){return t.length===0?`<li class="artist-tags-genres">${z}</li>`:[...new Set(t.flatMap(r=>r.split("/").map(a=>a.trim())))].map(r=>`<li class="artist-tags-genres">${r}</li>`).join("")}function nt(t="",e){return t?`<img class="artists-list-item-img" src=${t} alt="${e||"Artist"}"/>`:`<div class="artist-placeholder">
  <span>${e||"Artist"}</span>
</div>`}function it(t="",e){return t?`<img class="art-mod-img" src=${t} alt="${e||"Artist"}"/>`:`<div class="artist-placeholder">
  <span>${e||"Artist"}</span>
</div>`}const T={page:1,totalArtists:null,limit:8,getPage(){return this.page},setNewPage(){this.page+=1},setTotal(t){this.totalArtists=t},isArtistLeft(){return this.totalArtists>this.page*this.limit},reset(){this.page=1,this.totalArtists=null,this.limit=8}};function j(){c.artistsLoaderEl.style.display="block"}function x(){c.artistsLoaderEl.style.display="none"}function lt(){document.querySelector(".modal-loader-container")||document.body.insertAdjacentHTML("beforeend",'<div class="modal-loader-container"><span class="artist-modal-loader loader"></span></div>')}function H(){const t=document.querySelector(".modal-loader-container");t&&t.remove(),c.artistModalEl.innerHTML=""}function ct(){H(),c.artistModalEl.classList.add("artist-is-open"),document.body.classList.add("modal-open")}function F(){c.artistModalEl.classList.remove("artist-is-open"),document.body.classList.remove("modal-open"),mt()}function dt(t){t.key==="Escape"&&F()}function ut(t){const e=t.target.closest(".artist-modal-backdrop-close-btn");(t.target===t.currentTarget||e)&&F()}function mt(){c.artistModalEl.innerHTML=""}function gt(t={},e=[]){c.artistModalEl.insertAdjacentHTML("beforeend",ft(t,e))}function ft(t={},e=[]){const{strArtistThumb:r,strArtist:a,intFormedYear:s,intDiedYear:i,strGender:f,intMembers:y,strCountry:q,strBiographyEN:u,tracksList:k=[]}=t,b=I(e),A=pt(k),S=it(r,a);return`
  <div class="artist-modal-container">
  <button type="button" class="artist-modal-backdrop-close-btn">
    <svg class="artist-backdrop-close-icon" width="32" height="32" fill="currentColor">

      <use href="${C}#icon-x-close"></use>

    </svg>
  </button>
  <p class="artist-modal-title">${a||"Artist"}</p>
  <div class="artist-modal-about-wrapper">
  <div class="artist-modal-img-wrapper">${S}</div>
    <div class="artist-modal-info-wrapper">
      <ul class="art-mod-years-sex">
        <li class="art-mod-years">
          Years active
          <p>${Number(s)>0?s+" - ":w}
          ${i||"present"}</p>
        </li>
        <li class="art-mod-sex">
          Sex
          <p>${f||w}</p>
        </li>
      </ul>
      <ul class="art-mod-members-country">
        <li class="art-mod-members">
          Members
          <p>${y||w}</p>
        </li>
        <li class="art-mod-country">
          Country
          <p>${q||w}</p>
        </li>
      </ul>
      <h3 class="art-mod-biography">
          Biography
          </h3>
          <p class="bio-text">${u||O}</p>
      <ul class="artist-item-tags-list">${b}</ul>
      </div>
    </div>
    <div class="modal-artist-albums-wrapper">
      <p class="modal-artist-albums-title">Albums</p>
      <ul class="modal-artist-albums-list">${A}</ul>
    </div>
    </div>`}function pt(t=[]){if(t.length===0)return`<li class=no-alb-found>${Q}</li>`;const e=[],r=t.reduce((a,s)=>(a.includes(s.strAlbum)||a.push(s.strAlbum),a),[]);for(const a of r){const s=t.filter(i=>i.strAlbum===a).map(ht).join("");e.push(`<li class="modal-artist-albums-item">
      <p class="alb-list-title">${a}</p>
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
    </li>`)}return e.join("")}function ht(t={}){const{intDuration:e,movie:r,strTrack:a,_id:s}=t,i=bt(e);return`<tr class="table-songs" id=${s}>
            <td>${a}</td>
            <td>${i||w}</td>
            <td><a href="${r||"#"}" target="_blank">${r?J:""}</a></td>
          </tr>`}function bt(t){const e=Number(t);if(!e||e<=0)return"0:00";const r=Math.floor(e/1e3),a=Math.floor(r/60),s=r%60;return`${a}:${s.toString().padStart(2,"0")}`}function Lt(){B.show({timeout:3333,message:"Sorry,no more artists.",position:"topLeft"})}document.addEventListener("DOMContentLoaded",()=>{if(console.log("DOM is ready"),!document.querySelector(".feedback-section")){console.warn("Feedback section отсутствует на этой странице");return}function e(){const o=document.getElementById("loader");o&&(o.classList.remove("hidden"),o.classList.add("show"))}function r(){const o=document.getElementById("loader");o&&(o.classList.remove("show"),o.classList.add("hidden"))}function a(o){const g=[];for(let d=1;d<=5;d++){const $=d<=Math.round(o)?"icon-star-filled":"icon-star-empty";g.push(`
      <svg class="star-icon" width="20" height="20" fill="currentColor">
        <use href="#${$}"></use>
      </svg>
    `)}return g.join("")}async function s(){e();try{return(await v.get("https://sound-wave.b.goit.study/api/feedbacks")).data.data}catch(o){return console.error(o.message),[]}finally{r()}}async function i(){const o=await s(),g=document.querySelector(".swiper-wrapper"),d=document.querySelector(".custom-pagination");g.innerHTML="",d.innerHTML="",o.forEach(n=>{const l=document.createElement("div");l.classList.add("swiper-slide"),l.innerHTML=`
      <div class="feedback-card">
        <div class="feedback-rating">${a(n.rating)}</div>
        <p class="feedback-text">${n.descr}</p>
        <div class="feedback-info">
          <h3 class="feedback-name">${n.name}</h3>
        </div>
      </div>
    `,g.appendChild(l)});const m=new R(".feedback-swiper",{modules:[U],loop:!1,navigation:{nextEl:".my-button-next",prevEl:".my-button-prev"},slidesPerView:1,spaceBetween:0,on:{slideChange:()=>E(m.realIndex,m.slides.length)}});function $(n){const l=document.createElement("span"),h=document.createElement("span"),p=document.createElement("span");l.classList.add("pagination-dot"),l.dataset.index=0,h.classList.add("pagination-dot"),h.dataset.index=Math.floor(n/2),p.classList.add("pagination-dot"),p.dataset.index=n-1,d.append(l,h,p)}function E(n,l){const[h,p,L]=document.querySelectorAll(".pagination-dot");h.classList.toggle("active",n===0),h.classList.contains("active")?m.navigation.prevEl.classList.add("btn-disabled"):m.navigation.prevEl.classList.remove("btn-disabled"),p.classList.toggle("active",n!==0&&n!==l-1),L.classList.toggle("active",n===l-1),L.classList.contains("active")?m.navigation.nextEl.classList.add("btn-disabled"):m.navigation.nextEl.classList.remove("btn-disabled")}d.addEventListener("click",n=>{if(n.target.classList.contains("pagination-dot")){const l=Number(n.target.dataset.index);m.slideTo(l)}}),$(o.length),E(m.realIndex,o.length)}setTimeout(()=>{i()},200);const f=document.querySelector(".modal"),y=document.querySelector(".btn-open"),q=document.querySelector(".btn-close"),u=document.querySelector(".feedback-form"),k=document.querySelectorAll(".star");let b=0;y.addEventListener("click",()=>{f.classList.remove("hidden"),setTimeout(()=>{document.body.classList.add("modal-open"),f.classList.add("show")},10)}),q.addEventListener("click",()=>{S()}),k.forEach((o,g)=>{o.addEventListener("click",()=>{b=g+1,A(b)})});function A(o){k.forEach((g,d)=>{const m=g.querySelector("use");d<o?(m.setAttribute("href","#icon-star-filled"),g.classList.add("active-star")):(m.setAttribute("href","#icon-star-empty"),g.classList.remove("active-star"))})}function S(){document.body.classList.remove("modal-open"),f.classList.remove("show"),setTimeout(()=>{f.classList.add("hidden"),u.reset(),A(0),b=0,_()},300)}function _(){u.querySelectorAll(".error-message").forEach(d=>{d.classList.add("hidden"),d.textContent=""}),u.querySelectorAll(".error").forEach(d=>d.classList.remove("error"))}u.addEventListener("submit",async o=>{o.preventDefault();const g=u.elements.name.value.trim(),d=u.elements.message.value.trim();let m=!0;[{input:u.elements.name,errorEl:u.elements.name.nextElementSibling,message:"Should be min 2 - max 10 characters"},{input:u.elements.message,errorEl:u.elements.message.nextElementSibling,message:"Should be min 10 - max 512 characters"}].forEach(({input:n,errorEl:l,message:h})=>{const p=n.value.trim();let L=!0;n===u.elements.name&&(L=p.length>=2&&p.length<=10),n===u.elements.message&&(L=p.length>=10&&p.length<=512),L?(n.classList.remove("error"),l.classList.add("hidden"),l.textContent=""):(n.classList.add("error"),l.textContent=h,l.classList.remove("hidden"),m=!1)});const E={name:g,rating:b,descr:d};if(E.rating<1){Et();return}if(m){e();try{const n=await v.post("https://sound-wave.b.goit.study/api/feedbacks",E,{headers:{"Content-Type":"application/json"}});S(),vt(),u.reset()}catch(n){yt(),console.error(n)}finally{r()}}})});function vt(){B.success({timeout:3333,title:"Nice!",message:"Thanks for the feedback!",position:"topRight"})}function yt(){B.error({timeout:3333,title:"Error!",message:"Error sending. Please try again later.",position:"topRight"})}function Et(){B.show({timeout:3333,message:"Please rank your feedback.",position:"topLeft"})}(function(){const t="lightmode",e=document.getElementById("theme-switch");e&&e.addEventListener("click",()=>{document.documentElement.classList.toggle("lightmode")?localStorage.setItem(t,"active"):localStorage.removeItem(t)})})();
//# sourceMappingURL=index.js.map
