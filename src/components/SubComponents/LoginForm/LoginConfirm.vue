<template>
  <div class="form__header">
    <div class="timer">
      <p class="minute timer__items">{{ minute }}</p>
      <p>:</p>
      <p class="second timer__items">{{ second }}</p>
    </div>
    <div class="confirm-code">
      <p>کد تایید برای شماره</p>
      <p class="confirm-code--gold eng-num">{{ phone }}</p>
      <p>ارسال شد</p>
    </div>
    <div class="backward" @click="$emit('goBack', interVal)">
      <svg viewBox="0 0 512 512" class="backward-img">
        <path
          d="M174.6 252.89l205.16 -205.16c7.2,-7.21 7.2,-18.89 0,-26.1 -7.2,-7.2 -18.88,-7.2 -26.09,0l-221.43 221.44c-7.2,7.2 -7.2,18.88 0,26.09l221.43 221.43c7.33,7.08 19.01,6.87 26.09,-0.46 6.91,-7.15 6.91,-18.48 0,-25.63l-205.13 -205.13 0 -0.03c-0.82,-0.83 -1.33,-1.97 -1.33,-3.23 0,-1.26 0.51,-2.4 1.33,-3.22l-0.03 0z"
        ></path>
      </svg>
    </div>
  </div>
  <form class="form" @submit.prevent="$emit('formConfirm', confirmCode)">
    <label class="form__title">لطفا کد دریافت شده را وارد کنید</label>
    <div>
      <input type="text" class="form__input eng-num" v-model="confirmCode" />
      <div class="form__error"></div>
    </div>
    <button type="submit" class="form__btn">
      <p>ورود</p>
      <div class="load" :class="[isLoading && 'load--active']">
        <div class="lds-dual-ring"></div>
      </div> 
    </button>
  </form>
</template>

<script>
export default {
  name: "login-confirm",
  data() {
    return {
      confirmCode: "",
      minute: "",
      second: "",
      interVal: null,
    };
  },
  methods: {
    countDownTimer() {
      let counter = 0;
      const timeToReduce = 90;

      const count = () => {
        counter++;
        const distance = timeToReduce - counter;

        const min = Math.floor(distance / 60);
        const sec = distance % 60;

        this.minute = this.timeFormater(min);
        this.second = this.timeFormater(sec);

        if (distance <= 0) {
          clearInterval(this.interVal);
          this.$emit("goBack");
        }
      };
      this.interVal = setInterval(count, 1000);
    },
    timeFormater(time) {
      return time <= 1 ? '0' + time : time;
    },
  },
  props: ["error", "phone",'isLoading'],
  emits: ["formConfirm", "formSubmit", "goBack"],
  mounted() {
    this.countDownTimer();
  },
  beforeUnmount(){
    clearInterval(this.interVal)
  }
};
</script>

<style scoped lang="scss">
.form {
  height: 400px;
  display: flex;
  flex-direction: column;
  width: 96%;
}
.form__input {
  margin-bottom: 10px;
  width: 100%;
  height: 40px;
  padding: 0 10px 0 20px;
  color: #fff;
  background: transparent;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}
.form__btn {
  background-color: #c69d4e;
  color: #222;
  height: 50px;
  width: 100%;
  border-radius: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
.form__header {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 96%;
  padding: 10px 0;
}
.timer {
  background-color: hsla(0, 0%, 100%, 0.03);
  width: 70px;
  height: 40px;
  display: flex;
  flex-direction: row;
  align-items: center;
  direction: ltr;
  justify-content: center;
  font-size: 25px;
  border-radius: 10px;
  color: #eee;
  .timer__items {
    font-family: Arial, Helvetica, sans-serif;
  }
}
.backward {
  width: 40px;
  height: 40px;
  fill: #eee;
  margin-top: 10px;
  border-radius: 50%;
  background-color: hsla(0, 0%, 100%, 0.03);
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  svg {
    width: 25px;
    height: 25px;
    margin-right: 2px;
  }
}
.confirm-code {
  color: #eee;
  display: flex;
  flex-direction: row;
  align-items: center;
}
.confirm-code--gold {
  color: #c69d4e;
  margin: 0 5px;
}
.form__title {
  color: #eee;
  font-size: 14px;
  display: flex;
  position: relative;
  margin-right: 10px;
  &::after {
    content: " * ";
    position: absolute;
    color: #c69d4e;
    right: -10px;
    top: 0;
    font-size: 15px;
  }
}
@media only screen and (max-width: 500px) {
  .confirm-code {
    font-size: 13px;
    flex-direction: column;
  }
  .form__title{
    font-size: 12px;
  }
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