# FAQ

## Table of Contents

- [General Questions](#general-questions)
  - [What is ShockWallet?](#what-is-shockwallet)
  - [Is ShockWallet available for iOS and Android?](#is-shockwallet-available-for-ios-and-android)
- [Account Setup](#account-setup)
  - [How do I create a new wallet?](#how-do-i-create-a-new-wallet)
  - [Can I import an existing wallet?](#can-i-import-an-existing-wallet)
- [Transactions](#transactions)
  - [Can I receive on-chain Bitcoin?](#can-i-receive-on-chain-bitcoin)
  - [How do I send on-chain Bitcoin?](#how-do-i-send-on-chain-bitcoin)
- [Lightning Network](#lightning-network)
  - [How do I open a Lightning channel?](#how-do-i-open-a-lightning-channel)
- [Security](#security)
  - [How safe is ShockWallet?](#how-safe-is-shockwallet)
  - [What should I do if I lose my phone?](#what-should-i-do-if-i-lose-my-phone)
  - [How often should I backup my wallet?](#how-often-should-i-backup-my-wallet)
- [Troubleshooting](#troubleshooting)
  - [Why is my transaction pending?](#why-is-my-transaction-pending)
  - [How do I update ShockWallet?](#how-do-i-update-shockwallet)
- [Support](#support)
  - [Where can I get help with ShockWallet?](#where-can-i-get-help-with-shockwallet)
  - [How do I report a bug?](#how-do-i-report-a-bug)
  - [Is there a community forum for ShockWallet users?](#is-there-a-community-forum-for-shockwallet-users)

## General Questions

### What is ShockWallet?

ShockWallet uses Nostr to connect to remote Lightning nodes. This makes it the fastest and most reliable Lightning wallet because it uses a remote node without complicated networking or Tor, and it doesn't have any of the boot up or sync issues inherent to mobile node wallets.

ShockWallet also features a management dashboard for node runners, and allows the sending of guest invitations to your node. This makes ShockWallet the best Lightning wallet for users of all levels, from the node runner looking to share access with family, to the passive guest user that just wants a fast and reliable custodial experience and trust their friends over a big company.

### Is ShockWallet available for iOS and Android?

Yes, ShockWallet is available for both platforms:
- iOS: Currently available through TestFlight
- Android: The latest APK can be downloaded from [shockwallet.app](https://shockwallet.app)

## Account Setup

### How do I create a new wallet?

1. Hit "Continue" from the main screen to create a trusted account that can be used to receive toward cloud or LSP services.
2. Alternatively, you can "Add Connection" and provide the nprofile of yours or a friend's Lightning.Pub.

### Can I import an existing wallet?

ShockWallet does not support importing other wallet backups. However, you can recover your ShockWallet state via:
- Nostr-based backups
- Downloading and restoring a recovery file from the wallet authentication screen

## Transactions

### Can I receive on-chain Bitcoin?

If you are connected to a node that supports it which is most, the receive screen will allow you to cycle through types of addresses, including on-chain.

### How do I send on-chain Bitcoin?

On-chain spends are not yet supported while the software matures.

## Lightning Network

### How do I open a Lightning channel?

This feature is coming soon to the integrated Lightning.Pub Dashboard, to access the dashboard, tap the wallet logo 3 times if you are connected as the node administrator.

### Does it use ECash? How does it compare on privacy?

No, in our view ECash makes deceptive privacy claims while combining the worst trade-offs in combining a custodial solution with bearer credentials. 

ShockWallet eschews flakey mint gateways fpr a much more reliable, and equally private, direct RPC approach. Nostr keys used for connections are source ephemeral and blind to social parent keys that may be used to perform backups. Settlement to and from ECash mints works as long as those mints are actually backed by Lightning.

Privacy equivalence aside, we do not an endorse **any** custodial Lightning services for privacy. A node operator has countless ways to deanonymize activity, and you should not use a node if you do not trust the operator with your metadata. 

## Security

### How safe is ShockWallet?

Any wallet on your phone or otherwise connected to the internet is a **"hot wallet" and should not be used to store life changing amounts of Bitcoin.** We believe ShockWallet to be as, if not more, secure than any other Lightning wallet available by nature of it's scoped design, but this is a bleeding edge software in a bleeding edge ecosystem and there will be vulnerabilities.

### What should I do if I lose my phone?

We recommend enabling sync or downloading a backup file from the authentication screen before losing your phone.

### How often should I backup my wallet?

If you are using Nostr to sync your wallet it should happen automatically. If you are using a recovery file, you should backup your wallet any time there is a new source added or changed to the wallet. 

## Troubleshooting


### How do I update ShockWallet?

- iOS: Updates are automatic through TestFlight
- Android: Users need to manually download the APK from [shockwallet.app](https://shockwallet.app) for the time being

## Support

### Where can I get help with ShockWallet?

See below for our online forums, or for more private options see our [contacts](https://docs.shock.network/contact). 

### How do I report a bug?

- For security vulnerabilities, please use the [security advisor feature](https://github.com/shocknet/wallet2/security/advisories) on the Github repository.
- For all other issues, please use [Github issues](https://github.com/shocknet/wallet2/issues).

### Is there a community forum for ShockWallet users?

Yes, you can join the ShockWallet community through:
- Telegram: [t.me/ShockBTC](https://t.me/ShockBTC)
- Github Discussions: [https://github.com/shocknet/wallet2/discussions](https://github.com/shocknet/wallet2/discussions)