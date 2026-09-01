'use strict';
const { google } = require('googleapis');
const fs = require('fs');

const raw = fs.readFileSync('C:\\Users\\KillerGrowth\\.openclaw\\credentials\\google-service-account.json', 'utf8');
const key = JSON.parse(raw.charCodeAt(0) === 0xFEFF ? raw.slice(1) : raw);

const auth = new google.auth.JWT({
  email: key.client_email,
  key: key.private_key,
  scopes: ['https://www.googleapis.com/auth/gmail.modify'],
  subject: 'tylerbrickley@killergrowth.com'
});

const gmail = google.gmail({ version: 'v1', auth });

async function run() {
  const list = await gmail.users.messages.list({
    userId: 'me',
    q: 'from:fathom newer_than:1d',
    maxResults: 20
  });

  const messages = list.data.messages || [];
  if (!messages.length) { console.log('NO_RESULTS'); return; }

  // First pass: just list subjects
  for (const m of messages) {
    const msg = await gmail.users.messages.get({ userId: 'me', id: m.id, format: 'metadata', metadataHeaders: ['Subject', 'Date'] });
    const headers = msg.data.payload.headers;
    const subject = headers.find(h => h.name === 'Subject')?.value;
    const date = headers.find(h => h.name === 'Date')?.value;
    console.log(`[${m.id}] ${date} | ${subject}`);
  }
}

run().catch(e => console.error('ERROR:', e.message));
