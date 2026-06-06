const state = {
  temp: 32,
  energy: 18,
  sound: true,
  playerName: '',
  scoreSaved: false,
};

const items = [
  { id:'uchiwa', name:'うちわ', icon:'🪭', choices:[
    { label:'わんこに あおぐ', temp:-1, energy:+10, msg:'かぜがきて、すずしく感じたよ。', mood:'good' },
    { label:'まどに あおぐ', temp:0, energy:+1, msg:'あまり変わらなかったよ。風をどこに送るといいかな？', mood:'neutral' },
  ]},
  { id:'fan', name:'扇風機', icon:'🌀', choices:[
    { label:'わんこに むける', temp:-1, energy:+14, msg:'風で、わんこがすずしく感じたよ。', mood:'good' },
    { label:'へやの空気を まわす', temp:-1, energy:+7, msg:'空気が動いて、少しすずしく感じたよ。', mood:'good' },
    { label:'壁に むける', temp:0, energy:+2, msg:'風がわんこに届きにくかったよ。向きが大切だね。', mood:'neutral' },
  ]},
  { id:'water', name:'みず', icon:'💧', choices:[
    { label:'のませる', temp:0, energy:+18, msg:'水を飲んで、げんきが出たよ。', mood:'good' },
    { label:'タオルを ぬらす', temp:-2, energy:+14, msg:'冷たいタオルで、からだが少しすずしくなったよ。', mood:'good' },
    { label:'床に こぼす', temp:0, energy:-8, msg:'床がぬれて、すべると危ないよ。', mood:'bad' },
  ]},
  { id:'tea', name:'おちゃ', icon:'🍵', choices:[
    { label:'あたたかい おちゃ', temp:+1, energy:-6, msg:'今は暑いので、からだがあたたまってしまったよ。', mood:'bad' },
    { label:'つめたい おちゃ', temp:0, energy:+10, msg:'冷たい飲み物で、少し元気が出たよ。', mood:'good' },
  ]},
  { id:'curtain', name:'カーテン', icon:'🪟', choices:[
    { label:'しめる', temp:-2, energy:+9, msg:'日ざしがへって、部屋が暑くなりにくくなったよ。', mood:'good' },
    { label:'あける', temp:+1, energy:-5, msg:'日ざしが入って、少し暑くなったよ。', mood:'bad' },
  ]},
  { id:'window', name:'まど', icon:'🪟', choices:[
    { label:'まどを あける', temp:-1, energy:+8, msg:'風が入って、少しすずしく感じたよ。', mood:'good' },
    { label:'まどを しめきる', temp:+1, energy:-6, msg:'空気がこもって、むし暑くなったよ。', mood:'bad' },
  ]},
  { id:'blanket', name:'毛布', icon:'🧺', choices:[
    { label:'わんこに かける', temp:+2, energy:-14, msg:'毛布で、もっと暑くなってしまったよ。', mood:'bad' },
    { label:'まどに かける', temp:-1, energy:+6, msg:'日ざしを少しふせげたよ。使い方で変わるね。', mood:'good' },
  ]},
  { id:'coolTowel', name:'れいタオル', icon:'🧊', choices:[
    { label:'首の近くに あてる', temp:-2, energy:+16, msg:'冷たいタオルで、すずしくなったよ。', mood:'good' },
    { label:'床に おく', temp:0, energy:+1, msg:'床に置くだけでは、あまり変わらなかったよ。', mood:'neutral' },
  ]},
  { id:'icepack', name:'ほれいざい', icon:'❄️', choices:[
    { label:'タオルでつつんで 近くにおく', temp:-3, energy:+18, msg:'冷たいものを安全に使えて、すずしくなったよ。', mood:'good' },
    { label:'直接 ずっとあてる', temp:-2, energy:-6, msg:'冷たすぎるよ。タオルでつつむと安全だね。', mood:'bad' },
  ]},
  { id:'ice', name:'こおり', icon:'🧊', choices:[
    { label:'近くに おく', temp:-1, energy:+6, msg:'近くが少しひんやりしたよ。', mood:'good' },
    { label:'たくさん 食べさせる', temp:-1, energy:-10, msg:'食べすぎはおなかが心配だよ。', mood:'bad' },
  ]},
  { id:'shade', name:'ひかげシート', icon:'⛱️', choices:[
    { label:'まどの前に つける', temp:-2, energy:+9, msg:'日ざしをさえぎって、すずしくなりやすいよ。', mood:'good' },
    { label:'部屋のすみに おく', temp:0, energy:+1, msg:'使う場所が大事だね。', mood:'neutral' },
  ]},
  { id:'hat', name:'ぼうし', icon:'👒', choices:[
    { label:'外に行くとき かぶる', temp:0, energy:+8, msg:'外では、日ざしから頭を守れるよ。', mood:'good' },
    { label:'部屋の中で ずっとかぶる', temp:0, energy:-2, msg:'部屋の中では、あまりすずしくならないね。', mood:'neutral' },
  ]},
  { id:'dryer', name:'ドライヤー', icon:'💨', choices:[
    { label:'あたたかい風', temp:+3, energy:-18, msg:'あたたかい風で、もっと暑くなったよ。', mood:'bad' },
    { label:'つめたい風', temp:0, energy:+5, msg:'冷たい風なら少しすずしいね。でもあてすぎ注意。', mood:'good' },
  ]},
  { id:'light', name:'ライト', icon:'💡', choices:[
    { label:'つける', temp:+1, energy:-3, msg:'明るくなったけど、少し暑くなったよ。', mood:'bad' },
    { label:'けす', temp:0, energy:+2, msg:'熱が出るものは消すとよさそうだね。', mood:'good' },
  ]},
  { id:'stove', name:'ストーブ', icon:'🔥', choices:[
    { label:'つける', temp:+4, energy:-22, msg:'これは冬に使うもの。今は暑くなってしまうよ。', mood:'bad' },
    { label:'つけない', temp:0, energy:+4, msg:'暑い日は使わない選択が大切だね。', mood:'good' },
  ]},
  { id:'kotatsu', name:'こたつ', icon:'♨️', choices:[
    { label:'入れる', temp:+3, energy:-18, msg:'こたつは暑い日に合わないね。', mood:'bad' },
    { label:'使わない', temp:0, energy:+4, msg:'今は使わない方がよさそうだね。', mood:'good' },
  ]},
  { id:'aircon', name:'エアコン', icon:'❄️', choices:[
    { label:'冷房', temp:-4, energy:+20, msg:'冷房で部屋がすずしくなったよ。', mood:'good' },
    { label:'暖房', temp:+4, energy:-20, msg:'暖房で、もっと暑くなってしまったよ。', mood:'bad' },
  ]},
  { id:'soup', name:'スープ', icon:'🥣', choices:[
    { label:'あついスープ', temp:+1, energy:-5, msg:'今は暑いから、あたたかいものは合わないかも。', mood:'bad' },
    { label:'つめたいスープ', temp:0, energy:+5, msg:'冷たいものなら、少し食べやすいね。', mood:'good' },
  ]},
  { id:'jacket', name:'ダウン', icon:'🧥', choices:[
    { label:'着せる', temp:+2, energy:-14, msg:'暑い日に着せると、もっと暑くなるよ。', mood:'bad' },
    { label:'しまう', temp:0, energy:+2, msg:'暑い日は、あたたかい服はしまおう。', mood:'good' },
  ]},
  { id:'bath', name:'おふろ', icon:'🛁', choices:[
    { label:'あついおふろ', temp:+3, energy:-16, msg:'あついおふろは、今はしんどいね。', mood:'bad' },
    { label:'ぬるいシャワー', temp:-1, energy:+8, msg:'ぬるいシャワーなら、少しすっきりするね。', mood:'good' },
  ]},
  { id:'outside', name:'外へ行く', icon:'☀️', choices:[
    { label:'あつい日なたへ行く', temp:+2, energy:-15, msg:'日なたはもっと暑いよ。日かげを探そう。', mood:'bad' },
    { label:'日かげへ行く', temp:-1, energy:+8, msg:'日かげはすずしく感じやすいね。', mood:'good' },
  ]},
];

