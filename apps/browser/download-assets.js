const tar = require('tar');
const fs = require('fs');

const NPM_URL = 'https://registry.npmjs.org';

const FFMPEG_VERSION = '0.12.2';
const UTIL_VERSION = '0.12.0';
const CORE_VERSION = '0.12.1';

const FFMPEG_TGZ = `ffmpeg-${FFMPEG_VERSION}.tgz`;
const UTIL_TGZ = `util-${UTIL_VERSION}.tgz`;
const CORE_TGZ = `core-${CORE_VERSION}.tgz`;

const FFMPEG_TGZ_URL = `${NPM_URL}/@ffmpeg/ffmpeg/-/${FFMPEG_TGZ}`;
const UTIL_TGZ_URL = `${NPM_URL}/@ffmpeg/util/-/${UTIL_TGZ}`;
const CORE_TGZ_URL = `${NPM_URL}/@ffmpeg/core/-/${CORE_TGZ}`;

const downloadAndUntar = async (url, tgzName, dst) => {
  console.log(`download and untar ${url}`);
  fs.mkdirSync(dst);
  const data = Buffer.from(await (await fetch(url)).arrayBuffer());
  fs.writeFileSync(tgzName, data);

  await tar.x({ file: tgzName, C: dst });
};

(async () => {
  await downloadAndUntar(FFMPEG_TGZ_URL, FFMPEG_TGZ, 'assets/ffmpeg');
  await downloadAndUntar(UTIL_TGZ_URL, UTIL_TGZ, 'assets/util');
  await downloadAndUntar(CORE_TGZ_URL, CORE_TGZ, 'assets/core');
})();