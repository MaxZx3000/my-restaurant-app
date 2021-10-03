import 'regenerator-runtime';
import './web-components/core/header.js';
import './web-components/core/footer.js';
import '../styles/home-page.sass';
import '../styles/detail-page.sass';
import '../styles/favorite-page.sass';
import '../styles/header.sass';
import '../styles/footer.sass';
import '../styles/main.sass';
import '../styles/restaurant.sass';
import '../styles/loading.sass';
import '../styles/not_found-page.sass';
import '../styles/no_data-element.sass';
import '../styles/font-config.sass';
import '../styles/material-font.sass';
import '../styles/like_restaurant-element.sass';
import BodyController from './controller/body-controller.js';
import WindowController from './controller/window-controller.js';
import RouteManager from './globals/routes.js';
import ServiceWorkerInitializer from './utils/sw-init.js';

const defineBodyPage = () => {
  const bodyElement = document.querySelector('main');
  const nodeName = WindowController.getWindowURLBeforeQuery();
  BodyController.setBodyElement(bodyElement);
  BodyController.changeBodyContentByNewNode(RouteManager.getPage(nodeName));
};

window.addEventListener('hashchange', async (event) => {
  if (WindowController.getWindowHashParts() !== 'main-page') {
    defineBodyPage();
  }
});

window.addEventListener('DOMContentLoaded', async () => {
  ServiceWorkerInitializer.initialize();
  defineBodyPage();
});
