import { defineStore } from "pinia";
import { ref } from "vue";

export const useCityStore = defineStore("city", () => {
  const trackedCities = ref([
    {
      id: "Vietnam-Ho Chi Minh City",
      state: "Vietnam",
      city: "Ho Chi Minh City",
      coords: {
        lat: "10.7758439",
        lng: "106.7017555",
      },
    },
    {
      id: "Vietnam-Hanoi",
      state: "Vietnam",
      city: "Hanoi",
      coords: {
        lat: "21.0294498",
        lng: "105.8544441",
      },
    },
  ]);

  function addCity(city) {
    trackedCities.value.push(city);
  }
  function deleteCity(cityId) {
    trackedCities.value = trackedCities.value.filter(
      (city) => city.id !== cityId
    );
  }

  return { trackedCities, addCity, deleteCity };
});
