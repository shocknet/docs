# Reset admin access

Lightning.Pub has exactly **one** administrator. Use this guide when you need to promote a different ShockWallet identity, recover from a lost admin key, or hand off operations without migrating the node.

## What happens when you delete `admin.npub`

1. Stop Pub (or plan to restart it after the file change).
2. Delete `~/lightning_pub/admin.npub`.
3. Start or restart Pub.

The previous admin wallet is **demoted to guest**. Pub writes fresh enrollment files on disk:

| File | Contents | Use |
|------|----------|-----|
| **`admin.connect`** | Full `nprofile` string **plus** a one-time secret | Connect a **new** wallet to the Pub and promote that key to admin. |
| **`admin.enroll`** | One-time secret **only** | Paste into the Pub dashboard to promote the **currently connected** user wallet to admin. |

Only one admin exists at a time. Copy or use the secret promptly; treat it like a password.

## Command-line helpers

After a reset, read the connect string:

```bash
cat ~/lightning_pub/admin.connect
```

Optional QR (requires Node.js on the host):

```bash
node ~/lightning_pub/scripts/qr_generator.js "$(cat ~/lightning_pub/admin.connect)"
```

More install and service troubleshooting (including retrieving `admin.connect` after a failed install) is in [FAQ → Installation Issues](./faq.md#installation-issues).

## Admin change does not move sats

Promoting a new admin changes **permissions**, not account balances. Guest and user rows in `db.sqlite` stay where they are. See [Assets & liabilities](./assets-liabilities.md).

## Related reading

- [Migrate Pub](./migrate.md) — optional `admin.npub` when moving hosts
- [Assets & liabilities](./assets-liabilities.md) — dashboard vs wallet balances
- [FAQ](./faq.md) — backups, configuration, and troubleshooting
