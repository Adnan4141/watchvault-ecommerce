import https from 'https';
import fs from 'fs';
import path from 'path';

const newAssets = [
  // Combo 1: Luxury Duo - Executive Watch + Stainless Bracelet
  {
    url: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&q=80',
    dest: 'public/images/products/combo-executive-duo.jpg'
  },
  // Combo 2: Couple Royal Gift Box
  {
    url: 'https://images.unsplash.com/photo-1513094735237-8f2714d57c13?w=800&q=80',
    dest: 'public/images/products/combo-royal-couple-box.jpg'
  },
  // Combo 3: Classic Leather & Chronograph Pack
  {
    url: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=800&q=80',
    dest: 'public/images/products/combo-vintage-chronograph.jpg'
  },
  // New Product: NAVIFORCE 9182 Military Sports Watch
  {
    url: 'https://images.unsplash.com/photo-1539185441755-769473a23570?w=800&q=80',
    dest: 'public/images/products/naviforce-9182-military.jpg'
  },
  // New Product: CURREN 8355 Luxury Chronograph Blue Dial
  {
    url: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=80',
    dest: 'public/images/products/curren-8355-chronograph.jpg'
  },
  // New Product: SKMEI 1628 Digital Sports Tactical Watch
  {
    url: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=800&q=80',
    dest: 'public/images/products/skmei-1628-tactical.jpg'
  },
  // New Product: Hannah Martin Minimalist Rose Gold Mesh
  {
    url: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&q=80',
    dest: 'public/images/products/hannah-martin-rosegold.jpg'
  },
  // Combo Banner
  {
    url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1200&q=80',
    dest: 'public/images/banners/combo-banner.jpg'
  }
];

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const fullDest = path.join(process.cwd(), dest);
    const file = fs.createWriteStream(fullDest);
    https.get(url, (response) => {
      if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
        https.get(response.headers.location, (res2) => {
          res2.pipe(file);
          file.on('finish', () => { file.close(); resolve(); });
        }).on('error', err => { fs.unlink(fullDest, () => {}); reject(err); });
      } else {
        response.pipe(file);
        file.on('finish', () => {
          file.close();
          resolve();
        });
      }
    }).on('error', (err) => {
      fs.unlink(fullDest, () => {});
      reject(err);
    });
  });
}

async function run() {
  console.log('Downloading ' + newAssets.length + ' new combo & product assets...');
  for (const item of newAssets) {
    try {
      await download(item.url, item.dest);
      console.log('✓ Downloaded:', item.dest);
    } catch (err) {
      console.error('✗ Failed:', item.dest, err.message);
    }
  }
  console.log('Finished downloading new assets!');
}

run();
