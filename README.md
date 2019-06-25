# lifeGPA-BE




###

**Register a User**
_method url_: `/api/register`

_http method_: **[POST]**

#### Headers

| name           | type   | required | description              |
| -------------- | ------ | -------- | ------------------------ |
| `Content-Type` | String | Yes      | Must be application/json |

#### Body

| name         | type   | required | description    |
| ------------ | ------ | -------- | -------------- |
| `username`   | String | Yes      | Must be unique |
| `fullName`   | String | Yes      |                |
| `password`   | String | Yes      |                |
| `email`      | String | No       |                |
| `userImgUrl` | String | No       |                |

#### Example

```
  {
    "username": "zach",
    "password": "1234",
    "fullName": "zach christy",
    "email": "zchristy44@gmail.com",
    "userImgUrl": "image.jpg"
  }
```

#### Response

##### 201 (created)

###### Example Response

```
  {
    "id": 1,
    "message": {
      `${user.username}'s registration Successful`
    }
  }
```

##### 412 (Preconditon Failed)

```
  {
    "message": "One or more inputs missing... username, password, fullname, email"
  }
```

##### 500 (Preconditon Failed)

```
  {
    "message": "Error registering User."
  }
```



### **Login a user**

_method url_: `/api/login`

_http method_: **[POST]**

#### Headers

| name           | type   | required | description              |
| -------------- | ------ | -------- | ------------------------ |
| `Content-Type` | String | Yes      | Must be application/json |

#### Body

| name       | type   | required | description             |
| ---------- | ------ | -------- | ----------------------- |
| `username` | String | Yes      | must be registered user |
| `password` | String | Yes      |                         |

#### Example

```
  {
    "username": "zach",
    "password": "1234",
  }
