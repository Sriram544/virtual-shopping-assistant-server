const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI || "mongodb://localhost/shopping", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const Product = mongoose.model("Product", new mongoose.Schema({
    productName: String,
    price: Number
}));

app.use(cors());
app.use(express.json());

app.post("/api/process-user-input", async (req, res) => {
    const input = req.body.userInput.toLowerCase();
    const products = await Product.find({ productName: { $regex: input, $options: "i" } }).limit(5);
    res.json({ productSuggestions: products });
});

app.listen(PORT, () => console.log(\`Server running on port \${PORT}\`));
