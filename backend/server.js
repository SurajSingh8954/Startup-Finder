const express = require("express");

const app = express();
const ideaRoutes = require("./routes/ideas");

app.use(express.static("public"));

const PORT = 8000;

app.use("/ideas", ideaRoutes);

app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});