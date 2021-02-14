<template>
    <div>
        <h3> Top 5 players - by game count </h3>
        <Loader v-if="isLoading.playersWithMostGames"/>
        <div v-if="!isLoading.playersWithMostGames">
            <b-table-simple>
                <b-thead>
                    <b-tr>
                        <b-th>#</b-th>
                        <b-th>Username</b-th>
                        <b-th>Games owned</b-th>
                    </b-tr>
                </b-thead>
                <b-tbody>
                    <b-tr v-for="(row,idx) in playersWithMostGamesPoints" :key="row.id">
                        <b-td> {{idx+1}}. </b-td>
                        <b-td>{{ row.username }} 
                            <a :href="row.url" target='_blank'><b-icon-link45deg></b-icon-link45deg></a>
                        </b-td>
                        <b-td>{{ row.owned_games }} </b-td>
                    </b-tr>
                </b-tbody>
            </b-table-simple>
        </div>

        <hr/>

        <h3> Top 5 players - by achievement count </h3>
        <Loader v-if="isLoading.playersWithMostAchievements"/>
        <div v-if="!isLoading.playersWithMostAchievements">
            <b-table-simple>
                <b-thead>
                    <b-tr>
                        <b-th>#</b-th>
                        <b-th>Username</b-th>
                        <b-th>Achievement count</b-th>
                    </b-tr>
                </b-thead>
                <b-tbody>
                    <b-tr v-for="(row,idx) in playersWithMostAchievementsPoints" :key="row.id">
                        <b-td> {{idx+1}}. </b-td>
                        <b-td>{{ row.username }} 
                            <a :href="row.url" target='_blank'><b-icon-link45deg></b-icon-link45deg></a>
                        </b-td>
                        <b-td>{{ row.achievement_count }} </b-td>
                    </b-tr>
                </b-tbody>
            </b-table-simple>
        </div>

    </div>
</template>

<script>
import Loader from '../components/Loader'

import api from '../api'
import utils from '../utils'

export default {
    components: {
        Loader
    },
    mounted() {
        api.playersWithMostGames().then((res) => {
            this.playersWithMostGamesData = res.data.data;
            this.isLoading.playersWithMostGames = false;
        })
        api.playersWithMostAchievements().then((res) => {
            this.playersWithMostAchievementsData = res.data.data;
            this.isLoading.playersWithMostAchievements = false;
        })
    },
    data() {
        return {
            isLoading: {
                playersWithMostGames: true,
                playersWithMostAchievements: true
            },
            playersWithMostGamesData: [],
            playersWithMostAchievementsData: []
        }
    },
    computed: {
        playersWithMostGamesPoints() {
            var apiData = this.playersWithMostGamesData;
            var data = [];

            // ovde nema neke velike potrebe za prepakivanjem podataka
            for(var i=0; i<apiData.length; i++) {
                data.push({
                    id: apiData[i].id,
                    username: apiData[i].username,
                    owned_games: apiData[i].owned_games,
                    url: utils.getPlayerInfoLink(apiData[i].id)
                })
            }

            return data;
        },
        playersWithMostAchievementsPoints() {
            var apiData = this.playersWithMostAchievementsData;
            var data = [];

            // ovde nema neke velike potrebe za prepakivanjem podataka
            for(var i=0; i<apiData.length; i++) {
                data.push({
                    id: apiData[i].id,
                    username: apiData[i].username,
                    achievement_count: apiData[i].achievement_count,
                    url: utils.getPlayerInfoLink(apiData[i].id)
                })
            }

            return data;
        }
    }
}
</script>