<template>
  <section class="resolved" v-if="!isLoading">
    <Navbar :text="navbarText" />
    <main class="main-section">
      <div class="branch">
        <p class="branch__title">{{ branchData.title }}</p>
        <img :src="branchData.image" alt="" class="branch__image" />
        <div class="table">
          <div class="table__row even__row">
            <p class="table__cell">استان/شهر</p>
            <p class="table__cell">خوزستان / اهواز</p>
          </div>
          <i class="table__hr"></i>
          <div class="table__row">
            <p class="table__cell">آدرس</p>
            <p class="table__cell">{{ branchData.address }}</p>
          </div>
          <i class="table__hr"> </i>
          <div class="table__row even__row">
            <p class="table__cell">شماره تماس</p>
            <p class="table__cell">{{ branchData.tel || "06122223239" }}</p>
          </div>
          <i class="table__hr"></i>
          <div class="table__row">
            <p class="table__cell">فعالیت</p>
            <p class="table__cell">{{ branchData.field }}</p>
          </div>
          <i class="table__hr"> </i>
          <div class="table__row even__row">
            <p class="table__cell">توضیحات</p>
            <p class="table__cell">
              {{
                branchData.desc ||
                "توضیحات : توضیحاتی که درمورد این شعبه آورده شده است"
              }}
            </p>
          </div>
          <i class="table__vr"></i>
        </div>
        <a
          :href="`https://maps.google.com/?q=${branchData.lat},${branchData.lng}`"
          target="_blank"
          class="map-btn"
          >مشاهده رو نقشه</a
        >
      </div>
    </main>
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
import { getBranchRouteDate } from "@api/BranchServices/BranchRequest";
import Navbar from "@common/Navbar.vue";
import Footer from "@common/BaseFooter.vue";
import { ref } from "vue";
import { useStore } from 'vuex'
export default {
  name: "Branch",
  props: ["id", "idx"],
  components: {
    Navbar,
    Footer,
  },
  setup(props) {
    const branchData = ref({});
    const isLoading = ref(false);
    const navbarText = ref("شعبه ها");
    const errorMessage = ref("");
    const store = useStore()

    const fetchPageData = async () => {
      try {
        const { data } = await getBranchRouteDate(props.idx);
        isLoading.value = false;
        branchData.value = data;
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
    fetchPageData()

    return {
      navbarText,
      isLoading,
      branchData
    };
  },
  methods: {
    async fetchPageData() {
      try {
        const { data } = await getBranchRouteDate(this.idx);
        this.isLoading = false;
        this.branchData = data;
      } catch (error) {
        if (error.message.includes("404")) {
          this.errorMessage = "صفحه مورد نظر یافت نشد";
          const notification = {
            type: "error",
            message: this.errorMessage,
          };
          this.$store.dispatch("addNotification", notification);
        }
      }
    },
  },
  created() {
    this.isLoading = true;
    this.fetchPageData();
  },
};
</script>

<style scoped>
.branch {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.branch__title {
  font-size: 17px;
  margin-bottom: 10px;
}
.branch__image {
  border-radius: 15px;
  width: 90%;
  max-width: 600px;
  margin-bottom: 20px;
}
.table {
  flex-direction: column;
  border: 1px solid #bbb;
  border-radius: 15px;
  overflow: hidden;
  width: 90%;
  background-color: #eee;
  position: relative;
}
.table__hr {
  height: 1px;
  width: 100%;
  background-color: #bbb;
}
.table__vr {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  width: 1px;
  height: 100%;
  background-color: #bbb;
}
.table__row {
  width: 100%;
  justify-content: space-between;
  min-height: 50px;
  padding: 10px 0;
  display: flex;
  align-items: center;
}
.even__row {
  background-color: #ddd;
}
.table__cell {
  padding-right: 10px;
  width: 50%;
  font-size: 14px;
  line-height: 22px;
}
.cell--price,
.table__cell {
  text-align: right;
}
.map-btn {
  margin-top: 20px;
  background-color: #000;
  width: 90%;
  cursor: pointer;
  display: flex;
  align-items: center;
  border-radius: 10px;
  text-align: center;
  height: 58px;
  line-height: 58px;
  color: #fff;
  justify-content: center;
}
</style>