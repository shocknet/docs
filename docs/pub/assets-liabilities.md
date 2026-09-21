# Assets & liabilities

Lightning.Pub tracks **user accounts** in its database and maps them to balances guests and operators see in ShockWallet. **LND** holds the actual node funds. Those two views are related but not identical. This guide explains what shows up in the admin wallet, what stays on the node only, and why changing admin does not move sats between accounts.

## Accounts vs the admin role

- **Admin is a permission**, not a pool of spendable balance. Promoting or changing the admin user does **not** move sats from one row in Pub’s account table to another.
- **Every user**—admin or guest—only sees in ShockWallet the sats that were sent to **that user** via a Lightning address, invoice, or on-chain address **that user generated**.
- As **admin**, you can see guest and user balances in the **Pub dashboard** for reporting and operations. Those totals do **not** appear as spendable balance in your **admin’s user-side wallet** view in ShockWallet.

If you expected your admin wallet to reflect “everything on the node,” that is intentional: the wallet UI is per-user accounting, not a full node treasury view.

## Node assets vs Pub liabilities

Pub’s **liabilities** are the sums it owes users according to `db.sqlite`. **Assets** are what LND actually holds (channels, on-chain, and so on).

In the common case, assets and liabilities stay aligned because receives and spends go through Pub. They can **diverge** when funds enter or leave LND **outside** Pub’s accounting.

## Root and unaffiliated assets

If you receive sats via **`lncli`**, another tool, or any path **outside** Pub, those sats are **not** credited to a user liability. From Pub’s perspective, **node assets can exceed Pub liabilities**.

You can still spend those funds with `lncli` or another LND tool, but Pub did not authorize that spend. The **[watchdog](./watchdog.md)** treats the resulting mismatch as a security event. You will need to **restart Pub** and **clear the watchdog event log** before normal operation resumes (see [Watchdog Security](./watchdog.md)).

**Safer interim approach:** **stop Pub** (leave LND running if you must) before you send from the CLI, then bring Pub back when LND and the database match again.

The dashboard does **not** yet provide a supported way to assign these unaffiliated “root” assets to a user account. That workflow is planned for a future release.

### Advanced: manual database edits (high risk)

Only consider this if you understand SQLite and Pub’s schema. Incorrect edits can corrupt accounting or prevent startup.

1. **Stop Pub** completely.
2. **Back up** `~/lightning_pub/db.sqlite` (copy the file somewhere safe).
3. Edit the database with the `sqlite3` CLI or a desktop SQLite browser, following guidance from Shock support or your own schema review.
4. Before starting Pub again, **delete** `eventLogV3.csv` in the `lightning_pub` directory so the database sanity checker does not fail on startup after your changes.
5. Start Pub and verify dashboard balances and the watchdog.

If the watchdog trips again, treat it as a sign that LND and the database still disagree.

## Fee root wallet

Fees that users pay are credited to a **root fee wallet** inside Pub’s user table. That wallet:

- **Does not** appear in the admin’s personal ShockWallet balance.
- **Does** count toward Pub **liabilities** (it is a real account row, not “invisible” to the database).

Moving or reallocating fee-root balances from the dashboard is **not** available yet; it is a sensitive area and is planned for a future release.

## Related reading

- [FAQ](./faq.md) — operating, backups, and troubleshooting
- [Reset admin access](./admin-reset.md) — admin change does not move sats between accounts
- [Migrate Pub](./migrate.md) — moving hosts without changing balances
- [Watchdog Security](./watchdog.md) — balance discrepancies and `WATCHDOG_MAX_DIFF_SATS`
