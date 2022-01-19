<template>
  <div class="resolve" v-if="!isLoading">
    <section class="main-wrapper">
      <div class="hello">
        <p class="hello-text">خوش آمدید</p>
        <p class="hello-text num-eng">welcome</p>
      </div>
      <p class="explain">لطفاً مشخصات خود را تأیید و تکمیل نمایید.</p>
      <form class="profile" @submit.prevent="formSub">
        <BaseInput
          :model="form.name"
          @inputChanged="inputValue"
          label="نام و نام خانوادگی"
        />
        <div class="gender">
          <div
            class="gender-item"
            @click="setGender('male')"
            :class="[isMale && 'gender-item--active']"
          >
            <svg
              viewBox="0 0 600 512"
              style="
                shape-rendering: geometricprecision;
                text-rendering: geometricprecision;
                fill-rule: evenodd;
                clip-rule: evenodd;
              "
            >
              <path
                d="M413.02 162.27c1.23,23.47 1.89,51.17 -22.61,61.08 -0.45,28.9 -14.49,55.52 -38.04,72.35 -3.28,2.34 -6.69,4.45 -10.22,6.32 2.32,7.88 7.11,14.74 13.52,19.63 0.84,0.35 1.58,0.88 2.17,1.55 3.89,2.55 8.27,4.43 13.01,5.44l21.91 3.44c5.23,0.76 10.4,2.1 15.34,3.99 26.89,10.79 44.52,36.87 44.52,65.85 0,0.1 0,0.21 0,0.31l0 62.05c-0.01,3.34 -2.71,6.04 -6.04,6.04l0 0 -293.15 0c-3.33,0 -6.03,-2.7 -6.03,-6.04l0 -62.05c-0.01,-0.43 -0.01,-0.89 -0.01,-1.32 0,-34.65 25.52,-64.01 59.83,-68.82l22.34 -3.5c13.55,-3.04 24.21,-13.12 28.2,-26.07 -4,-2.23 -7.41,-4.74 -11.24,-7.66 -21.94,-16.74 -35.91,-41.82 -36.92,-69.58l-0.02 -0.57 -0.56 -0.13c-12.1,-2.91 -20.8,-13.72 -20.8,-26.22l0 -35.35c-1.42,-65.83 37.85,-116.73 105.77,-119.35 24.55,-0.95 52.75,4.86 74.64,15.92 3.86,1.96 4.45,7.25 1.17,10.05l-1.12 0.95 1.43 0.35c23.81,5.81 43.47,20.31 56.45,41.14 1.5,2.4 1.1,5.79 -0.88,7.8 -7.69,7.8 -12.23,17.91 -12.99,28.73 -0.29,4.18 0.11,9.4 0.33,13.67zm-22.6 46.95c12.24,-11.21 11.62,-29.11 10.53,-46.7 -0.35,-5.61 -0.79,-10.01 -0.28,-15.83 1.01,-11.52 5.43,-22.41 12.85,-31.43l0.36 -0.44 -0.33 -0.47c-13.3,-19.04 -33.99,-31.03 -57.07,-33.51l-11.98 -1.28c-6.21,-0.66 -7.44,-9.26 -1.66,-11.64l7.28 -3 -1.87 -0.65c-38.5,-13.42 -87.07,-12.94 -118.05,16.93 -21.63,20.84 -30.5,52.2 -29.85,81.6 0.1,11.83 0,23.71 0,35.56 0,5.56 3.15,10.57 8.05,13.13l1.11 0.57 -0.01 -1.24c-0.04,-8.33 -0.14,-16.65 -0.19,-24.97 -0.19,-31.05 28.65,-53.87 58.84,-46.63 8.06,1.94 15.6,4.69 23.13,8.15 6.3,2.91 12.39,6.22 18.69,9.11 4.36,2.01 8.53,3.61 12.69,4.83l0.1 0.03 0.32 0.09 0.04 0.02 0.29 0.08 0.17 0.05 0.15 0.04c5.3,1.47 10.6,2.32 16.27,2.61 0.18,0 0.36,0 0.54,0 1.51,0.07 2.99,0.11 4.44,0.11 1.38,0 2.79,-0.04 4.23,-0.11 0.18,0 0.36,0 0.53,0 8.52,-0.43 16.45,-1.59 24.3,-5.3 17.53,-8.28 16.37,4.13 16.38,13.81 0.02,12.16 0.01,24.32 0,36.48zm-12.1 -38.98c-0.02,0.92 -0.03,1.82 -0.03,2.67 0.01,16.34 -0.01,32.69 -0.01,49.03 0,43.18 -35.12,78.31 -78.31,78.31 -43.18,0 -78.31,-35.13 -78.31,-78.31 0,-12.06 -0.14,-24.11 -0.22,-36.17 -0.14,-23.17 21.35,-40.15 43.88,-34.75 12.56,3.01 22.64,8.23 34.08,13.84 6.91,3.39 13.18,6.05 19.46,7.97l0.12 0.03 0.26 0.08c8.05,2.42 16.14,3.62 25.63,3.58 9.71,0.06 17.94,-1.17 26.14,-3.66l0 -0.07c2.43,-0.74 4.85,-1.59 7.31,-2.55zm-109.47 137.14c7.34,2.49 15.09,3.89 22.73,4.66 13.48,1.36 26.96,-0.44 39.48,-5.06 2.61,7.91 7.12,14.98 13.03,20.63l-44.08 41.07 -44.05 -41.09c5.8,-5.55 10.26,-12.46 12.89,-20.21zm31.16 75.59c-0.01,0 -0.01,0 -0.02,0 -1.52,0 -2.99,-0.58 -4.1,-1.63l-49.75 -46.41c-4.4,2.51 -9.22,4.39 -14.36,5.5l-22.63 3.57c-4.35,0.6 -8.63,1.71 -12.73,3.25 -22.31,9.02 -36.92,30.69 -36.92,54.75 0,0.06 0,0.13 0,0.19l0 56.02 281.04 0 0 -55.98c0,-0.08 0,-0.17 0,-0.24 0,-24.07 -14.64,-45.73 -36.97,-54.7 -4.1,-1.54 -8.38,-2.64 -12.72,-3.26l-22.24 -3.5c-5.26,-1.1 -10.2,-3.01 -14.69,-5.58l-49.78 46.41c-1.11,1.03 -2.58,1.61 -4.09,1.61 -0.02,0 -0.03,0 -0.04,0l0 0z"
              ></path>
            </svg>
            <span>مرد</span>
          </div>
          <div
            class="gender-item"
            @click="setGender('female')"
            :class="[!isMale && 'gender-item--active']"
          >
            <svg viewBox="0 0 600 512">
              <path
                d="M384.67 317.47c-1.6,0 -3.14,-0.64 -4.27,-1.77 -10.65,-10.66 -23.31,-19.14 -37.24,-24.88 -2.34,-0.89 -3.88,-3.13 -3.88,-5.64 0,-3.33 2.7,-6.03 6.04,-6.03 0.84,0 1.67,0.17 2.44,0.52 13.17,5.42 25.36,13.08 35.97,22.58 18.27,-28.48 28.01,-61.62 28.01,-95.46 0,-0.71 -0.02,-1.46 -0.02,-2.15 0,-87.84 -47.15,-149.17 -114.66,-149.17 -67.51,0 -114.75,61.33 -114.75,149.15 0.02,0.7 0,1.48 0,2.19 0,33.84 9.77,66.99 28.07,95.43 10.58,-9.48 22.76,-17.17 35.9,-22.59 0.78,-0.34 1.61,-0.52 2.46,-0.52 3.33,0 6.03,2.7 6.03,6.04 0,2.5 -1.54,4.74 -3.88,5.64 -13.87,5.73 -26.54,14.21 -37.15,24.85 -1.13,1.13 -2.67,1.77 -4.27,1.77 -1.92,0 -3.72,-0.91 -4.85,-2.45 -22.36,-31.49 -34.39,-69.19 -34.39,-107.82 0,-0.84 0.02,-1.73 0.02,-2.55 0,-94.9 52.16,-161.2 126.82,-161.2 74.67,0 126.74,66.3 126.74,161.23 -0.01,0.77 0.01,1.69 0.01,2.51 0,38.61 -12,76.33 -34.28,107.84 -1.05,1.42 -2.66,2.3 -4.41,2.43l-0.46 0.05z"
              ></path>
              <path
                d="M300.71 313.01l-7.37 0c-0.01,0 -0.02,0 -0.03,0 -0.27,0 -0.55,-0.02 -0.83,-0.06 -95.38,-13.65 -84.62,-151.37 -84.51,-152.76 0.15,-1.72 1.02,-3.3 2.41,-4.32 1.05,-0.78 2.32,-1.19 3.62,-1.19 0.41,0 0.81,0.04 1.21,0.12 7.71,1.41 15.6,2.12 23.46,2.12 10.46,0 20.91,-1.27 31.07,-3.76 41.21,-12.07 56.5,-37.24 56.65,-37.5 1.09,-1.84 3.07,-2.98 5.22,-2.98 2.86,0 5.34,2.02 5.91,4.83 0.26,1.21 6.95,30.79 43.59,37.25 2.69,0.48 4.72,2.71 4.95,5.43 0.13,1.39 10.91,139.11 -84.51,152.76 -0.26,0.04 -0.53,0.06 -0.8,0.06 -0.01,0 -0.02,0 -0.04,0zm-6.11 -12.13l6.51 0c74.76,-11.07 74.92,-112.61 74.01,-135.22 -19.42,-3.98 -35.91,-16.8 -44.57,-34.64 -15.36,16.24 -34.99,27.93 -56.59,33.67 -11.12,2.88 -22.64,4.35 -34.16,4.35 -6.44,0 -12.9,-0.47 -19.28,-1.37 -0.74,26.17 1.5,122.46 74.09,133.21l-0.01 0z"
              ></path>
              <path
                d="M444.11 470.32l-293.14 0c-3.34,0 -6.04,-2.7 -6.04,-6.04l0 -62.05c0,-0.43 -0.01,-0.89 -0.01,-1.32 0,-34.65 25.52,-64.01 59.83,-68.82l22.34 -3.5c15.87,-3.55 27.76,-16.77 29.64,-32.92 0.31,-3.08 2.91,-5.44 6.01,-5.44 3.31,0 6.01,2.68 6.03,5.99 0,0.22 0,0.52 -0.03,0.74 -2.49,21.43 -18.35,38.91 -39.42,43.47l-22.64 3.57c-4.34,0.6 -8.62,1.71 -12.73,3.25 -22.31,9.02 -36.92,30.69 -36.92,54.75 0,0.06 0,0.13 0,0.19l0 56.02 281.04 0 0 -55.98c0.01,-0.08 0.01,-0.17 0.01,-0.24 0,-24.07 -14.65,-45.73 -36.97,-54.7 -4.11,-1.54 -8.39,-2.64 -12.73,-3.26l-22.23 -3.5c-21.52,-4.5 -37.64,-22.44 -39.85,-44.31 -0.02,-0.2 -0.03,-0.4 -0.03,-0.6 0,-3.34 2.71,-6.04 6.04,-6.04 3.1,0 5.7,2.35 6.01,5.43 1.65,16.55 13.81,30.14 30.06,33.63l21.92 3.44c5.23,0.76 10.39,2.1 15.33,3.99 26.9,10.79 44.52,36.87 44.52,65.85 0,0.1 0,0.21 0,0.31l0 62.05c0,3.34 -2.7,6.04 -6.04,6.04l0 0z"
              ></path>
              <path
                d="M297.54 382.97c0,0 -0.01,0 -0.02,0 -1.52,0 -2.99,-0.58 -4.1,-1.63l-53.18 -49.62c-1.13,-1.13 -1.76,-2.66 -1.76,-4.26 0,-3.34 2.7,-6.04 6.03,-6.04 1.46,0 2.86,0.53 3.96,1.48l49.07 45.78 49.14 -45.78c1.13,-1.09 2.64,-1.71 4.21,-1.71 3.33,0 6.03,2.71 6.03,6.04 0,1.72 -0.73,3.36 -2.01,4.5l-53.24 49.63c-1.11,1.03 -2.57,1.61 -4.09,1.61 -0.01,0 -0.03,0 -0.04,0l0 0z"
              ></path>
            </svg>
            <span>زن</span>
          </div>
        </div>
        <div class="date">
          <div class="date__title">تاریخ تولد</div>
          <div class="date__btns">
            <div class="date__btn eng-num" @click="dateModal('day')">
              {{ form.day || "روز" }}
            </div>
            <div class="date__btn" @click="dateModal('month')">
              {{ form.month || "ماه" }}
            </div>
            <div class="date__btn eng-num" @click="dateModal('year')">
              {{ form.year || "سال" }}
            </div>
          </div>
        </div>
        <div class="province-city">
          <button
            class="province-city__btn"
            @click="modals.province = true"
            type="button"
          >
            {{ form.province || "استان" }} / {{ form.city || "شهر" }}
          </button>
        </div>
        <div class="confirm">
          <button class="confirm__btn" type="submit">
            <p v-if="!formSubmitted">تایید و ورود</p>
          </button>
        </div>
      </form>
      <!--  -->
      <div class="modals">
        <!-- birthday => day modal -->
        <Modal :isOpen="modals.day">
          <template v-slot:header>
            <p>روز تولد</p>
          </template>
          <template v-slot:content>
            <div
              class="modal-item eng-num"
              v-for="(day, index) in days"
              :key="index"
              @click="birthDay(day)"
            >
              {{ day }}
            </div>
          </template>
        </Modal>
        <!-- birthday => month modal -->
        <Modal :isOpen="modals.month">
          <template v-slot:header>
            <p>ماه تولد</p>
          </template>
          <template v-slot:content>
            <div
              class="modal-item"
              v-for="(month, index) in months"
              :key="index"
              @click="birthMonth(month)"
            >
              {{ month.name }}
            </div>
          </template>
        </Modal>
        <!-- birthday => year modal -->
        <Modal :isOpen="modals.year">
          <template v-slot:header>
            <p>سال تولد</p>
          </template>
          <template v-slot:content>
            <div
              class="modal-item eng-num"
              v-for="(year, index) in years"
              :key="index"
              @click="birthYear(year)"
            >
              {{ year }}
            </div>
          </template>
        </Modal>
        <!-- province choose modal -->
        <Modal :isOpen="modals.province">
          <template v-slot:header>
            <p>انتخاب استان</p>
          </template>
          <template v-slot:content>
            <div
              class="modal-item"
              v-for="(prov, index) in provinces"
              :key="index"
              @click="provinceChoose(prov)"
            >
              {{ prov.name }}
            </div>
          </template>
        </Modal>
        <!-- city choose modal -->
        <Modal :isOpen="modals.city">
          <template v-slot:header>
            <p>انتخاب استان</p>
          </template>
          <template v-slot:content>
            <div
              class="modal-item"
              v-for="(city, index) in cities"
              :key="index"
              @click="cityChoose(city)"
            >
              {{ city.name }}
            </div>
          </template>
        </Modal>
        <!-- birthday - day backdrop -->
        <div
          class="backdrop"
          v-if="modals.day"
          @click.self="modals.day = false"
        ></div>
        <!-- birthday - month backdrop -->
        <div
          class="backdrop"
          v-if="modals.month"
          @click.self="modals.month = false"
        ></div>
        <!-- birthday - year backdrop -->
        <div
          class="backdrop"
          v-if="modals.year"
          @click.self="modals.year = false"
        ></div>
        <!-- provinces backdrop -->
        <div
          class="backdrop"
          v-if="modals.province"
          @click.self="provinceAndCityBackDrop('province')"
        ></div>
        <!--  city backdrop -->
        <div
          class="backdrop"
          v-if="modals.city"
          @click.self="provinceAndCityBackDrop('city')"
        ></div>
      </div>
    </section>
  </div>
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
  getProvinceDetail,
  getCityDetail,
} from "../services/ProfileServices/ProfileRequest";
import {
  getCompleted,
  postCompleted,
} from "../services/UserServices/UserDetail";

