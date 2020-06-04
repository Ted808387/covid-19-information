import './change.js';
import './controller.js';

// API 各國紀錄 : https://disease.sh/v2/historical?lastdays=30  
// API 全球紀錄 : https://disease.sh/v2/historical/all?lastdays=30
// 來源 : https://disease.sh/

// let Card = document.querySelector('.sidebar-content');
// let mainCountry = document.querySelector('.main');

// let allCountry = []; // 全部城市
// let firstCountry = []; // 前幾名城市

// let change = function() {
//     Card.insertAdjacentHTML('afterbegin', `<div class="sidebar-card"><h4>Global</h4>
//     <div class="card_content">
//         <div class="card-left">
//             <p>Total:</p>
//             <p>deaths:</p>
//         </div>
//         <div class="card-right">
//             <p>${data.Global.TotalConfirmed}</p>
//             <p>${data.Global.TotalDeaths}</p>
//         </div>
//     </div></div>`);
// };

// let getCountry = function() {
//     allCountry = data.Countries;
//     allCountry.sort((a, b) => {
//         return b.TotalConfirmed - a.TotalConfirmed; 
//     });
//     // console.log(allCountry);
//     for(let i = 0; i < 4; i++) { // 將前四個病歷多數國家篩選出
//         firstCountry.push(allCountry[i]);
//     }
//     // console.log(firstCountry);
//     for(let i = 0; i < firstCountry.length; i++) {
//         Card.insertAdjacentHTML('beforeend', `<div class="sidebar-card"><h4>${firstCountry[i].Country}</h4>
//         <div class="card_content">
//             <div class="card-left">
//                 <p>Total:</p>
//                 <p>deaths:</p>
//             </div>
//             <div class="card-right">
//                 <p>${firstCountry[i].TotalConfirmed}</p>
//                 <p>${firstCountry[i].TotalDeaths}</p>
//             </div>
//         </div></div>`);
//     }
// };

// let mainChange = function(country) {
//     firstCountry.forEach((item) => {
//         mainCountry.childNodes[1].childNodes[1].textContent = country;
//         // if(item.Country === country) {
//         //     mainCountry.childNodes[1].innerText = country;
//         // } else {
//         //     mainCountry.childNodes[1].innerText = country;
//         // }
//     });
// };

// let changeMain = function() {
//     let Cards = document.querySelectorAll('.sidebar-content>.sidebar-card');
//     let arrayCard = [...Cards];
//     console.log(arrayCard);
//     arrayCard.forEach((card) => {
//         card.addEventListener('click', () => {mainChange(card.childNodes[0].textContent);});
//     });

// };

// let data = {};
// let xhr = new XMLHttpRequest();
// xhr.open('get', 'https://api.covid19api.com/summary', true);
// xhr.setRequestHeader('Content-type','application/json');
// xhr.send();
// xhr.onreadystatechange = function(model) {
//     if(this.readyState === 4 && this.status === 200) {
//         model.data.data = JSON.parse(xhr.responseText);
//         // console.log(data);
//         change();
//         getCountry();
//         changeMain();
//     }
// }
