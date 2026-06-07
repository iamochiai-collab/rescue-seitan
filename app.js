const $ = (selector) => document.querySelector(selector);
const itemPath = './assets/items/';
const bgPath = './assets/backgrounds/';
const dogPath = './assets/dogs/';
const actionPath = './assets/actions/';

const items = [
  { name:'うちわ', img:'uchiwa.png', choices:[
    ['わんこに あおぐ', -1, 10, 'かぜがきて、すずしく感じた！'],
    ['まどに あおぐ', 0, 1, 'あまり変わらなかった。どこに風を送るとよいかな？']
  ]},
  { name:'扇風機', img:'fan.png', choices:[
    ['わんこに むける', -1, 12, '扇風機の風で、体がすずしく感じた！'],
    ['へやの空気をまわす', 0, 6, '空気が動いて、少しらくになった！'],
    ['暑い場所にむける', 0, 0, '向きがちがうかも。風をどこに送るとよいかな？']
  ]},
  { name:'みず', img:'water_bottle.png', choices:[
    ['のませる', 0, 14, '水をのんで、げんきが出た！'],
    ['タオルをぬらす', -1, 10, 'ぬれたタオルで、体がすずしくなった！'],
    ['床にこぼす', 0, -6, '床がすべるとあぶない！使い方に気をつけよう。']
  ]},
  { name:'おちゃ', img:'tea_hot.png', choices:[
    ['冷たいお茶にする', 0, 8, '冷たいお茶なら水分がとれるね！'],
    ['熱いお茶をあげる', 1, -5, '今はからだが温まりすぎるかも。']
  ]},
  { name:'カーテン', img:'curtain.png', choices:[
    ['しめる', -2, 8, '日ざしがへって、部屋が暑くなりにくくなった！', 'room_curtain_closed.png'],
    ['あける', 1, -4, '日ざしが入って、少し暑くなった！', 'room_hot.png']
  ]},
  { name:'まど', img:'window_open.png', choices:[
    ['あける', -1, 5, '風が入って、少しすずしい！', 'room_window_open.png'],
    ['しめきる', 1, -4, '空気がこもってしまった。', 'room_hot.png']
  ]},
  { name:'れいタオル', img:'cold_towel.png', choices:[
    ['首の近くにあてる', -1, 12, 'ひんやりして、らくになった！'],
    ['ずっと強くあてる', 0, -5, '冷たすぎる。少しずつ使おう。']
  ]},
  { name:'ほれいざい', img:'icepack.png', choices:[
    ['タオルでつつむ', -2, 12, 'タオルでつつむと安全に使えるね！'],
    ['そのままあてる', 0, -7, '冷たすぎる！タオルでつつもう。']
  ]},
  { name:'こおり', img:'ice.png', choices:[
    ['近くにおく', -1, 5, '近くが少しすずしくなった！'],
    ['食べさせる', 0, -4, 'おなかをこわすかも。先生に聞こう。']
  ]},
  { name:'ひかげシート', img:'shade_sheet.png', choices:[
    ['窓の近くにつける', -2, 8, '日かげができた！'],
    ['床におく', 0, 0, '日ざしはあまり減らなかった。']
  ]},
  { name:'ぼうし', img:'hat.png', choices:[
    ['外に出る時にかぶる', 0, 4, '外では日ざしをふせげるね！'],
    ['部屋でずっとかぶる', 0, 0, '今の部屋ではあまり変わらない。']
  ]},
  { name:'毛布', img:'blanket.png', choices:[
    ['わんこにかける', 1, -10, '毛布でさらに暑くなった！'],
    ['窓にかける', -1, 6, '日ざしを少しふせげた！', 'room_curtain_closed.png']
  ]},
  { name:'ドライヤー', img:'dryer.png', choices:[
    ['温かい風', 2, -10, '熱い風で、もっと暑くなった！'],
    ['冷たい風', -1, 6, '冷たい風なら少しすずしい！']
  ]},
  { name:'エアコン', img:'aircon.png', choices:[
    ['冷房にする', -3, 15, '部屋がすずしくなった！'],
    ['暖房にする', 3, -12, '今は暖房ではもっと暑い！'],
    ['切る', 1, -2, 'エアコンを切りました。暑い日は様子を見よう。']
  ]},
  { name:'ライト', img:'light.png', choices:[
    ['つける', 1, -3, '明るくなったけど、少し暑い。'],
    ['けす', 0, 1, '熱が少しへったかも。']
  ]},
  { name:'ストーブ', img:'stove.png', choices:[
    ['つける', 3, -15, 'これは冬の道具！今は暑すぎる。'],
    ['けす', -1, 4, 'ストーブを消しました。暑い日は使わない判断も大切！']
  ]},
  { name:'こたつ', img:'kotatsu.png', choices:[
    ['入れる', 2, -12, 'こたつは今は暑い！'],
    ['片づける', 0, 3, '暑い季節は片づけてもいいね。']
  ]},
  { name:'あついスープ', img:'hot_soup.png', choices:[
    ['食べさせる', 1, -6, '今は熱い食べ物より水分がよさそう。'],
    ['やめておく', 0, 2, '場面に合うものを考えられた！']
  ]},
  { name:'ダウンジャケット', img:'down_jacket.png', choices:[
    ['着せる', 2, -12, 'もっと暑くなってしまった！'],
    ['日よけにする', 0, 4, '使い方しだいで日ざしをふせげるかも。']
  ]},
  { name:'きりふき', img:'spray.png', choices:[
    ['少しふきかける', -1, 6, '水のミストで少しすずしい！'],
    ['たくさんまく', 0, -4, '床がぬれるとあぶない！']
  ]},
  { name:'こおった水', img:'frozen_bottle.png', choices:[
    ['近くにおく', -2, 7, '近くがひんやりした！'],
    ['ずっと体にあてる', 0, -5, '冷たすぎる。タオルで包もう。']
  ]}
];

