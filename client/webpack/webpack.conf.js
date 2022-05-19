module.exports = {
  path: {
    prodPath: '../dist',
    srcPath: 'src',
  },
  html: {
    /**
     * Configuration
     */
    inject: false,
    template: '/src/index.html',
    filename: 'index.html', // dist filename, can use test.html, assets/admin.html, etc...
    /**
     * Options
     */
    title: 'Front-end boilerplate',
    lang: 'fr',
  },
};
