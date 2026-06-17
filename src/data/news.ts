import { NewsArticle } from '@/types';

const SOURCE_FLAG_MAP: Record<string, string> = {
  us: "🇺🇸", gb: "🇬🇧", fr: "🇫🇷", de: "🇩🇪", br: "🇧🇷", es: "🇪🇸", ar: "🇦🇷", pt: "🇵🇹",
  mx: "🇲🇽", ca: "🇨🇦", nl: "🇳🇱", jp: "🇯🇵", int: "🌍", py: "🇵🇾"
};

const getKeywords = (headline: string, category: string): string => {
  const h = headline.toLowerCase();
  if (h.includes("messi")) return "messi";
  if (h.includes("ronaldo")) return "ronaldo";
  if (h.includes("neymar")) return "neymar";
  if (h.includes("pulisic") || h.includes("usmnt")) return "soccer,usmnt";
  if (h.includes("stadium") || h.includes("venues")) return "soccer,stadium";
  if (h.includes("yamal")) return "yamal";
  if (h.includes("neuer")) return "neuer";
  if (h.includes("tactical") || h.includes("tactics")) return "soccer,tactics";
  if (h.includes("technology") || h.includes("var")) return "soccer,technology";
  if (h.includes("achilles") || h.includes("acl") || h.includes("injury") || h.includes("injured") || h.includes("hamstring")) return "soccer,injury";
  
  if (category === "MATCH REPORTS") return "soccer,match,stadium";
  if (category === "INJURIES") return "soccer,injury,sports";
  if (category === "TRANSFERS") return "soccer,signing,contract";
  if (category === "FEATURES") return "soccer,worldcup";
  return "soccer,worldcup";
};

const getRelativeTimeDate = (timeAgoStr: string): string => {
  const d = new Date();
  const clean = timeAgoStr.trim().toLowerCase();
  
  if (clean.includes("m ago")) {
    const mins = parseInt(clean) || 15;
    d.setMinutes(d.getMinutes() - mins);
  } else if (clean.includes("h ago")) {
    const hrs = parseInt(clean) || 2;
    d.setHours(d.getHours() - hrs);
  } else if (clean.includes("d ago")) {
    const days = parseInt(clean) || 1;
    d.setDate(d.getDate() - days);
  } else if (clean.includes("wk ago")) {
    const wks = parseInt(clean) || 1;
    d.setDate(d.getDate() - (wks * 7));
  } else if (clean.includes("mo ago")) {
    const mos = parseInt(clean) || 1;
    d.setMonth(d.getMonth() - mos);
  }
  return d.toISOString();
};

