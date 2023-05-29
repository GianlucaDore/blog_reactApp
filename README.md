# React Blog App

This application is a simple React app to browse and write blog posts. In this v1 version, it allows to provide only a blog post title, a post body, the post's author name, and some tags. It will be expanded to support a more diverse formatting and images upload, as well as links to videos and such. The main goal was to build an app to test my learning of the Redux library rather than showing off my CSS / styling skills, thus the UI appears to be very simple.

Overall, the app makes use of React.js, React Router, React Redux (specifically, the Redux ToolKit package), CSS3, HTML5.

A form of back-end service is provided by restdb.io , which acts like a remote database that can be queried via HTTP requests. It consists of two tables: the first one is named 'Excel-Blog' and includes all the data about all the blog posts submitted to the app; the second one is named 'Admins' and contains the credentials of all the administrative users of the app. The idea is that any user that did not log in to the app (a visitor), has limited actions on the usage of the app itself. In particular, visitors are regarded as "readers": they can browse the existing blog posts and see them in detail, and they can also conduct searches for specific posts (for now, only based on posts' title) through the Search button, but they can't add posts to the blog or delete existing ones. Administrators, on the contrary, have full privileges. They log in to the app by clicking on the top-right login button in the navbar and succesfully submitting admin credentials in the form prompted. Once logged in, they have the faculty to create new posts and delete existing ones.



### **Admin credentials to test the app**

The default admin user is:  **admin**

The default admin password is: **password**




# Screenshots

Although rather simple, the User Interface of this v1.0 is fully responsive: each element was refined to scale properly in all devices (mobile, monitors with different resolutions). 

![reactblog_1920_1080](https://github.com/GianlucaDore/blog_reactApp/assets/51960987/42c19e66-dc18-4df9-8815-79a5e63f2d84)

The home page does display a button to create a new blog post when an admin is logged in:

![reactblog_admin_home](https://github.com/GianlucaDore/blog_reactApp/assets/51960987/faf9c673-a81e-4820-98cd-6c933b941fdd)

button on hover (transition: 0.2 s):

![reactblog_button_detail](https://github.com/GianlucaDore/blog_reactApp/assets/51960987/97829996-11a9-49e5-8465-65f8188e406f)

Blog post read. Thanks to React Router, an entire new page is rendered when displaying a post: 

![reactblog_blogpost](https://github.com/GianlucaDore/blog_reactApp/assets/51960987/814ffa82-1f61-4e98-bb10-ec48262e0524)

Different layout for the home page (900x883):

![reactblog_900_883](https://github.com/GianlucaDore/blog_reactApp/assets/51960987/e5c016b3-8ba3-4197-bd8c-1ec9810e69c7)

Example of responsiveness on iPhone XR's resolution:

![reactblog_iphone_XR](https://github.com/GianlucaDore/blog_reactApp/assets/51960987/48f70f99-4b82-45e7-82a1-47c55f9133ea)


# Future improvements

Future improvements will include:

- Blog post cover image for each post. Currently, there is the possibility to upload an image when submitting a new blog post; the feature is still getting worked on, so basically the upload won't produce any effects on the User Interface.

- A "correct" and up-to-today's-standard authentication system. For now, the login happens by querying the DB with some credentials; if the DB finds both fields in a Administrators' table row, it returns a 200 ok HTTP response, with the row requested. This of course opens to big security problems, but it will be taken care by future updates, probably with the help of tokens and localSessionStore browser variable. For now, the authentication happens by querying restdb.io's admin table of the application; the API makes a GET request that should match both the username and the associated password on the database. If there is a match between user AND ( V ) password on the DB, the database fulfills the GET request, returning the credential details as a single result in the GET response. If there is not a match for the credentials provided, the server's response will be empty.


# Setting up the app for use

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
