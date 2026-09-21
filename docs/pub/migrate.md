# Migrate Pub

Use this guide when you move Lightning.Pub to a new host—for example bare metal, a VM, a home server, or a cloud instance. The steps are the same regardless of platform.

## Before you copy anything

1. **Stop Pub and LND on the old host** before copying files. Running both old and new copies at once can corrupt state or cause conflicting identity on the network.
2. After services are running successfully on the **new** host, **do not start** Pub or LND on the old host again.
3. **Keep the old host’s data** until the new host is healthy and you have verified channels, wallet access, and the dashboard. Treat the old machine as a backup until you are confident in the migration.

## What to copy

Copy these paths from the **old** host to the **new** host (same locations on the new machine):

| Path | Purpose |
|------|---------|
| `~/lightning_pub/db.sqlite` | Pub database, including the encrypted seed and the wallet decryption password LND needs when the Pub installer provisioned LND. |
| `~/lightning_pub/admin.npub` | Optional. Copy this if you want the **same** ShockWallet identity to remain the Pub administrator after migration. |
| `~/.lnd/` | LND data directory (channel and wallet state). |

If you skip `admin.npub`, you can still migrate the node; set up admin again with [Reset admin access](./admin-reset.md).

## Migration procedure

1. On the **new** host, run the [Pub installer](https://deploy.lightning.pub) so dependencies, directories, and services (systemd on Linux, launchd on macOS, etc.) are created.
2. **Stop** Pub and LND on the new host (they will have fresh empty data from the install).
3. Replace the new host’s `~/lightning_pub/db.sqlite` (and `admin.npub` if you copied it) with your copies from the old host.
4. Replace the new host’s `~/.lnd` directory with your copy from the old host.
5. **Start** Pub and LND on the new host.

On the next start, the new host should assume the identity of the old one—the same node, channels, and Pub state—as long as the old instance stays stopped.

Migration does **not** change per-user balances in Pub’s database. For how admin, guests, and node funds relate, see [Assets & liabilities](./assets-liabilities.md).

## Related reading

- [Reset admin access](./admin-reset.md) — new admin after migration or handoff
- [Assets & liabilities](./assets-liabilities.md) — balances after you move hosts
- [FAQ → Backups](./faq.md#backups) — seed phrase, `db.sqlite`, and disaster recovery context
- [Configuration](./configuration.md) — environment variables after migration
