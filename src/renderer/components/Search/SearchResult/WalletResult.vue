<template>
  <div class="WalletResult">
    <div class="flex items-center">
      <WalletIdenticon
        :value="address"
        :size="32"
        class="mr-4"
      />
      <div class="flex justify-center flex-col">
        <p class="text-theme-page-text-light font-medium text-xs">
          Address:
        </p>
        <p class="font-semibold">
          {{ address }}
        </p>
      </div>
    </div>
    <div class="ml-12">
      <TransactionTable
        :has-short-id="true"
        :rows="transactions"
        :no-data-message="$t('TABLE.NO_TRANSACTIONS')"
      />
    </div>
  </div>
</template>
<script>
import { WalletIdenticon } from '@/components/Wallet'
import { TransactionTable } from '@/components/Transaction'

export default {
  name: 'WalletResult',
  components: {
    WalletIdenticon,
    TransactionTable
  },
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  computed: {
    address () {
      return this.data.wallet.address
    },
    transactions () {
      return this.data.transactions
    }
  }
}
</script>

<style lang="postcss" scoped>
.TransactionResult .transaction-item + .transaction-item {
  border-top-width: 1px;
}
.TransactionResult .transaction-item .address_text {
  color: #0075fb;
}
.TransactionResult .transaction-item .amount_text {
  color: #2fab5d;
}
</style>
