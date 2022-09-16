const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '28931784-c1efcd868e1c004f8e87ba397';
const PER_PAGE = 12;

function fetchPictures(searchQuery, page) {
  const params = new URLSearchParams({
    q: searchQuery,
    page: page,
    key: API_KEY,
    per_page: PER_PAGE,
    image_type: 'photo',
    orientation: 'horizontal',
  });

  return fetch(`${BASE_URL}?${params}`).then(response => {
    if (response.ok) {
      return response.json();
    }

    return Promise.reject(new Error('Not a valid request'));
  });
}

const api = { fetchPictures };
export default api;
