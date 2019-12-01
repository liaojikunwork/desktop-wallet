<template>
  <div class="flex w-full flex-col content-center justify-center flex-1 relative SearchComment">
    <div class="text-center text-theme-page-text-light text-sm leading-normal">
      To quickly find the necessary information.<br>
      <b>We recommend</b> to use the filter to exact search.
    </div>
    <SearchChoice />
    <img
      :src="assets_loadImage('search/arrow.png')"
      class="absolute arrow-img"
    >
  </div>
</template>

<script>
import SearchChoice from './SearchChoice'
export default {
  name: 'SearchComment',
  components: {
    SearchChoice
  }
}
</script>

<style lang="postcss" scoped>
.SearchComment .arrow-img {
  right: 3rem;
  top: 2rem;
  height: calc(50% + 1rem);
  width: calc(50% - 195px - 2rem);
}
</style>
