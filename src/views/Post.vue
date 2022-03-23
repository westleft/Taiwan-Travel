
<script>
import { useRoute } from "vue-router";
import { computed, onMounted, reactive } from "vue";
import { ref, watch } from "vue";
import { useStore } from "vuex";
export default {
  setup() {
    const route = useRoute();
    const store = useStore();
    const data = ref({});
    const isload = ref(true);
    const tags = ref({})
    const mainImg = ref()

    onMounted(() => {
      store.dispatch("Post/checkType", route.params.id);
    });

    watch(
      () => store.state.Post.data,
      (newValue) => {
        data.value = newValue;
        mapinitMap(
          data.value.position.PositionLat,
          data.value.position.PositionLon
        );
        isload.value = false;
        tags.value = filterTags(data.value.class)        
      }
    );

    // Google Map
    const mapinitMap = (positionLat, positionLon) => {
      let map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: positionLat, lng: positionLon },
        zoom: 18,
      });
    };

    // 整理 tag
    const filterTags = (tag)=>{
      return tag.filter(item=>{
        return item !== ""
      })
    }

    // 控制 slider 顯示圖片
    const sliderController = (e) =>{
      mainImg.value.src = e.target.src
    }

    return { data, isload, tags, mainImg, sliderController };
  },
};
</script>
<template>
  <section>
    <div class="wrap">
      <div class="slider">
        <div class="main-img" v-if="!isload">
          <img
            ref="mainImg"
            v-if="data.picture.PictureUrl1"
            :src="data.picture.PictureUrl1"
          />
          <img v-else src="~@/assets/images/non-image.jpg" />
        </div>
        <div class="preview-imgs" v-if="!isload">
          <img
            v-if="data.picture.PictureUrl1"
            :src="data.picture.PictureUrl1"
            @click="sliderController"
          />
          <img v-else src="~@/assets/images/non-image.jpg" />
          <img
            v-if="data.picture.PictureUrl2"
            :src="data.picture.PictureUrl2"
            @click="sliderController"
          />
          <img v-else src="~@/assets/images/non-image.jpg" />
          <img
            v-if="data.picture.PictureUrl3"
            :src="data.picture.PictureUrl3"
            @click="sliderController"
          />
          <img v-else src="~@/assets/images/non-image.jpg" />
        </div>
      </div>
      <div class="content">
        <h1>{{ data.name }}</h1>
        <p class="tag">
          <span v-for="tag in tags" :key="tag"># {{ tag }}</span>
        </p>
        <p>
          <span>關於</span><br />
          {{ data.description }}
        </p>
        <p>
          <span>開放時間</span><br />
          {{ data.openTime }}
        </p>
        <p>
          <span>票價資訊</span><br />
          {{data.ticketInfo}}
        </p>
        <p>
          <span>地址</span><br />
          {{ data.address }}
        </p>
        <a :href="data.websiteUrl" target="_blank">官方網站</a>
      </div>
      <div class="transport">
        <h2>交通資訊</h2>
        <p>
          {{ data.travelInfo }}
        </p>
      </div>
      <div class="map">
        <div id="map" ref="map"></div>
      </div>
    </div>
  </section>
  <div class="recommend-slider">
    <div class="wrap">
      <h2>其他推薦</h2>
      <div class="slider">
        <div class="slider-item">
          <a href="" class="">
            <img src="~@/assets/images/non-image.jpg" alt="" />
            <h3>台中歌劇院</h3>
            <p>台北市 北投區</p>
          </a>
        </div>
        <div class="slider-item">
          <a href="" class="">
            <img src="~@/assets/images/non-image.jpg" alt="" />
            <h3>台中歌劇院</h3>
            <p>台北市 北投區</p>
          </a>
        </div>
        <div class="slider-item">
          <a href="" class="">
            <img src="~@/assets/images/non-image.jpg" alt="" />
            <h3>台中歌劇院</h3>
            <p>台北市 北投區</p>
          </a>
        </div>
      </div>
      <button class="btn_back"></button>
      <button class="btn_next"></button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
