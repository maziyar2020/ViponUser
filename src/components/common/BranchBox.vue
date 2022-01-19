<template>
  <section class="branch">
    <img :src="image" alt="" class="branch__img" />
    <div class="branch__filter"></div>
    <div class="branch__inner">
      <p>{{title}}</p>
      <svg viewBox="0 0 512 512" class="branch__svg">
        <path
          d="M174.6 252.89l205.16 -205.16c7.2,-7.21 7.2,-18.89 0,-26.1 -7.2,-7.2 -18.88,-7.2 -26.09,0l-221.43 221.44c-7.2,7.2 -7.2,18.88 0,26.09l221.43 221.43c7.33,7.08 19.01,6.87 26.09,-0.46 6.91,-7.15 6.91,-18.48 0,-25.63l-205.13 -205.13 0 -0.03c-0.82,-0.83 -1.33,-1.97 -1.33,-3.23 0,-1.26 0.51,-2.4 1.33,-3.22l-0.03 0z"
        ></path>
      </svg>
    </div>
  </section>
</template>

<script>
export default {
  name: "branch-box",
  props: ["image",'title'],
};
</script>

<style scoped>
.branch {
  width: 92%;
  height: 300px;
  border-radius: 15px;
  overflow: hidden;
  position: relative;
  cursor: pointer;
  z-index: 4;
  margin-bottom: 15px;
}
.branch__img {
  z-index: 1;
  width: 100%;
  min-height: 300px;
  filter: saturate(0.15);
}
.branch__filter {
  z-index: 3;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0.3) 40%,
    rgba(0, 0, 0, 0.8)
  );
}
.branch__inner {
  z-index: 3;
  position: absolute;
  bottom: 15px;
  left: 0;
  right: 0;
  margin: 0 auto;
  color: #fff;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
}
.branch__svg{
  fill : #fff;
  width: 25px;
  height: 25px;
  margin-right: 10px;
}
</style>