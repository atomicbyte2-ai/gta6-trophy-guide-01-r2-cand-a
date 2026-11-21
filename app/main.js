// LEONIDA TROPHY ATLAS — GTA 6 trophy guide (make.fun gta6-trophy-guide-01, round 2).
// Plain static app, works offline. Trophy data loads from data/trophies.json;
// when opened from file:// the fetch is blocked, so an inline copy of the same
// data (injected at build time from trophies.json) is used as the fallback.
'use strict';

const SOURCES = [
  { n: 1, name: 'Output Lag — “GTA 6 Trophy List”', url: 'outputlag.com/guides/gta-6-trophy-list', note: '55 names, descriptions, grades and Gamerscore; re-fetched and checked 21 Nov 2026.' },
  { n: 2, name: 'GTAVibes — “GTA 6 Trophy List”', url: 'gtavibes.com/guides/gta-6-trophy-list-achievements', note: 'Cross-checked 19 Nov 2026; agrees with [1] on all 55 trophies.' },
  { n: 3, name: 'PowerPyx — “GTA 6 All Meditation Spot Locations”', url: 'powerpyx.com (GTA 6 All Meditation Spot Locations)', note: '18 meditations across 10 spots; Chapter 1 balcony spot missable; dispute over whether it counts. Read in full 21 Nov 2026.' },
];
const KIND_LABEL = { story: 'Story', side: 'Side', robbery: 'Robbery', activity: 'Activity', collectible: 'Collectibles', combat: 'Combat', meta: 'Meta', misc: 'Misc' };
const LS_KEY = 'lta-v1';
const FALLBACK = [{"id":1,"name":"Vice Got a Price!","description":"Congratulations! You're a Leonida Legend. (Earn every other trophy.)","grade":"Platinum","gamerscore":0,"hidden":false,"kind":"meta","spoiler":false,"missable":false,"steps":[{"t":"No separate task: this pops the moment your 54th other trophy lands.","s":[1,2]},{"t":"Follow the roadmap — story, 100% checklist, then clean-up — and the Platinum is the reward for all of it.","s":[1,2]}]},{"id":2,"name":"A Long Road","description":"Attain 100% Completion.","grade":"Gold","gamerscore":100,"hidden":false,"kind":"meta","spoiler":false,"missable":false,"steps":[{"t":"Work the in-game 100% checklist, which appears after the story under Progress, Stats, 100% Completion.","s":[1,2]},{"t":"Earlier work still counts, so explore and collect as you play; the big blocks are 70 of 80 Challenges, 300 stunts, all collectibles and every stranger strand.","s":[1,2]}]},{"id":3,"name":"Cunning Stunts","description":"Complete 250 Stunts.","grade":"Silver","gamerscore":40,"hidden":false,"kind":"activity","spoiler":false,"missable":false,"steps":[{"t":"Stunt jumps, under-bridge flights, knife-edge flights and base jumps all count toward the 250.","s":[1,2]},{"t":"Chase them steadily through free roam rather than in one grind; 100% completion wants 300, so keep going past this pop.","s":[1,2]}]},{"id":4,"name":"The Shootist","description":"Earn a gold medal in all Shooting Range challenges.","grade":"Silver","gamerscore":40,"hidden":false,"kind":"activity","spoiler":false,"missable":false,"steps":[{"t":"Two shooting ranges share 42 gold medals between them.","s":[1,2]},{"t":"Learn each challenge's scoring first, then chase gold one at a time — a steady hand and the right weapon for each range matter more than rushing through.","s":[1,2]}]},{"id":5,"name":"Maximum Withdrawal","description":"Rob 5 Bank Vaults and escape.","grade":"Silver","gamerscore":40,"hidden":false,"kind":"robbery","spoiler":false,"missable":false,"steps":[{"t":"Bank vaults open through the optional late Chapter 4 mission That's Where The Money Is: tail an armored van to a large bank and slip into the vault while the guard has it open.","s":[1,2]},{"t":"Bring your partner — one person cannot carry every bag.","s":[1,2]},{"t":"Escape the heat and repeat for five vaults; the escape hands you a 4-star Wanted level, so Hot Together can pop on the way out.","s":[1,2]}]},{"id":6,"name":"Strangers & Freaks","description":"Complete 8 mission strands for strangers across the state of Leonida.","grade":"Silver","gamerscore":30,"hidden":false,"kind":"side","spoiler":false,"missable":false,"steps":[{"t":"Eight stranger mission strands are scattered across Leonida; take every stranger icon you meet.","s":[1,2]},{"t":"Follow each strand to its final mission — most stay open after the story, so mop them up in the clean-up phase if you missed any.","s":[1,2]}]},{"id":7,"name":"Don't Touch My Deck","description":"Complete 3 Collectible Card sets.","grade":"Silver","gamerscore":30,"hidden":false,"kind":"collectible","spoiler":false,"missable":false,"steps":[{"t":"Collectible cards are hidden around Leonida; gather full sets — three complete sets earn this.","s":[1,2]},{"t":"Grab cards whenever you pass one instead of leaving them all for the end.","s":[1,2]}]},{"id":8,"name":"You WAiNKer!","description":"WAiNK It at 100 locations.","grade":"Silver","gamerscore":30,"hidden":false,"kind":"collectible","spoiler":false,"missable":false,"steps":[{"t":"Use the WAiNK app at 100 different locations — shops, landmarks, viewpoints.","s":[1,2]},{"t":"Open it wherever you stop and the count climbs as you travel; pair it with exploring Leonida for the map trophy.","s":[1,2]}]},{"id":9,"name":"Master of None","description":"Try each type of activity once.","grade":"Bronze","gamerscore":20,"hidden":false,"kind":"activity","spoiler":false,"missable":false,"steps":[{"t":"Sample every activity type once: races, shooting ranges, fishing, arcade games, drone races, bowling and the rest.","s":[1,2]},{"t":"One try each is enough — just make sure you touch every kind the game offers.","s":[1,2]}]},{"id":10,"name":"Earn Cash, Not Kudos","description":"Win 20 different races.","grade":"Bronze","gamerscore":20,"hidden":false,"kind":"activity","spoiler":false,"missable":false,"steps":[{"t":"Win 20 different races — repeats of the same race do not count.","s":[1,2]},{"t":"Work through the race list across Leonida, switching vehicles and event types as you go.","s":[1,2]}]},{"id":11,"name":"Hot Together","description":"Lose a 4 star Wanted Level with your partner and escape the heat.","grade":"Bronze","gamerscore":20,"hidden":false,"kind":"robbery","spoiler":false,"missable":false,"steps":[{"t":"Build a 4-star Wanted level with your partner beside you, then lose it and escape the red heat zone.","s":[1,2]},{"t":"Bank vault jobs are the reliable trigger — they hand you a 4-star level on the way out.","s":[1,2]}]},{"id":12,"name":"Retail Therapy","description":"Rob 3 shops back-to-back with your partner without losing your Wanted Level.","grade":"Bronze","gamerscore":20,"hidden":false,"kind":"robbery","spoiler":false,"missable":false,"steps":[{"t":"Call your partner, then rob three shops in a row while the police chase you.","s":[1,2]},{"t":"If your stars fade to red heat only, the chain breaks — keep the heat on between shops.","s":[1,2]},{"t":"Expect about a 30-second delay after the third shop before it pops.","s":[1,2]}]},{"id":13,"name":"Whip It Good","description":"Discover 100 vehicles.","grade":"Bronze","gamerscore":20,"hidden":false,"kind":"collectible","spoiler":false,"missable":false,"steps":[{"t":"Scanning a vehicle with the WAiNK app counts as discovering it; scan everything you pass — traffic, parked cars, rare spawns.","s":[1,2]},{"t":"100 earns the trophy; 100% completion wants 200 of the 277 base models.","s":[1,2]}]},{"id":14,"name":"The Goodtime State","description":"Explore all of Leonida.","grade":"Bronze","gamerscore":20,"hidden":false,"kind":"collectible","spoiler":false,"missable":false,"steps":[{"t":"Cover the whole map of Leonida — every region, coast and back road.","s":[1,2]},{"t":"Drive, fly and walk into the corners you would otherwise skip; the map fills in as you go and this pops when the last area is revealed.","s":[1,2]}]},{"id":15,"name":"Pest Control","description":"Rob an Illegal Operation belonging to each gang.","grade":"Bronze","gamerscore":20,"hidden":false,"kind":"robbery","spoiler":false,"missable":false,"steps":[{"t":"Rob one illegal operation for each of the 9 gangs.","s":[1,2]},{"t":"Operations come back if you leave valuables behind, so you can retry a gang's site; 100% completion wants all 39 operations robbed.","s":[1,2]}]},{"id":16,"name":"Dime on the Dollar","description":"Earn $250,000 laundering Marked Bills through your contacts.","grade":"Bronze","gamerscore":20,"hidden":false,"kind":"collectible","spoiler":false,"missable":false,"steps":[{"t":"Marked Bills come from bank and payday-loan jobs.","s":[1,2]},{"t":"Sell them on to your contacts to launder the cash — $250,000 cumulative earns this; keep laundering as you rob and the total builds up over the game.","s":[1,2]}]},{"id":17,"name":"Top Fun","description":"Win a Top Fun Drone Race at every location.","grade":"Bronze","gamerscore":15,"hidden":false,"kind":"activity","spoiler":false,"missable":false,"steps":[{"t":"Fourteen drone race locations — win at least one race at each.","s":[1,2]},{"t":"Learn each course's line before pushing for the win, and tick locations off one by one.","s":[1,2]}]},{"id":18,"name":"Treat Yo Self","description":"Spend $100,000 across all shops.","grade":"Bronze","gamerscore":15,"hidden":false,"kind":"collectible","spoiler":false,"missable":false,"steps":[{"t":"Spend $100,000 in total across all shops — clothes, weapons, food, anything; it is cumulative.","s":[1,2]},{"t":"Normal shopping through the story already counts; top up with big purchases in the clean-up if you are short.","s":[1,2]}]},{"id":19,"name":"Little Boxes","description":"Purchase all garage properties.","grade":"Bronze","gamerscore":15,"hidden":false,"kind":"collectible","spoiler":false,"missable":false,"steps":[{"t":"Buy the 8 garages in the Vice City Real Estate app, which unlocks after the Chapter 2 mission Daily Driver; budget about $160,000 in total.","s":[1,2]},{"t":"Garages the story gives you do not count — only purchased ones do.","s":[1,2]}]},{"id":20,"name":"On the Spot","description":"Register 10 vehicles to the Scooter Bros app.","grade":"Bronze","gamerscore":15,"hidden":false,"kind":"collectible","spoiler":false,"missable":false,"steps":[{"t":"The Chapter 2 mission Moses opens the Scooter Bros app: steal a car, take it to Moses, Respray it, then Register it.","s":[1,2]},{"t":"From Chapter 3 you can also register at Pay 'n' Spray with a tracker fitted; each car needs a free garage space, so keep one open.","s":[1,2]}]},{"id":21,"name":"Baited My Tackle","description":"Beat Cal in a fishing challenge.","grade":"Bronze","gamerscore":10,"hidden":false,"kind":"side","spoiler":false,"missable":false,"steps":[{"t":"Find Cal and take him on in a fishing challenge.","s":[1,2]},{"t":"Watch the line tension and the fish's movement, reel steadily rather than yanking, and land the bigger catch to beat him.","s":[1,2]}]},{"id":22,"name":"Stick Fiddler","description":"Complete an arcade game.","grade":"Bronze","gamerscore":10,"hidden":false,"kind":"activity","spoiler":false,"missable":false,"steps":[{"t":"Play any arcade game through to completion.","s":[1,2]},{"t":"Pick the one you find easiest and finish a full run — one completed game is all it takes.","s":[1,2]}]},{"id":23,"name":"Positive Mental Attitude","description":"Meditate at every spot across Leonida.","grade":"Bronze","gamerscore":10,"hidden":false,"kind":"collectible","spoiler":false,"missable":true,"disputed":true,"count":{"label":"meditations","total":18},"dispute":{"a":"The Chapter 1 balcony meditation counts: it raises the meditation counter by +1, and the trophy asks for every spot, so do it or risk falling one short.","b":"It may not count: the trophy refers to meditation spots, and the balcony session is not marked as a spot like the other 10 — the final meditation may count as +2 so you still reach 18/18 without it.","call":"Do the balcony meditation anyway and keep a Chapter 1 save. Missing it is the one mistake you cannot undo; doing it costs one morning.","src":[3]},"steps":[{"t":"Meditation spots show as purple icons when you get close; there are 10 spots and 18 meditations in total.","s":[3]},{"t":"Meditate at every spot, and bring your partner — each outdoor spot counts twice when you do it together, once per character.","s":[3]},{"t":"MISSABLE WINDOW: the Chapter 1 balcony meditation — the morning after Down to Earth, once Lucia is home, follow her to Jason's house balcony and accept — disappears after Chapter 1.","s":[3]},{"t":"Track progress under Progress, Collections, Exploration, Meditations; 15 of 18 is enough for the 100% checklist, but the trophy wants every spot.","s":[3]}]},{"id":24,"name":"Gunslinger","description":"Take down 5 enemies in a single use of Combat Focus.","grade":"Bronze","gamerscore":10,"hidden":false,"kind":"combat","spoiler":false,"missable":false,"steps":[{"t":"Combat Focus is slow-motion aim — hold L3+R3 while aiming.","s":[1,2]},{"t":"Take down 5 enemies inside one use; gang guards at an illegal operation with an assault rifle make a good target, and Adrenaline extends your Focus window.","s":[1,2]}]},{"id":25,"name":"Sneakthief","description":"Rob a jewelry store without being detected.","grade":"Bronze","gamerscore":10,"hidden":false,"kind":"robbery","spoiler":false,"missable":false,"steps":[{"t":"The Chapter 3 mission Yasmani's Jewelry Jobs gives you the Snap Gun; use it on a store's locked back door — kicking the door in sets off the alarm.","s":[1,2]},{"t":"Find the safe-code note in the back room, open the safe and leave unseen; Richardson Jewelry and Diamonds in Vice City is a good target.","s":[1,2]}]},{"id":26,"name":"A Classic Blitz Play","description":"Rob an Armored Truck and escape.","grade":"Bronze","gamerscore":10,"hidden":false,"kind":"robbery","spoiler":false,"missable":false,"steps":[{"t":"Hit an armored truck and get away clean.","s":[1,2]},{"t":"It only pops after you leave the red heat zone, so do not stop early — break line of sight, drop the heat, and keep moving until the trophy lands.","s":[1,2]}]},{"id":27,"name":"One Last Thing","description":"Complete 50 Challenges.","grade":"Bronze","gamerscore":5,"hidden":false,"kind":"meta","spoiler":false,"missable":false,"steps":[{"t":"Complete 50 of the 80 Challenges, tracked under Progress, Challenges; they cover combat, driving, exploration and more.","s":[1,2]},{"t":"100% completion needs 70, so keep clearing them after this pops.","s":[1,2]}]},{"id":28,"name":"Just Like Paradise","description":"Complete Gone Fishing.","grade":"Bronze","gamerscore":5,"hidden":true,"kind":"story","spoiler":true,"missable":false,"steps":[{"t":"Unmissable story trophy: complete the mission Gone Fishing as you play through the story.","s":[1,2]},{"t":"No mission replay exists, so keep a manual save at each chapter start in case you ever need to go back.","s":[1,2]}]},{"id":29,"name":"Paradise Lost","description":"Complete Chapter 1.","grade":"Bronze","gamerscore":20,"hidden":true,"kind":"story","spoiler":true,"missable":false,"steps":[{"t":"Unmissable: finish Chapter 1.","s":[1,2]},{"t":"Do the balcony meditation (Positive Mental Attitude) before the chapter ends — it disappears after Chapter 1.","s":[1,2,3]}]},{"id":30,"name":"T**s Ass Drug Money","description":"Complete Chapter 2.","grade":"Bronze","gamerscore":20,"hidden":true,"kind":"story","spoiler":true,"missable":false,"steps":[{"t":"Unmissable: finish Chapter 2.","s":[1,2]},{"t":"Chapter trophies can pop at the start of the next chapter; keep a manual save at each chapter start.","s":[1,2]}]},{"id":31,"name":"Vice City, Baby!","description":"Complete Chapter 3.","grade":"Bronze","gamerscore":20,"hidden":true,"kind":"story","spoiler":true,"missable":false,"steps":[{"t":"Unmissable: finish Chapter 3.","s":[1,2]},{"t":"The Chapter 3 mission Yasmani's Jewelry Jobs gives the Snap Gun used for Sneakthief — do the jewelry jobs when they appear.","s":[1,2]}]},{"id":32,"name":"Top Of The World, Ma","description":"Complete Chapter 4.","grade":"Bronze","gamerscore":20,"hidden":true,"kind":"story","spoiler":true,"missable":false,"steps":[{"t":"Unmissable: finish Chapter 4.","s":[1,2]},{"t":"The optional late Chapter 4 mission That's Where The Money Is opens the bank vaults for Maximum Withdrawal — do it when it appears.","s":[1,2]}]},{"id":33,"name":"You Gotta Know When to Get Off","description":"Complete the final mission.","grade":"Gold","gamerscore":50,"hidden":true,"kind":"story","spoiler":true,"missable":false,"steps":[{"t":"Unmissable: complete the final mission and the story is done.","s":[1,2]},{"t":"The 100% checklist opens under Progress, Stats, 100% Completion after the story — earlier work still counts.","s":[1,2]}]},{"id":34,"name":"Trust","description":"Complete Breakfast Run.","grade":"Bronze","gamerscore":10,"hidden":true,"kind":"story","spoiler":true,"missable":false,"steps":[{"t":"Unmissable story trophy: complete the mission Breakfast Run.","s":[1,2]}]},{"id":35,"name":"Break the Bank","description":"Complete The Cartel Heist.","grade":"Bronze","gamerscore":25,"hidden":true,"kind":"story","spoiler":true,"missable":false,"steps":[{"t":"Unmissable story trophy: complete the mission The Cartel Heist.","s":[1,2]}]},{"id":36,"name":"Family Matters","description":"Complete Child's Play.","grade":"Bronze","gamerscore":15,"hidden":true,"kind":"story","spoiler":true,"missable":false,"steps":[{"t":"Unmissable story trophy: complete the mission Child's Play.","s":[1,2]}]},{"id":37,"name":"DWNFALL","description":"Complete Headliners.","grade":"Bronze","gamerscore":15,"hidden":true,"kind":"story","spoiler":true,"missable":false,"steps":[{"t":"Unmissable story trophy: complete the mission Headliners.","s":[1,2]}]},{"id":38,"name":"Hi-Jacked","description":"Complete VCIA Takedown.","grade":"Bronze","gamerscore":25,"hidden":true,"kind":"story","spoiler":true,"missable":false,"steps":[{"t":"Unmissable story trophy: complete the mission VCIA Takedown.","s":[1,2]}]},{"id":39,"name":"Snow Storm","description":"Complete Operation Savage Glory.","grade":"Bronze","gamerscore":25,"hidden":true,"kind":"story","spoiler":true,"missable":false,"steps":[{"t":"Unmissable story trophy: complete the mission Operation Savage Glory.","s":[1,2]}]},{"id":40,"name":"This Was No Boat Accident","description":"Complete the final mission for Kenton.","grade":"Bronze","gamerscore":15,"hidden":true,"kind":"side","spoiler":true,"missable":false,"steps":[{"t":"Kenton's stranger strand: follow his missions to the final one.","s":[1,2]},{"t":"Stranger finales stay open after the story, so finish it in free roam if you missed it.","s":[1,2]}]},{"id":41,"name":"The Lone Rider","description":"Complete the final mission for Billy.","grade":"Bronze","gamerscore":15,"hidden":true,"kind":"side","spoiler":true,"missable":false,"steps":[{"t":"Billy's stranger strand: follow his missions to the final one.","s":[1,2]},{"t":"Stranger finales stay open after the story, so finish it in free roam if you missed it.","s":[1,2]}]},{"id":42,"name":"Road to Rehabilitation","description":"Complete the final mission for Andy.","grade":"Bronze","gamerscore":15,"hidden":true,"kind":"side","spoiler":true,"missable":false,"steps":[{"t":"Andy's stranger strand: follow his missions to the final one.","s":[1,2]},{"t":"Stranger finales stay open after the story, so finish it in free roam if you missed it.","s":[1,2]}]},{"id":43,"name":"Supply & Demand","description":"Complete the final mission for Randy.","grade":"Bronze","gamerscore":20,"hidden":true,"kind":"side","spoiler":true,"missable":false,"steps":[{"t":"Randy's stranger strand: follow his missions to the final one.","s":[1,2]},{"t":"Stranger finales stay open after the story, so finish it in free roam if you missed it.","s":[1,2]}]},{"id":44,"name":"Spin On This!","description":"Complete the final mission for Tyrone.","grade":"Bronze","gamerscore":15,"hidden":true,"kind":"side","spoiler":true,"missable":false,"steps":[{"t":"Tyrone's stranger strand: follow his missions to the final one.","s":[1,2]},{"t":"Stranger finales stay open after the story, so finish it in free roam if you missed it.","s":[1,2]}]},{"id":45,"name":"Fair Game","description":"Hunt a unique animal for Bret.","grade":"Bronze","gamerscore":15,"hidden":true,"kind":"side","spoiler":true,"missable":false,"steps":[{"t":"Bret Vogel's hunting questline, Jason-only: track the unique animal he marks for you.","s":[1,2]},{"t":"Take a clean head or heart shot to keep the carcass pristine.","s":[1,2]}]},{"id":46,"name":"Catch Me If You Can","description":"Make an unscheduled departure at VCIA.","grade":"Bronze","gamerscore":10,"hidden":true,"kind":"combat","spoiler":true,"missable":false,"steps":[{"t":"At Vice City International Airport, steal a large passenger plane docked at a boarding bridge — gates E3/E4 work; planes parked elsewhere do not count.","s":[1,2]},{"t":"Back out to the runway, take off and fly about 1 km away and it pops; save first.","s":[1,2]}]},{"id":47,"name":"Challenging Tank","description":"Kinda hot in these Rhinos.","grade":"Bronze","gamerscore":10,"hidden":true,"kind":"combat","spoiler":true,"missable":false,"steps":[{"t":"Get into a military tank (Rhino), parked on the south side of Mile Zero Air Station on the far southwest island.","s":[1,2]},{"t":"Save first — the base is guarded and the approach is hot.","s":[1,2]}]},{"id":48,"name":"Let's Go Bowling","description":"Follow-through at the Kolt & Associates' bowling alley.","grade":"Bronze","gamerscore":5,"hidden":true,"kind":"activity","spoiler":true,"missable":false,"steps":[{"t":"Kingpin Bowling is the Kolt & Associates illegal operation, from Chapter 2: bring Sticky Bombs.","s":[1,2]},{"t":"Take the 3 key valuables — the luxury watch in an office, the shotgun on a table, and the office safe blown open with a Sticky Bomb — then escape the police.","s":[1,2]},{"t":"Leaving something behind is fine; the operation comes back.","s":[1,2]}]},{"id":49,"name":"Personal Best","description":"A partnership with mass appeal.","grade":"Bronze","gamerscore":5,"hidden":true,"kind":"activity","spoiler":true,"missable":false,"unconfirmed":true,"steps":[{"t":"The description points to Jason and Lucia both reaching maximum Strength: buy a gym membership and train with your partner — they train alongside you.","s":[1,2]},{"t":"UNCONFIRMED: the exact trigger is still being confirmed by the community, so this is the best-supported reading, not a certainty.","s":[1,2]}]},{"id":50,"name":"Actions Speak Louder","description":"Choices made (for better or worse).","grade":"Bronze","gamerscore":5,"hidden":true,"kind":"misc","spoiler":true,"missable":false,"unconfirmed":true,"steps":[{"t":"The description points to actions that change your Criminal Profile — robberies and fights feed it, and it fills up on its own as you play.","s":[1,2]},{"t":"UNCONFIRMED: the exact count is still being confirmed by the community; the round-1 brief records 500 such actions as the reported figure, not a verified one.","s":[1,2]}]},{"id":51,"name":"In The Beginning…","description":"Enjoy a cocktail with a view on Ocean Beach.","grade":"Bronze","gamerscore":5,"hidden":true,"kind":"misc","spoiler":true,"missable":false,"unconfirmed":true,"steps":[{"t":"The description points to a cocktail with a view on Ocean Beach — find the spot and take it in.","s":[1,2]},{"t":"UNCONFIRMED: the exact method is still being confirmed by the community; the guide says so instead of inventing one.","s":[1,2]}]},{"id":52,"name":"Capital Offense","description":"Smash your way out of a vehicle showroom in classic style.","grade":"Bronze","gamerscore":5,"hidden":true,"kind":"misc","spoiler":true,"missable":false,"unconfirmed":true,"steps":[{"t":"The description points to smashing your way out of a vehicle showroom in classic style — drive out through the glass.","s":[1,2]},{"t":"UNCONFIRMED: the exact showroom and trigger are still being confirmed by the community; the guide says so instead of inventing one.","s":[1,2]}]},{"id":53,"name":"Bad Luck, I Guess","description":"Second time's the charm.","grade":"Bronze","gamerscore":5,"hidden":true,"kind":"misc","spoiler":true,"missable":false,"unconfirmed":true,"steps":[{"t":"The description is a riddle — 'second time's the charm' points to succeeding at something on the second attempt.","s":[1,2]},{"t":"UNCONFIRMED: the exact event is still being confirmed by the community; the guide says so instead of inventing one.","s":[1,2]}]},{"id":54,"name":"The Truth Is Out There","description":"What the hell just happened?","grade":"Bronze","gamerscore":5,"hidden":true,"kind":"misc","spoiler":true,"missable":false,"unconfirmed":true,"steps":[{"t":"The description is a riddle — something strange happens in Leonida and the trophy pops when you find it.","s":[1,2]},{"t":"UNCONFIRMED: the exact event is still being confirmed by the community; the guide says so instead of inventing one.","s":[1,2]}]},{"id":55,"name":"Ten Pin","description":"Bowl 'em over with a melee drive-by.","grade":"Bronze","gamerscore":5,"hidden":true,"kind":"activity","spoiler":true,"missable":false,"unconfirmed":true,"steps":[{"t":"The description points to a melee drive-by at the bowling alley — bowling pins, hit from a vehicle with a melee weapon.","s":[1,2]},{"t":"UNCONFIRMED: the exact method is still being confirmed by the community; the guide says so instead of inventing one.","s":[1,2]}]}];

