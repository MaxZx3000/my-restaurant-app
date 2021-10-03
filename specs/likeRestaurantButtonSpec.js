import RestaurantDBManager from '../src/scripts/database/restaurant-idb-manager';
import LikeButtonTemplateElementFactory from './helpers/likeButtonTemplateElementFactory';

const getLikeButtonTemplate = async (restaurant) => {
  const likeButtonElement = await LikeButtonTemplateElementFactory.getLikeButtonTemplateElement(
      RestaurantDBManager,
      restaurant,
  );
  return likeButtonElement;
};
const eraseContainerElementContent = (likeContainerRestaurantElement) => {
  likeContainerRestaurantElement.innerHTML = '';
  document.body.removeChild(likeContainerRestaurantElement);
};
describe('Like a restaurant', () => {
  let likeContainerRestaurantElement;
  beforeEach(() => {
    likeContainerRestaurantElement = LikeButtonTemplateElementFactory.getLikeContainerTemplateElement();
    document.body.appendChild(likeContainerRestaurantElement);
  });

  it('should show the like button when the restaurant had not been liked before', async () => {
    const likeButton = await getLikeButtonTemplate({id: 1});
    likeContainerRestaurantElement.appendChild(likeButton);
    const expectedElement = document.querySelector(`[aria-label = "Like Button"]`);
    expect(expectedElement).toBeTruthy();
  });
  it('should not show the like button when the restaurant had not been liked before', async () => {
    const likeButton = await getLikeButtonTemplate({id: 1});
    likeContainerRestaurantElement.appendChild(likeButton);
    const expectedElement = document.querySelector(`[aria-label = "Remove Like Button"]`);
    expect(expectedElement).toBeFalsy();
  });
  it('should not add the restaurant again after the restaurant had been saved', async () => {
    const likeButton = await getLikeButtonTemplate({id: 1});
    likeContainerRestaurantElement.appendChild(likeButton);
    await RestaurantDBManager.addRestaurant({id: 1});
    likeButton.dispatchEvent(new Event('click'));
    const expectedData = await RestaurantDBManager.getRestaurantById(1);
    expect(expectedData).toEqual({id: 1});
    await RestaurantDBManager.deleteRestaurantById(1);
  });
  it(`should not add restaurant data when there is no id`, async () => {
    const likeButton = await getLikeButtonTemplate({});
    likeContainerRestaurantElement.appendChild(likeButton);
    likeButton.dispatchEvent(new Event('click'));
    const expectedData = await RestaurantDBManager.getAllRestaurants();
    expect(expectedData.length).toEqual(0);
  });
  afterEach(() => {
    eraseContainerElementContent(likeContainerRestaurantElement);
  });
});

describe(`Dislike the restaurant`, () => {
  let likeRestaurantContainerElement;
  beforeEach(async () => {
    await RestaurantDBManager.addRestaurant({id: 1});
    likeRestaurantContainerElement = LikeButtonTemplateElementFactory.getLikeContainerTemplateElement();
    document.body.appendChild(likeRestaurantContainerElement);
  });
  afterEach(async () => {
    eraseContainerElementContent(likeRestaurantContainerElement);
    await RestaurantDBManager.deleteRestaurantById(1);
  });
  it('should show the remove like button when the restaurant had been liked before', async () => {
    const likeButton = await getLikeButtonTemplate({id: 1});
    likeRestaurantContainerElement.appendChild(likeButton);
    const expectedElement = document.querySelector(`[aria-label='Remove Like Button']`);
    expect(expectedElement).toBeTruthy();
  });
  it('should not display like restaurant button when the move had been liked before', async () => {
    const likeButton = await getLikeButtonTemplate({id: 1});
    likeRestaurantContainerElement.appendChild(likeButton);
    const expectedElement = document.querySelector(`[aria-label='Like Button']`);
    expect(expectedElement).toBeFalsy();
  });
  it('should be able to remove liked restaurant from the list', async () => {
    const likeButton = await getLikeButtonTemplate({id: 1});
    likeButton.dispatchEvent(new Event('click'));
    const expectedData = await RestaurantDBManager.getRestaurantById(1);
    expect(expectedData).toEqual({id: 1});
  });
  it('should not throw error if the restaurant is not in the list', async () => {
    const likeButton = await getLikeButtonTemplate({id: 1});
    await RestaurantDBManager.deleteRestaurantById(1);
    likeButton.dispatchEvent(new Event('click'));
    const expectedData = await RestaurantDBManager.getAllRestaurants();
    expect(expectedData).toEqual([]);
  });
});