```

#### Response

##### 200 (ok)

> no issues logging in

###### Example response

```
{
    "message": "Welcome zach!",
    "user": {
        "id": 1,
        "username": "zach",
        "fullname": "zach christy",
        "password": "$2a$10$FgVIlOhlJnMfdyLwIPYum.I.5zPhREG1TXoj.1X7cJCpzyxXWaHBS",
        "email": "zchristy44@gmail.com",
        "userImgUrl": "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0IjoxLCJpYXQiOjE1NjE0NDUzNzgsImV4cCI6MTU2MTUzMTc3OH0.HzvwyVYEVu1ZtReiG0KL1g0n8sAQKkPwuqzaIARbJ40"
}
```

##### 405 (Method Not Allowed)

```
  {
    message: "Missing field content, please try again"
  }
```

##### 401 (UnAuthorized)

```
{
  message: 'User credentials invalid, please register...'
}
```

##### 400 (Bad Request)

```
{
  message: "Error Loging in User"
}
```



### **Get all Users**

_method url_: `/api/users`

_http method_: **[GET]**

#### Response

##### 200 (ok)

###### Example response

```
[
  {
      "id": 1,
      "username": "zach",
      "fullname": "zach christy",
      "password": "$2a$10$FgVIlOhlJnMfdyLwIPYum.I.5zPhREG1TXoj.1X7cJCpzyxXWaHBS",
      "email": "zchristy44@gmail.com",
      "userImgUrl": "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
  },
  {
      "id": 2,
      "username": "Ricky",
      "fullname": "Ricky Bobby",
      "password": "$2a$10$FgVIlOhlJnMfdyLwIPYum.I.5zPhREG1TXoj.1X7cJCpzyxXWaHBS",
      "email": "Ricky@bobby.com",
      "userImgUrl": "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
  },
]
```



### **Get a single User**

_method url_: `/api/users/:id`

_http method_: **[GET]**

#### Response

##### 200 (ok)

###### Example response

```
[
  {
      "id": 1,
      "username": "zach",
      "fullname": "zach christy",
      "password": "$2a$10$FgVIlOhlJnMfdyLwIPYum.I.5zPhREG1TXoj.1X7cJCpzyxXWaHBS",
      "email": "zchristy44@gmail.com",
      "userImgUrl": "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
  }
]
```

**/--------------------------------------------/ CREATE CATEGORY /-----------------------------------/**

### **Create a Category**

**You can create a category of the logged in user without hard coding the userId**

_method url_: `/api/categories`

_http method_: **[POST]**

#### Headers

| name            | type   | required | description              |
| --------------- | ------ | -------- | ------------------------ |
| `Content-Type`  | String | Yes      | Must be application/json |
| `authorization` | String | Yes      | token to Authorize user  |

#### Body

| name            | type    | required | description                                         |
| --------------- | ------- | -------- | --------------------------------------------------- |
| `categoryTitle` | String  | Yes      |                                                     |
| `color`         | String  | Yes      |                                                     |
| `userId`        | Integer | Yes      | No need to assign! Derived from user making request |

#### Example

```
  {
    "categoryTitle": "Fitness",
    "color": "green",
    "userId": 1,
  }
```

#### Response

##### 201 (created)

###### Example Response

```
 {
    "id": 4,
    "categoryTitle": "Fitness",
    "color": "green",
    "userId": 1
  },
```

##### 404 (Not Found)

###### Example Response

```
{
  message: "missing Category information"
}
```

##### 428 (Precondition Required)

###### Example Response

```
{
  message: "missing required field"
}
```

##### 500 (Server Error)

###### Example Response

```
{
  message: "Error could not post category"
}
```



### **Get Categories**

**This will only display habits of the logged in user without making an extra :id query**

_method url_: `/api/categories`

_http method_: **[GET]**

#### Headers

| name            | type   | required | description              |
| --------------- | ------ | -------- | ------------------------ |
| `Content-Type`  | String | Yes      | Must be application/json |
| `authorization` | String | Yes      | token to Authorize user  |

#### Response

##### 200 (ok)

###### Example response

```
{
    "id": 2,
    "categoryTitle": "Crossfit Training",
    "color": "red",
    "userId": 1
}
```

##### 401 (UnAuthorized)

###### Example Response

```
  {
    message: 'No token provided, must be set on the Authorization Header'
  }
```

##### 500 (Server Error)

###### Example Response

```
{
  message: "Error finding Categories"
}
```



### **Create a Habit**

_method url_: `/api/habits`

_http method_: **[POST]**

#### Headers

| name            | type   | required | description              |
| --------------- | ------ | -------- | ------------------------ |
| `Content-Type`  | String | Yes      | Must be application/json |
| `authorization` | String | Yes      | token to Authorize user  |

#### Body

| name               | type    | required | description                                         |
| ------------------ | ------- | -------- | --------------------------------------------------- |
| `habitTitle`       | String  | Yes      |                                                     |
| `categoryId`       | Integer | Yes      |                                                     |
| `userId`           | Integer | Yes      | No need to assign! Derived from user making request |
| `completed`        | Boolean | No       |                                                     |
| `completionPoints` | Integer | No       |                                                     |
| `created_at`       | String  | No       |                                                     |

#### Example

```
  {
    "habitTitle": "Run 10 miles",
    "categoryId": 1,
  }
```

#### Response

##### 201 (created)

###### Example Response

```
  {
    "id": 1,
    "habitTitle": "Run 10 miles",
    "completed": false,
    "completionPoints": 0,
    "userId": 2,
    "categoryId": 1,
    "created_at": "2019-03-13 20:47:27",
    "history": "x x x xxxx"
  }
```

##### 401 (UnAuthorized)

###### Example Response

```
  {
    message: 'No token provided, must be set on the Authorization Header'
  }
```

##### 404 (Not Found)

###### Example Response

```
{
  message: "missing Habit information"
}
```

##### 428 (Precondition Required)

###### Example Response

```
{
  message: "missing required field"
}
```

##### 500 (Server Error)

###### Example Response

```
{
  message: "Error could not post habit"
}
```



### **Get a User with all Habits**

_method url_: `/api/users/habits/:id (id meaning userId)`

_http method_: **[GET]**

#### Headers

| name            | type   | required | description              |
| --------------- | ------ | -------- | ------------------------ |
| `Content-Type`  | String | Yes      | Must be application/json |
| `authorization` | String | Yes      | token to Authorize user  |

#### Response

##### 200 (ok)

###### Example response

```
[
  {
    "id": 1,
    "username": "zach",
    "fullname": "Zach Christy",
    "password": "$2a$10$W2/Y5EkuQp56SjMPp4qosewaXxaXh5T1ELFFbj99UGI9GI5q94fYK",
    "email": "zchristy44@gmail.com",
    "userImgUrl": "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    "habits": [
        {
            "id": 1,
            "habitTitle": "Workout",
            "completed": 0,
            "completionPoints": 0,
            "userId": 1,
            "categoryId": 1,
            "createdAt": "2019-06-24 21:53:29"
        },
        {
            "id": 5,
            "habitTitle": "Got to bed earlier",
            "completed": 0,
            "completionPoints": 0,
            "userId": 1,
            "categoryId": 1,
            "createdAt": "2019-06-24 21:53:29"
        },
        {
            "id": 6,
            "habitTitle": "No sugar",
            "completed": 0,
            "completionPoints": 0,
            "userId": 1,
            "categoryId": 1,
            "createdAt": "2019-06-24 21:53:29"
        }
    ]
  }
]
```

##### 401 (UnAuthorized)

###### Example Response

```
  {
    message: 'No token provided, must be set on the Authorization Header'
  }
