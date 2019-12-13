import App from './app';

// tslint:disable-next-line: no-floating-promises
(async () => {
  const app = new App();
  await app.listen();
})();
