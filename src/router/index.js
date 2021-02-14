import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import GameStats from '../views/GameStats'
import AchievementStats from '../views/AchievementStats'
import PlayerStats from '../views/PlayerStats'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/gamestats',
    name: 'GameStats',
    component: GameStats
  },
  {
    path: '/achievements',
    name: 'AchievementStats',
    component: AchievementStats
  },
  {
    path: '/players',
    name: 'PlayerStats',
    component: PlayerStats
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
