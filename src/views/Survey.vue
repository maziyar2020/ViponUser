<template>
  <section class="resolved" v-if="!isLoading">
    <Navbar :text="navbarText" />
    <HeaderComponent :pageData="headerData" />
    <div class="survey" :class="[userVoted && 'survey--comp']">
      <component :is="currentComponent" :pageDetail="pageDetail" />
      <i
        class="survey__divider"
        :class="[userVoted && 'survey__divider--dark']"
      ></i>
      <div class="survey__info" :class="[userVoted && 'survey__info--dark']">
        <p>{{ surveyData.text }}</p>
      </div>
      <img :src="surveyData.image" alt="" class="survey__img" />
      <div class="survey__vote" :class="[userVoted && 'survey__vote--dark']">
        <div
          class="survey__vote-item"
          v-for="(survey, index) in surveyVote"
          :key="index"
        >
          <label class="survey__vote-label" @click="handleVote(survey)">
            <input
              type="radio"
              name="survey"
              class="survey__vote-radio"
              :value="survey.id"
              :checked="checkedMark(survey)"
              :disabled="userVoted ? '' : 'test'"
            />
            <span class="checkmark"></span>
          </label>
          <p class="survey__vote-text">{{ survey.text }}</p>
        </div>
      </div>
      <section class="timer">
        <p class="timer__title">زمان باقیمانده تا پایان نظر سنجی</p>
        <div class="count-down">
          <div class="timer__number count-down--day">{{ timer.day }}</div>
          <div class="timer__number count-down--hour">{{ timer.hour }}</div>
          <div class="timer__number count-down--minute">{{ timer.minute }}</div>
          <div class="timer__number count-down--second">{{ timer.second }}</div>
        </div>
        <p
          class="timer__title"
          style="color: red"
          v-if="userVoted || surveyExpire"
        >
          {{ surveyStatus }}
        </p>
      </section>
      <SocialMedia :socials="socials" :darkMode="userVoted" />
      <StoreNavigator
        @click="$router.push({ name: 'Store', params: { id: walletId } })"
      />
    </div>
    <div class="modal">
      <Modal :isOpen="showModal">
        <template v-slot:header>
          <div class="user-choose">
            <p class="user-choose-text">نظر شما :</p>
            <p>{{ userVoteDetail.text }}</p>
          </div>
        </template>
        <template v-slot:content>
          <div class="feedback-modal">
            <input
              type="text"
              placeholder="نظر خود را به ما بگویید"
              class="user-feedback__input"
              v-model="userFeedbackText"
            />
            <div class="user-feedback__btns">
              <button
                class="user-feedback__btn feedback-btn--reject"
                @click="surveyVoteStatus('reject')"
              >
                <svg class="button__icon" viewBox="0 0 512 512">
                  <path
                    d="M357.1 154.91l-0.01 -0.01c-5.23,-5.23 -13.8,-5.24 -19.04,0l-82.05 82.05 -82.05 -82.05c-5.24,-5.24 -13.81,-5.23 -19.04,0l-0.01 0.01c-5.23,5.23 -5.24,13.8 0,19.04l82.05 82.05 -82.05 82.05c-5.24,5.24 -5.23,13.81 0,19.04l0.01 0.01c5.23,5.23 13.8,5.24 19.04,0l82.05 -82.05 82.05 82.05c5.24,5.24 13.81,5.23 19.04,0l0.01 -0.01c5.23,-5.23 5.24,-13.8 0,-19.04l-82.05 -82.05 82.05 -82.05c5.24,-5.24 5.23,-13.81 0,-19.04z"
                  ></path>
                </svg>
              </button>
              <button
                class="user-feedback__btn feedback-btn--confirm"
                @click="surveyVoteStatus('confirm')"
              >
                <svg class="button__icon" viewBox="0 0 512 512">
                  <path
                    d="M394.58 154.91l0 -0.01c-5.24,-5.23 -13.8,-5.24 -19.04,0l-173.63 173.62 -65.45 -65.45c-5.24,-5.24 -13.8,-5.23 -19.04,0l0 0.01c-5.24,5.23 -5.24,13.8 0,19.04l74.97 74.97 0 0.01c5.24,5.23 13.81,5.24 19.05,0l183.14 -183.15c5.24,-5.24 5.24,-13.81 0,-19.04z"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
        </template>
      </Modal>
      <div
        class="backdrop"
        @click.self="surveyVoteStatus('reject')"
        v-if="showModal"
      ></div>
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
import {
  getSurveyDetail,
  postUserVote,
} from "@api/SurveyServices/SurveyRequest";

