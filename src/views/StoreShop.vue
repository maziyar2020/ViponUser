<template>
  <div class="resolved" v-if="!loading">
    <Navbar :text="navbarText" />
    <div class="main-section store-wrapper">
      <router-link
        :to="{ name: 'Store', params: { id: store.id } }"
        class="store"
        v-for="(store, index) in shoppingStores"
        :key="index"
      >
        <img :src="store.image" alt="" class="store__img" />
        <p class="store__paragraph">{{ store.store }}</p>
      </router-link>
      <Observer
        @intersect="intersect"
        v-if="shoppingStores.length"
        :dataRetrived="dataRetrived"
      />
    </div>
    <Footer />
  </div>
  <div class="loading" v-else>
    <Navbar :text="navbarText" />
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
  </div>
</template>

<script>
import { getStores } from "@api/StoreServices/StoreRequest";
import Navbar from "@common/Navbar.vue";
import Footer from "@common/BaseFooter.vue";
import Observer from "../components/lazy-load/observer";
// query package
const queryString = require("query-string");
export default {
  name: "Store",
  data() {
    return {
      navbarText: "فروشگاه",
      shoppingStores: [],
      nextPage: "",
      dataRetrived: false,
      loading: false,
    };
  },
  methods: {
    async fetchStores() {
      if (this.nextPage === "" && this.nextPage !== null) {
        try {
          // call an api and wait for response
          const { data } = await getStores("user/wallet/?limit=10&offset=0");
          // destroy the loading
          this.loading = false;
          // export required data from it
          const { next, results } = data;
          // parse next page from api and store it in nextpage data
          const nextURL = queryString.parse(next);
          this.nextPage = nextURL.page;
          // add array items to previous items
          this.shoppingStores = [...this.shoppingStores, ...results];
          if (data.next == null) {
            this.dataRetrived = true;
            this.nextPage = null;
          }
        } catch (error) {
          if (error.message.includes("404")) {
            this.loading = true;
            const message = "صفحه مورد نظر یافت نشد";
            const notification = {
              type: "error",
              message,
            };
            this.$store.dispatch("addNotification", notification);
          }
        }
      } else if (this.nextPage !== "" && this.nextPage !== null) {
        try {
          const { data } = await getStores(
            `user/wallet/?limit=10&offset=0&page=${this.nextPage}`
          );
          const { next, results } = data;
          if (next == null) {
            this.dataRetrived = true;
            this.nextPage = null;
          } else {
            const nextURL = queryString.parse(next);
            this.nextPage = nextURL.page;
          }
          this.shoppingStores = [...this.shoppingStores, ...results];
        } catch (error) {
          if (error.message.includes("404")) {
            this.dataRetrived = true;
            this.nextPage = null;
            const message = "فروشگاه های بیشتری یافت نشد";
            const notification = {
              type: "error",
              message,
            };
            this.$store.dispatch("addNotification", notification);
          }
        }
      }
      return;
    },
    intersect() {
      this.fetchStores();
    },
  },
  mounted() {
    this.loading = true;
    this.fetchStores();
  },
  components: {
    Navbar,
    Observer,
    Footer,
  },
};
</script>

<style scoped lang="scss">
.store-wrapper {
  padding: 70px 14px 50px;
}
.store {
  width: 100%;
  border-radius: 15px;
  cursor: pointer;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
  padding: 15px 0;
  margin-bottom: 10px;
}
.store__img {
  border-radius: 100%;
  height: 80px;
  width: 80px;
  box-shadow: 0 0 3px 2px rgba(0, 0, 0, 0.2);
}
.store__paragraph {
  color: #222;
}
.popup {
  position: fixed;
  top: 500px;
  right: 0;
  left: 0;
  bottom: 0;
  z-index: 500;
  border-right: 4px solid #c69d4e;
  box-shadow: 0 0 20px 5px rgba(0, 0, 0, 0.2);
  margin: 0 auto;
  padding: 5px 10px;
  width: 220px;
  height: 50px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  font-size: 13px;
  border-radius: 5px;
  transition: all 0.3s ease;
  color: #000;
  transform: translateY(500%);
}
.popup--show {
  transform: translateY(0);
}
</style>