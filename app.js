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
    ['しめる', -2, 8, '日ざしがへって、部屋が暑くなりにくくなった！'],
    ['あける', 0, 0, 'カーテンをあけたよ。']
  ]},
  { name:'まど', img:'window_open.png', choices:[
    ['あける', -1, 5, '風が入って、少しすずしい！'],
    ['しめきる', 0, 0, 'まどをしめたよ。']
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
    ['窓にかける', -1, 6, '日ざしを少しふせげた！']
  ]},
  { name:'ドライヤー', img:'dryer.png', choices:[
    ['温かい風', 2, -10, '熱い風で、もっと暑くなった！'],
    ['冷たい風', -1, 6, '冷たい風なら少しすずしい！']
  ]},
  { name:'エアコン', img:'aircon.png', choices:[
    ['冷房にする', -3, 15, '部屋がすずしくなった！'],
    ['暖房にする', 3, -12, '今は暖房ではもっと暑い！'],
    ['切る', 0, 0, 'エアコンを切りました。']
  ]},
  { name:'ライト', img:'light.png', choices:[
    ['つける', 1, -3, '明るくなったけど、少し暑い。'],
    ['けす', 0, 0, 'ライトを消したよ。']
  ]},
  { name:'ストーブ', img:'stove.png', choices:[
    ['つける', 3, -15, 'これは冬の道具！今は暑すぎる。'],
    ['けす', 0, 0, 'ストーブを消しました。']
  ]},
  { name:'こたつ', img:'kotatsu.png', choices:[
    ['入れる', 2, -12, 'こたつは今は暑い！'],
    ['片づける', 0, 0, 'こたつを片づけたよ。']
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
  'ライト|つける': 'light_hot.png',
  'ストーブ|つける': 'stove_hot.png',
  'こたつ|入れる': 'kotatsu_hot.png',
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
  baseTemp: 32,
  baseEnergy: 18,
  temp: 32,
  energy: 18,
  score: 0,
  bonusTemp: 0,
  bonusEnergy: 0,
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
  effects: {},
  pendingDrop: null,
  visuals: {},
  currentDogAction: null
};

const actionRules = {
  'カーテン|しめる': { requires: { curtain: 'open' }, set: { curtain: 'closed', blanketWindow: false }, effectSlot:'curtain', effect:{temp:-2, energy:8}, visualSlot:'curtain', unavailable:'カーテンはもう閉まっています。' },
  'カーテン|あける': { requires: { curtain: 'closed' }, set: { curtain: 'open', blanketWindow: false }, effectSlot:'curtain', effect:{temp:0, energy:0}, visualSlot:'curtain', unavailable:'カーテンはもう開いています。' },
  'まど|あける': { requires: { window: 'closed' }, set: { window: 'open' }, effectSlot:'window', effect:{temp:-1, energy:5}, visualSlot:'window', unavailable:'まどはもう開いています。' },
  'まど|しめきる': { requires: { window: 'open' }, set: { window: 'closed' }, effectSlot:'window', effect:{temp:0, energy:0}, visualSlot:'window', unavailable:'まどはもう閉まっています。' },
  '扇風機|わんこに むける': { requiresNot: { fan: 'dog' }, set: { fan:'dog' }, effectSlot:'fan', effect:{temp:-1, energy:12}, visualSlot:'fan', unavailable:'扇風機はもうわんこに向いています。' },
  '扇風機|へやの空気をまわす': { requiresNot: { fan: 'room' }, set: { fan:'room' }, effectSlot:'fan', effect:{temp:0, energy:6}, visualSlot:'fan', unavailable:'扇風機はもう部屋の空気を回しています。' },
  '扇風機|暑い場所にむける': { requiresNot: { fan: 'wrong' }, set: { fan:'wrong' }, effectSlot:'fan', effect:{temp:0, energy:0}, visualSlot:'fan', unavailable:'扇風機はもうその向きです。' },
  'エアコン|冷房にする': { requiresNot: { aircon: 'cool' }, set: { aircon:'cool' }, effectSlot:'aircon', effect:{temp:-3, energy:15}, visualSlot:'aircon', unavailable:'エアコンはもう冷房です。' },
  'エアコン|暖房にする': { requiresNot: { aircon: 'warm' }, set: { aircon:'warm' }, effectSlot:'aircon', effect:{temp:3, energy:-12}, visualSlot:'aircon', unavailable:'エアコンはもう暖房です。' },
  'エアコン|切る': { requiresNot: { aircon: 'off' }, set: { aircon:'off' }, effectSlot:'aircon', effect:{temp:0, energy:0}, visualSlot:'aircon', unavailable:'エアコンはもう切れています。' },
  'ドライヤー|温かい風': { requiresNot: { dryer: 'warm' }, set: { dryer:'warm' }, effectSlot:'dryer', effect:{temp:2, energy:-10}, visualSlot:'dryer', unavailable:'ドライヤーはもう温風です。' },
  'ドライヤー|冷たい風': { requiresNot: { dryer: 'cool' }, set: { dryer:'cool' }, effectSlot:'dryer', effect:{temp:-1, energy:6}, visualSlot:'dryer', unavailable:'ドライヤーはもう冷風です。' },
  'ライト|つける': { requires: { light: 'off' }, set: { light:'on' }, effectSlot:'light', effect:{temp:1, energy:-3}, visualSlot:'light', unavailable:'ライトはもうついています。' },
  'ライト|けす': { requires: { light: 'on' }, set: { light:'off' }, effectSlot:'light', effect:{temp:0, energy:0}, visualSlot:'light', unavailable:'ライトはもう消えています。' },
  'ストーブ|つける': { requires: { stove: 'off' }, set: { stove:'on' }, effectSlot:'stove', effect:{temp:3, energy:-15}, visualSlot:'stove', unavailable:'ストーブはもうついています。' },
  'ストーブ|けす': { requires: { stove: 'on' }, set: { stove:'off' }, effectSlot:'stove', effect:{temp:0, energy:0}, visualSlot:'stove', unavailable:'ストーブはもう消えています。' },
  'こたつ|入れる': { requires: { kotatsu: 'off' }, set: { kotatsu:'on' }, effectSlot:'kotatsu', effect:{temp:2, energy:-12}, visualSlot:'kotatsu', unavailable:'もうこたつに入っています。' },
  'こたつ|片づける': { requires: { kotatsu: 'on' }, set: { kotatsu:'off' }, effectSlot:'kotatsu', effect:{temp:0, energy:0}, visualSlot:'kotatsu', unavailable:'こたつはもう片づいています。' },
  '毛布|わんこにかける': { requires: { blanketDog: false }, set: { blanketDog:true }, effectSlot:'blanketDog', effect:{temp:1, energy:-10}, visualSlot:'blanketDog', unavailable:'毛布はもうわんこにかかっています。' },
  '毛布|窓にかける': { requires: { blanketWindow: false }, set: { blanketWindow:true, curtain:'closed' }, effectSlot:'blanketWindow', effect:{temp:-1, energy:6}, visualSlot:'blanketWindow', unavailable:'毛布はもう窓にかかっています。' }
};

const slotResets = {
  curtain(){ state.room.curtain = 'open'; state.room.blanketWindow = false; state.effects.curtain = {temp:0,energy:0}; },
  window(){ state.room.window = 'closed'; state.effects.window = {temp:0,energy:0}; },
  fan(){ state.room.fan = 'off'; state.effects.fan = {temp:0,energy:0}; },
  aircon(){ state.room.aircon = 'off'; state.effects.aircon = {temp:0,energy:0}; },
  dryer(){ state.room.dryer = 'off'; state.effects.dryer = {temp:0,energy:0}; },
  light(){ state.room.light = 'off'; state.effects.light = {temp:0,energy:0}; },
  stove(){ state.room.stove = 'off'; state.effects.stove = {temp:0,energy:0}; },
  kotatsu(){ state.room.kotatsu = 'off'; state.effects.kotatsu = {temp:0,energy:0}; },
  blanketDog(){ state.room.blanketDog = false; state.effects.blanketDog = {temp:0,energy:0}; },
  blanketWindow(){ state.room.blanketWindow = false; state.effects.blanketWindow = {temp:0,energy:0}; }
};

function todayKey(){
  const d = new Date();
  return `wanko-ranking-${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}`;
}

function init(){
  ensureLayers();
  renderItems();
  bindEvents();
  recomputeVitals();
  updateUI();
}

function ensureLayers(){
  const play = $('.play-area');
  if(!$('#placedItems')){
    const layer = document.createElement('div');
    layer.id = 'placedItems';
    layer.className = 'placed-items';
    play.appendChild(layer);
  }
  if(!$('#trashBin')){
    const trash = document.createElement('div');
    trash.id = 'trashBin';
    trash.className = 'trash-bin';
    trash.innerHTML = '🗑️<span>ここへドラッグでけす</span>';
    play.appendChild(trash);
  }
}

function bindEvents(){
  $('#startButton').addEventListener('click', startGame);
  $('#playerNameInput').addEventListener('keydown', (e)=>{ if(e.key === 'Enter') startGame(); });
  $('#toggleDrawerButton').addEventListener('click', toggleDrawer);
  $('#soundButton').addEventListener('click', toggleSound);
  $('#cancelChoiceButton').addEventListener('click', ()=>{ $('#choiceModal').classList.add('hidden'); state.pendingDrop = null; });
  $('#saveScoreButton').addEventListener('click', recordScore);
  $('#rankingButton').addEventListener('click', showRanking);
  $('#closeRankingButton').addEventListener('click', ()=>$('#rankingModal').classList.add('hidden'));
  $('#helpButton').addEventListener('click', ()=>$('#helpModal').classList.remove('hidden'));
  $('#closeHelpButton').addEventListener('click', ()=>$('#helpModal').classList.add('hidden'));
  $('#homeButton').addEventListener('click', ()=>location.reload());
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
    button.addEventListener('click', ()=>{
      if(button.dataset.dragged === 'true') return;
      state.pendingDrop = null;
      openChoices(index);
    });
    setupPointerDrag(button, index, item);
    grid.appendChild(button);
  });
}

