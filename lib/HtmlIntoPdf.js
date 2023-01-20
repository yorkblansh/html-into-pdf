"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.htmlIntoPdf = void 0;
const puppeteer_1 = require("puppeteer");
const handlebars = require("handlebars");
const _convert = async ({ templateHtml, variables, options }) => {
    const template = handlebars.compile(templateHtml);
    const finalHtml = encodeURIComponent(template(variables));
    const browser = await puppeteer_1.default.launch({
        args: ['--no-sandbox'],
        headless: true
    });
    const page = await browser.newPage();
    await page.goto(`data:text/html;charset=UTF-8,${finalHtml}`, {
        waitUntil: 'networkidle0'
    });
    await page.pdf(options);
    await browser.close();
};
const htmlIntoPdf = async (props) => {
    try {
        _convert(props);
    }
    catch (error) {
        console.log({ error });
    }
};
exports.htmlIntoPdf = htmlIntoPdf;
//# sourceMappingURL=HtmlIntoPdf.js.map