const actionSprites = {
  'うちわ|わんこに あおぐ': 'use_uchiwa.png',
  'うちわ|まどに あおぐ': 'wind_uchiwa.png',
  '扇風機|わんこに むける': 'fan_to_dog.png',
  '扇風機|へやの空気をまわす': 'fan_to_room.png',
  '扇風機|暑い場所にむける': 'fan_to_room.png',
  'みず|のませる': 'drink_water.png',
  'みず|タオルをぬらす': 'use_cold_towel.png',
  'みず|床にこぼす': 'spill_water.png',
  'おちゃ|冷たいお茶にする': 'drink_cold_tea.png',
  'おちゃ|熱いお茶をあげる': 'hot_tea.png',
  'カーテン|しめる': 'close_curtain.png',
  'カーテン|あける': 'open_curtain.png',
  'まど|あける': 'open_window.png',
  'まど|しめきる': 'close_window.png',
  'れいタオル|首の近くにあてる': 'cold_towel_head.png',
  'れいタオル|ずっと強くあてる': 'cold_towel_head.png',
  'ほれいざい|タオルでつつむ': 'icepack_towel.png',
  'ほれいざい|そのままあてる': 'use_icepack.png',
  'こおり|近くにおく': 'near_ice.png',
  'こおり|食べさせる': 'ice_cubes.png',
  'ひかげシート|窓の近くにつける': 'shade_sheet.png',
  'ひかげシート|床におく': 'shade_sheet.png',
  'ぼうし|外に出る時にかぶる': 'wear_hat.png',
  'ぼうし|部屋でずっとかぶる': 'wear_hat.png',
  '毛布|わんこにかける': 'blanket_on_dog.png',
  '毛布|窓にかける': 'blanket_on_window.png',
  'ドライヤー|温かい風': 'dryer_warm_bad.png',
  'ドライヤー|冷たい風': 'dryer_cool.png',
  'エアコン|冷房にする': 'aircon_cool.png',
  'エアコン|暖房にする': 'aircon_warm_bad.png',
  'エアコン|切る': 'room_curtain_closed_result.png',
  'ライト|つける': 'light_hot.png',
  'ライト|けす': 'room_curtain_closed_result.png',
  'ストーブ|つける': 'stove_hot.png',
  'ストーブ|けす': 'room_curtain_closed_result.png',
  'こたつ|入れる': 'kotatsu_hot.png',
  'こたつ|片づける': 'room_curtain_closed_result.png',
  'あついスープ|食べさせる': 'hot_soup.png',
  'あついスープ|やめておく': 'hold_water.png',
  'ダウンジャケット|着せる': 'down_jacket_hot.png',
  'ダウンジャケット|日よけにする': 'shade_sheet.png',
  'きりふき|少しふきかける': 'spray_mist.png',
  'きりふき|たくさんまく': 'spill_water.png',
  'こおった水|近くにおく': 'frozen_bottle.png',
  'こおった水|ずっと体にあてる': 'frozen_bottle.png'
};

