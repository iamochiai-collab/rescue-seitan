window.addEventListener('error', (e)=>{
  const t = document.querySelector('#toast');
  if(t){
    t.textContent = 'エラー：' + (e.message || '読み込みに失敗しました');
    t.classList.remove('hidden');
  }
});


const $ = s => document.querySelector(s);
const itemGrid = $('#itemGrid');
const choiceModal = $('#choiceModal');
const choiceList = $('#choiceList');
const roomOverlays = $('#roomOverlays');
const trashBin = $('#trashBin');

const ITEMS = [
  {id:'water', name:'みず', emoji:'💧', choices:[['のませる',{dog:'dog_drink_water.png', temp:0, energy:14, key:'water_drink'}],['タオルをぬらす',{dog:'dog_cold_towel.png', temp:-1, energy:10, key:'water_towel'}]]},
  {id:'tea', name:'おちゃ', emoji:'🍵', choices:[['つめたいおちゃ',{dog:'dog_drink_iced_tea.png', temp:0, energy:8, key:'tea_cold'}],['あついおちゃ',{dog:'dog_drink_hot_tea.png', temp:1, energy:-5, key:'tea_hot'}]]},
  {id:'uchiwa', name:'うちわ', emoji:'🪭', choices:[['あおぐ',{dog:'dog_use_uchiwa.png', temp:-1, energy:10, key:'uchiwa'}]]},
  {id:'fan', name:'せんぷうき', emoji:'🌀', choices:[['わんこにむける',{dog:'dog_fan_cool.png', room:{slot:'fan', label:'せんぷうき', emoji:'🌀', x:24, y:58}, effectSlot:'fan', effect:{temp:-1, energy:12}, key:'fan_dog'}],['へやにむける',{room:{slot:'fan', label:'せんぷうき', emoji:'🌀', x:24, y:58}, effectSlot:'fan', effect:{temp:0, energy:6}, key:'fan_room'}]]},
  {id:'towel', name:'れいタオル', emoji:'🧊', choices:[['ひやす',{dog:'dog_cold_towel.png', temp:-1, energy:12, key:'cold_towel'}]]},
  {id:'icebag', name:'ひょうのう', emoji:'🧴', choices:[['ねそべってひやす',{dog:'dog_ice_bag_lie.png', temp:-2, energy:12, key:'icebag_lie'}],['すわってひやす',{dog:'dog_ice_bag_sit.png', temp:-2, energy:12, key:'icebag_sit'}]]},
  {id:'aircon', name:'エアコン', emoji:'❄️', choices:[['れいぼう',{dog:'dog_aircon_cool.png', room:{slot:'aircon', label:'れいぼう', emoji:'❄️', x:76, y:16}, effectSlot:'aircon', effect:{temp:-3, energy:15}, key:'aircon_cool'}],['だんぼう',{dog:'dog_aircon_warm.png', room:{slot:'aircon', label:'だんぼう', emoji:'♨️', x:76, y:16}, effectSlot:'aircon', effect:{temp:3, energy:-12}, key:'aircon_warm'}],['きる',{room:{slot:'aircon', label:'エアコン', emoji:'⬜', x:76, y:16}, effectSlot:'aircon', effect:{temp:0, energy:0}, clearDog:false, key:'aircon_off'}]]},
  {id:'window', name:'まど', emoji:'🪟', choices:[['あける',{dog:'dog_window_open.png', room:{slot:'window', label:'まど あけ', emoji:'🪟', x:78, y:44}, effectSlot:'window', effect:{temp:-1, energy:5}, key:'window_open'}],['しめる',{dog:'dog_window_closed.png', room:{slot:'window', label:'まど しめ', emoji:'🪟', x:78, y:44}, effectSlot:'window', effect:{temp:0, energy:0}, key:'window_closed'}]]},
  {id:'curtain', name:'カーテン', emoji:'🟦', choices:[['しめる',{dog:'dog_curtain_closed.png', room:{slot:'curtain', label:'カーテン しめ', emoji:'🟦', x:10, y:18}, effectSlot:'curtain', effect:{temp:-2, energy:8}, key:'curtain_closed'}],['あける',{dog:'dog_curtain_open_hot.png', room:{slot:'curtain', label:'カーテン あけ', emoji:'🌞', x:10, y:18}, effectSlot:'curtain', effect:{temp:0, energy:0}, key:'curtain_open'}]]},
  {id:'blanket', name:'もうふ', emoji:'🛏️', choices:[['かける',{dog:'dog_with_blanket.png', temp:1, energy:-10, key:'blanket_dog'}]]},
  {id:'dryer', name:'ドライヤー', emoji:'💨', choices:[['れいふう',{dog:'dog_dryer_cool.png', temp:-1, energy:6, key:'dryer_cool'}],['おんぷう',{dog:'dog_dryer_hot.png', temp:2, energy:-10, key:'dryer_hot'}]]}
];


