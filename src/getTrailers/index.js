const axios = require('axios')
const movieTrailer = require('movie-trailer')

const getViaplayMovieDetails = async (movieUrl) => {
    const res = await axios.get(movieUrl)
    return res.data
}

const makeResponseObject = (statusCode, body) => ({
    statusCode,
    body,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    }
})

exports.handler = async (event) => {
    try {
        const viaplayLink = event.queryStringParameters.viaplayLink;
        const movieDetails = await getViaplayMovieDetails(viaplayLink)
        const movieName = movieDetails._embedded["viaplay:blocks"][0]._embedded["viaplay:product"].content.title
        const productionYear = movieDetails._embedded["viaplay:blocks"][0]._embedded["viaplay:product"].content.production.year
    
        const res = await movieTrailer(movieName, {multi: true, year: productionYear})
        return makeResponseObject(200, JSON.stringify(res))
    } catch (error) {
        return makeResponseObject(500, JSON.stringify({ message: 'Internal server error' }))
    }
}