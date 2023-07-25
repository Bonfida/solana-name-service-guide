# Sign-in With SNS (SIWSNS)

Sign-in With Solana Name Service (SIWSNS) is an authentication plugin that allows users to easily sign in to websites and applications using their Solana wallet. It utilizes Solana's blockchain and public key cryptography to provide a secure and fast identity verification and login solution. By integrating SIWSNS into your Auth0 configuration, you can enable wallet-based login for your applications, allowing users to sign in seamlessly using just their Solana wallet account. The user's domain name acts as their identity, removing the need for separate usernames and passwords. SIWSNS streamlines the login process for Solana wallet holders while also providing the security and user management benefits of Auth0.

## Prerequisites

1. An Auth0 account and tenant. [Sign up for free](https://auth0.com/signup).
2. A registered app on SIWSNS

## Set up SIWSNS

To set up SIWSNS you need to obtain a Client ID and secret, this can be done with a simple cURL command:

```
curl -X POST https://siwsns.bonfida.com/register -d '{"redirectUris":["https://YOUR_AUTH0_DOMAIN/login/callback"]}'
```

## Add the Connection

1. Select **Add Integration** (at the top of this page).
1. Read the necessary access requirements, and select **Continue**.
1. Configure the integration using the following fields:
   - Client ID: Public unique identifier for this application obtained when you registered your app.
   - Client secret: Secret for this application obtained when you registered your app.
1. Select the **Permissions** needed for your applications.
1. Choose and configure whether to sync user profile attributes at each login.
1. Select **Create**.
1. In the **Applications** view, choose the Applications that should use this Connection to log in.

## Test connection

You're ready to [test this Connection](https://auth0.com/docs/authenticate/identity-providers/test-connections).

## Examples

- Github: [https://github.com/Bonfida/auth0-sns-example](https://github.com/Bonfida/auth0-sns-example)
- Website: [https://auth0-sns-example.vercel.app/](https://auth0-sns-example.vercel.app/)