const el = {
  grid: document.getElementById('itemsGrid'),
  temp: document.getElementById('tempValue'),
  thermo: document.getElementById('thermoFill'),
  energy: document.getElementById('energyFill'),
  energyText: document.getElementById('energyText'),
  roomMessage: document.getElementById('roomMessage'),
  room: document.getElementById('room'),
  dog: document.getElementById('dog'),
  speech: document.getElementById('speech'),
  drawer: document.querySelector('.drawer'),
  toggle: document.getElementById('toggleItems'),
  choiceDialog: document.getElementById('choiceDialog'),
  choiceTitle: document.getElementById('choiceTitle'),
  choiceLead: document.getElementById('choiceLead'),
  choiceButtons: document.getElementById('choiceButtons'),
  resultDialog: document.getElementById('resultDialog'),
  resultTitle: document.getElementById('resultTitle'),
  resultText: document.getElementById('resultText'),
  tempChange: document.getElementById('tempChange'),
  energyChange: document.getElementById('energyChange'),
  helpDialog: document.getElementById('helpDialog'),
  playerNameLabel: document.getElementById('playerNameLabel'),
  scoreValue: document.getElementById('scoreValue'),
  saveScoreBtn: document.getElementById('saveScoreBtn'),
  showRankingBtn: document.getElementById('showRankingBtn'),
  scoreBtn: document.getElementById('scoreBtn'),
  nameDialog: document.getElementById('nameDialog'),
  nameForm: document.getElementById('nameForm'),
  playerNameInput: document.getElementById('playerNameInput'),
  rankingDialog: document.getElementById('rankingDialog'),
  rankingDate: document.getElementById('rankingDate'),
  rankingList: document.getElementById('rankingList'),
  changeNameBtn: document.getElementById('changeNameBtn'),
};

