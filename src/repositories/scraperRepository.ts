import axios from 'axios';
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

export const cobaDua = async() => { 
  const browser= await puppeteer.launch({
    headless: false,
    userDataDir: './tmp'
  })
  const page= await browser.newPage();
  await page.goto('https://pddikti.kemdiktisaintek.go.id/perguruan-tinggi', {
    waitUntil: 'networkidle2',
    timeout: 0
  })


  await page.waitForSelector('.w-full.pt-5.flex.flex-wrap.gap-4.ml-2 > div')
  await page.evaluate(() => {
    document.getElementById(':r8:')?.click();
  });
  await page.select('select[name="pagination"]', '48')
  await page.waitForSelector('div.relative.h-24.flex.items-center > div > div > p')

  const productsHandles= await page.$$('.w-full.pt-5.flex.flex-wrap.gap-4.ml-2 > div')
  try {
    const universities:UniversityCoba[]= [];
    for(const productHandle of productsHandles) {
      const title= await page.evaluate(el => el.querySelector('div.relative.h-24.flex.items-center > div > div > p')?.textContent, productHandle)
      if (title) {
        universities.push({
          name: title
        })
      } else {
        universities.push({
          name: "Undefined"
        })
      }
      console.log(title)
    }
    return universities;
  } catch(e) {
    console.log(e)
  }
}
