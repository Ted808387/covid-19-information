export let view = (function() {
    let Dom = {
        sidebar: '.sidebar-content',
        main: '.main',
        mainArray: '.main-content>.main-card',
        Cards: '.sidebar-content>.sidebar-card',
    };
    return {
        getInfo: function() {
            return {
                Card: document.querySelector(Dom.sidebar),
                mainCountry: document.querySelector(Dom.main),
                Cards: document.querySelectorAll(Dom.Cards),
            };
        },
        change: function(getData, data) {
            getData.Card.insertAdjacentHTML('afterbegin', `<div class="sidebar-card"><h4>Global</h4>
            <div class="card_content">
                <div class="card-left">
                    <p>Total:</p>
                    <p>deaths:</p>
                </div>
                <div class="card-right">
                    <p>${data.Global.TotalConfirmed}</p>
                    <p>${data.Global.TotalDeaths}</p>
                </div>
            </div></div>`);
        },
        getCountry: function(getData, Country) {
            for(let i = 0; i < Country.length; i++) {
                getData.Card.insertAdjacentHTML('beforeend', `<div class="sidebar-card"><h4>${Country[i].Country}</h4>
                <div class="card_content">
                    <div class="card-left">
                        <p>Total:</p>
                        <p>deaths:</p>
                    </div>
                    <div class="card-right">
                        <p>${Country[i].TotalConfirmed}</p>
                        <p>${Country[i].TotalDeaths}</p>
                    </div>
                </div></div>`);
            }
        },
        changeDisplay: function(countryName, countryData) {
            document.querySelector(Dom.main).childNodes[1].childNodes[1].textContent = countryName;
            let mainCards = [...document.querySelectorAll(Dom.mainArray)];
            for(let i = 0; i < mainCards.length; i++) {
                mainCards[i].childNodes[3].textContent = countryData[i];
            }
        },
    };
})();