function renderItems(){
  el.grid.innerHTML = '';
  items.forEach(item => {
    const card = document.createElement('button');
    card.className = 'item-card';
    card.type = 'button';
    card.innerHTML = `<span class="item-icon">${item.icon}</span><span>${item.name}</span>`;
    card.addEventListener('click', () => openChoices(item));
    el.grid.appendChild(card);
  });
}

function openChoices(item){
  el.choiceTitle.textContent = `${item.name}：どうつかう？`;
  el.choiceLead.textContent = '使い方をえらびましょう。';
  el.choiceButtons.innerHTML = '';
  item.choices.forEach(choice => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.textContent = choice.label;
    btn.addEventListener('click', () => {
      el.choiceDialog.close();
      applyChoice(item, choice);
    });
    el.choiceButtons.appendChild(btn);
  });
  el.choiceDialog.showModal();
}

function clamp(v,min,max){ return Math.max(min, Math.min(max, v)); }

function applyChoice(item, choice){
  const oldTemp = state.temp;
  const oldEnergy = state.energy;
  state.temp = clamp(state.temp + choice.temp, 18, 40);
  state.energy = clamp(state.energy + choice.energy, 0, 100);
  state.scoreSaved = false;
  updateUI(choice);
  showResult(item, choice, state.temp - oldTemp, state.energy - oldEnergy);
}

function updateUI(choice){
  el.temp.textContent = state.temp;
  if(el.scoreValue) el.scoreValue.textContent = calcScore();
  if(el.saveScoreBtn) el.saveScoreBtn.textContent = state.scoreSaved ? '記録ずみ' : '記録する';
  if(el.saveScoreBtn) el.saveScoreBtn.disabled = state.scoreSaved;
  const fill = clamp(((state.temp - 18) / 22) * 100, 8, 95);
  el.thermo.style.height = `${fill}%`;
  el.energy.style.width = `${state.energy}%`;
  if(state.energy >= 75){
    el.energyText.textContent = 'とても げんきになったよ！';
    el.speech.textContent = 'げんき！';
    el.dog.classList.add('happy');
  } else if(state.energy >= 45){
    el.energyText.textContent = '少し げんきになったよ！';
    el.speech.textContent = 'ちょっと らく！';
    el.dog.classList.remove('happy');
  } else {
    el.energyText.textContent = 'まだ げんきが ないよ！';
    el.speech.textContent = state.temp >= 32 ? 'あついよ〜' : 'まだ しんどい…';
    el.dog.classList.remove('happy');
  }

  if(state.temp <= 28){
    el.roomMessage.textContent = '少し すずしくなったよ！';
    el.room.classList.add('cool');
  } else if(state.temp >= 34){
    el.roomMessage.textContent = 'おへやが とても あついよ！';
    el.room.classList.remove('cool');
  } else {
    el.roomMessage.textContent = 'まだ少し あついよ！';
  }

  el.room.classList.remove('hotter');
  el.dog.classList.remove('worse');
  if(choice?.mood === 'bad'){
    void el.room.offsetWidth;
    el.room.classList.add('hotter');
    el.dog.classList.add('worse');
  }
}

function showResult(item, choice, tempDelta, energyDelta){
  el.resultTitle.textContent = `${item.name}を使ったよ`;
  el.resultText.textContent = choice.msg;
  const tempLabel = tempDelta === 0 ? '温度：かわらない' : `温度：${tempDelta > 0 ? '+' : ''}${tempDelta}℃`;
  const energyLabel = energyDelta === 0 ? 'げんき：かわらない' : `げんき：${energyDelta > 0 ? '+' : ''}${energyDelta}`;
  el.tempChange.textContent = tempLabel;
  el.energyChange.textContent = energyLabel;
  el.resultDialog.showModal();
}

