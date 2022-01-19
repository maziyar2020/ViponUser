<template>
  <section class="resolved" v-if="!isLoading">
    <Navbar :text="navbarText" />
    <HeaderComponent :pageData="pageData" />
    <section class="buy-body">
      <div class="buy-tnq">
        <p>
          <span class="buy-tnq-name">{{ pageData.name }}</span> عزیز
        </p>
        <p>از خرید شما متشکریم</p>
      </div>
      <div class="buy-detail">
        <div class="buy-detail-item">
          <p>خرید شما</p>
          <h5 class="buy-cost eng-num">
            {{ seperatedByThreeDigits(pageData.price) }}
          </h5>
        </div>
        <i class="divider"></i>
        <div class="buy-detail-item">
          <p>اعتبار دریافتی</p>
          <h5 class="buy-remain eng-num">
            {{ seperatedByThreeDigits(pageData.credit) }}
          </h5>
        </div>
        <i class="divider"></i>
        <div class="buy-detail-item">
          <p>موجودی اعتبار</p>
          <h5 class="buy-credit eng-num">
            {{ seperatedByThreeDigits(pageData.remain) }}
          </h5>
        </div>
      </div>
      <div class="stars">
        <p class="stars__title">از خریدتان چقدر راضی بودید ؟</p>
        <star-rating
          v-model:rating="rating"
          :star-size="42"
          active-color="#c69d4e"
          :show-rating="false"
          :read-only="rating == 0 ? false : true"
          class="vue-star"
          @update:rating="setRating"
        />
        <div class="stars__text">
          <p class="stars__link">بد</p>
          <p class="stars__link">ضعیف</p>
          <p class="stars__link">متوسط</p>
          <p class="stars__link">خوب</p>
          <p class="stars__link">عالی</p>
        </div>
      </div>
      <Grades
        :groupData="groupData"
        :groups="groups"
        :pageData="pageData"
        :nextLvl="nextLvl"
        :userLastGrade="userLastGrade"
      />
      <SocialMedia :socials="socials" />
      <StoreNavigator
        @click="$router.push({ name: 'Store', params: { id: walletId } })"
      />
    </section>
    <Footer />

    <div class="modal">
      <Modal :isOpen="showModal">
        <template v-slot:header>
          <star-rating
            v-model:rating="rating"
            :star-size="42"
            active-color="#c69d4e"
            :show-rating="false"
            :read-only="true"
          />
        </template>
        <template v-slot:content>
          <div class="star-rating-slots">
            <input
              type="text"
              placeholder="نظر خود را به ما بگویید"
              class="user-feedback__input"
              v-model="userFeedbackText"
            />
            <div class="user-feedback__btns">
              <button
                class="user-feedback__btn feedback-btn--reject"
                @click="ratingStatus('reject')"
              >
                <svg class="button__icon" viewBox="0 0 512 512">
                  <path
                    d="M357.1 154.91l-0.01 -0.01c-5.23,-5.23 -13.8,-5.24 -19.04,0l-82.05 82.05 -82.05 -82.05c-5.24,-5.24 -13.81,-5.23 -19.04,0l-0.01 0.01c-5.23,5.23 -5.24,13.8 0,19.04l82.05 82.05 -82.05 82.05c-5.24,5.24 -5.23,13.81 0,19.04l0.01 0.01c5.23,5.23 13.8,5.24 19.04,0l82.05 -82.05 82.05 82.05c5.24,5.24 13.81,5.23 19.04,0l0.01 -0.01c5.23,-5.23 5.24,-13.8 0,-19.04l-82.05 -82.05 82.05 -82.05c5.24,-5.24 5.23,-13.81 0,-19.04z"
                  ></path>
                </svg>
              </button>
              <button
                class="user-feedback__btn feedback-btn--confirm"
                :class="[isPosting && 'user-feedback__btn--loading']"
                @click="ratingStatus('confirm')"
              >
                <svg
                  class="button__icon"
                  viewBox="0 0 512 512"
                  v-if="!isPosting"
                >
                  <path
                    d="M394.58 154.91l0 -0.01c-5.24,-5.23 -13.8,-5.24 -19.04,0l-173.63 173.62 -65.45 -65.45c-5.24,-5.24 -13.8,-5.23 -19.04,0l0 0.01c-5.24,5.23 -5.24,13.8 0,19.04l74.97 74.97 0 0.01c5.24,5.23 13.81,5.24 19.05,0l183.14 -183.15c5.24,-5.24 5.24,-13.81 0,-19.04z"
                  ></path>
                </svg>
                <div
                  class="load"
                  :class="[isPosting && 'load--active']"
                  v-if="isPosting"
                >
                  <div class="lds-dual-ring"></div>
                </div>
              </button>
            </div>
          </div>
        </template>
      </Modal>
      <div
        class="backdrop"
        v-if="showModal"
        @click.self="ratingStatus('backDrop')"
      ></div>
    </div>
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
// api calls
import {
  getBuyEventData,
  postUserStarRating,
} from "@api/EventsServices/EventRequest";
// common components
import Navbar from "@common/Navbar.vue";
import HeaderComponent from "@common/HeaderComponent.vue";
import Footer from "@common/BaseFooter.vue";
import StoreNavigator from "@common/StoreNavigator.vue";
import SocialMedia from "@common/SocialMedia.vue";
import Grades from "@common/Grades.vue";
// modal
import Modal from "@common/Modal.vue";
// ref module
import { onBeforeMount, ref } from "vue";
// vuex and router
import { useRouter } from "vue-router";
import { useStore } from "vuex";
// vue star rating
import StarRating from "vue-star-rating";
export default {
  name: "Buy",
  setup(props) {
    const router = useRouter();
    const store = useStore();
    const pageData = ref({});
    const groupsArray = ref([]);
    const groupData = ref({});
    const socialMedia = ref([]);
    const rating = ref(null);
    const showModal = ref(false);
    const isLoading = ref(false);
    const userFeedbackText = ref("");
    const navbarText = ref("خرید");
    const nextLvl = ref(null);
    const userLastGrade = false;
    const walletId = ref(null);
    const errorMessage = ref("");
    const isPosting = ref(false);
    const setRating = () => {
      showModal.value = true;
    };

    const fetchData = async () => {
      try {
        const { data } = await getBuyEventData(props.id);
        const { group, social, groups, star, wallet_id } = data;
        isLoading.value = false;
        groupData.value = group;
        groupsArray.value = groups;
        socialMedia.value = social;
        pageData.value = data;
        rating.value = star;
        walletId.value = wallet_id;
        nextGrade();
      } catch (error) {
        if (error.message.includes("404")) {
          errorMessage.value = "صفحه مورد نظر یافت نشد";
          const notification = {
            type: "error",
            message: errorMessage.value,
          };
          store.dispatch("addNotification", notification);
        }
      }
    };

    const ratingStatus = (status) => {
      switch (status) {
        case "reject":
          showModal.value = false;
          rating.value = 0;
          break;
        case "confirm":
          isPosting.value = true;

          const formData = new FormData();
          formData.append("star", rating.value);
          formData.append("text", userFeedbackText.value);

          postUserStarRating(props.id, formData, {
            "Content-Type": "multipart/form-data",
          })
            .then((Response) => {
              if (Response.status == 200) {
                showModal.value = false;
                isPosting.value = false;
                router.push({ name: "Buy", params: { id: props.id } });
                errorMessage.value = "رای شما ثبت شد";
                const notification = {
                  type: "success",
                  message: errorMessage.value,
                };
                store.dispatch("addNotification", notification);
              }
            })
            .catch((error) => {
              const message = error.message;
              const notification = {
                type: "error",
                message,
              };
              store.dispatch("addNotification", notification);
            });
          break;
        case "backDrop":
          showModal.value = false;
          rating.value = 0;
          break;

        default:
          break;
      }
    };
    const nextGrade = () => {
      // if this.groupData.buy_sum = 6000000 next lvl will be silver
      const lvl = groupsArray.value.filter(
        (i) => i.min_buy > groupData.value.buy_sum
      );
      if (!lvl.length) {
        userLastGrade.value = true;
      } else {
        // select an object with lowest min_buy between (filtered groups array) => lvl
        const lowest = Math.min(...lvl.map((i) => i.min_buy));
        // filter bigger than our lowest (next lvl)
        const minimum = lvl.filter((i) => i.min_buy <= lowest);
        nextLvl.value = minimum[0];
      }
    };
    const seperatedByThreeDigits = (data) => {
      return data?.toLocaleString();
    };

    fetchData();
    isLoading.value = true;

    return {
      seperatedByThreeDigits,
      nextLvl,
      navbarText,
      pageData,
      setRating,
      isLoading,
      isPosting,
      socialMedia,
      showModal,
      rating,
      groupData,
      groups: groupsArray,
      userLastGrade,
      socials: socialMedia,
      ratingStatus,
      walletId,
      userFeedbackText,
    };
  },
  components: {
    Navbar,
    Footer,
    StoreNavigator,
    SocialMedia,
    HeaderComponent,
    Grades,
    StarRating,
    Modal,
  },
  props: ["id"],
};
</script>

