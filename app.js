const STORAGE_KEY = "deenquest-state-v1";
const THEME_KEY = "deenquest-theme";
const GOAL_XP = 20;
const XP_PER_LEVEL = 100;
const QUIZ_QUESTION_COUNT = 10;
const QUIZ_PASS_SCORE = 6;

const defaultGoals = [
  "Leer Surah Al-Fatiha",
  "Bid Fajr op tijd",
  "Lees 5 minuten Qur'an",
  "Leer 3 namen van Allah",
];

const dailyAyahs = [
  {
    reference: "Ta-Ha 20:114",
    arabic: "رَبِّ زِدْنِي عِلْمًا",
    meaning: "Mijn Heer, vermeerder mij in kennis.",
  },
  {
    reference: "Ash-Sharh 94:5",
    arabic: "فَإِنَّ مَعَ الْعُسْرِ يُسْرًا",
    meaning: "Met moeilijkheid komt ook verlichting.",
  },
  {
    reference: "Al-Baqarah 2:286",
    arabic: "لَا يُكَلِّفُ اللَّهُ نَفْسًا إِلَّا وُسْعَهَا",
    meaning: "Allah belast niemand boven wat diegene aankan.",
  },
  {
    reference: "Ar-Ra'd 13:28",
    arabic: "أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ",
    meaning: "Door het gedenken van Allah vinden harten rust.",
  },
  {
    reference: "Az-Zumar 39:53",
    arabic: "لَا تَقْنَطُوا مِن رَّحْمَةِ اللَّهِ",
    meaning: "Wanhoop niet aan de barmhartigheid van Allah.",
  },
  {
    reference: "Aal-Imran 3:139",
    arabic: "وَلَا تَهِنُوا وَلَا تَحْزَنُوا",
    meaning: "Verlies de moed niet en wees niet bedroefd.",
  },
  {
    reference: "Ibrahim 14:7",
    arabic: "لَئِن شَكَرْتُمْ لَأَزِيدَنَّكُمْ",
    meaning: "Dankbaarheid opent de deur naar meer zegeningen.",
  },
  {
    reference: "Al-Baqarah 2:153",
    arabic: "إِنَّ اللَّهَ مَعَ الصَّابِرِينَ",
    meaning: "Allah is met degenen die geduldig zijn.",
  },
  {
    reference: "At-Talaq 65:3",
    arabic: "وَمَن يَتَوَكَّلْ عَلَى اللَّهِ فَهُوَ حَسْبُهُ",
    meaning: "Wie op Allah vertrouwt, voor diegene is Hij genoeg.",
  },
  {
    reference: "Ash-Sharh 94:6",
    arabic: "إِنَّ مَعَ الْعُسْرِ يُسْرًا",
    meaning: "Voorwaar, met moeilijkheid is er verlichting.",
  },
];

const quizSubjects = [
  {
    id: "mixed",
    label: "Gemengd",
    description: "Alle onderdelen door elkaar.",
  },
  {
    id: "basis",
    label: "Basiskennis",
    description: "Zuilen, begrippen en dagelijkse basis.",
  },
  {
    id: "gebed",
    label: "Gebed",
    description: "Wudhu, houdingen en gebedstijden.",
  },
  {
    id: "quran",
    label: "Qur'an",
    description: "Surahs, openbaring en betekenis.",
  },
  {
    id: "profeten",
    label: "Profeten",
    description: "Verhalen en lessen van profeten.",
  },
  {
    id: "namen",
    label: "Namen van Allah",
    description: "Mooie namen en betekenissen.",
  },
];

const quizDifficulties = [
  {
    id: "beginner",
    label: "Beginner",
    description: "Rustige startvragen.",
    xpPerCorrect: 10,
  },
  {
    id: "advanced",
    label: "Gevorderd",
    description: "Meer details en begrippen.",
    xpPerCorrect: 15,
  },
  {
    id: "expert",
    label: "Expert",
    description: "Voor wie de basis sterk beheerst.",
    xpPerCorrect: 20,
  },
];

