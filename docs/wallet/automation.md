# Automation

> **⚠️ Experimental Feature**: Automation is currently experimental and may change significantly in future releases.

ShockWallet's automation feature allows you to set up recurring payments (subscriptions) that automatically pay LNURL, CLINK Offer, or Lightning Address endpoints on a schedule.

## How It Works

Automation is wallet-side only and requires the wallet to be open periodically. When open:

1. The wallet checks subscription status approximately every hour
2. Payments are made when 70-85% of the subscription period has elapsed, paying early to avoid expiration
3. A period counter prevents duplicate payments

Your Lightning.Pub node processes the payments but doesn't manage the scheduling.

## Configuration

Access the automation screen from the ShockWallet navigation menu to configure:

- **Memo**: Description
- **Endpoint**: LNURL-Pay, CLINK Offer (noffer), or Lightning Address
- **Schedule**: Daily, Weekly, or Monthly
- **Amount**: Payment amount in sats or fiat
- **Enabled**: Toggle to activate/deactivate

## Fiat Pricing

Subscriptions can be denominated in fiat (stored as cents). When paying:

1. The wallet fetches the current BTC exchange rate from your configured price API
2. Converts the fiat amount to sats
3. Requests an invoice from the endpoint
4. Validates the invoice amount approximately matches the calculated amount

This validation accounts for normal exchange rate disparities while protecting against unfavorable rates or excessive amounts.

## Use Cases

- Subscription services
- Content platform memberships
- Any service providing invoices via supported endpoints 
