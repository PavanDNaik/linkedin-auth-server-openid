# linkedin-auth-server-openid

`linkedin-auth-server-openid` is a Node.js library designed for server-side integration with LinkedIn's OAuth 2.0 authentication process. It allows you to retrieve user data from LinkedIn once you receive the authorization code from the client side.

This library complements the client-side package [`react-linkedin-login-openid`](https://www.npmjs.com/package/react-linkedin-login-openid), which provides a React component for LinkedIn login and sending the authorization code to your server.

## Features

- Simple server-side integration for LinkedIn OpenID Connect.
- Fetch user data using LinkedIn's API.
- Designed to work seamlessly with `react-linkedin-login-openid`.

## Installation

```bash
npm install linkedin-auth-server-openid
```

## Usage

### Import and Initialize
Import the `Linkedin` class from the package and create an instance by providing your LinkedIn app credentials and redirect URI.

```javascript
import Linkedin from "linkedin-auth-server-openid";

const linkedin = new Linkedin(
  "your-client-id", // LinkedIn app client ID
  "your-client-secret", // LinkedIn app client secret
  "http://localhost:5173/linked_in_auth_resp" // Redirect URI
);
```

### API Integration
Use the `getData` method to retrieve user data from LinkedIn. This method requires the authorization code, which you can receive in the request body from the client side.

```javascript
app.post("/login", async (req, res) => {
  try {
    const authCode = req.body.code; // Authorization code from client
    const { success, userData } = await linkedin.getData(authCode);
    if (success) {
      res.json(userData); // Send the user data back to the client
    } else {
      res.status(400).json({ error: "Failed to fetch user data" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});
```

### Example
Here's a complete example of setting up a server with Express:

```javascript
import express from "express";
import bodyParser from "body-parser";
import Linkedin from "linkedin-auth-server-openid";

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

const linkedin = new Linkedin(
  "your-client-id",
  "your-client-secret",
  "http://localhost:5173/linked_in_auth_resp"
);

app.post("/login", async (req, res) => {
  try {
    const authCode = req.body.code;
    const { success, userData } = await linkedin.getData(authCode);
    if (success) {
      // Example: Save userData to the database
      // await database.saveUser(userData);
      res.json(userData);
    } else {
      res.status(400).json({ error: "Failed to fetch user data" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
```

## Parameters

### `Linkedin` Constructor

| Parameter        | Type   | Description                                     |
|------------------|--------|-------------------------------------------------|
| `client_id`      | string | Your LinkedIn app's client ID.                 |
| `client_secret`  | string | Your LinkedIn app's client secret.             |
| `redirect_uri`   | string | The redirect URI configured in your LinkedIn app settings. |

### `getData(authCode)`
- **`authCode`** (string): The authorization code received from the client-side login flow.
- **Returns**: A promise that resolves with an object:
  ```javascript
  {
    success: boolean,
    userData?: any
  }
  ```

## Client-Side Integration
To implement the client-side login flow, refer to the [`react-linkedin-login-openid`](https://www.npmjs.com/package/react-linkedin-login-openid) package. This package provides a React component for LinkedIn login and the ability to send the authorization code to your server.

## Notes
- Ensure your LinkedIn app is properly configured with the correct redirect URI.
- Use HTTPS in production for secure communication.

## License
This package is open-source and available under the MIT License.

---

Contributions and feedback are welcome! If you encounter any issues, feel free to open an issue or submit a pull request.

