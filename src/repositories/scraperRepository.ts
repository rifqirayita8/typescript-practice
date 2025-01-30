import axios from 'axios';
import * as cheerio from 'cheerio';
import { ScrapedMajor, ScrapedUniversity } from '../models/university.js';

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
      province,
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