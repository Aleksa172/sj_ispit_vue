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
    }
}