<template>
  <Navbar :text="navbarText" />
  <div class="main-section tickets">
    <div
      class="ticket"
      v-for="(ticket, index) in tickets"
      :key="index"
      @click="$router.push({ name: 'Ticket', params: { id: ticket.id } })"
    >
      <img
        :src="ticket.store.image"
        class="ticket__img"
        @error="imageHandler"
      />
      <img
        src="../assets/svg/user-vipon.svg"
        alt=""
        class="ticket__img ticket__img--disapear"
        v-show="imageBroken"
      />

      <div class="ticket__text">
        <p class="ticket__text-user">{{ ticket.store.first_name }}</p>
        <span class="ticket__text-last">{{ ticket.text }}</span>
      </div>
      <div class="ticket__status">
        <svg
          viewBox="0 0 600 512"
          class="ticket__icon"
          :class="[ticket.notification == 2 && 'new-message']"
        >
          <path
            d="M590.93 271.93l-0.01 87.06c0,32.25 -26.2,58.48 -58.46,58.44l-263.67 -0.33 -101.44 90.13c-5.78,5.03 -14.07,6.17 -21.03,2.99 -7.02,-3.19 -11.54,-10.2 -11.54,-17.92l0 -75.13 -67.24 0.25c-32.28,0.11 -58.47,-26.21 -58.47,-58.44l0 -300.54c0,-32.26 26.21,-58.44 58.46,-58.44l186.54 0 55.28 0 223.66 0c32,0.29 57.91,26.36 57.91,58.43l0 87.02 0.01 0 0 126.48z"
          ></path>
        </svg>
      </div>
    </div>
  </div>
  <Footer />
</template>

<script>
import { getTickets } from "@api/TicketServices/TicketRequest";
import Navbar from "@common/Navbar.vue";
import Footer from "@common/BaseFooter.vue";
export default {
  name: "Tickets",
  data() {
    return {
      navbarText: "پیام ها",
      tickets: [],
      newMsg: null,
      imageBroken: false,
    };
  },
  methods: {
    async fetchTickets() {
      try {
        const {data} = await getTickets();
        const ticketData = data.results;
        this.tickets = ticketData;

      } catch (error) {
        if(error.message.includes('404')){
          const message = 'پیام اررور بدین شکل میباشد'
          const notif = {
            type : 'error',
            message
          }
          this.$store.dispatch('addNotification',notif)
        }
      }
    },
    imageHandler(event) {
      this.imageBroken = true;
      event.target.classList.add("ticket__img--disapear");
      event.target.nextElementSibling.classList.remove("ticket__img--disapear");
    },
  },
  components: {
    Navbar,
    Footer,
  },
  mounted() {
    this.fetchTickets();
  },
};
</script>

<style scoped lang="scss">
.tickets {
  display: flex;
  flex-direction: column;
  width: 100%;
}
.ticket {
  position: relative;
  display: grid;
  grid-template-columns: 80px calc(100% - 140px) 60px;
  align-items: center;
  width: 100%;
  padding-right: 20px;
  height: 110px;
  cursor: pointer;
  background: linear-gradient(270deg, #eee 0, #fff 90%);
  border-bottom: 1px solid rgba(0, 0, 0, 0.07);
}
.ticket__img {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  filter: saturate(0.4);
}
.ticket__text {
  align-self: center;
  padding: 0 6% 0 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
}
.ticket__text-user {
  color: #121;
  text-align: right;
  font-weight: bold;
  font-size: 17px;
  line-height: 20px;
}
.ticket__text-last {
  color: #bbb;
  font-size: 14px;
  max-width: 90%;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
.ticket__status {
  margin-top: 10px;
}
.ticket__icon {
  width: 30px;
  height: 30px;
  fill: #e7e7e7;
}
.new-message {
  fill: #c69e4b;
  animation: blink infinite 1.2s;
}
@keyframes blink {
  0% {
    opacity: 0.2;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0.2;
  }
}
.ticket__img--disapear {
  display: none;
}
</style>