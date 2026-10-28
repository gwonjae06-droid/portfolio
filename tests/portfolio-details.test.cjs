const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.join(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const javascript = fs.readFileSync(path.join(root, 'portfolio-details.js'), 'utf8');
const css = fs.readFileSync(path.join(root, 'portfolio-upgrade.css'), 'utf8');

test('four project cards offer an accessible case-study dialog', () => {
  const triggers = [...html.matchAll(/class="project-detail-button" data-project="([^"]+)" aria-haspopup="dialog"/g)];
  assert.deepEqual(triggers.map(m => m[1]), ['games', 'mindscape', 'diary', 'campus']);
  assert.match(html, /<dialog id="projectDialog"[^>]+aria-labelledby="detailTitle"/);
  assert.match(html, /id="projectDialogClose"/);
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(m => m[1]);
  assert.equal(ids.length, new Set(ids).size, 'DOM IDs must be unique');
  for (const id of ['detailKicker','detailTitle','detailSummary','detailTags',
     'detailWhy','detailFeatures','detailDecisions','detailStatus',
     'detailSubprojects','detailLinks','previewHeading','previewLoad',
     'previewHost','previewNote']) assert.ok(ids.includes(id), 'Missing '+id);
});

test('live previews are opt-in, while private diary entries are not embedded', () => {
  assert.match(javascript, /if\(!p\|\|!p\.preview\)return/);
  assert.match(javascript, /preview:null,previewTitle:'내 인생 다이어리'/);
  assert.match(javascript, /frame\.src=p\.preview/);
  assert.match(javascript, /byId\('previewHost'\)\.replaceChildren\(\); \/\/ stop a loaded iframe/);
  assert.doesNotMatch(html, /<iframe/i, 'iframes must be created only on request');
  assert.match(javascript, /dialog\.showModal\(\)/);
  assert.match(javascript, /dialog\.addEventListener\('close'/);
});

test('real public project and building pages are documented', () => {
  for (const id of ['process','connect','projects','interests','depths']) {
    assert.match(html, new RegExp('id="'+id+'"'));
  }
  assert.match(html, /WebGL · JavaScript · Wave simulation/);
  assert.match(html, /Dream big\./);
  assert.match(javascript, /https:\/\/gwonjae06-droid\.github\.io\/mindscape\//);
  assert.match(javascript, /https:\/\/gwonjae06-droid\.github\.io\/oibung-ballfight-base\//);
  assert.match(css, /@media\(max-width:600px\)/);
});

test('existing water engine and interaction entry point remain linked', () => {
  assert.match(html, /src="\.\/experience\.js"/);
  assert.match(html, /id="water"/);
  assert.match(html, /id="abyss"/);
  assert.match(html, /id="floater"/);
});

test('game section links only to the playable Oibung Arena; all other games show development status', () => {
  const start = html.indexOf('<a class="project-art game-art"');
  const nextCard = html.indexOf('<article class="project">', start);
  const gameCard = html.slice(start, nextCard);
  const playUrl = 'https://gwonjae06-droid.github.io/oibung-ballfight-base/';
  assert.ok(start > -1 && nextCard > start);
  const urls = [...gameCard.matchAll(/href="([^"]+)"/g)].map(m => m[1]);
  assert.deepEqual(urls, [playUrl, playUrl], 'artwork and game play link point to Oibung Arena only');
  for (const name of ['OChams 3D Battle', 'CAMPUS LEGENDS', 'Oibung Trials']) {
    assert.match(gameCard, new RegExp(name + ' · 개발 중'));
  }
  assert.equal((gameCard.match(/class="game-in-development"/g) || []).length, 3);
  assert.match(gameCard, /오이붕 아레나 플레이/);
});

test('game case-study previews Oibung Arena and never links to developing games', () => {
  const gameStart = javascript.indexOf(' games:{');
  const next = javascript.indexOf(' mindscape:{', gameStart);
  const games = javascript.slice(gameStart, next);
  assert.ok(gameStart >= 0 && next > gameStart);
  assert.match(games, /preview:'https:\/\/gwonjae06-droid\.github\.io\/oibung-ballfight-base\/'/);
  const urls = [...games.matchAll(/https?:\/\/[^'"]+/g)].map(m => m[0]);
  assert.deepEqual(urls, [
    'https://gwonjae06-droid.github.io/oibung-ballfight-base/',
    'https://gwonjae06-droid.github.io/oibung-ballfight-base/'
  ]);
  assert.ok(!games.includes('ochams-3d-battle'));
  assert.ok(!games.includes('github.com/gwonjae06-droid/campus-legends'));
  assert.ok(!games.includes('github.com/gwonjae06-droid/oibung-trials'));
  for (const name of ['OChams 3D Battle', 'CAMPUS LEGENDS', 'Oibung Trials']) {
    assert.ok(games.includes("['" + name + "','개발 중','']"));
  }
  assert.match(javascript, /if\(desc\)card\.append\(make\('p','',desc\)\)/);
});
