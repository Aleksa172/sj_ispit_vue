<template>
    <div>
        <div>
            <h3> Most owned games </h3>
        </div>
        <Loader v-if="isLoading.mostOwnedGamesPoints"/>
        <JSCharting v-if="!isLoading.mostOwnedGamesPoints" :options="mostOwnedGamesPoints" :mutable="true" class="columnChart"></JSCharting>

        <hr/>
        <div>
            <h3> Least owned games </h3>
        </div>
        <Loader v-if="isLoading.leastOwnedGamesPoints"/>
        <JSCharting v-if="!isLoading.leastOwnedGamesPoints" :options="leastOwnedGamesPoints" :mutable="true" class="columnChart"></JSCharting>
        Get least owned {{leastOwnedGamesLimit}} games
        <b-form-input id="range-1" v-model="leastOwnedGamesLimit" type="range" min="2" max="15"></b-form-input>

        
    </div>
</template>

<script>
import JSCharting from 'jscharting-vue';
import Loader from '../components/Loader'

import api from '../api'
import utils from '../utils'


export default {
    components: {
        JSCharting,
        Loader
    },
    mounted() {
        api.mostOwnedGames().then((res) => {
            this.mostOwnedGamesData = res.data.data;
            this.isLoading.mostOwnedGamesPoints=false;
        })
        api.leastOwnedGames().then((res) => {
            this.leastOwnedGamesData = res.data.data;
            this.isLoading.leastOwnedGamesPoints=false;
        })
    },
    data(){
        return {
            
            isLoading: {
                mostOwnedGamesPoints: true,
                leastOwnedGamesPoints: true
            },
            mostOwnedGamesData: [],
            leastOwnedGamesData: [],
            leastOwnedGamesLimit: 5,
            name: 'columnChart',
        }
    },
    computed: {
        mostOwnedGamesPoints() {
            var apiData = this.mostOwnedGamesData;
            var data = [];
            for(var i=0; i<apiData.length; i++) {
                data.push({
                    x: apiData[i].name,
                    y: apiData[i].own_count,
                    gameId: apiData[i].id
                })
            }

            return {
                type: 'vertical column',
                legend: { template: '%icon,%name'},
                defaultPoint_events_click: function() { 
                    var url = utils.getGameInfoLink(this.userOptions.gameId);
                    var win = window.open(url, '_blank');
                    win.focus();
                },
                series: [{
                    legendEntry: { name: 'Owners' },
                    points: data
                }],
                legend_visible: true
            }
        },
        leastOwnedGamesPoints() {
            var apiData = this.leastOwnedGamesData;
            var data = [];
            for(var i=0; i<apiData.length; i++) {
                data.push({
                    x: apiData[i].name,
                    y: apiData[i].own_count,
                    gameId: apiData[i].id
                })
            }

            return {
                type: 'vertical column',
                legend: { template: '%icon,%name'},
                defaultPoint_events_click: function() { 
                    var url = utils.getGameInfoLink(this.userOptions.gameId);
                    var win = window.open(url, '_blank');
                    win.focus();
                },
                series: [{
                    legendEntry: { name: 'Owners' },
                    points: data
                }],
                legend_visible: true
            }
        }
    },
    watch: {
        leastOwnedGamesLimit(newVal) {
            this.isLoading.leastOwnedGamesPoints = true;
            api.leastOwnedGames(newVal).then((res) => {
                this.leastOwnedGamesData = res.data.data;
                this.isLoading.leastOwnedGamesPoints=false;
            })
        }
    }
    
}
</script>