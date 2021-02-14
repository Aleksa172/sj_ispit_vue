const DJANGO_LINK = 'http://localhost'

import moment from 'moment'


export default {
    getGameInfoLink(gameId) {
        return DJANGO_LINK+'/games/'+gameId
    },
    getPlayerInfoLink(userId) {
        return DJANGO_LINK+'/games/player/'+userId+'/games'
    },
    dateFormatToChart(dbdate) {
        return moment(dbdate).format("M/D/YY");
    }
}