const quizQuestionBank = [
  {
    subject: "basis",
    difficulty: "beginner",
    question: "Hoeveel zuilen heeft de Islam?",
    answers: ["3", "4", "5", "6"],
    correct: 2,
  },
  {
    subject: "basis",
    difficulty: "beginner",
    question: "Welke maand vasten moslims?",
    answers: ["Shawwal", "Muharram", "Ramadan", "Rajab"],
    correct: 2,
  },
  {
    subject: "basis",
    difficulty: "beginner",
    question: "Wat is de eerste zuil van de Islam?",
    answers: ["Zakat", "Shahada", "Hajj", "Sawm"],
    correct: 1,
  },
  {
    subject: "basis",
    difficulty: "advanced",
    question: "Welke van deze hoort bij de vijf zuilen?",
    answers: ["Tawakkul", "Sabr", "Zakat", "Adab"],
    correct: 2,
  },
  {
    subject: "basis",
    difficulty: "advanced",
    question: "Wat betekent tawhid kort gezegd?",
    answers: ["Geduld tonen", "Allah als Eén aanbidden", "Kennis zoeken", "Vasten verbreken"],
    correct: 1,
  },
  {
    subject: "basis",
    difficulty: "advanced",
    question: "Welke reis hoort bij de vijfde zuil?",
    answers: ["Hijrah", "Isra", "Hajj", "Mi'raj"],
    correct: 2,
  },
  {
    subject: "basis",
    difficulty: "expert",
    question: "Wat betekent ihsan in de bekende hadith van Jibril?",
    answers: [
      "Aanbidden alsof je Allah ziet",
      "Alleen vrijwillig vasten",
      "Een lange reis maken",
      "Hardop reciteren",
    ],
    correct: 0,
  },
  {
    subject: "basis",
    difficulty: "expert",
    question: "Welke term past bij vertrouwen op Allah na inspanning?",
    answers: ["Tawakkul", "Tajwid", "Tashahhud", "Talbiyah"],
    correct: 0,
  },
  {
    subject: "basis",
    difficulty: "expert",
    question: "Wat betekent taqwa het best?",
    answers: ["Bewustzijn van Allah", "Een gebedsruimte", "Een soort zakaat", "Een reis naar Madinah"],
    correct: 0,
  },
  {
    subject: "gebed",
    difficulty: "beginner",
    question: "Hoeveel verplichte gebeden zijn er per dag?",
    answers: ["3", "4", "5", "7"],
    correct: 2,
  },
  {
    subject: "gebed",
    difficulty: "beginner",
    question: "Hoe heet het gebed rond de dageraad?",
    answers: ["Dhuhr", "Fajr", "Isha", "Asr"],
    correct: 1,
  },
  {
    subject: "gebed",
    difficulty: "beginner",
    question: "Waarheen richt je je tijdens het gebed?",
    answers: ["Qiblah", "Minbar", "Mihrab", "Mina"],
    correct: 0,
  },
  {
    subject: "gebed",
    difficulty: "advanced",
    question: "Wat is ruku?",
    answers: ["De buiging", "De afsluitende groet", "Het vasten", "De oproep tot gebed"],
    correct: 0,
  },
  {
    subject: "gebed",
    difficulty: "advanced",
    question: "Welke houding heet sujud?",
    answers: ["Staan", "Zitten", "Neerknielen", "Buigen"],
    correct: 2,
  },
  {
    subject: "gebed",
    difficulty: "advanced",
    question: "Waarvoor zit je aan het einde van het gebed?",
    answers: ["Tashahhud", "Tarawih", "Takbir", "Tayammum"],
    correct: 0,
  },
  {
    subject: "gebed",
    difficulty: "expert",
    question: "In welke rak'ah wordt Al-Fatiha gelezen?",
    answers: ["Alleen de eerste", "Elke rak'ah", "Alleen de laatste", "Alleen bij Fajr"],
    correct: 1,
  },
  {
    subject: "gebed",
    difficulty: "expert",
    question: "Wat betekent khushu' in het gebed?",
    answers: ["Rustige concentratie", "Snel reciteren", "Hardop lopen", "Vasten verbreken"],
    correct: 0,
  },
  {
    subject: "gebed",
    difficulty: "expert",
    question: "Welke uitspraak hoort bij het opkomen uit ruku?",
    answers: ["Sami'a Allahu liman hamidah", "Subhana Rabbiyal A'la", "Bismillah", "Assalamu alaikum"],
    correct: 0,
  },
  {
    subject: "quran",
    difficulty: "beginner",
    question: "In welke taal werd de Qur'an geopenbaard?",
    answers: ["Arabisch", "Perzisch", "Turks", "Urdu"],
    correct: 0,
  },
  {
    subject: "quran",
    difficulty: "beginner",
    question: "Welke surah wordt in elke rak'ah gelezen?",
    answers: ["Al-Fatiha", "Al-Ikhlas", "Yasin", "An-Nas"],
    correct: 0,
  },
  {
    subject: "quran",
    difficulty: "beginner",
    question: "Hoeveel surahs heeft de Qur'an?",
    answers: ["99", "100", "114", "120"],
    correct: 2,
  },
  {
    subject: "quran",
    difficulty: "advanced",
    question: "Wat is de langste surah in de Qur'an?",
    answers: ["Al-Baqarah", "Al-Fatiha", "Al-Kawthar", "An-Nas"],
    correct: 0,
  },
  {
    subject: "quran",
    difficulty: "advanced",
    question: "Welke eerste woorden horen bij de eerste openbaring?",
    answers: ["Qul huwa Allahu ahad", "Iqra", "Alhamdulillah", "Bismillah"],
    correct: 1,
  },
  {
    subject: "quran",
    difficulty: "advanced",
    question: "Welke surah benadrukt kort en krachtig tawhid?",
    answers: ["Al-Ikhlas", "Al-Masad", "Al-Fil", "Quraysh"],
    correct: 0,
  },
  {
    subject: "quran",
    difficulty: "expert",
    question: "Waar staat Ayat al-Kursi?",
    answers: ["Al-Baqarah 2:255", "Yasin 36:1", "Al-Fatiha 1:7", "Al-Ikhlas 112:1"],
    correct: 0,
  },
  {
    subject: "quran",
    difficulty: "expert",
    question: "Hoe heet een deel van de Qur'an dat vaak voor lezen wordt verdeeld?",
    answers: ["Juz", "Rak'ah", "Hadith", "Qiblah"],
    correct: 0,
  },
  {
    subject: "quran",
    difficulty: "expert",
    question: "Welke surah staat bekend als 'het hart van de Qur'an'?",
    answers: ["Yasin", "Al-Falaq", "Al-Kafirun", "Al-Ma'un"],
    correct: 0,
  },
  {
    subject: "profeten",
    difficulty: "beginner",
    question: "Welke profeet bouwde de ark?",
    answers: ["Musa", "Nuh", "Ibrahim", "Yusuf"],
    correct: 1,
  },
  {
    subject: "profeten",
    difficulty: "beginner",
    question: "Wie is de laatste profeet in de Islam?",
    answers: ["Isa", "Musa", "Muhammad", "Ibrahim"],
    correct: 2,
  },
  {
    subject: "profeten",
    difficulty: "beginner",
    question: "Welke profeet wordt vaak verbonden met de Ka'bah?",
    answers: ["Ibrahim", "Harun", "Dawud", "Yunus"],
    correct: 0,
  },
  {
    subject: "profeten",
    difficulty: "advanced",
    question: "Welke profeet werd gered toen de zee spleet?",
    answers: ["Musa", "Nuh", "Yusuf", "Zakariya"],
    correct: 0,
  },
  {
    subject: "profeten",
    difficulty: "advanced",
    question: "Welke profeet staat bekend om zijn droom en beproevingen in Egypte?",
    answers: ["Yusuf", "Salih", "Lut", "Idris"],
    correct: 0,
  },
  {
    subject: "profeten",
    difficulty: "advanced",
    question: "Welke profeet is de zoon van Maryam?",
    answers: ["Isa", "Ishaq", "Ismail", "Yahya"],
    correct: 0,
  },
  {
    subject: "profeten",
    difficulty: "expert",
    question: "Welke profeet wordt Dhun-Nun genoemd?",
    answers: ["Yunus", "Musa", "Ibrahim", "Ayyub"],
    correct: 0,
  },
  {
    subject: "profeten",
    difficulty: "expert",
    question: "Wie was de vader van Ismail?",
    answers: ["Ibrahim", "Ya'qub", "Nuh", "Dawud"],
    correct: 0,
  },
  {
    subject: "profeten",
    difficulty: "expert",
    question: "Welke profeet stond bekend om grote sabr tijdens ziekte?",
    answers: ["Ayyub", "Hud", "Salih", "Yunus"],
    correct: 0,
  },
  {
    subject: "namen",
    difficulty: "beginner",
    question: "Wat betekent Ar-Rahman?",
    answers: ["De Alwetende", "De Meest Barmhartige", "De Koning", "De Schepper"],
    correct: 1,
  },
  {
    subject: "namen",
    difficulty: "beginner",
    question: "Welke naam betekent De Alwetende?",
    answers: ["Al-Alim", "Al-Malik", "As-Salam", "Al-Khaliq"],
    correct: 0,
  },
  {
    subject: "namen",
    difficulty: "beginner",
    question: "Wat betekent Al-Malik?",
    answers: ["De Koning", "De Vergever", "De Subtiele", "De Wijze"],
    correct: 0,
  },
  {
    subject: "namen",
    difficulty: "advanced",
    question: "Wat betekent Al-Khaliq?",
    answers: ["De Schepper", "De Koning", "De Rechter", "De Helper"],
    correct: 0,
  },
  {
    subject: "namen",
    difficulty: "advanced",
    question: "Welke naam betekent De Vergever?",
    answers: ["Al-Ghaffar", "Al-Quddus", "Al-Wadud", "Al-Hadi"],
    correct: 0,
  },
  {
    subject: "namen",
    difficulty: "advanced",
    question: "Wat betekent As-Salam?",
    answers: ["De Bron van vrede", "De Voorziener", "De Eeuwige", "De Machtige"],
    correct: 0,
  },
  {
    subject: "namen",
    difficulty: "expert",
    question: "Wat betekent Al-Latif?",
    answers: ["De Zachtmoedige Subtiele", "De Koning", "De Schepper", "De Eerste"],
    correct: 0,
  },
  {
    subject: "namen",
    difficulty: "expert",
    question: "Welke naam betekent De Alwijze?",
    answers: ["Al-Hakeem", "Al-Awwal", "Al-Matin", "Al-Qayyum"],
    correct: 0,
  },
  {
    subject: "namen",
    difficulty: "expert",
    question: "Wat betekent Al-Quddus?",
    answers: ["De Heilige", "De Voorziener", "De Nabije", "De Dankbare"],
    correct: 0,
  },
];

