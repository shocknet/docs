# FAQ

## General Questions

### What is Lightning.Pub?

"Pub" is a Nostr-native account system designed to make running Lightning infrastructure for your friends/family/customers easier than previously thought possible.

Pub also features a management dashboard for node runners, and allows the sending of guest invitations to your node. This makes ShockWallet the best Lightning wallet for users of all levels, from the node runner looking to share access with family, to the passive guest user that just wants a fast and reliable custodial experience and trust their friends over a big company.

## Operating a Pub

### Requirements

Pub is a NodeJS application and can run on all major operating systems and architectures. Our automated installer script currently supports:
- ✅ **Debian/Ubuntu**: Fully tested and supported
- ✅ **Arch/Fedora**: Fully tested and supported
- ✅ **macOS**: Fully supported with launchd service management

Below assumes a Neutrino configuration, meaning that an externally hosted Bitcoin Core is serving block information.

**System Requirements:**
- **RAM**: Minimum 2GB burstable in headless containers or VPS. 4+GB recommended for full Linux Desktop OS. RAM speed matters - 2GB DDR4 performs like 4GB DDR3.
- **Storage**: 20GB of space for compact blocks. Disk usage is typically under 5GB, but we recommend 20-40GB as LND can sometimes balloon with high usage.
- **CPU**: 1 CPU core minimum, 2+ cores recommended for full OS
- **Network**: 3+ Mbps download capacity for combined Nostr, Lightning, and Neutrino traffic. Initial blockheader download may take several minutes to complete on slow connections.
- **No Networking Setup Required**: No port forwarding, Tor, or firewall configuration needed! Pub uses Nostr relays for communication.

**Perfect for Bundle Nodes**: Lightning.Pub is a complete Lightning solution. You do NOT need a full Bitcoin or other node, perfect for small devices like Raspberry Pi.

Lightning state is in general heavily reliant on a reliable disk, and so we recommend redundant disks (RAID, ZFS) for critical or commercial scale systems, with a battery to facilitate graceful shutdowns. If that is not feasible, an old laptop with an SSD drive is ideal as the built-in battery offers protection from power events. NVME drives tend to be more reliable than regular SSDs.

### Configuration Options

For detailed configuration documentation including custom Nostr relays, bootstrap liquidity provider, Lightning Address domains, and all environment variables, see the [Configuration Guide](./configuration.md).

### Backups

Note: Seed phrases and static channel backups from direct LND instances should be recovered directly in LND, and the node not re-purposed for use with Pub.

Pub instances that were created with the installer will have a `db.sqlite` file in the `lightning_pub` directory. You can introspect this file to recover seed and encryption phrases, they are also cached on the Nostr relay as a contingency. We do not yet have automatic tooling for recoveries, but it is on the roadmap. Contact us for support with manual recoveries.

Lightning "backups" are disaster recovery scenarios given the nature of channel states, and they are not quick, easy, or costless. See above for hardware recommendations to prevent data loss.

### How do I get my seed phrase and static channel backups?

If you're using the install script, Pub will automatically encrypt and store the seed phrase into the database for retrieval by the administrator user in the Pub Dashboard. It will, by default, cache this and static channel backups on the Nostr relay so that they may be retrieved in the event of a node failure.

Pub can be added over an existing LND instance, but the seed phrase and static channel backups will not be automatically stored in Pub, so you will need to manually manage your backup scenario.

## Transactions

### How do I send on-chain Bitcoin?

On-chain spends and re-balancing via atomic swaps are coming very soon. Pub integrates the Boltz API standard but will point to multiple instances for the best rates and to avoid centralization. Providers slated for integration are Zeus, SwapMarket and Boltz itself.

## Lightning Network

### How do I open a Lightning channel?

**Automated Channel Opening (Recommended)**

By default, Lightning.Pub includes automated channel management:

1. **Bootstrap Liquidity Provider** - When enabled (default), your Pub automatically requests channel funding as a service credit when your balance reaches the threshold (~1M sats). The system compares rates from multiple LSPs (Zeus, Voltage, Flashsats) and selects the best option.

2. **Automatic LSP Integration** - Once you have funds, the system handles channel requests automatically. You don't need to manually negotiate with LSPs or manage channel opens.

