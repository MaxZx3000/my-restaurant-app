const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const target = path.resolve(__dirname, 'src/public/images/heros');
const destination = path.resolve(__dirname, 'dist/images');

if (!fs.existsSync(destination)) {
  fs.mkdirSync(destination);
}

fs.readdirSync(target)
    .forEach(async (image) => {
      const largeImagePath = path.resolve(__dirname,
          `${destination}/${image.split('.')
              .slice(0, -1)
              .join('.')}-large.webp`);

      const smallImagePath = path.resolve(__dirname,
          `${destination}/${image.split('.')
              .slice(0, -1)
              .join('.')}-small.webp`);

      sharp(`${target}/${image}`)
          .resize(800)
          .webp({quality: 5})
          .toFile(largeImagePath);

      sharp(`${target}/${image}`)
          .resize(480)
          .webp({quality: 5})
          .toFile(smallImagePath);
    });
