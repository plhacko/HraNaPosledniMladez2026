// locations.js – Mládež 2026
// lat/lng: null = souřadnice zatím nejsou určeny (TODO: doplnit souřadnice)

const LOCATIONS = [
  {
    id: 1,
    name: "Chvilka filosofie",
    lat: 50.0431800,
    lng: 14.4119597,
    type: "self-report",
    basePoints: 5,
    maxBonus: 5,
    bonusDesc: "+5 pokud byl váš kámen největší",
    task: `<p>Něco skrýváme před cizinci, něco před přáteli a něco i sami před sebou. Co předstíráte, že o sobě nevíte?</p>
<p>Otázka je těžká, proto vezměte co největší kámen a vyneste ho až na vrcholek schodů, kámen pak vyfoťte a pošlete do skupiny.</p>
<p><strong>5 bodů</strong> + 5, pokud byl váš kámen největší</p>`,
  },

  {
    id: 2,
    name: "Turista",
    lat: 50.0869053,
    lng: 14.4207600,
    type: "self-report",
    basePoints: 5,
    maxBonus: 0,
    bonusDesc: null,
    task: `<p>Rádi cestujeme a poznáváme svět, přesto se snažíme nevypadat jako turisti. Dnes ale turisti budete. Nechte se skupinově vyfotit u Orloje, ale abyste to s tím turismem moc nepřeháněli, nesmí na něm ten orloj být.</p>
<p><strong>5 bodů</strong></p>`,
  },

  {
    id: 3,
    name: "Ve zdravém těle zdravý duch",
    lat: null, lng: null, // TODO: doplnit souřadnice (frisbee loučka)
    type: "self-report",
    timeLock: "20:00",
    basePoints: 0,
    maxBonus: 10,
    bonusDesc: "5/7/10 bodů dle výsledku (rozhodují pořadatelé)",
    task: `<p>Ve zdravém těle zdravý duch, ale rozumné sportování také nemůže být naškodu. Zahrajte si s ostatními týmy frisbee na 3 body. Týmy které vyhrají získávají 10 bodů, ostatní 5. Pokud přijde týmů licho, jeden se bude muset rozdělit a získá tak bodů 7.</p>`,
  },

  {
    id: 4,
    name: "Být či nebýt",
    lat: 50.0706122,
    lng: 14.4248303,
    type: "self-report",
    basePoints: 10,
    maxBonus: 0,
    bonusDesc: null,
    task: `<p>Být či nebýt TO je oč tu běží. Nahrajte monolog Hamleta prince dánského v tomto malém amfiteatru. Na konci pak otočte kameru na jásavé publikum.<br>(Nebojte se použít telefonu co by lebky, monolog je to delší)</p>
<p><em>Být nebo nebýt – to je otázka:<br>
je důstojnější zapřít se a snášet<br>
surovost osudu a jeho rány,<br>
anebo se vzepřít moři trápení<br>
a skoncovat to navždy?</em></p>
<p><em>Zemřít, spát – a je to.<br>
Spát – a navždy ukončit úzkost<br>
a věčné útrapy a strázně,<br>
co údělem jsou těla –<br>
co si můžeme přát víc,<br>
po čem toužit?</em></p>
<p><em>– Zemřít, spát – spát, možná snít –<br>
a právě v tom je zrada.<br>
Až ztichne vřava pozemského bytí,<br>
ve spánku smrti můžeme mít sny –<br>
to proto váháme a snášíme<br>
tu dlouhou bídu,<br>
již se říká život.</em></p>
<p><em>Neboť kdo vydržel by kopance<br>
a výsměch doby,<br>
aroganci mocných, průtahy soudů,<br>
znesvěcenou lásku, nadutost úřadů<br>
a ústrky, co slušnost věčně sklízí<br>
od lumpů,<br>
když pouhá dýka srovnala by účty,<br>
a byl by klid?</em></p>
<p><em>Kdo chtěl by nést to břímě,<br>
úpět a plahočit se životem,<br>
nemít strach z toho, co je za smrtí,<br>
z neznámé krajiny,<br>
z níž poutníci se nevracejí.</em></p>
<p><em>To nám láme vůli – snášíme radši<br>
hrůzy, které známe,<br>
než abychom šli vstříc těm neznámým.</em></p>
<p><em>Tak svědomí z nás dělá zbabělce<br>
a zdravá barva rozhodného činu<br>
se roznemůže zbledlou meditací,<br>
záměry velké významem a vahou<br>
se odvracejí z vytčeného směru<br>
a neuzrají v čin.</em></p>
<p><strong>10 bodů</strong></p>`,
  },

  {
    id: 5,
    name: "HolKa",
    lat: 50.0963936,
    lng: 14.4459069,
    type: "self-report",
    basePoints: 5,
    maxBonus: 5,
    bonusDesc: "+5 nejdál na sever / +3 druhé místo",
    task: `<p>HolKa (lávka mezi Holešovicemi a Karlínem) je moc hezká lávka a je to také nejsevernější stanoviště, a za to samotné byste měli dostat nějaké ty body – a tady je máte, 5, zcela zadarmo. Ale nešlo by jít ještě dál? Sever! Narnie!?</p>
<p>Vydejte se ještě trochu severněji a poznačte si pro bonusové body kam dorazíte (pošlete Adamovi odkaz na Mapy.cz na bod kam nejseverněji jste se dostali).</p>
<p><strong>5 bodů</strong> + 5 bodů pokud dojdete nejdál ze všech ostatních skupin na sever (3 body za druhé místo)</p>`,
  },

  {
    id: 6,
    name: "Mind meld",
    lat: null, lng: null, // TODO: doplnit souřadnice
    type: "self-report",
    basePoints: 5,
    maxBonus: 0,
    bonusDesc: null,
    task: `<p>Všechny vztahy jsou krom jiného také dlouhá řada kompromisů. Obvykle stačí aby jedna strana vyřkla návrh, který přijde té druhé akceptovatelný. Občas je ale problém i to, aby někdo nevypadal jako ten iniciátor – viz projekt <a href="https://cs.wikipedia.org/wiki/Sojuz-Apollo" target="_blank" rel="noopener">Sojuz–Apollo</a>.</p>
<p>Proto určete dvojici, oba pak vyřkněte bez předchozí domluvy náhodné slovo – pokud se shodují (počítají se i synonyma), vyhráváte. Jinak se pokuste nezávisle vymyslet slovo, které je mezi těmi předchozími dvěma. Slova se nesmí nikdy opakovat a v mezičase nesmíte naznačovat co bude vaše další slovo.</p>
<p><strong>5 bodů</strong></p>`,
  },

  {
    id: 7,
    name: "Mauglí",
    lat: null, lng: null, // TODO: doplnit souřadnice (jungle gym)
    type: "self-report",
    basePoints: 5,
    maxBonus: 0,
    bonusDesc: null,
    task: `<p><em>Džunglí Zákon, který nikdy ničeho nenařizuje bez důvodu, zapovídá všeliké zvěři jisti Člověka, vyjma ukazuje-li svým dětem, kterak zabíjet – a pak musí loviti mimo hranice lovišť své smečky nebo svého kmene. Pravým důvodem toho jest, že zabiti člověka znamená dříve či později příchod bílých lidí na slonech, s ručnicemi a sty hnědých mužů s gongy a raketami a pochodněmi. A pak trpí v džungli kde kdo. Avšak zvěř sama mezi sebou udává za důvod tohoto zákona, že je Člověk nejslabším a nejbezbrannějším ze všech živých tvorů, a že není důstojno sportovníka dotknouti.</em><br>
— Rudyard Kipling, Kniha džunglí</p>
<p>Připravte se do džungle. Přeručkujte 20× opičí hrazdy tohohle hřiště (není potřeba aby všichni přeručkovali stejně často).</p>
<p><strong>5 bodů</strong></p>`,
  },

  {
    id: 8,
    name: "Piš barde skládej",
    lat: null, lng: null, // TODO: doplnit souřadnice
    type: "form",
    basePoints: 0,
    maxBonus: 10,
    bonusDesc: "0–10 bodů dle správnosti textu (rozhodují pořadatelé)",
    task: `<p><em>PTÁČEK: No jo, to je on. Ale že já bych po něm pojmenoval důl? To je nesmysl! Ledaže by ho ode mne koupil. Ale že by mu ty básničky tak vynášely? Možné to je. Když bude mít dost peněz, klidně mu ho prodám. Piš, barde, střádej, a až budeš mít dvacet miliónů, přijde den, zúčtujem spolu.</em><br>
— Posel světla, Jára Cimrman</p>
<p>Vyberte si písničku, která má alespoň tři sloky a přepište ji do textboxu níže. Za každé slovo špatně ztrácíte jeden bod. Během plnění úkolu <strong>nedohledávejte</strong> text vámi zvolené písně.</p>`,
  },

  {
    id: 9,
    name: "U řek babylonských jsme sedávali",
    lat: null, lng: null, // TODO: doplnit souřadnice (u řeky)
    type: "quiz",
    basePoints: 0,
    maxBonus: 0,
    bonusDesc: null,
    task: `<p><em>Mezi babylonskými řekami,<br>
tam jsme sedávali a plakali,<br>
když jsme vzpomínali na Sion.<br>
V té zemi jsme odložili citery<br>
a zavěsili je na vrby.<br>
Naši věznitelé nás tam žádali,<br>
abychom jim prý zpívali;<br>
naši tyrani od nás chtěli veselí:<br>
„Co kdybyste nám zpívali<br>
některou z písní sionských?!"<br>
Jak bychom ale byli zpívali<br>
Hospodinovu píseň mezi cizinci?<br>
Pokud zapomenu, Jeruzaléme, na tebe,<br>
pak ať mi uschne pravice!<br>
Ať mi i k patru jazyk přiroste,<br>
pokud přestanu myslet na tebe,<br>
pokud mi Jeruzalém nebude nade vše,<br>
nade všechny mé rozkoše!</em><br>
— Žalm 137, B21</p>
<p>Vyplňte kvíz (2 body za každou správnou odpověď):</p>`,
    quiz: [
      {
        q: "Kolik párů ovcí vzal Noe do archy?",
        options: ["1", "2", "7"],
        correct: 2,
      },
      {
        q: "Kdo byl osvobozen andělem ze žaláře ve Skutcích 12?",
        options: ["Pavel", "Petr", "Barnabáš"],
        correct: 1,
      },
      {
        q: "Kdo jako první uviděl vzkříšeného Ježíše?",
        options: ["Petr", "Marie Magdaléna", "Jan"],
        correct: 1,
      },
      {
        q: "Která kniha Nového zákona byla napsána jako první?",
        options: ["Evangelium podle Matouše", "Skutky apoštolů", "1. list Tesalonickým"],
        correct: 2,
      },
      {
        q: "Co je podle žalmu 137 lepší než zapomenout na Jeruzalém?",
        options: [
          "Aby mu bylo vyloupnuto oko a uťata pravice",
          "Zemřít v babylonském zajetí",
          "Aby mu uschla pravice a jazyk přirostl k patru",
        ],
        correct: 2,
      },
    ],
  },

  {
    id: 10,
    name: "Polyfémos",
    lat: null, lng: null, // TODO: doplnit souřadnice
    type: "self-report",
    basePoints: 7,
    maxBonus: 0,
    bonusDesc: null,
    task: `<p><em>Druzi ten z olivy kyj pak chopili, na konci ostrý,<br>
jemu jej do oka vbodli, já točil jím, svrchu oň opřen.<br>
Jako když lodní trám kdos vrtá, nebozez vezma,<br>
při čemž druhové jeho jím vespod za řemen točí,<br>
s obou jej chopíce stran — ten točí se stále a stále,<br>
tak tím řeřavým kyjem jsme točili v obrově oku,<br>
okolo něho pak krev, jak točil se, kroužila horká.<br>
(…)<br>
Zařval bolestí strašně, až kolem ječela skála.</em></p>
<p>Odysseus, který se Polyfémovi představil jako Nikdo, vás oslepil. Vyberte jednoho člena týmu a ostatním zavažte oči (nebo je jiným způsobem na krátko oslepte). Vidět pak můžete až když dojdete na další stanoviště.</p>
<p><strong>7 bodů</strong></p>`,
  },
];
