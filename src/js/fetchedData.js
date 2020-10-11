export default{

    search: "",
    page: 1,
    key: '18591857-af67bc0007236afb4a9ddb74e',

    pixabayFetch (){
        let params = [
            `image_type=photo`,
            `orientation=horizontal`,
            `q=${this.search}`,
            `page=${this.page}`,
            `per_page=12`,
            `key=${this.key}`
        ]

        let url = `https://pixabay.com/api/?` + params.join('&')

        return fetch(url)
            .then(data => data.json())
            .then(data => {
                this.incrementPage()
                return data
            })
            .catch(error => console.log(error))
    },

    resetPage(){
        this.page = 1;
    },

    incrementPage(){
        this.page += 1;
    }
} 