require("dotenv").config();
const { API_KEY } = process.env;


const GetGenres = async (request, response) => {

    const url = 'https://api.themoviedb.org/3/genre/movie/list?language=en';
    const options = {
        method: 'GET', 
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${API_KEY}`
        }
    };

    fetch(url, options)
        .then(response => response.json())
        .then(json => {
        response.status(200).json({ status: 200, data: json})
        })
        .catch(err => console.error('error:' + err));
}



module.exports = { GetGenres }