import { Page } from '@playwright/test';
import { SideMenuComponent } from '../components/side-menu.components';

export class PulpitPage {
  constructor(private page: Page) {}

  sideMenu = new SideMenuComponent(this.page);

  transferReceiver = this.page.locator('#widget_1_transfer_receiver');
  transferAmount = this.page.locator('#widget_1_transfer_amount');
  transferTitle = this.page.locator('#widget_1_transfer_title');

  transferButton = this.page.getByRole('button', { name: 'wykonaj' });
  actionCloseButton = this.page.getByTestId('close-button');

  messageText = this.page.locator('#show_messages');

  topUpReceiverInput = this.page.locator('#widget_1_topup_receiver');
  topUpAmount = this.page.locator('#widget_1_topup_amount');
  topUpAgreementCheckbox = this.page.locator(
    '#uniform-widget_1_topup_agreement span',
  );
  topUpExecuteButton = this.page.getByRole('button', {
    name: 'doładuj telefon',
  });

  moneyValueText = this.page.locator('#money_value');

  userNameText = this.page.getByTestId('user-name');

  async executeQuickPayment(
    receiverId: string,
    transferAmount: string,
    transferTitle: string,
  ): Promise<void> {
    await this.transferReceiver.selectOption(receiverId);
    await this.transferAmount.fill(transferAmount);
    await this.transferTitle.fill(transferTitle);
    await this.transferButton.click();
    await this.actionCloseButton.click();
  }

  async executeMobileTopUp(
    topUpReceiver: string,
    topUpAmount: string,
  ): Promise<void> {
    await this.topUpReceiverInput.selectOption(topUpReceiver);
    await this.topUpAmount.fill(topUpAmount);
    await this.topUpAgreementCheckbox.click();
    await this.topUpExecuteButton.click();
    await this.actionCloseButton.click();
  }
}
