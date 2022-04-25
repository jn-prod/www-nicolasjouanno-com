const createApp = (): void => {
  const app = document.createElement('div');
  app.id = 'app';
  document.body.appendChild(app);
};

export default createApp;
