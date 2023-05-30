
# HR System

This is a documentation of the HR employment application.The application is built with a MERN stack to fit the requirement of it being a SPA. The application is built to manage employees for a company and has the following features : 

- All employees must be able to register.
- All employees must be able to sign into the application.
- All employees must be able to edit their profile.
- Some employees can see the details of other employees.
- Some employees can edit the details of other employees.
- [Nice to have] Employees might have a profile picture.
- [Nice to have] Should be responsive on mobile devices.
- [Nice to have] Be able to send a message to employees.
- [Super nice to have] Light and dark mode


## Architecture
-The fronend communicates with the server side through a Rest API. 
[Mern Stack](https://drive.google.com/file/d/1ASmHfGZpk17DV0ACxoVrONTUPdiuUb7O/view?usp=sharing)

## Installation

- Clone the repo from Github
- Make sure you have the latest Node js version on your local computer
- Go to folder directory and open the terminal
- Cd to the front-end folder and run npm install, this will insatll all the dependancies needed for the application to run from package.json
- Go back to the root folder
- Cd to the backend-end folder and run npm install, this will insatll all the dependancies needed for the application to run from package.json
- To run the application
- cd into the folders individually and run npm start

## API Reference
#### Get all items

```http (root)
  GET /api/user
```

| Parameter  | Description                |
| :--------  | :------------------------- |
| `/` | **Authentication**. Get all users |
| `/:uid` | **uid**. Get a user |

#### Get Users

```http (root)
  POST /api/user
```

| Parameter  | Description                       |
| :-------- | :-------------------------------- |
| `/signup`      |  Create Account  |
| `/create`      |  Add user  |
| `/login`      |  Login user  |


```http (root)
  Patch /api/user
```
| Parameter  | Description                       |
| :-------- | :-------------------------------- |
| `/:uid`      |  Update or edit user |

```http (root)
  Delete /api/user
```
| Parameter  | Description                       |
| :-------- | :-------------------------------- |
| `/:delete`      |  Delete user |

## ToubleShooting

- Make sure the port that is set on the application is features