const ITEM_PREVIEWS = {
  water:'assets/dogs/actions/dog_drink_water.png',
  tea:'assets/dogs/actions/dog_drink_iced_tea.png',
  uchiwa:'assets/dogs/actions/dog_use_uchiwa.png',
  fan:'assets/dogs/actions/dog_fan_cool.png',
  towel:'assets/dogs/actions/dog_cold_towel.png',
  icebag:'assets/dogs/actions/dog_ice_bag_lie.png',
  aircon:'assets/dogs/actions/dog_aircon_cool.png',
  window:'assets/dogs/actions/dog_window_open.png',
  curtain:'assets/dogs/actions/dog_curtain_closed.png',
  blanket:'assets/dogs/actions/dog_with_blanket.png',
  dryer:'assets/dogs/actions/dog_dryer_cool.png'
};

const state = {
  player:'ななし',
  baseTemp:32,
  baseEnergy:18,
  bonusTemp:0,
  bonusEnergy:0,
  effects:{},
  roomSlots:{},
  dog:'assets/dogs/base/dog_hot.png',
  used:new Set(),
  score:0,
  temp:32,
  energy:18,
  pendingDrop:null
};

function dogBaseByState(){
  if(state.energy >= 65 || state.temp <= 27) return 'assets/dogs/base/dog_happy.png';
  if(state.energy >= 40) return 'assets/dogs/base/dog_normal.png';
  return 'assets/dogs/base/dog_hot.png';
}

function getItem(id){ return ITEMS.find(i => i.id===id); }

function makeItemCard(item){
  const btn = document.createElement('button');
  btn.className = 'item-card';
  const preview = ITEM_PREVIEWS[item.id];
  btn.innerHTML = preview
    ? `<div class="thumb"><img src="${preview}" alt="${item.name}"></div><span class="name">${item.name}</span>`
    : `<span class="emoji">${item.emoji}</span><span class="name">${item.name}</span>`;
  btn.addEventListener('click', ()=>{ state.pendingDrop = {itemId:item.id, onDog:false, x:null, y:null}; openChoice(item); });
  setupItemDrag(btn, item);
  return btn;
}

function renderItems(){ ITEMS.forEach(item => itemGrid.appendChild(makeItemCard(item))); }

let dragData = null;
function setupItemDrag(el, item){
  let sx=0, sy=0, dragging=false, ghost=null;
  el.addEventListener('pointerdown', e=>{ sx=e.clientX; sy=e.clientY; dragging=false; dragData={item}; el.setPointerCapture?.(e.pointerId); });
  el.addEventListener('pointermove', e=>{
    if(!dragData) return;
    const dx=e.clientX-sx, dy=e.clientY-sy;
    if(!dragging && Math.hypot(dx,dy)>10){
      dragging=true;
      ghost=document.createElement('div');
      ghost.className='drag-ghost';
      ghost.innerHTML=`<span class="emoji">${item.emoji}</span><span class="name">${item.name}</span>`;
      document.body.appendChild(ghost);
    }
    if(dragging && ghost){ ghost.style.left=`${e.clientX}px`; ghost.style.top=`${e.clientY}px`; }
  });
  el.addEventListener('pointerup', e=>{
    el.releasePointerCapture?.(e.pointerId);
    if(ghost) ghost.remove();
    if(dragging){
      const area = $('#playArea').getBoundingClientRect();
      const onDog = pointIn(e.clientX,e.clientY,$('#dogImage').getBoundingClientRect());
      const inArea = pointIn(e.clientX,e.clientY,area);
      if(inArea || onDog){
        state.pendingDrop = {itemId:item.id, onDog, x:e.clientX-area.left, y:e.clientY-area.top};
        openChoice(item);
      } else toast('へやの中か、わんこの上へドラッグしよう。');
    }
    dragData=null;
  });
  el.addEventListener('pointercancel', ()=>{ if(ghost) ghost.remove(); dragData=null; });
}