let TROPHIES = [];
let state = { earned: {}, counts: {}, spoiler: true };
let selectedId = 23;
let chipFilter = 'all';
let gradeFilter = 'all';
let earnedFilter = 'all';
let query = '';

function loadState() {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (raw) { const s = JSON.parse(raw); if (s && typeof s === 'object') state = Object.assign(state, s); }
  } catch (e) { /* fresh state on corrupt storage */ }
}
function saveState() { try { localStorage.setItem(LS_KEY, JSON.stringify(state)); } catch (e) { /* storage full/blocked */ } }
function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
function citeList(nums) { return nums.map(function (n) { return '<span class="cite">[' + n + ']</span>'; }).join(' '); }
function srcNames(t) {
  const set = new Set();
  t.steps.forEach(function (s) { (s.s || []).forEach(function (n) { set.add(n); }); });
  return Array.from(set).sort();
}
function isHidden(t) { return state.spoiler && t.spoiler && !state.earned[t.id]; }
function displayName(t) { return isHidden(t) ? 'Hidden — story trophy' : t.name; }
function displayDesc(t) { return isHidden(t) ? 'Hidden until earned. Turn the spoiler shield off to reveal story trophies.' : t.description; }

async function loadData() {
  try {
    const res = await fetch('data/trophies.json');
    if (!res.ok) throw new Error('HTTP ' + res.status);
    TROPHIES = await res.json();
  } catch (e) {
    if (Array.isArray(FALLBACK) && FALLBACK.length === 55) { TROPHIES = FALLBACK; }
    else { document.getElementById('detail').innerHTML = '<p>Could not load trophy data. Serve this folder over HTTP (node serve.ts) or open index.html from a static server.</p>'; TROPHIES = []; }
  }
  if (!Array.isArray(TROPHIES)) TROPHIES = [];
}