const state = {
  player: '',
  temp: 32,
  energy: 18,
  score: 0,
  used: 0,
  sound: true,
  room: {
    curtain: 'open',
    window: 'closed',
    light: 'off',
    stove: 'off',
    kotatsu: 'off',
    aircon: 'off',
    blanketDog: false,
    blanketWindow: false,
    fan: 'off',
    dryer: 'off'
  },
  usedActions: new Set(),
  pendingDrop: null,
  effects: {}
};

const actionRules = {
  'カーテン|しめる': { requires: { curtain: 'open' }, set: { curtain: 'closed' }, effectSlot:'curtain', effect:{temp:-2, energy:8}, bg: 'room_curtain_closed.png', unavailable: 'カーテンはもう閉まっています。次は「あける」ならできます。' },
  'カーテン|あける': { requires: { curtain: 'closed' }, set: { curtain: 'open', blanketWindow: false }, effectSlot:'curtain', effect:{temp:0, energy:0}, bg: 'room_hot.png', unavailable: 'カーテンはもう開いています。次は「しめる」ならできます。' },
  'まど|あける': { requires: { window: 'closed' }, set: { window: 'open' }, effectSlot:'window', effect:{temp:-1, energy:5}, bg: 'room_window_open.png', unavailable: 'まどはもう開いています。次は「しめきる」ならできます。' },
  'まど|しめきる': { requires: { window: 'open' }, set: { window: 'closed' }, effectSlot:'window', effect:{temp:0, energy:0}, bg: 'room_hot.png', unavailable: 'まどはもう閉まっています。次は「あける」ならできます。' },

  '扇風機|わんこに むける': { requiresNot: { fan: 'dog' }, set: { fan: 'dog' }, effectSlot:'fan', effect:{temp:-1, energy:12}, unavailable: '扇風機はもうわんこに向いています。別の向きに変えてみよう。' },
  '扇風機|へやの空気をまわす': { requiresNot: { fan: 'room' }, set: { fan: 'room' }, effectSlot:'fan', effect:{temp:0, energy:6}, unavailable: '扇風機はもう部屋の空気を回しています。別の向きに変えてみよう。' },
  '扇風機|暑い場所にむける': { requiresNot: { fan: 'wrong' }, set: { fan: 'wrong' }, effectSlot:'fan', effect:{temp:0, energy:0}, unavailable: '扇風機はもう暑い場所に向いています。別の向きに変えてみよう。' },

  'エアコン|冷房にする': { requiresNot: { aircon: 'cool' }, set: { aircon: 'cool' }, effectSlot:'aircon', effect:{temp:-3, energy:15}, unavailable: 'エアコンはもう冷房になっています。同じ操作はできません。' },
  'エアコン|暖房にする': { requiresNot: { aircon: 'warm' }, set: { aircon: 'warm' }, effectSlot:'aircon', effect:{temp:3, energy:-12}, unavailable: 'エアコンはもう暖房になっています。同じ操作はできません。' },
  'エアコン|切る': { requiresNot: { aircon: 'off' }, set: { aircon: 'off' }, effectSlot:'aircon', effect:{temp:0, energy:0}, unavailable: 'エアコンはもう切れています。' },

  'ドライヤー|温かい風': { requiresNot: { dryer: 'warm' }, set: { dryer: 'warm' }, effectSlot:'dryer', effect:{temp:2, energy:-10}, unavailable: 'ドライヤーはもう温かい風で使いました。' },
  'ドライヤー|冷たい風': { requiresNot: { dryer: 'cool' }, set: { dryer: 'cool' }, effectSlot:'dryer', effect:{temp:-1, energy:6}, unavailable: 'ドライヤーはもう冷たい風で使いました。' },
  'ライト|つける': { requires: { light: 'off' }, set: { light: 'on' }, effectSlot:'light', effect:{temp:1, energy:-3}, unavailable: 'ライトはもうついています。次は「けす」ならできます。' },
  'ライト|けす': { requires: { light: 'on' }, set: { light: 'off' }, effectSlot:'light', effect:{temp:0, energy:0}, unavailable: 'ライトはもう消えています。次は「つける」ならできます。' },
  'ストーブ|つける': { requires: { stove: 'off' }, set: { stove: 'on' }, effectSlot:'stove', effect:{temp:3, energy:-15}, unavailable: 'ストーブはもうついています。次は「けす」ならできます。' },
  'ストーブ|けす': { requires: { stove: 'on' }, set: { stove: 'off' }, effectSlot:'stove', effect:{temp:0, energy:0}, unavailable: 'ストーブはもう消えています。' },
  'こたつ|入れる': { requires: { kotatsu: 'off' }, set: { kotatsu: 'on' }, effectSlot:'kotatsu', effect:{temp:2, energy:-12}, unavailable: 'もうこたつに入っています。' },
  'こたつ|片づける': { requires: { kotatsu: 'on' }, set: { kotatsu: 'off' }, effectSlot:'kotatsu', effect:{temp:0, energy:0}, unavailable: 'こたつはもう片づいています。' },
  '毛布|わんこにかける': { requires: { blanketDog: false }, set: { blanketDog: true }, effectSlot:'blanketDog', effect:{temp:1, energy:-10}, unavailable: '毛布はもうわんこにかかっています。' },
  '毛布|窓にかける': { requires: { blanketWindow: false }, set: { blanketWindow: true, curtain: 'closed' }, effectSlot:'blanketWindow', effect:{temp:-1, energy:6}, bg: 'room_curtain_closed.png', unavailable: '毛布はもう窓にかかっています。' }
};