const extraQuizQuestions = [
  ...makeQuestions("basis", "beginner", [
    ["Wat zeg je vaak voordat je met iets goeds begint?", ["Bismillah", "SubhanAllah", "Allahu Akbar", "Astaghfirullah"], 0],
    ["Wat betekent halal?", ["Toegestaan", "Verboden", "Verplicht gebed", "Een surah"], 0],
    ["Wat is dua?", ["Een smeekbede", "Een gebedskleed", "Een maand", "Een moskee"], 0],
    ["Welke dag is belangrijk voor het vrijdaggebed?", ["Vrijdag", "Maandag", "Woensdag", "Zondag"], 0],
    ["Hoe heet de liefdadigheid die bij de zuilen hoort?", ["Zakat", "Ruku", "Tajwid", "Adhan"], 0],
    ["Wat betekent Alhamdulillah?", ["Alle lof is aan Allah", "Allah is groter", "In naam van Allah", "Vrede zij met jou"], 0],
    ["Wat betekent moslim kort gezegd?", ["Iemand die zich overgeeft aan Allah", "Iemand die reist", "Iemand die zingt", "Iemand die vast slaapt"], 0],
  ]),
  ...makeQuestions("basis", "advanced", [
    ["Wat is sunnah?", ["Het voorbeeld van de Profeet", "Een gebedsrichting", "Een soort eten", "Een maand"], 0],
    ["Wat is een hadith?", ["Een overlevering", "Een gebedsmat", "Een munteenheid", "Een stad"], 0],
    ["Wat betekent sabr?", ["Geduld", "Rijkdom", "Reis", "Boek"], 0],
    ["Wat betekent haram?", ["Verboden", "Aanbevolen", "Toegestaan", "Vergeten"], 0],
    ["Wat betekent ummah?", ["Gemeenschap", "Gebedsplaats", "Dageraad", "Afsluiting"], 0],
    ["Wat betekent niyyah?", ["Intentie", "Wasritueel", "Vastenmaand", "Recitatie"], 0],
    ["Wat is shukr?", ["Dankbaarheid", "Ziekte", "Tijd", "Stilte"], 0],
  ]),
  ...makeQuestions("basis", "expert", [
    ["Wat is fiqh?", ["Begrip van islamitische regels", "Een gebedsoproep", "Een korte surah", "Een maaltijd"], 0],
    ["Wat is aqidah?", ["Geloofsleer", "Een reisroute", "Een soort dadel", "Een gebedstijd"], 0],
    ["Wat is tawbah?", ["Berouw tonen", "Een moskee bouwen", "Een boek sluiten", "Een naam leren"], 0],
    ["Wat betekent ikhlas?", ["Oprechtheid", "Haast", "Twijfel", "Reizen"], 0],
    ["Wat is adab?", ["Goede manieren", "Een gebedsrichting", "Een profetennaam", "Een dag"], 0],
    ["Wat betekent rizq?", ["Voorziening", "Gebedshouding", "Openbaring", "Zonde"], 0],
    ["Wat betekent tawakkul?", ["Vertrouwen op Allah", "Hardop lezen", "Een vraag stellen", "Een maand vasten"], 0],
  ]),
  ...makeQuestions("gebed", "beginner", [
    ["Wat doe je voor het gebed als je geen wudhu hebt?", ["Wudhu verrichten", "Direct beginnen", "Eerst slapen", "Niets doen"], 0],
    ["Wat zeg je bij het begin van het gebed?", ["Allahu Akbar", "Alhamdulillah", "SubhanAllah", "Astaghfirullah"], 0],
    ["Welk gebed is na zonsondergang?", ["Maghrib", "Fajr", "Dhuhr", "Asr"], 0],
    ["Welk gebed is rond de middag?", ["Dhuhr", "Isha", "Fajr", "Maghrib"], 0],
    ["Wat is de adhan?", ["De oproep tot gebed", "Een gebedsmat", "Een smeekbede", "Een surah"], 0],
    ["Hoe heet het nachtgebed dat verplicht is?", ["Isha", "Asr", "Dhuhr", "Fajr"], 0],
    ["Wat is belangrijk voor de plek van gebed?", ["Dat die schoon is", "Dat die lawaai maakt", "Dat die donker is", "Dat die hoog is"], 0],
  ]),
  ...makeQuestions("gebed", "advanced", [
    ["Wat betekent takbir?", ["Allahu Akbar zeggen", "Zitten", "Vasten", "Water drinken"], 0],
    ["Hoe sluit je het gebed af?", ["Met salam", "Met adhan", "Met zakat", "Met suhur"], 0],
    ["Wat is een imam in het gebed?", ["Degene die voorgaat", "Degene die achteraan zit", "Een gebedsmat", "Een maand"], 0],
    ["Welke houding komt direct na ruku?", ["Rechtop staan", "Liggen", "Wudhu doen", "Eten"], 0],
    ["Wat is qiyam?", ["Staan in het gebed", "Afsluiten", "Neerknielen", "Vasten"], 0],
    ["Wat doe je tussen twee sujuds?", ["Kort zitten", "Rondlopen", "Hard lachen", "De adhan doen"], 0],
    ["Waarvoor zit je aan het einde?", ["Tashahhud", "Tajwid", "Tawaf", "Tayammum"], 0],
  ]),
  ...makeQuestions("gebed", "expert", [
    ["Wat is sujud as-sahw?", ["Neerknieling bij vergeetachtigheid", "Vrijdaggebed", "Wasritueel", "Oproep tot gebed"], 0],
    ["Wat betekent jama'ah?", ["Gezamenlijk gebed", "Een korte pauze", "Een richting", "Een boek"], 0],
    ["Wanneer wordt witr gebeden?", ["Na Isha en voor Fajr", "Alleen na Dhuhr", "Voor zonsopkomst verplicht", "Tijdens khutbah"], 0],
    ["Wat zijn rawatib?", ["Sunnah-gebeden rond verplichte gebeden", "Gebedsmatten", "Vastenregels", "Dagen van Hajj"], 0],
    ["Wat is een sutrah?", ["Afscheiding voor de biddende", "Een surah", "Een naam van Allah", "Een gebedstijd"], 0],
    ["Wanneer is Jumu'ah?", ["Vrijdag rond Dhuhr", "Elke ochtend", "Na Isha", "Tijdens Ramadan alleen"], 0],
    ["Wat is iqamah?", ["Aankondiging dat het gebed begint", "Een gebedsrichting", "Een profetenverhaal", "Een vorm van zakat"], 0],
  ]),
  ...makeQuestions("quran", "beginner", [
    ["Wat is een ayah?", ["Een vers", "Een gebedskleed", "Een maand", "Een gebedstijd"], 0],
    ["Welke surah begint met Qul huwa Allahu ahad?", ["Al-Ikhlas", "Al-Fatiha", "Yasin", "Al-Fil"], 0],
    ["Wat betekent Qur'an ongeveer?", ["Recitatie", "Gebedsrichting", "Vasten", "Reis"], 0],
    ["Wie bracht de openbaring aan de Profeet?", ["Jibril", "Musa", "Nuh", "Bilal"], 0],
    ["Wat is de eerste surah in de mushaf?", ["Al-Fatiha", "An-Nas", "Yasin", "Al-Kawthar"], 0],
    ["Welke boek is de belangrijkste bron voor moslims?", ["De Qur'an", "Een atlas", "Een dagboek", "Een woordenboek"], 0],
    ["Hoe noem je het mooi en zorgvuldig lezen van Qur'an?", ["Reciteren", "Rennen", "Tekenen", "Slapen"], 0],
  ]),
  ...makeQuestions("quran", "advanced", [
    ["Wat is tajwid?", ["Regels voor Qur'an-recitatie", "Een gebedstijd", "Een profeet", "Een stad"], 0],
    ["Wat is tafsir?", ["Uitleg van de Qur'an", "Een gebedsmat", "Een maand", "Een naam"], 0],
    ["Waar begon de eerste openbaring?", ["Grot Hira", "Mina", "Ta'if", "Badr"], 0],
    ["Wat is de kortste surah?", ["Al-Kawthar", "Al-Baqarah", "Yasin", "Maryam"], 0],
    ["Wat betekent Makki bij een surah meestal?", ["Uit de Mekkaanse periode", "Alleen voor vrijdag", "Over eten", "Zonder ayat"], 0],
    ["Wat betekent Madani bij een surah meestal?", ["Uit de Medinese periode", "Zonder Bismillah", "Heel kort", "Alleen Arabisch"], 0],
    ["Wat is een hafiz?", ["Iemand die de Qur'an heeft gememoriseerd", "Een gebedsleider alleen", "Een reiziger", "Een schrijver van apps"], 0],
  ]),
  ...makeQuestions("quran", "expert", [
    ["Wat is een mushaf?", ["De geschreven Qur'an als boek", "Een gebedshouding", "Een maand", "Een moskee"], 0],
    ["Wat is sabab an-nuzul?", ["Aanleiding van openbaring", "Een gebedstijd", "Een naam van Allah", "Een reis"], 0],
    ["Wat betekent mutawatir?", ["Breed en sterk overgeleverd", "Alleen zacht gelezen", "Een korte pauze", "Een soort eten"], 0],
    ["Wat is qira'ah?", ["Een recitatiestijl", "Een gebedsmat", "Een vastendag", "Een profeet"], 0],
    ["Wat betekent waqf in tajwid?", ["Pauzeren of stoppen", "Snel lezen", "Hardop lachen", "Beginnen met eten"], 0],
    ["Welke surah begint niet met Bismillah in de mushaf?", ["At-Tawbah", "Al-Fatiha", "Yasin", "Al-Ikhlas"], 0],
    ["Hoeveel juz heeft de Qur'an?", ["30", "10", "40", "99"], 0],
  ]),
  ...makeQuestions("profeten", "beginner", [
    ["Welke profeet werd opgeslokt door een grote vis?", ["Yunus", "Musa", "Ibrahim", "Dawud"], 0],
    ["Welke profeet sprak met Allah?", ["Musa", "Nuh", "Yusuf", "Hud"], 0],
    ["Wie was de vader van Yusuf?", ["Ya'qub", "Ismail", "Harun", "Salih"], 0],
    ["Welke profeet kreeg de Zabur?", ["Dawud", "Isa", "Musa", "Nuh"], 0],
    ["Welke profeet kreeg de Injil?", ["Isa", "Ibrahim", "Yusuf", "Yunus"], 0],
    ["Welke profeet werd zonder vader geboren?", ["Isa", "Musa", "Nuh", "Ayyub"], 0],
    ["Wie is de moeder van Isa?", ["Maryam", "Hajar", "Asiyah", "Aminah"], 0],
  ]),
  ...makeQuestions("profeten", "advanced", [
    ["Naar welk volk werd Salih gestuurd?", ["Thamud", "Ad", "Quraysh", "Madyan"], 0],
    ["Welke profeet werd naar het volk Ad gestuurd?", ["Hud", "Lut", "Yusuf", "Ishaq"], 0],
    ["Welke profeet stond bekend om wijsheid en koningschap?", ["Sulayman", "Nuh", "Yunus", "Zakariya"], 0],
    ["Welke profeet kon dromen uitleggen?", ["Yusuf", "Musa", "Isa", "Ayyub"], 0],
    ["Wie was de broer van Musa?", ["Harun", "Ismail", "Ya'qub", "Dawud"], 0],
    ["Welke profeet werd beproefd met het offer?", ["Ibrahim", "Salih", "Hud", "Lut"], 0],
    ["Welke profeet bouwde een schip op bevel van Allah?", ["Nuh", "Isa", "Zakariya", "Yahya"], 0],
  ]),
  ...makeQuestions("profeten", "expert", [
    ["Welke zoon van Ibrahim is sterk verbonden met de Ka'bah?", ["Ismail", "Yusuf", "Harun", "Yahya"], 0],
    ["Wie was de vader van Yahya?", ["Zakariya", "Dawud", "Musa", "Hud"], 0],
    ["Welke profeet begreep de taal van vogels?", ["Sulayman", "Nuh", "Isa", "Ayyub"], 0],
    ["Welke profeet werd door zijn broers in een put gegooid?", ["Yusuf", "Ibrahim", "Lut", "Salih"], 0],
    ["Welke profeet werd met vuur beproefd?", ["Ibrahim", "Musa", "Yunus", "Zakariya"], 0],
    ["Welke profeet werd koning na Talut?", ["Dawud", "Isa", "Nuh", "Idris"], 0],
    ["Welke profeet stond bekend om geduld tijdens ziekte?", ["Ayyub", "Hud", "Salih", "Yunus"], 0],
  ]),
  ...makeQuestions("namen", "beginner", [
    ["Wat betekent Ar-Razzaq?", ["De Voorziener", "De Koning", "De Vergever", "De Eerste"], 0],
    ["Wat betekent Al-Wadud?", ["De Liefdevolle", "De Alziende", "De Schepper", "De Machtige"], 0],
    ["Welke naam betekent De Alhorende?", ["As-Sami", "Al-Basir", "Al-Malik", "Al-Hadi"], 0],
    ["Welke naam betekent De Alziende?", ["Al-Basir", "Al-Alim", "Al-Quddus", "Al-Wadud"], 0],
    ["Wat betekent Al-Hadi?", ["De Leidinggevende", "De Koning", "De Eeuwige", "De Openaar"], 0],
    ["Wat betekent Al-Aziz?", ["De Machtige", "De Subtiele", "De Laatste", "De Erfgenaam"], 0],
    ["Wat betekent Al-Hayy?", ["De Levende", "De Verzamelaar", "De Verhoorder", "De Rechtvaardige"], 0],
  ]),
  ...makeQuestions("namen", "advanced", [
    ["Wat betekent Al-Qayyum?", ["De Zelfbestaande Onderhouder", "De Eerste", "De Openlijke", "De Subtiele"], 0],
    ["Wat betekent Al-Fattah?", ["De Openaar", "De Levende", "De Koning", "De Heilige"], 0],
    ["Wat betekent Ash-Shakur?", ["De Waarderende", "De Alhorende", "De Verhevene", "De Laatste"], 0],
    ["Wat betekent Al-Hafiz?", ["De Beschermer", "De Schepper", "De Nabije", "De Wijze"], 0],
    ["Wat betekent Al-Adl?", ["De Rechtvaardige", "De Voorziener", "De Liefdevolle", "De Eerste"], 0],
    ["Wat betekent Al-Karim?", ["De Edelmoedige", "De Verborgen", "De Koning", "De Sterke"], 0],
    ["Wat betekent Al-Mujib?", ["De Verhoorder", "De Heilige", "De Subtiele", "De Erfgenaam"], 0],
  ]),
  ...makeQuestions("namen", "expert", [
    ["Wat betekent Al-Awwal?", ["De Eerste", "De Laatste", "De Koning", "De Alhorende"], 0],
    ["Wat betekent Al-Akhir?", ["De Laatste", "De Openaar", "De Schepper", "De Rechter"], 0],
    ["Wat betekent Al-Batin?", ["De Verborgene", "De Voorziener", "De Liefdevolle", "De Alziende"], 0],
    ["Wat betekent Al-Matin?", ["De Standvastige Sterke", "De Verhoorder", "De Heilige", "De Nabije"], 0],
    ["Wat betekent Al-Warith?", ["De Erfgenaam", "De Eerste", "De Koning", "De Subtiele"], 0],
    ["Wat betekent Al-Jami?", ["De Verzamelaar", "De Machtige", "De Alwetende", "De Vredige"], 0],
    ["Wat betekent Az-Zahir?", ["De Openlijke", "De Verborgen", "De Vergever", "De Voorziener"], 0],
  ]),
];

