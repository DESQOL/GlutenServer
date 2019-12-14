import App from './app';

// tslint:disable-next-line: no-floating-promises
(async (): Promise<void> => {
    const app = new App();
    await app.listen();
})();