function pointIn(x,y,r){ return x>=r.left && x<=r.right && y>=r.top && y<=r.bottom; }

function openChoice(item){
  $('#choiceTitle').textContent = `${item.name}を どうつかう？`;
  $('#choiceText').textContent = state.pendingDrop?.onDog ? 'わんこに つかう ほうほうを えらぼう。' : 'へやでの つかいかたを えらぼう。';
  choiceList.innerHTML='';
  item.choices.forEach(([label, cfg])=>{
    const btn=document.createElement('button');
    btn.textContent=label;
    const disabled = state.used.has(cfg.key) && !cfg.effectSlot;
    btn.disabled=disabled;
    if(disabled) btn.textContent = `${label}（もうつかった）`;
    btn.addEventListener('click', ()=>applyChoice(item, label, cfg));
    choiceList.appendChild(btn);
  });
  choiceModal.classList.remove('hidden');
}

function applyChoice(item, label, cfg){
  choiceModal.classList.add('hidden');
  if(!cfg.effectSlot) state.used.add(cfg.key);

  if(cfg.effectSlot){ state.effects[cfg.effectSlot] = cfg.effect || {temp:0, energy:0}; }
  else {
    state.bonusTemp += (cfg.temp || 0);
    state.bonusEnergy += (cfg.energy || 0);
  }

  // dog swap
  if(state.pendingDrop?.onDog && cfg.dog !== false){
    state.dog = `assets/dogs/actions/${cfg.dog}`;
  } else if(cfg.clearDog !== false && cfg.dog){
    state.dog = `assets/dogs/actions/${cfg.dog}`;
  }

  // room overlay
  if(cfg.room){ renderRoomSlot(cfg.room.slot, cfg.room.label, cfg.room.emoji, cfg.room.x, cfg.room.y); }

  recompute();
  updateUI();
  toast(`${item.name}を「${label}」でつかったよ。`);
}

function renderRoomSlot(slot, label, emoji, xPct, yPct){
  let el = state.roomSlots[slot];
  if(!el){
    el = document.createElement('div');
    el.className='room-card';
    el.dataset.slot=slot;
    roomOverlays.appendChild(el);
    state.roomSlots[slot] = el;
    setupRoomCardDrag(el, slot);
  }
  const previewMap = {
    fan: 'assets/dogs/actions/dog_fan_cool.png',
    aircon: 'assets/dogs/actions/dog_aircon_cool.png',
    window: 'assets/dogs/actions/dog_window_open.png',
    curtain: 'assets/dogs/actions/dog_curtain_closed.png'
  };
  const img = previewMap[slot];
  el.innerHTML = img
    ? `<div class="room-thumb"><img src="${img}" alt="${label}"></div><span class="label">${label}</span>`
    : `<span class="emoji">${emoji}</span><span class="label">${label}</span>`;
  el.style.left = `${xPct}%`;
  el.style.top = `${yPct}%`;
}

function setupRoomCardDrag(el, slot){
  let sx=0, sy=0, dragging=false;
  el.addEventListener('pointerdown', e=>{ sx=e.clientX; sy=e.clientY; dragging=false; el.setPointerCapture?.(e.pointerId); });
  el.addEventListener('pointermove', e=>{
    const dx=e.clientX-sx, dy=e.clientY-sy;
    if(!dragging && Math.hypot(dx,dy)>8) dragging=true;
    if(dragging){
      const area = $('#playArea').getBoundingClientRect();
      const x = Math.max(0, Math.min(area.width-90, e.clientX-area.left));
      const y = Math.max(0, Math.min(area.height-60, e.clientY-area.top));
      el.style.left = `${(x/area.width)*100}%`;
      el.style.top = `${(y/area.height)*100}%`;
      trashBin.classList.toggle('trash-hover', pointIn(e.clientX,e.clientY,trashBin.getBoundingClientRect()));
    }
  });
  el.addEventListener('pointerup', e=>{
    el.releasePointerCapture?.(e.pointerId);
    const overTrash = pointIn(e.clientX,e.clientY,trashBin.getBoundingClientRect());
    trashBin.classList.remove('trash-hover');
    if(dragging && overTrash){
      removeRoomSlot(slot);
      toast('へやのどうぐを けしたよ。');
    }
  });
}

