
const TOKEN ="42c43deed5f144e68f6ce0421b4cb488"

export function getFilmsBySearchedText(text, page) {
    const url =  "https://api.themoviedb.org/3/search/movie?api_key="+TOKEN+"&language=fr&query="+text+"&page="+page
    return fetch(url)
           .then((response) => response.json())
           .catch((error) => console.log(error))
}


export function getImageFromApi(name) {
  return 'https://image.tmdb.org/t/p/w300' + name
}

export function getFilmDetailFromApi (id) {
  return fetch('https://api.themoviedb.org/3/movie/' + id + '?api_key=' + TOKEN + '&language=fr')
    .then((response) => response.json())
    .catch((error) => console.error(error));
}