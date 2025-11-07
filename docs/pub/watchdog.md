# Watchdog Security

## Overview

Lightning.Pub includes an integrated Watchdog service designed to mitigate the risk of drainage attacks, which is a common risk to all Lightning APIs. The watchdog monitors spending activity and automatically terminates spends if it detects a discrepancy between LND and the database.

## How It Works

The Watchdog service:
- Continuously monitors balance discrepancies between user balances in Pub's database and the actual LND balance
- Terminates spend operations if unauthorized activity is detected
- Provides a last line of defense against 0-day drainage attacks

## Configuration

The watchdog behavior can be configured via environment variables in your `.env` file:

```bash
# Maximum difference between users balance and LND balance at Pub startup
# Default is 0 (no discrepancy tolerated)
WATCHDOG_MAX_DIFF_SATS=0
```

## Important Considerations

### Running Alongside Other Systems

> ⚠️ **WARNING**: It is NOT RECOMMENDED to use Lightning.Pub alongside other account systems such as AlbyHub, LNBits, or BTCPay.

The watchdog may detect legitimate activity from other account systems as a discrepancy and terminate spends. If you need to run multiple account systems:

1. **Disable the watchdog** by increasing `WATCHDOG_MAX_DIFF_SATS` to account for the spending buffer needed by other services
2. **Use separate LND instances** for each account system (recommended)

### Disabling the Watchdog

The watchdog can be effectively disabled by setting the threshold very high:

```bash
# Set to a very high value to effectively disable (not recommended)
WATCHDOG_MAX_DIFF_SATS=1000000000
```
## Security Notice

While this software has been used in production environments for several years and special care has been taken with security, it should still be considered bleeding edge. 

**The internet is an adversarial environment and SECURITY/RELIABILITY ARE NOT GUARANTEED - USE AT YOUR OWN RISK.**

For security vulnerabilities, please use the [security advisory feature](https://github.com/shocknet/Lightning.Pub/security/advisories) on the GitHub repository.
