<template>
<div>
    <v-menu
        ref="menu"
        v-model="menu"
        :close-on-content-click="false"
        :return-value.sync="date"
        transition="scale-transition"
        offset-y
        min-width="auto"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="date"
            :label="_label"
            prepend-icon="mdi-calendar"
            readonly
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker
          v-model="date"
          no-title
          :allowed-dates="allowedDate"
          scrollable
        >
          <v-spacer></v-spacer>
          <v-btn
            text
            color="primary"
            @click="menu = false"
          >
            Cancel
          </v-btn>
          <v-btn
            text
            color="primary"
            @click="$refs.menu.save(date)"
          >
            OK
          </v-btn>
        </v-date-picker>
      </v-menu>
      
      </div>
</template>

<script>
export default {
    
    props: ["value", "label", "openDays"],
    data: () =>({
        date: null,
        menu: false
    }),

    mounted() {
        this.date = this.value || (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)
        this.$emit('input', this.date)
        this.$emit('change', this.date)
    },

    computed: {
        _label() {
            return this.label || "Date"
        }
    },

    watch: {
        date() {
            this.$emit('input', this.date)
            this.$emit('change', this.date)
        }
    },

    methods: {

        checkDateIsLessThanNow(date) {
            let now = new Date((new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)).getTime()
            let d = date.getTime()
            return d < now
        },

      allowedDate(val) {
          let d = new Date(val)
          if (this.checkDateIsLessThanNow(d)) return false
          return this.openDays[d.getDay()]
      } 
    }
}
</script>

<style lang="scss" scoped>

</style>