let activeDrag = null;
function setupPointerDrag(card, index, item){
  let startX=0, startY=0, dragging=false, ghost=null;
  card.addEventListener('pointerdown', (e)=>{
    if(e.button !== undefined && e.button !== 0) return;
    startX=e.clientX; startY=e.clientY; dragging=false;
    card.dataset.dragged='false';
    activeDrag = {index, item};
    card.setPointerCapture?.(e.pointerId);
  });
  card.addEventListener('pointermove', (e)=>{
    if(!activeDrag || activeDrag.index !== index) return;
    const dx=e.clientX-startX, dy=e.clientY-startY;
    if(!dragging && Math.hypot(dx,dy) > 10){
      dragging = true; card.dataset.dragged='true';
      ghost = document.createElement('div');
      ghost.className = 'drag-ghost';
      ghost.innerHTML = `<img src="${itemPath}${item.img}" alt=""><span>${item.name}</span>`;
      document.body.appendChild(ghost);
      $('#dogImage').classList.add('dog-drop-ready');
    }
    if(dragging && ghost){
      ghost.style.left = `${e.clientX}px`;
      ghost.style.top = `${e.clientY}px`;
      const overDog = isPointOverElement(e.clientX,e.clientY,$('#dogImage'));
      $('#dogImage').classList.toggle('dog-drop-hover', overDog);
    }
  });
  const cleanup = ()=>{
    if(ghost) ghost.remove();
    $('#dogImage').classList.remove('dog-drop-ready','dog-drop-hover');
    activeDrag = null;
    window.setTimeout(()=>{ card.dataset.dragged='false'; },50);
  };
  card.addEventListener('pointerup', (e)=>{
    card.releasePointerCapture?.(e.pointerId);
    const wasDragging = dragging;
    cleanup();
    if(wasDragging){
      const playRect = $('.play-area').getBoundingClientRect();
      const overDog = isPointOverElement(e.clientX,e.clientY,$('#dogImage'));
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
      } else {
        toast('わんこの近くか部屋の中へ持っていこう。');
      }
    }
  });
  card.addEventListener('pointercancel', cleanup);
}

