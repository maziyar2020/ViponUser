<template>
  <section class="resolve" v-if="!isLoading">
    <div class="ticket-wrapper">
      <div class="nav-wrapper">
        <nav class="nav">
          <div class="nav__logo">
            <img :src="ticketDetail.wallet?.image" class="nav__logo-img" />
            <span class="nav__logo-user-name">{{
              ticketDetail.wallet?.name
            }}</span>
          </div>
          <div class="nav__icons">
            <div class="block">
              <span class="block__btn" @click="blockUser">BLOCK</span>
            </div>
            <div class="backward" @click="$router.go(-1)">
              <svg viewBox="0 0 512 512" class="go-back">
                <path
                  d="M174.6 252.89l205.16 -205.16c7.2,-7.21 7.2,-18.89 0,-26.1 -7.2,-7.2 -18.88,-7.2 -26.09,0l-221.43 221.44c-7.2,7.2 -7.2,18.88 0,26.09l221.43 221.43c7.33,7.08 19.01,6.87 26.09,-0.46 6.91,-7.15 6.91,-18.48 0,-25.63l-205.13 -205.13 0 -0.03c-0.82,-0.83 -1.33,-1.97 -1.33,-3.23 0,-1.26 0.51,-2.4 1.33,-3.22l-0.03 0z"
                ></path>
              </svg>
            </div>
          </div>
        </nav>
      </div>
      <div class="background">
        <svg viewBox="0 0 512 512" fill="#f8f8f8">
          <path
            d="M256 388.99l208.79 -211.84c8.96,24.04 13.94,50.03 14.14,77.17l-222.93 226.18 -222.93 -226.18c0.2,-27.14 5.18,-53.13 14.14,-77.17l208.79 211.84zm0 -265.32l-77.22 -78.34c23.87,-8.87 49.65,-13.75 76.56,-13.83l0.66 0.67 0.66 -0.67c26.91,0.08 52.69,4.96 76.56,13.83l-77.22 78.34zm0 178.42l-178.29 -180.9c12.88,-17.25 28.18,-32.57 45.38,-45.46l132.91 134.85 132.91 -134.85c17.2,12.89 32.5,28.21 45.38,45.46l-178.29 180.9z"
          ></path>
        </svg>
      </div>
      <div class="messages-wrapper" ref="wrapper">
        <div
          class="messages-inner"
          @click.self="focus = false"
          ref="messageInner"
        >
          <div class="observer">
            <Observer
              @intersect="intersect"
              v-if="messages.length"
              :dataRetrived="dataRetrived"
            />
          </div>
          <div
            class="message"
            v-for="(message, index) in messages"
            :key="index"
            :class="[
              message.response_type == '4' && 'message--send',
              message.response_type == '3' && 'message--recive',
            ]"
            @click="focus = false"
            ref="load"
          >
            <img
              :src="
                message.response_type == '3'
                  ? ticketDetail.store?.image
                  : ticketDetail?.wallet?.image
              "
              alt=""
              class="message__profile"
            />
            <div
              class="message__text"
              v-if="message.text !== '' && message.image == null"
            >
              {{ messageText(message) }}
              <span class="message-detail"></span>
            </div>
            <div class="message__image" v-if="message.image !== null">
              <img :src="message.image" alt="" class="message__image-img" />
            </div>
          </div>
        </div>
        <i class="wrap" ref="newMessage"></i>
      </div>
      <div class="chat__btns">
        <div class="send__btn" @click="sendMessage('text')">
          <svg viewBox="0 0 512.001 512.001" class="send__btn-svg">
            <path
              d="M507.608,4.395c-4.243-4.244-10.609-5.549-16.177-3.321L9.43,193.872c-5.515,2.206-9.208,7.458-9.42,13.395
			c-0.211,5.936,3.101,11.437,8.445,14.029l190.068,92.181l92.182,190.068c2.514,5.184,7.764,8.455,13.493,8.455
			c0.178,0,0.357-0.003,0.536-0.01c5.935-0.211,11.189-3.904,13.394-9.419l192.8-481.998
			C513.156,15.001,511.851,8.638,507.608,4.395z M52.094,209.118L434.72,56.069L206.691,284.096L52.094,209.118z M302.883,459.907
			l-74.979-154.599l228.03-228.027L302.883,459.907z"
            ></path>
          </svg>
        </div>
        <div class="text__input">
          <input
            type="text"
            class="text__input-field"
            @focus="focus = true"
            v-model="userText"
          />
          <i class="underline" :class="[focus && 'underline--focus']"></i>
        </div>
        <div class="drop-zone">
          <input
            type="file"
            accept="image/*"
            class="drop-zone__input"
            @change="sendMessage('image', $event)"
          />
          <svg viewBox="0 0 486.3 486.3" class="drop-zone__svg">
            <path
              d="M395.5,135.8c-5.2-30.9-20.5-59.1-43.9-80.5c-26-23.8-59.8-36.9-95-36.9c-27.2,0-53.7,7.8-76.4,22.5
			c-18.9,12.2-34.6,28.7-45.7,48.1c-4.8-0.9-9.8-1.4-14.8-1.4c-42.5,0-77.1,34.6-77.1,77.1c0,5.5,0.6,10.8,1.6,16
			C16.7,200.7,0,232.9,0,267.2c0,27.7,10.3,54.6,29.1,75.9c19.3,21.8,44.8,34.7,72,36.2c0.3,0,0.5,0,0.8,0h86
			c7.5,0,13.5-6,13.5-13.5s-6-13.5-13.5-13.5h-85.6C61.4,349.8,27,310.9,27,267.1c0-28.3,15.2-54.7,39.7-69
			c5.7-3.3,8.1-10.2,5.9-16.4c-2-5.4-3-11.1-3-17.2c0-27.6,22.5-50.1,50.1-50.1c5.9,0,11.7,1,17.1,3c6.6,2.4,13.9-0.6,16.9-6.9
			c18.7-39.7,59.1-65.3,103-65.3c59,0,107.7,44.2,113.3,102.8c0.6,6.1,5.2,11,11.2,12c44.5,7.6,78.1,48.7,78.1,95.6
			c0,49.7-39.1,92.9-87.3,96.6h-73.7c-7.5,0-13.5,6-13.5,13.5s6,13.5,13.5,13.5h74.2c0.3,0,0.6,0,1,0c30.5-2.2,59-16.2,80.2-39.6
			c21.1-23.2,32.6-53,32.6-84C486.2,199.5,447.9,149.6,395.5,135.8z"
            ></path>
            <path
              d="M324.2,280c5.3-5.3,5.3-13.8,0-19.1l-71.5-71.5c-2.5-2.5-6-4-9.5-4s-7,1.4-9.5,4l-71.5,71.5c-5.3,5.3-5.3,13.8,0,19.1
			c2.6,2.6,6.1,4,9.5,4s6.9-1.3,9.5-4l48.5-48.5v222.9c0,7.5,6,13.5,13.5,13.5s13.5-6,13.5-13.5V231.5l48.5,48.5
			C310.4,285.3,318.9,285.3,324.2,280z"
            ></path>
          </svg>
        </div>
      </div>
    </div>
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
import {
  getTicketDetail,
  postMessage,
  getTicketMessages,
} from "@api/TicketServices/TicketRequest.js";

