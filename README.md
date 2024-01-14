# LunarLoom User Service

The LunarLoom User Service is responsible for managing user data within the LunarLoom microservice chat application. It utilizes NodeJS, express, mongodb to securely handle our users in lunarloom chat app

## Table of Contents

- [Technologies Used](#technologies-used)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Technologies Used

- Node JS
- Express
- MongoDB

## API DOCUMENTATION

- ### User Management:

- #### Create User

```bash
POST  /:key/create-user
```

Body:

```json
{
  "userId": "<user-id>",
  "username": "<username>"
}
```

Response:

```json
{
  "success": true,
  "message": "User created Successfully"
}
```

- #### Get User

```bash
GET /user/:userId
```

    Response

```json
{
  "success": true,
  "user": {
    "userId": "<user-id>",
    "username": "<username>"
    // ...other user properties
  }
}
```

- #### Delete User

```bash
DELETE /:key/user/:userId
```

Response:

```json
{
  "success": true,
  "message": "User deleted Successfully"
}
```

- ### Blocking Users:

- #### Block User

```bash
PATCH /block-user
```

Body:

```json
{
  "userId": "<user-id>",
  "blockedUserId": "<blocked-user-id>"
}
```

Response:

```json
{
  "success": true,
  "message": "Blocked User Successfully"
}
```

- #### Unblock User

```bash
PATCH /unblock-user
```

Body:

```json
{
  "userId": "<user-id>",
  "blockUserId": "<blocked-user-id>"
}
```

Response:

```json
{
  "success": true,
  "message": "Unblocked user Successfully"
}
```

- ### Friend Management:

- Add Friend

```bash
PATCH /add-friend
```

Body:

```json
{
  "userId": "<user-id>",
  "friendId": "<friend-id>"
}
```

Response:

```json
{
  "success": true,
  "message": "Friend added successfully"
}
```

- #### Get Friends

```bash
GET /friends/:userId
```

Response:

```json
{
  "success": true,
  "friends": [
    { "userId": "<friend-id-1>", "username": "<friend-username-1>" }
    // ...other friends
  ]
}
```

- #### Remove Friend

```bash
PATCH /remove-friend
```

Body:

```json
{
  "userId": "<user-id>",
  "friendId": "<friend-id>"
}
```

Response:

```json
{
  "success": true,
  "message": "Friend removed Successfully"
}
```

Error Handling:

```js
All endpoints return a JSON object with success: false and a message describing the error in case of failures.
Common error codes:
400: Bad Request
401: Unauthorized
404: Not Found
422: Unprocessable Entity
500: Internal Server Error
```

## Usage

Once the authentication service is running locally, it provides endpoints for add user, remove user, edit user profiles , add friend etc...  
Use these endpoints to controll users in services within the LunarLoom application.

## Contributing

Contributions are welcome! To contribute to this project:

1. Fork the project
2. Clone the fork

   ```git
   git clone https://github.com/<your-username>/LunarLoom-user-service
   ```

3. Add Upstream

   ```git
   git remote add upstream https://github.com/LoomingLunar/LunarLoom-user-service
   ```

4. Craete a new branch

   ```git
   git checkout -b feature
   ```

5. Make your changse
6. Commit your changes

   ```git
   git commit -am "Add new feature"
   ```

7. Update main

   ```git
   git checkout main
   git pull upstream main
   ```

8. Rebase to main

   ```git
   git checkout feature
   git rebase main
   ```

   if there is any conflict you need to fix it.

9. Push to the branch

   ```git
   git push origin feature
   ```

10. Create new Pull Request

## LICENSE

LunarLoom Auth Service - Auth Service for LunarLoom End To End Encrypted Chat App.

Copyright © 2023 LunarLoom

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program. If not, see <https://www.gnu.org/licenses/>.

[GPLv3](LICENSE)
