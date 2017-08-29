### Student Tracker

Student Tracker is a browser-based app built to manage student info and their grades.

![Student Tracker](https://github.com/dkreider/student-tracker/blob/master/public/img/student-tracker.png?raw=true) 

#### How does it work?

- Save a new student.
To save a new student, hit clear, type in necessary info and hit Save. Always leave the number in the student id field alone.

- View a student.
If you have the student's id, type it in the student id field and hit Enter. Otherwise, use the search field on the left hand side. Just type in the student's name, email address, etc... and the search results will automatically update as you type.

- Updating an existing student.
	To update an already existing student, load the student by typing in their id and hitting Enter or by searching for them. Once loaded, make the necessary changes (don't change their id number) and hit Save.
	
- Delete a student.
Load the student you want to delete and press the Delete button.

- Managing grades.
All graded material/courses can be added, updated or deleted on the Courses page. Any courses saved can be added to the students record along with their grades. First add the material by clicking on Add Course. Then, enter the student's grades and hit Save.

#### Requirements:
- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.org/)

#### Installing:

- Clone repo.
- Run `npm install`
- Run `npm start`
- Browse to [localhost:3000](http://localhost:3000)