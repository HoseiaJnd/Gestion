<template>
  <div class="cout-direct-container">
    <div class="cout-direct-content" style="background-color: #ECF8F6; color: black; margin-top: -10%;">

      <h1>Cout Direct</h1>

      <form @submit.prevent="submitForm">
        <v-text-field v-model="state.unite" :counter="10" :error-messages="v$.unite.$errors.map(e => e.$message)"
          label="Unité" required @blur="v$.unite.$touch" @input="v$.unite.$touch"></v-text-field>

        <v-text-field v-model="state.unite_usine" :counter="10"
          :error-messages="v$.unite_usine.$errors.map(e => e.$message)" label="Unité d'usine" required
          @blur="v$.unite_usine.$touch" @input="v$.unite_usine.$touch"></v-text-field>

        <v-text-field v-model="state.nombre" type="number" :error-messages="v$.nombre.$errors.map(e => e.$message)"
          label="Nombre" required @blur="v$.nombre.$touch" @input="v$.nombre.$touch"></v-text-field>

        <v-text-field v-model="state.nombre_fini" type="number"
          :error-messages="v$.nombre_fini.$errors.map(e => e.$message)" label="Nombre fini" required
          @blur="v$.nombre_fini.$touch" @input="v$.nombre_fini.$touch"></v-text-field>

        <v-btn width="45%" class="me-4" type="submit" style="margin-left: 2%;" variant="elevated">
          Soumettre
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
import axios from '../axiosConfig';

const initialState = {
  unite: '',
  unite_usine: '',
  nombre: '',
  nombre_fini: '',
}

const state = reactive({
  ...initialState,
})

const rules = {
  unite: { required },
  unite_usine: { required },
  nombre: { required, numeric },
  nombre_fini: { required, numeric },
}

const v$ = useVuelidate(rules, state)

function clear() {
  v$.value.$reset()

  for (const [key, value] of Object.entries(initialState)) {
    state[key] = value
  }
}

async function submitForm() {
  const isFormCorrect = await v$.value.$validate()
  if (isFormCorrect) {
    try {
      const response = await axios.post('/api/cout-direct/insert', {
        unite: state.unite,
        unite_usine: state.unite_usine,
        nombre: state.nombre,
        nombre_fini: state.nombre_fini
      });
      console.log('Réponse du serveur:', response.data);
      // Gérez la réponse ici (par exemple, affichez un message de succès)
    } catch (error) {
      console.error('Erreur lors de la soumission du formulaire:', error);
      // Gérez l'erreur ici (par exemple, affichez un message d'erreur)
    }
  }
}
</script>

  <style scoped>
  .cout-direct-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
  }

  .cout-direct-content {
    width: 100%;
    max-width: 500px;
    /* Ajustez cette valeur selon vos besoins */
    padding: 20px;
  }
  </style>