const getGoogleUserContentUrl = (headline: string): string | null => {
  const h = headline.toLowerCase();
  if (h.includes("opening ceremonies") || h.includes("opening ceremony"))
    return "http://googleusercontent.com/image_collection/image_retrieval/7577832551191103612_0";
  if (h.includes("messi"))
    return "http://googleusercontent.com/image_collection/image_retrieval/15167929521195600203_0";
  if (h.includes("neymar"))
    return "http://googleusercontent.com/image_collection/image_retrieval/10304355325370359941_0";
  if (h.includes("iran receive visas") || h.includes("iran's training"))
    return "http://googleusercontent.com/image_collection/image_retrieval/13070514073005527360_0";
  if (h.includes("fan experience") || h.includes("security"))
    return "http://googleusercontent.com/image_collection/image_retrieval/4571781573386495227_0";
  if (h.includes("var guidelines") || h.includes("var and ai") || h.includes("new var protocols") || h.includes("ai and var"))
    return "http://googleusercontent.com/image_collection/image_retrieval/10330460572480518117_0";
  if (h.includes("rising stars") || h.includes("lamine yamal"))
    return "http://googleusercontent.com/image_collection/image_retrieval/1832204773862562507_0";
  if (h.includes("tactical evolutions") || h.includes("tactical preview") || h.includes("tactical analytics"))
    return "http://googleusercontent.com/image_collection/image_retrieval/6993076069195534235_0";
  if (h.includes("sustainability initiatives") || h.includes("green corridors") || h.includes("sustainability"))
    return "http://googleusercontent.com/image_collection/image_retrieval/15635196177317557417_0";
  if (h.includes("broadcasting innovations") || h.includes("360-degree vr"))
    return "http://googleusercontent.com/image_collection/image_retrieval/15635196177317557417_1";
  if (h.includes("referee diversity") || h.includes("officiating team"))
    return "http://googleusercontent.com/image_collection/image_retrieval/15635196177317557417_2";
  if (h.includes("team travel logistics") || h.includes("hub-based"))
    return "http://googleusercontent.com/image_collection/image_retrieval/15635196177317557417_3";
  if (h.includes("fan zones") || h.includes("fan festivals"))
    return "http://googleusercontent.com/image_collection/image_retrieval/15635196177317557417_4";
  if (h.includes("medical preparedness") || h.includes("concussion"))
    return "http://googleusercontent.com/image_collection/image_retrieval/15635196177317557417_5";
  if (h.includes("sponsorship trends"))
    return "http://googleusercontent.com/image_collection/image_retrieval/15635196177317557417_6";
  if (h.includes("volunteer program"))
    return "http://googleusercontent.com/image_collection/image_retrieval/15635196177317557417_7";
  if (h.includes("pitch surface standards") || h.includes("grass quality"))
    return "http://googleusercontent.com/image_collection/image_retrieval/15635196177317557417_8";
  if (h.includes("global fan travel") || h.includes("airline partnerships"))
    return "http://googleusercontent.com/image_collection/image_retrieval/15635196177317557417_9";
  if (h.includes("real-time match analysis") || h.includes("ai-driven scouting"))
    return "http://googleusercontent.com/image_collection/image_retrieval/7505738112020600445_0";
  if (h.includes("weather contingency") || h.includes("cooling breaks"))
    return "http://googleusercontent.com/image_collection/image_retrieval/7505738112020600445_1";
  if (h.includes("local community impact") || h.includes("soccer legacy"))
    return "http://googleusercontent.com/image_collection/image_retrieval/7505738112020600445_2";
  if (h.includes("broadcast talent") || h.includes("female commentators"))
    return "http://googleusercontent.com/image_collection/image_retrieval/7505738112020600445_3";
  if (h.includes("digital tickets") || h.includes("ticketing system"))
    return "http://googleusercontent.com/image_collection/image_retrieval/7505738112020600445_4";
  if (h.includes("fan health & safety") || h.includes("medical hubs"))
    return "http://googleusercontent.com/image_collection/image_retrieval/7505738112020600445_5";
  if (h.includes("training facility standards") || h.includes("training sites"))
    return "http://googleusercontent.com/image_collection/image_retrieval/7505738112020600445_6";
  if (h.includes("anti-doping measures") || h.includes("anti-doping"))
    return "http://googleusercontent.com/image_collection/image_retrieval/7505738112020600445_7";
  if (h.includes("language services") || h.includes("announcements"))
    return "http://googleusercontent.com/image_collection/image_retrieval/7505738112020600445_8";
  if (h.includes("kit sustainability") || h.includes("recycled ocean"))
    return "http://googleusercontent.com/image_collection/image_retrieval/7505738112020600445_9";
  return null;
};

