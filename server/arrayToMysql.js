import mysql from "mysql2";
import fs from "fs";
import xlsx from "xlsx";

// Create a MySQL connection
const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: 'Hoangminh2345',
  database: 'courseview'
});

// Connect to the database
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

const workbook = xlsx.readFile('./server/courses.xlsx');
const sheetName = workbook.SheetNames[0];
const sheetData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

// Prepare the SQL query
const sql = 'INSERT INTO course (courseID, crn, subject, courseNumber, section, hours, title, professor, schedule_type) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';

 // Iterate through the Excel data and insert into the table
 sheetData.forEach((row) => {
  //const query = 'INSERT INTO your_table (column1, column2, column3) VALUES (?, ?, ?)';
  const values = [row.courseID, row.crn, row.subject, row.courseNumber, row.section, row.hours, row.title, row.professor, row.schedule_type];
  
  //console.log(row.courseID, row.crn, row.subject, row.courseNumber, row.section, row.hours, row.title, row.professor, row.schedule_type);
  
  
  connection.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error inserting data:', err);
      return;
    }
    console.log('Data inserted successfully:', result);
  });
  
});

// Close the MySQL connection
connection.end();


/*
let ID = 1; // Start with the first id value as 1
const coursesWithId = CourseData.map(course => {
  const courseNumber = parseInt( course[3].toString().substring(0, 4), 10); // Truncate 'courseNumber' to 4 characters
  return [
    ID++,
    course[0],
    course[1],
    course[2],
    courseNumber,
    course[4],
    course[5],
    course[6],
    course[7],
  ];
});

console.log(coursesWithId[212][0]);
console.log(coursesWithId[212][1]);
console.log(coursesWithId[212][2]);
console.log(coursesWithId[212][3]);
console.log(coursesWithId[212][4]);
console.log(coursesWithId[212][5]);
console.log(coursesWithId[212][6]);
console.log(coursesWithId[212][7]);
console.log(coursesWithId[212][8]);
*/

// Execute the query with the array of values
/*
connection.query(sql, [coursesWithId], (err, result) => {
  coursesWithId
  if (err) {
    console.log(coursesWithId[]);
    console.error('Error inserting data into table:', err);
    return;
  }
  console.log('Data inserted successfully:', result);
  
  // Close the connection
  connection.end();
});

*/