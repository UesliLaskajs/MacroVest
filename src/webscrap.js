import puppeteer from "puppeteer";
import fs from "fs"
import path from "path";
(async function () {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto('https://tradingeconomics.com/united-states/indicators');

    const data = await page.evaluate(function () {

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

        const jsonData = JSON.stringify(tableData, null, 4);

        return jsonData;
    });

    console.log(data);

    //Define FilePath

    const filePath = path.resolve("./data/IndicatorsScrap.json")
    if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath)
    }

    fs.writeFileSync(filePath, data)
    await browser.close();
})();
