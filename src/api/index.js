import axios from 'axios'

const API_PATH = 'http://localhost:8081/api'

export default {
    mostOwnedGames: () => {
        return axios.get(API_PATH+'/most-owned-games');
    },
    leastOwnedGames: (limit) => {
        
        var apiParams = {};
        if(limit) {
            apiParams.limit = limit;
        }

        return axios.get(API_PATH+'/least-owned-games', {
            params: apiParams
        });
    },
    mostPopularAchievementDates: (selectedMonth, selectedYear) => {
        var apiParams = {};
        // Ako su prosledjena oba, samo ih onda uzimamo u obzir
        // a bice undefined (sto se tumaci kao false) ako nisu
        if(selectedMonth && selectedYear) {
            apiParams.month = selectedMonth;
            apiParams.year = selectedYear;
        }
        
        return axios.get(API_PATH+'/most-popular-dates-achievements', {
            params: apiParams
        });
    },
    hardestAchievements: (limit) => {
        var apiParams = {};
        if(limit) {
            apiParams.limit = limit;
        }

        return axios.get(API_PATH+'/hardest-achievements', {
            params: apiParams
        });
    },
    playersWithMostGames: () => {
        return axios.get(API_PATH+'/players-with-most-games')
    },
    playersWithMostAchievements: () => {
        return axios.get(API_PATH+'/players-with-most-achievements')
    }

}