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
    <div
      class="loading-overlay is-active"
      v-if="currentSession === 'workTime' || currentSession === 'initialLoad'"
    >
      <div class="loading-background"></div>
    </div>
    <div :class="`container ${this.currentSession}`">
      <hr />
      <b-carousel-list
        :data="sliderItems"
        v-bind="specs"
        v-if="sliderItems.length > 0"
      >
        <template #item="list">
          <div class="card">
            <div class="card-image">
              <b-button
                type="is-primary"
                icon-right="play"
                size="is-large"
                style="position: absolute; z-index: 1;"
                @click="launchVideo(list.videoId)"
              >
              </b-button>
              <figure class="image is-16by9">
                <img :src="list.image" />
              </figure>
              <b-tag
                type="is-black"
                rounded
                style="position: absolute; bottom: 5px; right: 5px; border-radius: 0;"
                ><b>{{ list.duration }}</b></b-tag
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
      <div v-else>
        <p class="subtitle is-5">
          No videos matching the break duration. Go do something else.
        </p>
      </div>
    </div>
  </section>
</template>

<script>
import axios from 'axios'
import { EventBus } from './../main'
import moment from 'moment'

export default {
  props: ['shortBreak', 'longBreak', 'currentSession'],
  data() {
    return {
      videoModalActive: false,
      isLoading: true,
      isPlaying: false,
      durationLimit: 5,
      prevWork: true,
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
    }
  },
  watch: {
    currentSession() {
      //only reloads videos if the previous session wasn't a work session.
      if (this.currentSession === 'initialLoad') {
        ;(this.prevWork = true), this.loadVideos(this.shortBreak)
      }

      if (this.currentSession === 'longBreak') {
        if (this.prevWork === false) {
          this.loadVideos(this.longBreak)
        }
        this.prevWork = false
      }
      if (this.currentSession === 'shortBreak') {
        if (this.prevWork === false) {
          this.loadVideos(this.shortBreak)
        }
        this.prevWork = false
      }
    },
  },
  methods: {
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
      const _this = this

        player = new YT.Player('player', { //eslint-disable-line
        width: '100%',
        videoId: id,
        events: {
          onReady: onPlayerReady,
          onStateChange: onPlayerStateChange,
        },
      })

      function onPlayerReady(event) {
        event.target.playVideo()
        if (_this.isPlaying === false) {
          EventBus.$emit('fireTimer')
        }
        _this.isPlaying = true
      }

      function onPlayerStateChange(event) {
        if (event.data == YT.PlayerState.PLAYING) { //eslint-disable-line
          _this.isPlaying = true
        }
      }
    },
    shuffleVideos(arr) {
      for (let i = arr.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1))
        ;[arr[i], arr[j]] = [arr[j], arr[i]]
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
    loadVideos(durationLimit) {
      this.sliderItems = []
      this.isLoading = true
      const endpoint = 'https://youtube.googleapis.com/youtube/v3/videos?'
      const apiKey = process.env.VUE_APP_YOUTUBE_API_KEY
      const filterTerms =
        'part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&type=video&maxResults=50&regionCode=US&videoCategoryId=10'
      const url = `${endpoint}${filterTerms}&key=${apiKey}`
      axios
        .get(url)
        .then(res => {
          this.shuffleVideos(res.data.items)
          res.data.items
            .filter(item => {
              //grabs minute duration of video
              let regexMatch = item.contentDetails.duration.match(/PT(.*?)M/)
              let videoDuration = regexMatch[1] !== null ? regexMatch[1] : 0
              if (videoDuration < durationLimit) {
                return item
              }
            })
            .forEach(item => {
              if (this.sliderItems.length < 12) {
                this.sliderItems.push({
                  title: item.snippet.title,
                  channel: item.snippet.channelTitle,
                  views: item.statistics.viewCount,
                  image: item.snippet.thumbnails.medium.url,
                  duration: moment
                    .utc(
                      moment
                        .duration(item.contentDetails.duration)
                        .asMilliseconds()
                    )
                    .format('mm:ss'),
                  videoId: item.id,
                })
              }
            })
        })
        .catch(err => {
          console.error(err)
        })
        .finally(() => {
          this.isLoading = false
          this.$emit('loadThis')
        })
    },
  },
  created() {
    this.loadScript()
    this.loadVideos(this.shortBreak)
    EventBus.$on('startTimer', isPlaying => {
      if (isPlaying) {
        this.isPlaying = true
      } else {
        this.isPlaying = false
      }
    })
  },
}
</script>

<style></style>
