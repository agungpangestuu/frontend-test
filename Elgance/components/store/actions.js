export const LoginAction = data => ({
  type: "LOGIN_ACTION",
  payload: {
    data
  }
});

export const SignupAction = (data) => ({
type: "SIGNUP_ACTION",
payload: {
  data
}
});

export const BilledAction = () => ({
type: "Billed_ACTION"
});

export const WalletAction = () => ({
type: "Wallet_ACTION"
});