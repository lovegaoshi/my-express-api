const https = require('https');
const fs = require('fs');
const { execSync } = require('child_process');

const REMOTE_PKG_URL = 'https://raw.githubusercontent.com/lovegaoshi/azusa-player-mobile/refs/heads/master/package.json';
const LOCAL_PKG_PATH = './package.json';

function fetchRemotePackageJson(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode !== 200) {
        reject(new Error(`Failed to fetch: ${res.statusCode}`));
        return;
      }
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (err) {
          reject(err);
        }
      });
    }).on('error', reject);
  });
}

async function updateYoutubeiVersion() {
  try {
    console.log('Fetching remote package.json...');
    const remotePkg = await fetchRemotePackageJson(REMOTE_PKG_URL);
    const remoteYoutubeiVersion = remotePkg.dependencies?.['youtubei.js'] || remotePkg.devDependencies?.['youtubei.js'];

    if (!remoteYoutubeiVersion) {
      throw new Error('youtubei.js not found in remote package.json');
    }

    console.log(`Remote youtubei.js version: ${remoteYoutubeiVersion}`);

    const localPkg = JSON.parse(fs.readFileSync(LOCAL_PKG_PATH, 'utf8'));

    if (localPkg.dependencies?.['youtubei.js']) {
      localPkg.dependencies['youtubei.js'] = remoteYoutubeiVersion;
      console.log(`Updated dependencies.youtubei.js to ${remoteYoutubeiVersion}`);
    } else if (localPkg.devDependencies?.['youtubei.js']) {
      localPkg.devDependencies['youtubei.js'] = remoteYoutubeiVersion;
      console.log(`Updated devDependencies.youtubei.js to ${remoteYoutubeiVersion}`);
    } else {
      throw new Error('youtubei.js not found in local package.json');
    }

    fs.writeFileSync(LOCAL_PKG_PATH, JSON.stringify(localPkg, null, 2) + '\n');
    console.log('Updated local package.json');

    console.log('Running yarn to install/update dependencies...');
    execSync('yarn install', { stdio: 'inherit' });
    console.log('Done!');
  } catch (err) {
    console.error('Error:', err.message);
    process.exit(1);
  }
}

updateYoutubeiVersion();
