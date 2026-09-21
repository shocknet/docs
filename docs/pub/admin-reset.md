# Reset admin

Use this when you need a **new** administrator wallet—for example you lost admin access, you are handing off the node, or you migrated without copying `admin.npub`.

Resetting admin changes **who can operate the dashboard**. It does **not** move sats between Pub user accounts. See [Assets & liabilities](./assets-liabilities.md).

## How to reset

1. **Stop Pub** (recommended) or plan to restart it immediately after the next step.
2. Delete `~/lightning_pub/admin.npub`.
3. **Start** (or restart) Pub.

Pub creates fresh enrollment material:

| File | Contents | Use when |
|------|----------|----------|
| `admin.connect` | Full `nprofile` string **plus** a one-time secret | Connect a **new** ShockWallet and promote that key to admin |
| `admin.enroll` | One-time secret only | Paste into the Pub dashboard to promote the **currently connected** wallet to admin |

Only **one** admin exists per Pub. Deleting `admin.npub` removes admin from the wallet that held it; that identity becomes a **guest**.

## Command-line helpers

After reset, read the connection string:

```bash
cat ~/lightning_pub/admin.connect
```

Optional QR code (requires Node.js):

```bash
node ~/lightning_pub/scripts/qr_generator.js "$(cat ~/lightning_pub/admin.connect)"
```

If enrollment files are missing after install or reset, check Pub logs (see [FAQ → Troubleshooting](./faq.md#installation-issues)).

## Related reading

- [Migrate Pub](./migrate.md) — optional `admin.npub` when moving hosts
- [Assets & liabilities](./assets-liabilities.md) — admin role vs user balances
- [FAQ](./faq.md) — installation and common issues
