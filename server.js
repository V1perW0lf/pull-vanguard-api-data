import express from "express";
import cors from "cors";
import { fetch } from "undici";

const app = express();
app.use(cors());

// Vanguard endpoint (public)
const TARGET =
  "https://workplace.vanguard.com/investments/fundPricesServiceProxy?priceTypeCodes=NAV&timePeriodCode=D&portIds=1685";

app.get("/vanguard", async (req, res) => {
  try {
    const response = await fetch(TARGET, {
      method: "GET",
      headers: {
        // Full browser header set to defeat anti-bot checks
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:122.0) Gecko/20100101 Firefox/122.0",
        "Accept":
          "application/json, text/javascript, */*; q=0.01",
        "Accept-Language": "en-US,en;q=0.9",
        "Accept-Encoding": "gzip, deflate, br",
        "Referer": "https://workplace.vanguard.com/",
        "Origin": "https://workplace.vanguard.com",
        "DNT": "1",
        "Sec-Fetch-Dest": "empty",
        "Sec-Fetch-Mode": "cors",
        "Sec-Fetch-Site": "same-origin",
        "Cache-Control": "no-cache",
        "Pragma": "no-cache"
      }
    });

    const text = await response.text();

    res.set("Content-Type", response.headers.get("content-type") || "application/json");
    res.status(response.status).send(text);
  } catch (err) {
    console.error("Vanguard proxy error:", err);
    res.status(500).send("Proxy internal error");
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Proxy running on port ${port}`));
