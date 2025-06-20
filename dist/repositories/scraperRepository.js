var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import axios from 'axios';
import fs from 'fs';
import Papa from 'papaparse';
import * as cheerio from 'cheerio';
import puppeteer from 'puppeteer';
export const scrapeUniversities = () => __awaiter(void 0, void 0, void 0, function* () {
    const urls = [
        'https://sidatagrun-public-1076756628210.asia-southeast2.run.app/ptn_sb.php',
        'https://sidatagrun-public-1076756628210.asia-southeast2.run.app/ptn_sb.php?ptn=-2',
        'https://sidatagrun-public-1076756628210.asia-southeast2.run.app/ptn_sb.php?ptn=-3'
    ];
    const htmlResponses = yield Promise.all(urls.map(url => axios.get(url)));
    const universities = [];
    for (const response of htmlResponses) {
        const $ = cheerio.load(response.data);
        $('table tbody tr').each((index, element) => {
            const id = $(element).find('td:nth-child(2)').text().trim();
            const name = $(element).find('td:nth-child(3)').text().trim();
            const cleanedName = name.replace(/\n.*$/, '');
            const city = $(element).find('td:nth-child(4)').text().trim();
            const province = $(element).find('td:nth-child(5)').text().trim();
            universities.push({
                id,
                universityName: cleanedName,
                city,
                province
            });
        });
    }
    return universities;
});
export const scrapeMajors = (url) => __awaiter(void 0, void 0, void 0, function* () {
    const { data: detailHtml } = yield axios.get(url);
    const $ = cheerio.load(detailHtml);
    const majors = [];
    $('table tbody tr').each((index, element) => {
        const name = $(element).find('td:nth-child(3)').text().trim();
        const quota = $(element).find('td:nth-child(5)').text().trim();
        const applicants = $(element).find('td:nth-child(6)').text().trim();
        if (name && !majors.some(major => major.name === name)) {
            majors.push({
                name,
                quota,
                applicants,
            });
        }
    });
    const filteredMajors = majors.filter(major => major.name.length <= 50);
    return filteredMajors;
});
export const scrapePddikti = () => __awaiter(void 0, void 0, void 0, function* () {
    const browser = yield puppeteer.launch({
        headless: false,
        userDataDir: './tmp'
    });
    const page = yield browser.newPage();
    yield page.setViewport({
        width: 1920,
        height: 1080,
        deviceScaleFactor: 1,
    });
    yield page.goto('https://pddikti.kemdiktisaintek.go.id/perguruan-tinggi', {
        waitUntil: 'networkidle2',
        timeout: 0
    });
    yield page.waitForSelector('.w-full.pt-5.flex.flex-wrap.gap-4.ml-2 > div');
    yield page.waitForSelector('#\\:r8\\:');
    yield page.click('#\\:r8\\:');
    yield page.select('select[name="pagination"]', '48');
    const universities = [];
    while (true) {
        yield page.waitForSelector('div.relative.h-24.flex.items-center > div > div > p');
        yield page.waitForFunction(() => {
            var _a;
            const el = document.querySelector('div.grid.grid-cols-2.gap-3.px-4.text-sm > div:nth-child(3) > p');
            return el && ((_a = el.textContent) === null || _a === void 0 ? void 0 : _a.trim()) !== "...";
        });
        const productsHandles = yield page.$$('.w-full.pt-5.flex.flex-wrap.gap-4.ml-2 > div');
        for (const productHandle of productsHandles) {
            const data = yield page.evaluate(el => {
                var _a, _b, _c, _d, _e, _f;
                if (!el)
                    return { name: '', alamat: '', biaya: '', accred: '', major: '', passPercentage: '' };
                const titleElement = el.querySelector('div.relative.h-24.flex.items-center > div > div > p');
                const locationElement = el.querySelector('div.px-4.mt-1.text-sm > h5');
                const feeElement = el.querySelector('div:nth-child(3) > div > p');
                const accredElement = el.querySelector('div.grid.grid-cols-2.gap-3.px-4.text-sm > div:nth-child(1) > p');
                const majorElement = el.querySelector('div.grid.grid-cols-2.gap-3.px-4.text-sm > div:nth-child(2) > p');
                const passPercentageElement = el.querySelector('div.grid.grid-cols-2.gap-3.px-4.text-sm > div:nth-child(3) > p');
                return {
                    name: ((_a = titleElement === null || titleElement === void 0 ? void 0 : titleElement.textContent) === null || _a === void 0 ? void 0 : _a.trim()) || '',
                    alamat: ((_b = locationElement === null || locationElement === void 0 ? void 0 : locationElement.textContent) === null || _b === void 0 ? void 0 : _b.trim()) || '',
                    biaya: ((_c = feeElement === null || feeElement === void 0 ? void 0 : feeElement.textContent) === null || _c === void 0 ? void 0 : _c.trim()) || '',
                    accred: ((_d = accredElement === null || accredElement === void 0 ? void 0 : accredElement.textContent) === null || _d === void 0 ? void 0 : _d.trim()) || '',
                    major: ((_e = majorElement === null || majorElement === void 0 ? void 0 : majorElement.textContent) === null || _e === void 0 ? void 0 : _e.trim()) || '',
                    passPercentage: ((_f = passPercentageElement === null || passPercentageElement === void 0 ? void 0 : passPercentageElement.textContent) === null || _f === void 0 ? void 0 : _f.trim()) || ''
                };
            }, productHandle);
            universities.push(data);
        }
        const isNextDisabled = yield page.evaluate(() => {
            const nextButton = document.querySelector('div.flex.align-end.items-center.justify-end.gap-1 > button:nth-child(3)');
            return (nextButton === null || nextButton === void 0 ? void 0 : nextButton.hasAttribute('disabled')) || false;
        });
        if (isNextDisabled)
            break;
        yield page.waitForSelector('div.flex.align-end.items-center.justify-end.gap-1 > button:nth-child(3)', { visible: true });
        yield page.click('div.flex.align-end.items-center.justify-end.gap-1 > button:nth-child(3)');
    }
    const formattedUniversities = universities.map(uni => ({
        name: `"${uni.name}"`,
        alamat: `${uni.alamat}`,
        biaya: `${uni.biaya}`,
        accred: `${uni.accred}`,
        major: `${uni.major}`,
        passPercentage: `${uni.passPercentage}`
    }));
    const csv = Papa.unparse(formattedUniversities, {
        header: false,
        quotes: true,
    });
    fs.writeFileSync('PTN.csv', csv);
    return universities;
});
//gaisoo
export const cobaTiga = () => __awaiter(void 0, void 0, void 0, function* () {
    const browser = yield puppeteer.launch({
        headless: false,
        userDataDir: './tmp',
    });
    const page = yield browser.newPage();
    yield page.setViewport({ width: 1920, height: 1080 });
    yield page.goto('https://pddikti.kemdiktisaintek.go.id/perguruan-tinggi', {
        waitUntil: 'networkidle2',
        timeout: 0
    });
    yield page.waitForSelector('.w-full.pt-5.flex.flex-wrap.gap-4.ml-2 > div');
    yield page.select('select[name="pagination"]', '48');
    const allMajors = [];
    while (true) {
        yield page.waitForSelector('div.relative.h-24.flex.items-center > div > div > p');
        const universityHandles = yield page.$$('.w-full.pt-5.flex.flex-wrap.gap-4.ml-2 > div');
        for (const universityHandle of universityHandles) {
            const detailButton = yield universityHandle.$('div:nth-child(4) > div > button.border-\[1px\].border-primary-main.hover\:border-none.rounded-md.cursor-pointer.text-center.bg-neutral-10.hover\:bg-gradient-to-r.from-linear-main-1.to-linear-main-2.flex.justify-center.items-center.text-primary-main.hover\:text-neutral-10.w-\[200px\].h-14');
            if (detailButton) {
                yield detailButton.click();
                yield page.waitForNavigation({ waitUntil: 'networkidle2' });
                const majors = yield page.evaluate(() => {
                    return Array.from(document.querySelectorAll('div.px-6 > div:nth-child(2) > div > div > div > h1'))
                        .map(el => { var _a; return ((_a = el.textContent) === null || _a === void 0 ? void 0 : _a.trim()) || ''; });
                });
                allMajors.push(majors);
                yield page.goBack();
                yield page.waitForSelector('.w-full.pt-5.flex.flex-wrap.gap-4.ml-2 > div');
            }
        }
        const isNextDisabled = yield page.evaluate(() => {
            var _a;
            const nextButton = document.querySelector('button img[alt="right"]');
            return ((_a = nextButton === null || nextButton === void 0 ? void 0 : nextButton.closest('button')) === null || _a === void 0 ? void 0 : _a.hasAttribute('disabled')) || false;
        });
        if (isNextDisabled)
            break;
        yield page.click('button img[alt="right"]');
        yield page.waitForNavigation({ waitUntil: 'networkidle2' });
    }
    return allMajors;
});
//consumePython
export const pythonScrape = (keyword) => __awaiter(void 0, void 0, void 0, function* () {
    const BASE_URL = 'https://api-pddikti.kemdiktisaintek.go.id';
    //  const link= `${BASE_URL}/pt/search?nama=${encodeURIComponent(keyword)}`
    const link = `${BASE_URL}/pencarian/pt/${encodeURIComponent(keyword)}`;
    const response = yield axios.get(link, {
        headers: {
            "Accept": "application/json, text/plain, */*",
            "Accept-Encoding": "gzip, deflate, br, zstd",
            "Accept-Language": "en-US,en;q=0.9,mt;q=0.8",
            "Connection": "keep-alive",
            "DNT": "1",
            "Host": "api-pddikti.kemdiktisaintek.go.id",
            "Origin": "https://pddikti.kemdiktisaintek.go.id",
            "Referer": "https://pddikti.kemdiktisaintek.go.id/",
            "Sec-Fetch-Dest": "empty",
            "Sec-Fetch-Mode": "cors",
            "Sec-Fetch-Site": "same-site",
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36 Edg/131.0.0.0",
            "X-User-IP": "103.47.132.29",
            "sec-ch-ua": '"Microsoft Edge";v="131", "Chromium";v="131", "Not_A Brand";v="24"',
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": '"Windows"',
        }
    });
    console.log('link:', link);
    return response.data;
});
