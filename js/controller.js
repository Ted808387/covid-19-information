import { model } from './model.js';
import { view } from './view.js';

let controller = (function(model, view) {
    let getDom = view.getInfo();
    let data = model.data();
    let init = function() {
        view.changeDisplay('Global', model.intoData(data.data.Global));
    };
    
    let mainChange = function(country) {
        data.Country.forEach((item) => {
            if(item.Country === country) {
                view.changeDisplay(country, model.intoData(item));
            } else if(country === 'Global') {
                init();
            }
        });
    };
    let changeMain = function() {
        let getDom = view.getInfo(); // 還未get到api資料，所以這邊再重新獲取
        let Cards = getDom.Cards;
        let arrayCard = [...Cards];
        arrayCard.forEach((card) => {
            card.addEventListener('click', () => {mainChange(card.childNodes[0].textContent);});
        });  
    };
    let xhr = new XMLHttpRequest();
    xhr.open('get', 'https://api.covid19api.com/summary', true);
    xhr.setRequestHeader('Content-type','application/json');
    xhr.send();
    xhr.onreadystatechange = function() {
        if(this.readyState === 4 && this.status === 200) {
            data.data = JSON.parse(xhr.responseText);
            view.change(getDom, data.data);
            model.getCountry();
            view.getCountry(getDom, data.Country);
            changeMain();
            init();
        }
    };
})(model, view);