const allQuizQuestions = [...quizQuestionBank, ...extraQuizQuestions];

const dom = {
  views: document.querySelectorAll(".view"),
  tabButtons: document.querySelectorAll(".tab-button"),
  quickViewButtons: document.querySelectorAll("[data-go-view]"),
  toast: document.querySelector("#toast"),
  settingsButton: document.querySelector("#settingsButton"),
  closeSettingsButton: document.querySelector("#closeSettingsButton"),
  settingsOverlay: document.querySelector("#settingsOverlay"),
  darkModeToggle: document.querySelector("#darkModeToggle"),
  resetDemoButton: document.querySelector("#resetDemoButton"),
  homeLevel: document.querySelector("#homeLevel"),
  nextLevelLabel: document.querySelector("#nextLevelLabel"),
  progressCount: document.querySelector("#progressCount"),
  homeProgressBar: document.querySelector("#homeProgressBar"),
  homeGoalList: document.querySelector("#homeGoalList"),
  dailyAyahReference: document.querySelector("#dailyAyahReference"),
  dailyAyahArabic: document.querySelector("#dailyAyahArabic"),
  dailyAyahMeaning: document.querySelector("#dailyAyahMeaning"),
  goalForm: document.querySelector("#goalForm"),
  goalInput: document.querySelector("#goalInput"),
  goalList: document.querySelector("#goalList"),
  quizXpChip: document.querySelector("#quizXpChip"),
  quizSetupCard: document.querySelector("#quizSetupCard"),
  quizRouteList: document.querySelector("#quizRouteList"),
  quizLockNote: document.querySelector("#quizLockNote"),
  quizCard: document.querySelector("#quizCard"),
  quizTopic: document.querySelector("#quizTopic"),
  quizStep: document.querySelector("#quizStep"),
  questionText: document.querySelector("#questionText"),
  answerList: document.querySelector("#answerList"),
  quizFeedback: document.querySelector("#quizFeedback"),
  nextQuestionButton: document.querySelector("#nextQuestionButton"),
  restartQuizButton: document.querySelector("#restartQuizButton"),
  quizResultCard: document.querySelector("#quizResultCard"),
  quizResultTitle: document.querySelector("#quizResultTitle"),
  quizResultText: document.querySelector("#quizResultText"),
  newQuizButton: document.querySelector("#newQuizButton"),
  changeQuizButton: document.querySelector("#changeQuizButton"),
  progressLevelChip: document.querySelector("#progressLevelChip"),
  progressTotalXp: document.querySelector("#progressTotalXp"),
  progressRing: document.querySelector("#progressRing"),
  ringPercent: document.querySelector("#ringPercent"),
  quizHistoryList: document.querySelector("#quizHistoryList"),
};