function isPointOverElement(x,y,el){
  if(!el) return false;
  const r = el.getBoundingClientRect();
  return x>=r.left && x<=r.right && y>=r.top && y<=r.bottom;
}

function openChoices(index){
  const item = items[index];
  $('#choiceTitle').textContent = `${item.name}を どう使う？`;
  $('#choiceText').textContent = state.pendingDrop ? 'ドラッグした場所に使います。使い方を選びましょう。' : '使い方を選びましょう。';
  const list = $('#choiceList');
  list.innerHTML = '';
  item.choices.forEach((choice)=>{
    const [label] = choice;
    const key = `${item.name}|${label}`;
    const rule = actionRules[key];
    const available = isChoiceAvailable(rule);
    const btn = document.createElement('button');
    btn.textContent = available ? label : `${label}（できません）`;
    btn.disabled = !available;
    if(!available) btn.classList.add('choice-disabled');
    btn.addEventListener('click', ()=>applyChoice(choice, item.name, item.img));
    list.appendChild(btn);
  });
  $('#choiceModal').classList.remove('hidden');
}

function isChoiceAvailable(rule){
  if(!rule) return true;
  if(rule.requires){
    for(const [k,v] of Object.entries(rule.requires)) if(state.room[k] !== v) return false;
  }
  if(rule.requiresNot){
    for(const [k,v] of Object.entries(rule.requiresNot)) if(state.room[k] === v) return false;
  }
  return true;
}

