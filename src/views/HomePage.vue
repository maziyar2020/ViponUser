<template>
  <section class="resolved" v-if="!isLoading">
    <Navbar />

    <router-link :to="{ name: 'EditProfile' }" class="user-detail">
      <img
        :src="
          usersData.image ? usersData.image : '../assets/svg/user-vipon.svg'
        "
        alt=""
        class="user-detail__img"
        v-if="!uploadYourImage"
      />
      <img
        src="../assets/svg/user-vipon.svg"
        alt=""
        class="user-detail__img"
        v-if="uploadYourImage"
      />
      <div class="user-detail__info">
        <p>{{ usersData.first_name ? usersData.first_name : "نام" }}</p>
      </div>
      <div class="user-detail__location">
        <svg class="user-detail__location-svg" viewBox="0 0 24 24">
          <path
            d="M12 0c-4.198 0-8 3.403-8 7.602 0 4.198 3.469 9.21 8 16.398 4.531-7.188 8-12.2 8-16.398 0-4.199-3.801-7.602-8-7.602zm0 11c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3z"
          />
        </svg>
        <span class="user-detail__location--state">{{
          usersData.province ? usersData.province : "استان"
        }}</span>
        <i>/</i>
        <span class="user-detail__location--city">{{
          usersData.city ? usersData.city : "شهر"
        }}</span>
      </div>
    </router-link>
    <section class="events">
      <p class="events__title">آخرین رویدادها</p>
      <p v-if="!events.length" class="empty-events">
        هیچ رویداد جدیدی وجود ندارد
      </p>
      <Events
        v-for="event in events"
        :key="event.id"
        :type="event.type"
        :store="event.store"
        :time="event.created_at"
        :relation="event.relation_id"
        @click="handleNavigateEvents(event)"
      />
      <div
        class="event__load-more"
        v-if="events.length !== 0"
        @click="$router.push({ name: 'Notifications' })"
      >
        <span class="event__load-more-text">مشاهده همه</span>
      </div>
    </section>

    <section class="shops">
      <p class="shops__title">مشاهده فروشگاه</p>
      <Shop
        v-for="shop in shops"
        :key="shop.id"
        :img="shop.image"
        :store="shop.store"
        :store_en="shop.store_en"
        @click="handleNavigateShop(shop)"
      />
      <router-link :to="{ name: 'StoreShop' }">
        <p class="shop__load-more">مشاهده همه</p>
      </router-link>
    </section>
    <section class="score">
      <p class="score__title">امتیاز شما</p>
      <p class="score__blink eng-num">{{ usersData.point }}</p>
      <router-link
        :to="{ name: 'Upload' }"
        class="upload"
        v-if="uploadYourImage"
      >
        <div class="upload__image">
          <img
            src="../assets/svg/user-vipon.svg"
            alt=""
            class="upload__image"
          />
        </div>
        <i class="upload__divider"></i>
        <div class="upload__detail">
          <p>تصویر پروفایل خود را آپلود کنید</p>
          <p>
            <span class="upload__detail--gold">200</span>امتیاز جایزه بگیرید .
          </p>
        </div>
      </router-link>
    </section>
    <section class="rights">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        xml:space="preserve"
        width="600px"
        height="182px"
        version="1.1"
        style="
          shape-rendering: geometricPrecision;
          text-rendering: geometricPrecision;
          image-rendering: optimizeQuality;
          fill-rule: evenodd;
          clip-rule: evenodd;
        "
        viewBox="0 0 600 182"
        data-name="Layer 1"
        enable-background="new 0 0 450.824 450.824"
        class="rights__img"
      >
        <g id="Layer_x0020_1">
          <metadata id="CorelCorpID_0Corel-Layer" />
          <path
            class="fil0"
            d="M230.32 166.09l-12.93 0c-1.31,0 -2.61,-0.19 -3.89,-0.55 -2.48,-0.75 -4.45,-2.47 -5.9,-5.18 -1.31,-2.45 -1.97,-5.31 -1.97,-8.56 0,-3.15 0.59,-5.94 1.76,-8.36 1.28,-2.68 3.11,-4.5 5.48,-5.48 1.84,-0.75 3.73,-1.13 5.65,-1.13l11.72 0 0 5.61 -12.18 0c-1.98,0 -3.42,1.08 -4.31,3.22 -0.7,1.68 -1.05,3.87 -1.05,6.57 0,2.29 0.45,4.23 1.34,5.82 1.04,1.87 2.49,2.8 4.36,2.8l11.92 0 0 5.24zm32.73 -9.91c0,3.85 -1.54,6.57 -4.61,8.15 -2.28,1.17 -5.56,1.76 -9.83,1.76 -4.16,0 -7.49,-0.69 -10,-2.05 -3.21,-1.73 -4.82,-4.45 -4.82,-8.15l0 -19.06 7.41 0 0 18.13c0,2.29 0.82,3.95 2.47,4.97 1.2,0.76 2.69,1.13 4.48,1.13 3.04,0 5.13,-0.6 6.27,-1.8 0.98,-1.02 1.47,-2.54 1.47,-4.54l0 -17.89 7.16 0 0 19.35zm35.1 0.8c0,2.56 -0.85,4.72 -2.55,6.48 -1.7,1.75 -3.86,2.63 -6.48,2.63l-20.72 0 0 -5.24 17.07 0c1.15,0 2.11,-0.26 2.89,-0.8 0.9,-0.61 1.34,-1.46 1.34,-2.52 0,-2.5 -1.76,-3.75 -5.27,-3.75l-8.62 0c-2.48,0 -4.66,-0.76 -6.53,-2.29 -1.87,-1.54 -2.8,-3.48 -2.8,-5.85 0,-2.61 0.91,-4.73 2.74,-6.36 1.83,-1.63 4.23,-2.45 7.22,-2.45l19.79 0 0 5.03 -17.45 0c-0.78,0 -1.57,0.32 -2.36,0.97 -0.8,0.66 -1.2,1.43 -1.2,2.31 0,1 0.39,1.84 1.15,2.52 0.77,0.68 1.7,1.02 2.79,1.02l9.5 0c2.95,0 5.28,0.76 6.96,2.27 1.69,1.52 2.53,3.53 2.53,6.03zm29.51 -15.17l-10.93 0 0 24.36 -6.77 0 0 -24.36 -10.76 0 0 -4.98 28.46 0 0 4.98zm33.56 9.61c0,5.7 -1.58,9.78 -4.73,12.23 -2.57,1.99 -6.31,2.98 -11.22,2.98 -5.44,0 -9.45,-1.14 -12.05,-3.44 -2.84,-2.51 -4.27,-6.55 -4.27,-12.11 0,-4.55 1.27,-8.1 3.81,-10.64 2.76,-2.77 6.89,-4.15 12.39,-4.15 6.05,0 10.32,1.33 12.8,3.98 2.18,2.35 3.27,6.06 3.27,11.15zm-7.45 -0.17c0,-2.88 -0.69,-5.17 -2.05,-6.88 -1.54,-1.9 -3.81,-2.85 -6.82,-2.85 -2.96,0 -5.19,1.02 -6.7,3.06 -1.25,1.71 -1.88,3.93 -1.88,6.67 0,3.16 0.5,5.5 1.5,7 1.4,2.1 3.98,3.15 7.75,3.15 3.18,0 5.41,-1.02 6.69,-3.06 1.01,-1.59 1.51,-3.96 1.51,-7.09zm47.58 14.84l-6.32 0 0 -22.35 -8.29 22.35 -7.53 0 -8.54 -22.85 0 22.85 -6.11 0 0 -29.26 9.8 0 8.57 23.15 8.25 -23.15 10.17 0 0 29.26zm30.88 0l-14.27 0c-2.2,0 -4.32,-0.51 -6.36,-1.51 -2.2,-1.08 -3.88,-2.81 -5.04,-5.18 -1.16,-2.37 -1.74,-4.98 -1.74,-7.81 0,-2.81 0.56,-5.37 1.68,-7.65 1.22,-2.48 2.92,-4.29 5.1,-5.43 1.2,-0.62 2.35,-1.05 3.45,-1.3 1.1,-0.25 2.37,-0.38 3.79,-0.38l13.22 0 0 5.24 -12.22 0c-1.08,0 -2,0.14 -2.74,0.43 -0.74,0.28 -1.47,0.8 -2.19,1.54 -0.73,0.74 -1.23,1.46 -1.51,2.15 -0.28,0.7 -0.42,1.57 -0.42,2.61l19.25 0 0 5.23 -19.25 0c0,0.95 0.13,1.78 0.38,2.49 0.25,0.72 0.71,1.45 1.36,2.2 0.66,0.75 1.35,1.33 2.06,1.72 0.72,0.39 1.56,0.58 2.55,0.58l12.9 0 0 5.07zm34.27 0l-8.27 0 -7.6 -11.43 -7.9 0 0 11.43 -6.94 0 0 -29.26 21.42 0c2.43,0 4.44,0.95 6.03,2.82 1.59,1.88 2.38,4.1 2.38,6.66 0,2.03 -0.68,3.75 -2.05,5.18 -1.36,1.41 -3.09,2.31 -5.19,2.67l8.12 11.93zm-9.33 -20.07c0,-1.36 -0.51,-2.41 -1.53,-3.15 -1.01,-0.73 -2.39,-1.1 -4.12,-1.1l-8.79 0 0 8.16 9 0c1.31,0 2.48,-0.29 3.52,-0.87 1.28,-0.72 1.92,-1.74 1.92,-3.04zm51.05 20.07l-12.93 0c-1.31,0 -2.61,-0.19 -3.89,-0.55 -2.48,-0.75 -4.45,-2.47 -5.9,-5.18 -1.31,-2.45 -1.97,-5.31 -1.97,-8.56 0,-3.15 0.59,-5.94 1.76,-8.36 1.28,-2.68 3.11,-4.5 5.48,-5.48 1.84,-0.75 3.73,-1.13 5.65,-1.13l11.72 0 0 5.61 -12.18 0c-1.98,0 -3.42,1.08 -4.31,3.22 -0.7,1.68 -1.04,3.87 -1.04,6.57 0,2.29 0.44,4.23 1.33,5.82 1.04,1.87 2.49,2.8 4.36,2.8l11.92 0 0 5.24zm27.66 0l-10.58 0c-3.1,0 -5.58,-0.35 -7.45,-1.05 -2.37,-0.89 -4.08,-2.42 -5.11,-4.6 -0.39,-0.83 -0.66,-1.64 -0.81,-2.4 -0.16,-0.76 -0.23,-1.65 -0.23,-2.65l0 -18.56 7.53 0 0 18.3c0,0.84 0.1,1.57 0.29,2.2 0.2,0.62 0.55,1.24 1.05,1.86 0.7,0.88 1.5,1.47 2.43,1.75 0.92,0.28 2.09,0.42 3.51,0.42l9.37 0 0 4.73zm32.85 -9.91c0,3.85 -1.53,6.57 -4.6,8.15 -2.29,1.17 -5.56,1.76 -9.83,1.76 -4.16,0 -7.49,-0.69 -10,-2.05 -3.21,-1.73 -4.82,-4.45 -4.82,-8.15l0 -19.06 7.41 0 0 18.13c0,2.29 0.82,3.95 2.47,4.97 1.2,0.76 2.69,1.13 4.48,1.13 3.04,0 5.13,-0.6 6.27,-1.8 0.98,-1.02 1.47,-2.54 1.47,-4.54l0 -17.89 7.15 0 0 19.35zm31.26 2c0,2.2 -0.78,4.07 -2.34,5.6 -1.56,1.54 -3.45,2.31 -5.65,2.31l-19 0 0 -29.26 18.25 0c2.15,0 4.01,0.63 5.58,1.89 1.58,1.25 2.48,2.9 2.7,4.94 0.03,0.16 0.04,0.33 0.04,0.5 0,0.16 0,0.33 0,0.5 0,1.56 -0.37,2.94 -1.13,4.12 -0.75,1.19 -1.88,2.12 -3.39,2.78 1.54,0.56 2.75,1.41 3.62,2.56 0.88,1.14 1.32,2.49 1.32,4.06zm-7.95 -12.14c0,-1 -0.31,-1.87 -0.94,-2.59 -0.63,-0.73 -1.43,-1.09 -2.41,-1.09l-9.24 0 0 6.99 9.62 0.04c0.87,0 1.58,-0.33 2.14,-0.98 0.55,-0.66 0.83,-1.45 0.83,-2.37zm0.38 11.84c0,-0.97 -0.31,-1.82 -0.92,-2.53 -0.62,-0.71 -1.4,-1.06 -2.35,-1.06l-9.87 0 0 6.82 10.08 0c0.9,0 1.63,-0.32 2.2,-0.95 0.57,-0.62 0.86,-1.38 0.86,-2.28z"
          />
          <rect class="fil1" x="173.23" y="1.13" width="3.52" height="180.9" />
          <path
            class="fil2"
            d="M77.71 137.94l72.79 -73.84c3.12,8.38 4.85,17.44 4.92,26.9l-77.71 78.84 0 -31.9zm0 -92.48l26.92 -27.31c-8.32,-3.1 -17.31,-4.8 -26.69,-4.83l-0.23 0.24 0 31.9zm0 62.19l62.15 -63.06c-4.49,-6.01 -9.82,-11.35 -15.82,-15.85l-46.33 47.01 0 31.9z"
          />
          <path
            class="fil3"
            d="M4.93 64.1l72.78 73.84 0 31.9 -77.71 -78.84c0.07,-9.46 1.8,-18.52 4.93,-26.9zm72.78 -50.54l0 31.9 -26.92 -27.31c8.32,-3.1 17.31,-4.8 26.69,-4.83l0.23 0.24zm0 62.19l0 31.9 -62.15 -63.06c4.49,-6.01 9.82,-11.35 15.82,-15.85l46.33 47.01z"
          />
          <path
            class="fil4"
            d="M296.78 22.33l-38.28 79.85 -19.93 0 -37.25 -79.85 21.76 0 25.86 60.6 26.08 -60.6 21.76 0zm24.03 79.62l-21.3 0 0 -79.62 21.3 0 0 79.62zm92.61 -53.25c0,7.04 -2.72,13.04 -8.17,18.02 -5.43,4.95 -11.92,7.44 -19.45,7.44l-33.89 0 0 27.79 -19.59 0 0 -79.62 54.56 0c8.5,0 15.22,2.93 20.16,8.75 4.25,5.07 6.38,10.96 6.38,17.62zm-22.21 -1.02c0,-3.4 -1.41,-6.23 -4.22,-8.51 -2.81,-2.26 -6.04,-3.4 -9.68,-3.4l-25.4 0 0 24.61 25.97 0c3.72,0 6.87,-1.22 9.45,-3.63 2.58,-2.43 3.88,-5.45 3.88,-9.07zm116.86 14.35c0,15.51 -4.29,26.61 -12.87,33.3 -6.98,5.41 -17.16,8.1 -30.52,8.1 -14.81,0 -25.75,-3.11 -32.81,-9.36 -7.75,-6.83 -11.62,-17.82 -11.62,-32.95 0,-12.4 3.46,-22.06 10.37,-28.97 7.51,-7.54 18.75,-11.3 33.71,-11.3 16.48,0 28.1,3.61 34.86,10.84 5.92,6.38 8.88,16.5 8.88,30.34zm-20.27 -0.46c0,-7.84 -1.86,-14.08 -5.58,-18.72 -4.18,-5.18 -10.37,-7.76 -18.57,-7.76 -8.05,0 -14.12,2.77 -18.22,8.33 -3.42,4.64 -5.13,10.69 -5.13,18.15 0,8.6 1.37,14.96 4.1,19.06 3.8,5.72 10.82,8.57 21.07,8.57 8.66,0 14.73,-2.78 18.23,-8.34 2.73,-4.33 4.1,-10.76 4.1,-19.29zm112.2 40.38l-25.29 0 -38.5 -58.89 0 58.89 -19.02 0 0 -79.62 25.62 0 37.82 59.69 0 -59.69 19.37 0 0 79.62z"
          />
        </g>
      </svg>
      <p class="rights__text">
        ALL RIGHTS RESERVED © <span class="eng-num">2021</span>
      </p>
    </section>
    <Footer />
  </section>
  <section class="loading" v-if="isLoading">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500">
      <title>Vipon</title>
      <g id="Layer_1-2" data-name="Layer_1">
        <path
          class="f6"
          d="M251.75,324.05,368,206.1a125.33,125.33,0,0,1,7.87,43L251.75,375Z"
        />
        <path
          class="f5"
          d="M251.75,176.32l43-43.62a123.29,123.29,0,0,0-42.63-7.7l-.37.37Z"
        />
        <path
          class="f4"
          d="M251.75,275.66,351,174.94a125.54,125.54,0,0,0-25.28-25.31l-74,75.08Z"
        />
        <path
          class="f3"
          d="M135.5,206.1l116.25,118V375L127.63,249.07A125.33,125.33,0,0,1,135.5,206.1Z"
        />
        <path
          class="f2"
          d="M251.75,125.37v50.95l-43-43.62a123,123,0,0,1,42.63-7.7Z"
        />
        <path
          class="f1"
          d="M251.75,224.71v51L152.48,174.94a125.23,125.23,0,0,1,25.27-25.31Z"
        />
      </g>
    </svg>
  </section>