import Footer from "@common/BaseFooter.vue";
const queryString = require("query-string");
import Observer from "../components/lazy-load/observer.vue";
export default {
  name: "ticket",
  data() {
    return {
      ticketDetail: {},
      focus: false,
      userText: "",
      nextPage: null,
      nextPageNumber: "",
      messages: [],
      dataRetrived: null,
      scrollToBot: false,
      isLoading: null,
      store: {},
      wallet: "",
      newMessage: false,
      messagesHeight: null,
      img: {},
      blob: null,
      newContent: false,
    };
  },
  components: {
    Footer,
    Observer,
  },
  props: {
    id: {
      type: String,
    },
  },
  methods: {
    async fetchTicket() {
      try {
        const {data} = await getTicketDetail(this.id);

        const { wallet, store } = data;
        this.ticketDetail = data;
        this.wallet = wallet.id;
        this.store = store;
      } catch (error) {
        if(error.message.includes('404')){
          const message = 'اطلاعات پیام یافت نشد'
          const notif = {
            type : 'error',
            message
          }
          this.$store.dispatch("addNotification",notif)
        }
      }
    },
    blockUser() {
      console.log("hi");
    },
    async loadMoreMessage() {
      try {
        await getTicketMessages(`?ticket_id=${this.id}&limit=10&offset=0`).then(
          (Response) => {
            const {data} = Response;
            const { next, results } = data;

            this.messages = results.reverse();

            this.nextPage = queryString.parse(next);
            this.nextPageNumber = this.nextPage.page;

            if (next == null) {
              this.dataRetrived = true;
            }

            this.isLoading = false;
          }
        );
      } catch (error) {}
    },
    scrollToBottom() {
      const el = this.$refs.load;
      el.scrollIntoView();
    },
    async intersect() {
      if (this.scrollToBot && !this.dataRetrived) {
        if (this.nextPage !== null) {
          try {
            await getTicketMessages(
              `?ticket_id=${this.id}&limit=10&offset=0&page=${this.nextPageNumber}`
            ).then((Response) => {
              const data = Response.data;
              const { next, results } = data;
              const result = results;

              result.forEach((i) => this.messages.unshift(i));
              this.scrollToBottom();
              this.newContent = true;

              if (next !== null) {
                this.nextPage = queryString.parse(next);
                this.nextPageNumber = this.nextPage.page;
              } else {
                this.nextPage = null;
                this.dataRetrived = true;
              }
            });
          } catch (error) {
            if(error.message.includes('404') || error.message.includes('400')){
              const message = 'یافت نشد'
              const notif = {
                type : 'error',
                message
              }
              this.$store.dispatch('addNotification',notif)
            }
          }
        }
      }
    },
    messageText(message) {
      if (message.text == "" && message.image == null) {
        return (message.text = "this message is empty");
      } else {
        return message.text;
      }
    },
    async sendMessage(type, event) {
      const bodyFormData = new FormData();

      switch (type) {
        case "image":
          const file = event.target.files[0];
          const fileReader = new FileReader();
          fileReader.addEventListener("load", (event) => {
            this.img = event.target.result;
            const bodyFormData = new FormData();
            // convert to blob
            function dataURItoBlob(dataURI) {
              // convert base64 to raw binary data held in a string
              var byteString = atob(dataURI.split(",")[1]);

              // separate out the mime component
              var mimeString = dataURI
                .split(",")[0]
                .split(":")[1]
                .split(";")[0];

              // write the bytes of the string to an ArrayBuffer
              var arrayBuffer = new ArrayBuffer(byteString.length);
              var _ia = new Uint8Array(arrayBuffer);
              for (var i = 0; i < byteString.length; i++) {
                _ia[i] = byteString.charCodeAt(i);
              }

              var dataView = new DataView(arrayBuffer);
              var blob = new Blob([dataView.buffer], { type: mimeString });
              return blob;
            }
            this.blob = dataURItoBlob(this.img);
            //
            bodyFormData.append("image", this.blob, "image.jpg");
            bodyFormData.append("store", undefined);
            bodyFormData.append("wallet", this.wallet);
            postMessage(this.id, bodyFormData, {
              "Content-Type": "multipart/form-data",
            }).then((Response) => {
              console.log(Response.data.data);
              this.messages.push({
                response_type: "4",
                image: this.img,
              });
              this.newMessage = true;

              setInterval(() => {
                this.newMessage = false;
              }, 100);
            });
          });
          fileReader.readAsDataURL(file);

          break;
        case "text":
          bodyFormData.append("text", this.userText);
          bodyFormData.append("store", this.store);
          bodyFormData.append("wallet", this.wallet);
          await postMessage(this.id, bodyFormData, {
            "Content-Type": "multipart/form-data",
          }).then((Response) => {
            console.log(Response.data.data);
            this.messages.push({
              response_type: "4",
              text: Response.data.data.text,
            });
            this.userText = "";
            this.newMessage = true;

            setInterval(() => {
              this.newMessage = false;
            }, 100);
          });
          break;

        default:
          break;
      }
    },
  },
  mounted() {
    this.isLoading = true;
    this.fetchTicket();
    this.loadMoreMessage();
  },
  updated() {
    if (this.messages.length && !this.scrollToBot) {
      const inter = setInterval(() => {
        this.scrollToBottom();
        this.scrollToBot = true;
        this.messagesHeight = this.$refs.messageInner.offsetHeight;
      }, 100);
      setTimeout(() => {
        clearInterval(inter);
      }, 300);
    }
    if (this.newMessage) {
      const el = this.$refs.newMessage;
      el.scrollIntoView();
    }
    if (this.newContent) {
      const initHei = this.messagesHeight;
      console.log(initHei);
      const all = this.$refs.messageInner.offsetHeight;
      console.log(all);
      const plus = all - initHei;
      console.log(plus);
      window.scrollTo(0, 2020);
      console.log(this.$refs.messageInner);
      console.log(window.scrollX);
    }
  },
};
</script>

