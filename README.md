# My_schedules
1. This Project is shared by INCO Academy. This is team project , We used github to collabrate.
2. We have to make web app where user can login to see there Schedules and create their Schedules

# Task -
1. All the details of Users and schedules will be stored in database.
2. Only existing user can login the the page.
3. If you are not user you can signup with signup page.
4. In sign up you have to fill all input field and also password and confirm-password should be same. And password will be save in database as a hash not as text.When user login password will be match with the hash password.
5. After the login user can see all the schedules others users also.
6. User can create schedules to use schedul form. And new schedule will add only login user. 
7. User can select only avlaible time. If time has already selected by user it will give you error.
8. User can not select end-time before stating time.
8. After logout user has to login again.


# Technology we used -
1. Node.js
2. Express
3. Ejs
4. bcrypt -  for converting the password in hash.
5. DATABASE - SQL AND PostgreSQL
6. We used middleware so only you can the homepage after login only.
7. We used Session for adding userId in cookies so we can use it for logout logic and also put new scheduls only login users.