</template>

<script>
// common components
import Navbar from "@common/Navbar.vue";
import Footer from "@common/BaseFooter.vue";
import Shop from "../components/SubComponents/Shop";
import Events from "../components/SubComponents/Events";
// api call methods
import { userData, getShops, userEvents } from "@api/UserServices/UserDetail";
import { ref } from "vue";
import { useStore } from "vuex";

import { useRouter } from "vue-router";

export default {
  name: "Home",
  components: {
    Navbar,
    Footer,
    Events,
    Shop,
  },
  setup() {
    const usersData = ref({});
    const events = ref([]);
    const shops = ref([]);
    const isLoading = ref(false);
    const uploadYourImage = ref(false);
    const router = useRouter();
    const store = useStore();

    const getEvent = async () => {
      try {
        const { data } = await userEvents();
        isLoading.value = false;
        const { results } = data;
        events.value = results;
      } catch (error) {
        if (error.message.includes("404")) {
          const message = "اطلاعات رویداد ها یافت نشد";
          const notification = {
            type: "error",
            message,
          };
          store.dispatch("addNotification", notification);
        } else {
          const message = error.message;
          const notification = {
            type: "error",
            message,
          };
          store.dispatch("addNotification", notification);
        }
      }
    };

    const getdata = async () => {
      try {
        const { data } = await userData();
        // this.isLoading = false
        usersData.value = data;
        if (usersData.value.image == "") {
          uploadYourImage.value = true;
        }
      } catch (error) {
        if (error.message.includes("404")) {
          const message = "اطلاعات کاربر یافت نشد";
          const notification = {
            type: "error",
            message,
          };
          store.dispatch("addNotification", notification);
        } else {
          const message = error.message;
          const notification = {
            type: "error",
            message,
          };
          store.dispatch("addNotification", notification);
        }
      }
    };

    const fetchShops = async () => {
      const { data } = await getShops();
      // this.isLoading = false

      shops.value = data.results;
    };

    const handleNavigateEvents = (event) => {
      switch (event.type) {
        case "1":
          router.push({
            name: "Buy",
            params: { id: event.relation_id },
          });
          break;
        case "2":
          router.push({
            name: "Offer",
            params: { id: event.relation_id, shopId: event.store_id },
          });
          break;
        case "4":
          router.push({
            name: "Bonus",
            params: { id: event.store_id, shopId: event.relation_id },
          });
          break;
        case "6":
          router.push({
            name: "Survey",
            params: { id: event.relation_id, shopId: event.store_id },
          });
          break;
        case "7":
          router.push({
            name: "Register",
            params: { id: event.id, shopId: event.store_id },
          });
          break;
        case "8":
          router.push({
            name: "Notice",
            params: { id: event.id, shopId: event.store_id },
          });
          break;
        default:
          console.log(`event type = ${event.type}`);
          break;
      }
    };

    const handleNavigateShop = (shop) => {
      router.push({
        name: "Store",
        params: { id: shop.id },
      });
    };

    fetchShops();
    getdata();
    getEvent();

    return {
      isLoading,
      events,
      shops,
      usersData,
      uploadYourImage,
      handleNavigateShop,
      handleNavigateEvents,
    };
  },
};
</script>

