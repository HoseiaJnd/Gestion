<template>
  <div style="display: flex; justify-content: center; width: 50%; margin-left: 25%;">
    <div>
      <p style="text-align: center;" class="text-h3">Matière</p>
      <v-data-table :items="dataMatiere" style="border-radius: 10px; overflow: hidden;"></v-data-table>
    </div>
  </div>
  <div style="display: flex; justify-content: center; width: 50%; margin-left: 25%; margin-top: 2%;">
    <div style="margin-right: 20px;">
      <p style="text-align: center;" class="text-h3">Repartition</p>
      <v-data-table :items="dataRepartition" style="border-radius: 10px; overflow: hidden;"></v-data-table>
    </div>
    <div>
      <p style="text-align: center;" class="text-h3">Cout Direct</p>
      <v-data-table :items="dataCoutDirect" style="border-radius: 10px; overflow: hidden;"></v-data-table>
    </div>
  </div>
  <div style="display: flex; justify-content: center; width: 50%; margin-left: 25%; margin-top: 2%;">
    <div>
      <p style="text-align: center;" class="text-h3">Cout Fini</p>
      <v-data-table :items="dataCoutFini" style="border-radius: 10px; overflow: hidden;"></v-data-table>
    </div>
  </div>

</template>

<script>
export default {
  data() {
    return {
      dataCoutFini: null,
      dataCoutDirect: null,
      dataRepartition: null,
      dataMatiere: null
    }
  },
  methods: {
    async recupererEtStockerDonnees(apiUrl, cle) {
      try {
        const reponse = await fetch(apiUrl);
        if (!reponse.ok) {
          throw new Error(`Erreur HTTP: ${reponse.status}`);
        }
        const donnees = await reponse.json();

        // Stocker les données dans le state du composant
        this[cle] = donnees;

        // Stocker les données dans le localStorage
        localStorage.setItem(cle, JSON.stringify(donnees));

        console.log(`Données ${cle} récupérées et stockées avec succès`);
        return donnees;
      } catch (erreur) {
        console.error(`Erreur lors de la récupération des données ${cle}:`, erreur);
        throw erreur;
      }
    }
  },
  async created() {
    try {
      await this.recupererEtStockerDonnees('http://localhost:3000/api/dataCoutFini', 'dataCoutFini');
      await this.recupererEtStockerDonnees('http://localhost:3000/api/dataCoutDirect', 'dataCoutDirect');
      await this.recupererEtStockerDonnees('http://localhost:3000/api/dataRepartition', 'dataRepartition');
      await this.recupererEtStockerDonnees('http://localhost:3000/api/dataMatiere', 'dataMatiere');
    } catch (erreur) {
      console.error('Erreur lors de la récupération des données:', erreur);
    }
  }
}
</script>

