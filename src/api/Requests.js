const API_KEY = "0f40d57087f98d873cd93133fde816d5";

// movie/550?api_key={API_KEY}
// https://api.themoviedb.org/3/trending/all/week?api_key=${API_KEY}&language=en-US
// https://api.themoviedb.org/3/discover/movie?api_key=0f40d57087f98d873cd93133fde816d5&with_genres=27

const requests = {
    fetchTrending: `/trending/all/week?api_key=${API_KEY}`,
    fetchNetflixOriginals: `/discover/tv?api_key=${API_KEY}&with_networks=213`,
    fetchTopRated: `/movie/top_rated?api_key=${API_KEY}`,
    fetchActionMovies: `/discover/movie?api_key=${API_KEY}&with_genres=28`,
    fetchComedyMovies: `/discover/movie?api_key=${API_KEY}&with_genres=35`,
    fetchHorrorMovies: `/discover/movie?api_key=${API_KEY}&with_genres=27`,
    fetchRomanceMovies: `/discover/movie?api_key=${API_KEY}&with_genres=10749`,
    fetchDocumentaries: `/discover/movie?api_key=${API_KEY}&with_genres=99`,
}

export default requests;