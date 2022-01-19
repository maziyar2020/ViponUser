<template>
  <div class="login">
    <img src="../assets/login.jpg" alt="" class="top-img" />
    <div class="login-logos">
      <img src="../assets/svg/vipon.svg" alt="" class="login-logo" />
      <img
        src="../assets/svg/customer.svg"
        alt=""
        class="login-logo login-logo--custom"
      />
    </div>
  </div>
  <div class="login__form" @click.self="focus = true">
    <component
      :is="currentComponent"
      @formSubmit="formSubmit"
      @formConfirm="formConfirm"
      @goBack="formReset"
      :error="formValidationError"
      :phone="formValue.phoneNumber"
      :isLoading="isLoading"
    />
  </div>
  <div class="rights">
    <p>All Rights Reserved By <a href="www.vipon.ir">VIPON</a></p>
    <p class="eng-num">2021 &copy;</p>
  </div>
</template>

<script>
import LoginForm from "../components/SubComponents/LoginForm/LoginForm.vue";
import LoginConfirm from "../components/SubComponents/LoginForm/LoginConfirm.vue";
import { postUserPhoneNumber , postUserConfirmCode } from "@api/LoginServices/LoginRequest";

export default {
  name: "login",
  data() {
    return {
      currentComponent: "loginForm",
      formError: {},
      formValue: {},
      formValidationError: null,
      isLoading: null,
      timeOut: null,
    };
  },
  components: {
    LoginForm,
    LoginConfirm,
  },
  methods: {
    formSubmit(formValidation) {
      this.formError = formValidation().error;
      this.formValue = formValidation().value;
      if (this.formError) {
        this.formValidationError = this.formError.details[0].message;
      } else {
        this.formValidationError = null;
        this.isLoading = true;

        const bodyFormData = new FormData();
        bodyFormData.append("username", this.formValue.phoneNumber);

        postUserPhoneNumber(bodyFormData, {
          "Content-Type": "multipart/form-data",
        })
          .then((Response) => {
            if (Response.status == 200) {
              this.currentComponent = "LoginConfirm";
              this.isLoading = false;
              const message = 'کد تایید برای شما ارسال شد'
              const notif = {
                type : 'success',
                message
              }
              this.$store.dispatch('addNotification',notif)
            }
          })
          .catch((error) => {
            if (error.message.includes("451")) {
              const message = "درخواست شما موفقیت آمیز نبود";
              this.isLoading = false;
              const notification = {
                type : 'error',
                message
              }
              this.$store.dispatch('addNotification',notification)
              
            }
            if (error.message.includes("400")) {
              const message = "شماره تماس ثبت نشده";
              this.isLoading = false;
              const notification = {
                type : 'error',
                message
              }
              this.$store.dispatch('addNotification',notification)
            }
          });
      }
    },
    async formConfirm(confirmCode) {
      const bodyFormData = new FormData();
      bodyFormData.append("code", confirmCode);
      bodyFormData.append("username", this.formValue.phoneNumber);
      this.isLoading = true;
      try {
        await postUserConfirmCode(bodyFormData, {
          "Content-Type": "multipart/form-data",
        }).then((response) => {
          if (response.status === 200) {
            this.isLoading = false;
            this.$store.dispatch("logIn", response);
            const message = 'خوش آمدید'
            const notification = {
              type : 'success',
              message
            }
            this.$store.dispatch('addNotification',notification)
          }
        });
      } catch (error) {
        if (error.message.includes("400")) {
          const message = "کد وارد شده اشتباه است";
          this.isLoading = false;
          const notification = {
            type : 'error',
            message
          }
          this.$store.dispatch('addNotification',notification);
        }
      }
    },
    formReset(interval) {
      clearInterval(interval)
      this.currentComponent = "LoginForm";
    },
  },
};
</script>

<style scoped lang="scss">
img {
  vertical-align: bottom;
}
.login {
  position: relative;
  padding: 350px 0 20px;
  overflow: hidden;
  min-height: 100vh;
  width: 100%;
  background-color: #000;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.top-img {
  position: absolute;
  height: 700px;
  top: -185px;
  -o-object-fit: cover;
  object-fit: cover;
  -o-object-position: center;
  object-position: center;
}
.login-logos {
  position: absolute;
  left: 0;
  right: 0;
  top: 150px;
  margin: 0 auto;
  width: 100%;
  height: 180px;
  display: flex;
  align-items: center;
  flex-direction: column;
}
.login-logo {
  width: 120px;
  height: 120px;
}
.login-logo--custom {
  transform: translateY(-20px);
}
.login__form {
  z-index: 100;
  width: 96%;
  border-radius: 15px;
  overflow: hidden;
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: hsla(0, 0%, 100%, 0.03);
  margin: 0 auto;
  position: absolute;
  top: 370px;
  height: 200px;
  right: 0;
  left: 0;
}
.rights {
  position: absolute;
  color: #eee;
  top: 575px;
  left: 0;
  right: 0;
  width: 100%;
  text-align: center;
  font-size: 14px;
  a {
    color: #ccc;
  }
}
// toast
// toast
.toast-msg {
  position: fixed;
  bottom: 200px;
  left: 0;
  right: 0;
  margin: 0 auto;
  width: 300px;
  height: 40px;
  background-color: #ddd;
  z-index: 800;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  border-right: 4px solid #c69d4e;
  box-shadow: 0 0 20px 5px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
  transform: translateY(900%);
}
.toast-msg--show {
  transform: translateY(0);
}
@media only screen and (max-width: 500px) {
  .login__form {
    height: 220px;
    margin-bottom: 10px;
  }
  .rights {
    margin-top: 20px;
  }
  .toast-msg {
    width: 150px;
    font-size: 11px;
  }
}
</style>