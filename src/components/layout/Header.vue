<template>
  <b-navbar wrapper-class="container" :mobile-burger="false">
    <template #brand>
      <b-navbar-item tag="h1">
        Videodoro
      </b-navbar-item>
    </template>

    <template #end>
      <b-navbar-item tag="div">
        <div class="buttons">
          <b-button
            type="is-black"
            icon-left="cog"
            inverted
            size="is-large"
            class="button-settings is-medium-mobile"
          >
            Settings
          </b-button>
        </div>
      </b-navbar-item>
    </template>
  </b-navbar>
</template>

<style lang="scss">
$family-visual: 'Big Shoulders Display', cursive;

.navbar > .container {
  @media screen and (max-width: 1023px) {
    align-items: center !important;
    justify-content: space-between !important;
    display: flex !important;
  }
}

.navbar-menu {
  @media screen and (max-width: 1023px) {
    box-shadow: none !important;
    padding: 0 !important;
    display: block !important;
  }
}

.navbar-brand {
  h1 {
    font-family: $family-visual;
    font-weight: 800;
    font-size: calc(1.5rem + 3vw);
    color: black;

    @media screen and (min-width: 1024px) {
      font-size: 4rem;
    }
  }
}

.button.is-medium-mobile {
  font-size: 1.25rem !important;

  .mdi-36px.mdi:before {
    font-size: 24px;
  }
}

.button-settings {
  &:hover {
    .mdi-cog {
      transition: all 0.3s ease;
      transform: rotateZ(45deg);
    }
  }

  .mdi-cog {
    transition: all 0.3s ease;
  }
}
</style>
