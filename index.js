import express from "express";
import axios from "axios";

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

// main page
app.get("/", (req, res) => {
  res.render("index", { drinks: null });
});

// search route
app.post("/search", async (req, res) => {
  const drinkName = req.body.drink;

  try {
    const result = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${drinkName}`);

    const drinks = result.data.drinks;

    if (!drinks) {
      return res.render("index", { drinks: null });
    }

    res.render("index", { drinks: drinks });
  } catch (error) {
    console.log(error);
    res.render("index", { drinks: null });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