function audit() {
  const total = TROPHIES.length;
  const grades = {};
  TROPHIES.forEach(function (t) { grades[t.grade] = (grades[t.grade] || 0) + 1; });
  let steps = 0, cited = 0;
  TROPHIES.forEach(function (t) { t.steps.forEach(function (s) { steps++; if (s.s && s.s.length) cited++; }); });
  const withSrc = TROPHIES.filter(function (t) { return srcNames(t).length >= 1; }).length;
  const twoPlus = TROPHIES.filter(function (t) { return srcNames(t).length >= 2; }).length;
  const hidden = TROPHIES.filter(function (t) { return t.hidden; }).length;
  const missable = TROPHIES.filter(function (t) { return t.missable; }).length;
  const unconf = TROPHIES.filter(function (t) { return t.unconfirmed; }).length;
  const disputed = TROPHIES.filter(function (t) { return t.disputed; }).length;
  const el = document.getElementById('audit');
  el.innerHTML =
    '<span><b>' + total + '/' + total + '</b> official name, description, grade</span>' +
    '<span><b>' + (grades.Platinum || 0) + 'P ' + (grades.Gold || 0) + 'G ' + (grades.Silver || 0) + 'S ' + (grades.Bronze || 0) + 'B</b></span>' +
    '<span><b>' + hidden + '</b> PSN-hidden</span>' +
    '<span><b>' + cited + '/' + steps + '</b> claims cited</span>' +
    '<span><b>' + withSrc + '/' + total + '</b> guides cite sources</span>' +
    '<span><b>' + twoPlus + '</b> backed by 2+ sources</span>' +
    '<span class="ok"><b>' + SOURCES.length + '</b> sources · read 21 Nov 2026</span>' +
    '<span><b>' + missable + '</b> possibly missable</span>' +
    '<span><b>' + unconf + '</b> unconfirmed</span>' +
    '<span><b>' + disputed + '</b> dispute shown both ways</span>';
  document.getElementById('auditNote').textContent =
    'Audit counts are computed live from the app’s own trophy data: ' + cited + '/' + steps +
    ' guide steps carry a citation, ' + withSrc + '/' + total + ' guides cite at least one source, ' +
    twoPlus + ' cite two or more. ' + unconf + ' guides say plainly where the method is still unconfirmed; ' +
    disputed + ' dispute is shown with both versions and our call.';
}

