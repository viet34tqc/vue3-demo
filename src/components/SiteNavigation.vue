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
};
</script>

<template>
  <header class="sticky top-0 bg-weather-primary shadow-lg z-10">
    <nav
      class="container flex flex-col sm:flex-row items-center gap-4 text-white py-6"
    >
      <RouterLink :to="{ name: 'home' }">
        <div class="flex items-center gap-3">
          <p class="text-2xl">The Local Weather</p>
        </div>
      </RouterLink>

      <div class="flex gap-3 flex-1 justify-end">
        <button class="border py-1 px-3 rounded-sm" @click="toggleModal">
          Guide
        </button>
        <button class="border py-1 px-3 rounded-sm" @click="trackCity">
          Track city
        </button>
      </div>

      <BaseModal :modalActive="modalActive" @close-modal="toggleModal">
        <div class="text-black">
          <h1 class="text-2xl mb-1">About:</h1>
          <p class="mb-4">
            The Local Weather allows you to track the current and future weather
            of cities of your choosing.
          </p>
          <h2 class="text-2xl">How it works:</h2>
          <ol class="list-decimal list-inside mb-4">
            <li>
              Search for your city by entering the name into the search bar.
            </li>
            <li>
              Select a city within the results, this will take you to the
              current weather for your selection.
            </li>
            <li>
              Track the city by clicking on the "+" icon in the top right. This
              will save the city to view at a later time on the home page.
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
