<template>
  <div class="resolved" v-if="!isLoading">
    <Navbar :text="navbarText" />
    <section class="events">
      <p v-if="events.length == 0" class="empty-events">
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
    </section>
    <Observer
      @intersect="intersect"
      v-if="events.length"
      :dataRetrived="dataRetrived"
    />
    <Footer />
  </div>
  <section class="loading" v-else>
    <Navbar />
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
    <Footer />
  </section>
</template>

<script>
import { getAllEvents } from "@api/UserServices/UserDetail";
import Observer from "../components/lazy-load/observer";
import Events from "../components/SubComponents/Events";
import Navbar from "@common/Navbar.vue";
import Footer from "@common/BaseFooter.vue";
const queryString = require("query-string");
import { ref } from "vue";
import { useStore } from "vuex";
import {useRouter} from 'vue-router'

export default {
  name: "Notifications",
  components: {
    Observer,
    Events,
    Navbar,
    Footer,
  },
  setup() {
    const nextPage = ref(null);
    const events = ref([]);
    const lastPage = ref("");
    const dataRetrived = ref(false);
    const navbarText = ref("رویدادها");
    const isLoading = ref(false);
    const store = useStore();
    const router = useRouter()

    const fetchData = async () => {
      if (nextPage.value == null && lastPage.value == false) {
        try {
          const { data } = await getAllEvents(`/core/notification/`);
          const { next, results } = data;

          isLoading.value = false;

          nextPage.value = next;
          events.value = results;

          if (next == null) {
            lastPage.value = true;
            dataRetrived.value = true;
          }
        } catch (error) {
          if (error.message.includes("404")) {
            const message = "صفحه مورد نظر یافت نشد";
            const notification = {
              type: "error",
              message,
            };
            store.dispatch("addNotification", notification);
          }
        }
      } else if (nextPage.value !== null && lastPage.value == false) {
        const link = queryString.parse(nextPage.value);
        const linkQuery = Object.values(link).toString();
        try {
          const { data } = await getAllEvents(
            `/core/notification/?page=${linkQuery}`
          );
          const { next, results } = data;
          const result = results;
          events.value = [...events.value, ...result];

          if (next == null) {
            lastPage.value = true;
            dataRetrived.value = true;
          }
          nextPage.value = next;
        } catch (error) {
          if (error.message.includes("404")) {
            const message = "رویداد های بیشتری یافت نشد";
            const notification = {
              type: "error",
              message,
            };
            store.dispatch("addNotification", notification);
            lastPage.value = true;
            dataRetrived.value = true;
          }
        }
      }
    };
    const intersect = () => {
      fetchData();
    };
    const handleNavigateEvents = (event) => {
      switch (event.type) {
        case "1":
          router.push({ name: "Buy", params: { id: event.relation_id } });
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
          router.push({ name: "Register", params: { id: event.id } });
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

    isLoading.value = true;
    fetchData();

    return {
      intersect,
      events,
      isLoading,
      navbarText,
      dataRetrived,
      handleNavigateEvents
    };
  },
};
</script>

<style scoped>
.events {
  background-color: #eee;
  position: relative;
  z-index: 2;
  padding: 60px 10px 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
}
.event__load-more {
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
}
.empty-events {
  margin: 40px auto;
  font-size: 18px;
  width: 100%;
  text-align: center;
  padding-bottom: 20px;
  height: 100vh;
}
</style>