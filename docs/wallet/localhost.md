## Build from source
Clone the repo and install

```bash
git clone https://github.com/shocknet/wallet2
cd wallet2 && npm i
npm install -g @ionic/cli native-run cordova-res
cp .env.production.example .env
```
* `nano .env` to customize

### Self-Hosting the PWA

Run dev server

- `npm run dev`

or, build for production as static files

- `npm run build:web`

Example Caddy configuration for serving:
```caddy
your-domain.com {
    encode zstd gzip

    handle {
        root * /path/to/your/wallet2/dist
        try_files {path} /index.html
        file_server
    }

    header {
        # Prevent clickjacking
        X-Frame-Options "SAMEORIGIN"
        Content-Security-Policy "frame-ancestors 'self'"
    }
}
```

### Build for Android

- `npm run build:android`

### iOS

- `npm run build:ios`

