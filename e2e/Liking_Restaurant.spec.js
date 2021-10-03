const {ScenarioTemplate} = require('./template/scenarioTemplate.js');
Feature('Liking Restaurant');

Before(({I}) => {
  I.amOnPage('/');
});

Scenario('Like and unlike a restaurant', async ({I}) => {
  const restaurantTitle = await ScenarioTemplate.getRestaurantNameAt(I);
  ScenarioTemplate.saveToFavorites(I);
  ScenarioTemplate.goToFavoritePage(I);
  I.see(restaurantTitle, 'restaurant_card-element h2');
  await ScenarioTemplate.getRestaurantNameAt(I);
  ScenarioTemplate.removeFromFavorites(I);
  ScenarioTemplate.goToFavoritePage(I);
  ScenarioTemplate.checkNoDataElement(I, `You haven't had any favorites yet!`);
});
