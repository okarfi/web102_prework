/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {

    // loop over each item in the data
    for (let i = 0; i < games.length; i++)
    {
        
        // create a new div element, which will become the game card
        const new_div = document.createElement("div");

        // add the class game-card to the list
        new_div.classList.add("game-card");

        // set the inner HTML using a template literal to display some info 
        // about each game
        // TIP: if your images are not displaying, make sure there is space
        // between the end of the src attribute and the end of the tag ("/>")
        let img = games[i]["img"];
        let name = games[i]["name"];
        let desc = games[i]["description"];
        let backers = games[i]["backers"];
        new_div.innerHTML = `<div>
            <img src =${img} class="game-img">
            <h3>${name}</h3>
            <p>${desc}<p/>
            <p><b>Backers: ${backers}<b/><p/>
            <div\>
            `;

        // append the game to the games-container
        gamesContainer.appendChild(new_div);
    }
}

// call the function we just defined using the correct variable
// later, we'll call this function using a different list of games
addGamesToPage(GAMES_JSON);

/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers
let individualBackers = GAMES_JSON.reduce( (total_backers, GAMES_JSON) => {
    return total_backers + GAMES_JSON.backers;
}, 0);

// set the inner HTML using a template literal and toLocaleString to get a number with commas
contributionsCard.innerHTML = individualBackers.toLocaleString();

// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");

let totalRaised = GAMES_JSON.reduce( (total_raised, GAMES_JSON) => {
    return total_raised + GAMES_JSON.pledged;
}, 0);

// set inner HTML using template literal
raisedCard.innerHTML = totalRaised.toLocaleString();

// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");

let numberOfGames = GAMES_JSON.reduce( (num_of_games, GAMES_JSON) => {
    return num_of_games + 1;
}, 0);

gamesCard.innerHTML = numberOfGames.toLocaleString();

/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have not yet met their goal
    let unfundedGames = GAMES_JSON.filter((GAMES_JSON) => {
        return GAMES_JSON.pledged - GAMES_JSON.goal < 0;
    });

    // use the function we previously created to add the unfunded games to the DOM
    addGamesToPage(unfundedGames);
}

// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have met or exceeded their goal
    let fundedGames = GAMES_JSON.filter((GAMES_JSON) => {
        return GAMES_JSON.pledged - GAMES_JSON.goal >= 0;
    });


    // use the function we previously created to add unfunded games to the DOM
    addGamesToPage(fundedGames);
}

// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);

    // add all games from the JSON data to the DOM
    addGamesToPage(GAMES_JSON);

}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button
unfundedBtn.addEventListener("click", filterUnfundedOnly);
fundedBtn.addEventListener("click", filterFundedOnly);
allBtn.addEventListener("click", showAllGames);


/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
let numOfUnfundedGames = GAMES_JSON.reduce( (sum, GAMES_JSON) => {
    if (GAMES_JSON.pledged - GAMES_JSON.goal < 0)
        return sum + 1;
    else
        return sum;
}, 0);


// create a string that explains the number of unfunded games using the ternary operator
const msgStrToReqFunding = 
    `A total of $${totalRaised.toLocaleString()} has been raised for ${numberOfGames}.
    Currently, ${numOfUnfundedGames} ${numOfUnfundedGames == 1 ? 'game' : 'games'} remains unfunded. We need your help to fund these amazing games!`;

// create a new DOM element containing the template string and append it to the description container
const msgToReqFunding = document.createElement("div");
msgToReqFunding.innerHTML =`<div><p>${msgStrToReqFunding}<p/><div/>`;
descriptionContainer.appendChild(msgToReqFunding);

/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});

// use destructuring and the spread operator to grab the first and second games
let [firstGame, secondGame] = sortedGames;

// create a new element to hold the name of the top pledge game, then append it to the correct element
const topPledgedGame = document.createElement("div");
topPledgedGame.innerHTML = `<div> <p> ${firstGame.name} <p/> <div/>`;
firstGameContainer.appendChild(topPledgedGame);


// do the same for the runner up item
const secondTopPledgedGame = document.createElement("div");
secondTopPledgedGame.innerHTML = `<div> <p> ${secondGame.name} <p/> <div/>`;
secondGameContainer.appendChild(secondTopPledgedGame);