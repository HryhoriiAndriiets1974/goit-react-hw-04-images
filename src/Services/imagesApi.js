import axios from 'axios';

const API_KEY = '27420856-25c3041aa641ff2b15189544b';

axios.defaults.baseURL = 'https://pixabay.com/api/';

function fetch(query, currentPage = 1, imgPerPage = 15) {
  return  axios.get(`?q=${query}&page=${currentPage}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=${imgPerPage}`)
          .then(response => response.data.hits);
}

const imagesApi = { fetch };

export default imagesApi;
