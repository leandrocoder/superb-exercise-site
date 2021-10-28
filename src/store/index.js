import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    booking: {
      date: '2021/10/28',
      hour: '14:00'
    }
  },
  getters: {
    date: state => state.booking.date,
    hour: state => state.booking.hour,
    day:state => new Date(state.booking.date).getDate(),
    dayName(state) {
      let d = new Date(state.booking.date)
      console.log(d.getDay())
      let names = [
        'Monday',
        'Tuesday', 
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday'
      ]
      return names[d.getDay() - 1]
    }
  },
  mutations: {
    booking (state, payload) {
      state.booking = payload
    }
  },

})