import Navbar from "@common/Navbar.vue";
import Footer from "@common/BaseFooter.vue";
import HeaderComponent from "@common/HeaderComponent.vue";
import SocialMedia from "@common/SocialMedia.vue";
import Modal from "@common/Modal.vue";
import StoreNavigator from "@common/StoreNavigator.vue";
// reactive components
import SurveyCompleted from "../components/SubComponents/Survey-reactive/SurveyCompleted.vue";
import SurveyNotCompleted from "../components/SubComponents/Survey-reactive/SurveyNotCompleted.vue";
import SurveyIsExpired from "../components/SubComponents/Survey-reactive/surveyExpired.vue";
// composition api refrence
import { ref } from "vue";
import {useStore} from 'vuex'
import {useRouter} from 'vue-router'
export default {
  name: "Survey",
  components: {
    Navbar,
    Footer,
    HeaderComponent,
    SocialMedia,
    StoreNavigator,
    SurveyCompleted,
    SurveyNotCompleted,
    SurveyIsExpired,
    Modal,
  },
  props: ["id", "shopId"],
  setup(props) {
      const store = useStore()
      const router = useRouter()
    const navbarText = ref("نظر سنجی");
    const currentComponent = ref("SurveyNotCompleted");
    const headerData = ref({});
    const pageDetail = ref({});
    const surveyData = ref({});
    const surveyVote = ref([]);
    const socials = ref([]);
    const userVoted = ref(false);
    const showModal = ref(false);
    const isLoading = ref(false);
    const userFeedbackText = ref("");
    const userVoteDetail = ref({});
    const surveyStatus = ref("");
    const checkmarks = ref([]);
    const surveyExpire = ref(false);
    const timer = ref({
      hour: "",
      day: "",
      minute: "",
      second: "",
    });
    const walletId = ref(null);

    // when page mounted to DOM this method will fire
    const fetchSurveyDetail = async () => {
      // will call a api and store the data in data variable
      const { data } = await getSurveyDetail(props.id);
      isLoading.value = false;

      // extract datas from data variable
      const {
        store,
        store_en,
        store_image,
        survey,
        items,
        social,
        completed,
        wallet_id,
      } = data;

      walletId.value = wallet_id;
      // this object will render header component details => image - name - and english name
      headerData.value = {
        store_image,
        store_name: store,
        store_name_en: store_en,
      };
      // all the datas that retrived from api call will store in pageDetail vue-data
      pageDetail.value = data;
      // survey array that retrived from api call will stroe in surveyData and we will render it to Dom by this variable
      surveyData.value = survey;
      // items is an array that contains survey data such as id and survey option
      surveyVote.value = items;
      // telegram and instagram details
      socials.value = social;

      // if there is data text in api call user has been voted => this.userVoted = true => surveycompleted component will load
      if (completed == 1) {
        userVoted.value = true;
        currentComponent.value = "SurveyCompleted";
        // if there isnt any data in surveyItem variable from api call data = > this user has not voted
      } else if (completed == 0) {
        userVoted.value = false;
        currentComponent.value = "SurveyNotCompleted";
      }

      // count down timer
      const countDown = () => {
        const timerInter = setInterval(() => {
          const now = new Date().getTime();
          const time = new Date(
            `${surveyData.value.expired_at} 00:00:00`
          ).getTime();
          const distance = time - now;

          const day = Math.floor(distance / (1000 * 60 * 60 * 24));
          const hour = Math.floor(
            (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          );
          const minute = Math.floor(
            (distance % (1000 * 60 * 60)) / (1000 * 60)
          );
          const second = Math.floor((distance % (1000 * 60)) / 1000);

          const destroyTimer = () => {
            clearInterval(timerInter);
            timer.value.day = "00";
            timer.value.hour = "00";
            timer.value.minute = "00";
            timer.value.second = "00";
          };

          timer.value.day = day;
          timer.value.hour = hour;
          timer.value.minute = minute;
          timer.value.second = second;

          // if userVoted is true => count down will be clear and display a message
          if (userVoted.value) {
            destroyTimer();
            surveyStatus.value = "نظر شما ثبت شد";
          }

          // if distance decreased to 0 timer will be determinated and surveyExpire component will render
          if (distance < 0 && completed == 1) {
            destroyTimer();
            currentComponent.value = "SurveyCompleted";
            userVoted.value = true;
            surveyStatus.value = "نظر شما ثبت شد";
          }
          if (completed == 0 && distance < 0) {
            destroyTimer();
            surveyExpire.value = true;
            currentComponent.value = "SurveyIsExpired";
            userVoted.value = true;
            surveyStatus.value = "زمان نظر سنجی به پایان رسید";
          }
        }, 1000);
      };
      countDown();
    };
    // when user click on a survey option this method will fire
    // takes check parameter that contains survey option and id that user clicked on
    const handleVote = (check) => {
      if (!userVoted.value) {
        // this variable will store a object that user clicked on
        userVoteDetail.value = check;
        // and Modal will be SHow
        showModal.value = true;
      }
    };

    const surveyVoteStatus = async (data) => {
      switch (data) {
        // if user clicked on accept modal
        case "confirm":
          // Data will send to endpoint with formdata
          const bodyFormData = new FormData();
          bodyFormData.append("vote_id", userVoteDetail.value.id);
          bodyFormData.append("text", userFeedbackText.value);

          // this is our data that we are gonna send it to endpoint
          await postUserVote(props.id, bodyFormData, {
            "Content-Type": "multipart/form-data",
          }).then((Response) => {
            // and then if response was succesfull
            // we will set userVOted to true and survey completed component will render
            // and modal will be close
            if (Response.status == 200) {
              isLoading.value = true;
              const message = "نظر شما ثبت گردید";
              const notification = {
                type: "success",
                message,
              };
              store.dispatch("addNotification", notification);
              setTimeout(() => {
                router.go();
                userVoted.value = true;
                currentComponent.value = "SurveyCompleted";
                showModal.value = false;
              }, 1000);
            }
          });

          break;
        // if user didnt accept modal userVoted will be set to false and modal will be closed
        case "reject":
          userVoted.value = false;
          showModal.value = false;
          break;
        default:
          break;
      }
    };
    const checkedMark = (obj) => {
      if (userVoted.value) {
        const filteredVoteArray = surveyVote.value.find((i) => i.id == obj.id);
        const checked = pageDetail.value.surveyItem == filteredVoteArray.id;
        return checked;
      } else {
        return false;
      }
    };

    fetchSurveyDetail()

    return {
      isLoading,
      navbarText,
      headerData,
      userVoted,
      currentComponent,
      pageDetail,
      userVoted,
      surveyData,
      surveyVote,
      surveyStatus,
      surveyExpire,
      timer,
      socials,
      showModal,
      checkedMark,
      surveyVoteStatus,
      handleVote,
      userVoteDetail,
      userFeedbackText
    };
  },
};
</script>

<style scoped lang="scss">
.survey {
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
.survey--comp {
  background-color: #080808;
}
.survey__divider {
  height: 1px;
  width: 90%;
  background-color: #ddd;
}
.survey__info {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin: 20px 0 30px;
}
.survey__vote {
  margin: 0 0 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 96%;
  background-color: #fff;
  border-radius: 20px;
  padding: 10px 0;
}
.survey__vote-item {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0 20px;
  margin: 20px 0;
  position: relative;
}
.survey__vote-item::after {
  margin-top: 10px;
  position: absolute;
  bottom: -20px;
  left: 0;
  right: 0;
  width: 90%;
  margin: auto;
  background-color: #eee;
  height: 1px;
  content: "";
}
.survey__vote-item:last-child::after {
  height: 0;
}
.survey__vote-detail {
  margin-left: 10px;
}
.survey__vote-label {
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  width: 23px;
  height: 23px;
  border-radius: 100%;
  overflow: hidden;
  background-color: #ddd;
}
.survey__vote-text {
  margin-right: 10px;
  font-size: 14px;
}
.survey__vote-radio {
  opacity: 0;
  width: 0;
  height: 0;
}
.checkmark {
  position: relative;
  width: 15px;
  height: 15px;
  background: #ddd;
  border-radius: 100%;
  transition: all 0.3s ease;
}
.survey__vote-radio:checked + .checkmark {
  background-color: #c69d4e;
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
  font-size: 40px;
  width: 65px;
  margin: 0 4px;
  background-color: #1a1a1a;
  border-radius: 10px;
  padding-top: 4px;
  font-family: "Courier New", Courier, monospace;
  color: #ddd;
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
// modal
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
}
.user-choose {
  display: flex;
  flex-direction: column;
  text-align: center;
  .user-choose-text {
    color: #c69d4e;
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
  background-color: rgba(0, 0, 0, 0.9);
  z-index: 222;
}
// classbinds
.survey__info--dark {
  color: #fff;
}
.survey__vote--dark {
  background-color: #181818;
  color: #fff;
}
.survey__vote--dark .survey__vote-item::after {
  background-color: hsla(0, 0%, 100%, 0.05);
}
.survey__divider--dark {
  display: none;
}
.survey__img {
  max-width: 600px;
  border-radius: 15px;
  margin-bottom: 25px;
  width: 85%;
}
.feedback-modal {
  background-color: #eee;
  height: 100%;
  padding: 10px 20px;
}
</style>