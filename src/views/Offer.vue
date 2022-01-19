<template>
  <section class="resolved" v-if="!isLoading">
    <Navbar :text="navbarText" />
    <HeaderComponent :pageData="pageData" />
    <div class="offer" :class="[darkMode && 'offer--dark']">
      <component :is="currentPage" />
      <div class="offer__title" :class="[darkMode && 'offer__title--dark']">
        {{ offerDetail.title }}
      </div>
      <div class="offer__detail" :class="[darkMode && 'offer__detail--dark']">
        <img
          :src="offerDetail.image"
          alt=""
          class="offer__detail-img"
          :class="[darkMode && 'offer__detail-img--dark']"
        />
        <div class="offer__prices">
          <div class="offer__prices-item">
            <h3
              class="offer__price price--old"
              :class="[darkMode && 'price--old--dark']"
            >
              {{ seperatedByThree(offerDetail.price) }}
            </h3>
            <h3
              class="offer__price price--new"
              :class="[darkMode && 'price--new--dark']"
            >
              {{ seperatedByThree(offerDetail.price_final) }}
            </h3>
          </div>
          <i
            class="offer__price-divider"
            :class="[darkMode && 'offer__price-divider--dark']"
          ></i>
          <div class="offer__prices-item">
            <h4 class="offer__off" :class="[darkMode && 'offer__off--dark']">
              OFF
            </h4>
            <h4
              class="offer__percent"
              :class="[darkMode && 'offer__percent--dark']"
            >
              {{ calculateOfferPercent }}
            </h4>
          </div>
        </div>
        <div class="offer-shape">
          <i class="shape" :class="[darkMode && 'shape--dark']"></i>
          <i class="shape" :class="[darkMode && 'shape--dark']"></i>
          <i class="shape" :class="[darkMode && 'shape--dark']"></i>
          <i class="shape" :class="[darkMode && 'shape--dark']"></i>
          <i class="shape" :class="[darkMode && 'shape--dark']"></i>
          <i class="shape" :class="[darkMode && 'shape--dark']"></i>
          <i class="shape" :class="[darkMode && 'shape--dark']"></i>
          <i class="shape" :class="[darkMode && 'shape--dark']"></i>
          <i class="shape" :class="[darkMode && 'shape--dark']"></i>
          <i class="shape" :class="[darkMode && 'shape--dark']"></i>
          <i class="shape" :class="[darkMode && 'shape--dark']"></i>
          <i class="shape" :class="[darkMode && 'shape--dark']"></i>
          <i class="shape" :class="[darkMode && 'shape--dark']"></i>
          <i class="shape" :class="[darkMode && 'shape--dark']"></i>
          <i class="shape" :class="[darkMode && 'shape--dark']"></i>
          <i class="shape" :class="[darkMode && 'shape--dark']"></i>
          <i class="shape" :class="[darkMode && 'shape--dark']"></i>
          <i class="shape" :class="[darkMode && 'shape--dark']"></i>
          <i class="shape" :class="[darkMode && 'shape--dark']"></i>
          <i class="shape" :class="[darkMode && 'shape--dark']"></i>
          <i class="shape" :class="[darkMode && 'shape--dark']"></i>
          <i class="shape" :class="[darkMode && 'shape--dark']"></i>
          <i class="shape" :class="[darkMode && 'shape--dark']"></i>
          <i class="shape" :class="[darkMode && 'shape--dark']"></i>
          <i class="shape" :class="[darkMode && 'shape--dark']"></i>
          <i class="shape" :class="[darkMode && 'shape--dark']"></i>
          <i class="shape" :class="[darkMode && 'shape--dark']"></i>
          <i class="shape" :class="[darkMode && 'shape--dark']"></i>
          <i class="shape" :class="[darkMode && 'shape--dark']"></i>
        </div>
      </div>
      <div class="offer__desc">
        {{ offerDetail.desc }}
      </div>
      <div class="timer">
        <p class="timer__title">زمان باقیمانده تا پایان نظر سنجی</p>
        <div class="count-down">
          <div class="timer__number count-down--day">{{ timer.day }}</div>
          <div class="timer__number count-down--hour">{{ timer.hour }}</div>
          <div class="timer__number count-down--minute">{{ timer.minute }}</div>
          <div class="timer__number count-down--second">{{ timer.second }}</div>
        </div>
        <p class="timer__title" style="color: red">
          {{ offerStatus }}
        </p>
      </div>
    </div>
    <div class="offer-footer" :class="[darkMode && 'offer-footer--dark']">
      <SocialMedia :socials="socialMedia" :darkMode="darkMode" />
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
import {
  getOfferInfo,
  getOfferPageDetail,
} from "@api/OfferServices/OfferRequest";
// common components
import Navbar from "@common/Navbar.vue";
import SocialMedia from "@common/SocialMedia.vue";
import StoreNavigator from "@common/StoreNavigator.vue";
import Footer from "@common/BaseFooter.vue";
import HeaderComponent from "@common/HeaderComponent.vue";
// reactive components
import OfferExpired from "../components/SubComponents/Offer/OfferExpired.vue";
import OfferUsed from "../components/SubComponents/Offer/OfferUsed.vue";
import OfferAvailable from "../components/SubComponents/Offer/OfferAvailable.vue";
import { computed, ref } from "vue";
import { useStore } from "vuex";
export default {
  name: "Offer",
  setup(props) {
    // offer perscentage
    const calculateOfferPercent = computed(() => {
      const n1 = 100 / offerDetail.value.price;
      const n2 = 100 - Math.floor(offerDetail.value.price_final * n1);
      return n2;
    });
    const navbarText = ref("آفر ( تخفیف )");
    //  this is how we use vuex in setup function
    const store = useStore();
    //
    const isLoading = ref(false);
    // current rendred component
    const currentPage = ref("");
    // offer data details
    const offerDetail = ref({});

    const walletId = ref("");

    const offerStatus = ref("");

    const darkMode = ref(null);

    const timer = ref({
      day: "",
      hour: "",
      minute: "",
      second: "",
    });

    const fetchOfferData = async () => {
      try {
        const { data } = await getOfferInfo(props.id);

        const { offer, wallet_id, status } = data;

        isLoading.value = false;
        offerDetail.value = offer;
        walletId.value = wallet_id;

        // check offer status => available - used - expired
        switch (status) {
          case "1" || 1:
            currentPage.value = "OfferAvailable";
            break;
          case "2" || 2:
            currentPage.value = "OfferUsed";
            break;
          case "3" || 3:
            currentPage.value = "OfferExpired";
            break;

          default:
            console.log("status is not valid valid=> 1,2,3 ");
            break;
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

      const timerFormater = (number) => {
        return number < 10 ? "0" + number : number;
      };
      
      const countDown = () => {
        const timerInter = setInterval(() => {
          const now = new Date().getTime();
          const time = new Date(
            `${offerDetail.value.expire_at} 00:00:00`
          ).getTime();
          const distance = time - now;

          const days = Math.floor(distance / (1000 * 60 * 60 * 24));
          const hours = Math.floor(
            (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          );
          const minutes = Math.floor(
            (distance % (1000 * 60 * 60)) / (1000 * 60)
          );
          const seconds = Math.floor((distance % (1000 * 60)) / 1000);

          timer.value.day = timerFormater(days);
          timer.value.hour = timerFormater(hours);
          timer.value.minute = timerFormater(minutes);
          timer.value.second = timerFormater(seconds);

          // if distance decreased to 0 timer will be determinated and surveyExpire component will render
          if (distance < 0) {
            clearInterval(timerInter);
            timer.value.day = "00";
            timer.value.hour = "00";
            timer.value.minute = "00";
            timer.value.second = "00";
            currentPage.value = "OfferExpired";
            darkMode.value = true;
            offerStatus.value = "زمان این تخفیف به پایان رسید";
          }
          if (darkMode.value) {
            clearInterval(timerInter);
            timer.value.day = "00";
            timer.value.hour = "00";
            timer.value.minute = "00";
            timer.value.second = "00";
          }
        }, 1000);
      };
      countDown();
      //
    };

    const pageData = ref({});
    const socialMedia = ref([]);

    const fetchPageData = async () => {
      try {
        const { data } = await getOfferPageDetail(props.shopId);
        const { image, name_en, name_fa, socials } = data;
        pageData.value = {
          store_image: image,
          store_name_en: name_en,
          store_name: name_fa,
        };
        socialMedia.value = socials;
      } catch (error) {
        if (error.message.includes("404")) {
          const message = "اطلاعات  کاربر یافت نشد";
          const notif = {
            type: "error",
            message,
          };
          store.dispatch("addNotification", notif);
        }
      }
    };

    const seperatedByThree = (data) => {
      const seperator = data?.toLocaleString();
      return seperator;
    };

    isLoading.value = true;
    fetchPageData();
    fetchOfferData();

    return {
      currentPage,
      isLoading,
      offerDetail,
      walletId,
      timer,
      darkMode,
      offerStatus,
      socials: socialMedia,
      pageData,
      seperatedByThree,
      calculateOfferPercent,
      navbarText,
      socialMedia,
    };
  },
  props: ["id", "shopId"],
  components: {
    Navbar,
    SocialMedia,
    StoreNavigator,
    Footer,
    HeaderComponent,
    OfferExpired,
    OfferUsed,
    OfferAvailable,
  },
};
</script>

<style lang="scss" scoped>
.offer {
  position: relative;
  z-index: 2;
  width: 100%;
  background-color: #eee;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  border-radius: 30px 30px 0 0;
  margin-top: -30px;
  overflow: hidden;
  padding: 10px 20px 0;
}
.offer--dark {
  background: #080808;
  color: #fff;
}
.offer__title {
  width: calc(100% - 40px);
  padding: 0;
  margin: 10px 0 30px;
  position: relative;
  color: #000;
  text-align: center;
  font-size: 18px;
  font-weight: 700;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
.offer__title--dark {
  color: #444;
}
.offer__detail {
  display: flex;
  align-items: center;
  flex-direction: column;
  overflow: hidden;
  background-color: #fff;
  width: 96%;
  border-radius: 10px 10px 0 0;
  position: relative;
}
.offer__detail--dark {
  background-color: #181818;
  color: #444;
}
.offer-shape {
  z-index: 4;
  position: absolute;
  bottom: -7px;
  display: flex;
  flex-direction: row;
  overflow: hidden;
  height: auto;
  .shape {
    width: 14px;
    height: 14px;
    margin: 0 6px;
    border-radius: 100%;
    background-color: #eee;
  }
  .shape--dark {
    background-color: #080808;
  }
}
.offer__detail-img {
  width: 100%;
  filter: saturate(0.9);
}
.offer__detail-img--dark {
  filter: saturate(0) opacity(0.6);
}
.offer__prices {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin: 20px 0;
}
.offer__prices-item {
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.offer__price-divider {
  width: 1px;
  height: 60px;
  background-color: rgba(0, 0, 0, 0.2);
}
.offer__price-divider--dark {
  background: #272727;
}
.offer__price {
  position: relative;
  font-size: 22px;
  margin-bottom: 0;
  font-weight: 500;
  padding-top: 6px;
  font-family: Arial, Helvetica, sans-serif;
}
.price--old {
  color: #777;
}
.price--old--dark {
  color: #444;
}
.price--old::before {
  content: "";
  position: absolute;
  width: 120%;
  background-color: rgba(0, 0, 0, 0.4);
  height: 2px;
  top: 2px;
  bottom: 0;
  left: -10%;
  margin: auto 0;
}
.price--old--dark::before {
  background: #444;
  top: 3px;
}
.offer__price::after {
  content: "R";
  font-size: 12px;
  top: -6px;
  left: 3px;
  position: relative;
}
.price--new {
  color: #c69d4e;
}
.price--new--dark {
  color: #444;
}
.offer__off {
  margin: 10px 0 0;
  color: #aaa;
  font-weight: 700;
  font-size: 18px;
}
.offer__off--dark {
  color: #444;
}
.offer__percent {
  color: #000;
  margin: 0 0 3px;
  font-size: 40px;
  font-weight: 500;
  position: relative;
  left: -7px;
  font-family: Arial, Helvetica, sans-serif;
}
.offer__percent--dark {
  color: #444;
}
.offer__percent::before {
  content: "";
  position: absolute;
  left: -15px;
  top: 7px;
  bottom: 8px;
  margin: auto 0;
  width: 12px;
  height: 2px;
  background-color: #000;
}
.offer__percent--dark::before {
  background-color: #444;
}
.offer__percent::after {
  content: "%";
  position: absolute;
  right: -32px;
  top: 0;
  bottom: 0;
  margin: auto 0;
}
.offer__desc {
  text-align: justify;
  color: #777;
  font-size: 15px;
  line-height: 20px;
  padding: 10px;
  margin: 10px 0;
}
// timer
.timer {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 96%;
  background-color: #262626;
  border-radius: 15px;
  position: relative;
  padding-bottom: 15px;
  margin-bottom: 20px;
}
.timer__title {
  margin: 20px 0 0;
  color: #777;
  word-spacing: 5px;
}
.timer__number {
  position: relative;
  display: inline-block;
  text-align: center;
  height: 70px;
  line-height: 70px;
  font-size: 40px;
  width: 65px;
  margin: 0 4px;
  background-color: #1a1a1a;
  border-radius: 10px;
  font-family: Arial, Helvetica, sans-serif;
  color: #fff;
}
.count-down {
  direction: ltr;
  margin: 10px 0;
  color: #fff;
  width: 100%;
  border-radius: 10px;
  font-size: 20px;
  text-align: center;
  background-color: #262626;
  padding: 10px 0 40px;
}
.timer__number::after {
  position: absolute;
  color: #777;
  font-size: 13px;
  bottom: -50px;
  left: 0;
  right: 0;
  margin: 0 auto;
  font-family: "iransans";
}
.count-down--day::after {
  content: "روز";
}
.count-down--hour::after {
  content: "ساعت";
}
.count-down--minute::after {
  content: "دقیقه";
}
.count-down--second::after {
  content: "ثانیه";
}
.offer-footer {
  background-color: #eee;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 20px 65px;
}
.offer-footer--dark {
  background-color: #080808;
}

</style>