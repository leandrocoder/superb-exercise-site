<template>
  <div class="page">
    <div class="maincontent">
      <div style="height:700px; margin-top:4rem">
        <h1>RESTAURANT</h1>
        <h4>Booking</h4>
        <v-card-text class="form" :loading="loading">
			<v-text-field label="Name" v-model="form.name"></v-text-field>
			<v-text-field label="Phone Number" v-model="form.phone"></v-text-field>
			<v-text-field label="Number of chairs" v-model="form.chairs"></v-text-field>
			<!-- <v-text-field label="Date" v-model="form.date" @blur="searchAvailableHours"></v-text-field> -->
			<date-picker label="Date" :openDays="settings.openDays" v-model="form.date" @change="searchAvailableHours"></date-picker>
			<v-progress-circular
				v-if="loadingHours"
				indeterminate
				color="primary"
			></v-progress-circular>
			<div v-else>
				<p>Available Hours</p>
				<diV class="d-flex justify-center flex-wrap">
					<div :class="{'hourbox':true, 'hourboxactive':form.hour==h.time, 'hourboxdisabled': h.tables <= 0}" v-for="h in hours" :key="h.time" @click="form.hour=h.time">{{h.time}}</div>
				</diV>
			</div>
        </v-card-text>
		<v-card-actions class="mt-6"  v-if="!loading">
			<v-spacer />
			<v-btn to="/">Cancel</v-btn>
			<v-btn color="primary" @click="onClickSave" :disabled="!canSubmit">Apply</v-btn>
		</v-card-actions>
      </div>
    </div>
    <v-spacer />
    <div class="footer">
      <p>Made by Leandro Carlos</p>
    </div>
  </div>
</template>

<script>

import DatePicker from '../components/DatePicker.vue'
export default {
  name: 'Form',
  data: () =>({
	  loading: true,
	  loadingHours: false,
	  settings: {},
      form: {
          name: "",
          phone: "",
          chairs: 1,
          date: null,
          hour: null
      },
	  hours: []
  }),

	components: { DatePicker },

	async mounted() {
		this.$store.commit('booking', null)
		await this.loadSettings()
		await this.searchAvailableHours()
		this.loading = false
	},

	computed: {
		canSubmit() {
			if (this.form.name.trim().length == 0) return false
			if (this.form.phone.trim().length == 0) return false
			let chairs = parseInt(this.form.chairs)
			if (isNaN(chairs) || chairs < 1) return false
			if (!this.form.date || this.form.date.trim().length == 0) return false
			if (!this.form.hour) return false
			return true
		}
	},

	methods: {

		async loadSettings() {
			this.settings = await this.$rest.get('/settings')
		},

		onClickCancel() {
			this.$router.push('/')
		},

		async submitData() {
			await this.$rest.post('/queue', this.form)
			this.$store.commit('booking', this.form)
		},

		async onClickSave() {
			await this.submitData()
			this.$router.push('/result')
		},

		async searchAvailableHours() {
			this.form.hour = null
			let res = await this.$rest.get(`/hours/${this.form.date}`)
			this.hours = res
		}
	},

	watch: {
		'form.date'(val) { this.searchAvailableHours() }
	}
}
</script>

<style lang="scss" scoped>

.maincontent {
	height: 800px !important;
}

.form {
	width: 700px;
	max-width: calc(100vw - 4rem);
}
.hourbox {
	cursor: pointer;
	padding: 0.25rem 0.5rem;
	margin: 0.5rem;
	border: 1px solid #ccc;
}

.hourboxactive {
	background-color: #1976d2;
	border: 1px solid #1976d2;
	color: #fff;
}

.hourboxdisabled {
	pointer-events: none;
	background-color: #aaa;
	border: 1px solid #aaa;
	color: #fff;
}
</style>
