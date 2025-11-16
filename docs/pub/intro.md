# Lightning.Pub

### Don't just run a Lightning Node, run a Lightning Pub.

"Pub" is a [Nostr](https://nostr.info)-native account system designed to make running Lightning infrastructure for your friends/family/customers easier than previously thought possible.

## What is Lightning.Pub?

Lightning payments open the door to a new internet, but because of UX challenges with sovereignty we've seen a much slower uptake than we should for something so amazing. The biggest hurdle to adoption hasn't been with Bitcoin/Lightning node management itself, as liquidity is easily automated, but rather the legacy baggage of traditional Client-Server web infrastructure. Things like IP4, Reverse Proxies, DNS, Firewalls and SSL certificates all require personal configuration that is a hurdle for most.

Tor as a workaround has proven too slow and unreliable, and a dead-end for clearnet-web usecases. Mobile nodes are easy to use for spending, but channels for every device is expensive and unscalable. UX suffers from the limitations of the node not being an always-online server, which also makes them largely useless for merchants and routing services that earn revenue while you sleep.

**Pub solves these challenges** with a P2P-like design that is also web-friendly, by implementing a full RPC that is Nostr-native. Being Nostr-native eliminates the complexity of configuring your node like a server by using commodity Nostr relays. These relays, unlike LNURL proxies, are trustless by nature of Nostr's own encryption spec (NIP44).

Additionally, support for optional services are integrated into Pub for operators seeking backward compatibility with legacy LNURLs and Lightning Addresses.

By solving the networking and programmability hurdles, Pub provides Lightning with a 3rd Layer that enables node-runners, Businesses, and Uncle Jims to more easily bring their personal network into Bitcoin's permissionless economy. In doing so, Pub runners can keep the Lightning Network decentralized, with custodial scaling that is free of fiat rails, large banks, and other forms of high-time-preference shitcoinery.

## Key Features

- **Zero Network Configuration Required** - No port forwarding, Tor setup, firewall rules, or DNS configuration needed! Pub uses Nostr relays for all communication.
- **Complete Lightning Solution** - No additional LN node or Bitcoin full node required (uses Neutrino)
- **Automated Channels** - Receives quotes from multiple LSPs including Zeus, Voltage, and Flashsats
- **Bootstrap Peering** - Trusted peer support until you can afford your own channels
- **Accounting SubLayers** - Application pools and user-level accounting with configurable fee regimes
- **CLINK Integration** - Nostr-native invoice transport for trustless payments

![Accounts](https://github.com/shocknet/Lightning.Pub/raw/master/accounting_layers.png)

- Connecting via ShockWallet is as easy as pasting an nprofile
- Or use a link to share your nprofile with friends and family

<img src="https://cdn.shockwallet.app/add_src_sm.png" height="20%" alt="Connect Wallet" /> <img src="https://cdn.shockwallet.app/src_invite_sm.png" height="20%" alt="Invite Guests" />

## Planned Features

- [x] A management dashboard is actively being integrated into [ShockWallet](https://github.com/shocknet/wallet2)
- [x] Nostr native [CLINK](https://clinkme.dev) "offers"
- [x] Encrypted Push Notifications
- [ ] P2P "LSP" coordination for channel batching over Nostr
- [ ] Swap integration
- [ ] High-Availability / Clustering

Dashboard Wireframe:

<img src="https://shockwallet.b-cdn.net/pub_home_ss.png" alt="Pub Dashboard" width="240" />

## Installation

### One-Line Deployment

Paste one line and have a Pub node in under 2 minutes. It uses neutrino so you can run it on a $5 VPS or old laptop.

```bash
wget -qO- https://deploy.lightning.pub | bash
```

It should look like this in a minute or so:

![One-Line Deployment](https://raw.githubusercontent.com/shocknet/Lightning.Pub/master/one-liner.png)

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

**Note:** The installation is now confined to user-space, meaning:
- No sudo required for installation
- All data stored in `$HOME/lightning_pub/`
- Logs available at `$HOME/lightning_pub/install.log`

**⚠️ Migration from Previous Versions:**
Previous system-wide installations (as of 8.27.2025) need some manual intervention:
1. Stop existing services: `sudo systemctl stop lnd lightning_pub`
2. Disable services: `sudo systemctl disable lnd lightning_pub`
3. Remove old systemd units: `sudo rm /etc/systemd/system/lnd.service /etc/systemd/system/lightning_pub.service`
4. Reload systemd: `sudo systemctl daemon-reload`
5. Run the new installer: `wget -qO- https://deploy.lightning.pub | bash`

If you encounter issues, see the [Troubleshooting section in the FAQ](./faq.md#troubleshooting).

#### Automatic Updates

These are controversial, so we don't include them. You can however add a line to your crontab to re-run the installer on your time preference and it will gracefully handle updating:

```bash
# Add to user's crontab (crontab -e) - runs weekly on Sunday at 2 AM
0 2 * * 0 wget -qO- https://deploy.lightning.pub | bash
```

**Note:** The installer will only restart services if version checks deem necessary.

### Docker Installation

See the [Deploy on Docker](./docker.md) guide.

### Manual CLI Installation

1. Run [LND](https://github.com/lightningnetwork/lnd/releases) if you aren't already:

```bash
./lnd --bitcoin.active --bitcoin.mainnet --bitcoin.node=neutrino --neutrino.addpeer=neutrino.shock.network --feeurl=https://nodes.lightning.computer/fees/v1/btc-fee-estimates.json
```

2. Download and Install Lightning.Pub:

```bash
git clone https://github.com/shocknet/Lightning.Pub && cd Lightning.Pub && npm i
```

3. Configure values in the env file:

```bash
cp env.example .env && nano .env
```

4. Start the service:

```bash
npm start
```

## Usage Notes

Connect with ShockWallet ([wallet2](https://github.com/shocknet/wallet2)) using the wallet admin string that gets logged at startup. Simply copy/paste the string into the node connection screen.

The nprofile of the node can also be used to send invitation links to guests via the web version of ShockWallet.

**Note that connecting with wallet will create an account on the node, it will not show or have access to the full LND balance. Allocating existing funds to the admin user will be added to the operator dashboard in a future release.**

## Next Steps

- [Configure your Pub](./configuration.md)
- [Understand the Watchdog security feature](./watchdog.md)
- [Deploy on Docker](./docker.md)
- [Deploy on Start9](./start9.md)
- [Deploy on Umbrel](./umbrel.md)
- [Read the FAQ](./faq.md)

For complete documentation, see the [Lightning.Pub GitHub repository](https://github.com/shocknet/Lightning.Pub).

## Support Development

> [!IMPORTANT]
> ShockWallet and Lightning.Pub are free software. If you would like to see continued development, please show your [**support**](https://github.com/sponsors/shocknet) 😊

![License](https://www.gnu.org/graphics/agplv3-with-text-162x68.png)

## Warning

> [!WARNING]
> While this software has been used in a high-profile production environment for several years, it should still be considered bleeding edge. An integrated Watchdog service provides security monitoring - see the [Watchdog documentation](./watchdog.md) for details. While we give the utmost care and attention to security, **the internet is an adversarial environment and SECURITY/RELIABILITY ARE NOT GUARANTEED- USE AT YOUR OWN RISK**.