let state = loadState();
let quizSession = createQuizSession();
let toastTimer;
let isDarkMode = localStorage.getItem(THEME_KEY) === "dark";

applyTheme();

function createInitialState() {
  return {
    xp: 0,
    goals: defaultGoals.map((title, index) => ({
      id: crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${index}`,
      title,
      completed: false,
      xpAwarded: false,
      createdAt: new Date().toISOString(),
      completedAt: null,
    })),
    quizResults: [],
    quizProgress: {},
  };
}

function loadState() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return createInitialState();

    const parsed = JSON.parse(stored);
    return {
      xp: Number.isFinite(parsed.xp) ? parsed.xp : 0,
      goals: Array.isArray(parsed.goals) ? parsed.goals : createInitialState().goals,
      quizResults: Array.isArray(parsed.quizResults) ? parsed.quizResults : [],
      quizProgress: parsed.quizProgress && typeof parsed.quizProgress === "object" ? parsed.quizProgress : {},
    };
  } catch {
    return createInitialState();
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function getLevelInfo(xp = state.xp) {
  const level = Math.floor(xp / XP_PER_LEVEL) + 1;
  const currentLevelXp = xp % XP_PER_LEVEL;
  const progressPercent = Math.round((currentLevelXp / XP_PER_LEVEL) * 100);
  return {
    level,
    currentLevelXp,
    progressPercent,
    nextLevel: level + 1,
  };
}

function awardXp(amount, reason) {
  const beforeLevel = getLevelInfo().level;
  state.xp += amount;
  saveState();
  render();

  const afterLevel = getLevelInfo().level;
  if (afterLevel > beforeLevel) {
    showToast(`Level up! Je bent nu level ${afterLevel}.`);
    return;
  }

  if (reason) showToast(`${reason}: +${amount} XP`);
}

function setView(viewName) {
  dom.views.forEach((view) => {
    view.classList.toggle("active", view.id === `${viewName}View`);
  });

  dom.tabButtons.forEach((button) => {
    const isActive = button.dataset.view === viewName;
    button.classList.toggle("active", isActive);
    if (isActive) {
      button.setAttribute("aria-current", "page");
    } else {
      button.removeAttribute("aria-current");
    }
  });
}

function render() {
  renderDashboard();
  renderDailyAyah();
  renderHomeGoals();
  renderGoals();
  renderQuizSetup();
  renderProgress();
}

function applyTheme() {
  document.documentElement.dataset.theme = isDarkMode ? "dark" : "light";
  document.querySelector('meta[name="theme-color"]')?.setAttribute("content", isDarkMode ? "#07131f" : "#0b4335");
  if (dom.darkModeToggle) dom.darkModeToggle.checked = isDarkMode;
}

function setDarkMode(enabled) {
  isDarkMode = enabled;
  localStorage.setItem(THEME_KEY, enabled ? "dark" : "light");
  applyTheme();
  showToast(enabled ? "Dark mode staat aan." : "Dark mode staat uit.");
}

function openSettings() {
  dom.settingsOverlay.classList.remove("hidden");
  dom.settingsOverlay.setAttribute("aria-hidden", "false");
  dom.settingsButton.setAttribute("aria-expanded", "true");
  dom.closeSettingsButton.focus();
}

function closeSettings() {
  dom.settingsOverlay.classList.add("hidden");
  dom.settingsOverlay.setAttribute("aria-hidden", "true");
  dom.settingsButton.setAttribute("aria-expanded", "false");
  dom.settingsButton.focus();
}

function renderDailyAyah() {
  const today = new Date();
  const dayKey = Math.floor(
    Date.UTC(today.getFullYear(), today.getMonth(), today.getDate()) / 86_400_000
  );
  const ayah = dailyAyahs[dayKey % dailyAyahs.length];

  dom.dailyAyahReference.textContent = ayah.reference;
  dom.dailyAyahArabic.textContent = ayah.arabic;
  dom.dailyAyahMeaning.textContent = ayah.meaning;
}

function renderDashboard() {
  const { level, currentLevelXp, progressPercent, nextLevel } = getLevelInfo();

  dom.homeLevel.textContent = level;
  dom.nextLevelLabel.textContent = nextLevel;
  dom.progressCount.textContent = `${currentLevelXp}/100 XP`;
  dom.homeProgressBar.style.width = `${progressPercent}%`;
}

function renderHomeGoals() {
  const openGoals = state.goals.filter((goal) => !goal.completed);

  if (!openGoals.length) {
    dom.homeGoalList.innerHTML = `<p class="empty-state">Geen open doelen.</p>`;
    return;
  }

  dom.homeGoalList.innerHTML = openGoals
    .map((goal) => {
      return `
        <article class="goal-item home-goal-item">
          <button class="goal-check" type="button" data-complete-goal="${goal.id}" aria-label="Doel afstrepen">
            <svg aria-hidden="true" viewBox="0 0 24 24"><path d="m5 12 4 4L19 6" /></svg>
          </button>
          <p class="goal-title">${escapeHtml(goal.title)}</p>
          <span class="goal-status">+20 XP</span>
        </article>
      `;
    })
    .join("");
}

function renderGoals() {
  if (!state.goals.length) {
    dom.goalList.innerHTML = `<p class="empty-state">Je hebt nog geen doelen. Voeg er eentje toe om te beginnen.</p>`;
    return;
  }

  dom.goalList.innerHTML = state.goals
    .map((goal) => {
      const status = goal.completed ? "Voltooid" : "+20 XP";
      const disabled = goal.completed ? "disabled" : "";
      return `
        <article class="goal-item ${goal.completed ? "completed" : ""}">
          <button class="goal-check" type="button" data-complete-goal="${goal.id}" ${disabled} aria-label="${goal.completed ? "Doel voltooid" : "Doel afstrepen"}">
            <svg aria-hidden="true" viewBox="0 0 24 24"><path d="m5 12 4 4L19 6" /></svg>
          </button>
          <p class="goal-title">${escapeHtml(goal.title)}</p>
          <span class="goal-status">${status}</span>
        </article>
      `;
    })
    .join("");
}

function makeQuestions(subject, difficulty, items) {
  return items.map(([question, answers, correct]) => ({
    subject,
    difficulty,
    question,
    answers,
    correct,
  }));
}

function getSubjectById(subjectId) {
  return quizSubjects.find((subject) => subject.id === subjectId) || quizSubjects[0];
}

function getDifficultyById(difficultyId) {
  return quizDifficulties.find((difficulty) => difficulty.id === difficultyId) || quizDifficulties[0];
}

function getDifficultyIndex(difficultyId) {
  return quizDifficulties.findIndex((difficulty) => difficulty.id === difficultyId);
}

function getPreviousDifficulty(difficultyId) {
  const index = getDifficultyIndex(difficultyId);
  return index > 0 ? quizDifficulties[index - 1] : null;
}

function getQuizProgressKey(subjectId, difficultyId) {
  return `${subjectId}:${difficultyId}`;
}

function getBestQuizScore(subjectId, difficultyId) {
  const savedBest = Number(state.quizProgress?.[getQuizProgressKey(subjectId, difficultyId)]) || 0;
  const historyBest = state.quizResults
    .filter(
      (result) =>
        result.subjectId === subjectId &&
        result.difficultyId === difficultyId &&
        Number(result.total) >= QUIZ_QUESTION_COUNT
    )
    .reduce((bestScore, result) => Math.max(bestScore, Number(result.score) || 0), 0);

  return Math.max(savedBest, historyBest);
}

function hasPassedQuiz(subjectId, difficultyId) {
  return getBestQuizScore(subjectId, difficultyId) >= QUIZ_PASS_SCORE;
}

function isDifficultyUnlocked(subjectId, difficultyId) {
  const previousDifficulty = getPreviousDifficulty(difficultyId);
  return !previousDifficulty || hasPassedQuiz(subjectId, previousDifficulty.id);
}

function getDifficultyRequirementText(subjectId, difficulty) {
  const bestScore = getBestQuizScore(subjectId, difficulty.id);
  if (bestScore >= QUIZ_PASS_SCORE) return `Behaald: ${bestScore}/10`;
  if (isDifficultyUnlocked(subjectId, difficulty.id)) return `${difficulty.xpPerCorrect} XP per goed`;

  const previousDifficulty = getPreviousDifficulty(difficulty.id);
  return `Haal 6/10 op ${previousDifficulty.label}`;
}

function getQuestionPool(subjectId, difficultyId) {
  return allQuizQuestions.filter((question) => {
    const matchesSubject = subjectId === "mixed" || question.subject === subjectId;
    return matchesSubject && question.difficulty === difficultyId;
  });
}

function getQuizQuestions(subjectId, difficultyId) {
  const pool = getQuestionPool(subjectId, difficultyId);
  return shuffleItems(pool).slice(0, QUIZ_QUESTION_COUNT);
}

function shuffleItems(items) {
  return [...items]
    .map((item) => ({ item, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ item }) => item);
}

function renderQuizSetup() {
  const selectedSubjectId = quizSession.subjectId;
  dom.quizRouteList.classList.toggle("detail-route-list", Boolean(selectedSubjectId));
  dom.quizRouteList.setAttribute(
    "aria-label",
    selectedSubjectId ? "Moeilijkheidsgraden voor gekozen quizonderwerp" : "Quiz onderwerpen"
  );

  if (!selectedSubjectId) {
    dom.quizRouteList.innerHTML = quizSubjects
      .map((subject) => {
        const passedCount = quizDifficulties.filter((difficulty) => hasPassedQuiz(subject.id, difficulty.id)).length;

        return `
          <button
            class="quiz-subject-tile"
            type="button"
            data-select-subject="${subject.id}"
          >
            <div class="route-card-head">
              <span class="route-mark" aria-hidden="true">${escapeHtml(subject.label.slice(0, 1))}</span>
              <span class="route-progress">${passedCount}/3</span>
            </div>
            <div class="route-copy">
              <h3>${escapeHtml(subject.label)}</h3>
              <p>${escapeHtml(subject.description)}</p>
            </div>
          </button>
        `;
      })
      .join("");

    dom.quizXpChip.textContent = `${QUIZ_PASS_SCORE}/10 opent volgend niveau`;
    dom.quizLockNote.textContent = "Kies eerst een onderwerp. Daarna open je de drie moeilijkheidsgraden.";
    return;
  }

  const selectedSubject = getSubjectById(selectedSubjectId);
  const passedCount = quizDifficulties.filter((difficulty) => hasPassedQuiz(selectedSubject.id, difficulty.id)).length;
  const difficultyButtons = quizDifficulties
    .map((difficulty) => {
      const isUnlocked = isDifficultyUnlocked(selectedSubject.id, difficulty.id);
      const isPassed = hasPassedQuiz(selectedSubject.id, difficulty.id);
      const bestScore = getBestQuizScore(selectedSubject.id, difficulty.id);
      const status = isPassed
        ? `${bestScore}/10 gehaald`
        : getDifficultyRequirementText(selectedSubject.id, difficulty);
      const disabled = isUnlocked ? "" : "disabled";

      return `
        <button
          class="difficulty-tile ${isPassed ? "passed" : ""} ${isUnlocked ? "" : "locked"}"
          type="button"
          data-start-subject="${selectedSubject.id}"
          data-start-difficulty="${difficulty.id}"
          ${disabled}
        >
          <span>${escapeHtml(difficulty.label)}</span>
          <small>${escapeHtml(status)}</small>
        </button>
      `;
    })
    .join("");

  dom.quizRouteList.innerHTML = `
    <section class="quiz-detail-page" aria-live="polite">
      <button class="quiz-back-button" type="button" data-back-to-subjects>
        <span aria-hidden="true">←</span>
        Onderwerpen
      </button>

      <div class="selected-route-summary">
        <div class="route-mark" aria-hidden="true">${escapeHtml(selectedSubject.label.slice(0, 1))}</div>
        <div>
          <p class="eyebrow">Gekozen onderdeel</p>
          <h3>${escapeHtml(selectedSubject.label)}</h3>
          <p>${escapeHtml(selectedSubject.description)}</p>
        </div>
        <span class="route-progress">${passedCount}/3</span>
      </div>

      <div class="difficulty-tile-grid">${difficultyButtons}</div>
    </section>
  `;

  dom.quizXpChip.textContent = `${QUIZ_PASS_SCORE}/10 opent volgend niveau`;
  dom.quizLockNote.textContent =
    "Elke quiz heeft 10 vragen. Haal minimaal 6 goed om het volgende niveau binnen dat onderwerp vrij te spelen.";
}

function renderQuiz() {
  renderQuizSetup();
  dom.quizSetupCard.classList.toggle("hidden", quizSession.started || quizSession.finished);
  dom.quizCard.classList.toggle("hidden", !quizSession.started || quizSession.finished);
  dom.quizResultCard.classList.toggle("hidden", !quizSession.finished);

  if (quizSession.finished) {
    renderQuizResult();
    return;
  }

  if (!quizSession.started) return;

  const currentQuestion = quizSession.questions[quizSession.currentIndex];
  const subject = getSubjectById(quizSession.subjectId);
  const difficulty = getDifficultyById(quizSession.difficultyId);

  dom.quizTopic.textContent = `${subject.label} - ${difficulty.label}`;
  dom.quizStep.textContent = `${quizSession.currentIndex + 1}/${quizSession.questions.length}`;
  dom.questionText.textContent = currentQuestion.question;
  dom.quizFeedback.textContent = "";
  dom.quizFeedback.className = "feedback";
  dom.nextQuestionButton.disabled = quizSession.selectedAnswer === null;
  dom.nextQuestionButton.textContent =
    quizSession.currentIndex === quizSession.questions.length - 1 ? "Afronden" : "Volgende";

  dom.answerList.innerHTML = currentQuestion.answers
    .map((answer, index) => {
      const letter = String.fromCharCode(65 + index);
      return `
        <button class="answer-button" type="button" data-answer-index="${index}">
          <span class="answer-letter">${letter}</span>
          <span>${escapeHtml(answer)}</span>
        </button>
      `;
    })
    .join("");
}

function renderQuizResult() {
  const score = quizSession.answers.filter(Boolean).length;
  const difficulty = getDifficultyById(quizSession.difficultyId);
  const subject = getSubjectById(quizSession.subjectId);
  const xpEarned = score * difficulty.xpPerCorrect;
  const percentage = Math.round((score / quizSession.questions.length) * 100);

  dom.quizResultTitle.textContent =
    percentage >= 80 ? "Sterke ronde" : percentage >= 50 ? "Goed geoefend" : "Blijf rustig oefenen";
  dom.quizResultText.textContent = `${subject.label} - ${difficulty.label}: ${score} van de ${quizSession.questions.length} goed en ${xpEarned} XP verdiend.`;
}

function renderProgress() {
  const { level, progressPercent } = getLevelInfo();
  const sortedResults = [...state.quizResults].sort((a, b) => new Date(b.date) - new Date(a.date));

  dom.progressLevelChip.textContent = `Level ${level}`;
  dom.progressTotalXp.textContent = state.xp;
  dom.ringPercent.textContent = `${progressPercent}%`;
  dom.progressRing.style.background = `
    radial-gradient(circle, var(--ring-center) 57%, transparent 58%),
    conic-gradient(var(--green) ${progressPercent * 3.6}deg, var(--ring-rest) 0deg)
  `;

  if (!sortedResults.length) {
    dom.quizHistoryList.innerHTML = `<p class="empty-state">Maak je eerste quiz om hier resultaten te zien.</p>`;
    return;
  }

  dom.quizHistoryList.innerHTML = sortedResults
    .slice(0, 5)
    .map((result) => {
      const date = new Intl.DateTimeFormat("nl-NL", {
        day: "2-digit",
        month: "short",
        hour: "2-digit",
        minute: "2-digit",
      }).format(new Date(result.date));

      return `
        <article class="history-item">
          <div>
            <strong>${result.score}/${result.total} goed</strong>
            <span>${escapeHtml(result.subjectLabel || "Quiz")} - ${escapeHtml(result.difficultyLabel || "Beginner")} - ${date}</span>
          </div>
          <span>+${result.xpEarned} XP</span>
        </article>
      `;
    })
    .join("");
}

function completeGoal(goalId) {
  const goal = state.goals.find((item) => item.id === goalId);
  if (!goal || goal.completed) return;

  goal.completed = true;
  goal.completedAt = new Date().toISOString();

  if (!goal.xpAwarded) {
    goal.xpAwarded = true;
    awardXp(GOAL_XP, "Doel voltooid");
    return;
  }

  saveState();
  render();
}

function createQuizSession() {
  return {
    subjectId: null,
    difficultyId: "beginner",
    questions: [],
    currentIndex: 0,
    selectedAnswer: null,
    answers: [],
    started: false,
    finished: false,
    xpGranted: false,
  };
}

function selectAnswer(answerIndex) {
  if (quizSession.selectedAnswer !== null || quizSession.finished) return;

  const currentQuestion = quizSession.questions[quizSession.currentIndex];
  const isCorrect = answerIndex === currentQuestion.correct;
  quizSession.selectedAnswer = answerIndex;
  quizSession.answers[quizSession.currentIndex] = isCorrect;

  dom.answerList.querySelectorAll(".answer-button").forEach((button) => {
    const buttonIndex = Number(button.dataset.answerIndex);
    button.disabled = true;
    button.classList.toggle("correct", buttonIndex === currentQuestion.correct);
    button.classList.toggle("wrong", buttonIndex === answerIndex && !isCorrect);
  });

  dom.quizFeedback.textContent = isCorrect
    ? "Goed antwoord."
    : `Nog niet. Het juiste antwoord is: ${currentQuestion.answers[currentQuestion.correct]}.`;
  dom.quizFeedback.className = `feedback ${isCorrect ? "good" : "bad"}`;
  dom.nextQuestionButton.disabled = false;
}

function goToNextQuestion() {
  if (quizSession.selectedAnswer === null) return;

  if (quizSession.currentIndex < quizSession.questions.length - 1) {
    quizSession.currentIndex += 1;
    quizSession.selectedAnswer = null;
    renderQuiz();
    return;
  }

  finishQuiz();
}

function finishQuiz() {
  if (quizSession.xpGranted) return;

  const score = quizSession.answers.filter(Boolean).length;
  const difficulty = getDifficultyById(quizSession.difficultyId);
  const subject = getSubjectById(quizSession.subjectId);
  const xpEarned = score * difficulty.xpPerCorrect;
  quizSession.finished = true;
  quizSession.xpGranted = true;

  state.quizResults.push({
    id: crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-quiz`,
    subjectId: subject.id,
    subjectLabel: subject.label,
    difficultyId: difficulty.id,
    difficultyLabel: difficulty.label,
    score,
    total: quizSession.questions.length,
    xpEarned,
    date: new Date().toISOString(),
  });

  const progressKey = getQuizProgressKey(subject.id, difficulty.id);
  state.quizProgress[progressKey] = Math.max(Number(state.quizProgress[progressKey]) || 0, score);

  if (state.quizResults.length > 20) {
    state.quizResults = state.quizResults.slice(-20);
  }

  saveState();
  if (xpEarned > 0) {
    awardXp(xpEarned, "Quiz afgerond");
  } else {
    render();
  }
  renderQuiz();
}

function startQuiz(subjectId = quizSession.subjectId, difficultyId = quizSession.difficultyId) {
  const subject = getSubjectById(subjectId);
  const difficulty = getDifficultyById(difficultyId);

  if (!isDifficultyUnlocked(subject.id, difficulty.id)) {
    showToast(getDifficultyRequirementText(subject.id, difficulty));
    return;
  }

  const questions = getQuizQuestions(subject.id, difficulty.id);
  if (questions.length < QUIZ_QUESTION_COUNT) {
    showToast("Voor deze keuze zijn nog geen vragen beschikbaar.");
    return;
  }

  quizSession = {
    ...quizSession,
    subjectId: subject.id,
    difficultyId: difficulty.id,
    questions,
    currentIndex: 0,
    selectedAnswer: null,
    answers: [],
    started: true,
    finished: false,
    xpGranted: false,
  };
  renderQuiz();
}

function resetQuiz() {
  if (!quizSession.started && !quizSession.finished) {
    renderQuiz();
    return;
  }

  startQuiz();
}

function showQuizSetup() {
  quizSession = {
    ...createQuizSession(),
    subjectId: quizSession.subjectId,
    difficultyId: quizSession.difficultyId,
  };
  renderQuiz();
}

function showToast(message) {
  window.clearTimeout(toastTimer);
  dom.toast.textContent = message;
  dom.toast.classList.add("show");
  toastTimer = window.setTimeout(() => {
    dom.toast.classList.remove("show");
  }, 2600);
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (character) => {
    const entities = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;",
    };
    return entities[character];
  });
}

