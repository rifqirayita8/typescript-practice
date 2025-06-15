import axios from 'axios';
import fs from 'fs';
import Papa from 'papaparse';
import * as cheerio from 'cheerio';
import puppeteer, { Browser, Page, ElementHandle } from 'puppeteer';
import { ScrapedMajor, ScrapedUniversity } from '../models/university.js';
import { UniversityCoba } from '../models/university.js';

export const scrapeUniversities= async() => {
  const url= 'https://sidatagrun-public-1076756628210.asia-southeast2.run.app/ptn_sb.php'

  const { data:mainHtml }= await axios.get(url);
  //iki podo karo = const response= await axios.get(url); \n const mainHtml= response.data;
  const $= cheerio.load(mainHtml);

  const universities:ScrapedUniversity[]= [];

  $('table tbody tr').each((index, element) => {
    // const nameElement= $(element).find('td:nth-child(3) a');
    const id= $(element).find('td:nth-child(2)').text().trim();
    const name= $(element).find('td:nth-child(3)').text().trim();
    const cleanedName= name.replace(/\n.*$/, '');
    const city= $(element).find('td:nth-child(4)').text().trim();
    const province= $(element).find('td:nth-child(5)').text().trim();
    // const detailUrl= url + nameElement.attr('href');

    universities.push({
      id,
      universityName: cleanedName,
      city,
      province
    });
  })

  // for (const university of universities) {
  //   if (university.detailUrl) {
  //     university.majors= await scrapeMajors(university.detailUrl);
  //   }
  // }
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

// const scrapeMajors= async(url:string) => {
//   const {data: detailHtml} = await axios.get(url);
//   const $= cheerio.load(detailHtml);

//   const majors:ScrapedMajor[]= [];
//   $('table tbody tr').each((index, element) => {
//     const name= $(element).find('td:nth-child(3)').text().trim();
//     console.log(name);
//     const quota= $(element).find('td:nth-child(5)').text().trim();
//     const applicants= $(element).find('td:nth-child(6)').text().trim();

//     if(name && !majors.some(major => major.name === name)) {
//       majors.push({
//         name,
//         quota,
//         applicants,
//       });
//     }
//   })

//   const filteredMajors= majors.filter(major=> major.name.length <= 50)
//   return filteredMajors;
// }



// const url= 'https://sidatagrun-public-1076756628210.asia-southeast2.run.app/ptn_sb.php'

// export const scrapeUniversities= async() => {
//     const { data } = await axios.get(url);
//     const $= cheerio.load(data);
    
//     const rows= $('table tbody tr');
//     const universities:ScrapedUniversity[]= [];

//     rows.each((index, row) => {
//       const columns= $(row).find('td');

//       if (columns.length > 0) {
//         const univName= $(columns[2]).text().trim();
//         const cleanedName= univName.replace(/\n.*$/, '');

//         const universityData= {
//           name: cleanedName,
//           city: $(columns[3]).text().trim(),
//           province: $(columns[4]).text().trim(),
//         };
//         universities.push(universityData);
//       }
//     });
//     return universities;
// }

interface PTN {
    name: string;
    location: string;
    accreditation: string;
    programCount: string;
}

export async function scrapePTN() {
  //   const browser: Browser = await puppeteer.launch({ headless: true }); // headless: true agar browser tidak muncul
  //   const page: Page = await browser.newPage();
    
  //   // Buka halaman URL
  //   await page.goto('https://pddikti.kemdiktisaintek.go.id/perguruan-tinggi', {
  //       waitUntil: 'domcontentloaded', // Tunggu hingga halaman dimuat
  //   });

  //   // Pilih filter PTN dengan klik (sesuaikan dengan selector elemen filter PTN)
  //   // const [inputElement] = await page.$x('//span[contains(text(), "PTN")]/following-sibling::input');
  //   // if (inputElement) {
  //   //     await inputElement.click();
  //   // } else {
  //   //     console.log('Elemen filter PTN tidak ditemukan');
  //   // }
  //   // await page.waitForSelector('1000')  // Tunggu sebentar agar filter diterapkan

  //   // Pilih jumlah data yang ditampilkan per halaman, misalnya 48


  //   // Ambil data PTN setelah interaksi
  //   const ptnData: PTN[] = await page.evaluate(() => {
  //     const ptnList: PTN[] = [];
  //     const items = document.querySelectorAll('.w-[302px].h-[380px].flex.flex-col');
      
  //     items.forEach(item => {
  //         const name = item.querySelector('p.text-black') ? (item.querySelector('p.text-black') as HTMLElement).innerText : '';
  //         const location = item.querySelector('h5.line-clamp-2') ? (item.querySelector('h5.line-clamp-2') as HTMLElement).innerText : '';
  //         const accreditation = item.querySelector('.flex.items-center.gap-2 > p') ? (item.querySelector('.flex.items-center.gap-2 > p') as HTMLElement).innerText : '';
  //         const programCount = item.querySelector('.flex.items-center.gap-2 > p:nth-child(2)') ? (item.querySelector('.flex.items-center.gap-2 > p:nth-child(2)') as HTMLElement).innerText : '';

  //         ptnList.push({ name, location, accreditation, programCount });
  //     });

  //     return ptnList;
  // });

  //   await browser.close(); // Tutup browser setelah selesai

}

// export const scrapeCoba= async() => {
//   const browser= await puppeteer.launch({
//     headless: true,
//   })
//   const page= await browser.newPage();
//   await page.goto('https://pddikti.kemdiktisaintek.go.id/perguruan-tinggi')

//   const ptnHandles= await page.$$('w-full pt-5 flex flex-wrap gap-4 ml-2')

//   for (const ptnHandle of ptnHandles) {
//     try {
//       const ptnName= await page.evaluate(el => el.querySelector('div.px-4.mt-1.text-sm > h5')?.textContent, ptnHandle)
//       if(ptnName) console.log(ptnName);
//     } catch(e) {

//     }
//   } 
// }

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

  //container
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

    // Ambil semua universitas di halaman ini
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

    // Cek apakah tombol "Next" aktif
    const isNextDisabled = await page.evaluate(() => {
      const nextButton = document.querySelector('div.flex.align-end.items-center.justify-end.gap-1 > button:nth-child(3)');
      return nextButton?.hasAttribute('disabled') || false;
    });

    if (isNextDisabled) break; // Keluar dari loop jika tidak bisa next

    // Klik tombol Next
    // Tunggu tombol "Next" muncul sebelum klik
await page.waitForSelector('div.flex.align-end.items-center.justify-end.gap-1 > button:nth-child(3)', { visible: true });

// Klik tombol Next
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

  // Tunggu container utama
  await page.waitForSelector('.w-full.pt-5.flex.flex-wrap.gap-4.ml-2 > div');

  // Pilih pagination 48 per halaman
  await page.select('select[name="pagination"]', '48');

  const allMajors: string[][] = []; // Array untuk menyimpan jurusan per universitas

  while (true) { 
    await page.waitForSelector('div.relative.h-24.flex.items-center > div > div > p');

    const universityHandles = await page.$$('.w-full.pt-5.flex.flex-wrap.gap-4.ml-2 > div');
    
    for (const universityHandle of universityHandles) {
      const detailButton = await universityHandle.$('div:nth-child(4) > div > button.border-\[1px\].border-primary-main.hover\:border-none.rounded-md.cursor-pointer.text-center.bg-neutral-10.hover\:bg-gradient-to-r.from-linear-main-1.to-linear-main-2.flex.justify-center.items-center.text-primary-main.hover\:text-neutral-10.w-\[200px\].h-14');
      
      if (detailButton) {
        await detailButton.click();
        await page.waitForNavigation({ waitUntil: 'networkidle2' });

        // Ambil jurusan dari halaman detail
        const majors = await page.evaluate(() => {
          return Array.from(document.querySelectorAll('div.px-6 > div:nth-child(2) > div > div > div > h1'))
            .map(el => el.textContent?.trim() || '');
        });

        allMajors.push(majors);

        // Kembali ke halaman utama
        await page.goBack();
        await page.waitForSelector('.w-full.pt-5.flex.flex-wrap.gap-4.ml-2 > div');
      }
    }

    // Cek apakah tombol "Next" masih bisa diklik
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