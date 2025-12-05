import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());

app.get("/vanguard", async (req, res) => {
  const targetUrl = "https://workplace.vanguard.com/investments/fundPricesServiceProxy?priceTypeCodes=NAV&timePeriodCode=D&portIds=1685";

  try {
    const response = await fetch(targetUrl, {
      method: "GET",
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
        "Accept": "application/json, text/plain, */*",
        "Referer": "https://workplace.vanguard.com/",
        "Origin": "https://workplace.vanguard.com",
        "Accept-Language": "en-US,en;q=0.9",
        "Cache-Control": "no-cache",
        "Pragma": "no-cache"
      }
    });

    const body = await response.text();

    res.set("Content-Type", "application/json");
    res.status(response.status).send(body);
  } catch (err) {
    console.error("Proxy Error:", err);
    res.status(500).send("Proxy error");
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Proxy running on port ${port}`));
