export let model = (function() {
    let data = {
        data: {},
        Country: [], // 全部城市
        firstCountry: [], // 前幾名城市
        chartData: {}, // chart歷史資料
        // cases: [], // 全球歷史確診
        // deaths: [], // 全球歷史死亡
        
        worldHistory: [], //全球資料歷史
        historyData: [], // 各國歷史資料
        historyCases: [], // 歷史確診
        historyDeaths: [], // 歷史死亡
        historyTime: [], // 時間
        updateTime: '', // 更新時間
    };
    let initHistoryData = function() {
        data.historyCases = [];
        data.historyDeaths = [];
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
    let getTime = function() {
        fetch(`https://api.covid19api.com/country/taiwan`, { // 各國history
            method: 'get',
            headers: new Headers({
            'Content-Type': 'text/json'
            })
        })
        .then(function(response) {
            return response.json();
        }).then((jsonData) => {
            let timeSort = jsonData;
            data.updateTime = timeSort[timeSort.length - 1].Date;
            timeSort.sort((a, b) => {
                return a.TotalConfirmed - b.TotalConfirmed;               
            });
            let newData = timeSort.filter((item, index, array) => {
                return array.indexOf(item) >= (array.length - 10);
            });
            newData.forEach((item) => {
                data.historyTime.push(item.Date.substr(5, 5));
            });
        }).catch(function(err) {
            console.log(err);
        })
    };
    let getWorldHistory = function(kind) {
        data.worldHistory.sort((a, b) => {
            return a.TotalConfirmed - b.TotalConfirmed;                 
        });
        data.historyData = data.worldHistory.filter((item, index, array) => {
            return array.indexOf(item) >= (array.length - 10); // 各國過濾用
        })
        if(kind === 'Global') {
            initHistoryData();
            data.historyData.forEach((item) => {
                data.historyCases.push(item.TotalConfirmed);
                data.historyDeaths.push(item.TotalDeaths);
            });
            data.historyData = [];
        } else {
            initHistoryData();
            data.historyData.forEach((item) => {
                data.historyCases.push(item.Confirmed);
                data.historyDeaths.push(item.Deaths);
            });
            data.historyData = [];
        }
    }
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
        getWorldHistory: function(kind) {
            getWorldHistory(kind);
        },
        getTime: function() {
            getTime();
        },
    };
})();