import BaseInput from "@common/BaseInput.vue";
import Modal from "@common/Modal.vue";
// joi validation methods

import {
  requiredNumber,
  schemaMaker,
  requiredStringMin,
  requiredString,
} from "@utils/JoiValidation";

// joi validation

const schema = schemaMaker({
  userName: requiredStringMin("نام کاربری", 3),
  gender: requiredString("جنسیت"),
  day: requiredString("روز"),
  month: requiredString("ماه"),
  year: requiredString("سال"),
  province: requiredNumber("استان"),
  city: requiredNumber("شهر"),
});

// date converter package
const shamsi = require("shamsi");
export default {
  name: "SignUp",
  data() {
    return {
      // each of this object and arrays will render each part of the page
      // or they will keeping the api call datas in them
      userInfo: {},
      provinces: [],
      cities: [],
      days: [],
      years: [],
      months: [
        { id: "01", name: "فروردین" },
        { id: "02", name: "اردیبهشت" },
        { id: "03", name: "خرداد" },
        { id: "04", name: "تیر" },
        { id: "05", name: "مرداد" },
        { id: "06", name: "شهریور" },
        { id: "07", name: "مهر" },
        { id: "08", name: "آبان" },
        { id: "09", name: "آذر" },
        { id: "10", name: "دی" },
        { id: "11", name: "بهمن" },
        { id: "12", name: "اسفند" },
      ],
      // all the forms data will store here
      form: {
        name: "",
        gender: "",
        day: "",
        month: "",
        year: "",
        province: "",
        city: "",
        provinceId: "",
        cityId: "",
        monthId: "",
      },
      modals: {
        day: false,
        month: false,
        year: false,
        province: false,
        city: false,
      },
      // this boolean is for gender of the user if its true he is male and send 1 to backEnd if its false she is a woman and send 2 to backend
      isMale: null,
      // component initial loading
      isLoading: false,
      formSubmitted : false
    };
  },
  components: {
    Modal,
    BaseInput,
  },
  watch: {
    "form.monthId"(newVal) {
      if (this.form.day > 30 && newVal > 6) {
        const notification = {
          message: "لطفا تاریخ معتبر وارد کنید",
          path: ["Date"],
          type: "warning",
        };
        this.removeFields();
        this.$store.dispatch("addNotification", notification);
      } else if (newVal > 6 && this.form.year == 1400) {
        const notification = {
          message: "لطفا تاریخ معتبر وارد کنید",
          path: ["Date"],
          type: "warning",
        };
        this.removeFields();
        this.$store.dispatch("addNotification", notification);
      }
    },
    "form.day"(newVal) {
      if (newVal > 30 && this.form.monthId > 6) {
        const notification = {
          message: "لطفا تاریخ معتبر وارد کنید",
          path: ["Date"],
          type: "warning",
        };
        this.removeFields();
        this.$store.dispatch("addNotification", notification);
        console.log("hi");
      }
    },
    "form.year"(newVal) {
      if (newVal == 1400 && this.form.monthId > 6) {
        const notification = {
          message: "لطفا تاریخ معتبر وارد کنید",
          path: ["Date"],
          type: "warning",
        };
        this.removeFields();
        this.$store.dispatch("addNotification", notification);
      }
    },
  },
  methods: {
    // this method will automaticly call whenever user load the component
    async fetchUserData() {
      try {
        const { data } = await getCompleted();
        this.userInfo = data;

        const { name, gender } = data;

        this.form.gender = gender ? gender : "";
        this.form.name = name ? name : "";

        // if gender = 1 means our user is male
        if (gender == 1) {
          this.isMale = true;
        } else {
          this.isMale = false;
        }
      } catch (error) {
        if (error.message.includes("404")) {
          const message = "اطلاعات کاربر یافت نشد";
          const notification = {
            type: "error",
            message,
          };
          this.$store.dispatch("addNotification", notification);
        }
      } finally {
        this.isLoading = false;
      }
    },
    // when user click on the gender choose boxes the isMale data will change
    setGender(gender) {
      switch (gender) {
        case "male":
          this.isMale = true;
          break;
        case "female":
          this.isMale = false;
          break;

        default:
          break;
      }
    },
    // this method will call an api and store  the results that is  about provinces in provinces data object
    async fetchProvinceData() {
      try {
        const { data } = await getProvinceDetail();
        this.provinces = data.results;
      } catch (error) {
        if (error.message.includes("404")) {
          const message = "اطلاعات استان یافت نشد";
          const notification = {
            type: "error",
            message,
          };
          this.$store.dispatch("addNotification", notification);
        }
      }
    },
    //when user clicked on day or month or year to choose his/her birthday date this method will fire
    dateModal(type) {
      // type = which box do you clicked
      switch (type) {
        // if its day box dayModal will render
        case "day":
          this.modals.day = true;
          break;
        // if its month box month will render
        case "month":
          this.modals.month = true;
          break;
        // if its year box year will render
        case "year":
          this.modals.year = true;
          break;

        default:
          break;
      }
    },
    // when user has choosen his/her birth (Day) its store in form.day => and we will sent this form object to backEnd
    birthDay(data) {
      this.form.day = data;
      // close the Modal
      this.modals.day = false;
    },
    // when user has choosen his/her birth (Month) its store in form.month => and we will sent this form object to backEnd
    // and 1 thing else => form.month will render the month in words => esfand - tir => based on their month Id
    birthMonth(data) {
      this.form.month = data.name;
      this.form.monthId = data.id;
      this.modals.month = false;
    },
    // when user has choosen his/her birth (Year) its store in form.year => and we will sent this form object to backEnd
    birthYear(data) {
      this.form.year = data;
      this.modals.year = false;
    },
    // when user has choosen the province
    // we will store the province name and id in our form
    // and then we will call an api to get cities of the choosen province
    async provinceChoose(province) {
      this.form.province = province.name;
      this.form.provinceId = province.id;
      this.modals.province = false;

      // and this method is an api call that calls according to choosen province => data.id == province name/id
      try {
        const { data } = await getCityDetail(province.id);
        this.cities = data.results;
        this.modals.city = true;
      } catch (error) {
        if (error.message.includes("400") || error.message.includes("404")) {
          const message = "اطلاعات شهرها یافت نشد";
          const notification = {
            type: "error",
            message,
          };
          this.$store.dispatch("addNotification", notification);
        }
      }
    },
    // when user has Choosen the City it will store in form.city
    // and city id will store in form to send to backEnd
    // and at the end city MOdal will be closed
    cityChoose(city) {
      this.form.city = city.name;
      this.form.cityId = city.id;
      this.modals.city = false;
    },
    // this method will close the modals if the user clicked on backDrop
    provinceAndCityBackDrop(status) {
      // this method will reset the city and provinces if user clicked on backDrop
      const resetDataToDefault = () => {
        this.form.province = "انتخاب استان";
        this.form.provinceId = "";
        this.form.cityId = "";
        this.form.city = "شهر";
      };

      switch (status) {
        case "province":
          this.modals.province = false;
          resetDataToDefault();
          break;
        case "city":
          this.modals.city = false;
          resetDataToDefault();
          break;

        default:
          break;
      }
    },
    validation() {
      // this method will valuate form based on schema rules
      const values = {
        userName: this.form.name,
        gender: this.form.gender,
        day: this.form.day,
        month: this.form.monthId,
        year: this.form.year,
        province: this.form.provinceId,
        city: this.form.cityId,
      };
      const option = { abortEarly: false };
      const { error, value } = schema.validate(values, option);
      // returning the errors and values whenever this method called
      return { error, value };
    },
    async formSub() {
      if (this.validation().error) {
        this.validation().error.details.forEach((i) => {
          const notification = {
            type: "error",
            message: i.message,
          };
          this.$store.dispatch("addNotification", notification);
        });
      } else {
        // get validated values from validation method
        const validated = this.validation().value;
        // convert jalali date to gregorian and convert it to string
        const dateConvertor = shamsi
          .jalaliToGregorian(
            Number(this.form.year),
            Number(this.form.monthId),
            Number(this.form.day)
          )
          .toString();
        // change comma to dash
        const bd = dateConvertor.replace(/,/gi, "-");
        // if isMale is true send 1 to backEnd if its false send 2
        let gender = "";
        this.isMale ? (gender = "1") : (gender = "2");
        // bd_shamsi = month+day
        if (validated.day.length == 1) {
          validated.day += 0;
        }
        const bdShamsi = validated.month + validated.day;

        const bodyFormData = new FormData();
        bodyFormData.append("first_name", validated.userName);
        bodyFormData.append("gender", gender);
        bodyFormData.append("city", validated.city);
        bodyFormData.append("province", validated.province);
        bodyFormData.append("bd", bd);
        bodyFormData.append("bd_shamsi", bdShamsi);

        try {
          await postCompleted(bodyFormData, {
            "Content-Type": "multipart/form-data",
          }).then((Response) => {
            this.formSubmitted = true
            this.$store.dispatch("signedUp", true);
            this.$router.push({ name: "Home" });
            const message = "ثبت نام موفقیت آمیز بود";
            const notification = {
              type: "success",
              message,
            };
            this.$store.dispatch("addNotification", notification);
          });
        } catch (error) {
          const message = "لطفا ورودی های خود را چک کنید";
          const notification = {
            type: "error",
            message,
          };
          this.$store.dispatch("addNotification", notification);
        }
      }
    },
    // this method will create an array of strings between 1300 - 1400 for years => both included
    // and an diffrent array for days between 1-31
    arrayMaker() {
      const range = (start, stop, step) =>
        Array.from(
          { length: (stop - start) / step + 1 },
          (_, i) => start + i * step
        );
      // years modal array
      this.years = range(1300, 1400, 1);
      this.years = this.years.map((i) => i.toString()).reverse();
      //   days modal array
      this.days = range(1, 31, 1);
      this.days = this.days.map((i) => i.toString());
    },
    removeFields() {
      this.form.month = "ماه";
      this.form.monthId = "";
      this.form.day = "";
      this.form.year = "";
    },
    inputValue(inputText) {
      this.form.name = inputText;
    },
  },
  mounted() {
    this.isLoading = true;
    this.fetchUserData();
    this.fetchProvinceData();
    this.arrayMaker();
  },
};
</script>

