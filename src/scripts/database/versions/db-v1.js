import CONFIG from '../../globals/config.js';
import DatabaseVersioningInterface from './db-versioning.js';

class DBV1 extends DatabaseVersioningInterface {
  constructor() {
    super();
  }
  setVersioning(database) {
    const restaurantObjectStore = database.createObjectStore(CONFIG.OBJECT_STORE_NAME, {keyPath: 'id'});
    restaurantObjectStore.createIndex('name', 'name', {unique: true});
  }
}
export default DBV1;
