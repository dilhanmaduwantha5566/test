const Class = require("../models/Class");

// Create a new class (Trainer only)
const createClass = async (req, res) => {
    try {
        const { name, type, date, time, duration, price } = req.body;
        const newClass = new Class({
            name,
            type,
            date,
            time,
            duration,
            price,
            trainer: req.user.id
        });
        await newClass.save();
        res.status(201).json(newClass);
    } catch (err) {
        res.status(500).json({ message: "Error creating class", error: err.message });
    }
};

// Get all classes (For browsing)
const getAllClasses = async (req, res) => {
    try {
        const classes = await Class.find().populate("trainer", "name");
        res.json(classes);
    } catch (err) {
        res.status(500).json({ message: "Error fetching classes", error: err.message });
    }
};

// Get classes for a specific trainer
const getTrainerClasses = async (req, res) => {
    try {
        const classes = await Class.find({ trainer: req.user.id });
        res.json(classes);
    } catch (err) {
        res.status(500).json({ message: "Error fetching trainer classes", error: err.message });
    }
};

module.exports = { createClass, getAllClasses, getTrainerClasses };
