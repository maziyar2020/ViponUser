<template>
  <section class="resolve" v-if="!isLoading">
    <Navbar />
    <HeaderComponent :pageData="headerData" />
    <div class="register">
      <p class="register__header">{{ pageData.text }}</p>
      <i class="divider"></i>
      <img
        v-show="pageData.image"
        :src="pageData.image"
        alt=""
        class="register__img"
      />
      <SocialMedia :socials="socialMedia" />
      <StoreNavigator
        @click="$router.push({ name: 'Store', params: { id: walletId } })"
      />
    </div>
    <Footer />
  </section>
  <section class="loading" v-else>
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
// common compoenents
import Navbar from "@common/Navbar.vue";
import HeaderComponent from "@common/HeaderComponent.vue";
import SocialMedia from "@common/SocialMedia.vue";
import StoreNavigator from "@common/StoreNavigator.vue";
import Footer from "@common/BaseFooter.vue";
// api call
import { getRegisterData } from "@api/RegisterService/RegisterRequest";
import { ref } from "vue";
import { useStore } from "vuex";
export default {
  name: "Register",
  props: ["id", "shopId"],
  setup(props) {
    const headerData = ref({});
    const isLoading = ref(false);
    const pageData = ref({});
    const socialMedia = ref([]);
    const walletId = ref(null);
    const store = useStore();

    const fetchRegisterData = async () => {
      try {
        const { data } = await getRegisterData(props.id);
        isLoading.value = false;

        const { store, store_en, store_image, social, wallet_id } = data;
        headerData.value = {
          store_image,
          store_name_en: store_en,
          store_name: store,
        };
        pageData.value = data;
        socials.value = social;
        walletId.value = wallet_id;
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
    };

    fetchRegisterData();
    isLoading.value = true;

    return {
      headerData,
      isLoading,
      pageData,
      socialMedia,
      walletId,
    };
  },
  components: {
    Navbar,
    HeaderComponent,
    SocialMedia,
    StoreNavigator,
    Footer,
  },
};
</script>


<style scoped lang="scss">
.register {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  border-radius: 30px 30px 0 0;
  margin-top: -30px;
  background: #eee;
  z-index: 5;
  position: relative;
  padding: 0px 20px 50px;
  min-height: 61vh;
}
.register__header {
  margin: 25px 0;
  font-size: 15px;
  text-align: center;
  color: #222;
}
.register__img {
  width: 100%;
}
.divider {
  height: 1px;
  width: 80%;
  background-color: rgba(0, 0, 0, 0.1);
  margin: 0 auto;
}
</style>