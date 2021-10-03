import runtime from 'serviceworker-webpack-plugin/lib/runtime';

class _ServiceWorkerInitializer {
  constructor() {
    if (_ServiceWorkerInitializer.instance == null) {
      _ServiceWorkerInitializer.instance = this;
    }
    return _ServiceWorkerInitializer.instance;
  }
  async initialize() {
    if ('serviceWorker' in navigator) {
      console.log('Service worker is running!');
      await runtime.register();
      return;
    }
    console.warn('Service worker is not supported on this browser!');
  }
}
const ServiceWorkerInitializer = new _ServiceWorkerInitializer();
Object.freeze(ServiceWorkerInitializer);
export default ServiceWorkerInitializer;