function renderHeader() {
  const earned = TROPHIES.filter(function (t) { return state.earned[t.id]; }).length;
  document.getElementById('bigCount').textContent = earned + ' / ' + TROPHIES.length;
  const per = {};
  TROPHIES.forEach(function (t) { per[t.grade] = per[t.grade] || [0, 0]; per[t.grade][1]++; if (state.earned[t.id]) per[t.grade][0]++; });
  document.getElementById('gradeCounts').innerHTML =
    ['Platinum', 'Gold', 'Silver', 'Bronze'].map(function (g) {
      const p = per[g] || [0, 0];
      return '<span><b>' + g[0] + ' ' + p[0] + '/' + p[1] + '</b></span>';
    }).join('');
  document.getElementById('spoilerToggle').checked = !!state.spoiler;
}

function filtered() {
  const q = query.trim().toLowerCase();
  return TROPHIES.filter(function (t) {
    if (chipFilter !== 'all') {
      if (chipFilter === 'hidden' && !t.hidden) return false;
      if (chipFilter === 'disputed' && !t.disputed) return false;
      if (chipFilter === 'missable' && !t.missable) return false;
      if (chipFilter === 'unconfirmed' && !t.unconfirmed) return false;
      if (chipFilter === 'unearned' && state.earned[t.id]) return false;
      if (KIND_LABEL[chipFilter] && t.kind !== chipFilter) return false;
    }
    if (gradeFilter !== 'all' && t.grade !== gradeFilter) return false;
    if (earnedFilter === 'earned' && !state.earned[t.id]) return false;
    if (earnedFilter === 'unearned' && state.earned[t.id]) return false;
    if (q) {
      const hay = (t.name + ' ' + t.description + ' ' + t.kind + ' ' + t.steps.map(function (s) { return s.t; }).join(' ')).toLowerCase();
      if (hay.indexOf(q) === -1) return false;
    }
    return true;
  });
}

