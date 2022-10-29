<script setup>
import CityList from "@/components/CityList/CityList.vue";
import {
  mapboxAPIKey,
  NO_SEARCH_RESULT_MESS,
  SEARCH_ERROR_MESS,
} from "@/constants";
import { axiosInstance } from "@/core/axios";
import { debounce } from "@/utilities";
import { ref, toRaw } from "vue";
import { useRouter } from "vue-router";
const searchQuery = ref("");
const searchResult = ref([]);
const searchError = ref(null);
const loading = ref(false);

const fetchData = debounce(async () => {
  try {
    const result = await axiosInstance.get(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${searchQuery.value}.json?access_token=${mapboxAPIKey}&types=place`
    );
    searchResult.value = result.features;
  } catch (error) {
    searchError.value = true;
  }
  loading.value = false;
});
const handleInput = () => {
  if (!searchQuery.value) return;
  loading.value = true;
  fetchData();
};

const router = useRouter();
const viewCityInfo = (data) => {
  const [city, state] = toRaw(data).place_name.split(",");
  router.push({
    name: "cityView",
    params: { state: state.replaceAll(" ", ""), city: city },
    query: {
      lat: toRaw(data).geometry.coordinates[1],
      lng: toRaw(data).geometry.coordinates[0],
      preview: true,
    },
  });
};
</script>

<template>
  <main class="container text-white">
    <div class="pt-4 mb-8 relative">
      <input
        type="text"
        v-model="searchQuery"
        @input="handleInput"
        placeholder="Search for a city or state"
        class="py-2 px-1 w-full bg-transparent border-b focus:border-weather-secondary focus:outline-none"
      />
      <p class="py-2" v-if="searchError">
        {{ SEARCH_ERROR_MESS }}
      </p>
      <p
        class="py-2"
        v-if="
          !searchError && searchQuery && !loading && searchResult.length === 0
        "
      >
        {{ NO_SEARCH_RESULT_MESS }}
      </p>
      <ul
        class="absolute bg-weather-secondary text-white w-full shadow-md py-2 px-1 top-[66px] z-10"
        v-if="searchQuery && !loading && searchResult.length >= 0"
      >
        <li
          v-for="item in searchResult"
          :key="item.id"
          class="py-2 cursor-pointer"
          @click="viewCityInfo(item)"
        >
          {{ item.place_name }}
        </li>
      </ul>
    </div>

    <!-- Citi list -->
    <div class="flex flex-col gap-4">
      <Suspense>
        <CityList />
        <template #fallback>
          <main class="container">Loading...</main>
        </template>
      </Suspense>
    </div>
  </main>
</template>

<style lang="scss" scoped></style>
