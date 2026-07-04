const express = require("express");

const router = express.Router();

// GET /ideas
router.get("/", (req, res) => {

    res.json([
        {
            id: 1,
            category: "AI",
            title: "AI Resume Builder",
            description: "An AI platform that creates ATS-friendly resumes instantly.",
            members: 5,
            likes: 230
        },
        {
            id: 2,
            category: "Health",
            title: "Smart Health Tracker",
            description: "Monitor fitness and health using AI-powered analytics.",
            members: 8,
            likes: 180
        }
    ]);

});
module.exports = router;