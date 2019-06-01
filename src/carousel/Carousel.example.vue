<template>
  <div>
    <ui-carousel
      class="wrapper"
      :selected.sync="selected"
      style="width: 300px; height: 200px"
    >
      <ui-carousel-item name="1">
        <div class="box">1</div>
      </ui-carousel-item>
      <ui-carousel-item name="2">
        <div class="box">2</div>
      </ui-carousel-item>
      <ui-carousel-item name="3">
        <div class="box">3</div>
      </ui-carousel-item>
    </ui-carousel>
  </div>
</template>

<script>
  import Carousel from './Carousel';
  import CarouselItem from './Carousel-item';

  export default {
    name: 'CarouselExample',
    components: {
      'ui-carousel': Carousel,
      'ui-carousel-item': CarouselItem,
    },
    data() {
      return {
        selected: undefined
      }
    },
    watch: {
      selected(nv, ov) {
        console.log(nv, ov)
      }
    }
  };
</script>

<style lang="scss" scoped>
.wrapper {
  margin: 20px;
  .box {
    width: 100%;
    height: 320px;
    background: #ddd;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 30px;
  }
}
</style>