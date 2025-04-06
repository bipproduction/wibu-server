/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import * as cheerio from 'cheerio';

async function scrapeJadwalAnoboy() {
  const url = 'https://ww1.anoboy.app/';
  
  // Header yang menyerupai browser Chrome
  const headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
    'Accept-Language': 'en-US,en;q=0.9',
    'Accept-Encoding': 'gzip, deflate, br',
    'Connection': 'keep-alive',
    'Upgrade-Insecure-Requests': '1',
    'Sec-Fetch-Dest': 'document',
    'Sec-Fetch-Mode': 'navigate',
    'Sec-Fetch-Site': 'none',
    'Sec-Fetch-User': '?1',
  };

  try {
    const { data: html } = await axios.get(url, { headers });
    const $ = cheerio.load(html);
    const hasil: any[] = [];

    console.log($('#jadwal').html())

    $('#jadwal table tbody tr').each((_, el) => {
      const $el = $(el);
      const title = $el.find('td a').text().trim();
      const link = $el.find('td a').attr('href') || '';
      const day = $el.find('td').eq(1).text().trim();
      const time = $el.find('td').eq(2).text().trim();

      // Menentukan URL gambar berdasarkan judul
      let img = '';
      if (link) {
        const imgSlug = title
          .replace(/[^a-zA-Z0-9\s]/g, '')
          .replace(/\s+/g, '%20');
        img = `/img/upload/01as-${imgSlug}.jpg`;
      }

      if (title && day && time) {
        hasil.push({ title, day, time, link, img });
      }
    });

    // console.log(hasil);
    return hasil;

  } catch (err) {
    console.error('Gagal mengambil data:', err);
  }
}

scrapeJadwalAnoboy();