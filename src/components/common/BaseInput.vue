<template>
  <div class="input">
    <label class="input__label"
      ><span class="star">*</span>{{label}}</label
    >
    <input type="text" class="input__field" v-model="input" />
    <i class="underline"></i>
  </div>
</template>

<script>
export default {
  name: "input-component",
  data() {
    return {
        input : ''
    };
  },
  props: ["model",'label'],
  mounted(){
    this.model ? this.input = this.model : this.input = ''
  },
  watch:{
    input(newValue){
        this.$emit('inputChanged',newValue)
    }
  }
};
</script>

<style>
.input__label {
  color: #777;
}
.input {
  display: flex;
  flex-direction: column;
  position: relative;
  margin-bottom: 25px;
  width: 92%;
}
.input__field {
  background-color: #eee;
  height: 40px;
  padding-right: 7px;
  font-size: 17px;
  overflow: hidden;
}
.star {
  margin-left: 5px;
  color: #c69d4e;
}

.underline {
  background-color: #c69d4e;
  height: 1px;
  width: 100%;
  position: relative;
}
</style>