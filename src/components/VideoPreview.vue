<template>
  <section class="video-container">
    <div class="container">
      <hr />
      <b-carousel-list :data="items" v-bind="specs" class="video-preview" />
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      specs: {
        arrow: true,
        arrowHover: true,
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

      items: [
        {
          title: 'Slide 1',
          image: require('@/assets/export-preview.jpg'),
        },
        {
          title: 'Slide 2',
          image: require('@/assets/export-preview.jpg'),
        },
        {
          title: 'Slide 3',
          image: require('@/assets/export-preview.jpg'),
        },
      ],
    }
  },
}
</script>

<style>
.video-container {
  padding: 0 0.75rem;
}
.video-preview {
  margin: 3rem 0 2rem;
}
</style>
