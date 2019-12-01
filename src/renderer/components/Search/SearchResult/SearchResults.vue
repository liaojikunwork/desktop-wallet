<template>
  <div class="SearchResults flex-1 flex flex-col">
    <p class="font-semibold my-4 text-xl">
      Search results:
    </p>
    <div class="flex-1 overflow-y-auto">
      <div
        v-for="item in data"
        :key="item.id"
      >
        <TransactionResult
          v-if="item.type === types.transaction"
          :data="item"
        />
        <WalletResult
          v-if="item.type === types.wallet"
          :data="item"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { SEARCHITEMS } from '@config'
import TransactionResult from './TransactionResult'
import WalletResult from './WalletResult'

export default {
  name: 'SearchResults',
  components: {
    TransactionResult,
    WalletResult
  },
  props: {
    data: {
      type: Array,
      required: true
    }
  },
  data: () => ({
    types: SEARCHITEMS
  })
}
</script>

<style lang="postcss" scoped>
</style>