function removeRoomSlot(slot){
  const el = state.roomSlots[slot];
  if(el) el.remove();
  delete state.roomSlots[slot];
  delete state.effects[slot];
  recompute();
  updateUI();
}

function recompute(){
  let t=state.baseTemp + state.bonusTemp;
  let e=state.baseEnergy + state.bonusEnergy;
  Object.values(state.effects).forEach(v=>{ if(v){ t += v.temp||0; e += v.energy||0; } });
  state.temp = Math.max(20, Math.min(40, t));
  state.energy = Math.max(0, Math.min(100, e));
  state.score = Math.max(0, Math.round(state.energy*1.4 + (32-state.temp)*12));
}

function updateUI(){
  $('#tempValue').textContent = state.temp;
  $('#scoreValue').textContent = state.score;
  $('#energyBar').style.width = `${state.energy}%`;
  $('#dogImage').src = state.dog || dogBaseByState();
  const speech = $('#speech');
  if(state.energy >= 65 || state.temp <= 27){
    speech.textContent='すずしい！';
    $('#energyText').textContent='げんきいっぱい！';
  } else if(state.energy >= 40){
    speech.textContent='すこし らく…';
    $('#energyText').textContent='すこし げんき';
  } else {
    speech.textContent='あついよ〜';
    $('#energyText').textContent='とてもあつそう！';
  }
}

function toast(msg){
  const t = $('#toast');
  t.textContent = msg;
  t.classList.remove('hidden');
  clearTimeout(window.toastTimer);
  window.toastTimer = setTimeout(()=>t.classList.add('hidden'), 2200);
}

function rankKey(){ const d=new Date(); return `wanko-rank-${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}`; }
function saveScore(){
  const list = JSON.parse(localStorage.getItem(rankKey())||'[]');
  list.push({name:state.player, score:state.score, temp:state.temp, time:new Date().toLocaleTimeString('ja-JP',{hour:'2-digit',minute:'2-digit'})});
  list.sort((a,b)=>b.score-a.score);
  localStorage.setItem(rankKey(), JSON.stringify(list.slice(0,20)));
  toast('スコアをきろくしたよ。');
}
function showRank(){
  const list = JSON.parse(localStorage.getItem(rankKey())||'[]');
  const ol = $('#rankList');
  ol.innerHTML = list.length ? list.map(v=>`<li><b>${v.name}</b>　${v.score}点　${v.temp}℃　${v.time}</li>`).join('') : '<li>まだきろくがないよ</li>';
  $('#rankingModal').classList.remove('hidden');
}

function startApp(){
  const nameInput = $('#playerName');
  state.player = (nameInput ? nameInput.value.trim() : '') || 'ななし';
  $('#playerLabel').textContent = state.player;
  const screen = $('#startScreen');
  if(screen) screen.classList.add('hidden');
  toast('スタート！');
}
window.startApp = startApp;

const startButton = $('#startBtn');
if(startButton){
  startButton.addEventListener('click', startApp);
  startButton.addEventListener('touchend', (e)=>{ e.preventDefault(); startApp(); }, {passive:false});
}
const playerNameInput = $('#playerName');
if(playerNameInput){
  playerNameInput.addEventListener('keydown', (e)=>{ if(e.key === 'Enter') startApp(); });
}
$('#cancelChoiceBtn').addEventListener('click', ()=>choiceModal.classList.add('hidden'));
$('#saveScoreBtn').addEventListener('click', saveScore);
$('#showRankBtn').addEventListener('click', showRank);
$('#closeRankBtn').addEventListener('click', ()=>$('#rankingModal').classList.add('hidden'));
$('#resetDogBtn').addEventListener('click', ()=>{ state.dog = dogBaseByState(); updateUI(); toast('わんこをもどしたよ。'); });
$('#resetAllBtn').addEventListener('click', ()=>{
  state.bonusTemp = 0; state.bonusEnergy = 0; state.effects = {}; state.used = new Set(); state.roomSlots={}; roomOverlays.innerHTML=''; state.dog='assets/dogs/base/dog_hot.png'; recompute(); updateUI(); toast('ぜんぶ もどしたよ。');
});
renderItems();
recompute();
updateUI();