To disable automation and manage channels manually, set `DISABLE_LIQUIDITY_PROVIDER=true` in your `.env` file. See the [Configuration Guide](./configuration.md#bootstrap-liquidity-provider) for details.

**Manual Channel Opening**

If you prefer to manually manage channels:

1. **Via Dashboard** - Tap the logo in ShockWallet 3 times while connected as administrator to access the Lightning.Pub Dashboard. Channel management features are available there.

2. **Via LND CLI** - Use `lncli` from the command line to directly manipulate the underlying LND instance:
   ```bash
   ~/lnd/lncli openchannel <node_pubkey> <amount_sats>
   ```

**Recommended Approach**: Keep automation enabled initially. It provides reliable liquidity with service credits. Once you're comfortable with Lightning operations, you can disable bootstrap and manage channels yourself.

### Does it use ECash? How does it compare on privacy?

No, in our view ECash proponents make deceptive privacy claims while mints combine the worst trade-offs for users by having client-server authentication to a custodial service while continuing to use bearer tokens for credentials.

Lightning.Pub eschews these crypto-theatrics and dependence on fragile mint "gateways" between the user and the node. Pub opts instead for a much more reliable and equally private direct RPC approach using ephemeral Nostr keys. The Nostr keys are blind to their social parent keys which may be used to perform backups or publish pointers in social contexts. 

Payments to and from ECash mints should still work as long as those mints are actually backed by Lightning and their wallets presenting a standard bolt11 invoice.

Privacy equivalence aside, we do not endorse **any** node guest solutions for privacy. A node operator has countless ways to deanonymize activity, and you should not use a node if you do not trust the operator with your metadata. There is no technology that makes an untrustworthy node operator trustworthy.

### Updates

Pub is under active development, updates are merged several times per week most weeks and all undergo automated tests.

Our installer script does not automatically update Pub instances, but you can simply re-run the installer for a graceful upgrade:

**Linux:**
```bash
wget -qO- https://deploy.lightning.pub | bash
```

**macOS:**
```bash
curl -fsSL https://deploy.lightning.pub | bash
```

The installer will only restart services if version checks deem it necessary.

**Automatic Updates via Cron:**

You can add the installer to your crontab to automatically update on your preferred schedule:

**Linux:**
```bash
# Edit your crontab
crontab -e

# Add this line to run weekly on Sunday at 2 AM
0 2 * * 0 wget -qO- https://deploy.lightning.pub | bash
```

**macOS:**
```bash
# Edit your crontab
crontab -e

# Add this line to run weekly on Sunday at 2 AM
0 2 * * 0 curl -fsSL https://deploy.lightning.pub | bash
```

## Security

### How safe is Lightning.Pub?

Any wallet connected to the internet is a **"hot wallet"** and **should not be used to store life changing amounts of Bitcoin.** We believe Lightning.Pub to secure as any Lightning account system available, but this is a bleeding edge software in a bleeding edge ecosystem and there will be vulnerabilities.

## Troubleshooting

### Installation Issues

If the installation fails or services don't start properly, use these commands to diagnose:

**Linux:**
```bash
# Check service status
systemctl --user status lnd
systemctl --user status lightning_pub

# View logs
journalctl --user-unit lnd -f
journalctl --user-unit lightning_pub -f

# Restart services if needed
systemctl --user restart lnd
systemctl --user restart lightning_pub
```

**macOS:**
After installation, run `source ~/.zshrc` (or `source ~/.bash_profile`) to enable the convenience aliases, or open a new terminal. Then use:

```bash
# Check service status
lpub-status

# View logs
lpub-log      # Lightning.Pub logs
lnd-log       # LND logs

# Control services
lpub-start    # Start both services
lpub-stop     # Stop both services
lpub-restart  # Restart both services
```

**All Platforms:**
```bash
# Retrieve admin connection string (if installation completed but you need to find it again)
cat ~/lightning_pub/admin.connect

# Generate QR code from admin connection string (optional, requires Node.js)
node ~/lightning_pub/scripts/qr_generator.js "$(cat ~/lightning_pub/admin.connect)"

# Reset admin access (generates new admin.connect automatically)
rm ~/lightning_pub/admin.npub
sleep 1
cat ~/lightning_pub/admin.connect
```

### Common Issues

#### LND wallet doesn't start

The wallet will automatically unlock during the initial sync (this can take several minutes). If LND is not starting:

**Linux:**
1. Check LND logs: `journalctl --user-unit lnd -n 50`
2. Verify LND is running: `systemctl --user status lnd`
3. If needed, restart: `systemctl --user restart lnd`

**macOS:**
1. Check LND logs: `lnd-log` or `tail -f ~/Library/Logs/Lightning.Pub/lnd.log`
2. Verify LND is running: `lpub-status`
3. If needed, restart: `lpub-restart`

#### Admin connection string or QR code not appearing

If the admin connection string and terminal QR code aren't displayed after installation, it typically means the installation script failed. Check the service logs to diagnose the issue. You can also manually retrieve the connection string with `cat ~/lightning_pub/admin.connect` and generate a QR code if needed (see troubleshooting commands above).

#### Port conflicts

If you see port conflict errors (especially port 9735), this may conflict with other Lightning implementations. The installer will attempt to find an available port automatically.

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