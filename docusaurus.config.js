// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Shock Docs',
  tagline: 'Guides and information for SHOCKWALLET, LIGHTNING.pub, LN.video, SANCTUM & CLINK', 
  favicon: '/favicon/favicon.png',

  // Set the production url of your site here
  url: 'https://docs.shock.network',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  //organizationName: 'facebook', // Usually your GitHub org/user name.
  //projectName: 'docusaurus', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: '/',
          sidebarPath: './sidebars.js',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/shocknet/docs/tree/main',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },

      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({

   colorMode: {
    defaultMode:              'dark',
    disableSwitch:            false,   // keep the toggle visible
    respectPrefersColorScheme: true,   // honor OS dark/light preference
  },

      // Replace with your project's social card
      image: 'img/docusaurus-social-card.jpg',
      navbar: {
        title: 'DOCS → ',
        logo: {
          alt: 'SHOCKNET Logo',
          src: '/logos/Light/SHOCKNET/SHOCKNET.png',
          srcDark: '/logos/Dark/SHOCKNET/SHOCKNET.png',
        },
        items: [
                    {
            type: 'doc',
            docId: 'about',
            position: 'left',
            label: 'About',
          },
          {
            type: 'doc',
            docId: 'wallet/intro',
            position: 'left',
            label: 'SHOCKWALLET',
          },
          {
            type: 'doc',
            docId: 'pub/intro',
            position: 'left',
            label: 'LIGHTNING.pub',
          },
          {
            type: 'doc',
            docId: 'video/intro',
            position: 'left',
            label: 'LN.video',
          },
          {
            type: 'doc',
            docId: 'sanctum/intro',
            position: 'left',
            label: 'SANCTUM',
          },
          {
            href: 'https://t.me/shockbtc',
            label: 'T',
            position: 'right',
          },
          {
            href: 'https://njump.to/nprofile1qqsrx9hrd9k7wnfejkgj0wwcgt0400wut5w8479qfudu0tkcpdz9pzqfwq5xw',
            label: 'N',
            position: 'right',
          },
          {
            href: 'https://github.com/shocknet',
            label: 'G',
            position: 'right',
          },
          {
            href: 'https://x.com/shockbtc',
            label: 'X',
            position: 'right',
          },
        ],
      },

footer: {
  links: [
    {
      title: 'Products',
      items: [
        { label: 'SHOCKWALLET', href: 'https://shockwallet.app' },
        { label: 'LIGHTNING.pub', href: 'https://lightning.pub' },
        { label: 'LN.video', href: 'https://lightning.video' },
        { label: 'SANCTUM', href: 'https://sanctum.app' },
        { label: 'CLINK', href: 'https://clink.cool' },
      ],
    },
    {
      title: 'Resources',
      items: [
        { label: 'Telegram', href: 'https://t.me/shockbtc' },
        { label: 'Nostr', href: 'https://njump.to/nprofile1qqsrx9hrd9k7wnfejkgj0wwcgt0400wut5w8479qfudu0tkcpdz9pzqfwq5xw' },
        { label: 'GitHub', href: 'https://github.com/SHOCKNET' },
        { label: 'X', href: 'https://x.com/shockbtc' },
      ],
    },
  ],
  copyright: `<small><code> · © ${new Date().getFullYear()} SHOCKNET · All rights reserved · </code></small>`,
},
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;
