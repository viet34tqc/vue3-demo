<script setup>
import { openWeatherAPIKey } from "@/constants";
import { axiosInstance } from "@/core/axios";
import { ref } from "vue";
import { useRouter } from "vue-router";
import CityCard from "./CityCard.vue";

const trackedCities = ref([]);
const getCities = async () => {
  if (!localStorage.getItem("trackedCities")) return;
  trackedCities.value = JSON.parse(localStorage.getItem("trackedCities"));

  const requests = trackedCities.value.map((city) =>
    axiosInstance.get("https://api.openweathermap.org/data/2.5/weather", {
      params: {
        lat: city.coords.lat,
        lon: city.coords.lng,
        appid: openWeatherAPIKey,
        units: "imperial",
      },
    })
  );

  const weatherData = await Promise.all(requests);

  weatherData.forEach((value, index) => {
    trackedCities.value[index].weather = value;
  });
};
await getCities();

const router = useRouter();
const goToCityView = (city) => {
  router.push({
    name: "cityView",
    params: { state: city.state, city: city.city },
    query: {
      id: city.id,
      lat: city.coords.lat,
      lng: city.coords.lng,
    },
  });
};
</script>
<template>
  <div v-for="city in trackedCities" :key="city.id">
    <CityCard :city="city" @click="goToCityView(city)" />
  </div>

  <p v-if="trackedCities.length === 0">
    No locations added. To start tracking a location, search in the field above.
  </p>
</template>