section {
  @include flexCenter(center, center);
  width: 100%;
  display: flex;
  background: $color_skin;
  padding: 100px 0;
  .wrap {
    @include flexCenter(flex-start, center);
    width: 76%;
    flex-wrap: wrap; 
    .slider {
      @include flexCenter(center, center);
      flex-direction: column;
      width: 50%;
      .main-img {
        @include flexCenter(center, center);
        width: 100%;

        img {
          width: 100%;
          height: 400px;
          object-fit: cover;
          object-position: center;
        }
      }
      .preview-imgs {
        @include flexCenter(center, space-between);
        display: flex;
        width: 100%;
        img {
          width: 30%;
          height: 100px;
          object-fit: cover;
          object-position: center;
          margin-top: 4%;
        }
      }
    }
    .content {
      @include flexCenter(flex-start, flex-start);
      flex-direction: column;
      width: 50%;
      padding: 0 4%;
      line-height: 140%;
      h1 {
        font-size: 3.5vmin;
        font-weight: 900;
      }
      p {
        padding: 12px 0;
        span {
          color: #00457c;
          font-weight: 700;
        }
      }
      .tag {
        margin-top: 8px;
        span {
          border: 3px solid #e8d4a2;
          box-sizing: border-box;
          border-radius: 20px;
          padding: 4px 16px;
          color: #000000;
          font-weight: 400;
          margin-right: 8px;
        }
      }
      a {
        background-color: #5b9bd5;
        border-radius: 20px;
        padding: 10px 40px 8px 40px;
        color: #ffffff;
        text-decoration: none;
      }
    }
    .transport {
      margin-top: 4%;
      width: 50%;
      h2 {
        color: #00457c;
        font-weight: 700;
      }
      p {
        line-height: 140%;
      }
    }
    .map {
      width: 50%;
      margin-top: 4%;
    }
  }
}

.recommend-slider {
  @include flexCenter(center, center);
  width: 100%;
  display: flex;
  position: relative;
  background: $color_skin;
  padding-bottom: 100px;
  .wrap {
    @include flexCenter(space-between, space-between);
    width: 76%;
    flex-direction: column;
    h2 {
      font-weight: 700;
      color: #000000;
      padding-bottom: 40px;
    }
    h2::before {
      content: "　";
      //   background-image: url("../../images/recommend-icon.png");
      background-size: contain;
      background-repeat: no-repeat;
      margin-bottom: 3px;
      margin-right: 4px;
    }
  }
  .slider {
    @include flexCenter(center, space-between);
    position: relative;
    .slider-item {
      width: 30%;
      background-color: #fff;
      height: 100%;
      min-height: 350px;
      text-decoration: none;
      a {
        color: #000000;
        text-decoration: none;
      }
      h3 {
        padding: 16px 12px;
        font-weight: 700;
      }
      p {
        @include flexCenter(center, flex-start);
        padding: 4px 12px 20px 12px;
        color: #5b9bd5;
        font-weight: 400;
      }
      p::before {
        content: "　";
        // background-image: url("../../images/map_icon.png");
        background-size: contain;
        background-repeat: no-repeat;
        margin-bottom: 3px;
      }
      img {
        width: 100%;
        object-fit: cover;
        object-position: center;
        max-height: 250px;
      }
    }
  }
  button {
    @include flexCenter(center, center);
    @include size(40px, 40px);
    position: absolute;
    top: 40%;
    background-color: #d69f8f;
    border-radius: 50px;
    border: none;
    cursor: pointer;
  }
  .btn_next {
    right: 8%;
  }
  .btn_back {
    left: 8%;
  }
  .btn_next::after,
  .btn_back::after {
    @include size(12px, 12px);
    position: relative;
    content: "";
    transform: rotate(45deg);
  }
  .btn_next::after {
    border-right: solid 4px #fff;
    border-top: solid 4px #fff;
    right: 2px;
  }
  .btn_back::after {
    border-left: solid 4px #fff;
    border-bottom: solid 4px #fff;
    left: 2px;
  }
}
#map {
  width: 100%;
  height: 500px;
}
</style>