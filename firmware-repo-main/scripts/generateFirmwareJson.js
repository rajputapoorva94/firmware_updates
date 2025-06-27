const fs = require("fs");
const axios = require("axios");

const owner = "rajputapoorva94";
const repo = "firmware-repo";

async function fetchReleases() {
  const releasesUrl = `https://api.github.com/repos/${owner}/${repo}/releases`;
  const response = await axios.get(releasesUrl, {
    headers: { "Accept": "application/vnd.github+json" }
  });
  return response.data;
}

async function main() {
  const releases = await fetchReleases();
  const firmwareData = {};

  releases.forEach(release => {
    release.assets.forEach(asset => {
      // Assuming asset names like firmware-deviceA.bin
      const match = asset.name.match(/^firmware-(.+)\.bin$/);
      if (match) {
        const device = match[1];
        if (!firmwareData[device]) {
          firmwareData[device] = [];
        }
        firmwareData[device].push({
          version: release.tag_name,
          url: asset.browser_download_url,
          published_at: release.published_at
        });
      }
    });
  });

  fs.writeFileSync("docs/firmware.json", JSON.stringify(firmwareData, null, 2));
  console.log("firmware.json updated!");
}

main().catch(console.error);
