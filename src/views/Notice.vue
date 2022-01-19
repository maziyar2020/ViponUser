<template>
  <section class="resolved" v-if="!isLoading">
    <Navbar :text="navbarText" />
    <HeaderComponent :pageData="pageData" />
    <section class="notice">
      <p class="notice__title">{{ noticeData.text }}</p>
      <div class="notice__image">
        <img :src="noticeData.image" alt="" class="notice__img" />
      </div>
      <SocialMedia :socials="socials" />
      <StoreNavigator
        @click="$router.push({ name: 'Store', params: { id: walletId } })"
      />
    </section>
    <Footer />
  </section>
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
import { getNoticeDetail } from "@api/NoticeServices/NoticeRequest";
import Navbar from "@common/Navbar.vue";
import HeaderComponent from "@common/HeaderComponent.vue";
import SocialMedia from "@common/SocialMedia.vue";
import StoreNavigator from "@common/StoreNavigator.vue";
import Footer from "@common/BaseFooter.vue";

import { ref } from "vue";
import { useStore } from "vuex";

export default {
  name: "Notice",
  props: ["id", "shopId"],
  components: {
    Navbar,
    HeaderComponent,
    StoreNavigator,
    SocialMedia,
    Footer,
  },
  setup(props) {
    const noticeData = ref({});
    const pageData = ref({});
    const socials = ref([]);
    const isLoading = ref(false);
    const navbarText = ref("پیام ها");
    const walletId = ref(null);
    const errorMessage = ref("");
    const store = useStore();

    const fetchNoticeData = async () => {
      try {
        const { data } = await getNoticeDetail(props.id);
        isLoading.value = false;

        const { store_image, store, store_en, social, wallet_id } = data;
        pageData.value = {
          store_image,
          store_name_en: store_en,
          store_name: store,
        };
        socials.value = social;
        noticeData.value = data;
        walletId.value = wallet_id;
      } catch (error) {
        if (error.message.includes("404")) {
          errorMessage = "صفحه مورد نظر یافت نشد";
          const notification = {
            type: "error",
            message: errorMessage,
          };
          store.dispatch("addNotification", notification);
        }
      }
    };

    fetchNoticeData();

    return{
        isLoading,
        navbarText,
        pageData,
        noticeData,
        socials
    }
  },
};
</script>


<style scoped lang="scss">
.notice {
  position: relative;
  z-index: 2;
  width: 100%;
  border-radius: 0;
  background-color: #eee;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  border-radius: 30px 30px 0 0;
  margin-top: -30px;
  overflow: hidden;
  min-height: 100vh;
  padding-bottom: 60px;
}
.notice__title {
  margin: 40px 0;
}
.notice__image {
  margin: 0 0 30px;
  width: 100%;
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.notice__img {
  width: 100%;
  max-width: 600px;
  border-radius: 15px;
}
</style>