const RAW_NEWS_ITEMS = [
  { id: 1, category: "MATCH REPORTS", featured: true, headline: "World Cup 2026: USA kick off campaign with dramatic 2-1 victory over rivals Mexico", summary: "Christian Pulisic broke his goal drought as the USMNT delivered a statement opening win on home soil in a pulsating North American derby.", source: "ESPN FC", sourceFlag: "us", timeAgo: "20m ago" },
  { id: 2, category: "MATCH REPORTS", featured: false, headline: "Mexico 0-1 South Africa: Co-hosts stunned in opening game at Estadio Azteca", summary: "South Africa pulled off one of the biggest upsets in World Cup history, silencing a packed Azteca in the tournament's curtain-raiser.", source: "BBC Sport", sourceFlag: "gb", timeAgo: "2h ago" },
  { id: 3, category: "MATCH REPORTS", featured: false, headline: "Canada vs Bosnia-Herzegovina: Hosts secure hard-fought draw in Toronto opener", summary: "Canada earned a point in their first-ever competitive World Cup match on home soil, with Jonathan David heading in a late equaliser at BMO Field.", source: "TSN", sourceFlag: "ca", timeAgo: "4h ago" },
  { id: 4, category: "MATCH REPORTS", featured: false, headline: "Brazil 2-0 Morocco: Ancelotti's side ease to commanding Group C victory", summary: "A composed Brazil side opened their World Cup account with a professional win over Morocco at MetLife Stadium, with Vinicius Jr. starring.", source: "Globo Esporte", sourceFlag: "br", timeAgo: "6h ago" },
  { id: 5, category: "MATCH REPORTS", featured: false, headline: "England 3-1 Panama: Three Lions cruise past CONCACAF opposition in Group L opener", summary: "England got their World Cup campaign off to a flying start with a comfortable win, with Jude Bellingham and Harry Kane both on the scoresheet.", source: "Sky Sports", sourceFlag: "gb", timeAgo: "5h ago" },
  { id: 6, category: "MATCH REPORTS", featured: false, headline: "Argentina 1-0 Algeria: Messi provides assist as defending champions begin title defence", summary: "A scrappy win but a vital one for La Albiceleste. Messi rolled back the years with a sublime through ball for Lautaro Martinez's winner in Kansas City.", source: "TyC Sports", sourceFlag: "ar", timeAgo: "3h ago" },
  { id: 7, category: "MATCH REPORTS", featured: false, headline: "Portugal 4-0 DR Congo: Ronaldo nets hat-trick in emphatic Group K opener", summary: "Cristiano Ronaldo silenced doubters with a stunning hat-trick in Houston, becoming the oldest player ever to score three goals in a single World Cup match.", source: "Record", sourceFlag: "pt", timeAgo: "7h ago" },
  { id: 8, category: "MATCH REPORTS", featured: false, headline: "France 2-1 Senegal: Les Bleus edge past resilient Senegalese side in New Jersey", summary: "France had to come from behind to beat Senegal in a tense Group I encounter, with Kylian Mbappé netting the winner from the penalty spot.", source: "L'Équipe", sourceFlag: "fr", timeAgo: "9h ago" },
  { id: 9, category: "MATCH REPORTS", featured: false, headline: "Spain 3-0 Cape Verde: Lamine Yamal dazzles on World Cup debut as La Roja dominate", summary: "Spain were imperious in Atlanta as 18-year-old Lamine Yamal announced himself on the world stage with a goal and two assists in a stunning solo display.", source: "Marca", sourceFlag: "es", timeAgo: "8h ago" },
  { id: 10, category: "MATCH REPORTS", featured: false, headline: "Germany 2-2 Japan: Late Wirtz equaliser rescues point for Die Mannschaft in thriller", summary: "A rematch of the 2022 Qatar group-stage shocker delivered drama again, as Japan led twice before Florian Wirtz's stoppage-time strike salvaged a draw.", source: "Kicker", sourceFlag: "de", timeAgo: "11h ago" },
  
  { id: 11, category: "FEATURES", featured: true, headline: "Messi confirms World Cup 2028 will be his international farewell tour", summary: "The 38-year-old confirmed this summer's tournament in North America is his sixth and final World Cup, bringing the curtain down on one of football's greatest international careers.", source: "FIFA Media", sourceFlag: "int", timeAgo: "3h ago" },
  { id: 12, category: "FEATURES", featured: false, headline: "Tactical Preview: How France plan to unlock Denmark's high-press defensive structure", summary: "L'Équipe tactical analyst breaks down Deschamps' blueprint for dismantling Denmark's aggressive 4-4-2 mid-block ahead of their Group I clash.", source: "L'Équipe", sourceFlag: "fr", timeAgo: "10h ago" },
  { id: 13, category: "FEATURES", featured: false, headline: "Lamine Yamal: The 18-year-old who could define this World Cup generation", summary: "Already winning Euro 2024 before his 17th birthday, Spain's prodigy arrives at the World Cup as one of the most hotly-anticipated talents in tournament history.", source: "The Athletic", sourceFlag: "gb", timeAgo: "1d ago" },
  { id: 14, category: "FEATURES", featured: false, headline: "The last dance: Messi, Ronaldo and the veterans playing their final World Cup", summary: "Messi (38), Ronaldo (41), Manuel Neuer (40) and Guillermo Ochoa (40) are all making their sixth and final World Cup appearances — a generation of giants bowing out together.", source: "Goal.com", sourceFlag: "int", timeAgo: "2d ago" },
  { id: 15, category: "FEATURES", featured: false, headline: "USMNT: Can the home side finally go deep at a World Cup?", summary: "Playing in front of their own fans for the first time since 1994, the United States arrive with genuine knockout-round ambitions and one of the most talented squads in a generation.", source: "Sports Illustrated", sourceFlag: "us", timeAgo: "1d ago" },
  { id: 16, category: "FEATURES", featured: false, headline: "Neymar's World Cup comeback: Gamble or masterclass from Carlo Ancelotti?", summary: "After a two-and-a-half-year absence from the Brazil squad, Neymar's shock inclusion by new manager Ancelotti has divided opinion — but the 34-year-old insists he's ready.", source: "ESPN Brasil", sourceFlag: "br", timeAgo: "3d ago" },
  { id: 17, category: "FEATURES", featured: false, headline: "Manuel Neuer comes out of retirement to lead Germany at 40 — the story behind the comeback", summary: "Germany coach Julian Nagelsmann described Neuer's 'aura' as irreplaceable, bringing the veteran goalkeeper back from international retirement for one final World Cup run.", source: "Bild", sourceFlag: "de", timeAgo: "4d ago" },
  { id: 18, category: "FEATURES", featured: false, headline: "48 teams, 104 games, 16 venues: Everything you need to know about the biggest World Cup ever", summary: "The 2026 tournament is the largest in World Cup history. Here's a complete breakdown of the format, groups, schedule and what's changed from Qatar 2022.", source: "FIFA.com", sourceFlag: "int", timeAgo: "5d ago" },
  { id: 19, category: "FEATURES", featured: false, headline: "AI and VAR: How technology is reshaping the 2026 World Cup experience", summary: "FIFA has introduced AI-assisted offside detection and enhanced video review systems at all 16 venues, promising faster and more accurate decisions than ever before.", source: "Wired", sourceFlag: "us", timeAgo: "6d ago" },
  { id: 20, category: "FEATURES", featured: false, headline: "Guillermo Ochoa: The 40-year-old goalkeeper making history at his sixth World Cup", summary: "When Angel Malagon suffered an Achilles injury in March, the door reopened for Mexico's legendary goalkeeper to join Messi and Ronaldo in the exclusive sixth-World Cup club.", source: "ESPN FC", sourceFlag: "mx", timeAgo: "2d ago" },

  { id: 21, category: "INJURIES", featured: false, headline: "England squad update: Jude Bellingham fit and firing for Matchday 2 clash", summary: "England's talisman is fully fit after minor training concerns last week, and is expected to start against Croatia in their second group stage fixture.", source: "BBC Sport", sourceFlag: "gb", timeAgo: "5h ago" },
  { id: 22, category: "INJURIES", featured: false, headline: "Estêvão ruled out of World Cup after hamstring injury — Brazil's biggest blow", summary: "The exciting Chelsea forward pulled up against Manchester United in April and failed to recover in time, leaving Brazil without one of their most electric attacking options.", source: "ESPN Brasil", sourceFlag: "br", timeAgo: "1d ago" },
  { id: 23, category: "INJURIES", featured: false, headline: "Messi injury scare resolved: Argentina captain selected in Scaloni's 26-man squad", summary: "Messi suffered muscular fatigue during an MLS match with Inter Miami but recovered in time. Scaloni confirmed the 38-year-old is fit and available for the tournament.", source: "TyC Sports", sourceFlag: "ar", timeAgo: "2d ago" },
  { id: 24, category: "INJURIES", featured: false, headline: "Matthijs de Ligt misses World Cup after failed recovery from back surgery", summary: "The Netherlands and Manchester United centre-back underwent additional surgery and has not played since November 30, ruling him out of the tournament entirely.", source: "De Telegraaf", sourceFlag: "nl", timeAgo: "3d ago" },
  { id: 25, category: "INJURIES", featured: false, headline: "Takumi Minamino fails to make Japan's 26-man squad after ACL recovery", summary: "Minamino tore his ACL in a French Cup match in December. Despite returning to training in March, he wasn't able to convince selectors ahead of the tournament.", source: "Nikkan Sports", sourceFlag: "jp", timeAgo: "4d ago" },
  { id: 26, category: "INJURIES", featured: false, headline: "Germany lose Lennart Karl to late injury blow ahead of World Cup opener", summary: "The promising young defender has been ruled out of the tournament, forcing Julian Nagelsmann to shuffle his defensive options before the competition begins.", source: "Kicker", sourceFlag: "de", timeAgo: "2d ago" },
  { id: 27, category: "INJURIES", featured: false, headline: "Rodrygo also out for Brazil — Ancelotti deals with mounting absentee list", summary: "Brazil manager Carlo Ancelotti must plot a route to the final without both Estêvão and Rodrygo, with Vinicius Jr. now expected to carry the attacking burden.", source: "Globo Esporte", sourceFlag: "br", timeAgo: "5d ago" },
  { id: 28, category: "INJURIES", featured: false, headline: "Paraguay's Julio Enciso injured in friendly — race to be fit for Group stage", summary: "Enciso sustained an injury in Paraguay's friendly against Nicaragua on June 5, just days before the World Cup opened, casting doubt on his availability.", source: "ABC Color", sourceFlag: "py", timeAgo: "3d ago" },
  { id: 29, category: "INJURIES", featured: false, headline: "Cristian Romero recovers from knee MCL injury to make Argentina squad", summary: "The Tottenham Hotspur defender recovered from a late-season setback to be included in Scaloni's 26-man World Cup squad, boosting Argentina's defensive options.", source: "Olé", sourceFlag: "ar", timeAgo: "1d ago" },
  { id: 30, category: "INJURIES", featured: false, headline: "Angel Malagon's Achilles injury opens door for Ochoa to make sixth World Cup", summary: "Mexico's first-choice goalkeeper suffered a serious Achilles injury in March, forcing manager Javier Aguirre to turn back to veteran Guillermo Ochoa at age 40.", source: "Record Mexico", sourceFlag: "mx", timeAgo: "6d ago" },

  { id: 31, category: "TRANSFERS", featured: false, headline: "Maroc Silva set to leave Fulham after five seasons — Benfica appointment imminent", summary: "The Portuguese manager is reportedly close to being appointed as the new Benfica head coach following his departure from Craven Cottage this summer.", source: "A Bola", sourceFlag: "pt", timeAgo: "1d ago" },
  { id: 32, category: "TRANSFERS", featured: false, headline: "World Cup performances set to ignite summer transfer market — clubs watching closely", summary: "Agents and directors of football from top European clubs have confirmed they will be using the World Cup as a scouting opportunity, with deals expected to accelerate post-tournament.", source: "Sky Sports", sourceFlag: "gb", timeAgo: "2d ago" },
  { id: 33, category: "TRANSFERS", featured: false, headline: "Raúl Jiménez's Fulham future uncertain as Mexico striker eyes World Cup swansong", summary: "The 34-year-old, who scored nine goals for Fulham this season, is out of contract and using the World Cup as a platform ahead of a final big move in his career.", source: "The Times", sourceFlag: "gb", timeAgo: "3d ago" },

  { id: 34, category: "FEATURES", featured: false, headline: "World Cup 2026 draw: How the 48 teams were sorted into 12 groups", summary: "The December 2025 draw in Miami separated the 48 qualified nations into 12 groups of four, with hosts USA, Mexico and Canada pre-assigned to Groups D, A and B respectively.", source: "FIFA.com", sourceFlag: "int", timeAgo: "6mo ago" },
  { id: 35, category: "FEATURES", featured: false, headline: "Qualification complete: All 48 teams confirmed for World Cup 2026", summary: "The final playoff spots were decided in March 2026, with DR Congo, Czechia, and others securing their places via inter-confederation playoffs in thrilling fashion.", source: "BBC Sport", sourceFlag: "gb", timeAgo: "2mo ago" },
  { id: 36, category: "FEATURES", featured: false, headline: "Mexico to host World Cup games for a record third time — the history of El Tri at home", summary: "Mexico previously hosted the tournament in 1970 and 1986. Their record of seven straight Round of 16 exits (1994–2018) makes progression their minimum goal this summer.", source: "ESPN FC", sourceFlag: "mx", timeAgo: "1mo ago" },
  { id: 37, category: "FEATURES", featured: false, headline: "Canada's World Cup moment: A nation that's never won a game now hosts the tournament", summary: "Canada have never won a World Cup match. Qualifying from Group B and reaching the knockouts on home soil would mark a historic moment for Canadian football.", source: "TSN", sourceFlag: "ca", timeAgo: "3wk ago" },
  { id: 38, category: "FEATURES", featured: false, headline: "Iran receive visas 10 days before World Cup opener against New Zealand in Los Angeles", summary: "Amid political tensions over US-Iran relations, the Iranian squad finally received confirmation of their travel visas just over a week before their June 15 opener.", source: "Al Jazeera", sourceFlag: "int", timeAgo: "2d ago" },
  { id: 39, category: "FEATURES", featured: false, headline: "USMNT 3-2 Senegal: Pulisic returns to form in final World Cup warmup", summary: "Christian Pulisic ended a goal drought with a brace as the United States put in an encouraging performance against Senegal in Charlotte ahead of the tournament.", source: "NBC Sports", sourceFlag: "us", timeAgo: "1wk ago" },
  { id: 40, category: "FEATURES", featured: false, headline: "Pope Leo XIV backs USMNT: 'I would certainly support the U.S.'", summary: "The Chicago-born Pope, who previously served as a bishop in Peru, confirmed he would support the United States at the World Cup — after Peru failed to qualify.", source: "Reuters", sourceFlag: "int", timeAgo: "3d ago" }
];

