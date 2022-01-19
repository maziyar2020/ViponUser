<template>
  <section class="resolved" v-if="!isLoading">
    <Navbar :text="navbarText" />
    <HeaderComponent :pageData="pageData" />
    <div class="bonus">
      <p class="bonus__title">بونوس (تخفیف)</p>
      <div class="bonus__data">
        <div class="bonus__data-row">
          <svg class="bonus__icon" viewBox="0 0 512 512">
            <path
              d="M310.28 167.78l0.63 -0.05c6.98,-0.65 12.33,-6.5 12.33,-13.51 0,-7.01 -5.35,-12.87 -12.33,-13.51l-0.6 -0.06 -40.74 0 0 -43.42 -0.06 -0.62c-0.65,-6.97 -6.5,-12.34 -13.51,-12.34 -7.02,0 -12.87,5.36 -13.51,12.34l-0.06 0.59 0 43.45 -8.89 0c-35.44,0 -64.45,29.01 -64.45,64.46 0,35.44 29.01,64.46 64.45,64.46l44.91 0c20.54,0 37.33,16.78 37.33,37.32 0,20.54 -16.79,37.32 -37.33,37.32l-76.75 0 -0.61 0.06c-6.98,0.64 -12.34,6.5 -12.34,13.51 0,7.01 5.36,12.88 12.34,13.51l0.6 0.06 40.74 0 0 43.45 0.06 0.59c0.64,6.98 6.5,12.33 13.51,12.33 7.01,0 12.86,-5.36 13.51,-12.33l0.06 -0.62 0 -43.42 8.88 0c35.45,0 64.46,-29.02 64.46,-64.46 0,-35.44 -29.01,-64.46 -64.46,-64.46l-44.9 0c-20.54,0 -37.32,-16.78 -37.32,-37.32 0,-20.54 16.78,-37.33 37.32,-37.33l76.73 0z"
            ></path>
          </svg>
          <p class="bonus__cost bonus__cost--gold eng-num">
            {{ seperateByThree(bonus.price) }}
          </p>
          <p class="bonus__text bonus__text--gold">مبلغ تخفیف</p>
        </div>
        <div class="bonus__data-row">
          <svg class="bonus__icon" viewBox="0 0 512 512">
            <path
              d="M310.28 167.78l0.63 -0.05c6.98,-0.65 12.33,-6.5 12.33,-13.51 0,-7.01 -5.35,-12.87 -12.33,-13.51l-0.6 -0.06 -40.74 0 0 -43.42 -0.06 -0.62c-0.65,-6.97 -6.5,-12.34 -13.51,-12.34 -7.02,0 -12.87,5.36 -13.51,12.34l-0.06 0.59 0 43.45 -8.89 0c-35.44,0 -64.45,29.01 -64.45,64.46 0,35.44 29.01,64.46 64.45,64.46l44.91 0c20.54,0 37.33,16.78 37.33,37.32 0,20.54 -16.79,37.32 -37.33,37.32l-76.75 0 -0.61 0.06c-6.98,0.64 -12.34,6.5 -12.34,13.51 0,7.01 5.36,12.88 12.34,13.51l0.6 0.06 40.74 0 0 43.45 0.06 0.59c0.64,6.98 6.5,12.33 13.51,12.33 7.01,0 12.86,-5.36 13.51,-12.33l0.06 -0.62 0 -43.42 8.88 0c35.45,0 64.46,-29.02 64.46,-64.46 0,-35.44 -29.01,-64.46 -64.46,-64.46l-44.9 0c-20.54,0 -37.32,-16.78 -37.32,-37.32 0,-20.54 16.78,-37.33 37.32,-37.33l76.73 0z"
            ></path>
          </svg>
          <p class="bonus__cost eng-num">
            {{ seperateByThree(bonus.min_buy) }}
          </p>
          <p class="bonus__text">حداقل خرید</p>
        </div>
      </div>
      <div class="bonus__desc">
        <p class="bonus__desc-title">توضیحات</p>
        <p class="bonus__desc-text">{{ bonus.desc }}</p>
      </div>
      <section class="timer">
        <p class="timer__title">زمان باقیمانده تا پایان تخفیف</p>
        <div class="count-down">
          <div class="timer__number eng-num count-down--day">
            {{ timer.day }}
          </div>
          <div class="timer__number eng-num count-down--hour">
            {{ timer.hour }}
          </div>
          <div class="timer__number eng-num count-down--minute">
            {{ timer.minute }}
          </div>
          <div class="timer__number eng-num count-down--second">
            {{ timer.second }}
          </div>
        </div>
        <p
          class="timer__title"
          style="color: red; margin: 0"
          v-if="bonusExpired"
        >
          زمان تخفیف به پایان رسید
        </p>
      </section>
      <SocialMedia :socials="socials" />
      <StoreNavigator
        @click="$router.push({ name: 'Store', params: { id: walletId } })"
      />
    </div>
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
import HeaderComponent from "@common/HeaderComponent.vue";
import SocialMedia from "@common/SocialMedia.vue";
import StoreNavigator from "@common/StoreNavigator.vue";
// api call imported
import { getBonusData } from "@api/BonusServices/BonusRequest";
import { ref } from "vue";
import { useStore } from "vuex";
export default {
  name: "Bonus",
  props: ["id", "shopId"],
  setup(props) {
    const store = useStore();
    const bonus = ref({});
    const pageData = ref({});
    const socials = ref([]);
    const bonusCreated = ref("");
    const bonusExpire = ref("");
    // dynamic navbar title
    const navbarText = ref("بونوس (تخفیف)");
    const bonusExpired = ref(false);
    const isLoading = ref(false);
    const timer = ref({
      hour: "",
      day: "",
      minute: "",
      second: "",
    });
    const interVal = ref(null);
    const walletId = ref(null);
    const errorMessage = ref("");

    const fetchBonusData = async () => {
      try {
        const { data } = await getBonusData(props.shopId);
        isLoading.value = false;
        bonus.value = data.bonus;
        const {
          social,
          wallet_id,
          created_at,
          expire_at,
          store_en,
          store,
          store_image,
        } = data.bonus;

        pageData.value = {
          store_image: store_image,
          store_name: store,
          store_name_en: store_en,
        };

        socials.value = social;
        walletId.value = wallet_id;
        bonusCreated.value = created_at;
        bonusExpire.value = expire_at;
        // count down

        const numberFormater = (number) => {
          return number < 10 ? "0" + number : number;
        };

        const countDown = () => {
          interVal.value = setInterval(() => {
            const now = new Date().getTime();
            const time = new Date(`${bonusExpire.value} 00:00:00`).getTime();
            const distance = time - now;

            const day = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hour = Math.floor(
              (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
            );
            const minute = Math.floor(
              (distance % (1000 * 60 * 60)) / (1000 * 60)
            );
            const second = Math.floor((distance % (1000 * 60)) / 1000);

            timer.value.day = numberFormater(day);
            timer.value.hour = numberFormater(hour);
            timer.value.minute = numberFormater(minute);
            timer.value.second = numberFormater(second);

            if (distance < 0) {
              clearInterval(interVal);
              timer.value.day = "00";
              timer.value.hour = "00";
              timer.value.minute = "00";
              timer.value.second = "00";
              bonusExpired.value = true;
            }
          }, 1000);
        };
        countDown();
      } catch (error) {
        if (error.message.includes("404")) {
          isLoading.value = true;
          errorMessage.value = "صفحه مورد نظر یافت نشد";
          const notification = {
            type: "error",
            message: errorMessage.value,
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

    const seperateByThree = (data) => {
      const seperator = data?.toLocaleString();
      return seperator;
    };

    fetchBonusData();
    isLoading.value = true;

    return {
      seperateByThree,
      isLoading,
      navbarText,
      pageData,
      bonus,
      timer,
      bonusExpired,
      socials,
    };
  },
  components: {
    Navbar,
    Footer,
    HeaderComponent,
    SocialMedia,
    StoreNavigator,
  },
};
</script>

<style lang="scss" scoped>
.bonus {
  position: relative;
  z-index: 10;
  width: 100%;
  background-color: #eee;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  border-radius: 30px 30px 0 0;
  margin-top: -30px;
  overflow: hidden;
  padding: 20px 0 60px;
}
.bonus__title {
  margin-bottom: 20px;
}
.bonus__data {
  direction: ltr;
  width: 94%;
  height: 100px;
  border-radius: 15px;
  background-color: #fff;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin-bottom: 10px;
  padding-right: 15px;
  cursor: pointer;
}
.bonus__data-row {
  width: 100%;
  display: grid;
  grid-template-columns: 40px 1fr 100px;
  align-items: center;
  height: 40px;
}
.bonus__icon {
  width: 30px;
  height: 30px;
  border-radius: 100%;
  background-color: rgba(198, 157, 78, 0.2);
  margin: 0 10px;
  fill: #c69d4e;
}
.bonus__cost {
  color: #777;
  margin: 0;
  font-size: 22px;
  padding-left: 10px;
  top: 2px;
  position: relative;
  &::after {
    content: "R";
    font-size: 14px;
    position: relative;
    top: -5px;
    right: 0;
    color: #777;
  }
}
.bonus__cost--gold {
  color: #c69d4e;
  &::after {
    color: #c69d4e;
  }
}
.bonus__text {
  text-align: right;
  font-size: 14px;
}
.bonus__text--gold {
  color: #c69d4e;
}
.bonus__desc {
  width: 100%;
  padding: 0 25px;
  margin: 10px 0 25px;
  text-align: center;
}
.bonus__desc-text {
  color: #686868;
  width: 100%;
  margin: 5px 0 0;
  font-size: 12px;
  padding: 0 3px;
}
.bonus__desc-title {
  color: #000;
  width: 100%;
  margin: 10px 0 5px;
  font-size: 12px;
  font-weight: 700;
}
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
  font-size: 45px;
  width: 65px;
  margin: 0 4px;
  background-color: #1a1a1a;
  border-radius: 10px;
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
</style>