const repeatableActions = new Set([
  // 基本は同じ行動を何回もできない。必要になったらここへ追加。
]);

let activeDrag = null;

function getRule(itemName, choiceLabel){
  return actionRules[`${itemName}|${choiceLabel}`];
}
function actionKey(itemName, choiceLabel){
  return `${itemName}|${choiceLabel}`;
}

function isChoiceAvailable(rule, key){
  if(key && state.usedActions.has(key) && !repeatableActions.has(key)) return false;
  if(!rule) return !(key && state.usedActions.has(key) && !repeatableActions.has(key));
  if(rule.requires){
    for(const [key2, value] of Object.entries(rule.requires)){
      if(state.room[key2] !== value) return false;
    }
  }
  if(rule.requiresNot){
    for(const [key2, value] of Object.entries(rule.requiresNot)){
      if(state.room[key2] === value) return false;
    }
  }
  return true;
}

function applyRule(rule){
  if(!rule || !rule.set) return;
  Object.assign(state.room, rule.set);
}

function unavailableMessage(rule, key){
  if(key && state.usedActions.has(key) && !repeatableActions.has(key)) return 'その行動はもう試しました。別の方法を考えよう。';
  return rule?.unavailable || '今はその使い方はできません。';
}

function backgroundForRoom(defaultBg){
  if(defaultBg) return defaultBg;
  if(state.room.window === 'open') return 'room_window_open.png';
  if(state.room.curtain === 'closed' || state.room.blanketWindow) return 'room_curtain_closed.png';
  return 'room_hot.png';
}

