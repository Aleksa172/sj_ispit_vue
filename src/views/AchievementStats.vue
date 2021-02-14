<template>
    <div>
        <h3> Gaining achievements - Most active days </h3>
        <div>
            <b-button @click="choosePreviousMonth"> &lt; Previous month </b-button>
                {{ selectedMonthFormat }} 
            <b-button @click="chooseNextMonth"> Next month &gt; </b-button>
        </div>
        <Loader v-if="isLoading.popularAchievementDates"/>
        <JSCharting v-if="!isLoading.popularAchievementDates" :options="popularAchievementDatesPoints" :mutable="true"></JSCharting>
        <hr/>
        <h3> Hardest 
            <select v-model="hardestAchievementLimit">
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
                <option>6</option>
                <option>7</option>
                <option>8</option>
                <option>9</option>
                <option>10</option>
                <option>11</option>
                <option>12</option>
                <option>13</option>
                <option>14</option>
                <option>15</option>
            </select>
            achievements to come by </h3>
        <Loader v-if="isLoading.hardestAchievements"/>
        <div v-if="!isLoading.hardestAchievements">
            <b-table-simple>
                <b-thead>
                    <b-tr>
                        <b-th>Achievement</b-th>
                        <b-th>Game</b-th>
                        <b-th>Times achieved</b-th>
                    </b-tr>
                </b-thead>
                <b-tbody>
                    <b-tr v-for="row in hardestAchievementsPoints" :key="row.id">
                        <b-td>{{ row.name }}</b-td>
                        <b-td>{{ row.game_name }} 
                            <a :href="row.url" target='_blank'><b-icon-link45deg></b-icon-link45deg></a>
                            
                        </b-td>
                        <b-td>{{ row.obtained_count }}</b-td>
                    </b-tr>
                </b-tbody>
            </b-table-simple>
        </div>
    </div>
</template>

<script>
import JSCharting from 'jscharting-vue';
import Loader from '../components/Loader'
import moment from 'moment'

import api from '../api'
import utils from '../utils'

export default {
     components: {
        JSCharting,
        Loader
    },
    mounted() {
        api.mostPopularAchievementDates().then((res) => {
            this.popularAchievementDatesData = res.data.data;
            this.isLoading.popularAchievementDates=false;
        })
        api.hardestAchievements(this.hardestAchievementLimit).then((res) => {
            this.hardestAchievementData = res.data.data;
            this.isLoading.hardestAchievements=false;
        })
    },
    methods: {
        choosePreviousMonth() {
            if(this.selectedMonth==1) {
                this.selectedYear--;
                this.selectedMonth=12;
                return;
            }
            this.selectedMonth--;
        },
        chooseNextMonth() {
            if(this.selectedMonth==12) {
                this.selectedYear++;
                this.selectedMonth=1;
                return;
            }
            this.selectedMonth++;
        }

    },
    data() {
        return {
            // Selected month pocinje od sadasnjosti
            selectedMonth: moment().get('month')+1,
            selectedYear: moment().get('year'),
            isLoading: {
                popularAchievementDates: true,
                hardestAchievements: true
            },
            hardestAchievementLimit: 5,
            popularAchievementDatesData: [],
            hardestAchievementData: [],
            name: 'columnChart',
        }
    },
    computed: {
        selectedMonthFormat() {
            var currentDate = moment();
            currentDate.set('month', this.selectedMonth-1);
            currentDate.set('year', this.selectedYear);
            return currentDate.format('MMMM YYYY')
        },
        popularAchievementDatesPoints() {
            var apiData = this.popularAchievementDatesData;

            var data = [];
            var colors = ['#b0f5c3','#5be380','#00f543']


            // Prvo pronalazimo najvecu kolicinu achievementa dobijenu u mesecu
            var max = 0;
            for(var i=0; i<apiData.length; i++) {
                if(apiData[i].achievements_obtained>max) {
                    max = apiData[i].achievements_obtained;
                }
            }

            for(var i=0; i<apiData.length; i++) {
                // date je od-do po defaultu, pa dva puta stavljamo isti datum
                var date = utils.dateFormatToChart(apiData[i].date);
                // color proracunavamo u odnosu na najveci podatak
                // 0% - 32% - prva boja iz colors
                // 33% - 65% - druga boja iz colors
                // 66% - 100% - treca boja iz colors
                var positionInData = apiData[i].achievements_obtained/max;
                var colorInd = Math.floor((positionInData*100)/33)
                // Pokrivamo slucajeve 99% i 100%
                if(colorInd>2) {
                    colorInd=2;
                }
                // z vrednost se moze koristiti za formatiranje tooltipa - zato broj achievementa stavljamo tamo
                data.push({
                    date: [date, date],
                    color: colors[colorInd],
                    z: apiData[i].achievements_obtained
                })
            }

            var endCalendarMonth = this.selectedMonth+1;
            var endCalendarYear  = this.selectedYear;
            if(endCalendarMonth>12) {
                endCalendarMonth=1;
                endCalendarYear++;
            }

            return {
                type: 'calendar month solid',
                calendar_range: [`${this.selectedMonth}/1/${this.selectedYear%100}`, `${endCalendarMonth}/1/${endCalendarYear%100}`],
                defaultPoint: {
                    label: { verticalAlign: 'top', padding: 3 },
                    tooltip: '<b>{%date:date D}</b><br> %zValue achievements obtained'
                },
                series: [
                    {
                        points: data
                    }
                ]
            }
        },
        hardestAchievementsPoints() {
            var apiData = this.hardestAchievementData;
            var data = [];

            // ovde nema neke velike potrebe za prepakivanjem podataka
            for(var i=0; i<apiData.length; i++) {
                data.push({
                    id: apiData[i].id,
                    name: apiData[i].name,
                    game_id: apiData[i].game_id,
                    game_name: apiData[i].game_name,
                    obtained_count: apiData[i].obtained_count,
                    url: utils.getGameInfoLink(apiData[i].game_id)
                })
            }

            return data;
        }
    },
    watch: {
            selectedMonth(newVal) {
                this.isLoading.popularAchievementDates=true;
                api.mostPopularAchievementDates(this.selectedMonth, this.selectedYear).then((res) => {
                    this.popularAchievementDatesData = res.data.data;
                    this.isLoading.popularAchievementDates=false;
                })
            },
            hardestAchievementLimit(newVal) {
                this.isLoading.hardestAchievements=true;
                api.hardestAchievements(this.hardestAchievementLimit).then((res) => {
                    this.hardestAchievementData = res.data.data;
                    this.isLoading.hardestAchievements = false;              
                })
            }
        }
}
</script>