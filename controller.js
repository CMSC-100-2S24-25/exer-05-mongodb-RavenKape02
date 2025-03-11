import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/StudentDatabase");
        console.log("MongoDB connected");
    } catch (err) {
        console.error("MongoDB connection error:", err);
        process.exit(1);
    }
};

connectDB();
// Student Model
const Student = mongoose.model('Student', {
    stdnum: String,
    fname: String,
    lname: String,
    age: Number
}, "studentData")

// Save a new student
const saveStudent = async (req, res) => {
    try {
        const { stdnum, fname, lname, age } = req.body;
        const newStudent = new Student({ stdnum, fname, lname, age });
        await newStudent.save();
        res.json({ inserted: true });
    } catch (error) {
        res.json({ inserted: false, error: error.message });
    }
};

// Update student's last name given the search for first name
const updateStudent = async (req, res) => {
    try {
        const { fname, newlname } = req.body;
        const updateResult = await Student.updateOne(
            { fname },
            { $set: { lname: newlname } }
        );
        res.json({ updated: updateResult.modifiedCount > 0 });
    } catch (error) {
        res.json({ updated: false, error: error.message });
    }
};

// Remove a specific student by student number
const removeStudent = async (req, res) => {
    const { stdnum } = req.body;
    const deleteResult = await Student.deleteOne({ stdnum });
    res.json({ deleted: deleteResult.deletedCount > 0 });
};

// Remove all students
const removeAllStudents = async (req, res) => {
    try {
        const deleteResult = await Student.deleteMany({});
        res.json({ deleted: true});
    } catch (error) {
        res.json({ deleted: false});
    }
};

// Get a student by student number
const getStudent = async (req, res) => {
    try {
        const { stdnum } = req.query;
        const student = await Student.find({ stdnum });
        res.json(student);
    } catch (error) {
        res.json({});
    }
};

// Get all students
const getAllStudents = async (req, res) => {
    try {
        const students = await Student.find({});
        res.json(students);
    } catch (error) {
        res.json({});
    }
};

export {saveStudent, updateStudent, removeStudent, removeAllStudents, getStudent, getAllStudents}