function resetGame(){
  state.temp = 32;
  state.energy = 18;
  state.scoreSaved = false;
  el.dog.classList.remove('happy','worse');
  el.room.classList.remove('cool','hotter');
  el.speech.textContent = 'あついよ〜';
  updateUI();
}


function todayKey(){
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth()+1).padStart(2,'0');
  const day = String(d.getDate()).padStart(2,'0');
  return `${y}-${m}-${day}`;
}

function rankingStorageKey(){ return `wankoRescueRanking:${todayKey()}`; }

function calcScore(){
  // げんきが高く、温度が低いほど高得点。授業では「快適ポイント」として使う。
  const coolBonus = Math.max(0, 36 - state.temp) * 5;
  const safeBonus = state.temp <= 28 ? 20 : state.temp <= 30 ? 10 : 0;
  return Math.round(state.energy + coolBonus + safeBonus);
}

function loadPlayerName(){
  const saved = localStorage.getItem('wankoRescuePlayerName') || '';
  state.playerName = saved;
  updatePlayerNameLabel();
  if(!saved){
    setTimeout(() => el.nameDialog?.showModal(), 300);
  }
}

function updatePlayerNameLabel(){
  el.playerNameLabel.textContent = state.playerName || 'なまえなし';
}

function setPlayerName(name){
  const clean = (name || '').trim().slice(0, 12) || 'なまえなし';
  state.playerName = clean;
  localStorage.setItem('wankoRescuePlayerName', clean);
  updatePlayerNameLabel();
}

function getTodayRanking(){
  try{
    return JSON.parse(localStorage.getItem(rankingStorageKey()) || '[]');
  }catch(e){
    return [];
  }
}

function setTodayRanking(list){
  localStorage.setItem(rankingStorageKey(), JSON.stringify(list));
}

function saveScore(){
  if(state.scoreSaved) return;
  if(!state.playerName){
    el.nameDialog.showModal();
    return;
  }
  const entry = {
    name: state.playerName,
    score: calcScore(),
    temp: state.temp,
    energy: state.energy,
    time: new Date().toLocaleTimeString('ja-JP', {hour:'2-digit', minute:'2-digit'})
  };
  const list = getTodayRanking();
  list.push(entry);
  list.sort((a,b) => b.score - a.score || b.energy - a.energy || a.temp - b.temp);
  setTodayRanking(list.slice(0, 20));
  state.scoreSaved = true;
  updateUI();
  showRanking();
}

function showRanking(){
  const list = getTodayRanking();
  el.rankingDate.textContent = `${todayKey()} の記録`;
  el.rankingList.innerHTML = '';
  if(list.length === 0){
    const li = document.createElement('li');
    li.innerHTML = `<span class="rank-name">まだ記録がありません</span><span class="rank-score">--</span>`;
    el.rankingList.appendChild(li);
  }else{
    list.slice(0, 10).forEach((r, i) => {
      const li = document.createElement('li');
      li.innerHTML = `<span class="rank-name">${i+1}. ${escapeHtml(r.name)} <small>${r.time || ''}</small></span><span class="rank-score">${r.score}点 / ${r.temp}℃</span>`;
      el.rankingList.appendChild(li);
    });
  }
  el.rankingDialog.showModal();
}

function escapeHtml(str){
  return String(str).replace(/[&<>"]/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[ch]));
}

document.getElementById('resetBtn').addEventListener('click', resetGame);
document.getElementById('helpBtn').addEventListener('click', () => el.helpDialog.showModal());
document.getElementById('soundBtn').addEventListener('click', () => {
  state.sound = !state.sound;
  document.getElementById('soundBtn').style.opacity = state.sound ? 1 : .55;
});
el.toggle.addEventListener('click', () => {
  el.drawer.classList.toggle('closed');
  el.toggle.textContent = el.drawer.classList.contains('closed') ? 'アイテム ▼' : 'アイテム ▲';
});


el.nameForm.addEventListener('submit', () => {
  setPlayerName(el.playerNameInput.value);
});
el.saveScoreBtn.addEventListener('click', saveScore);
el.showRankingBtn.addEventListener('click', showRanking);
el.scoreBtn.addEventListener('click', showRanking);
el.changeNameBtn.addEventListener('click', () => {
  el.rankingDialog.close();
  el.playerNameInput.value = state.playerName || '';
  el.nameDialog.showModal();
});

renderItems();
loadPlayerName();
updateUI();
