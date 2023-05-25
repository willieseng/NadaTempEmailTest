import { Page, expect } from '@playwright/test';

export default class NadaTempEmailSteps {
  private page: Page;

  constructor(page) {
    this.page = page;
  }

  async givenINavigateToGetNadaPage() {
    await this.page.goto("https://getnada.com/#pablo");
  }

  async whenIClickAddInboxButton() {
    await this.page.getByRole('button', { name: 'Add inboxe' }).click();
  }

  async whenIEnterUserText(user: string): Promise<void> {
    await this.page.locator('#grid-first-name').fill(user);
  }

  async whenISelectDomainName(domainName: string): Promise<void> {
    await this.page.locator('select').selectOption(domainName);
  }

  async whenIClickAddNowButton(): Promise<void> {
    await this.page.getByRole('button', { name: 'Add now!' }).click();
  }

  async thenIExpectEmailIsSuccessfullyCreateInMyInbox(email: string): Promise<void> {
    const listValues = await this.page.$$eval('ul li.inline-flex', (listItems) =>
      listItems.map((item) => item.textContent?.trim())
    );
    expect(listValues).toContain(email);
  }

  async thenIExpectEmailIsHighlighted(email: string): Promise<void> {
    const highlightedEmail = this.page.getByRole('button', { name: email });
    expect(highlightedEmail).toBeVisible();
  }

  async thenIExpectWaitingIncomingEmailMessage(email: string): Promise<void> {
    const waitingText = await this.page.$eval('p.p-3', (p) => p.textContent);
    expect(waitingText).toContain(email);
  }
}