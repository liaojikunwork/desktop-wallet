import { TRANSACTION_TYPES, APIURLS } from '@config'
import { Transactions } from '@arkecosystem/crypto'
import got from 'got'

export default class TransactionService {
  /*
   * Get id for transaction.
   * @param {Object} transaction
   * @return {String}
   */
  static getId (transaction) {
    return Transactions.Utils.getId(transaction)
  }

  /*
   * Get bytes for transaction.
   * @param {Object} transaction
   * @return {String}
   */
  static getBytes (transaction) {
    return Transactions.Serializer
      .getBytes(transaction, {
        excludeSignature: true,
        excludeSecondSignature: true
      })
      .toString('hex')
  }

  /*
   * Get bytes for transaction.
   * @param {Object} wallet
   * @param {Transaction} transactionObject
   * @param {Object} vm
   * @return {Object}
   */
  static async ledgerSign (wallet, transactionObject, vm) {
    transactionObject.senderPublicKey(wallet.publicKey)
    transactionObject.sign('passphrase') // Sign with a "fake" passphrase to get the transaction structure
    const transaction = transactionObject.getStruct()
    transaction.senderPublicKey = wallet.publicKey // Restore original sender public key

    if (transactionObject.data.type === TRANSACTION_TYPES.VOTE) {
      transaction.recipientId = wallet.address
    }

    const transactionBytes = this.getBytes(transaction)
    transaction.signature = await vm.$store.dispatch('ledger/signTransaction', {
      transactionHex: transactionBytes.toString('hex'),
      accountIndex: wallet.ledgerIndex
    })

    if (!transaction.signature) {
      throw new Error(vm.$t('TRANSACTION.LEDGER_USER_DECLINED'))
    }

    transaction.id = this.getId(transaction)

    return transaction
  }

  /*
   * Get Transaction by TransactionId.
   * @param {String} transactionID
   * @return {Object}
   */
  static async getTransactionInfo (transactionID) {
    const response = await got(APIURLS.transactions + transactionID)
    return JSON.parse(response.body)
  }

  /*
   * Get Transactions by Option.
   * @param {Option} searchOption
   * @param {Number} limit
   * @return {Object}
   */
  static async getTransactions (searchOption, limit = 2) {
    const response = await got(APIURLS.transactions + 'search?limit=' + limit, {
      method: 'post',
      body: JSON.stringify(searchOption),
      headers: {
        'content-type': 'application/json'
      }
    })
    return JSON.parse(response.body)
  }
}
