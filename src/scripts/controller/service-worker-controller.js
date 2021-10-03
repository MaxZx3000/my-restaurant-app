import CONFIG from '../globals/config.js';

class _ServiceWorkerController {
  constructor() {
    if (_ServiceWorkerController.instance == null) {
      _ServiceWorkerController.instance = this;
    }
    return _ServiceWorkerController.instance;
  }
  async cachingAppShell(requests) {
    const cache = await this.openCache();
    cache.addAll(requests);
  }
  async deleteOldCache() {
    const cacheNames = await caches.keys();
    cacheNames
        .filter((name) => name !== CONFIG.CACHE_NAME)
        .map((filteredName) => caches.delete(filteredName));
  }
  async fetchRequest(event) {
    const request = event.request;
    try {
      const response = await fetch(request);
      await this._addCache(request);
      return response;
    } catch (e) {
      const response = await caches.match(request);
      return response;
    }
  }
  async _addCache(request) {
    const cache = await this.openCache();
    cache.add(request);
  }
  async openCache() {
    return caches.open(CONFIG.CACHE_NAME);
  }
}
const ServiceWorkerController = new _ServiceWorkerController();
Object.freeze(ServiceWorkerController);
export default ServiceWorkerController;
