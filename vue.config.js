module.exports = {
  transpileDependencies: [
    'vuetify',
  ],

  pluginOptions: {
    i18n: {
      locale: 'jp',
      fallbackLocale: 'jp',
      localeDir: 'locales',
      enableInSFC: true,
    },
  },

  devServer: {
    hot: true,
    open: true,
  },
};
