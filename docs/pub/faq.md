# FAQ

## General Questions

### What is Lightning.Pub?

"Pub" is a Nostr-native account system designed to make running Lightning infrastructure for your friends/family/customers easier than previously thought possible.

Pub also features a management dashboard for node runners, and allows the sending of guest invitations to your node. This makes ShockWallet the best Lightning wallet for users of all levels, from the node runner looking to share access with family, to the passive guest user that just wants a fast and reliable custodial experience and trust their friends over a big company.

## Operating a Pub

### Requirements

Pub is a NodeJS application and can run on all major operating systems and architectures. Our automated installer script is currently limited however to Debian-based Linux distrbutions.

Below assumes a Neutrino configuration, meaning that an externally hosted Bitcoin Core is serving block information.

- Pub+LND operate flawlessly on containers with as little as 2GB RAM and 1 CPU core.

- We would recommend a full OS have at least 4GB of RAM and 2 CPU cores.

- Disk usage is typically under 5GB, but we recommend 40GB as LND can sometimes balloon with high usage.

- 3+ Mbps download capacity for the combined Nostr, Lightning, and Neutrino traffic. Initial blockheader download may take several minutes to complete on slow connections.

Lightning state is in general heavily reliant on a reliable disk, and so we recommend redundant disks (RAID, ZFS) in a highly available system with a battery to facilitate graceful shutdowns. If that is not feasible, a laptop with an SSD drive is ideal as the built-in battery offers protection from power events. NVME drives tend to be more reliable than regular SSDs.

### Configuration Options

Pub has extensive configuration documented in the `env.example` file in the repository. To change your operating environment simply set the variables to your liking and restart the Pub service.

### Backups

Note: Seed phrases and static channel backups from direct LND instances should be recovered directly in LND, and the node not re-purposed for use with Pub.

Pub instances that were created with the installer will have a `db.sqlite` file in the `lightning_pub` directory. You can introspect this file to recover seed and encryption phrases, they are also cached on the Nostr relay as a contingency. We do not yet have automatic tooling for recoveries, but it is on the roadmap. Contact us for support with manual recoveries.

Lightning "backups" are disaster recovery scenarios given the nature of channel states, and they are not quick, easy, or costless. See above for hardware recommendations to prevent data loss.

### How do I get my seed phrase and static channel backups?

If you're using the install script, Pub will automatically encrypt and store the seed phrase into the database for retrieval by the administrator user in the Pub Dashboard. It will, by default, cache this and static channel backups on the Nostr relay so that they may be retrieved in the event of a node failure.

Pub can be added over an existing LND instance, but the seed phrase and static channel backups will not be automatically stored in Pub, so you will need to manually manage your backup scenario.

## Transactions

### How do I send on-chain Bitcoin?

On-chain spends are not yet supported while the software matures, you should use lncli on the underlying LND instance for the time being.

## Lightning Network

### How do I open a Lightning channel?

This feature is coming soon to the integrated Lightning.Pub Dashboard, to access the dashboard, tap the logo in ShockWallet 3 times if you are connected as the node administrator.

Alternatively, you may use lncli from the command line to manipulate the underlying LND instance.

### Does it use ECash? How does it compare on privacy?

No, in our view ECash proponents make deceptive privacy claims while mints combine the worst trade-offs for users by having client-server authentication to a custodial service while continuing to use bearer tokens for credentials.

Lightning.Pub eschews these crypto-theatrics and dependence on fragile mint "gateways" between the user and the node. Pub opts instead for a much more reliable and equally private direct RPC approach using ephemeral Nostr keys. The Nostr keys are blind to their social parent keys which may be used to perform backups or publish pointers in social contexts. 

Payments to and from ECash mints should still work as long as those mints are actually backed by Lightning and their wallets presenting a standard bolt11 invoice.

Privacy equivalence aside, we do not endorse **any** node guest solutions for privacy. A node operator has countless ways to deanonymize activity, and you should not use a node if you do not trust the operator with your metadata. There is no technology that makes an untrustworthy node operator trustworthy.

### Updates

Pub is under active development, updates are merged several times per week most weeks and all undergo automated tests.

Our installer script does not automatically update Pub instances, but you can simply re-run the installer for a graceful upgrade.

Manual updates can be done with a `git pull` and `npm i`

## Security

### How safe is Lightning.Pub?

Any wallet connected to the internet is a **"hot wallet"** and **should not be used to store life changing amounts of Bitcoin.** We believe Lightning.Pub to secure as any Lightning account system available, but this is a bleeding edge software in a bleeding edge ecosystem and there will be vulnerabilities.

## Troubleshooting

## Support

### Where can I get help with ShockWallet?

See below for our online forums, or for more private options see our [contacts](https://docs.shock.network/contact). 

### How do I report a bug?

- For security vulnerabilities, please use the [security advisor feature](https://github.com/shocknet/Lightning.Pub/security/advisories) on the Github repository.
- For all other issues, please use [Github issues](https://github.com/shocknet/Lightning.Pub/issues).

### Is there a community forum for Lightning.Pub users?

Yes, you can join the Lightning.Pub community through:
- Telegram: [t.me/ShockBTC](https://t.me/ShockBTC)
- Github Discussions: [https://github.com/shocknet/Lightning.Pub/discussions](https://github.com/shocknet/Lightning.Pub/discussions)