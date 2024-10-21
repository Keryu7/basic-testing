import {
  BankAccount,
  getBankAccount,
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
} from '.';

describe('BankAccount', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should create account with initial balance', () => {
    const initial = 100;
    const account: BankAccount = getBankAccount(initial);
    const balance = account.getBalance();

    expect(account).toBeInstanceOf(BankAccount);
    expect(balance).toBe(initial);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const initial = 100;
    const toWithdraw = 150;
    const account: BankAccount = getBankAccount(initial);

    expect(() => account.withdraw(toWithdraw)).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    const initial = 100;
    const transferSum = 150;
    const accountFrom: BankAccount = getBankAccount(initial);
    const accountTo: BankAccount = getBankAccount(initial);

    expect(() => accountFrom.transfer(transferSum, accountTo)).toThrow(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring to the same account', () => {
    const initial = 100;
    const transferSum = 50;
    const account: BankAccount = getBankAccount(initial);

    expect(() => account.transfer(transferSum, account)).toThrow(
      TransferFailedError,
    );
  });

  test('should deposit money', () => {
    const initial = 100;
    const depositSum = 10;
    const account: BankAccount = getBankAccount(initial);
    const deposit = account.deposit(depositSum);

    expect(deposit.getBalance()).toBe(initial + depositSum);
  });

  test('should withdraw money', () => {
    const initial = 100;
    const withdrawSum = 10;
    const account: BankAccount = getBankAccount(initial);
    const withdraw = account.withdraw(withdrawSum);

    expect(withdraw.getBalance()).toBe(initial - withdrawSum);
  });

  test('should transfer money', () => {
    const initial = 100;
    const transferSum = 50;
    const accountFrom: BankAccount = getBankAccount(initial);
    const accountTo: BankAccount = getBankAccount(initial);
    accountFrom.transfer(transferSum, accountTo);

    expect(accountFrom.getBalance()).toBe(initial - transferSum);
    expect(accountTo.getBalance()).toBe(initial + transferSum);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const initial = 100;
    const account: BankAccount = getBankAccount(initial);
    const result: number | null = await account.fetchBalance();

    if (result) return expect(typeof result).toBe('number');
    expect(result).toBe(null);
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const initial = 100;
    const account: BankAccount = getBankAccount(initial);

    jest.spyOn(account, 'fetchBalance').mockResolvedValue(300);

    await account.synchronizeBalance();

    expect(() => account.getBalance()).not.toBe(initial);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const initial = 100;
    const account: BankAccount = getBankAccount(initial);

    jest.spyOn(account, 'fetchBalance').mockResolvedValue(null);

    await expect(async () => {
      await account.synchronizeBalance();
    }).rejects.toThrow(SynchronizationFailedError);
  });
});