<style lang="scss" scoped>
.buy-body {
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
  padding-bottom: 60px;
}
.buy-tnq {
  text-align: center;
  padding: 20px 0;
}
.buy-tnq-name {
  color: #c69d4e;
}
.buy-detail {
  background-color: #fff;
  width: 96%;
  display: flex;
  align-items: center;
  flex-direction: column;
  border-radius: 15px;
  padding: 10px 0;
}
.buy-detail-item {
  height: 50px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
}
.divider {
  width: calc(100% - 40px);
  height: 1px;
  background-color: rgba(0, 0, 0, 0.2);
}
.buy-cost,
.buy-credit,
.buy-remain {
  position: relative;
  font-size: 17px;
  font-weight: normal;
}
.buy-remain::before {
  position: absolute;
  content: "+";
  left: -12px;
  top: 1px;
}
.buy-remain::after,
.buy-credit::after,
.buy-cost::after {
  position: relative;
  content: "R";
  font-size: 9px;
  top: -7px;
  right: -2px;
  color: #555;
}
// stars
.stars {
  display: flex;
  width: 96%;
  border-radius: 15px;
  align-items: center;
  flex-direction: column;
  background-color: #fff;
  padding: 30px 0;
  margin: 20px 0;
}
.stars__title {
  width: 100%;
  font-size: 1.125em;
  text-align: center;
  margin-bottom: 20px;
}
.vue-star {
  direction: ltr;
}
.stars__text {
  direction: ltr;
  padding-left: 4px;
}
.stars__link {
  font-size: 0.75rem;
  display: inline-block;
  margin: 0 9px;
}
.user-feedback {
  position: fixed;
  overflow: hidden;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  margin: auto;
  height: 275px;
  width: 96%;
  z-index: 201;
  border-radius: 20px;
  background-color: #eee;
  transform: translateY(-200%);
  transition: all 0.4s ease;
  padding: 20px 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  .vue-star-rating {
    direction: ltr;
  }
}
.user-feedback__input {
  width: 100%;
  margin: 20px auto;
  height: 40px;
  padding: 0 20px;
  border-radius: 10px;
}
.user-feedback__btns {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  width: 100%;
  .button__icon {
    width: 30px;
  }
  .user-feedback__btn {
    width: 100%;
    border-radius: 20px;
    height: 65px;
    cursor: pointer;
  }
}
.feedback-btn--confirm {
  background-color: #fff;
}
.feedback-btn--reject {
  background-color: #ddd;
}
.user-feedback.active {
  transform: translateY(0%);
}
.backdrop {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 200;
}
.star-rating-slots {
  width: 100%;
  padding: 20px 30px;
  background-color: #eee;
  min-height: 100%;
}
// loading ring for post user feedback on star rating
.user-feedback__btn--loading {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
.load {
  width: 30px;
  height: 30px;
  margin: 0 0 15px 15px;
  display: none;
}
.load--active {
  display: flex;
}
.lds-dual-ring {
  display: inline-block;
  width: 30px;
  height: 30px;
}
.lds-dual-ring:after {
  content: " ";
  display: block;
  width: 24px;
  height: 24px;
  margin: 8px;
  border-radius: 50%;
  border: 2px solid #000;
  border-color: #000 transparent #000 transparent;
  animation: lds-dual-ring 1.2s linear infinite;
}
@keyframes lds-dual-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>