function todayKey(){
  const d = new Date();
  return `wanko-rescue-ranking-${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}`;
}

function init(){
  $('#startButton').addEventListener('click', startGame);
  $('#playerNameInput').addEventListener('keydown', (e)=>{ if(e.key === 'Enter') startGame(); });
  $('#homeButton').addEventListener('click', ()=>location.reload());
  $('#soundButton').addEventListener('click', toggleSound);
  $('#helpButton').addEventListener('click', ()=>$('#helpModal').classList.remove('hidden'));
  $('#closeHelpButton').addEventListener('click', ()=>$('#helpModal').classList.add('hidden'));
  $('#toggleDrawerButton').addEventListener('click', toggleDrawer);
  $('#cancelChoiceButton').addEventListener('click', ()=>{ state.pendingDrop=null; $('#choiceModal').classList.add('hidden'); });
  $('#saveScoreButton').addEventListener('click', recordScore);
  $('#rankingButton').addEventListener('click', showRanking);
  $('#closeRankingButton').addEventListener('click', ()=>$('#rankingModal').classList.add('hidden'));
  ensurePlacedLayer();
  renderItems();
  updateUI();
}

function ensurePlacedLayer(){
  if(!$('#placedItems')){
    const layer = document.createElement('div');
    layer.id = 'placedItems';
    layer.className = 'placed-items';
    $('.play-area').appendChild(layer);
  }
}

function startGame(){
  const name = $('#playerNameInput').value.trim() || 'ななし';
  state.player = name;
  $('#playerNameLabel').textContent = name;
  $('#startScreen').classList.add('hidden');
  toast(`${name}さん、スタート！`);
}

function toggleSound(){
  state.sound = !state.sound;
  $('#soundButton').querySelector('.icon').textContent = state.sound ? '🔊' : '🔇';
}

function toggleDrawer(){
  const drawer = $('#itemDrawer');
  drawer.classList.toggle('open');
  $('#toggleDrawerButton').textContent = drawer.classList.contains('open') ? 'アイテム ▲' : 'アイテム ▼';
}

function renderItems(){
  const grid = $('#itemGrid');
  grid.innerHTML = '';
  items.forEach((item, index)=>{
    const button = document.createElement('button');
    button.className = 'item-card';
    button.dataset.index = index;
    button.innerHTML = `<img src="${itemPath}${item.img}" alt="${item.name}"><span>${item.name}</span>`;
    button.addEventListener('click', (e)=>{
      if(button.dataset.dragged === 'true') return;
      state.pendingDrop = null;
      openChoices(index);
    });
    setupPointerDrag(button, index, item);
    grid.appendChild(button);
  });
}

function setupPointerDrag(card, index, item){
  let startX=0, startY=0, dragging=false, ghost=null;

  card.addEventListener('pointerdown', (e)=>{
    if(e.button !== undefined && e.button !== 0) return;
    startX = e.clientX; startY = e.clientY; dragging = false;
    card.dataset.dragged = 'false';
    activeDrag = {index, item, x:startX, y:startY};
    card.setPointerCapture?.(e.pointerId);
  });

  card.addEventListener('pointermove', (e)=>{
    if(!activeDrag || activeDrag.index !== index) return;
    const dx = e.clientX - startX;
    const dy = e.clientY - startY;
    if(!dragging && Math.hypot(dx,dy) > 10){
      dragging = true;
      card.dataset.dragged = 'true';
      ghost = document.createElement('div');
      ghost.className = 'drag-ghost';
      ghost.innerHTML = `<img src="${itemPath}${item.img}" alt=""><span>${item.name}</span>`;
      document.body.appendChild(ghost);
      $('.dog-image').classList.add('dog-drop-ready');
    }
    if(dragging && ghost){
      ghost.style.left = `${e.clientX}px`;
      ghost.style.top = `${e.clientY}px`;
      const overDog = isPointOverElement(e.clientX, e.clientY, $('#dogImage'));
      $('.dog-image').classList.toggle('dog-drop-hover', overDog);
    }
  });

  card.addEventListener('pointerup', (e)=>{
    card.releasePointerCapture?.(e.pointerId);
    const wasDragging = dragging;
    if(ghost) ghost.remove();
    $('.dog-image').classList.remove('dog-drop-ready','dog-drop-hover');
    activeDrag = null;

    if(wasDragging){
      const playRect = $('.play-area').getBoundingClientRect();
      const overDog = isPointOverElement(e.clientX, e.clientY, $('#dogImage'));
      const inPlay = e.clientX >= playRect.left && e.clientX <= playRect.right && e.clientY >= playRect.top && e.clientY <= playRect.bottom;
      if(overDog || inPlay){
        state.pendingDrop = {
          x: e.clientX - playRect.left,
          y: e.clientY - playRect.top,
          img: item.img,
          name: item.name,
          onDog: overDog
        };
        openChoices(index);
      }else{
        toast('わんこの近くに持っていこう。');
      }
      window.setTimeout(()=>{ card.dataset.dragged='false'; }, 50);
    }
  });

  card.addEventListener('pointercancel', ()=>{
    if(ghost) ghost.remove();
    $('.dog-image').classList.remove('dog-drop-ready','dog-drop-hover');
    activeDrag = null;
    card.dataset.dragged = 'false';
  });
}

