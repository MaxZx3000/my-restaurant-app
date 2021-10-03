import {openDB} from 'idb';
import CONFIG from '../globals/config.js';
import RestaurantDataOperations from '../data/restaurant-data-operations.js';
import DBV1 from './versions/db-v1.js';

class _RestaurantDBManager extends RestaurantDataOperations {
  constructor() {
    super();
    if (_RestaurantDBManager.instance == null) {
      this.dbVersioning = [new DBV1()];
      this._initializeDB();
      _RestaurantDBManager.instance = this;
    }
    return _RestaurantDBManager.instance;
  }
  _initializeDB() {
    const currentDatabaseVersion = CONFIG.DATABASE_VERSION;
    const dbVersioning = this.dbVersioning;
    const databaseName = CONFIG.DATABASE_NAME;
    this.dbPromise = openDB(databaseName, currentDatabaseVersion, {
      upgrade(database) {
        dbVersioning[currentDatabaseVersion-1].setVersioning(database);
      },
    });
  }
  async getAllRestaurants() {
    return (await this.dbPromise).getAll(CONFIG.OBJECT_STORE_NAME);
  }
  async getRestaurantById(id) {
    return (await this.dbPromise).get(CONFIG.OBJECT_STORE_NAME, id);
  }
  async getRestaurantByName(name) {
    const trimmedName = name.trim();
    const result = (await this.dbPromise).getAll(CONFIG.OBJECT_STORE_NAME);
    return (await result).filter((data) => {
      const name = data.name;
      return name.includes(trimmedName);
    });
  }
  async addRestaurant(restaurant) {
    return (await this.dbPromise).put(CONFIG.OBJECT_STORE_NAME, restaurant);
  }
  async deleteRestaurantById(id) {
    return (await this.dbPromise).delete(CONFIG.OBJECT_STORE_NAME, id);
  }
}

const RestaurantDBManager = new _RestaurantDBManager();
export default RestaurantDBManager;
