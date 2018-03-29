export const CurrentAction = data => ({
    type: "CURRENT_ACTION",
    payload: {
      data
    }
  });

export const CashAction = () => ({
  type: "CASH_ACTION"
});

export const BilledAction = () => ({
  type: "Billed_ACTION"
});

export const WalletAction = () => ({
  type: "Wallet_ACTION"
});