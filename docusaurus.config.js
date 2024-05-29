// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Shock Docs',
  tagline: 'Guides and information for ShockWallet, Lightning.Video, Lightning.Pub, and Sanctum Auth', 
  favicon: 'img/logo.png',

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
      // Replace with your project's social card
      image: 'img/docusaurus-social-card.jpg',
      navbar: {
        title: 'SHOCKNET',
        logo: {
          alt: 'Shocknet Logo',
          src: 'img/logo.png',
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
            label: 'ShockWallet',
          },
          {
            type: 'doc',
            docId: 'pub/intro',
            position: 'left',
            label: 'Lightning.Pub',
          },
          {
            type: 'doc',
            docId: 'video/intro',
            position: 'left',
            label: 'Lightning.Video',
          },
          {
            type: 'doc',
            docId: 'sanctum/intro',
            position: 'left',
            label: 'Sanctum',
          },
          {
            href: 'https://github.com/shocknet',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Terms',
                to: '/docs/terms',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Telegram',
                href: 'https://t.me/shockbtc',
              },
              {
                label: 'Lightning Video',
                href: 'https://lightning.video/thecto',
              },
              {
                label: 'Twitter',
                href: 'https://twitter.com/shockbtc',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'Blog',
                to: '/blog',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/shocknet/',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Shock Network, Inc. Built with Docusaurus.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;
