export let model = (function() {
    let data = {
        data: {},
        Country: [], // 全部城市
        firstCountry: [], // 前幾名城市
    };
    let allCountry = function() {
        data.Country = data.data.Countries;
        data.Country.sort((a, b) => {
            return b.TotalConfirmed - a.TotalConfirmed;
        });
    };
    let intoData = function(country) {
        let countryData = [];
        countryData.push(country.TotalConfirmed);
        countryData.push(country.TotalDeaths);
        countryData.push(country.TotalRecovered);
        countryData.push(country.NewConfirmed);
        countryData.push(country.NewDeaths);
        countryData.push(country.NewRecovered);
        return countryData;
    };
    return {
        getCountry: function() {
            allCountry();
        },
        data: function() {
            return data;
        },
        intoData: function(country) {
            return intoData(country);
        },
    };
})();