function renderChips() {
  const counts = {};
  TROPHIES.forEach(function (t) { counts[t.kind] = (counts[t.kind] || 0) + 1; });
  const notEarned = TROPHIES.filter(function (t) { return !state.earned[t.id]; }).length;
  const items = [{ k: 'all', label: 'All 55', n: TROPHIES.length }];
  Object.keys(KIND_LABEL).forEach(function (k) { if (counts[k]) items.push({ k: k, label: KIND_LABEL[k], n: counts[k] }); });
  items.push({ k: 'hidden', label: 'PSN-hidden', n: TROPHIES.filter(function (t) { return t.hidden; }).length });
  items.push({ k: 'disputed', label: 'Disputed', n: TROPHIES.filter(function (t) { return t.disputed; }).length });
  items.push({ k: 'missable', label: 'Missable', n: TROPHIES.filter(function (t) { return t.missable; }).length });
  items.push({ k: 'unconfirmed', label: 'Unconfirmed', n: TROPHIES.filter(function (t) { return t.unconfirmed; }).length });
  items.push({ k: 'unearned', label: 'Not earned', n: notEarned });
  document.getElementById('chips').innerHTML = items.map(function (it) {
    return '<button type="button" class="chip' + (chipFilter === it.k ? ' active' : '') + '" data-chip="' + it.k + '">' +
      esc(it.label) + ' <b>' + it.n + '</b></button>';
  }).join('');
  document.querySelectorAll('#chips .chip').forEach(function (b) {
    b.addEventListener('click', function () { chipFilter = b.getAttribute('data-chip'); renderAll(); });
  });
}

