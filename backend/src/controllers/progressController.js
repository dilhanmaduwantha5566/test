const Progress = require("../models/Progress");

// Add new progress entry
const addProgress = async (req, res) => {
    try {
        const { weight, height } = req.body;

        if (!weight || !height) {
            return res.status(400).json({ message: "Please provide weight and height" });
        }

        // Calculate BMI
        // BMI = weight (kg) / (height (m) * height (m))
        const heightInMeters = height / 100;
        const bmi = (weight / (heightInMeters * heightInMeters)).toFixed(2);

        const progress = await Progress.create({
            member: req.user.id,
            weight,
            height,
            bmi,
            date: new Date()
        });

        res.status(201).json(progress);
    } catch (err) {
        res.status(500).json({ message: "Error adding progress", error: err.message });
    }
};

// Get progress history
const getProgressHistory = async (req, res) => {
    try {
        const history = await Progress.find({ member: req.user.id }).sort({ date: 1 }); // Sort by Date ascending for chart
        res.json(history);
    } catch (err) {
        res.status(500).json({ message: "Error fetching progress", error: err.message });
    }
};

module.exports = { addProgress, getProgressHistory };
