import fetchedData from './fetchedData'
import tplForm from '../templates/find-form.hbs'
import tplGallery from '../templates/gallery.hbs'
import tplButton from '../templates/load-more-btn.hbs'
import tplLightbox from '../templates/light-box.hbs'

const basicLightbox = require('basiclightbox')

const debounce = require('lodash.debounce');
const throttle = require('lodash.throttle');

const refs = {
    formPlaceholder: document.querySelector(".form-wrapper"),
    galleryPlaceholder: document.querySelector(".gallery"),
    controlsPlaceholder: document.querySelector(".controls")
}

const marcupForm = tplForm();
refs.formPlaceholder.insertAdjacentHTML("beforeend", marcupForm)
const searchForm = document.querySelector("#search-form")

const marcupButton = tplButton();
refs.controlsPlaceholder.insertAdjacentHTML("beforeend", marcupButton)
const refLoadMoreBtn = document.querySelector(".js-load-more")

refs.galleryPlaceholder.addEventListener("click", (event) => {
    let url = event.target.dataset.source
    const instanceOfBasicLightbox = basicLightbox.create(
        tplLightbox({url})
    ).show()
})

refLoadMoreBtn.addEventListener('click', throttle(updateGallery, 300))

function callbackForInput (event){
    refs.galleryPlaceholder.innerHTML = "";
    fetchedData.search = event.target.value;
    updateGallery()
}
searchForm.addEventListener("input", debounce(callbackForInput, 500))

function updateGallery(){
    refLoadMoreBtn.classList.add("is-hidden");
    fetchedData.pixabayFetch().then(data => {
        refLoadMoreBtn.classList.remove("is-hidden");
        createGallery(data.hits)
        window.scrollTo({
            top: document.documentElement.offsetHeight,
            behavior: 'smooth'
        });
    })
}

function createGallery (data){
    const marcupGallery = tplGallery(data);
    refs.galleryPlaceholder.insertAdjacentHTML("beforeend", marcupGallery);
    refLoadMoreBtn.classList.remove("is-hidden");
}