function isPointOverElement(x, y, element){
  if(!element) return false;
  const r = element.getBoundingClientRect();
  return x >= r.left && x <= r.right && y >= r.top && y <= r.bottom;
}

function openChoices(index){
  const item = items[index];
  $('#choiceTitle').textContent = `${item.name}を どう使う？`;
  $('#choiceText').textContent = state.pendingDrop ? 'ドラッグした場所に使います。使い方を選びましょう。' : '使い方を選びましょう。できないことは灰色で出ます。';
  const choiceList = $('#choiceList');
  choiceList.innerHTML = '';
  item.choices.forEach((choice)=>{
    const button = document.createElement('button');
    const label = choice[0];
    const key = actionKey(item.name, label);
    const rule = getRule(item.name, label);
    const available = isChoiceAvailable(rule, key);
    button.textContent = available ? label : `${label}（できません）`;
    button.disabled = !available;
    if(!available) button.classList.add('choice-disabled');
    button.addEventListener('click', ()=>applyChoice(choice, item.name, item.img));
    choiceList.appendChild(button);
  });
  $('#choiceModal').classList.remove('hidden');
}

function applyChoice(choice, itemName, itemImg){
  const [label, tempDelta, energyDelta, message, bgFromChoice] = choice;
  const key = actionKey(itemName, label);
  const rule = getRule(itemName, label);
  if(!isChoiceAvailable(rule, key)){
    toast(unavailableMessage(rule, key));
    return;
  }

  $('#choiceModal').classList.add('hidden');
  applyRule(rule);
  state.usedActions.add(key);

  let appliedTemp = tempDelta;
  let appliedEnergy = energyDelta;
  if(rule?.effectSlot){
    const previous = state.effects[rule.effectSlot] || {temp:0, energy:0};
    const next = rule.effect || {temp:tempDelta, energy:energyDelta};
    appliedTemp = next.temp - previous.temp;
    appliedEnergy = next.energy - previous.energy;
    state.effects[rule.effectSlot] = next;
  }

  state.temp = Math.max(20, Math.min(40, state.temp + appliedTemp));
  state.energy = Math.max(0, Math.min(100, state.energy + appliedEnergy));
  state.used += 1;
  state.score = Math.max(0, Math.round(state.energy * 1.25 + (32 - state.temp) * 14 - state.used * 2));

  const nextBg = backgroundForRoom(rule?.bg || bgFromChoice);
  $('#roomImage').src = bgPath + nextBg;

  const actionSprite = actionSprites[key];
  placeDroppedItem(itemImg || state.pendingDrop?.img, itemName, state.pendingDrop, actionSprite);
  state.pendingDrop = null;

  toast(message);
  updateUI();
}

