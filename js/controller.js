import { model } from './model.js';
import { view } from './view.js';

let controller = (function(model, view) {
    let getDom = view.getInfo();
    let data = model.data();
    let init = function() {
        view.changeDisplay('Global', model.intoData(data.data.Global));
        getArray('https://api.covid19api.com/world', 'Global');
    };

    let chart = new Chart(getDom.ctx, {
        type: 'line',
        data: {
            labels: data.historyTime,
            datasets: [{
                label: 'Covid-19 Total death',
                borderColor: '#fc1919',
                borderWidth: '3',
                hoverBackgroundColor: '#fc1919',
                hoverBorderColor: 'black',
                data: data.historyDeaths, // 丟入參數
                },{
                label: 'Covid-19 Total cases',
                borderColor: '#00caca',
                borderWidth: '3',
                hoverBackgroundColor: '#00caca',
                hoverBorderColor: 'black',
                data: data.historyCases,
                }
            ]
        },
        options: {
            legend:{ 
                fontColor: 'blue', 
            }, 
            scales: { 
                xAxes: [{ 
                    ticks: {
                        fontColor: 'black',
                    },
                    display: true, 
                }], 
                yAxes: [{ 
                    ticks: {
                        fontColor: 'black',
                        beginAtZero: true 
                    },
                    display: true,
                }], 
            },  
        },
    });
    getDom.ctx.fillStyle = 'black';
      
    var getArray = function(url, kind) {
        fetch(url, { // 各國history
          method: 'get',
          headers: new Headers({
            'Content-Type': 'text/json'
          })
        }).then(function(response) {
          return response.json(); // return資料，再用jsonData接收
        }).then((jsonData) => { // 資料送出到這
            data.worldHistory = jsonData;
            model.getWorldHistory(kind);
            chart.data.datasets[0].data = data.historyDeaths;
            chart.data.datasets[1].data = data.historyCases;
            chart.update();
        }).catch(function(err) {
            console.log(err);
        });
    };

    let mainChange = function(country) {
        if(country !== 'Global') {
            data.Country.forEach((item) => {
                if(item.Country === country) {
                    view.changeDisplay(country, model.intoData(item));
                    getArray(`https://api.covid19api.com/total/dayone/country/${country}`, country);
                }
            }); 
        } else {
            init();
        }
    };
    let changeMain = function() {
        let getDom = view.getInfo(); // 還未get到api資料，所以這邊再重新獲取
        let Cards = getDom.Cards;
        let arrayCard = [...Cards];
        arrayCard.forEach((card) => {
            card.addEventListener('click', () => {mainChange(card.childNodes[0].textContent);});
        });  
    };

    let promise = new Promise((resolve, reject) => {
        model.getTime();
        resolve(); // 更新chart時間
    });
    promise.then(() => {
        // console.log(555)
    });

    getDom.search.addEventListener('input', function(e) {
        let searchCountry = data.Country.filter((item) => {
            return String(item.Country.toLowerCase()).indexOf(e.srcElement.value.toLowerCase()) === 0;
        }); // 轉換成小寫，只要輸入大小寫都適用
        getDom.Card.innerHTML = '';
        if(e.srcElement.value) {
            view.getCountry(getDom, searchCountry);
        } else {
            view.change(getDom, data.data);
            view.getCountry(getDom, data.Country);
        }
        changeMain();
    })

    let xhr = new XMLHttpRequest();
    xhr.open('get', 'https://api.covid19api.com/summary', true);
    xhr.setRequestHeader('Content-type','application/json');
    xhr.send();
    xhr.onreadystatechange = function() {
        if(this.readyState === 4 && this.status === 200) {
            data.data = JSON.parse(xhr.responseText);
            view.change(getDom, data.data);
            model.getCountry();
            // promise;
            // model.getTime(); // 更新chart時間
            view.updateTime(data.updateTime);
            view.getCountry(getDom, data.Country);
            changeMain();
            init();
        }
    };
})(model, view);