<style scoped lang="scss">
.hello {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background-color: #c69d4e;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 45px;
  animation: blink 1.2s ease infinite;
  .hello-text {
    font-size: 22px;
  }
}
.main-wrapper {
  align-items: center;
  display: flex;
  flex-direction: column;
  padding-top: 50px;
  background: #eee;
}
.explain {
  margin: 15px 0;
}
.profile {
  width: 100%;
  margin: 0 auto;
  padding: 60px 10px 0px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #eee;
}

.gender {
  display: flex;
  width: 92%;
  height: 155px;
  margin: 10px 0 20px;
  align-items: center;
  justify-content: space-between;
}
.gender-item {
  background-color: #131313;
  border-radius: 20px;
  width: 49%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 10px 0 20px;
  fill: #555;
  color: #555;
}
.gender-item--active {
  fill: #c69d4e;
  color: #c69d4e;
}
// date
.date {
  margin: 25px 0 10px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.date__title {
  margin-bottom: 10px;
}
.date__btns {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  width: 100%;
  gap: 10px;
}
.date__btn {
  cursor: pointer;
  text-align: center;
  border-radius: 15px;
  background-color: #fff;
  width: 100%;
  font-size: 14px;
  border: none;
  padding: 20px 0;
  margin: 0;
  height: auto;
  color: #000;
}
// modals
.backdrop {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  z-index: 200;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
}
.modal {
  position: fixed;
  overflow: hidden;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  margin: auto;
  height: 60%;
  width: 96%;
  z-index: 300;
  border-radius: 10px 10px 0 0;
  transform: translateY(-300%);
  transition: all 0.4s ease;
  background-color: #fff;
}
.modal--active {
  transform: translateY(0%);
}
.modal__header {
  background-color: #ddd;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 15px 0;
}
.day-wrapper {
  height: 100%;
  overflow: scroll;
  padding-bottom: 45px;
}
.modal__day {
  width: 96%;
  margin: 0 auto;
  padding: 10px 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.07);
  text-align: center;
  cursor: pointer;
  background-color: #fff;
}
.modal__day:hover {
  background-color: #f7f6f5;
}
// city and province
.province-city,
.confirm {
  width: 100%;
  display: flex;
  align-items: center;
  margin: 15px 0;
}
.province-city__btn,
.confirm__btn {
  height: 58px;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.08);
  border-radius: 10px;
  text-align: center;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
}
.confirm__btn {
  background-color: #c69d4e;
  color: #080808;
}
.modal-item {
  width: 96%;
  margin: 0 auto;
  padding: 10px 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.07);
  text-align: center;
  cursor: pointer;
  background-color: #fff;
}
.modal-item:hover {
  background-color: #f7f6f5;
}
// loader
.load{
  width: 30px;
  height: 30px;
  margin-bottom: 12px;
  display: none;
}
.load--active{
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
  border: 2px solid #fff;
  border-color: #fff transparent #fff transparent;
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