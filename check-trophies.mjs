// Count check for trophies.json — run: node check-trophies.mjs
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { join, dirname } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const data = JSON.parse(readFileSync(join(here, 'app/data/trophies.json'), 'utf8'));

const EXPECTED = [
  'Vice Got a Price!','A Long Road','Cunning Stunts','The Shootist','Maximum Withdrawal',
  'Strangers & Freaks',"Don't Touch My Deck",'You WAiNKer!','Master of None','Earn Cash, Not Kudos',
  'Hot Together','Retail Therapy','Whip It Good','The Goodtime State','Pest Control',
  'Dime on the Dollar','Top Fun','Treat Yo Self','Little Boxes','On the Spot','Baited My Tackle',
  'Stick Fiddler','Positive Mental Attitude','Gunslinger','Sneakthief','A Classic Blitz Play',
  'One Last Thing','Just Like Paradise','Paradise Lost','T**s Ass Drug Money','Vice City, Baby!',
  'Top Of The World, Ma','You Gotta Know When to Get Off','Trust','Break the Bank',
  'Family Matters','DWNFALL','Hi-Jacked','Snow Storm','This Was No Boat Accident','The Lone Rider',
  'Road to Rehabilitation','Supply & Demand','Spin On This!','Fair Game','Catch Me If You Can',
  'Challenging Tank',"Let's Go Bowling",'Personal Best','Actions Speak Louder','In The Beginning…',
  'Capital Offense','Bad Luck, I Guess','The Truth Is Out There','Ten Pin',
];

let fail = 0;
const check = (label, ok, detail = '') => {
  console.log(`${ok ? 'PASS' : 'FAIL'} ${label} ${detail}`);
  if (!ok) fail++;
};

check('count == 55', data.length === 55, `(${data.length})`);
const names = data.map((t) => t.name);
const missing = EXPECTED.filter((n) => !names.includes(n));
const extra = names.filter((n) => !EXPECTED.includes(n));
check('names match table exactly', missing.length === 0 && extra.length === 0,
  missing.length ? `missing: ${missing.join(' | ')}` : extra.length ? `extra: ${extra.join(' | ')}` : '(55/55)');
const grades = {};
for (const t of data) grades[t.grade] = (grades[t.grade] || 0) + 1;
check('grades 1P/2G/6S/46B', grades.Platinum === 1 && grades.Gold === 2 && grades.Silver === 6 && grades.Bronze === 46,
  JSON.stringify(grades));
const gs = data.reduce((a, t) => a + t.gamerscore, 0);
check('gamerscore sums to 1000', gs === 1000, `(${gs})`);
check('hidden count 28', data.filter((t) => t.hidden).length === 28, `(${data.filter((t) => t.hidden).length})`);
check('all have steps with citations', data.every((t) => t.steps.length > 0 && t.steps.every((s) => s.s && s.s.length > 0)), '');
check('ids 1..55 unique', new Set(data.map((t) => t.id)).size === 55, '');
check('missable only #23', data.filter((t) => t.missable).map((t) => t.id).join(',') === '23', '');
check('disputed only #23', data.filter((t) => t.disputed).map((t) => t.id).join(',') === '23', '');
check('unconfirmed count 7', data.filter((t) => t.unconfirmed).length === 7, `(${data.filter((t) => t.unconfirmed).length})`);
let steps = 0, cited = 0;
for (const t of data) for (const s of t.steps) { steps++; if (s.s && s.s.length) cited++; }
check('steps cited', cited === steps, `(${cited}/${steps})`);
const twoPlus = data.filter((t) => new Set(t.steps.flatMap((s) => s.s)).size >= 2);
check('backed by 2+ sources (54; #23 cites PowerPyx only — the meditation detail comes from [3] alone)', twoPlus.length === 54, `(${twoPlus.length}/55; single-source: ${data.filter((t) => new Set(t.steps.flatMap((s) => s.s)).size < 2).map((t) => t.id).join(',')})`);
process.exit(fail ? 1 : 0);
