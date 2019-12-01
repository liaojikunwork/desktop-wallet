<template>
  <div class="Search flex flex-col relative w-full h-full overflow-none bg-theme-feature rounded-lg p-10">
    <header class="Search__header flex relative items-baseline w-full">
      <SearchInput
        v-model="keyword"
        class="mr-5"
        @keyup.enter.native="onSearch"
      />
      <SearchFilterButton @click="toggleFilter">
        <SearchFilter
          v-show="showFilter"
          :outside-click="showFilter"
          class="-mt-1 mr-5"
          @close="hideFilter"
        />
      </SearchFilterButton>
    </header>
    <SearchComment v-if="showComment" />
    <div
      v-if="loading"
      class="my-4"
    >
      <Loader />
    </div>

    <SearchResults
      v-if="showResult"
      :data="result"
    />
  </div>
</template>

<script>
import {
  SearchInput,
  SearchFilter,
  SearchFilterButton,
  SearchComment,
  SearchResults
} from '@/components/Search'
import Loader from '@/components/utils/Loader'
import WalletService from '@/services/wallet'
import TransactionService from '@/services/transaction'
import { SEARCHITEMS } from '@config'

export default {
  name: 'SearchPage',

  components: {
    SearchInput,
    SearchFilter,
    SearchFilterButton,
    SearchComment,
    SearchResults,
    Loader
  },

  data: () => ({
    showFilter: false,
    keyword: '',
    showComment: true,
    loading: false,
    result: []
  }),

  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.$synchronizer.focus()
      vm.$synchronizer.pause('market')
    })
  },

  computed: {
    showResult () {
      return this.result.length > 0
    }
  },

  methods: {
    toggleFilter () {
      this.showFilter = !this.showFilter
    },

    hideFilter () {
      this.showFilter = false
    },

    async searchWallet () {
      this.showComment = false
      this.result = []

      try {
        this.loading = true
        const walletInfo = await WalletService.getWalletInfo(this.keyword)
        console.log(walletInfo)
        const { data: { address: walletAddress } } = walletInfo

        const transactionsSent = await TransactionService.getTransactions({ recipientId: walletAddress })
        const transactionsReceived = await TransactionService.getTransactions({ senderId: walletAddress })
        const transactions = [...transactionsSent.data, ...transactionsReceived.data].sort((t1, t2) => (t1.timestamp.unix > t2.timestamp.unix ? -1 : 1))

        this.result = [{
          type: SEARCHITEMS.wallet,
          wallet: walletInfo.data,
          transactions: transactions.slice(0, 2)
        }]
        this.loading = false
      } catch (error) {
        this.loading = false
      }
      console.log(this.result)
    },

    async onSearch () {
      if (this.keyword === '') {
        return
      }

      if (
        WalletService.validateAddress(
          this.keyword,
          this.session_network.version
        )
      ) {
        // wallet search
        console.log('-wallet search')
        await this.searchWallet()
      } else if (WalletService.validatePublicKey(this.keyword)) {
        // public key search
        console.log('-public key')
        await this.searchWallet()
      } else if (WalletService.isUsernameExist(this.keyword)) {
        // delegate search
        console.log('-username')
        await this.searchWallet()
      } else {
        // transaction search
        console.log('-transaction id')
        try {
          this.loading = true
          this.showComment = false
          const transaction = await TransactionService.getTransactionInfo(
            this.keyword
          )
          this.result = [
            {
              type: SEARCHITEMS.transaction,
              ...transaction
            }
          ]
          this.loading = false
        } catch (error) {
          this.loading = false
          this.result = []
        }
      }
    },

    walletExists (byAttr, value) {
      console.log(byAttr, value)
      const wallet = this.$store.getters[`wallet/${byAttr}`](value)
      return wallet && !wallet.isContact
    }
  }
}
</script>

<style lang="postcss" scoped>
</style>
