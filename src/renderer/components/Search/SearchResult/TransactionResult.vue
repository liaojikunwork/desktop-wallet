<template>
  <div class="TransactionResult">
    <div class="flex justify-between transaction-item border-dashed border-gray-500 py-4">
      <p class="text-theme-page-text-light font-light">
        Transaction ID
      </p>
      <div class="flex items-center">
        <p class="text-sm">
          {{ transactionId }}
        </p>
        <ButtonClipboard
          :value="transactionId"
          view-box="0 0 12 15"
          class="text-inherit opacity-50 mx-2"
        />
        <SvgIcon
          name="open-external"
          view-box="0 0 15 15"
          class="text-theme-page-text-light"
        />
      </div>
    </div>
    <div class="flex items-center justify-between transaction-item border-dashed border-gray-500 py-4">
      <p class="text-theme-page-text-light font-light">
        Sender
      </p>
      <div class="flex items-center">
        <p class="text-sm address_text">
          {{ sender }}
        </p>
        <WalletIdenticon
          :value="sender"
          :size="25"
          class="ml-4 cursor-pointer"
        />
      </div>
    </div>
    <div class="flex justify-between items-center transaction-item border-dashed border-gray-500 py-4">
      <p class="text-theme-page-text-light font-light">
        Recipient
      </p>
      <div class="flex items-center">
        <p class="text-sm address_text">
          {{ recipient }}
        </p>
        <WalletIdenticon
          :value="recipient"
          :size="25"
          class="ml-4 cursor-pointer"
        />
      </div>
    </div>
    <div class="flex justify-between transaction-item border-dashed border-gray-500 py-4">
      <p class="text-theme-page-text-light font-light">
        Confirmations
      </p>
      <p class="text-sm">
        {{ confirmations }} / Well confirmed
      </p>
    </div>
    <div class="flex justify-between transaction-item border-dashed border-gray-500 py-4">
      <p class="text-theme-page-text-light font-light">
        Amount
      </p>
      <p class="text-sm amount_text">
        {{ formatter_networkCurrency(amount) }}
      </p>
    </div>
    <div class="flex justify-between transaction-item border-dashed border-gray-500 py-4">
      <p class="text-theme-page-text-light font-light">
        Fee
      </p>
      <p class="text-sm">
        {{ formatter_networkCurrency(fee) }}
      </p>
    </div>
    <div class="flex justify-between transaction-item border-dashed border-gray-500 py-4">
      <p class="text-theme-page-text-light font-light">
        Timestamp
      </p>
      <p class="text-sm">
        {{ timestamp }}
      </p>
    </div>
  </div>
</template>
<script>
import { ButtonClipboard } from '@/components/Button'
import { WalletIdenticon } from '@/components/Wallet'
import SvgIcon from '@/components/SvgIcon'

export default {
  name: 'TransactionResult',
  components: {
    ButtonClipboard,
    WalletIdenticon,
    SvgIcon
  },
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  computed: {
    transactionId () {
      return this.data.data.id
    },
    sender () {
      return this.data.data.sender
    },
    recipient () {
      return this.data.data.recipient
    },
    confirmations () {
      return this.data.data.confirmations
    },
    amount () {
      return this.data.data.amount
    },
    fee () {
      return this.data.data.fee
    },
    timestamp () {
      return this.formatter_date(this.data.data.timestamp)
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
