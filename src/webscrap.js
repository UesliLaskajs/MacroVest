import puppeteer from "puppeteer";
import fs from "fs";
import path from "path";
import express from "express"
import bodyParser from "body-parser";
import cors from "cors"

const app = express();
const PORT = 3001;

app.use(cors());
app.use(bodyParser.json());

app.post('/update-pair', async (req, res) => {
    const { selectedPair } = req.body;
    console.log(`Received selected pair: ${selectedPair}`);

    const filePath = path.resolve("../src/data/data.json");

    // Read existing data
    let existingData = null;
    if (fs.existsSync(filePath)) {
        existingData = fs.readFileSync(filePath, "utf8");
    }

    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto(`https://tradingeconomics.com/${selectedPair}/indicators`);

    const newData = await page.evaluate(() => {
        const tableBody = document.querySelector(".table.table-hover tbody");
        const tableData = {};
        let rows = [];

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

        tableData.rows = rows;

        return JSON.stringify(tableData, null, 4);
    });

    await browser.close();

    // Compare new data with existing data
    if (newData === existingData) {
        console.log("The data has not changed. No update required.");
    } else {
        console.log("The data has changed. Updating the file...");

        // Update the JSON file with new data
        fs.writeFileSync(filePath, newData);
        console.log("Data updated successfully.");
    }

    res.sendStatus(200);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
