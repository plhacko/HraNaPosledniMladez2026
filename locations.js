// locations.js – Mládež 2026

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
    task: `<p><em>Něco skrýváme před cizinci, něco před přáteli a něco i sami před sebou. Co předstíráte, že o sobě nevíte?</em></p>
<p>Otázka je těžká, proto vezměte co největší kámen a vyneste ho až na vrcholek schodů, kámen pak vyfoťte a pošlete do skupiny.</p>
<p><strong>5 bodů</strong> + 5, pokud byl váš kámen největší</p>`,
  },

  {
    id: 2,
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
    id: 3,
    name: "Císařský ostrov",
    lat: 50.0522219,
    lng: 14.4116989,
    type: "geo-hunt",
    huntLat: 50.0645600,
    huntLng: 14.4128947,
    videoUrl: "https://www.youtube.com/embed/GegCCMBsbqo",
    basePoints: 10,
    maxBonus: 0,
    bonusDesc: null,
    task: `<p>Císařství padlo, nebo alespoň to Rakouské, takže bohužel za to nedostáváte žádné body. Ale mohli byste na tomhle ostrově nějaké přeci jen najít. Zámořský císař je přece stálý, vždyť smrt samotnou porazil už dávno. Narnie!</p>`,
  },

  {
    id: 4,
    name: "Rubicon",
    lat: 50.0667264,
    lng: 14.4285369,
    type: "self-report",
    basePoints: 10,
    maxBonus: 0,
    bonusDesc: null,
    task: `<p><strong>A:</strong> Neoženíš se, jsi-li trochu při smyslech, a nezanecháš tohoto svého žití. Neboť já, jenž k tobě mluvím, oženil jsem se — proto ti radím: neber si ženu!<br>
<strong>B:</strong> Věc je rozhodnuta a usnesena. Ať jsou kostky vrženy!<br>
<strong>A:</strong> Nuž dobrá, jdi. Však dej ti nebe vyjít z toho zdráv.<br>
Na pravé moře nesnází se nyní vydáváš —<br>
ne libyjské, ne egejské, ni sicilské,<br>
kde ze třiceti lodí tři se zachrání —<br>
žádný ženatý muž nebyl nikdy zachráněn!<br>
<em>— Menandros 342/41 – c. 290 BC</em></p>
<p>Caesar sice jen cituje Menandra, ale <strong style="color:orange">alea iacta est</strong>, je čas překročit Rubikon, nebo spíše Botičský potok. Vyberte mezi sebou Caesara, ten musí suchou nohou překročit potok, nesmí to však udělat po mostě. Fotky jsou vítány.</p>
<p><strong>10 bodů</strong></p>`,
  },

  {
    id: 5,
    name: "Ve zdravém těle zdravý duch",
    lat: 50.0636781,
    lng: 14.4172503,
    type: "self-report",
    timeLock: "20:00",
    basePoints: 0,
    maxBonus: 0,
    bonusDesc: null,
    pointOptions: [5, 7, 10],
    task: `<p>Ve zdravém těle zdravý duch, ale rozumné sportování také nemůže být naškodu. Zahrajte si s ostatními týmy frisbee na 3 body. Týmy které vyhrají získávají 15 bodů, ostatní 7. Pokud přijde týmů licho, jeden se bude muset rozdělit a získá tak bodů 10.</p>`,
  },

  {
    id: 6,
    name: "Mauglí",
    lat: 50.0549481,
    lng: 14.4188994,
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
    id: 7,
    name: "U řek babylonských jsme sedávali",
    lat: 50.0502575,
    lng: 14.4125242,
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
        reason: "7 párů – ovce jsou čistá zvířata, proto jich Noe vzal 7 párů; nečistých zvířat (jako vepři) vzal jen jeden pár.",
      },
      {
        q: "Kdo byl osvobozen andělem ze žaláře ve Skutcích 12?",
        options: ["Pavel", "Petr", "Barnabáš"],
        correct: 1,
        reason: "Petr – anděl ho v noci vyvedl ze žaláře, kde byl uvězněn Herodem.",
      },
      {
        q: "Kdo jako první uviděl vzkříšeného Ježíše?",
        options: ["Petr", "Marie Magdaléna", "Jan"],
        correct: 1,
        reason: "Marie Magdaléna – přišla jako první ráno k hrobu a setkala se se vzkříšeným Ježíšem.",
      },
      {
        q: "Která kniha Nového zákona byla napsána jako první?",
        options: ["Evangelium podle Matouše", "Skutky apoštolů", "1. list Tesalonickým"],
        correct: 2,
        reason: "1. list Tesalonickým – Pavel ho napsal kolem roku 50–51 n. l., zatímco evangelia a Skutky vznikly až v 60.–90. letech.",
      },
      {
        q: "Co je podle žalmu 137 lepší než zapomenout na Jeruzalém?",
        options: [
          "Aby mu bylo vyloupnuto oko a uťata pravice",
          "Zemřít v babylonském zajetí",
          "Aby mu uschla pravice a jazyk přirostl k patru",
        ],
        correct: 2,
        reason: `Viz verše 5–6: „Pokud zapomenu, Jeruzaléme, na tebe, pak ať mi uschne pravice! Ať mi i k patru jazyk přiroste…"`,
      },
    ],
  },

  {
    id: 8,
    name: "Mind Meld",
    lat: 50.0497681,
    lng: 14.4176258,
    type: "self-report",
    videoUrl: "https://www.youtube.com/embed/es7Br9kJBbo",
    basePoints: 5,
    maxBonus: 0,
    bonusDesc: null,
    task: `<p>Apollo-Soyuz jednoduchým podáním ruky propojilo dva téměř neslučitelné světy. Proto vy určete dvojici a propojte svoje mozky – oba pak vyřkněte bez předchozí domluvy náhodné slovo, pokud se shodují (počítají se i synonyma) vyhráváte, jinak pokuste nezávisle vymyslet slovo, které je mezi těmi předchozími dvěma. Slova se nesmí nikdy opakovat a v mezičase nesmíte naznačovat co bude vaše další slovo.</p>
<p><strong>5 bodů</strong></p>`,
  },

  {
    id: 9,
    name: "Piš barde skládej",
    lat: 50.0520775,
    lng: 14.4268969,
    type: "form",
    basePoints: 0,
    maxBonus: 10,
    bonusDesc: null,
    task: `<p><em>PTÁČEK: No jo, to je on. Ale že já bych po něm pojmenoval důl? To je nesmysl! Ledaže by ho ode mne koupil. Ale že by mu ty básničky tak vynášely? Možné to je. Když bude mít dost peněz, klidně mu ho prodám. Piš, barde, střádej, a až budeš mít dvacet miliónů, přijde den, zúčtujem spolu.</em><br>
— Posel světla, Jára Cimrman</p>
<p>Vyberte si písničku, která má alespoň tři sloky a přepište ji do textboxu níže. Za každé slovo špatně ztrácíte jeden bod. Během plnění úkolu <strong>nedohledávejte</strong> text vámi zvolené písně.</p>`,
  },

  {
    id: 10,
    name: "Polyfémos",
    lat: 50.0669692,
    lng: 14.4147444,
    type: "self-report",
    basePoints: 7,
    maxBonus: 0,
    bonusDesc: null,
    task: `<p><em>Druzi ten z olivy kyj pak chopili, na konci ostrý, jemu jej do oka vbodli, já točil jím, svrchu oň opřen. Jako když lodní trám kdos vrtá, nebozez vezma, při čemž druhové jeho jím vespod za řemen točí, s obou jej chopíce stran — ten točí se stále a stále, tak tím řeřavým kyjem jsme točili v obrově oku, okolo něho pak krev, jak točil se, kroužila horká. (…) Zařval bolestí strašně, až kolem ječela skála.</em></p>
<p>Odysseus, který se Polyfémovi představil jako Nikdo, vás oslepil. Vyberte jednoho člena týmu a ostatním zavažte oči (nebo je jiným způsobem na krátko oslepte). Vidět pak můžete až když dojdete na další stanoviště.</p>
<p><strong>7 bodů</strong></p>`,
  },
];
