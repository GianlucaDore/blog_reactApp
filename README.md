# React Blog App

This application is a simple React app to browse and write blog posts. In this v1 version, it allows to provide only a blog post title, a post body, the post's author name, and some tags. It will be expanded to support a more diverse formatting and images upload, as well as links to videos and such. The main goal was to build an app to test my learning of the Redux library rather than showing off my CSS / styling skills, thus the UI appears to be very simple.

Overall, the app makes use of React.js, React Redux (specifically, the Redux ToolKit package), CSS3.

A form of back-end service is provided by restdb.io , which acts like a remote database that can be queried via HTTP requests. It consists of two tables: the first one is named 'Excel-Blog' and includes all the data about all the blog posts submitted to the app; the second one is named 'Admins' and contains the credentials of all the administrative users of the app. The idea is that any user that did not log in to the app (a visitor), has limited actions on the usage of the app itself. In particular, visitors are regarded as "readers": they can browse the existing blog posts and see them in detail, and they can also conduct searches for specific posts (for now, only based on posts' title) through the Search button, but they can't add posts to the blog or delete existing ones. Administrators, on the contrary, have full privileges. They log in to the app by clicking on the top-right login button in the navbar and succesfully submitting admin credentials in the form prompted. Once logged in, they have the faculty to create new posts and delete existing ones.



### **Admin credentials to test the app**

The default admin user is:  **admin**

The default admin password is: **password**

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
