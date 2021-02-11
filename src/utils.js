const DJANGO_LINK = 'http://localhost'

export default {
    getGameInfoLink(gameId) {
        return DJANGO_LINK+'/games/'+gameId
    }
}