function placeDroppedItem(img, name, drop, actionSprite){
  if(!img && !actionSprite) return;
  const layer = $('#placedItems');
  const el = document.createElement('img');
  el.className = actionSprite ? 'placed-result' : 'placed-item';
  el.src = actionSprite ? actionPath + actionSprite : itemPath + img;
  el.alt = name || '';
  const playRect = $('.play-area').getBoundingClientRect();
  let x, y;
  if(drop){
    x = Math.max(70, Math.min(playRect.width - 70, drop.x));
    y = Math.max(80, Math.min(playRect.height - 70, drop.y));
  }else{
    const dogRect = $('#dogImage').getBoundingClientRect();
    x = (dogRect.left + dogRect.width/2) - playRect.left;
    y = (dogRect.top + dogRect.height/2) - playRect.top;
  }
  el.style.left = `${x}px`;
  el.style.top = `${y}px`;
  layer.appendChild(el);

  // 結果イラストは学習表示として大きめ、古いものは残しすぎない
  const maxItems = 4;
  while(layer.children.length > maxItems){
    layer.firstElementChild.remove();
  }
}

function updateUI(){
  $('#temperatureValue').textContent = state.temp;
  $('#thermoFill').style.height = `${Math.max(16, (state.temp - 20) * 5)}%`;
  $('#energyFill').style.width = `${state.energy}%`;
  $('#scoreValue').textContent = state.score;

  const dog = $('#dogImage');
  const speech = $('#speechBubble');

  dog.classList.remove('dog-hot','dog-ok','dog-happy');
  if(state.energy >= 65 || state.temp <= 27){
    dog.src = dogPath + 'dog_happy.png';
    dog.classList.add('dog-happy');
    speech.textContent = 'すずしい！ありがとう！';
    speech.style.borderColor = '#4bad5e';
    speech.style.color = '#268440';
    $('#energyMessage').textContent = 'げんきに なってきたよ！';
    $('#roomMessage').innerHTML = 'すこし<br>すずしくなったよ！';
  }else if(state.energy >= 40){
    dog.src = dogPath + 'dog_ok.png';
    dog.classList.add('dog-ok');
    speech.textContent = 'すこし らく…';
    speech.style.borderColor = '#f1a13d';
    speech.style.color = '#c96d18';
    $('#energyMessage').textContent = '少し げんきが もどったよ！';
    $('#roomMessage').innerHTML = 'まだ<br>あついよ！';
  }else{
    dog.src = dogPath + 'dog_hot.png';
    dog.classList.add('dog-hot');
    speech.textContent = 'あついよ〜';
    speech.style.borderColor = '#e53935';
    speech.style.color = '#e53935';
    $('#energyMessage').textContent = 'とっても げんきが なくなっているよ！';
    $('#roomMessage').innerHTML = 'おへやが<br>とっても あついよ！';
  }
}

function toast(message){
  const toastElement = $('#toast');
  toastElement.textContent = message;
  toastElement.classList.remove('hidden');
  window.clearTimeout(window.__toastTimer);
  window.__toastTimer = window.setTimeout(()=>toastElement.classList.add('hidden'), 2600);
}

function recordScore(){
  const list = JSON.parse(localStorage.getItem(todayKey()) || '[]');
  list.push({
    name: state.player || 'ななし',
    score: state.score,
    temp: state.temp,
    energy: state.energy,
    time: new Date().toLocaleTimeString('ja-JP',{hour:'2-digit',minute:'2-digit'})
  });
  list.sort((a,b)=>b.score-a.score);
  localStorage.setItem(todayKey(), JSON.stringify(list.slice(0, 20)));
  toast('今日のランキングに記録したよ！');
}

function showRanking(){
  const list = JSON.parse(localStorage.getItem(todayKey()) || '[]');
  const rankingList = $('#rankingList');
  rankingList.innerHTML = list.length
    ? list.map((item)=>`<li><b>${item.name}</b>　${item.score}点　${item.temp}℃　${item.time}</li>`).join('')
    : '<li>まだ記録がありません</li>';
  $('#rankingModal').classList.remove('hidden');
}

init();
