
require("dotenv").config();
const { API_KEY } = process.env;


const GetAllTv = async (request, response) => {

    const { genreId } = request.params;

    let moviesArray = []

    for(let i = 0; i < 30; i++) {
        const url = `https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=${i+1}${genreId ? `&with_genres=${genreId}` : ""}`;

const options = {
        method: 'GET',
        headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_KEY}`
        }
    };
    
    await fetch(url, options)
        .then(res => res.json())
        .then(json => {
            if (json.results && json.results.length  > 0) {
                const movies = json.results;
                moviesArray = [...moviesArray, ...movies]
                }
        })
        .catch(err => console.error('error:' + err));
    }
        const randomIndex = Math.floor(Math.random() * moviesArray.length);
        const randomMovie = moviesArray[randomIndex];
        response.status(200).json({ status: 200, data: randomMovie})
};


module.exports = { GetAllTv }