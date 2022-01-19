<template>
  <section class="contact">
    <p class="contact__title" :class="[darkMode && 'contact__title--dark']">مارا دنبال کنید</p>
    <div class="social-media">
      <a
        :href="social.address"
        v-for="social in socials"
        :key="social.id"
        class="social-media-item"
        :class="[darkMode && 'social-media-item--dark']"
      >
        <img :src="social.image" alt="" class="social-media-img" />
        <p>{{ social.name }}</p>
      </a>
    </div>
  </section>
</template>

<script>
export default {
    name : 'Social-media',
    props:['socials','darkMode']
};
</script>

<style scoped lang="scss">
.contact {
  width: 100%;
  padding-top: 20px;
  display: flex;
  align-items: center;
  flex-direction: column;
}
.contact__title {
  text-align: center;
  margin-bottom: 10px;
}
.social-media {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 10px;
  gap: 10px;
}
.social-media-item {
  flex: calc(50% - 10px) 1 0;
  height: 150px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  background-color: #111;
  margin: 0;
  p {
    color: #fff;
  }
}
.social-media-img {
  width: 50px;
  margin-bottom: 10px;
}
.contact__title--dark{
  color: #eee;
}
.social-media-item--dark{
  background-color: #181818;
  p{
    color: #fff;
  }
}
</style>