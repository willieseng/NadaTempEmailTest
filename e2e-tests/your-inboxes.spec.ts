import { test } from '@playwright/test';
import NadaTempEmailSteps from './steps/nada-temp-email.steps';

test.describe('NADA Temp Mail End to End Tests', () => {
  let nadaTempEmailSteps :NadaTempEmailSteps;

  test.beforeEach(async ({ page }) => {
    nadaTempEmailSteps = new NadaTempEmailSteps(page);
  });

  test('Should success add temp email at NADA', async () => {
    const currentDate = new Date();

    // Get month with format YYYYMMDD_HHMMSS
    const currentDateTime = {
      year: currentDate.getFullYear(),
      month: (currentDate.getMonth() + 1).toString().padStart(2, '0'),
      day: currentDate.getDay().toString().padStart(2, '0'),
      hour: currentDate.getHours().toString().padStart(2, '0'),
      minute: currentDate.getMinutes().toString().padStart(2, '0'),
      second: currentDate.getSeconds().toString().padStart(2, '0')
    };

    const formattedDateTime = `${currentDateTime.year}${currentDateTime.month}${currentDateTime.day}_${currentDateTime.hour}${currentDateTime.minute}${currentDateTime.second}`;
    const user = `test_${formattedDateTime}`;
    const domain = 'getnada.com';
    const expectedEmail = `${user}@${domain}`;

    await nadaTempEmailSteps.givenINavigateToGetNadaPage();
    await nadaTempEmailSteps.whenIClickAddInboxButton();
    await nadaTempEmailSteps.whenIEnterUserText(user);
    await nadaTempEmailSteps.whenISelectDomainName(domain);
    await nadaTempEmailSteps.whenIClickAddNowButton();
    await nadaTempEmailSteps.thenIExpectEmailIsSuccessfullyCreateInMyInbox(expectedEmail);
    await nadaTempEmailSteps.thenIExpectEmailIsHighlighted(expectedEmail);
    await nadaTempEmailSteps.thenIExpectWaitingIncomingEmailMessage(expectedEmail);
  });
});