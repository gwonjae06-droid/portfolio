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
  assert.match(javascript, /https:\/\/gwonjae06-droid\.github\.io\/ochams-3d-battle\//);
  assert.match(css, /@media\(max-width:600px\)/);
});

test('existing water engine and interaction entry point remain linked', () => {
  assert.match(html, /src="\.\/experience\.js"/);
  assert.match(html, /id="water"/);
  assert.match(html, /id="abyss"/);
  assert.match(html, /id="floater"/);
});
