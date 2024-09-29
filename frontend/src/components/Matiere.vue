<template>
  <div class="matiere-container">
    <div class="matiere-content scale-appear" style="background-color: #ECF8F6; color: black; width: 50%; margin-top: -10%;">
      <h1>Insertion Matière</h1>
      <form @submit.prevent="submitForm">
        <v-text-field v-model="state.rubrique" :error-messages="v$.rubrique.$errors.map(e => e.$message)"
          label="Rubrique" required @blur="v$.rubrique.$touch" @input="v$.rubrique.$touch"></v-text-field>

        <v-text-field v-model="state.total" type="number" :error-messages="v$.total.$errors.map(e => e.$message)"
          label="Total valeur" required @blur="v$.total.$touch" @input="v$.total.$touch"></v-text-field>

        <v-text-field v-model="state.unite" :error-messages="v$.unite.$errors.map(e => e.$message)"
          label="Unité d'oeuvre" required @blur="v$.unite.$touch" @input="v$.unite.$touch"></v-text-field>

        <v-select v-model="state.nature" :items="[{value: 'v', title: 'Variable'}, {value: 'f', title: 'Fixe'}]"
          :error-messages="v$.nature.$errors.map(e => e.$message)" label="Nature" required
          @blur="v$.nature.$touch" @change="v$.nature.$touch"></v-select>

        <v-text-field v-model="state.adm_dist" type="number" :error-messages="v$.adm_dist.$errors.map(e => e.$message)"
          label="ADM/DIST (%)" @blur="v$.adm_dist.$touch" @input="v$.adm_dist.$touch"></v-text-field>

        <v-text-field v-model="state.usine" type="number" :error-messages="v$.usine.$errors.map(e => e.$message)"
          label="Usine (%)" @blur="v$.usine.$touch" @input="v$.usine.$touch"></v-text-field>

        <v-text-field v-model="state.prod" type="number" :error-messages="v$.prod.$errors.map(e => e.$message)"
          label="Production (%)" @blur="v$.prod.$touch" @input="v$.prod.$touch"></v-text-field>

        <v-btn width="45%" class="me-4" type="submit" style="margin-left: 4%;" variant="elevated">
          Ajouter
        </v-btn>
        <v-btn width="45%" class="me-4" @click="clear" variant="outlined">
          Effacer
        </v-btn>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required, numeric } from '@vuelidate/validators'
import axios from '../axiosConfig'
import router from '../routes/router'

const state = reactive({
  rubrique: '',
  total: 0,
  unite: '',
  nature: 'v',
  adm_dist: 0,
  usine: 0,
  prod: 0
})

const rules = {
  rubrique: { required },
  total: { required, numeric },
  unite: { required },
  nature: { required },
  adm_dist: { numeric },
  usine: { numeric },
  prod: { numeric }
}

const v$ = useVuelidate(rules, state)

async function submitForm() {
  const isFormCorrect = await v$.value.$validate()
  if (isFormCorrect) {
    try {
      const response = await axios.post('/api/matiere/insert', {
        rubrique: state.rubrique,
        total: state.total,
        unite: state.unite,
        nature: state.nature,
        adm_dist: state.adm_dist,
        usine: state.usine,
        prod: state.prod
      })
      console.log('Réponse du serveur:', response.data)
      alert('Matière ajoutée avec succès');
      console.log('Matière ajoutée avec succès');
      // router.push('/cout-direct')
    } catch (error) {
      console.error('Erreur lors de la soumission du formulaire:', error)
      alert('Erreur lors de la soumission du formulaire')
    }
  }
}

function goToCoutDirect(param) {
  window.location.href = param
}

function clear() {
  state.rubrique = ''
  state.total = 0
  state.unite = ''
  state.nature = 'v'
  state.adm_dist = 0
  state.usine = 0
  state.prod = 0
  v$.value.$reset() // Réinitialise les validations si nécessaire
}
</script>

<style scoped>
.matiere-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

.matiere-content {
  padding: 20px;
}
</style>