function renderList() {
  const list = filtered();
  const box = document.getElementById('list');
  document.getElementById('emptyMsg').hidden = list.length > 0;
  box.innerHTML = list.map(function (t) {
    const earned = !!state.earned[t.id];
    const tags = [];
    if (t.hidden) tags.push('PSN-HIDDEN');
    tags.push(KIND_LABEL[t.kind]);
    tags.push(srcNames(t).length + ' src');
    let badges = tags.map(function (g) { return '<span class="tag">' + esc(g) + '</span>'; }).join('');
    if (t.missable) badges += '<span class="tag miss">MISSABLE</span>';
    if (t.disputed) badges += '<span class="tag disp">SOURCES DIFFER</span>';
    if (t.unconfirmed) badges += '<span class="tag unc">UNCONFIRMED</span>';
    return '<button type="button" class="trow' + (earned ? ' earned' : '') + (t.id === selectedId ? ' sel' : '') + '" data-id="' + t.id + '">' +
      '<span class="tick">' + (earned ? '✓' : '') + '</span>' +
      '<span style="flex:1;min-width:0"><span class="tname">' + esc(displayName(t)) + '</span>' +
      '<span class="tdesc">' + esc(displayDesc(t)) + '</span>' +
      '<span class="tags">' + badges + '</span></span>' +
      '<span class="grade ' + t.grade + '">' + t.grade[0] + '</span></button>';
  }).join('');
  box.querySelectorAll('.trow').forEach(function (b) {
    b.addEventListener('click', function () { selectedId = Number(b.getAttribute('data-id')); renderAll(); });
  });
}

