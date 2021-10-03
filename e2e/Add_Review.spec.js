const {Formatter} = require('./formatter/formatter');
const {ScenarioTemplate} = require('./template/scenarioTemplate');

Feature('Add Review to Restaurant');

Before(({I}) => {
  I.amOnPage('/');
});

Scenario('Show empty name message with no reviewer name', async ({I}) => {
  const reviewerName = '   ';
  const randomText = Formatter.getRandomText({
    min: 1,
    max: 1000,
    randomLetterLength: 5,
  });
  const expectedMessage = 'Name is still empty!';
  const review = `This restaurant is very good! ${randomText}`;
  await ScenarioTemplate.getRestaurantNameAt(I, 1);
  ScenarioTemplate.performReview(I, reviewerName, review);
  ScenarioTemplate.checkForErrorMessage(I, expectedMessage);
});

Scenario('Show empty review message with no review', async ({I}) => {
  const randomText = Formatter.getRandomText({
    min: 1,
    max: 1000,
    randomLetterLength: 5,
  });
  const reviewerName = `E2E Testing User ${randomText}`;
  const expectedMessage = 'Review is still empty!';
  const review = `    `;
  await ScenarioTemplate.getRestaurantNameAt(I, 1);
  ScenarioTemplate.performReview(I, reviewerName, review);
  ScenarioTemplate.checkForErrorMessage(I, expectedMessage);
});

Scenario('Add a restaurant review', async ({I}) => {
  const randomText = Formatter.getRandomText({
    min: 1,
    max: 9,
    randomLetterLength: 5,
  });
  const reviewerName = `E2E Testing User ${randomText}`;
  const review = `Sample Restaurant Review ${randomText}`;
  await ScenarioTemplate.getRestaurantNameAt(I, 1);
  ScenarioTemplate.performReview(I, reviewerName, review);
  I.wait(8);
  await ScenarioTemplate.checkCustomerReviewElements({
    I: I,
    expectedReview: review,
    expectedReviewerName: reviewerName,
  });
});