<style scoped lang="scss">
.user-detail {
  overflow: hidden;
  position: relative;
  background-image: url("../assets/svg/animated-bgc.svg");
  background-position: 50%;
  background-size: cover;
  background-repeat: repeat-x;
  height: 240px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-bottom: 20px;
}
.user-detail__img {
  border-radius: 50%;
  width: 80px;
  height: 80px;
  filter: saturate(0.3);
}
.user-detail__info {
  text-align: center;
  font-size: 17px;
  color: #fff;
  display: flex;
  flex-direction: row;
}
.user-detail__location {
  text-align: center;
  font-size: 13px;
  color: rgba(255, 255, 255, 0.6);
  display: flex;
  flex-direction: row;
}
.user-detail__info-fname {
  padding-right: 10px;
}
.user-detail__location--city,
.user-detail__location--state {
  padding: 0px 5px;
}
.user-detail__location-svg {
  width: 15px;
  fill: rgba(255, 255, 255, 0.6);
}
.shops {
  background-color: #eee;
  border-radius: 25px 25px 0 0;
  padding: 0 10px 50px;
  margin: -40px 0 10px;
  position: relative;
  z-index: 5;
  box-shadow: 0 0px 20px 5px rgba(0, 0, 0, 0.1);
}
.shops__title {
  width: 100%;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.score {
  background-color: #111;
  margin-top: -40px;
  border-radius: 25px 25px 0 0;
  z-index: 9;
  padding: 0 10px 80px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.score__title {
  font-size: 19px;
  color: #aaa;
  margin: 30px 0;
}
.score__blink {
  color: #c69d4e;
  font-size: 40px;
  animation: blink infinite 1.3s;
  margin-bottom: 15px;
}
@keyframes blink {
  0% {
    opacity: 0.2;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0.2;
  }
}
.rights {
  background: #000;
  position: relative;
  z-index: 11;
  border-radius: 25px 25px 0 0;
  margin: -60px 0 0;
  padding: 30px 0 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.fil3 {
  fill: #8f6d28;
}
.fil1 {
  fill: #999999;
}
.fil2 {
  fill: #cc9933;
}
.fil4 {
  fill: #fefefe;
  fill-rule: nonzero;
}
.fil0 {
  fill: gray;
  fill-rule: nonzero;
}
.rights__img {
  width: 120px;
  height: 40px;
}
.rights__text {
  color: #333;
  font-size: 13px;
}
// events

.events {
  background-color: #eee;
  position: relative;
  z-index: 2;
  margin-top: -40px;
  border-radius: 30px 30px 0 0;
  padding: 0px 10px 55px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.events__title {
  font-size: 16px;
  height: 80px;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
.event__load-more,
.shop__load-more {
  width: 200px;
  text-align: center;
  background-color: #ddd;
  border-radius: 20px;
  height: 50px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 0 20px 5px rgba(255, 255, 255, 0.3);
}
.event__load-more-text {
  color: #111;
  margin: 0 5px;
  font-size: 15px;
}
.shop__load-more {
  margin: 0 auto;
  color: #222;
}
.empty-events {
  margin: 40px auto;
  font-size: 18px;
  width: 100%;
  text-align: center;
  padding-bottom: 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
}
// upload profile image
.upload {
  display: grid;
  grid-template-columns: 1fr 1px 2fr;
  gap: 10px;
  background-color: #000;
  text-align: center;
  justify-content: center;
  width: 100%;
  border-radius: 10px;
  color: #fff;
  align-items: center;
  padding: 20px 15px;
}
.upload__image {
  height: 100%;
  width: 100%;
}
.upload__image img {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  padding-top: 7px;
}
.upload__divider {
  background-color: rgba(255, 255, 255, 0.1);
  width: 1px;
  height: 70px;
}
.upload__detail {
  color: #aaa;
}
.upload__detail--gold {
  color: #c69d4e;
  margin-left: 10px;
}
</style>