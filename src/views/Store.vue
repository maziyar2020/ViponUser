<template>
  <section class="resolved store" v-if="!isLoading">
    <Navbar :text="navbarText" />
    <HeaderComponent :pageData="headerData" />
    <div class="store-body">
      <section class="store-info">
        <div class="store-info-item">
          <p class="store-info__title">اولین خرید</p>
          <span
            class="store-info__date"
            :class="[
              firstBuy(pageData) !== 0 && 'eng-num',
              firstBuy(pageData) == 0 && 'today',
            ]"
            >{{ firstBuy(pageData) == 0 ? `امروز` : firstBuy(pageData) }}</span
          >
          <p>{{ firstBuy(pageData) == 0 ? "" : "روز پیش" }}</p>
        </div>
        <i class="store-info__divider"></i>
        <div class="store-info-item">
          <p class="store-info__title">تعداد خرید</p>
          <span class="eng-num store-info__date">{{ pageData.buy_count }}</span>
          <p>مرتبه</p>
        </div>
        <i class="store-info__divider"></i>
        <div class="store-info-item">
          <p class="store-info__title">آخرین خرید</p>
          <span
            class="store-info__date"
            :class="[
              lastBuy(pageData) !== 0 && 'eng-num',
              lastBuy(pageData) == 0 && 'today',
            ]"
            >{{ lastBuy(pageData) == 0 ? `امروز` : lastBuy(pageData) }}</span
          >
          <p>{{ lastBuy(pageData) == 0 ? "" : "روز پیش" }}</p>
        </div>
      </section>
      <section class="amount">
        <p class="amount__title">اعتبار شما</p>
        <p class="amount__value eng-num">
          {{ pageData.amount?.toLocaleString() }}
        </p>
      </section>
      <Grades
        :groupData="groupData"
        :groups="groupsData"
        :pageData="pageData"
        :nextLvl="nextStep"
      />
      <SocialMedia :socials="socials" />
      <section class="branches">
        <p class="branch__title">شعبه ها</p>
        <Branch
          v-for="(branch, index) in branches"
          :key="index"
          :image="branch.image"
          :title="branch.title"
          :address="branch.address"
          @click="
            $router.push({ name: 'Branch', params: { id: id, idx: branch.id } })
          "
        />
      </section>
    </div>
    <div class="modal">
      <Modal :isOpen="payModal">
        <template v-slot:header>
          <p>پرداخت از اعتبار</p>
        </template>
        <template v-slot:content>
          <div class="pay__content">
            <div class="pay__credit-value">
              <p class="pay__credit-value-amount">اعتبار شما :</p>
              <p class="pay__credit-value-number">{{ cashierBalance }}</p>
              <p class="pay__credit-value-symbol">ریال</p>
            </div>
            <div class="pay__feedback">
              <input
                type="number"
                placeholder="مبلغ پرداخت"
                class="pay__feedback-input"
                v-model="payWithCreditInput"
              />
              <div class="pay__feedback-text">ریال</div>
            </div>
            <div class="pay__btns">
              <button class="pay__btn pay__btn--choose" @click="acceptorChoose">
                <p class="pay__text">
                  {{
                    cashierName.name === "" || cashierName.name === undefined
                      ? "انتخاب پذیرنده"
                      : `پذیرنده : ${cashierName.name}`
                  }}
                </p>
              </button>
              <button class="pay__btn pay__btn--pay" @click="postPayDetail">
                <p class="pay__text">پرداخت</p>
              </button>
            </div>
          </div>
        </template>
      </Modal>
      <Modal :isOpen="acceptorModal" v-if="acceptorModal">
        <template v-slot:header>
          <p>پذیرنده ها</p>
        </template>
        <template v-slot:content>
          <div class="acceptor-choose__content">
            <div
              class="cashier"
              v-for="(cashier, index) in cashiers"
              :key="index"
              @click="chooseCashier(cashier)"
            >
              {{ cashier.name }}
            </div>
          </div>
        </template>
      </Modal>
      <div class="backdrop" v-if="payModal" @click.self="backDrop('pay')"></div>
      <div
        class="backdrop"
        v-if="acceptorModal"
        @click.self="backDrop('choose')"
      ></div>
    </div>
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
import { getStoreData } from "@api/StoreServices/StoreRequest";
import { getBranchData } from "@api/BranchServices/BranchRequest";
import HeaderComponent from "@common/HeaderComponent.vue";
import Navbar from "@common/Navbar.vue";
import Footer from "@common/BaseFooter.vue";
import Grades from "@common/Grades.vue";
import SocialMedia from "@common/SocialMedia.vue";
import Branch from "@common/BranchBox.vue";
import Modal from "@common/Modal.vue";
import { ref } from "vue";
import { useStore } from "vuex";

