'use strict'

let getSel = sel => document.querySelector(sel);

getSel('#searchBtn').onclick = function () {
    getSel('.flexDiv').innerHTML='';
    let searchValue = getSel('.searchArea').value;
    getData(searchValue);
}

function getData(searchValue) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `http://www.omdbapi.com/?s=${searchValue}&page=2&apikey=42b85753`, false);
    xhr.send();
    const data = JSON.parse(xhr.responseText);
    for (let i = 0; i <= 7; i++) {
        getSel('.flexDiv').innerHTML += ` <div class="box">
        <div class="forImage"><img src=${data.Search[i].Poster}></img></div>
        <h5 class="title">${data.Search[i].Title}</h5>
        <p class="type">${data.Search[i].Type}</p>
        <p class="year">${data.Search[i].Year}</p>
        <button id = "${data.Search[i].imdbID} " data-toggle="modal" data-target="#exampleModal" onclick = "btnClick(${i})" class="btnMore info${i}">View More</button>
        </div>`;
    }
}

function btnClick(i) {
    let filmInfo = getSel(`.info${i}`).getAttribute('id');
    const xhrInfo = new XMLHttpRequest();
    xhrInfo.open('GET', `http://www.omdbapi.com/?i=${filmInfo}&plot=full&apikey=42b85753`, false);
    xhrInfo.send();
    const dataInfo = JSON.parse(xhrInfo.responseText);
    getSel('.forPoster').style.backgroundImage = `url(${dataInfo.Poster})`;
    getSel('.infoTitle').innerHTML = `${dataInfo.Title}`;
    getSel('.infoGenre').innerHTML = `${dataInfo.Genre}`;
    getSel('.infoDescription').innerHTML = `${dataInfo.Plot}`;
    getSel('.writtenBy').innerHTML = `${dataInfo.Writer}`;
    getSel('.directedBy').innerHTML = `${dataInfo.Director}`;
    getSel('.starring').innerHTML = `${dataInfo.Actors}`;
    getSel('.boxOffice').innerHTML = `${dataInfo.BoxOffice}`;
    getSel('.awards').innerHTML = `${dataInfo.Awards}`;
    for (let rate = 0; rate < dataInfo.Ratings.length; rate++) {
        getSel('.ratings').innerHTML = `${dataInfo.Ratings[rate].Source} : ${dataInfo.Ratings[rate].Value}; <br> `;
    }
}