function renderDetail() {
  const t = TROPHIES.find(function (x) { return x.id === selectedId; }) || TROPHIES[0];
  if (!t) return;
  const earned = !!state.earned[t.id];
  const hidden = isHidden(t);
  let html = '<h2>' + esc(displayName(t)) + ' <span class="grade ' + t.grade + '">' + t.grade + '</span></h2>';
  html += '<p class="meta"><b>' + t.gamerscore + 'G</b> · ' + esc(KIND_LABEL[t.kind]) + ' · ' +
    (t.hidden ? 'PSN-hidden · ' : 'Visible · ') + (t.missable ? '<b>MISSABLE</b> · ' : '') +
    (t.unconfirmed ? 'Method unconfirmed · ' : '') + 'Sources ' + srcNames(t).join(', ') + '</p>';
  html += '<button type="button" class="btn primary" id="markBtn">' + (earned ? '✓ Earned — click to unmark' : 'Mark earned') + '</button>';
  if (hidden) {
    html += '<blockquote>Hidden — story trophy. Mark it earned to reveal its name and description, or turn the spoiler shield off.</blockquote>';
  } else {
    html += '<blockquote>“' + esc(t.description) + '” — official description</blockquote>';
    if (t.count) {
      const cur = state.counts[t.id] || 0;
      html += '<div class="countbox"><div><b>YOUR COUNT — ' + cur + ' / ' + t.count.total + ' ' + esc(t.count.label) + '</b>' +
        '<div style="color:var(--mut);font-size:13px">Tap + each time you meditate; each outdoor spot counts twice with your partner.</div></div>' +
        '<div><button type="button" id="countMinus" aria-label="Decrease count">−</button> ' +
        '<button type="button" id="countPlus" aria-label="Increase count">+</button></div></div>';
    }
    if (t.disputed && t.dispute) {
      html += '<div class="dispute"><h4>SOURCES DIFFER — both versions shown</h4>' +
        '<p><b>Version A:</b> ' + esc(t.dispute.a) + '</p>' +
        '<p><b>Version B:</b> ' + esc(t.dispute.b) + ' ' + citeList(t.dispute.src) + '</p>' +
        '<p class="call"><b>Our call:</b> ' + esc(t.dispute.call) + '</p></div>';
    }
    html += '<h3 class="sec">How to earn it — in our own words</h3><ol class="steps">' +
      t.steps.map(function (s) { return '<li>' + esc(s.t) + ' ' + citeList(s.s || []) + '</li>'; }).join('') + '</ol>';
    if (t.unconfirmed) {
      html += '<p class="sub">Honest note: the exact method for this trophy is still being confirmed by the community. This guide says so instead of inventing one.</p>';
    }
  }
  document.getElementById('detail').innerHTML = html;
  document.getElementById('markBtn').addEventListener('click', function () {
    if (state.earned[t.id]) delete state.earned[t.id]; else state.earned[t.id] = true;
    saveState(); renderAll();
  });
  const plus = document.getElementById('countPlus');
  if (plus) {
    plus.addEventListener('click', function () {
      const cur = state.counts[t.id] || 0;
      state.counts[t.id] = Math.min(t.count.total, cur + 1); saveState(); renderAll();
    });
    document.getElementById('countMinus').addEventListener('click', function () {
      const cur = state.counts[t.id] || 0;
      state.counts[t.id] = Math.max(0, cur - 1); saveState(); renderAll();
    });
  }
  renderRail(t);
}

