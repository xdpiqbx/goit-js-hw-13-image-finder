//Your API key: 18591857-af67bc0007236afb4a9ddb74e
//https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=что_искать&page=номер_страницы&per_page=12&key=твой_ключ
const key = '18591857-af67bc0007236afb4a9ddb74e'
let search = "cat"
let page = 1
let queryString = `image_type=photo&orientation=horizontal&q=${search}&page=${page}&per_page=12&key=${key}`
export default function pixabayFetch (){
    return fetch(`https://pixabay.com/api/?${queryString}`).then(data => data.json())
}