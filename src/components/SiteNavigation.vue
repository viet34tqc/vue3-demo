<script setup>
import { ref } from "vue";
import { RouterLink, useRoute } from "vue-router";
import BaseModal from "./BaseModal.vue";
const modalActive = ref(false);
const toggleModal = () => {
  modalActive.value = !modalActive.value;
};

const route = useRoute();
const trackCity = () => {
  let nextTrackedCities = [];
  if (localStorage.getItem("trackedCities")) {
    nextTrackedCities = JSON.parse(localStorage.getItem("trackedCities"));
  }

  // Check if the city is already on the list
  const isTrackedAlready = nextTrackedCities.some(
    (city) => city.id === `${route.params.state}-${route.params.city}`
  );
  if (isTrackedAlready) {
    alert("This city is already on the list");
    return;
  }

  const locationObj = {
    id: `${route.params.state}-${route.params.city}`,
    state: route.params.state,
    city: route.params.city,
    coords: {
      lat: route.query.lat,
      lng: route.query.lng,
    },
  };

  nextTrackedCities.push(locationObj);
  localStorage.setItem("trackedCities", JSON.stringify(nextTrackedCities));
  alert("City added to the list successfully");
};
</script>

<template>
  <header class="sticky top-0 bg-weather-primary shadow-lg z-10">
    <nav
      class="container flex flex-col sm:flex-row items-center gap-4 text-white py-6"
    >
      <RouterLink :to="{ name: 'home' }">
        <div class="flex items-center gap-3">
          <p class="text-2xl">Vue3 Demo</p>
        </div>
      </RouterLink>

      <div class="flex gap-3 flex-1 justify-end">
        <button class="border py-1 px-3 rounded-sm" @click="toggleModal">
          Guide
        </button>
        <button
          class="border py-1 px-3 rounded-sm"
          @click="trackCity"
          v-if="route.query.preview"
        >
          Track city
        </button>
      </div>

      <BaseModal :modalActive="modalActive" @close-modal="toggleModal">
        <div class="text-black">
          <h1 class="text-2xl mb-1">About:</h1>
          <p class="mb-4">
            This is an relatively simple demo of Vue 3. You can look for the
            weather of the cities and also track the city
          </p>
          <h2 class="text-2xl">How it works:</h2>
          <ol class="list-decimal list-inside mb-4">
            <li>
              Search for your city by entering the name into the search bar.
            </li>
            <li>
              Select a city within the results, click to view weather detail of
              that city.
            </li>
            <li>
              Track the city by clicking on the "Track" button in the top right.
              This will save the city to view at a later time on the home page.
            </li>
          </ol>

          <h2 class="text-2xl">Removing a city</h2>
          <p>
            If you no longer wish to track a city, simply select the city within
            the home page. At the bottom of the page, there will be am option to
            delete the city.
          </p>
        </div>
      </BaseModal>
    </nav>
  </header>
</template>

<style lang="scss" scoped></style>