```

##### 400 (Not Found)

###### Example Response

```
{
  message: "Invalid User Id"
}
```

##### 500 (Server Error)

###### Example Response

```
{
  message: "Error finding habits for User"
}
```

##### 500 (Server Error)

###### Example Response

```
{
  message: "Error finding User"
}
```



### **Get All Habits**

**This will only display habits of the logged in user without making an extra :id query**

_method url_: `/api/habits`

_http method_: **[GET]**

#### Headers

| name            | type   | required | description              |
| --------------- | ------ | -------- | ------------------------ |
| `Content-Type`  | String | Yes      | Must be application/json |
| `authorization` | String | Yes      | token to Authorize user  |

#### Response

##### 200 (ok)

###### Example response

```
{
    "id": 2,
    "habitTitle": "Run 10 miles",
    "completed": false,
    "completionPoints": 0,
    "userId": 1,
    "categoryId": 1,
    "created_at": "2019-03-12 10:07:27"
}
```

##### 500 (Server Error)

###### Example Response

```
  {
    "message": "Error finding Habits"
  }
```



### **Get a User with all Categories**

_method url_: `/api/users/categories/:id (id meaning userId)`

_http method_: **[GET]**

#### Headers

| name            | type   | required | description              |
| --------------- | ------ | -------- | ------------------------ |
| `Content-Type`  | String | Yes      | Must be application/json |
| `authorization` | String | Yes      | token to Authorize user  |

#### Response

##### 200 (ok)

###### Example response

```
[
  {
    "id": 1,
    "username": "zach",
    "fullname": "Zach Christy",
    "password": "$2a$10$W2/Y5EkuQp56SjMPp4qosewaXxaXh5T1ELFFbj99UGI9GI5q94fYK",
    "email": "zchristy44@gmail.com",
    "userImgUrl": "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    "categories": [
        {
            "id": 1,
            "categoryTitle": "Fitness",
            "color": "red",
            "userId": 1
        },
        {
            "id": 3,
            "categoryTitle": "Health",
            "color": "green",
            "userId": 1
        },
        {
            "id": 4,
            "categoryTitle": "running",
            "color": "red",
            "userId": 1
        }
    ]
  }
]
```

##### 403 (Forbidden)

###### Example Response

```
  {
    "message": "Invalid token"
  }
```

##### 404 (Not Found)

###### Example Response

```
  {
    "message": "User Not Found"
  }
