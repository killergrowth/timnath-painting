'use strict';
const { google } = require('googleapis');
const { OAuth2Client } = require('google-auth-library');
const tokenData = require('C:/Users/KillerGrowth/.openclaw/workspace/google-token.json');
const credsData = require('C:/Users/KillerGrowth/.openclaw/workspace/google-oauth-creds.json');

const auth = new OAuth2Client(credsData.client_id, credsData.client_secret);
auth.setCredentials(tokenData);

const drive = google.drive({ version: 'v3', auth });

async function main() {
  // Search for Timnath folders
  const folders = await drive.files.list({
    q: "mimeType='application/vnd.google-apps.folder' and name contains 'Timnath'",
    fields: 'files(id, name, parents)',
    pageSize: 20,
    includeItemsFromAllDrives: true,
    supportsAllDrives: true
  });
  console.log('Timnath folders:', JSON.stringify(folders.data.files, null, 2));

  // Search for Josh Walkthrough video
  const videos = await drive.files.list({
    q: "name contains 'Josh' and name contains 'Walkthrough'",
    fields: 'files(id, name, mimeType, size, parents, webViewLink)',
    pageSize: 20,
    includeItemsFromAllDrives: true,
    supportsAllDrives: true
  });
  console.log('\nJosh Walkthrough files:', JSON.stringify(videos.data.files, null, 2));

  // Broader video search
  const broader = await drive.files.list({
    q: "name contains 'Josh' and name contains 'Project'",
    fields: 'files(id, name, mimeType, size, parents, webViewLink)',
    pageSize: 20,
    includeItemsFromAllDrives: true,
    supportsAllDrives: true
  });
  console.log('\nJosh Project files:', JSON.stringify(broader.data.files, null, 2));

  // Also just search for any video in shared drives
  const anyVid = await drive.files.list({
    q: "mimeType contains 'video/' and name contains 'Walkthrough'",
    fields: 'files(id, name, mimeType, size, parents, webViewLink)',
    pageSize: 20,
    includeItemsFromAllDrives: true,
    supportsAllDrives: true
  });
  console.log('\nWalkthrough videos:', JSON.stringify(anyVid.data.files, null, 2));
}

main().catch(e => { console.error(e.message); process.exit(1); });
