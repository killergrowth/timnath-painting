#!/usr/bin/env node
/**
 * gen-sitemap.js — Timnath Painting
 * Wrapper around kg-site-builder/lib/gen-sitemap.js.
 * Run manually any time to regenerate the sitemap:
 *   node gen-sitemap.js
 *
 * Also called automatically at the end of node build.js.
 */

const path = require('path');
const { generateSitemap } = require('C:\\Users\\KillerGrowth\\.openclaw\\workspace\\tools\\kg-site-builder\\lib\\gen-sitemap');

const DIST   = path.join(__dirname, 'dist');
const DOMAIN = 'timnathpainting.com';

const result = generateSitemap({ distDir: DIST, siteRoot: __dirname, domain: DOMAIN });
console.log(`sitemap.xml generated — ${result.count} URLs (${DOMAIN})`);
