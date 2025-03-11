import needle from "needle";

const students = [
    {
        stdnum: "202285743",
        fname: "Arnold",
        lname: "Swazenegger",
        age: 69
    },
    {
        stdnum: "202298745",
        fname: "Mary Jane",
        lname: "Watson",
        age: 22
    },
    {
        stdnum: "202310234",
        fname: "Bruce",
        lname: "Wayne",
        age: 30
    },
    {
        stdnum: "202323567",
        fname: "Tony",
        lname: "Stark",
        age: 45
    },
    {
        stdnum: "202334678",
        fname: "Diana",
        lname: "Prince",
        age: 28
    }
];

// Loop through students and send requests using needle.post
students.forEach((student) => {
    needle.post("http://localhost:3000/api/students/save-student", student, { json: true }, (err, res) => {
        if (err) {
            console.error(`Error inserting ${student.fname} ${student.lname}:`, err);
        } else {
            console.log(`Inserted ${student.fname} ${student.lname}:`, res.body);
        }
    });
});

//test for update post request
needle.post("http://localhost:3000/api/students/update", {fname: "Mary Jane", newlname: "Parker"}, {json: true}, (err, res) => {
    if (err){
        console.error('Error Updating');
    } else{
        console.log("Successfully Updated")
    }
})

//test the delete student using std num as parameter to pass
const studentToDelete = { stdnum: "202310234" };
needle.post("http://localhost:3000/api/students/remove-user", studentToDelete, { json: true }, (err, res) => {
    if (err) {
        console.error(`Error Deleting`);
    } else {
        console.log(`Deleted Student Number: ${studentToDelete.stdnum}`);
    }
});

//test the remove all users function
needle.post("http://localhost:3000/api/students/remove-all-user", null, { json: true }, (err, res) => {
    if (err) {
        console.error(`Error Deleting All Members`);
    } else {
        console.log(`Successfully Deleted Every Student`);
    }
});
