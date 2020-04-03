'use strict'


function formatParams(params) {
    const queryItems = Object.keys(params).map(key => `${key}=${params[key]}`);
    console.log(queryItems);
    return queryItems.join('&');

}

function fetchParks(baseUrl, stateChoice, maxResults, apiKey) {
   
    const params = {
        stateCode: stateChoice,
        limit: maxResults
    }
    const queryStr = formatParams(params);
    const url = baseUrl+'?'+queryStr+'&api_key='+apiKey; 


    fetch(url)
    .then(response => {
        if (response.ok) {
            return response.json()
        }
        throw new Error(response.statusText)
    })
    .then(responseJson => displayResults(responseJson, maxResults))
    .catch(error => {
        $('.error-box').text(`Uh-oh! An error has occurred: ${error.message}`)
    });
}


function displayResults(responseJson, maxResults) {    
    $('.error-box').empty();
    $('.results-list').empty();
    if (responseJson.total === '0') {
        $('.search-results').append("<h3>No results found. Please try another search.</h3>")
    } else{
        for (let i = 0; i < responseJson.data.length & i < maxResults; i++) {
        $('.results-list').append(`<li><h2><a href="${responseJson.data[i].url}">${responseJson.data[i].fullName}</a></h2>
        <p>${responseJson.data[i].description}</p></li>`);

    }}
    
    $('.search-results').removeClass('hidden');
}


function formListener() {
    $('#form').on('submit', function() {
        event.preventDefault();
        const baseUrl = 'https://api.nps.gov/api/v1/parks'
        const stateChoice = $('.search-field').val().split(',');
        const maxResults = $('.number-of-results').val();
        const apiKey = 'PUdKj2OiMMJ5eQdSiTuSJif8ApzVSiXmHW3YYRv1';

        fetchParks(baseUrl, stateChoice, maxResults, apiKey);
    });
};

$(formListener);
