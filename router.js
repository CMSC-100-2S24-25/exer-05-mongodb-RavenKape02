import express from "express";
import {
    saveStudent,
    updateStudent,
    removeStudent,
    removeAllStudents,
    getStudent,
    getAllStudents
} from "./controller.js";

const router = express.Router();

router.post("/save-student", saveStudent);
router.post("/update", updateStudent);
router.post("/remove-user", removeStudent);
router.post("/remove-all-user", removeAllStudents);
router.get("/user", getStudent);
router.get("/members", getAllStudents);

export default router;
