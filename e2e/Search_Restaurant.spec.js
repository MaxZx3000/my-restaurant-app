const {ScenarioTemplate} = require('./template/scenarioTemplate');

Feature('Search Restaurant');

Before(({I}) => {
  I.amOnPage('/');
});

const favoriteSearchRestaurant = async (I) => {
  const delayTime = 5;
  const searchKeyword = 'Kafe';
  const favoriteKeyword = 'Kita';
  const likeRestaurant = async (I, index) => {
    ScenarioTemplate.performSearch(I, searchKeyword);
    I.waitForElement('restaurant_card-element', delayTime);
    await ScenarioTemplate.getRestaurantNameAt(I, index);
    ScenarioTemplate.saveToFavorites(I);
    ScenarioTemplate.goToHomePage(I);
  };
  const compareRestaurant = async (I, index) => {
    I.see(favoriteKeyword, locate('restaurant_card-element .restaurant-title').at(index));
  };
  ScenarioTemplate.performSearch(I, searchKeyword);
  I.waitForElement('restaurant_card-element', delayTime);
  await ScenarioTemplate.loopRestaurantElements(I, likeRestaurant);
  ScenarioTemplate.goToFavoritePage(I);
  ScenarioTemplate.performSearch(I, favoriteKeyword);
  await ScenarioTemplate.loopRestaurantElements(I, compareRestaurant);
};

Scenario('No Data Explore Restaurant', ({I}) => {
  const keyword = 'dfdsfdsfsdfdsfsdfdsfdsf';
  ScenarioTemplate.performSearch(I, keyword);
  ScenarioTemplate.checkNoDataElement(I,
      'Uh oh...Looks like we cannot find the restaurant you specified.');
});

Scenario('Explore Restaurant', async ({I}) => {
  const keyword = 'Kafe';
  const compareRestaurant = async (I, index) => {
    I.see(keyword, locate('restaurant_card-element .restaurant-title').at(index));
  };
  ScenarioTemplate.performSearch(I, keyword);
  await ScenarioTemplate.loopRestaurantElements(I, compareRestaurant);
});

Scenario('Search Restaurant Favorite', async ({I}) => {
  await favoriteSearchRestaurant(I);
});

Scenario('No Data Search Restaurant Favorite', async ({I}) => {
  await favoriteSearchRestaurant(I);
  ScenarioTemplate.performSearch(I, 'dfdsfdsfdsfdsfds');
  ScenarioTemplate.checkNoDataElement(I, `You haven't had any favorites yet!`);
});