<style scoped lang="scss">
.ticket-wrapper {
  width: 100%;
  padding: 30px 0 0;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding-bottom: 110px;
}
// navbar
.nav-wrapper {
  position: relative;
  width: 100%;
  overflow: hidden;
}
.nav {
  position: fixed;
  z-index: 101;
  right: 0;
  left: 0;
  border-radius: 0;
  top: 0;
  padding: 0px 2%;
  width: 100%;
  height: 60px;
  background: linear-gradient(180deg, #000 0, transparent);
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
/* goback btn */
.backward {
  width: 30px;
  height: 30px;
  cursor: pointer;
}
.go-back {
  fill: #eee;
}
/* logo */
.nav__logo,
.nav__icons {
  display: flex;
  align-items: center;
}
.nav__logo-img {
  width: 35px;
  height: 35px;
  border-radius: 50%;
  margin-left: 10px;
}
.nav__logo-user-name {
  color: #fff;
  border-radius: 20px;
  min-width: 100px;
  text-align: center;
}
/* block btn */
.block__btn {
  color: #111;
  background-color: #ddd;
  border-radius: 10px;
  width: 50px;
  padding: 2px 10px;
  font-size: 17px;
  cursor: pointer;
}
// background
.background {
  position: fixed;
  background-color: #eee;
  top: 10px;
  left: 0;
  height: 100vh;
  width: 100vw;
  z-index: -1;
  padding-top: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
// messages wrapper
.messages-wrapper {
  display: flex;
  width: 100%;
  min-height: calc(100vh - 140px);
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
}
.messages-inner {
  width: 100%;
}
.message {
  margin: 15px 0 28px;
  width: 100%;
  min-height: 40px;
  position: relative;
  text-align: center;
  display: flex;
  align-items: center;
}
.message__profile {
  position: absolute;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  top: 4px;
}
.message--send .message__profile {
  right: 5px;
}
.message--send .message__text {
  &::before {
    right: -8px;
    border-left: 12px solid #fff;
  }
}
.message--recive .message__text {
  background-color: #333;
  color: #eee;
  padding-right: 10px;
  margin-left: 59px;
  &::before {
    left: -8px;
    border-right: 12px solid #333;
  }
}
.message--recive .message__profile {
  left: 5px;
}
.message__text {
  min-width: 55px;
  z-index: auto;
  text-align: right;
  padding: 10px 15px;
  max-width: 60%;
  font-size: 14px;
  line-height: 24px;
  margin: 0;
  position: relative;
  border-radius: 10px;
  &::before {
    z-index: 0;
    content: "";
    position: absolute;
    border-top: 13px solid transparent;
    border-bottom: 13px solid transparent;
    top: 9px;
    width: 0;
    height: 0;
  }
}
.message--send .message__text {
  background-color: #fff;
  padding-left: 10px;
  margin-right: 59px;
  box-shadow: 0 0 10px 1px rgba(0, 0, 0, 0.07);
}
.message-detail {
  position: absolute;
  bottom: -20px;
  width: 100%;
  height: 20px;
  display: flex;
  justify-content: flex-end;
  color: rgba(0, 0, 0, 0.5);
}
.message--send .message-detail {
  left: 0;
}
.message--recive {
  justify-content: flex-end;
}
.message--send {
  justify-content: flex-start;
}
// chat btns
.chat__btns {
  height: 50px;
  padding: 0 10px;
  margin: 0;
  z-index: 10;
  box-shadow: 0 0 8px 1px rgba(0, 0, 0, 0.1);
  padding-bottom: 5px;
  display: grid;
  grid-template-columns: 40px auto 40px;
  grid-template-rows: 50px;
  bottom: 50px;
  background-color: #fff;
  position: fixed;
  width: 100%;
  right: 0;
  left: 0;
}
.send__btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  cursor: pointer;
  .send__btn-svg {
    fill: #777;
    width: 30px;
    height: 30px;
  }
}

.text__input {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  position: relative;
  .text__input-field {
    margin: 12px 0;
    width: 100%;
    height: 40px;
    padding: 0 14px;
  }
  .underline {
    position: absolute;
    bottom: 5px;
    background-color: #ddd;
    width: 95%;
    height: 1px;
  }
  .underline--focus {
    background-color: #c69e4b;
  }
}
.drop-zone {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  .drop-zone__input {
    cursor: pointer;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
  }
  .drop-zone__svg {
    width: 30px;
    height: 30px;
    fill: #777;
  }
}
// message image
.message__image {
  z-index: auto;
  text-align: right;
  padding: 10px 0;
  max-width: 60%;
  font-size: 14px;
  line-height: 24px;
  margin: 0;
  position: relative;
  border-radius: 10px;
}
.message--send .message__image {
  padding-left: 10px;
  margin-right: 59px;
}
.message--recive .message__image {
  padding-right: 10px;
  margin-left: 59px;
}
.message__image-img {
  position: static;
  display: block;
  border-radius: 15px;
  width: 300px;
  height: auto;
  vertical-align: bottom;
}
.wrap {
  height: 1px;
  width: 100%;
}
</style>