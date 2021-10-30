<!--
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
-->

<template>
  <div class="page">
    <div class="maincontent">
      <div style="height:700px; margin-top:4rem">
        <h1>RESTAURANT</h1>
        <h4>Booking</h4>
        <v-card-text class="form">
			<v-text-field label="Name" v-model="form.name"></v-text-field>
			<v-text-field label="Phone Number" v-model="form.phone"></v-text-field>
			<v-text-field label="Number of chairs" v-model="form.chairs"></v-text-field>
			<v-text-field label="Date" v-model="form.date"></v-text-field>
			<p>Available Hours</p>
			<diV class="d-flex justify-center flex-wrap">
				<div :class="{'hourbox':true, 'hourboxactive':form.hour==h}" v-for="h in hours" :key="h" @click="form.hour=h">{{h}}</div>
			</diV>
        </v-card-text>
		<v-card-actions class="mt-6">
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
export default {
  name: 'Form',
  data: () =>({
      form: {
          name: "",
          phone: "",
          chairs: 1,
          date: null,
          hour: null
      },
	  hours: []
  }),

	mounted() {
		this.$store.commit('booking', null)
		this.form.date = (new Date()).toJSON().slice(0, 10).split`-`.join`/`;
	},

	computed: {
		canSubmit() {
			if (this.form.name.trim().length == 0) return false
			if (this.form.phone.trim().length == 0) return false
			let chairs = parseInt(this.form.chairs)
			if (isNaN(chairs) || chairs < 1) return false
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
			for (let i = 0; i < 10; i++) {
				let t = ((i < 9) ? `0${i}` : i) + ':00'
				this.hours.push(t)
			}
		}
	},

	watch: {
		'form.date'(val) { this.searchAvailableHours() }
		//form: { handler(val) { this.onFormChanged() }, deep: true }
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
</style>