function applyChoice(choice, itemName, itemImg){
  const [label, tempDelta, energyDelta, message] = choice;
  const key = `${itemName}|${label}`;
  const rule = actionRules[key];
  if(rule && !isChoiceAvailable(rule)){
    toast(rule.unavailable || '今はその使い方はできません。');
    return;
  }
  $('#choiceModal').classList.add('hidden');
  if(rule?.set) Object.assign(state.room, rule.set);
  if(rule?.effectSlot){
    state.effects[rule.effectSlot] = rule.effect || {temp: tempDelta, energy: energyDelta};
  } else {
    state.bonusTemp += tempDelta;
    state.bonusEnergy += energyDelta;
  }
  const actionSprite = actionSprites[key];
  const useOnDog = Boolean(state.pendingDrop?.onDog && actionSprite);
  if(useOnDog){
    state.currentDogAction = actionSprite;
  } else {
    placeDroppedVisual({
      itemName,
      itemImg,
      actionSprite,
      slot: rule?.visualSlot || rule?.effectSlot || 'lastAction',
      drop: state.pendingDrop,
      stateful: Boolean(rule?.effectSlot)
    });
  }
  state.pendingDrop = null;
  recomputeVitals();
  updateUI();
  toast(message);
}

function placeDroppedVisual({itemName,itemImg,actionSprite,slot,drop,stateful}){
  const layer = $('#placedItems');
  const existing = state.visuals[slot];
  if(existing?.el) existing.el.remove();

  const playRect = $('.play-area').getBoundingClientRect();
  const dogRect = $('#dogImage').getBoundingClientRect();
  let x, y;
  if(drop){
    x = Math.max(70, Math.min(playRect.width - 70, drop.x));
    y = Math.max(75, Math.min(playRect.height - 75, drop.y));
  } else {
    x = (dogRect.left + dogRect.width/2) - playRect.left;
    y = (dogRect.top + dogRect.height/2) - playRect.top;
  }

  const el = document.createElement('img');
  el.className = actionSprite ? 'placed-result' : 'placed-item';
  el.src = actionSprite ? actionPath + actionSprite : itemPath + itemImg;
  el.alt = itemName;
  el.style.left = `${x}px`;
  el.style.top = `${y}px`;
  el.dataset.slot = slot;
  el.dataset.stateful = stateful ? 'true':'false';
  layer.appendChild(el);
  state.visuals[slot] = {el, x, y, stateful};
  setupPlacedDrag(el, slot);
}

function setupPlacedDrag(el, slot){
  let startX=0, startY=0, dragging=false;
  el.addEventListener('pointerdown', (e)=>{
    e.preventDefault();
    startX = e.clientX; startY = e.clientY; dragging=false;
    el.setPointerCapture?.(e.pointerId);
  });
  el.addEventListener('pointermove', (e)=>{
    const dx = e.clientX-startX, dy = e.clientY-startY;
    if(!dragging && Math.hypot(dx,dy) > 8){ dragging=true; }
    if(dragging){
      const playRect = $('.play-area').getBoundingClientRect();
      const x = Math.max(40, Math.min(playRect.width-40, e.clientX-playRect.left));
      const y = Math.max(40, Math.min(playRect.height-40, e.clientY-playRect.top));
      el.style.left = `${x}px`;
      el.style.top = `${y}px`;
      const overTrash = isPointOverElement(e.clientX,e.clientY,$('#trashBin'));
      $('#trashBin').classList.toggle('trash-hover', overTrash);
    }
  });
  const finish = (e)=>{
    el.releasePointerCapture?.(e.pointerId);
    const overTrash = isPointOverElement(e.clientX,e.clientY,$('#trashBin'));
    $('#trashBin').classList.remove('trash-hover');
    if(dragging && overTrash){
      removeVisual(slot);
      toast('アイテムをけしたよ。');
      return;
    }
    const playRect = $('.play-area').getBoundingClientRect();
    const x = parseFloat(el.style.left);
    const y = parseFloat(el.style.top);
    if(state.visuals[slot]){ state.visuals[slot].x = x; state.visuals[slot].y = y; }
  };
  el.addEventListener('pointerup', finish);
  el.addEventListener('pointercancel', ()=>$('#trashBin').classList.remove('trash-hover'));
}