function resetDemo() {
  state = createInitialState();
  quizSession = createQuizSession();
  saveState();
  render();
  renderQuiz();
  closeSettings();
  showToast("Demo is opnieuw gestart.");
}

dom.tabButtons.forEach((button) => {
  button.addEventListener("click", () => setView(button.dataset.view));
});

dom.quickViewButtons.forEach((button) => {
  button.addEventListener("click", () => setView(button.dataset.goView));
});

dom.goalForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const title = dom.goalInput.value.trim();
  if (!title) return;

  state.goals.unshift({
    id: crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-goal`,
    title,
    completed: false,
    xpAwarded: false,
    createdAt: new Date().toISOString(),
    completedAt: null,
  });

  dom.goalInput.value = "";
  saveState();
  renderGoals();
  showToast("Doel toegevoegd.");
});

dom.goalList.addEventListener("click", (event) => {
  const completeButton = event.target.closest("[data-complete-goal]");
  if (!completeButton) return;
  completeGoal(completeButton.dataset.completeGoal);
});

dom.homeGoalList.addEventListener("click", (event) => {
  const completeButton = event.target.closest("[data-complete-goal]");
  if (!completeButton) return;
  completeGoal(completeButton.dataset.completeGoal);
});

dom.quizSetupCard.addEventListener("click", (event) => {
  const backButton = event.target.closest("[data-back-to-subjects]");
  if (backButton) {
    quizSession.subjectId = null;
    quizSession.difficultyId = "beginner";
    renderQuizSetup();
    return;
  }

  const subjectButton = event.target.closest("[data-select-subject]");
  if (subjectButton) {
    quizSession.subjectId = getSubjectById(subjectButton.dataset.selectSubject).id;
    renderQuizSetup();
    return;
  }

  const startButton = event.target.closest("[data-start-subject][data-start-difficulty]");
  if (!startButton) return;
  startQuiz(startButton.dataset.startSubject, startButton.dataset.startDifficulty);
});

dom.answerList.addEventListener("click", (event) => {
  const answerButton = event.target.closest("[data-answer-index]");
  if (!answerButton) return;
  selectAnswer(Number(answerButton.dataset.answerIndex));
});

dom.nextQuestionButton.addEventListener("click", goToNextQuestion);
dom.restartQuizButton.addEventListener("click", resetQuiz);
dom.newQuizButton.addEventListener("click", resetQuiz);
dom.changeQuizButton.addEventListener("click", showQuizSetup);
dom.settingsButton.addEventListener("click", openSettings);
dom.closeSettingsButton.addEventListener("click", closeSettings);
dom.darkModeToggle.addEventListener("change", (event) => setDarkMode(event.target.checked));
dom.settingsOverlay.addEventListener("click", (event) => {
  if (event.target === dom.settingsOverlay) closeSettings();
});
dom.resetDemoButton.addEventListener("click", resetDemo);

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !dom.settingsOverlay.classList.contains("hidden")) {
    closeSettings();
  }
});

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("service-worker.js").catch(() => {
      // The app still works fully without offline caching.
    });
  });
}

render();
renderQuiz();
