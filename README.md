# MERN-App-File-Upload Project

Steps to setup the project
1.Take pull of the main branch.

2.Open the project in a code editor.

3.Install dependencies using "npm i" command for both backend and frontend in respective folders/directory.

4.For running project 
  a.For Backend run "node server.js" or "nodemon server.js" command.
  b.For Frontend run "npm start" command".
  
5.When both backend and frontend are running successfully then go to "localhost:3000" on your browser.

6. Backend will run on "localhost:3001" port.
7. 
8. MongoDB database credentials are alredy set in the config.env file in backend, you can use this database or can connect yours and set  
   credentials in the cofig.env file.
   
6.Once you go on to localhost:3000 on your browser, you will land on login screen.

7.*Important* Only usernames in the database can't be same other things can be same like email,password, name.

8.First register yourself by clicking on signup below submit button.

9.After that your account will be created and will be redirected to home page there you can select files to upload,download and delete.

10.For downloading file you need to enter 6 digit code which was shared to you when file was succefully uploaded.

11.You can check uploaded documents in the table where you can see file name and download & delete button against that file name.

*I have used ReactJS as frontend and NodeJs & Expressjs as backend and MongoDB as Database.*
