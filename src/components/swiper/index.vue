<template>
  <div class='swiper-wrapper'>
    <Swiper
      direction="vertical"
      :options="options">
      <SwiperSlide>SwiperSlide one
        <img src="/src/babylon001.jpg" alt="">
      </SwiperSlide>
      <SwiperSlide>SwiperSlide two 
        <img src="/src/babylon002.jpg" alt="">
      </SwiperSlide>
      <SwiperSlide>SwiperSlide three 
        <img src="/src/babylon003.jpg" alt="">
      </SwiperSlide>
      <div class="swiper-pagination" slot="pagination"></div>
    </Swiper>
    
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'

export default {
  name: '',
  components: {
    Swiper,
    SwiperSlide
  },
  data() {
    return {
      options: {
        autoplay: {
          disableOnInteraction: false,

        },
        loop: true,
        pagination: {
          el: '.swiper-pagination'
        }
      }
    }
  },
}
</script>

<style scoped lang="scss">
.swiper-wrapper {
  width: 500px;
}
</style>