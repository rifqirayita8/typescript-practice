import axios from 'axios';
import fs from 'fs';
import Papa from 'papaparse';
import * as cheerio from 'cheerio';
import puppeteer, { Browser, Page, ElementHandle } from 'puppeteer';
import { ScrapedMajor, ScrapedUniversity } from '../models/university.js';
import { UniversityCoba } from '../models/university.js';

export const scrapeUniversities = async () => {
  const urls = [
    'https://sidatagrun-public-1076756628210.asia-southeast2.run.app/ptn_sb.php',
    'https://sidatagrun-public-1076756628210.asia-southeast2.run.app/ptn_sb.php?ptn=-2',
    'https://sidatagrun-public-1076756628210.asia-southeast2.run.app/ptn_sb.php?ptn=-3'
  ];

  const htmlResponses = await Promise.all(urls.map(url => axios.get(url)));

  const universities: ScrapedUniversity[] = [];

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
}


export const scrapeMajors= async(url:string) => {
  const {data: detailHtml} = await axios.get(url);
  const $= cheerio.load(detailHtml);

  const majors:ScrapedMajor[]= [];
  $('table tbody tr').each((index, element) => {
    const name= $(element).find('td:nth-child(3)').text().trim();
    const quota= $(element).find('td:nth-child(5)').text().trim();
    const applicants= $(element).find('td:nth-child(6)').text().trim();

    if(name && !majors.some(major => major.name === name)) {
      majors.push({
        name,
        quota,
        applicants,
      });
    }
  })

  const filteredMajors= majors.filter(major=> major.name.length <= 50)
  return filteredMajors;
}

export const scrapePddikti = async() => { 
  const browser = await puppeteer.launch({
    headless: false,
    userDataDir: './tmp'
  });

  const page = await browser.newPage();
  await page.setViewport({
    width: 1920,
    height: 1080,
    deviceScaleFactor: 1,
  })
  await page.goto('https://pddikti.kemdiktisaintek.go.id/perguruan-tinggi', {
    waitUntil: 'networkidle2',
    timeout: 0
  });

 
  await page.waitForSelector('.w-full.pt-5.flex.flex-wrap.gap-4.ml-2 > div');

  await page.waitForSelector('#\\:r8\\:'); 
  await page.click('#\\:r8\\:');
  

  await page.select('select[name="pagination"]', '48');

  const universities: UniversityCoba[] = [];

  while (true) { 
    await page.waitForSelector('div.relative.h-24.flex.items-center > div > div > p');
    
   
    await page.waitForFunction(() => {
      const el = document.querySelector('div.grid.grid-cols-2.gap-3.px-4.text-sm > div:nth-child(3) > p');
      return el && el.textContent?.trim() !== "...";
    });

  
    const productsHandles = await page.$$('.w-full.pt-5.flex.flex-wrap.gap-4.ml-2 > div');
    
    for (const productHandle of productsHandles) {
      const data = await page.evaluate(el => {
        if (!el) return { name: '', alamat: '', biaya: '', accred: '', major: '', passPercentage: '' };
    
        const titleElement = el.querySelector('div.relative.h-24.flex.items-center > div > div > p');
        const locationElement = el.querySelector('div.px-4.mt-1.text-sm > h5');
        const feeElement = el.querySelector('div:nth-child(3) > div > p');
        const accredElement = el.querySelector('div.grid.grid-cols-2.gap-3.px-4.text-sm > div:nth-child(1) > p');
        const majorElement = el.querySelector('div.grid.grid-cols-2.gap-3.px-4.text-sm > div:nth-child(2) > p');
        const passPercentageElement = el.querySelector('div.grid.grid-cols-2.gap-3.px-4.text-sm > div:nth-child(3) > p');
    
        return {
          name: titleElement?.textContent?.trim() || '',
          alamat: locationElement?.textContent?.trim() || '',
          biaya: feeElement?.textContent?.trim() || '',
          accred: accredElement?.textContent?.trim() || '',
          major: majorElement?.textContent?.trim() || '',
          passPercentage: passPercentageElement?.textContent?.trim() || ''
        };
      }, productHandle);
    
      universities.push(data);
    }

   
    const isNextDisabled = await page.evaluate(() => {
      const nextButton = document.querySelector('div.flex.align-end.items-center.justify-end.gap-1 > button:nth-child(3)');
      return nextButton?.hasAttribute('disabled') || false;
    });

    if (isNextDisabled) break;

    
await page.waitForSelector('div.flex.align-end.items-center.justify-end.gap-1 > button:nth-child(3)', { visible: true });


await page.click('div.flex.align-end.items-center.justify-end.gap-1 > button:nth-child(3)');

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
};





//gaisoo
export const cobaTiga = async () => { 
  const browser = await puppeteer.launch({
    headless: false,
    userDataDir: './tmp',
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });

  await page.goto('https://pddikti.kemdiktisaintek.go.id/perguruan-tinggi', {
    waitUntil: 'networkidle2',
    timeout: 0
  });

  
  await page.waitForSelector('.w-full.pt-5.flex.flex-wrap.gap-4.ml-2 > div');

  
  await page.select('select[name="pagination"]', '48');

  const allMajors: string[][] = []; 

  while (true) { 
    await page.waitForSelector('div.relative.h-24.flex.items-center > div > div > p');

    const universityHandles = await page.$$('.w-full.pt-5.flex.flex-wrap.gap-4.ml-2 > div');
    
    for (const universityHandle of universityHandles) {
      const detailButton = await universityHandle.$('div:nth-child(4) > div > button.border-\[1px\].border-primary-main.hover\:border-none.rounded-md.cursor-pointer.text-center.bg-neutral-10.hover\:bg-gradient-to-r.from-linear-main-1.to-linear-main-2.flex.justify-center.items-center.text-primary-main.hover\:text-neutral-10.w-\[200px\].h-14');
      
      if (detailButton) {
        await detailButton.click();
        await page.waitForNavigation({ waitUntil: 'networkidle2' });

       
        const majors = await page.evaluate(() => {
          return Array.from(document.querySelectorAll('div.px-6 > div:nth-child(2) > div > div > div > h1'))
            .map(el => el.textContent?.trim() || '');
        });

        allMajors.push(majors);

        
        await page.goBack();
        await page.waitForSelector('.w-full.pt-5.flex.flex-wrap.gap-4.ml-2 > div');
      }
    }

   
    const isNextDisabled = await page.evaluate(() => {
      const nextButton = document.querySelector('button img[alt="right"]');
      return nextButton?.closest('button')?.hasAttribute('disabled') || false;
    });

    if (isNextDisabled) break;

    await page.click('button img[alt="right"]');
    await page.waitForNavigation({ waitUntil: 'networkidle2' });
  }

  return allMajors;
};


//consumePython
export const pythonScrape= async(keyword: string) => {
   const BASE_URL= 'https://api-pddikti.kemdiktisaintek.go.id'
  //  const link= `${BASE_URL}/pt/search?nama=${encodeURIComponent(keyword)}`
  const link= `${BASE_URL}/pencarian/pt/${encodeURIComponent(keyword)}`
   const response= await axios.get(link, {
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
   console.log('link:', link)
  return response.data;
}