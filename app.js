const $ = (s)=>document.querySelector(s);
const IMG='assets/items/';
const items = [
  {name:'うちわ', img:'uchiwa.png', choices:[['わんこに あおぐ',-1,10,'かぜがきて、すずしく感じた！'],['まどに あおぐ',0,1,'あまり かわらなかった。']]},
  {name:'扇風機', img:'fan.png', choices:[['わんこに むける',-1,12,'風で体がすずしく感じた！'],['へやの くうきを まわす',0,6,'空気がうごいて、少しらくになった！'],['あついところに むける',0,0,'向きがちがうかも。']]},
  {name:'みず', img:'water_bottle.png', choices:[['のませる',0,14,'水をのんで、げんきが出た！'],['タオルをぬらす',-1,10,'れいタオルができた！'],['こぼす',0,-6,'床がすべるとあぶない！']]},
  {name:'おちゃ', img:'tea_hot.png', choices:[['つめたい おちゃ',0,8,'つめたいお茶なら、水分がとれるね！'],['あつい おちゃ',1,-5,'今はからだがあたたまりすぎるかも。']]},
  {name:'カーテン', img:'curtain.png', choices:[['しめる',-2,8,'日ざしがへって、あつくなりにくい！','room_curtain_closed.png'],['あける',1,-4,'日ざしが入って、少しあつくなった！','room_hot.png']]},
  {name:'まど', img:'window_open.png', choices:[['あける',-1,5,'風が入って少しすずしい！','room_window_open.png'],['しめきる',1,-4,'空気がこもってしまった。','room_curtain_closed.png']]},
  {name:'れいタオル', img:'cold_towel.png', choices:[['首の近くに あてる',-1,12,'ひんやりして、らくになった！'],['ずっと強く あてる',0,-5,'つめたすぎる。少しずつ使おう。']]},
  {name:'ほれいざい', img:'icepack.png', choices:[['タオルで つつむ',-2,12,'タオルでつつむと安全に使えるね！'],['そのまま からだに あてる',0,-7,'つめたすぎる！タオルでつつもう。']]},
  {name:'こおり', img:'ice.png', choices:[['近くに おく',-1,5,'近くが少しすずしくなった！'],['食べさせる',0,-4,'おなかをこわすかも。先生に聞こう。']]},
  {name:'ひかげシート', img:'shade_sheet.png', choices:[['まどの近くに つける',-2,8,'日かげができた！'],['床に おく',0,0,'日ざしはあまり減らなかった。']]},
  {name:'ぼうし', img:'hat.png', choices:[['外に出る時に かぶる',0,4,'外では日ざしをふせげるね！'],['部屋でずっとかぶる',0,0,'今の部屋ではあまり変わらない。']]},
  {name:'毛布', img:'blanket.png', choices:[['わんこに かける',1,-10,'毛布でさらにあつくなった！'],['まどに かける',-1,6,'日ざしを少しふせげた！']]},
  {name:'ドライヤー', img:'dryer.png', choices:[['あたたかい風',2,-10,'あつい風で、もっとあつくなった！'],['つめたい風',-1,6,'冷たい風なら少しすずしい！']]},
  {name:'エアコン', img:'aircon.png', choices:[['つめたい',-3,15,'へやがすずしくなった！'],['あたたかい',3,-12,'今は暖房ではもっとあつい！']]},
  {name:'ライト', img:'light.png', choices:[['つける',1,-3,'明るくなったけど少しあつい。'],['けす',0,1,'熱が少しへったかも。']]},
  {name:'ストーブ', img:'stove.png', choices:[['つける',3,-15,'これは冬の道具！今は暑すぎる。'],['つけない',0,2,'使わない判断も大切！']]},
  {name:'こたつ', img:'kotatsu.png', choices:[['入れる',2,-12,'こたつは今はあつい！'],['片づける',0,3,'暑い季節は片づけてもいいね。']]},
  {name:'あついスープ', img:'hot_soup.png', choices:[['食べさせる',1,-6,'今はあつい食べ物より水分がよさそう。'],['やめておく',0,2,'場面に合うものを考えられた！']]},
  {name:'ダウンジャケット', img:'down_jacket.png', choices:[['着せる',2,-12,'もっと暑くなってしまった！'],['日よけにする',0,4,'かけ方しだいで日ざしをふせげるかも。']]},
  {name:'きりふき', img:'spray.png', choices:[['すこし ふきかける',-1,6,'水のミストで少しすずしい！'],['たくさん まく',0,-4,'床がぬれるとあぶない！']]},
  {name:'こおった水', img:'frozen_bottle.png', choices:[['近くに おく',-2,7,'近くがひんやりした！'],['ずっと体にあてる',0,-5,'冷たすぎる。タオルで包もう。']]}
];
let state={player:'',temp:32,energy:18,score:0,used:0};
function todayKey(){const d=new Date();return `wanko-ranking-${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}`}
function init(){
 $('#startBtn').onclick=()=>{const name=$('#playerName').value.trim()||'ななし';state.player=name;$('#playerLabel').textContent=name;$('#nameScreen').classList.add('hidden');updateUI()};
 $('#homeBtn').onclick=()=>location.reload(); $('#toggleItems').onclick=()=>$('#itemDrawer').classList.toggle('open');
 $('#closeChoice').onclick=()=>$('#choiceModal').classList.add('hidden'); $('#recordBtn').onclick=recordScore; $('#rankingBtn').onclick=showRanking; $('#closeRanking').onclick=()=>$('#rankingModal').classList.add('hidden');
 renderItems(); updateUI();
}
function renderItems(){const grid=$('#itemsGrid');grid.innerHTML='';items.forEach((item,i)=>{const b=document.createElement('button');b.className='item-card';b.innerHTML=`<img src="${IMG+item.img}" alt=""><span>${item.name}</span>`;b.onclick=()=>openChoices(i);grid.appendChild(b)})}
function openChoices(i){const item=items[i];$('#choiceTitle').textContent=`${item.name}を どうつかう？`;$('#choiceDesc').textContent='つかいかたをえらぼう。';const list=$('#choiceList');list.innerHTML='';item.choices.forEach(c=>{const btn=document.createElement('button');btn.textContent=c[0];btn.onclick=()=>applyChoice(item,c);list.appendChild(btn)});$('#choiceModal').classList.remove('hidden')}
function applyChoice(item,c){$('#choiceModal').classList.add('hidden');state.temp=Math.max(20,Math.min(40,state.temp+c[1]));state.energy=Math.max(0,Math.min(100,state.energy+c[2]));state.used++;state.score=Math.max(0,Math.round(state.energy*1.2+(32-state.temp)*12-state.used*2));if(c[4]) $('#roomBg').src=`assets/backgrounds/${c[4]}`;showResult(c[3]);updateUI()}
function showResult(msg){const t=$('#resultToast');t.textContent=msg;t.classList.remove('hidden');setTimeout(()=>t.classList.add('hidden'),2600)}
function updateUI(){ $('#tempValue').textContent=state.temp; $('#thermoFill').style.height=`${Math.max(20,(state.temp-20)*5)}%`; $('#energyFill').style.width=`${state.energy}%`; $('#scoreValue').textContent=state.score; const dog=$('#dogSprite'); const speech=$('#speech'); if(state.energy>=65||state.temp<=27){dog.src='assets/dogs/dog_happy.png';dog.style.width='32%';dog.style.left='37%';speech.textContent='すずしい！ありがとう！';speech.style.borderColor='#42a75e';speech.style.color='#2c8b48';$('#energyText').textContent='げんきに なってきたよ！';$('#tempHint').innerHTML='すこし<br>すずしくなったよ！'}else if(state.energy>=40){dog.src='assets/dogs/dog_ok.png';dog.style.width='28%';dog.style.left='39%';speech.textContent='すこし らく…';speech.style.borderColor='#f0a53a';speech.style.color='#d06a1a';$('#energyText').textContent='少し げんきが もどったよ！'}else{dog.src='assets/dogs/dog_hot.png';dog.style.width='44%';dog.style.left='34%';speech.textContent='あついよ〜';speech.style.borderColor='#e53935';speech.style.color='#e53935';$('#energyText').textContent='とっても げんきが なくなっているよ！'}}
function recordScore(){const key=todayKey();const data=JSON.parse(localStorage.getItem(key)||'[]');data.push({name:state.player||'ななし',score:state.score,temp:state.temp,energy:state.energy,time:new Date().toLocaleTimeString('ja-JP',{hour:'2-digit',minute:'2-digit'})});data.sort((a,b)=>b.score-a.score);localStorage.setItem(key,JSON.stringify(data.slice(0,20)));showResult('今日のランキングに記録したよ！')}
function showRanking(){const data=JSON.parse(localStorage.getItem(todayKey())||'[]');const list=$('#rankingList');list.innerHTML=data.length?data.map(r=>`<li><b>${r.name}</b>　${r.score}点　${r.temp}℃　${r.time}</li>`).join(''):'<li>まだ記録がありません</li>';$('#rankingModal').classList.remove('hidden')}
init();
