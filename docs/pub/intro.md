# Lightning.Pub

Share your node with friends, family, apps, and customers over Nostr with the first Nostr-based account system for Lightning.

## What is Lightning.Pub?

"Pub" is a [Nostr](https://nostr.info)-native account system designed to make running Lightning infrastructure for your friends/family/customers easier than previously thought possible.

Lightning payments open the door to a new internet, but because of UX challenges with sovereignty we've seen a much slower uptake than we should for something so amazing. The biggest hurdle to adoption hasn't been with Bitcoin/Lightning node management itself, as liquidity is easily automated, but rather the legacy baggage of traditional Client-Server web infrastructure. Things like IP4, Reverse Proxies, DNS, Firewalls and SSL certificates all require personal configuration that is a hurdle for most.

Tor as a workaround has proven too slow and unreliable, and a dead-end for clearnet-web usecases. Mobile nodes are easy to use for spending, but channels for every device is expensive and unscalable. UX suffers from the limitations of the node not being an always-online server, which also makes them largely useless for merchants and routing services that earn revenue while you sleep.

**Pub solves these challenges** with a P2P-like design that is also web-friendly, by implementing a full RPC that is Nostr-native. Being Nostr-native eliminates the complexity of configuring your node like a server by using commodity Nostr relays. These relays, unlike LNURL proxies, are trustless by nature of Nostr's own encryption spec (NIP44).

## Key Features

- **Zero Network Configuration Required** - No port forwarding, Tor setup, firewall rules, or DNS configuration needed! Pub uses Nostr relays for all communication.
- **Complete Lightning Solution** - No additional LN node or Bitcoin full node required (uses Neutrino)
- **Automated Channels** - Receives quotes from multiple LSPs including Zeus, Voltage, and Flashsats
- **Bootstrap Peering** - Trusted peer support until you can afford your own channels
- **Accounting SubLayers** - Application pools and user-level accounting with configurable fee regimes
- **CLINK Integration** - Nostr-native invoice transport for trustless payments

## Installation

### One-Line Deployment

Paste one line and have a Pub node in under 2 minutes. It uses neutrino so you can run it on a $5 VPS or old laptop.

```bash
wget -qO- https://deploy.lightning.pub | bash
```

This method installs all dependencies and creates user-level systemd services.

**Platform Support:**
- ✅ **Debian/Ubuntu**: Fully tested and supported
- ✅ **Arch/Fedora**: Fully tested and supported
- 🚧 **macOS**: Basic support stubbed in, but untested. Help wanted.

**System Requirements:**
- **RAM**: Minimum 2GB burstable in headless containers or VPS. 4+GB recommended for full Linux Desktop OS.
- **Storage**: 20GB of space for compact blocks.
- **Network**: No port forwarding, Tor, or firewall configuration needed!

**After Installation:**
- The installer will display an admin connection string (nprofile format) and a **QR code** for easy mobile setup
- Copy the connection string or scan the QR code with ShockWallet to connect as administrator

If you encounter issues, see the [Troubleshooting section in the FAQ](./faq.md#troubleshooting).

## Next Steps

- [Configure your Pub](./configuration.md)
- [Understand the Watchdog security feature](./watchdog.md)
- [Deploy on Docker](./docker.md)
- [Deploy on Start9](./start9.md)
- [Deploy on Umbrel](./umbrel.md)
- [Read the FAQ](./faq.md)

For complete documentation, see the [Lightning.Pub GitHub repository](https://github.com/shocknet/Lightning.Pub).
