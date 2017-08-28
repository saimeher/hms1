import { HMSPage } from './app.po';

describe('hms App', () => {
  let page: HMSPage;

  beforeEach(() => {
    page = new HMSPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
