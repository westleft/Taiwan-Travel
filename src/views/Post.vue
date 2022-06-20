<script setup lang="ts">
import axios from "axios";
import { useRoute } from "vue-router";
import { watch, ref, computed, onMounted, reactive, watchEffect } from "vue";
import { useStore } from "vuex";
import { Loader } from "@googlemaps/js-api-loader";

const route = useRoute();
const data = ref<object>();
const isload = ref<boolean>(false);

class Post {
  private readonly params: string;
  readonly type: string;
  private states;
  constructor() {
    this.params = route.params.id as string;
    this.type = this.checkType();
    this.states = {
      google: null,
      map: null,
      markers: null,
    };
  }

  private checkType(): string {
    if (this.params.includes("C1")) {
      return "ScenicSpot";
    } else if (this.params.includes("C2")) {
      return "Activity";
    } else if (this.params.includes("C3")) {
      return "Restaurant";
    } else {
      return "Hotel";
    }
  }

  async send() {
    try {
      const res = await axios.get(
        `https://ptx.transportdata.tw/MOTC/v2/Tourism/${this.type}?%24filter=${this.type}ID%20eq%20'${this.params}'&%24format=JSON`
      );
      data.value = res.data[0];
      console.log(data.value);

      isload.value = true;
      this.googleMapInit();
    } catch (err) {
      console.log(err);
    }
  }

  async googleMapInit() {
    const loader = new Loader({
      apiKey: process.env.VUE_APP_GOOGLE_MAP,
      version: "weekly",
      libraries: ["places"],
      language: "zh-TW",
    });
    this.states.google = await loader.load();
    this.states.map = new this.states.google.maps.Map(
      document.getElementById("map"),
      {
        center: {
          lat: data.value?.Position.PositionLat,
          lng: data.value?.Position.PositionLon,
        },
        zoom: 15,
        mapTypeControl: false,
        fullscreenControl: false,
        mapTypeId: "terrain",
      }
    );
  }
}

const post = new Post();
post.send();

const mainImage = ref<HTMLImageElement>()
const handSliderImage = (url: string): void => {
  if(!url) return
  (mainImage.value as HTMLImageElement).src = url
}

</script>
<template>
  <section v-if="isload">
    <div class="wrap">
      <div class="slider">
        <div class="main-img">
          <img
            ref="mainImage"
            v-if="data.Picture.PictureUrl1"
            :src="data.Picture.PictureUrl1"
          />
          <img v-else src="~@/assets/images/non-image.jpg" />
        </div>
        <div class="preview-imgs">
          <img
            v-if="data.Picture.PictureUrl1"
            :src="data.Picture.PictureUrl1"
            @click="handSliderImage(data.Picture.PictureUrl1)"
          />
          <img v-else src="~@/assets/images/non-image.jpg" />
          <img
            v-if="data.Picture.PictureUrl2"
            :src="data.Picture.PictureUrl2"
            @click="handSliderImage(data.Picture.PictureUrl2)"
          />
          <img v-else src="~@/assets/images/non-image.jpg" />
          <img
            v-if="data.Picture.PictureUrl3"
            :src="data.Picture.PictureUrl3"
            @click="handSliderImage(data.Picture.PictureUrl3)"
          />
          <img v-else src="~@/assets/images/non-image.jpg" />
        </div>
      </div>
      <div class="content">
        <h1>{{ data[`${post.type}Name`] }}</h1>
        <p class="tag">
          <span v-if="data.Class1"># {{ data.Class1 }}</span>
          <span v-if="data.Class2"># {{ data.Class2 }}</span>
        </p>
        <p>
          <span>關於</span><br />
          {{ data.Description }}
        </p>
        <p v-if="data.TicketInfo">
          <span>開放時間</span><br />
          {{ data.OpenTime ? data.OpenTime : "暫無資訊" }}
        </p>
        <p v-else-if="data.StartTime">
          <span>票價資訊</span><br />
          {{ data.StartTime.slice(0, 10) }} - {{ data.EndTime.slice(0, 10) }}
        </p>
        <p>
          <span>票價資訊</span><br />
          {{ data.TicketInfo ? data.TicketInfo : "暫無票價資訊" }}
        </p>
        <p>
          <span>地址</span><br />
          {{ data.Address }}
        </p>
        <a v-if="data.WebsiteUrl" :href="data.WebsiteUrl" target="_blank"
          >官方網站</a
        >
      </div>
      <div class="transport">
        <h2>交通資訊</h2>
        <p>
          {{ data.TravelInfo ? data.TravelInfo : "暫無資訊" }}
        </p>
      </div>
      <div class="map">
        <div id="map" ref="map"></div>
      </div>
    </div>
  </section>

  <!-- <div class="recommend-slider">
    <div class="wrap">
      <h2>其他推薦</h2>
      <div class="slider">
        <div class="slider-item" v-for="item in sliderData.list" :key="item">
          <router-link :to="`/post/${item.id}`">
            <img v-if="item.picture" :src="item.picture" alt="" />
            <img v-else src="~@/assets/images/non-image.jpg" />
            <h3>{{ item.name }}</h3>
            <p>{{ item.city }}</p>
          </router-link>
        </div>
      </div>
      <button class="btn_back" @click="renderData"></button>
      <button class="btn_next" @click="renderData"></button>
    </div>
  </div> -->
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
        line-height: 140%;
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
      display: flex;
      font-weight: 700;
      color: #000000;
      padding-bottom: 40px;
    }
    h2::before {
      display: flex;
      width: 20px;
      height: 20px;
      margin-right: 12px;
      content: "";
      background-image: url("~@/assets/images/recommend-icon.png");
      background-size: contain;
      background-repeat: no-repeat;
    }
  }
  .slider {
    @include flexCenter(center, space-between);
    position: relative;
    .slider-item {
      width: 30%;
      background-color: #fff;

      max-height: 400px;
      text-decoration: none;
      a {
        color: #000000;
        text-decoration: none;
      }
      h3 {
        padding: 16px 12px;
        font-weight: 700;
        line-height: 140%;
      }
      p {
        @include flexCenter(center, flex-start);
        padding: 4px 12px 20px 12px;
        color: #5b9bd5;
        font-weight: 400;
      }
      p::before {
        display: flex;
        content: "";
        background-image: url("~@/assets/images/map_icon.png");
        background-size: contain;
        background-repeat: no-repeat;
        line-height: 140%;
        width: 20px;
        height: 20px;
      }
      img {
        width: 100%;
        object-fit: cover;
        object-position: center;
        height: 250px;
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