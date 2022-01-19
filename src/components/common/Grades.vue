<template>
  <div class="grades">
    <div class="grades__detail">
      <p class="grades__detail-grade">
        سطح شما
        <span class="grade__user-grade">
          {{ groupData.group__name || groupData.name }}</span
        >
      </p>
      <div class="grade__user-sum">
        <p class="grade__user-sum-title">مجموع خرید شما</p>
        <span class="grade-buy-sum eng-num">{{
          seperateByThree(groupData.buy_sum) ||
          seperateByThree(pageData.buy_sum)
        }}</span>
      </div>
    </div>
    <div class="grades__header">
      <p class="grades__header-title">سطح</p>
      <i class="grades__divider"></i>
      <p class="grades__header-title">مجموع خرید</p>
    </div>
    <div
      class="accordion"
      v-for="(group, index) in groups"
      :key="index"
      @click="accordionExpand"
    >
      <div class="accordion__expand" v-if="!group.is_default">
        <p class="accordion__expand-item">{{ group.name }}</p>
        <p class="accordion__expand-item accordion__expand-item--value">
          <span class="rial">R</span>
          {{ seperateByThree(group.min_buy) }}
        </p>
      </div>
      <div class="accordion__content" v-if="!group.is_default">
        <p class="accordion__content-text">
          {{ !group.desc === "" ? group.desc : "توضیحاتی داده نشده است" }}
        </p>
      </div>
    </div>
    <div class="grade__user">
      <div class="grade__next" v-if="!userLastGrade">
        <div class="grade__next-information">
          <div class="grade__next-information--top">
            <p style="margin-left: 5px">تا سطح</p>
            <span> "{{ nextLvl.name }}" </span>
          </div>
          <div class="grade__next-information--bottom">
            <span class="eng-num to-next-lvl">
              {{ remainingToNextLvl }}
            </span>
            <p style="color: #aaa">مانده</p>
          </div>
        </div>
        <div class="grade__chart">
          <canvas id="myChart" ref="chart" width="140" height="140"></canvas>
          <span class="percent">{{ acomplished }}%</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// chart js
import { Chart, registerables } from "chart.js";
// chart js register
Chart.register(...registerables);
//
export default {
  name: "Grades",
  data() {
    return {
      // this data will change to percentage of user bought
      acomplished: null,
    };
  },
  computed: {
    // this computed property will calculate how much money user must spend to reach next lvl
    remainingToNextLvl() {
      if (this.groupData.buy_sum == undefined) {
        this.groupData.buy_sum = this.pageData.buy_sum;
      }
      const remain = this.nextLvl.min_buy - this.groupData.buy_sum;
      return remain.toLocaleString();
    },
  },
  methods: {
    // via this method we can have accordion collapse on click with animation
    accordionExpand(e) {
      const expandBtn = e.path[1];
      const content = e.path[1].nextElementSibling;
      expandBtn.classList.toggle("accordion__expand--active");

      if (expandBtn.classList.contains("accordion__expand--active")) {
        content.style.maxHeight = content.scrollHeight + "px";
      } else {
        content.style.maxHeight = 0 + "px";
      }
    },
    // this method will seperate any numbers from right by three
    seperateByThree(data) {
      const seperator = data?.toLocaleString();
      return seperator;
    },
  },
  // page propses
  props: ["groupData", "groups", "pageData", "nextLvl", "userLastGrade"],
  // when page loaded
  mounted() {
    // first calcuate percentage of user need to reach next lvl
    // and then pass it to acomplished variable and it will pass into chart js
    const calc = () => {
      const n1 = 100 / this.nextLvl?.min_buy;
      const n2 = Math.floor(this.groupData.buy_sum * n1);
      this.acomplished = n2;
      if (this.acomplished < 1) {
        const number = this.groupData.buy_sum * n1;
        this.acomplished = number.toFixed(1);
      }
    };
    calc();

    if (!this.userLastGrade) {
      // chart js canvas
      let canvas = this.$refs.chart;
      canvas = canvas.getContext("2d");
      // options
      // data
      const data = {
        type: "doughnut",
        data: {
          datasets: [
            {
              data: [`${this.acomplished}`, 100 - this.acomplished],
              backgroundColor: ["#c69d4e", "#111"],
              borderWidth: 0,
            },
          ],
        },
        options: {
          plugins: {
            tooltip: {
              enabled: false,
            },
          },
          legend: {
            display: false,
          },
          cutout: 60,
        },
      };
      // this is our final chart kickstarter
      new Chart(canvas, data);
    }
  },
};
</script>

