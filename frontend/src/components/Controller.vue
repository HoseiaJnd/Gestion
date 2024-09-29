<template>
  <div>
    <!-- Barre d'application avec les boutons -->
    <v-app-bar rounded>
      <template v-slot:prepend>
        <v-speed-dial location="bottom center" transition="slide-y-transition">
          <template v-slot:activator="{ props: activatorProps }" style="margin-left: 5%;">
            <v-fab v-bind="activatorProps" size="large" icon="$menu"></v-fab>
          </template>
          <div style="margin-top: 10%;">
            <!-- Boutons pour changer de composant -->
            <v-btn key="1" variant="outlined" @click="setActiveComponent('matiere')">Insert matiere</v-btn>
            <v-btn key="2" variant="outlined" @click="setActiveComponent('coutDirect')">Insert cout direct</v-btn>
            <v-btn key="3" variant="outlined" @click="setActiveComponent('resultats')">Resultats</v-btn>
          </div>
        </v-speed-dial>
      </template>
      <v-app-bar-title style="margin-left: 5%;">Gestion</v-app-bar-title>
    </v-app-bar>

    <!-- Affichage dynamique des composants -->
    <v-main>
      <Matiere v-if="activeComponent === 'matiere'" />
      <CoutDirect v-if="activeComponent === 'coutDirect'" />
      <Resultats v-if="activeComponent === 'resultats'" />
    </v-main>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// Déclaration d'une variable réactive pour suivre quel composant est actif
const activeComponent = ref('matiere');

// Fonction pour changer le composant affiché
const setActiveComponent = (componentName) => {
  activeComponent.value = componentName;
};
</script>

