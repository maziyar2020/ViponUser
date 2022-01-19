<template>
  <div class="observer" :class="[dataRetrived && 'observer--off',ticketObserver && 'observer--ticket']">
    <div class="loading-wrapper" v-if="!dataRetrived">
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
    </div>
  </div>
</template>

<script>
export default {
  name: "observer",
  data() {
    return {
      observer: null,
      ticketObserver : false
    };
  },
  mounted() {
    this.observer = new IntersectionObserver(([entry]) => {
      if (entry && entry.isIntersecting) {
        this.$emit("intersect");
      }
    });

    this.observer.observe(this.$el);
    
    if(this.$route.name == 'Ticket'){
      this.ticketObserver = true
    }
  },
  props: ["dataRetrived"],
};
</script>

<style scoped>
.observer {
  height: 120px;
  background-color: #eee;
  display: flex;
  align-items: center;
  justify-content: center;
}
.observer--ticket{
  background-color: transparent;
}
.observer--off {
  height: 0;
}
.loading-wrapper{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
}
.loading-wrapper svg{
  width: 100px;
  height: 100px;
  margin-top: -20px;
}
</style>