```



### **Get Habits by Category**

_method url_: `/api/categories/habits/:id (id meaning categoryId)`

_http method_: **[GET]**

#### Headers

| name            | type   | required | description              |
| --------------- | ------ | -------- | ------------------------ |
| `Content-Type`  | String | Yes      | Must be application/json |
| `authorization` | String | Yes      | token to Authorize user  |

#### Response

##### 200 (ok)

###### Example response

```
[
  {
    "id": 1,
    "categoryTitle": "Fitness",
    "color": "red",
    "userId": 1,
    "habits": [
        {
            "id": 1,
            "habitTitle": "Workout",
            "completed": 0,
            "completionPoints": 0,
            "userId": 1,
            "categoryId": 1,
            "createdAt": "2019-06-24 21:53:29"
        },
        {
            "id": 2,
            "habitTitle": "8 hours of sleep",
            "completed": 0,
            "completionPoints": 0,
            "userId": 2,
            "categoryId": 1,
            "createdAt": "2019-06-24 21:53:29"
        },
        {
            "id": 3,
            "habitTitle": "Drink a gallon of water",
            "completed": 0,
            "completionPoints": 0,
            "userId": 3,
            "categoryId": 1,
            "createdAt": "2019-06-24 21:53:29"
        }
    ]
  }
]
```

##### 401 (UnAuthorized)

###### Example Response

```
  {
    message: 'No token provided, must be set on the Authorization Header'
  }
```

##### 400 (Not Found)

###### Example Response

```
{
  message: "Invalid Category Id"
}
```

##### 500 (Server Error)

###### Example Response

```
{
  message: "Error finding category"
}
```

##### 500 (Server Error)

###### Example Response

```
{
  message: "Error finding Habits"
}
```



### **Edit a User Account**

_method url_: `/api/users/:id`

_http method_: **[PUT]**

#### Headers

| name            | type   | required | description              |
| --------------- | ------ | -------- | ------------------------ |
| `Content-Type`  | String | Yes      | Must be application/json |
| `authorization` | String | Yes      | token to Authorize user  |

#### Body

| name         | type   | required | description    |
| ------------ | ------ | -------- | -------------- |
| `username`   | String | Yes      | Must be unique |
| `fullName`   | String | Yes      |                |
| `password`   | String | Yes      |                |
| `email`      | String | No       |                |
| `userImgUrl` | String | No       |                |

#### Example

```
  {
    "username": "zach",
    "password": "baberuth",
    "fullName": "Zach Christy",
  }
```

#### Response

##### 200 (ok)

###### Example Response

```
  {
    "message": "Your account has successfully updated",
    "user": {
        "username": "zach",
        "fullname": "Zach Christy",
        "password": "$2a$10$nVrIUtgSheo0yyXjPVo.0eJBsDABuF6we1FT.XJqaEKlEoiHVXe62",
        "email": "zchristy44@gmail.com",
        "userImgUrl": "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
        "id": 1
    }
  }
```

##### 401 (UnAuthorized)

###### Example Response

```
  {
    message: 'No token provided, must be set on the Authorization Header'
  }
```

##### 400 (Not Found)

###### Example Response

```
{
  message: "Invalid User Id"
}
```

##### 500 (Server Error)

###### Example Response

```
{
  message: "Error finding user"
}
```

##### 500 (Server Error)

###### Example Response

```
{
  message: "Error saving user password"
}
```

##### 428 (Precondition Required)

###### Example Response

```
{
  message: "missing required field"
}
```

##### 404 (Not Found)

###### Example Response

```
{
  message: "missing User information"
}
```

##### 500 (Server Error)

###### Example Response

```
{
  message: "Error updating User"
}
```



### **Delete an Account**

_method url_: `/api/users/:id`

_http method_: **[DELETE]**

#### Headers

| name            | type   | required | description              |
| --------------- | ------ | -------- | ------------------------ |
| `Content-Type`  | String | Yes      | Must be application/json |
| `authorization` | String | Yes      | token to Authorize user  |

#### Response

##### 200 (ok)

###### Example Response

```
  {
    "message":"Your account has been deleted"
  }
```

##### 401 (UnAuthorized)

###### Example Response

```
  {
    message: 'No token provided, must be set on the Authorization Header'
  }
