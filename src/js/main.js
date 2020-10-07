import pixabayFetch from './pixabay'
import tplForm from '../templates/find-form.hbs'
import tplGallery from '../templates/gallery.hbs'
import tplButton from '../templates/load-more-btn.hbs'

const debounce = require('lodash.debounce');
const throttle = require('lodash.throttle');

const refs = {
    formPlaceholder: document.querySelector(".form-wrapper"),
    galleryPlaceholder: document.querySelector(".gallery"),
    controlsPlaceholder: document.querySelector(".controls")
}

let queryObject = {
    search: 1,
    page: 1
}

const marcupForm = tplForm();
refs.formPlaceholder.insertAdjacentHTML("beforeend", marcupForm)
const searchForm = document.querySelector("#search-form")

const marcupButton = tplButton();
refs.controlsPlaceholder.insertAdjacentHTML("beforeend", marcupButton)
const refLoadMoreBtn = document.querySelector(".js-load-more")

const callbackForButton = (event) =>{
    queryObject.page += 1;
    updateGallery(queryObject, event);
}
refLoadMoreBtn.addEventListener('click', throttle(callbackForButton, 300))

const callbackForInput = (event)=>{
    queryObject.search = event.target.value;
    updateGallery(queryObject, event)
}
searchForm.addEventListener("input", debounce(callbackForInput, 500))

const updateGallery = (obj, {type}) =>{
    const fromPixabay = pixabayFetch(obj);
    let isClean = false // если событие инпут перерисует галерею
    fromPixabay.then(data => {
        if (type === 'input'){
            isClean = true;
        }
        createGallery(data.hits, isClean)
        if(data.hits.length !== 0){
            refLoadMoreBtn.classList.remove("is-hidden");
        }
    })
}

const createGallery = (data, isClean) => {
    const marcupGallery = tplGallery(data);
    if(isClean){
        refs.galleryPlaceholder.innerHTML = marcupGallery;
    }else{
        refs.galleryPlaceholder.insertAdjacentHTML("beforeend", marcupGallery);
    }
    window.scrollTo({
        top: document.documentElement.offsetHeight,
        behavior: 'smooth'
    });
}