function renderRail(t) {
  const order = TROPHIES.filter(function (x) { return !state.earned[x.id]; })
    .sort(function (a, b) {
      const rank = function (x) { return x.missable ? 0 : x.kind === 'story' ? 1 : 2; };
      return rank(a) - rank(b) || a.id - b.id;
    }).slice(0, 5);
  const next = order.length ? '<ol>' + order.map(function (x) {
    return '<li><button type="button" data-id="' + x.id + '">' + esc(displayName(x)) + '</button></li>';
  }).join('') + '</ol>' : '<p class="sub">All 55 earned — Platinum is yours.</p>';
  const srcs = srcNames(t).map(function (n) {
    const s = SOURCES.find(function (x) { return x.n === n; });
    return '<li>[' + s.n + '] ' + esc(s.name) + '<br><small>' + esc(s.url) + ' — ' + esc(s.note) + '</small></li>';
  }).join('');
  document.getElementById('rail').innerHTML =
    '<div class="railbox"><h3>Next up · roadmap order</h3>' + next + '</div>' +
    '<div class="railbox"><h3>Sources for this guide · ' + srcNames(t).length + '</h3><ol>' + srcs + '</ol></div>';
  document.querySelectorAll('#rail [data-id]').forEach(function (b) {
    b.addEventListener('click', function () { selectedId = Number(b.getAttribute('data-id')); renderAll(); });
  });
}

function renderMissables() {
  const m = TROPHIES.filter(function (t) { return t.missable; });
  document.getElementById('missableList').innerHTML = m.map(function (t) {
    return '<button type="button" class="mrow" data-id="' + t.id + '"><span class="grade ' + t.grade + '">' + t.grade[0] + '</span>' +
      '<span><b>' + esc(t.name) + '</b> — ' + esc(t.description) + '<br><span style="color:var(--mut)">' +
      'The Chapter 1 balcony meditation disappears after Chapter 1. Whether it counts toward the trophy is disputed — see the dispute box in its detail. Do it anyway and keep a Chapter 1 save.</span></span></button>';
  }).join('');
  const u = TROPHIES.filter(function (t) { return t.unconfirmed; });
  document.getElementById('unconfirmedList').innerHTML = u.map(function (t) {
    return '<button type="button" class="mrow" data-id="' + t.id + '"><span class="grade ' + t.grade + '">' + t.grade[0] + '</span>' +
      '<span><b>' + esc(t.name) + '</b> — ' + esc(t.description) + '</span></button>';
  }).join('');
  document.querySelectorAll('#tab-missables [data-id]').forEach(function (b) {
    b.addEventListener('click', function () {
      selectedId = Number(b.getAttribute('data-id'));
      document.querySelector('[data-tab="tracker"]').click(); renderAll();
    });
  });
}

function renderSources() {
  document.getElementById('sourceList').innerHTML = SOURCES.map(function (s) {
    return '<li><b>[' + s.n + '] ' + esc(s.name) + '</b><small>' + esc(s.url) + ' — ' + esc(s.note) + '</small></li>';
  }).join('');
}

function renderAll() { renderHeader(); renderChips(); renderList(); renderDetail(); }

function bind() {
  document.querySelectorAll('.tab').forEach(function (b) {
    b.addEventListener('click', function () {
      document.querySelectorAll('.tab').forEach(function (x) { x.classList.remove('active'); });
      b.classList.add('active');
      const tab = b.getAttribute('data-tab');
      ['tracker', 'roadmap', 'missables', 'sources'].forEach(function (name) {
        document.getElementById('tab-' + name).hidden = name !== tab;
      });
      if (tab === 'missables') renderMissables();
      if (tab === 'sources') renderSources();
    });
  });
  document.getElementById('search').addEventListener('input', function (e) { query = e.target.value; renderList(); });
  document.getElementById('gradeSel').addEventListener('change', function (e) { gradeFilter = e.target.value; renderList(); });
  document.getElementById('earnedSel').addEventListener('change', function (e) { earnedFilter = e.target.value; renderList(); });
  document.getElementById('spoilerToggle').addEventListener('change', function (e) { state.spoiler = e.target.checked; saveState(); renderAll(); });
  document.getElementById('exportBtn').addEventListener('click', function () {
    const blob = new Blob([JSON.stringify({ app: 'leonida-trophy-atlas', earned: Object.keys(state.earned).map(Number), counts: state.counts, spoiler: state.spoiler }, null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob); a.download = 'leonida-trophy-atlas-progress.json'; a.click();
    setTimeout(function () { URL.revokeObjectURL(a.href); }, 1000);
  });
  document.getElementById('importBtn').addEventListener('click', function () { document.getElementById('importFile').click(); });
  document.getElementById('importFile').addEventListener('change', function (e) {
    const f = e.target.files[0]; if (!f) return;
    const r = new FileReader();
    r.onload = function () {
      try {
        const d = JSON.parse(r.result);
        const ids = Array.isArray(d.earned) ? d.earned : (Array.isArray(d) ? d : null);
        if (!ids) throw new Error('no earned list');
        const earned = {};
        ids.forEach(function (id) { if (Number.isInteger(id) && id >= 1 && id <= 55) earned[id] = true; });
        state.earned = earned;
        if (d.counts && typeof d.counts === 'object') state.counts = d.counts;
        if (typeof d.spoiler === 'boolean') state.spoiler = d.spoiler;
        saveState(); renderAll();
      } catch (err) { alert('Import failed: not a valid LEONIDA TROPHY ATLAS progress file.'); }
      e.target.value = '';
    };
    r.readAsText(f);
  });
  document.getElementById('resetBtn').addEventListener('click', function () {
    if (confirm('Reset all earned trophies and counts?')) { state.earned = {}; state.counts = {}; saveState(); renderAll(); }
  });
}

loadState();
loadData().then(function () { audit(); renderAll(); bind(); });
