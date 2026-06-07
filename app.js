const $ = (selector) => document.querySelector(selector);
const itemPath = './assets/items/';
const bgPath = './assets/backgrounds/';
const dogPath = './assets/dogs/';

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
    ['しめきる', 1, -4, '空気がこもってしまった。', 'room_curtain_closed.png']
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
    ['暖房にする', 3, -12, '今は暖房ではもっと暑い！']
  ]},
  { name:'ライト', img:'light.png', choices:[
    ['つける', 1, -3, '明るくなったけど、少し暑い。'],
    ['けす', 0, 1, '熱が少しへったかも。']
  ]},
  { name:'ストーブ', img:'stove.png', choices:[
    ['つける', 3, -15, 'これは冬の道具！今は暑すぎる。'],
    ['つけない', 0, 2, '使わない判断も大切！']
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
    blanketWindow: false
  }
};

const actionRules = {
  'カーテン|しめる': { requires: { curtain: 'open' }, set: { curtain: 'closed' }, bg: 'room_curtain_closed.png', unavailable: 'カーテンはもう閉まっています。次は「あける」ならできます。' },
  'カーテン|あける': { requires: { curtain: 'closed' }, set: { curtain: 'open' }, bg: 'room_hot.png', unavailable: 'カーテンはもう開いています。次は「しめる」ならできます。' },
  'まど|あける': { requires: { window: 'closed' }, set: { window: 'open' }, bg: 'room_window_open.png', unavailable: 'まどはもう開いています。次は「しめきる」ならできます。' },
  'まど|しめきる': { requires: { window: 'open' }, set: { window: 'closed' }, bg: 'room_hot.png', unavailable: 'まどはもう閉まっています。次は「あける」ならできます。' },
  'ライト|つける': { requires: { light: 'off' }, set: { light: 'on' }, unavailable: 'ライトはもうついています。次は「けす」ならできます。' },
  'ライト|けす': { requires: { light: 'on' }, set: { light: 'off' }, unavailable: 'ライトはもう消えています。次は「つける」ならできます。' },
  'ストーブ|つける': { requires: { stove: 'off' }, set: { stove: 'on' }, unavailable: 'ストーブはもうついています。' },
  'ストーブ|つけない': { requires: { stove: 'on' }, set: { stove: 'off' }, unavailable: 'ストーブはついていません。' },
  'こたつ|入れる': { requires: { kotatsu: 'off' }, set: { kotatsu: 'on' }, unavailable: 'もうこたつに入っています。' },
  'こたつ|片づける': { requires: { kotatsu: 'on' }, set: { kotatsu: 'off' }, unavailable: 'こたつはもう片づいています。' },
  'エアコン|冷房にする': { requiresNot: { aircon: 'cool' }, set: { aircon: 'cool' }, unavailable: 'エアコンはもう冷房になっています。' },
  'エアコン|暖房にする': { requiresNot: { aircon: 'warm' }, set: { aircon: 'warm' }, unavailable: 'エアコンはもう暖房になっています。' },
  '毛布|わんこにかける': { requires: { blanketDog: false }, set: { blanketDog: true }, unavailable: '毛布はもうわんこにかかっています。' },
  '毛布|窓にかける': { requires: { blanketWindow: false }, set: { blanketWindow: true, curtain: 'closed' }, bg: 'room_curtain_closed.png', unavailable: '毛布はもう窓にかかっています。' }
};

function getRule(itemName, choiceLabel){
  return actionRules[`${itemName}|${choiceLabel}`];
}

function isChoiceAvailable(rule){
  if(!rule) return true;
  if(rule.requires){
    for(const [key, value] of Object.entries(rule.requires)){
      if(state.room[key] !== value) return false;
    }
  }
  if(rule.requiresNot){
    for(const [key, value] of Object.entries(rule.requiresNot)){
      if(state.room[key] === value) return false;
    }
  }
  return true;
}

function applyRule(rule){
  if(!rule || !rule.set) return;
  Object.assign(state.room, rule.set);
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
  $('#cancelChoiceButton').addEventListener('click', ()=>$('#choiceModal').classList.add('hidden'));
  $('#saveScoreButton').addEventListener('click', recordScore);
  $('#rankingButton').addEventListener('click', showRanking);
  $('#closeRankingButton').addEventListener('click', ()=>$('#rankingModal').classList.add('hidden'));
  renderItems();
  updateUI();
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
    button.innerHTML = `<img src="${itemPath}${item.img}" alt=""><span>${item.name}</span>`;
    button.addEventListener('click', ()=>openChoices(index));
    grid.appendChild(button);
  });
}

function openChoices(index){
  const item = items[index];
  $('#choiceTitle').textContent = `${item.name}を どう使う？`;
  $('#choiceText').textContent = '使い方を選びましょう。できないことは灰色で出ます。';
  const choiceList = $('#choiceList');
  choiceList.innerHTML = '';
  item.choices.forEach((choice)=>{
    const button = document.createElement('button');
    const label = choice[0];
    const rule = getRule(item.name, label);
    const available = isChoiceAvailable(rule);
    button.textContent = available ? label : `${label}（できません）`;
    button.disabled = !available;
    if(!available) button.classList.add('choice-disabled');
    button.addEventListener('click', ()=>applyChoice(choice, item.name));
    choiceList.appendChild(button);
  });
  $('#choiceModal').classList.remove('hidden');
}

function applyChoice(choice, itemName){
  const [label, tempDelta, energyDelta, message, bgFromChoice] = choice;
  const rule = getRule(itemName, label);
  if(!isChoiceAvailable(rule)){
    toast(rule?.unavailable || '今はその使い方はできません。');
    return;
  }

  $('#choiceModal').classList.add('hidden');
  applyRule(rule);

  state.temp = Math.max(20, Math.min(40, state.temp + tempDelta));
  state.energy = Math.max(0, Math.min(100, state.energy + energyDelta));
  state.used += 1;
  state.score = Math.max(0, Math.round(state.energy * 1.25 + (32 - state.temp) * 14 - state.used * 2));

  const nextBg = backgroundForRoom(rule?.bg || bgFromChoice);
  $('#roomImage').src = bgPath + nextBg;

  toast(message);
  updateUI();
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
