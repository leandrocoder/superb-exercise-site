<template>
  <div class="form">
    <h1>Restaurant</h1>
    <h3>Booking</h3>

	<p>{{form}}</p>

    <div>
        <input v-model="form.name" placeholder="Name"></input><br>
        <input v-model="form.phone" placeholder="Phone number"></input><br>
        <input v-model="form.people" type="number" placeholder="Number of people"></input><br>
        <input v-model="form.date" placeholder="Date"></input><br>
    </div>

	<diV>
		<button v-for="h in availableHours" :key="h" @click="form.hour=h" :style="form.hour==h ? 'border-style:inset;' : ''">{{h}}</button>
	</diV>

    <button @click="onClickCancel">Cancel</button>
    <button @click="onClickSave" :disabled="!canSubmit">Apply</button>

  </div>
</template>

<script>
export default {
  name: 'Form',
  data: () =>({
      form: {
          name: "",
          phone: "",
          people: 1,
          date: null,
          hour: null
      },
	  availableHours: []
  }),

	mounted() {
		this.$store.commit('booking', null)
		this.form.date = (new Date()).toJSON().slice(0, 10).split`-`.join`/`;
	},

	computed: {
		canSubmit() {
			if (this.form.name.trim().length == 0) return false
			if (this.form.phone.trim().length == 0) return false
			let people = parseInt(this.form.people)
			if (isNaN(people) || people < 1) return false
			if (this.form.date.trim().length == 0) return false
			if (!this.form.hour) return false
			return true
		}
	},

	methods: {

		onClickCancel() {
			this.$router.push('/')
		},

		onSelectHour(e) {
			console.log(e.target)
		},

		async submitData() {
			this.$store.commit('booking', this.form)
		},

		async onClickSave() {
			await this.submitData()
			this.$router.push('/result')
		},

		async searchAvailableHours() {
			console.log('find hours')
			this.form.hour = null
			// Find tables based on date
			this.availableHours = [
				'12:00', '13:00', '14:00', '16:00'
			]
		}
	},

	watch: {
		'form.date'(val) { this.searchAvailableHours() }
		//form: { handler(val) { this.onFormChanged() }, deep: true }
	}
}
</script>
