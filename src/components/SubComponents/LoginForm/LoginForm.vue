<template>
  <form @submit.prevent="$emit('formSubmit', validation)" class="login-form">
    <div class="login-inputs">
      <div class="login__header" :class="[move && 'login__header--active']">
        <p class="login__required">*</p>
        <label class="login__title">شماره تماس</label>
      </div>
      <input class="login__input eng-num" type="number" v-model="userPhoneNumber" />
    </div>
    <button type="submit" class="login__btn">
      <p>ورود</p>
      <div class="load" :class="[isLoading && 'load--active']">
        <div class="lds-dual-ring"></div>
      </div> 
    </button>
  </form>
</template>

<script>
//
import Joi from "joi";

// joi rules
const schema = Joi.object({
  phoneNumber: Joi.string()
    .required()
    .regex(/^[0]{1}[9]{1}[0-9]{9}$/)
    .min(11)
    .max(11)
    .messages({
      "string.empty": `شماره تماس الزامی است`,
      "string.min": `شماره تماس شامل 11 عدد میباشد`,
      "string.max": `شماره تماس شامل 11 عدد میباشد`,
      "any.required": `پرکردن این فیلد الزامیست`,
      "string.pattern.base": "لطفا شماره تماس را چک کنید",
    }),
});
//
export default {
  name: "loginform",
  data() {
    return {
      userPhoneNumber: "",
      move : false 
    };
  },
  methods: {
    validation() {
      // this method will valuate form based on schema rules
      const { error, value } = schema.validate(
        {
          phoneNumber: this.userPhoneNumber,
        },
        { abortEarly: false }
      );
      // returning the errors and values whenever this method called
      return { error, value };
    },
  },
  props: ["error",'isLoading'],
  emits: ["formSubmit"],
  mounted(){
    setInterval(() => {
      this.move = true
    }, 500);
  },
  watch:{
    error(newVal){
      let message = newVal
      const notification = {
        type : 'error',
        message
      }
      this.$store.dispatch('addNotification',notification)
    }
  }
};
</script>

<style scoped lang="scss">
.login-form {
  z-index: 1;
  width: 96%;
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 50px;
}
.login__title {
  font-size: 15px;
  color: #eee;
  margin: 0px 5px 5px;
}
.login__input {
  font-size: 14px;
  color: #080808;
  height: 40px;
  padding: 0 5px 0 20px;
  width: 100%;
  background-color: transparent;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  color: #fff;
}
.login__btn {
  margin-top: 10px;
  background-color: #c69d4e;
  color: #222;
  border-radius: 10px;
  height: 50px;
  cursor: pointer;
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
.login__error {
  margin: 4px 0px;
  color: red;
  background-color: #fff;
  padding: 0px 10px;
  border-radius: 10px;
}
.login__header {
  display: flex;
  flex-direction: row;
  align-items: center;
  transition: all 0.3s ease;
  transform: translateY(0);
  position: absolute;
  top: 8px;
  right: 10px;
}
.login__header--active{
  transform: translateY(-30px) translateX(10px);
}
.login__required {
  color: #c69d4e;
  // margin-left: px;
}
.login-inputs{
  position: relative;
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
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