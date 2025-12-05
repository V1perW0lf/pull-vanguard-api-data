import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());

app.get("/vanguard", async (req, res) => {
  const targetUrl =
    "https://workplace.vanguard.com/investments/fundPricesServiceProxy?priceTypeCodes=NAV&timePeriodCode=D&portIds=1685";

  try {
    const response = await fetch(targetUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0",  // helps avoid some blocks
        "Accept": "application/json",
      },
    });

    const text = await response.text();

    res.status(response.status).send(text);
  } catch (err) {
    console.error(err);
    res.status(500).send("Proxy error");
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Proxy running on port ${port}`));
