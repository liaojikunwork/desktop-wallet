<template>
  <section class="my-5 mx-auto bg-contain bg-no-repeat bg-center comment-choice-bg bg-theme-action-button rounded flex">
    <div class="w-1/2 h-full flex flex-col justify-center pl-8 text-theme-page-text-light">
      <p class="mb-1 text-sm">
        Search by
      </p>
      <div class="flex flex-row text-sm">
        <img
          :src="assets_loadImage('search/choice.svg')"
          class="w-4 mr-2"
        >
        <p class="text-base font-medium">
          Make a choice
        </p>
      </div>
    </div>
    <div class="w-1/2 flex items-center">
      <img
        :src="assets_loadImage('search/line.png')"
        class="line_img"
      >
    </div>
  </section>
</template>

<script>

export default {
  name: 'SearchChoice',
  props: {
    isGray: {
      type: Boolean,
      required: false,
      default: true
    }
  }
}
</script>

<style lang="postcss" scoped>
.comment-choice-bg {
  width: 390px;
  height: 109px;
}
.line_img {
  width: 139px;
  height: 52px;
}
</style>