export const MOCK_NEWS: NewsArticle[] = RAW_NEWS_ITEMS.map((item) => {
  const keywords = getKeywords(item.headline, item.category);
  const categoryLabel = item.category === "MATCH REPORTS" ? "Match Reports" : (item.category === "FEATURES" ? "Features" : (item.category === "INJURIES" ? "Injuries" : "Transfers"));
  
  const googleImageUrl = getGoogleUserContentUrl(item.headline);
  let imageUrl = googleImageUrl || `https://source.unsplash.com/800x600/?${keywords}`;

  return {
    id: `wn-${item.id}`,
    title: item.headline,
    summary: item.summary,
    content: `
      <p>${item.summary}</p>
      <h2>World Cup coverage continues</h2>
      <p>As the tournament kicks off across North America, key players and managers are adjusting to the intensive schedule and conditions. We will continue to bring you the latest analytical updates, tactical insights, and direct reports from all host cities.</p>
    `,
    image: imageUrl,
    category: categoryLabel,
    source: {
      name: item.source,
      logo: SOURCE_FLAG_MAP[item.sourceFlag] || "🌍"
    },
    author: "Ball-Ops Sports Desk",
    publishedAt: getRelativeTimeDate(item.timeAgo),
    readTime: 3 + Math.floor(Math.random() * 4),
    relatedArticles: [],
    isFeatured: !!item.featured
  };
});