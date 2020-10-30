(()=>{"use strict";(()=>{const e=document.querySelector(".map"),t=e.querySelector(".map__pins"),o=e.querySelector(".map__pin--main"),n=e.querySelector(".map__filters-container"),r=n.querySelector(".map__filters"),i=r.querySelectorAll("select"),s=document.querySelector(".ad-form"),l=s.querySelectorAll("fieldset"),d=s.querySelector("#room_number"),w=s.querySelector("#capacity"),a=s.querySelector("#title"),m=s.querySelector("#price"),u=s.querySelector("#type"),c=s.querySelector("#timein"),p=s.querySelector("#timeout"),_=s.querySelector("#address"),f=document.querySelector("#card").content.querySelector(".map__card"),E=document.querySelector("#pin").content.querySelector(".map__pin"),S=s.querySelector(".ad-form__reset"),v=document.querySelector("#success").content.querySelector(".success"),M=document.querySelector("#error").content.querySelector(".error"),y=document.querySelector("main"),A=r.querySelector("#housing-type"),T=r.querySelector("#housing-price"),I=r.querySelector("#housing-rooms"),P=r.querySelector("#housing-guests"),h=r.querySelectorAll('input[name="features"]'),g=s.querySelector(".ad-form-header__input"),L=s.querySelector(".ad-form-header__preview img"),N=s.querySelector(".ad-form__input"),C=s.querySelector(".ad-form__photo");window.elements={form:s,roomsNumber:d,guestsNumber:w,formTitleInput:a,formPrice:m,formType:u,formTimeIn:c,formTimeOut:p,addressInput:_,map:e,mapPins:t,mapPinMain:o,mapFilterForm:r,mapFilterFormContainer:n,mapFilterFormSelects:i,formFieldsets:l,cardTemplate:f,pinTemplate:E,formResetButton:S,successTemplate:v,errorTemplate:M,main:y,housingType:A,housingPrice:T,housingRooms:I,housingGuests:P,featuresInputs:h,fileAvatarChooser:g,avatarPreview:L,fileHousingChooser:N,housingPreview:C}})(),(()=>{const e={MAP_MIN_WIDTH:0,MAP_MAX_WIDTH:1200,MAP_MIN_HEIGTH:130,MAP_MAX_HEIGHT:630},t={HEIGHT:65,WIDTH:65,MAX_HEIGHT:87},o=t.WIDTH/2,n={MIN_Y:e.MAP_MIN_HEIGTH-t.MAX_HEIGHT,MAX_Y:e.MAP_MAX_HEIGHT-t.MAX_HEIGHT,MIN_X:e.MAP_MIN_WIDTH-t.WIDTH/2,MAX_X:e.MAP_MAX_WIDTH-t.WIDTH/2},r={ERROR_WINDOW:window.elements.errorTemplate.cloneNode(!0),SUCCESS_WINDOW:window.elements.successTemplate.cloneNode(!0)},i=e=>{"Escape"===e.key&&(e.preventDefault(),l())},s=e=>{e.preventDefault(),l()},l=()=>{window.elements.main.querySelector(".success").classList.add("hidden"),document.removeEventListener("click",s),document.removeEventListener("keydown",i)},d=e=>{"Escape"===e.key&&(e.preventDefault(),m())},w=e=>{e.preventDefault(),m()},a=e=>{e.preventDefault(),m()},m=()=>{const e=window.elements.main.querySelector(".error__button");window.elements.main.querySelector(".error").classList.add("hidden"),document.removeEventListener("click",w),document.removeEventListener("keydown",d),e.removeEventListener("click",a)};window.util={MAX_PRICE:1e6,TIMEOUT:1e4,MAP_SIZES:e,PIN_COORDS:n,MAX_ROOM:100,MIN_GUESTS:0,CODE:{SUCCESS:200,CACHED:302,NOT_FOUND_ERROR:404,SERVER_ERROR:500},MAX_LENGTH_VALUE:100,MIN_LENGTH_VALUE:30,MIN_PRICES:[0,1e3,5e3,1e4],MAIN_PIN_CENTER:o,MAP_MAIN_PIN_SIZE:t,PIN_SIZES:{HEIGHT:70,WIDTH:50},COORDINATES:{MIN_Y:130,MAX_Y:630,MIN_X:0,MAX_X:1200},FEATURES:["wifi","dishwasher","parking","washer","elevator","conditioner"],URL_LOAD:"https://21.javascript.pages.academy/keksobooking/data",MAX_PIN_COUNT:5,MAIN_PIN_START_COORDINATES:{X:570,Y:375},FilterPrice:{LOW:1e4,HIGH:5e4},STANDART_AVATAR:"img/muffin-grey.svg",MESSAGE_ELEMENT:r,MAP_FORM_START_VALUE:"any",FILE_TYPES:["gif","jpg","jpeg","png"],onErrorLoad:e=>{const t=document.createElement("div");t.style="z-index: 100; text-align: center; background-color: white; border: 2px solid red; color: red; max-width: 400px; min-height: 130px; display: flex; align-items: center; border-radius: 20px;",t.style.position="fixed",t.style.top="30%",t.style.left="34%",t.style.fontSize="30px",t.textContent=e,document.body.insertAdjacentElement("afterbegin",t)},showSuccessMessage:()=>{window.elements.main.querySelector(".success").classList.remove("hidden"),document.addEventListener("keydown",i),document.addEventListener("click",s)},showErrorMessage:()=>{const e=window.elements.main.querySelector(".error__button");window.elements.main.querySelector(".error").classList.remove("hidden"),document.addEventListener("keydown",d),document.addEventListener("click",w),e.addEventListener("click",a)},filterDataArray:e=>{let t=[];for(let o=0;o<e.length;o++)e[o].hasOwnProperty("offer")&&t.push(e[o]);return t}}})(),window.debounce=e=>{let t=null;return(...o)=>{t&&window.clearTimeout(t),t=window.setTimeout((()=>{e(...o)}),500)}},window.message={createMessage:e=>{let t=document.createDocumentFragment();t.appendChild(e),window.elements.main.appendChild(t),e.classList.add("hidden")}},window.load=(e,t,o)=>{const n=new XMLHttpRequest;n.responseType="json",n.timeout=window.util.TIMEOUT,n.addEventListener("load",(()=>{let o;switch(n.status){case window.util.CODE.SUCCESS:e(n.response);break;case window.util.CODE.CACHED:o="Неверный запрос";break;case window.util.CODE.NOT_FOUND_ERROR:o="Ничего не найдено";break;case window.util.CODE.SERVER_ERROR:o="Ошибка сервера";break;default:o=`Статус ответа: ${n.status} ${n.statusText}`}o&&t(o)})),n.addEventListener("error",(()=>{t("Произошла ошибка соединения")})),n.addEventListener("timeout",(()=>{t(`Запрос не успел выполнится за ${n.timeout}мс`)})),n.open("GET",o),n.send()},(()=>{let e=null;const t=(t,o)=>{t.style.display="block",o.classList.add("map__pin--active"),n=o,e=t,document.addEventListener("keydown",r)},o=(t,o)=>{e&&(t.style.display="none",o.classList.remove("map__pin--active"),e=null,n=0,document.removeEventListener("keydown",r))};let n=0;const r=t=>{"Escape"===t.key&&(t.preventDefault(),o(e,n))};window.pin={resetCurrent:()=>{n=0,e=null},activateServerDownloads:e=>{(e=>{let t=document.createDocumentFragment();e.forEach((e=>t.appendChild((e=>{let t=window.elements.pinTemplate.cloneNode(!0);return t.querySelector("img").src=e.author.avatar,t.querySelector("img").alt=e.offer.title,t.style.left=e.location.x-window.util.PIN_SIZES.WIDTH/2+"px",t.style.top=e.location.y-window.util.PIN_SIZES.HEIGHT+"px",t})(e)))),window.elements.mapPins.appendChild(t)})(e),window.card.activateCards(e),window.form.enableFormElements(window.elements.mapFilterFormSelects)},initCardPopup:()=>{const r=document.querySelectorAll(".popup__close"),i=window.elements.map.querySelectorAll(".map__pin:not(.map__pin--main)"),s=Array.from(i),l=document.querySelectorAll(".map__card");(e=>{for(let t of e)t.style.display="none"})(l),((r,i)=>{for(let s=0;s<r.length;s++)r[s].addEventListener("click",(()=>{o(e,n),t(i[s],r[s])}))})(s,l),(t=>{for(let r=0;r<t.length;r++)t[r].addEventListener("click",(()=>{o(e,n)}))})(r)},removePins:()=>{window.elements.map.querySelectorAll(".map__pin:not(.map__pin--main)").forEach((e=>e.remove()))}}})(),(()=>{const e={palace:"дворец",flat:"квартира",house:"дом",bungalow:"бунгало"};window.card={activateCards:t=>{let o=document.createDocumentFragment();t.forEach((t=>o.appendChild((t=>{let o=window.elements.cardTemplate.cloneNode(!0);if(0!==t.offer.rooms&&0!==t.offer.guests?o.querySelector(".popup__text--capacity").textContent=(e=>{let t=+e.offer.rooms.toString().slice(-1),o=+e.offer.guests.toString().slice(-1),n="",r="";return(t>4&&t<=9||0===t)&&(r=t+" комнат для "),t>=2&&t<=4&&(r=t+" комнаты для "),1===t&&(r=t+" комната для "),n=1===o?o+" гостя":o+" гостей",r+n})(t):o.querySelector(".popup__text--capacity").remove(),o.querySelector(".popup__title").textContent=t.offer.title,""!==t.offer.address?o.querySelector(".popup__text--address").textContent=t.offer.address:o.querySelector(".popup__text--address").remove(),void 0!==t.offer.price?o.querySelector(".popup__text--price").textContent=t.offer.price+"₽/ночь":o.querySelector(".popup__text--price").remove(),""!==t.offer.type?o.querySelector(".popup__type").textContent=e[t.offer.type]:o.querySelector(".popup__type").remove(),void 0!==t.offer.checkin&&void 0!==t.offer.checkout?o.querySelector(".popup__text--time").textContent=`Заезд после ${t.offer.checkin}, выезд до ${t.offer.checkout}`:o.querySelector(".popup__text--time").remove(),0!==t.offer.features.length)for(let e of window.util.FEATURES)t.offer.features.includes(e)||o.querySelector(".popup__feature--"+e).remove();else o.querySelector(".popup__features").remove();if(""!==t.offer.description?o.querySelector(".popup__description").textContent=t.offer.description:o.querySelector(".popup__description").remove(),0!==t.offer.photos.length){o.querySelector(".popup__photo").src=t.offer.photos[0];let e=o.querySelector(".popup__photos");for(let o=1;o<t.offer.photos.length;o++)e.insertAdjacentHTML("beforeend",`<img src=${t.offer.photos[o]} class=popup__photo width=45 height=40 alt="Фотография жилья" >`)}else o.querySelector(".popup__photos").remove();return""!==t.author.avatar?o.querySelector(".popup__avatar").src=t.author.avatar:o.querySelector(".popup__avatar").remove(),o})(t)))),window.elements.map.insertBefore(o,window.elements.mapFilterFormContainer),window.pin.initCardPopup()},removeCards:()=>{window.elements.map.querySelectorAll(".map__card").forEach((e=>e.remove()))}}})(),(()=>{let e=[],t=window.util.MAP_FORM_START_VALUE,o=window.util.MAP_FORM_START_VALUE,n=window.util.MAP_FORM_START_VALUE,r=[],i=window.util.MAP_FORM_START_VALUE;const s=()=>{let t=l(e);window.pin.activateServerDownloads(t)},l=e=>{let t=0;return e.filter((e=>{if(5===t)return!1;let o=!0;return o=o&&d(e),o=o&&w(e),o=o&&a(e),o=o&&m(e),o=o&&u(e),o&&t++,o}))},d=e=>t===window.util.MAP_FORM_START_VALUE||e.offer.type===t,w=e=>i===window.util.MAP_FORM_START_VALUE||"middle"===i&&e.offer.price>=window.util.FilterPrice.LOW&&e.offer.price<=window.util.FilterPrice.HIGH||"low"===i&&e.offer.price<window.util.FilterPrice.LOW||"high"===i&&e.offer.price>window.util.FilterPrice.HIGH,a=e=>o===window.util.MAP_FORM_START_VALUE||e.offer.rooms===parseInt(o,10),m=e=>n===window.util.MAP_FORM_START_VALUE||e.offer.guests===parseInt(n,10),u=e=>{if(r.length<1)return!0;let t=0;for(let o=0;o<r.length;o++)e.offer.features.includes(r[o])&&t++;return t===r.length};window.filter={onMapFilterFormChange:()=>{t=window.elements.housingType.value,i=window.elements.housingPrice.value,o=window.elements.housingRooms.value,n=window.elements.housingGuests.value,r=Array.from(window.elements.featuresInputs).filter((e=>e.checked)).map((e=>e.value)),window.pin.removePins(),window.card.removeCards(),window.pin.resetCurrent(),s()},onSuccessLoad:t=>{e=window.util.filterDataArray(t),s()}}})(),window.upload=(e,t,o)=>{const n=new XMLHttpRequest;n.responseType="json",n.addEventListener("load",(()=>{switch(n.status){case window.util.CODE.SUCCESS:t(n.response);break;default:window.util.showErrorMessage()}})),n.addEventListener("error",(()=>{o("Произошла ошибка соединения")})),n.open("POST","https://21.javascript.pages.academy/keksobooking"),n.send(e)},window.preview={onHousingPreviewLoad:e=>{window.elements.housingPreview.children&&(window.elements.housingPreview.innerHTML="",window.elements.housingPreview.insertAdjacentHTML("beforeend",`<img src=${e} width=45 height=40 alt="Фотография жилья" >`))},loadPreview:(e,t)=>{const o=e.files[0],n=o.name.toLowerCase();if(window.util.FILE_TYPES.some((e=>n.endsWith(e)))){const e=new FileReader;e.addEventListener("load",(()=>{t(e.result)})),e.readAsDataURL(o)}},onAvatarPreviewLoad:e=>{window.elements.avatarPreview.src=e}},(()=>{const e=(e,t)=>{t.selectedIndex=e.selectedIndex},t=()=>{window.elements.form.reset(),window.map.deactivateMap(),o(),n(),window.form.updateAddressValue()},o=()=>{window.elements.housingPreview.children.length>0&&(window.elements.housingPreview.innerHTML="")},n=()=>{window.elements.avatarPreview.src.endsWith(window.util.STANDART_AVATAR)||(window.elements.avatarPreview.src=window.util.STANDART_AVATAR)};window.form={getMainPinCoordinates:()=>{let e,t=window.elements.mapPinMain.style.left.replace(/[^\d.-]/g,""),o=window.elements.mapPinMain.style.top.replace(/[^\d.-]/g,"");return e=window.elements.map.classList.contains("map--faded")?`${Math.floor(+t+window.util.MAP_MAIN_PIN_SIZE.WIDTH/2)}, ${Math.floor(+o+window.util.MAP_MAIN_PIN_SIZE.HEIGHT/2)}`:`${Math.floor(+t+window.util.MAP_MAIN_PIN_SIZE.WIDTH/2)}, ${Math.floor(+o+window.util.MAP_MAIN_PIN_SIZE.MAX_HEIGHT)}`,e},onFormChange:t=>{if(t.target===window.elements.roomsNumber||t.target===window.elements.guestsNumber){const e=window.elements.roomsNumber.value;return n=+(n=window.elements.guestsNumber.value),(o=+(o=e))===window.util.MAX_ROOM&&n!==window.util.MIN_GUESTS||n>o||o<window.util.MAX_ROOM&&n===window.util.MIN_GUESTS?(()=>{const e=window.elements.roomsNumber.value;"1"===e?window.elements.guestsNumber.setCustomValidity(`Вместительность данного размещения не более ${e} гостя`):"100"===e?window.elements.guestsNumber.setCustomValidity("Это размещение не для гостей"):window.elements.guestsNumber.setCustomValidity(`Вместительность данного размещения не более ${e} гостей`),window.elements.roomsNumber.reportValidity(),window.elements.guestsNumber.reportValidity()})():(window.elements.roomsNumber.setCustomValidity(""),void window.elements.guestsNumber.setCustomValidity(""))}var o,n;return t.target===window.elements.formTitleInput?(()=>{let e=window.elements.formTitleInput.value.length;e<window.util.MIN_LENGTH_VALUE?window.elements.formTitleInput.setCustomValidity(`Слишком коротко, минимальная длинна заголовка ${window.util.MIN_LENGTH_VALUE} симв, допишите еще ${window.util.MIN_LENGTH_VALUE-e} симв.`):e>window.util.MAX_LENGTH_VALUE?window.elements.formTitleInput.setCustomValidity(`Слишком длинное название, максимальная длинна ${window.util.MAX_LENGTH_VALUE} симв., уберите лишние ${e-window.util.MAX_LENGTH_VALUE} симв.`):window.elements.formTitleInput.setCustomValidity(""),window.elements.formTitleInput.reportValidity()})():t.target===window.elements.formPrice||t.target===window.elements.formType?((e,t)=>{let o=parseInt(window.elements.formPrice.value,10);window.elements.formPrice.placeholder=e[t.selectedIndex],o<e[t.selectedIndex]?window.elements.formPrice.setCustomValidity("Минимальная цена для данного размещения "+e[t.selectedIndex]):o>window.util.MAX_PRICE?window.elements.formPrice.setCustomValidity("Максимально возможное значение "+window.util.MAX_PRICE):window.elements.formPrice.setCustomValidity("")})(window.util.MIN_PRICES,window.elements.formType):t.target===window.elements.formTimeIn?e(window.elements.formTimeIn,window.elements.formTimeOut):t.target===window.elements.formTimeOut?e(window.elements.formTimeOut,window.elements.formTimeIn):t.target===window.elements.fileAvatarChooser?window.preview.loadPreview(window.elements.fileAvatarChooser,window.preview.onAvatarPreviewLoad):t.target!==window.elements.fileHousingChooser||window.preview.loadPreview(window.elements.fileHousingChooser,window.preview.onHousingPreviewLoad)},enableFormElements:e=>{for(let t of e)t.removeAttribute("disabled")},disabledFormElements:e=>{for(let t of e)t.setAttribute("disabled","disabled")},updateAddressValue:()=>{window.elements.addressInput.value=window.form.getMainPinCoordinates()},onFormSubmit:e=>{window.upload(new FormData(window.elements.form),(()=>{t(),window.util.showSuccessMessage()}),window.util.onErrorLoad),e.preventDefault()},onFormResetButtonClick:e=>{e.preventDefault(),t()},onFormResetButtonEnterPress:e=>{"Enter"===e.key&&(e.preventDefault(),t())}}})(),(()=>{const e=()=>{window.elements.map.classList.remove("map--faded"),window.elements.form.classList.remove("ad-form--disabled"),window.form.enableFormElements(window.elements.formFieldsets),window.load(window.filter.onSuccessLoad,window.util.onErrorLoad,window.util.URL_LOAD),window.elements.mapPinMain.removeEventListener("mousedown",t),window.elements.mapPinMain.removeEventListener("keydown",o)},t=t=>{0===t.button&&e()},o=t=>{"Enter"===t.key&&e()};window.map={onMapPinMainMouseDownPress:t,onMapPinMainEnterPress:o,deactivateMap:()=>{window.elements.map.classList.add("map--faded"),window.elements.form.classList.add("ad-form--disabled"),window.form.disabledFormElements(window.elements.formFieldsets),window.form.disabledFormElements(window.elements.mapFilterFormSelects),window.pin.removePins(),window.card.removeCards(),window.pin.resetCurrent(),window.elements.mapPinMain.style.left=window.util.MAIN_PIN_START_COORDINATES.X+"px",window.elements.mapPinMain.style.top=window.util.MAIN_PIN_START_COORDINATES.Y+"px",window.form.updateAddressValue(),window.elements.mapPinMain.addEventListener("mousedown",window.map.onMapPinMainMouseDownPress),window.elements.mapPinMain.addEventListener("keydown",window.map.onMapPinMainEnterPress)}}})(),window.move={onMouseDown:e=>{e.preventDefault();const{left:t,top:o}=document.querySelector(".map").getBoundingClientRect(),n=e=>{e.preventDefault();const n=e.clientY-o-window.util.MAIN_PIN_CENTER,r=e.clientX-t-window.util.MAIN_PIN_CENTER;n>window.util.PIN_COORDS.MIN_Y&&n<window.util.PIN_COORDS.MAX_Y&&(window.elements.mapPinMain.style.top=n+"px"),r<window.util.PIN_COORDS.MAX_X&&r>window.util.PIN_COORDS.MIN_X&&(window.elements.mapPinMain.style.left=r+"px"),window.form.updateAddressValue()},r=e=>{e.preventDefault(),document.removeEventListener("mousemove",n),document.removeEventListener("mouseup",r),window.form.updateAddressValue()};document.addEventListener("mousemove",n),document.addEventListener("mouseup",r)}},window.map.deactivateMap(),window.elements.form.addEventListener("change",window.form.onFormChange),window.elements.mapPinMain.addEventListener("mousedown",window.move.onMouseDown),window.elements.form.addEventListener("submit",window.form.onFormSubmit),window.elements.formResetButton.addEventListener("keydown",window.form.onFormResetButtonEnterPress),window.elements.formResetButton.addEventListener("click",window.form.onFormResetButtonClick),window.elements.mapFilterForm.addEventListener("change",window.debounce(window.filter.onMapFilterFormChange)),window.message.createMessage(window.util.MESSAGE_ELEMENT.ERROR_WINDOW),window.message.createMessage(window.util.MESSAGE_ELEMENT.SUCCESS_WINDOW)})();