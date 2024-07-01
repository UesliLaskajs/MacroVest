import puppeteer from "puppeteer";
import fs from "fs";
import path from "path";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
const PORT = 3001;

app.use(cors());
app.use(bodyParser.json());

app.post('/update-pair', async (req, res) => {
    const { selectedPair } = req.body;

    const regexSplitPairs = (pairString) => {
        return pairString.split(/\s*\/\s*/);
    };

    const [pair1, pair2] = regexSplitPairs(selectedPair);
    console.log(`Received pairs: ${pair1}, ${pair2}`);

    const filePath = path.resolve("./data/data.json");

    try {
        let existingData = null;
        if (fs.existsSync(filePath)) {
            existingData = fs.readFileSync(filePath, "utf8");
        }

        const browser = await puppeteer.launch({ headless: false });

        const scrapeData = async (pair) => {
            const page = await browser.newPage();
            await page.goto(`https://tradingeconomics.com/${pair}/indicators`);

            await page.waitForSelector(".table.table-hover tbody");

            const data = await page.evaluate(() => {
                const tableBody = document.querySelector(".table.table-hover tbody");
                if (!tableBody) {
                    throw new Error("Table body not found on the page");
                }

                const rows = [];
                tableBody.querySelectorAll("tr").forEach(row => {
                    const cells = row.querySelectorAll("td");

                    let rowData = {
                        Indicator: cells[0].innerText.trim(),
                        Last: cells[1].innerText.trim(),
                        Previous: cells[2].innerText.trim(),
                        Highest: cells[3] ? cells[3].innerText.trim() : null,
                        Lowest: cells[4] ? cells[4].innerText.trim() : null,
                        Unit: cells[5] ? cells[5].innerText.trim() : null,
                        Date: cells[6] ? cells[6].innerText.trim() : null
                    };

                    rows.push(rowData);
                });

                return rows;
            });

            await page.close();
            return data;
        };

        const data1 = await scrapeData(pair1);
        const data2 = await scrapeData(pair2);

        await browser.close();

        const newData = {
            [pair1]: data1,
            [pair2]: data2
        };

        const newJsonData = JSON.stringify(newData, null, 4);

        // Compare new data with existing data
        if (newJsonData === existingData) {
            console.log("The data has not changed. No update required.");
        } else {
            console.log("The data has changed. Updating the file...");

            // Update the JSON file with new data
            fs.writeFileSync(filePath, newJsonData);
            console.log("Data updated successfully.");
        }

        res.sendStatus(200);
    } catch (error) {
        console.error("Error occurred:", error.message);
        res.status(500).send("An error occurred while updating the data.");
    }
});

app.get("/data-pair", async (req, res) => {
    try {
        const filePath = path.resolve("./data/data.json")

        if (fs.existsSync(filePath)) {
            const parsedData = fs.readFileSync(filePath, "utf8")
            res.send(JSON.parse(parsedData))
        }
        else {
            res.status(400).send("Data does not Exist")
        }
    }
    catch (err) {
        console.error("Error occurred:", err.message);
        res.status(500).send("An error occurred while reading the data.");
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
