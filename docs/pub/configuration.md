# Configuration

Lightning.Pub is configured via environment variables. Copy `env.example` to `.env` and customize:

```bash
cp env.example .env
nano .env  # or use your preferred editor
```

> **Important**: Environment variables in `.env` override settings configured via the wizard or stored in the database.

## Key Configuration Options

### Custom Nostr Relay

By default, Lightning.Pub uses the ShockNet relay for all Nostr communication. To use your own relay for full sovereignty:

```bash
# Single relay
NOSTR_RELAYS=wss://your-relay.com

# Multiple relays (space-separated)
NOSTR_RELAYS="wss://relay1.com wss://relay2.com wss://relay3.com"
```

Using your own relay eliminates any dependency on ShockNet infrastructure for RPC communication between your Pub and connected wallets.

### Bootstrap Liquidity Provider

The bootstrap liquidity provider automatically funds your first channel using service credits until you can afford your own. When enabled, Pub compares rates from multiple LSPs (Zeus, Voltage, Flashsats) and automatically requests a channel.

```bash
# Disable for full sovereignty (no bootstrap, you manage all channels)
DISABLE_LIQUIDITY_PROVIDER=true

# Point to a different Pub instance (not ShockNet) as your service provider
LIQUIDITY_PROVIDER_PUB=nprofile1...
```

**When to disable**: If you prefer to manually manage all channels and liquidity, or if you don't want any service credits/trust relationship with another Pub.

### Custom Lightning Address Domain

By default, ShockWallet auto-enrolls your CLINK offer at `@shockwallet.app`. For a custom domain:

**Option 1: Run [Bridgelet](https://github.com/shocknet/bridgelet)** - Self-hosted CLINK-based bridge (trustless when payer supports CLINK)
```bash
# Configure the bridge URL for wallets
BRIDGE_URL=https://your-bridge.com
```

**Option 2: Enable LNURL directly on Pub**
```bash
# Serve LNURL callbacks directly (requires SSL reverse proxy)
SERVICE_URL=https://yourdomain.com
```

### Watchdog Security

The watchdog monitors for balance discrepancies between your database and LND to prevent drainage attacks. See [Watchdog documentation](./watchdog.md) for details.

```bash
# Tolerance for balance discrepancy in sats (default: 0)
# Increase if running other account systems on same LND (not recommended)
WATCHDOG_MAX_DIFF_SATS=0
```

### LND Connection

If running LND separately or using non-standard paths:

**Linux (default):**
```bash
LND_ADDRESS=127.0.0.1:10009
LND_CERT_PATH=~/.lnd/tls.cert
LND_MACAROON_PATH=~/.lnd/data/chain/bitcoin/mainnet/admin.macaroon
```

**macOS (default):**
```bash
LND_ADDRESS=127.0.0.1:10009
LND_CERT_PATH=~/Library/Application Support/Lnd/tls.cert
LND_MACAROON_PATH=~/Library/Application Support/Lnd/data/chain/bitcoin/mainnet/admin.macaroon
```

The installer automatically configures these paths based on your operating system, so you typically don't need to set them manually.

### Fee Configuration

Configure fee regimes for monetizing your Pub operation or hosted applications:

```bash
# Outgoing invoice fees (covers your routing costs, sent to admin account)
OUTGOING_INVOICE_FEE_ROOT_BPS=60  # 0.6%
```

**Basis points (BPS)**: 100 BPS = 1%. For example, 60 BPS = 0.6%.

## Complete Reference

For all available settings including database paths, LSP configuration, metrics, and development options, see [`env.example`](https://github.com/shocknet/Lightning.Pub/blob/master/env.example) in the Lightning.Pub repository. Each setting includes detailed inline documentation.