```



### **Get a Single Habit**

_method url_: `/api/habits/:id (as in id of the habit)`

_http method_: **[GET]**

#### Headers

| name            | type   | required | description              |
| --------------- | ------ | -------- | ------------------------ |
| `Content-Type`  | String | Yes      | Must be application/json |
| `authorization` | String | Yes      | token to Authorize user  |

#### Response

##### 200 (ok)

###### Example response

```
{
    "id": 1,
    "habitTitle": "Workout",
    "completed": 0, (0 is binary for false)
    "completionPoints": 0,
    "userId": 1,
    "categoryId": 1,
    "createdAt": "2019-06-24 21:53:29"
}
```

##### 401 (UnAuthorized)

###### Example Response

```
  {
    message: 'No token provided, must be set on the Authorization Header'
  }
```



### **Edit a Habit**

_method url_: `/api/habits/:id`

_http method_: **[PUT]**

#### Headers

| name            | type   | required | description              |
| --------------- | ------ | -------- | ------------------------ |
| `Content-Type`  | String | Yes      | Must be application/json |
| `authorization` | String | Yes      | token to Authorize user  |

#### Body

| name               | type    | required | description |
| ------------------ | ------- | -------- | ----------- |
| `habitTitle`       | String  | Yes      |             |
| `completed`        | Boolean | No       |             |
| `completionPoints` | Integer | No       |             |

#### Example

```
  {
    "habitTitle": "Run 5 miles",
  }
```

#### Response

##### 200 (ok)

###### Example Response

```
{
    "message": "Habit has successfully updated",
    "habit": {
        "id": 1,
        "habitTitle": "Workouts",
        "completed": 0,
        "completionPoints": 0,
        "userId": 1,
        "categoryId": 1,
        "createdAt": "2019-06-24 21:53:29"
    }
}
```

##### 401 (UnAuthorized)

###### Example Response

```
  {
    message: 'No token provided, must be set on the Authorization Header'
  }
```



### **Edit a Category**

_method url_: `/api/categories/:id`

_http method_: **[PUT]**

#### Headers

| name            | type   | required | description              |
| --------------- | ------ | -------- | ------------------------ |
| `Content-Type`  | String | Yes      | Must be application/json |
| `authorization` | String | Yes      | token to Authorize user  |

#### Body

| name            | type   | required | description |
| --------------- | ------ | -------- | ----------- |
| `categoryTitle` | String | Yes      |             |
| `color`         | String | No       |             |

#### Example

```
  {
    "categoryTitle": "Physical Fitness",
  }
```

#### Response

##### 200 (ok)

###### Example Response

```
{
    "message": "Category has successfully updated",
    "category": {
        "id": 1,
        "categoryTitle": "Fitness",
        "color": "blue",
        "userId": 1
    }
}
```

##### 401 (UnAuthorized)

###### Example Response

```
  {
    message: 'No token provided, must be set on the Authorization Header'
  }
```



### **Delete a Habit**

_method url_: `/api/habits/:id (id of the habit)`

_http method_: **[DELETE]**

#### Headers

| name            | type   | required | description              |
| --------------- | ------ | -------- | ------------------------ |
| `Content-Type`  | String | Yes      | Must be application/json |
| `authorization` | String | Yes      | token to Authorize user  |

#### Response

##### 200 (ok)

###### Example Response

```
  {
    "message": "The habit was successfully deleted"
  }
```

##### 401 (UnAuthorized)

###### Example Response

```
  {
    message: 'No token provided, must be set on the Authorization Header'
  }
```

##### 500 (server Error)

###### Example Response

```
  {
    "message": "Error deleting Habit"
  }
```



### **Delete a Category**

_method url_: `/api/categories/:id (id of the category)`

_http method_: **[DELETE]**

#### Headers

| name            | type   | required | description              |
| --------------- | ------ | -------- | ------------------------ |
| `Content-Type`  | String | Yes      | Must be application/json |
| `authorization` | String | Yes      | token to Authorize user  |

#### Response

##### 200 (ok)

###### Example Response

```
  {
    "message": "The category was successfully deleted"
  }
```

##### 401 (UnAuthorized)

###### Example Response

```
  {
    message: 'No token provided, must be set on the Authorization Header'
  }
```

##### 500 (server Error)

###### Example Response

```
  {
    "message": "Error deleting Category"
  }
```
