<template>
  <div style="display: flex; justify-content: center; width: 50%; margin-left: 25%;">
    <div>
      <p style="text-align: center;" class="text-h3">Matière</p>
      <v-data-table :items="dataMatiere" style="border-radius: 10px; overflow: hidden;"></v-data-table>
      <v-btn-toggle v-model="text" color="deep-purple-accent-3" rounded="0" group>
        <v-btn @click="exportToCSV(dataMatiere, 'matiere')" value="left">Exporter en CSV</v-btn>
        <v-btn @click="exportToPDF(dataMatiere, 'Matière')" value="right">Exporter en PDF</v-btn>
      </v-btn-toggle>

    </div>
  </div>
  <div style="display: flex; justify-content: center; width: 50%; margin-left: 25%; margin-top: 2%;">
    <div style="margin-right: 20px;">
      <p style="text-align: center;" class="text-h3">Repartition</p>
      <v-data-table :items="dataRepartition" style="border-radius: 10px; overflow: hidden;"></v-data-table>
      <v-btn-toggle v-model="text" color="deep-purple-accent-3" rounded="0" group>
        <v-btn @click="exportToCSV(dataRepartition, 'repartition')" value="left">Exporter en CSV</v-btn>
        <v-btn @click="exportToPDF(dataRepartition, 'Répartition')" value="right">Exporter en PDF</v-btn>
      </v-btn-toggle>
    </div>
    <div>
      <p style="text-align: center;" class="text-h3">Cout Direct</p>
      <v-data-table :items="dataCoutDirect" style="border-radius: 10px; overflow: hidden;"></v-data-table>
      <v-btn-toggle v-model="text" color="deep-purple-accent-3" rounded="0" group>
        <v-btn @click="exportToCSV(dataCoutDirect, 'cout_direct')" value="left">Exporter en CSV</v-btn>
        <v-btn @click="exportToPDF(dataCoutDirect, 'Coût Direct')" value="right">Exporter en PDF</v-btn>
      </v-btn-toggle>
    </div>
  </div>
  <div style="display: flex; justify-content: center; width: 50%; margin-left: 25%; margin-top: 2%;">
    <div>
      <p style="text-align: center;" class="text-h3">Cout Fini</p>
      <v-data-table :items="dataCoutFini" style="border-radius: 10px; overflow: hidden;"></v-data-table>
      <v-btn-toggle v-model="text" color="deep-purple-accent-3" rounded="0" group>
        <v-btn @click="exportToCSV(dataCoutFini, 'cout_fini')" value="left">Exporter en CSV</v-btn>
        <v-btn @click="exportToPDF(dataCoutFini, 'Coût Fini')" value="right">Exporter en PDF</v-btn>
      </v-btn-toggle>
    </div>
  </div>

</template>

<script>
import jsPDF from 'jspdf'
import 'jspdf-autotable'

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
    },
    exportToCSV(data, filename) {
      if (!data || data.length === 0) {
        console.error('Aucune donnée à exporter');
        return;
      }

      const csvContent = this.convertToCSV(data);
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement("a");
      if (link.download !== undefined) {
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", filename + ".csv");
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    },
    convertToCSV(data) {
      const headers = Object.keys(data[0]);
      let csv = headers.join(',') + '\n';

      data.forEach(row => {
        csv += headers.map(header => {
          let cell = row[header] === null ? '' : row[header];
          cell = cell.toString().replace(/"/g, '""');
          if (cell.search(/("|,|\n)/g) >= 0) {
            cell = `"${cell}"`;
          }
          return cell;
        }).join(',');
        csv += '\n';
      });

      return csv;
    },
    exportToPDF(data, title) {
      if (!data || data.length === 0) {
        console.error('Aucune donnée à exporter');
        return;
      }

      const doc = new jsPDF();
      doc.text(title, 14, 15);

      const headers = Object.keys(data[0]);
      const rows = data.map(obj => headers.map(key => obj[key]));

      doc.autoTable({
        head: [headers],
        body: rows,
        startY: 20,
      });

      doc.save(title.toLowerCase().replace(/ /g, '_') + '.pdf');
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