<style scoped lang="scss">
.grades {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin: 20px 0;
}
.grades__header {
  background-color: #000;
  grid-template-columns: 1fr 1px 1fr;
  border-radius: 20px 20px 0 0;
  display: grid;
  min-height: 50px;
  align-items: center;
  width: 96%;
  font-size: 0.875rem;
  color: #fff;
  text-align: center;
}
.grades__divider {
  width: 1.5px;
  height: 70%;
  background-color: hsla(0, 0%, 100%, 0.15);
}
.accordion {
  width: 100%;
  cursor: pointer;
}
.accordion__expand {
  width: 96%;
  background-color: #fff;
  color: white;
  font-size: 15px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: auto;
  position: relative;
}
.accordion__expand-item {
  color: #000;
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  padding: 0px 20px;
  justify-content: center;
}

.accordion__content {
  background-color: #ccc;
  margin: 0 auto;
  padding: 0px 15px;
  font-size: 20px;
  overflow: hidden;
  max-height: 0;
  transition: all 0.5s linear;
  border-bottom: 1px solid rgba(0, 0, 0, 0.07);
  border-left: 1px solid rgba(0, 0, 0, 0.07);
  border-right: 1px solid rgba(0, 0, 0, 0.07);
  width: 96%;
}
.accordion__content--active {
  max-height: 108px;
}
.accordion__expand-item--value {
  position: relative;
  font-family: Arial, Helvetica, sans-serif;
  &::before {
    content: "";
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 20px;
    width: 10px;
    height: 10px;
    background-image: url("../../assets/svg/down-chevron.svg");
    background-repeat: no-repeat;
    background-size: contain;
    transition: transform 0.4s;
  }
  .rial {
    color: #777;
    font-size: 9px;
    margin-left: 3px;
    margin-bottom: 4px;
  }
}
.accordion__expand--active {
  .accordion__expand-item--value {
    position: relative;
    &::before {
      transform: translateY(-40%) rotate(180deg);
    }
  }
}
.grade__user {
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  width: 100%;
  align-items: center;
}
.grade__user-sum {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 10px 0;
}
.grade-buy-sum {
  position: relative;
  font-size: 1.9rem;
  &::after {
    position: absolute;
    content: "R";
    font-size: 1rem;
    top: 2px;
    right: -12px;
  }
}
.grade__next {
  margin-top: 20px;
  display: flex;
  width: 96%;
  align-items: center;
  justify-content: space-between;
  border-radius: 20px;
  background-color: #000;
  padding: 10px 15px 15px;
  color: #fff;
}
.grade__user-sum-title {
  font-size: 14px;
  color: #555;
}
.grade__next-information--top,
.grade__next-information--bottom {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.grade__next-information--bottom {
  .to-next-lvl {
    margin-left: 5px;
    color: #c69d4e;
    position: relative;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 18px;
    &:after {
      position: absolute;
      content: "R";
      right: -9px;
      top: 0;
      color: #c69d4e;
      font-size: 10px;
    }
  }
}
.grade__chart {
  width: 150px;
  height: 150px;
  position: relative;
  .percent {
    position: absolute;
    top: 62px;
    left: 52px;
    animation: blink 1.2s infinite;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 27px;
    @keyframes blink {
      0% {
        opacity: 1;
      }
      50% {
        opacity: 0.2;
      }
      100% {
        opacity: 1;
      }
    }
  }
}
.accordion__content-text {
  font-size: 14px;
  padding: 15px 0;
}
.grades__detail {
  margin-bottom: 15px;
  .grades__detail-grade {
    padding: 8px 16px;
    border-radius: 20px;
    border: 1px solid rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: center;
    justify-content: space-evenly;
  }
}
.grade__user-grade {
  color: #c69d4e;
  margin-right: 5px;
}
</style>