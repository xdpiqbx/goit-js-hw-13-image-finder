import pixabayFetch from './pixabay'
import tplForm from '../templates/find-form.hbs'
import tplGallery from '../templates/gallery.hbs'
import tplButton from '../templates/load-more-btn.hbs'

const debounce = require('lodash.debounce');

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
refLoadMoreBtn.addEventListener('click', ()=>{

})

let queryObject = {
    search: "cat",
    page: 1
}

const updateGallery = (obj) =>{
    const fromPixabay = pixabayFetch(obj);
    fromPixabay.then(data => {
        console.log(data.hits)
        createGallery(data.hits)
        // if (data.hits.length > 0){// нарисовать кнопку если есть картинки
        //     setTimeout(()=>{ // если картинки ещё не успели подгрузится
        //         refLoadMoreBtn.classList.remove("is-hidden");
        //     }, 500)
        // }
    })
}

const callbackForInput = (event)=>{
    console.log(event.target.value)
    queryObject.search = event.target.value;
    updateGallery(queryObject)
}

searchForm.addEventListener("input", debounce(callbackForInput, 500))

const createGallery = data => {
    const marcupGallery = tplGallery(data);
    refs.galleryPlaceholder.insertAdjacentHTML("beforeend", marcupGallery)
}

//https://github.com/goitacademy/javascript-homework/tree/master/homework-13