# Project for TDDD27 
By Johan Forslund (johfo522) and Samuel Svensson (samsv787)

## Functional specification
This project will be a platform for users and companies to post images which they want to be edited (in Photoshop or other 3D rendering programs f.e). 
Users may create an account to post their own image that they want edited in some way, maybe as an art project, object removal or general retouching. 
Other users may comment to ask further questions or post their finished edit of the image. All posts or edits can be "liked" similarly to a social media website. 
Another scenario would be if a company would want to arrange a logo designing competition where people can contribute with their skills. 
An inspiration for this project is the subreddit _/r/photoshopbattles_ where someone posts an image and others can edit them in various ways.  

## Technological specification
The backend will use **NodeJS** with **Express** as framework. This will serve as a _REST API_ where the server will communicate with a **PostgreSQL** database.
The database will need to store several tables for users, post comments, edits etc with their own unique relations. User authentication will be handled using **Auth0**.

The frontend will be a **React** application, using Hooks and the **Context** API. The _Context API_ will replace the need for _Redux_ since it offers basically the same functionality (actions, reducers, global state). _CRUD_ requests will be made using Axios. The UI will be created using the CSS framework **Bulma**.

Jest will be used as a testing framework.

Some additional functionalities that will be implemented if there is time would be a search functionality to be able to search for posts/edits. This could be implemented using **Algolia**, which is a search engine _SaaS_.
As for _CI/CD_ we will probably use **CircleCI** to automate builds in a scaleable way. 


## Mid course screencast

[Mid course screencast can be seen here](https://www.youtube.com/watch?v=wucZl2d4Mn0&feature=youtu.be)


## Project screencasts

[Project screencast can be seen here](https://www.youtube.com/watch?v=ILPil_hXGg8)


## Individual screencasts

[Samuels individual screencast can be seen here](https://www.youtube.com/watch?v=t6r9QxhPKSA)