export default {
  name: "Store",
  props: ["id"],
  components: {
    Branch,
    HeaderComponent,
    Navbar,
    Grades,
    SocialMedia,
    Footer,
    Modal,
  },
  setup(props) {
    const store = useStore();
    const navbarText = ref("فروشگاه");
    const headerData = ref({});
    const pageData = ref({});
    const groupsData = ref([]);
    const groupData = ref({});
    const socials = ref([]);
    const branches = ref([]);
    const payModal = ref(false);
    const isLoading = ref(false);
    const acceptorModal = ref(false);
    const idx = ref(null);
    const cashiers = ref([]);
    const cashierBalance = ref(null);
    const cashierName = ref({});
    const payWithCreditInput = ref("");
    const nextStep = ref({});
    const buySum = ref(null);
    const errorMessage = ref("");

    const fetchStoreData = async () => {
      try {
        // call method to fetch data
        const { data } = await getStoreData(props.id);
        isLoading.value = false;
        // restore data in variable
        const {
          groups,
          group,
          social,
          buy_sum,
          image,
          store,
          store_en,
          store_id,
        } = data;
        // header Data
        headerData.value = {
          store_image: image,
          store_name: store,
          store_name_en: store_en,
        };
        // all of data will be store in pageDate object
        pageData.value = data;
        // all the grades => bronze - silver etc ...
        groupsData.value = groups;
        // current grade that user in it
        groupData.value = group;
        // social media info
        socials.value = social;
        // store id for passing it to child components
        idx.value = store_id;
        // all the buy cost of user
        buySum.value = buy_sum;
        // this method will calculate user's grade and pass next grade to child component => grades component
        nextGrade(groups);
        fetchBranchData(store_id);
      } catch (error) {
        if (error.message.includes("404")) {
          errorMessage.value = "صفحه مورد نظر یافت نشد";
        }
        const notification = {
          type: "error",
          message: errorMessage.value,
        };
        store.dispatch("addNotification", notification);
      }
    };
    const fetchBranchData = async (branchId) => {
      try {
        const { data } = await getBranchData(branchId);

        branches.value = data.results;
      } catch (error) {
        const message = error.message;
        const notif = {
          type: "error",
          message,
        };
        store.dispatch("addNotification", notif);
      }
    };
    // first and last buy
    const firstBuy = (datas) => {
      // convert to miliseconds
      const miliSecond = 1000 * 60 * 60 * 24;
      // diff time
      const diffDays = (now, time) => {
        // we store 3 params in utc - year : number , month : number , days : number
        const time1 = Date.UTC(
          now.getFullYear(),
          now.getMonth(),
          now.getDate()
        );
        const time2 = Date.UTC(
          time.getFullYear(),
          time.getMonth(),
          time.getDate()
        );
        return Math.floor((time1 - time2) / miliSecond);
      };
      const now = new Date();
      // convert time of first bought from user to miliseconds
      const time = new Date(datas.first_buy);
      // diffrence will call above function and pass the current time and firstBuy timestamp
      const difference = diffDays(now, time);
      // every time this method called - this method will call and return a time to it
      return difference;
    };
    const lastBuy = (datas) => {
      // convert to miliseconds
      const miliSecond = 1000 * 60 * 60 * 24;
      // diff time
      const diffDays = (now, time) => {
        // we store 3 params in utc - year : number , month : number , days : number
        const time1 = Date.UTC(
          now.getFullYear(),
          now.getMonth(),
          now.getDate()
        );
        const time2 = Date.UTC(
          time.getFullYear(),
          time.getMonth(),
          time.getDate()
        );
        return Math.floor((time1 - time2) / miliSecond);
      };
      const now = new Date();
      // convert time of first bought from user to miliseconds
      const time = new Date(datas.last_buy);
      // diffrence will call above function and pass the current time and lastBuy timestamp
      const difference = diffDays(now, time);
      // every time this method called - this method will call and return a time to it
      return difference;
    };

    const nextGrade = (groups) => {
        // if this.groupData.buy_sum = 6000000 next lvl will be silver
      const lvl = groups.filter((i) => i.min_buy > buySum.value);
      // select lowest min_buy between grades array
      let min = Math.min(...lvl.map((i) => i.min_buy));
      // filter bigger than our lowest (next lvl)
      const minimum = lvl.filter((i) => i.min_buy <= min);
      nextStep.value = minimum[0];
    };

    isLoading.value = true;
    fetchStoreData();

    return {
      firstBuy,
      lastBuy,
      navbarText,
      payModal,
      isLoading,
      headerData,
      pageData,
      groupData,
      groupsData,
      nextStep,
      socials,
      branches,
      acceptorModal,
    };
  },
};
</script>

<style scoped lang="scss">
.store {
  margin-bottom: 60px;
}
.store-body {
  position: relative;
  z-index: 2;
  width: 100%;
  border-radius: 0;
  background: linear-gradient(180deg, #fff 100px, #eee 150px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  border-radius: 30px 30px 0 0;
  margin-top: -30px;
  padding-top: 20px;
}
.store-info {
  width: 92%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 0 30px;
  border-radius: 15px;
  overflow: hidden;
  height: 105px;
}
.store-info__date {
  font-size: 20px;
  margin: 5px 0;
}
.store-info-item {
  width: calc(33% - 1px);
  height: 105px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
}
.store-info__divider {
  height: 80%;
  width: 1px;
  background-color: rgba(0, 0, 0, 0.1);
}
.amount {
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 96%;
  background-color: #fff;
  border-radius: 10px;
  padding: 10px 0;
}
.amount__title {
  color: #c69d4e;
  font-size: 1.4rem;
  margin: 5px 0 10px;
}
.amount__value {
  color: #111;
  font-size: 1.6rem;
  margin-bottom: 20px;
  position: relative;
  &::after {
    position: absolute;
    content: "R";
    color: #444;
    right: -8px;
    font-size: 11px;
    top: 0;
  }
}
.branches {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.branch__title {
  font-size: 17px;
  margin: 10px 0;
}
.store-info__title {
  font-size: 15px;
  color: #222;
}
.today {
  margin-top: 10px;
  padding: 5px 25px;
  border-radius: 7px;
  background-color: #f5f5f5;
  color: #333;
  font-size: 15px;
}
</style>