function removeVisual(slot){
  const vis = state.visuals[slot];
  if(vis?.el) vis.el.remove();
  delete state.visuals[slot];
  if(slotResets[slot]) slotResets[slot]();
  recomputeVitals();
  updateUI();
}

function recomputeVitals(){
  let temp = state.baseTemp + state.bonusTemp;
  let energy = state.baseEnergy + state.bonusEnergy;
  for(const eff of Object.values(state.effects)){
    if(!eff) continue;
    temp += eff.temp || 0;
    energy += eff.energy || 0;
  }
  state.temp = Math.max(20, Math.min(40, temp));
  state.energy = Math.max(0, Math.min(100, energy));
  // 現在の状態のみでスコアを決める。往復操作での点数稼ぎを防止。
  state.score = Math.max(0, Math.round(state.energy * 1.4 + (32 - state.temp) * 12));
  $('#roomImage').src = bgPath + currentBackground();
}

function currentBackground(){
  if(state.room.curtain === 'closed' || state.room.blanketWindow) return 'room_curtain_closed.png';
  if(state.room.window === 'open') return 'room_window_open.png';
  return 'room_hot.png';
}

function updateUI(){
  $('#temperatureValue').textContent = state.temp;
  $('#thermoFill').style.height = `${Math.max(16, (state.temp - 20) * 5)}%`;
  $('#energyFill').style.width = `${state.energy}%`;
  $('#scoreValue').textContent = state.score;

  const dog = $('#dogImage');
  const speech = $('#speechBubble');
  dog.classList.remove('dog-hot','dog-ok','dog-happy','dog-action');
  const usingActionDog = Boolean(state.currentDogAction);
  if(state.energy >= 65 || state.temp <= 27){
    dog.src = usingActionDog ? (actionPath + state.currentDogAction) : (dogPath + 'dog_happy.png');
    dog.classList.add(usingActionDog ? 'dog-action' : 'dog-happy');
    speech.textContent = 'すずしい！ありがとう！';
    speech.style.borderColor = '#4bad5e';
    speech.style.color = '#268440';
    $('#energyMessage').textContent = 'げんきに なってきたよ！';
    $('#roomMessage').innerHTML = 'すこし<br>すずしくなったよ！';
  } else if(state.energy >= 40){
    dog.src = usingActionDog ? (actionPath + state.currentDogAction) : (dogPath + 'dog_ok.png');
    dog.classList.add(usingActionDog ? 'dog-action' : 'dog-ok');
    speech.textContent = 'すこし らく…';
    speech.style.borderColor = '#f1a13d';
    speech.style.color = '#c96d18';
    $('#energyMessage').textContent = '少し げんきが もどったよ！';
    $('#roomMessage').innerHTML = 'まだ<br>あついよ！';
  } else {
    dog.src = usingActionDog ? (actionPath + state.currentDogAction) : (dogPath + 'dog_hot.png');
    dog.classList.add(usingActionDog ? 'dog-action' : 'dog-hot');
    speech.textContent = 'あついよ〜';
    speech.style.borderColor = '#e53935';
    speech.style.color = '#e53935';
    $('#energyMessage').textContent = 'とっても げんきが なくなっているよ！';
    $('#roomMessage').innerHTML = 'おへやが<br>とっても あついよ！';
  }
}

function toast(message){
  const t = $('#toast');
  t.textContent = message;
  t.classList.remove('hidden');
  clearTimeout(window.__toastTimer);
  window.__toastTimer = setTimeout(()=>t.classList.add('hidden'), 2400);
}

function recordScore(){
  const list = JSON.parse(localStorage.getItem(todayKey()) || '[]');
  list.push({name: state.player || 'ななし', score: state.score, temp: state.temp, energy: state.energy, time: new Date().toLocaleTimeString('ja-JP',{hour:'2-digit',minute:'2-digit'})});
  list.sort((a,b)=>b.score-a.score);
  localStorage.setItem(todayKey(), JSON.stringify(list.slice(0,20)));
  toast('今日のランキングに記録したよ！');
}

function showRanking(){
  const list = JSON.parse(localStorage.getItem(todayKey()) || '[]');
  $('#rankingList').innerHTML = list.length ? list.map(item=>`<li><b>${item.name}</b>　${item.score}点　${item.temp}℃　${item.time}</li>`).join('') : '<li>まだ記録がありません</li>';
  $('#rankingModal').classList.remove('hidden');
}

init();
