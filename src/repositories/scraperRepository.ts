import axios from 'axios';
import * as cheerio from 'cheerio';
import { ScrapedUniversity } from '../models/university.js';

const url= 'https://sidatagrun-public-1076756628210.asia-southeast2.run.app/ptnENEN_sb.php'

export async function scrapeUniversities() {
    const { data } = await axios.get(url);
    const $= cheerio.load(data);
    
    const rows= $('table tbody tr');
    const universities:ScrapedUniversity[]= [];

    rows.each((index, row) => {
      const columns= $(row).find('td');

      if (columns.length > 0) {
        const univName= $(columns[2]).text().trim();
        const cleanedName= univName.replace(/\n.*$/, '');

        const universityData= {
          name: cleanedName,
          city: $(columns[3]).text().trim(),
          province: $(columns[4]).text().trim(),
        };
        universities.push(universityData);
      }
    });
    return universities;
}