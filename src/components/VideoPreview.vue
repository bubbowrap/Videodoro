<template>
  <section class="video-container" ref="videoContainer">
    <b-modal v-model="videoModalActive" :width="640">
      <div id="player" ref="videoPlayer"></div>
    </b-modal>
    <b-loading
      :is-full-page="false"
      v-model="isLoading"
      :can-cancel="false"
    ></b-loading>

    <div class="container">
      <hr />
      <b-carousel-list :data="sliderItems" v-bind="specs">
        <template #item="list">
          <div class="card">
            <div class="card-image">
              <b-button
                type="is-black"
                icon-right="play"
                size="is-large"
                style="position: absolute; z-index: 1;"
                @click="launchVideo(list.videoId)"
              >
              </b-button>
              <figure class="image is-16by9">
                <img :src="list.image"
                />
              </figure>
              <b-tag
                type="is-black"
                rounded
                style="position: absolute; bottom: 5px; right: 5px; border-radius: 0;"
                ><b>{{
                  list.duration
                    .replace('PT', '')
                    .replace('M', ':')
                    .replace('S', '')
                }}</b></b-tag
              >
            </div>
            <div class="card-content">
              <div class="content">
                <p class="title is-6 mb-2">{{ list.title }}</p>
                <p class="subtitle is-7 mt-1">
                  {{ list.channel }}<strong> · </strong
                  >{{
                    list.views.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                  }}
                  Views
                </p>
              </div>
            </div>
          </div>
        </template>
      </b-carousel-list>
    </div>
  </section>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      videoModalActive: false,
      specs: {
        arrow: true,
        arrowHover: false,
        increment: 1,
        itemsToShow: 1.25,
        breakpoints: {
          480: {
            itemsToShow: 1.5,
          },
          600: {
            itemsToShow: 2.25,
          },
          768: {
            itemsToShow: 2.5,
          },
          960: {
            itemsToShow: 3,
          },
        },
      },
      sliderItems: [],
      // sliderItems: [
      //   {
      //     title: 'Slide 1',
      //     image: this.previewThumbnails[0],
      //   },
      //   {
      //     title: 'Slide 2',
      //     image: require('@/assets/export-preview.jpg'),
      //   },
      //   {
      //     title: 'Slide 3',
      //     image: require('@/assets/export-preview.jpg'),
      //   },
      // ],
    }
  },
  methods: {
    loading() {
      this.isLoading = true
    },
    launchVideo(videoId) {
      this.videoModalActive = true
      const checkForPlayer = () => {
        //checks if player is ready
        if (this.$refs.videoPlayer !== undefined) {
          this.loadPlayer(videoId)
        } else {
          setTimeout(checkForPlayer, 50)
        }
      }
      checkForPlayer()
    },
    loadPlayer(id) {
      let player //eslint-disable-line

        player = new YT.Player('player', { //eslint-disable-line
        width: '640',
        videoId: id,
        events: {
          onReady: onPlayerReady,
          onStateChange: onPlayerStateChange,
        },
      })
      let done = false

      function onPlayerReady(event) {
        event.target.playVideo()
        this.$emit('startBreakTimer')
      }

      function onPlayerStateChange(event) {
        if (event.data == YT.PlayerState.PLAYING && !done) { //eslint-disable-line
          setTimeout(stopVideo, 6000)
          done = true
        }
      }
      function stopVideo() {
        player.stopVideo()
      }
    },

    loadScript() {
      if (typeof YT == 'undefined' || typeof YT.Player == 'undefined') { //eslint-disable-line
        var tag = document.createElement('script')
        tag.src = 'https://www.youtube.com/iframe_api'
        var firstScriptTag = document.getElementsByTagName('script')[0]
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)
      }
    },
  },
  mounted() {},
  created() {
    this.loadScript()
    this.loading()
    //https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=US&key=[YOUR_API_KEY]

    const endpoint = 'https://youtube.googleapis.com/youtube/v3/videos?'
    const apiKey = process.env.VUE_APP_YOUTUBE_API_KEY
    const filterTerms =
      'part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=US'
    const url = `${endpoint}${filterTerms}&key=${apiKey}`
    axios
      .get(url)
      .then(res => {
        res.data.items.forEach(item => {
          this.sliderItems.push({
            title: item.snippet.title,
            channel: item.snippet.channelTitle,
            views: item.statistics.viewCount,
            image: item.snippet.thumbnails.medium.url,
            duration: item.contentDetails.duration,
            videoId: item.id,
          })
        })
        this.isLoading = false
        console.log(res.data)
      })
      .catch(err => {
        console.error(err)
      })
  },
}
</script>

<style></style>
