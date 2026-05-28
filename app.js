const STORAGE_KEY = "deenquest-state-v1";
const THEME_KEY = "deenquest-theme";
const GOAL_XP = 5;
const QUIZ_COMPLETION_XP = 15;
const XP_PER_LEVEL = 100;
const QUIZ_QUESTION_COUNT = 10;
const QUIZ_PASS_SCORE = 6;
const MAX_HEARTS = 3;
const MIN_HEARTS = 0;
const HEART_REWARD_AMOUNT = 1;
const RECENT_QUIZ_QUESTION_LIMIT = 60;
const DAILY_CHALLENGE_FIXED_ID = "first-goal";
const DAILY_CHALLENGE_ROTATING_COUNT = 5;

const badgeCatalog = [
  {
    id: "goal-starter",
    title: "Doelstarter",
    description: "Je hebt je eerste persoonlijke doel afgerond.",
    mark: "DS",
  },
  {
    id: "quiz-starter",
    title: "Quizstarter",
    description: "Je hebt je eerste quizronde afgemaakt.",
    mark: "QS",
  },
  {
    id: "kenniszoeker",
    title: "Kenniszoeker",
    description: "Je haalde minimaal 6 van de 10 goed.",
    mark: "KZ",
  },
  {
    id: "doorzetter",
    title: "Doorzetter",
    description: "Je rondde drie persoonlijke doelen af.",
    mark: "DZ",
  },
  {
    id: "ronde-maker",
    title: "Rondemaker",
    description: "Je maakte drie quizrondes af.",
    mark: "RM",
  },
  {
    id: "perfecte-ronde",
    title: "Perfecte ronde",
    description: "Je haalde een quiz met alles goed.",
    mark: "PR",
  },
];

const challengeCatalog = [
  {
    id: "first-goal",
    title: "Dagdoel",
    description: "Voltooi vandaag 1 persoonlijk doel.",
    xp: 20,
    target: 1,
    badgeId: "goal-starter",
    progressText: (value, target) => `${value}/${target} doel`,
    getProgress: () => getTodaysCompletedGoalCount(),
  },
  {
    id: "first-quiz",
    title: "Quiz van vandaag",
    description: "Maak vandaag 1 quiz helemaal af.",
    xp: 20,
    target: 1,
    badgeId: "quiz-starter",
    progressText: (value, target) => `${value}/${target} quiz`,
    getProgress: () => getTodaysFinishedQuizCount(),
  },
  {
    id: "pass-quiz",
    title: "Goede ronde",
    description: "Haal vandaag minimaal 6 van de 10 goed.",
    xp: 30,
    target: 1,
    badgeId: "kenniszoeker",
    progressText: (value, target) => `${value}/${target} gehaald`,
    getProgress: () => getTodaysPassedQuizCount(),
  },
  {
    id: "three-goals",
    title: "Focusmoment",
    description: "Voltooi vandaag 2 persoonlijke doelen.",
    xp: 35,
    target: 2,
    badgeId: "doorzetter",
    progressText: (value, target) => `${value}/${target} doelen`,
    getProgress: () => getTodaysCompletedGoalCount(),
  },
  {
    id: "three-quizzes",
    title: "Quizritme",
    description: "Maak vandaag 2 quizrondes af.",
    xp: 40,
    target: 2,
    badgeId: "ronde-maker",
    progressText: (value, target) => `${value}/${target} quizzen`,
    getProgress: () => getTodaysFinishedQuizCount(),
  },
  {
    id: "perfect-quiz",
    title: "Perfect vandaag",
    description: "Haal vandaag een quizronde met 10 van de 10 goed.",
    xp: 50,
    target: 1,
    badgeId: "perfecte-ronde",
    progressText: (value, target) => `${value}/${target} perfect`,
    getProgress: () => getTodaysPerfectQuizCount(),
  },
  {
    id: "goal-trio",
    title: "Doelritme",
    description: "Voltooi vandaag 3 persoonlijke doelen.",
    xp: 45,
    target: 3,
    badgeId: "doorzetter",
    progressText: (value, target) => `${value}/${target} doelen`,
    getProgress: () => getTodaysCompletedGoalCount(),
  },
  {
    id: "quiz-trio",
    title: "Kennisritme",
    description: "Maak vandaag 3 quizrondes af.",
    xp: 50,
    target: 3,
    badgeId: "ronde-maker",
    progressText: (value, target) => `${value}/${target} quizzen`,
    getProgress: () => getTodaysFinishedQuizCount(),
  },
  {
    id: "double-pass",
    title: "Sterke kennisdag",
    description: "Haal vandaag 2 quizrondes met minimaal 6 van de 10 goed.",
    xp: 45,
    target: 2,
    badgeId: "kenniszoeker",
    progressText: (value, target) => `${value}/${target} gehaald`,
    getProgress: () => getTodaysPassedQuizCount(),
  },
  {
    id: "mixed-round",
    title: "Gemengde ronde",
    description: "Maak vandaag 1 quizronde met gemengde vragen.",
    xp: 30,
    target: 1,
    badgeId: "ronde-maker",
    progressText: (value, target) => `${value}/${target} ronde`,
    getProgress: () => getTodaysQuizSubjectCount("mixed"),
  },
  {
    id: "fifteen-correct",
    title: "Vijftien goede antwoorden",
    description: "Geef vandaag 15 goede quizantwoorden.",
    xp: 40,
    target: 15,
    badgeId: "kenniszoeker",
    progressText: (value, target) => `${value}/${target} goed`,
    getProgress: () => getTodaysCorrectAnswerCount(),
  },
  {
    id: "twenty-answered",
    title: "Twintig vragen geoefend",
    description: "Beantwoord vandaag 20 quizvragen.",
    xp: 35,
    target: 20,
    badgeId: "ronde-maker",
    progressText: (value, target) => `${value}/${target} vragen`,
    getProgress: () => getTodaysAnsweredQuestionCount(),
  },
  {
    id: "two-subjects",
    title: "Breed oefenen",
    description: "Maak vandaag quizzen over 2 verschillende onderwerpen.",
    xp: 35,
    target: 2,
    badgeId: "ronde-maker",
    progressText: (value, target) => `${value}/${target} onderwerpen`,
    getProgress: () => getTodaysUniqueQuizSubjectCount(),
  },
  {
    id: "two-difficulties",
    title: "Stap omhoog",
    description: "Maak vandaag quizzen op 2 verschillende niveaus.",
    xp: 35,
    target: 2,
    badgeId: "ronde-maker",
    progressText: (value, target) => `${value}/${target} niveaus`,
    getProgress: () => getTodaysUniqueQuizDifficultyCount(),
  },
  {
    id: "best-eight",
    title: "Acht goed",
    description: "Haal vandaag minimaal 8 van de 10 goed in een quizronde.",
    xp: 40,
    target: 8,
    badgeId: "kenniszoeker",
    progressText: (value, target) => `${value}/${target} goed`,
    getProgress: () => getTodaysBestQuizScore(),
  },
];

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
  },
  {
    id: "advanced",
    label: "Gevorderd",
    description: "Meer details en begrippen.",
  },
  {
    id: "expert",
    label: "Expert",
    description: "Voor wie de basis sterk beheerst.",
  },
];

const quizTheoryBank = {
  basis: {
    beginner: {
      title: "Basiskennis: startpunten",
      intro:
        "Deze quiz gaat over kernbegrippen die vaak terugkomen in het dagelijks leren: de vijf zuilen, Ramadan, dua en simpele woorden van dankbaarheid.",
      points: [
        "De Islam heeft vijf zuilen: shahada, gebed, zakat, vasten in Ramadan en hajj.",
        "Shahada is de geloofsgetuigenis en wordt vaak als eerste zuil genoemd.",
        "Dua betekent smeekbede; daarmee vraag je Allah om hulp, leiding of vergeving.",
        "Halal betekent toegestaan, terwijl haram verboden betekent.",
      ],
      terms: [
        ["Bismillah", "In naam van Allah."],
        ["Alhamdulillah", "Alle lof is aan Allah."],
        ["Zakat", "Liefdadigheid die bij de vijf zuilen hoort."],
      ],
    },
    advanced: {
      title: "Basiskennis: begrippen",
      intro:
        "Hier oefen je met woorden die je helpen begrijpen hoe moslims leren, handelen en hun intentie zuiver houden.",
      points: [
        "Sunnah is het voorbeeld van de Profeet Muhammad.",
        "Een hadith is een overlevering over woorden, daden of goedkeuringen van de Profeet.",
        "Niyyah betekent intentie; bij goede daden telt waarom je iets doet.",
        "Tawhid betekent Allah als de Ene aanbidden en niets met Hem vereenzelvigen.",
      ],
      terms: [
        ["Sabr", "Geduld."],
        ["Ummah", "De gemeenschap."],
        ["Shukr", "Dankbaarheid."],
      ],
    },
    expert: {
      title: "Basiskennis: verdieping",
      intro:
        "Deze ronde gebruikt verdiepende begrippen rond geloof, karakter en vertrouwen op Allah na eigen inspanning.",
      points: [
        "Ihsan is aanbidden alsof je Allah ziet; ook al zie jij Hem niet, Hij ziet jou.",
        "Taqwa betekent bewustzijn van Allah en voorzichtig zijn met je keuzes.",
        "Tawakkul is vertrouwen op Allah nadat je doet wat binnen jouw vermogen ligt.",
        "Fiqh gaat over begrip van islamitische regels; aqidah gaat over geloofsleer.",
      ],
      terms: [
        ["Tawbah", "Berouw tonen en terugkeren naar Allah."],
        ["Ikhlas", "Oprechtheid."],
        ["Adab", "Goede manieren."],
      ],
    },
  },
  gebed: {
    beginner: {
      title: "Gebed: basis",
      intro:
        "Deze quiz gaat over de verplichte gebeden, voorbereiding en herkenbare woorden rond het gebed.",
      points: [
        "Er zijn vijf verplichte gebeden per dag: Fajr, Dhuhr, Asr, Maghrib en Isha.",
        "Fajr is rond de dageraad en Maghrib is na zonsondergang.",
        "Voor het gebed verricht je wudhu als je geen wudhu hebt.",
        "Tijdens het gebed richt je je naar de qiblah.",
      ],
      terms: [
        ["Adhan", "De oproep tot gebed."],
        ["Takbir", "Allahu Akbar zeggen."],
        ["Qiblah", "De gebedsrichting."],
      ],
    },
    advanced: {
      title: "Gebed: houdingen",
      intro:
        "In deze ronde herken je de volgorde, houdingen en afsluiting van het gebed.",
      points: [
        "Qiyam is staan in het gebed.",
        "Ruku is de buiging en sujud is de neerknieling.",
        "Na ruku kom je weer rechtop voordat je naar sujud gaat.",
        "Het gebed sluit je af met salam; aan het einde zit je voor de tashahhud.",
      ],
      terms: [
        ["Imam", "Degene die voorgaat in het gebed."],
        ["Tashahhud", "Het zitten met de geloofsgetuigenis aan het einde."],
        ["Sujud", "Neerknielen."],
      ],
    },
    expert: {
      title: "Gebed: verdieping",
      intro:
        "Deze quiz vraagt om meer detail over concentratie, extra gebeden en bijzondere situaties in het gebed.",
      points: [
        "Al-Fatiha wordt in elke rak'ah gelezen.",
        "Khushu' betekent rustige concentratie en aanwezigheid in het gebed.",
        "Bij het opkomen uit ruku zeg je: Sami'a Allahu liman hamidah.",
        "Sujud as-sahw is een neerknieling bij vergeetachtigheid.",
      ],
      terms: [
        ["Jama'ah", "Gezamenlijk gebed."],
        ["Witr", "Gebed na Isha en voor Fajr."],
        ["Iqamah", "Aankondiging dat het gebed begint."],
      ],
    },
  },
  quran: {
    beginner: {
      title: "Qur'an: basis",
      intro:
        "Deze quiz gaat over hoe de Qur'an is opgebouwd, in welke taal hij werd geopenbaard en welke surahs je vaak tegenkomt.",
      points: [
        "De Qur'an werd in het Arabisch geopenbaard.",
        "De Qur'an heeft 114 surahs.",
        "Al-Fatiha wordt in elke rak'ah van het gebed gelezen.",
        "Een ayah is een vers en reciteren betekent de Qur'an mooi en zorgvuldig lezen.",
      ],
      terms: [
        ["Jibril", "De engel die de openbaring bracht."],
        ["Al-Ikhlas", "Surah die begint met Qul huwa Allahu ahad."],
        ["Mushaf", "De Qur'an als geschreven boek."],
      ],
    },
    advanced: {
      title: "Qur'an: kennis",
      intro:
        "Hier oefen je met openbaring, bekende surahs en begrippen rond uitleg en recitatie.",
      points: [
        "Al-Baqarah is de langste surah in de Qur'an.",
        "De eerste openbaring begon met Iqra in de grot Hira.",
        "Al-Ikhlas benadrukt kort en krachtig tawhid.",
        "Tajwid zijn regels voor Qur'an-recitatie; tafsir is uitleg van de Qur'an.",
      ],
      terms: [
        ["Makki", "Meestal uit de Mekkaanse periode."],
        ["Madani", "Meestal uit de Medinese periode."],
        ["Hafiz", "Iemand die de Qur'an heeft gememoriseerd."],
      ],
    },
    expert: {
      title: "Qur'an: verdieping",
      intro:
        "Deze ronde gebruikt preciezere termen over indeling, overlevering, recitatiestijlen en bekende plaatsen in de Qur'an.",
      points: [
        "Ayat al-Kursi staat in Al-Baqarah 2:255.",
        "De Qur'an wordt vaak verdeeld in 30 juz.",
        "Surah Yasin staat bekend als het hart van de Qur'an.",
        "At-Tawbah begint in de mushaf niet met Bismillah.",
      ],
      terms: [
        ["Sabab an-nuzul", "Aanleiding van openbaring."],
        ["Mutawatir", "Breed en sterk overgeleverd."],
        ["Waqf", "Pauzeren of stoppen in tajwid."],
      ],
    },
  },
  profeten: {
    beginner: {
      title: "Profeten: basisverhalen",
      intro:
        "Deze quiz gaat over bekende profeten en herkenbare gebeurtenissen uit hun verhalen.",
      points: [
        "Nuh bouwde de ark op bevel van Allah.",
        "Muhammad is de laatste profeet in de Islam.",
        "Ibrahim wordt sterk verbonden met de Ka'bah.",
        "Yunus werd opgeslokt door een grote vis.",
      ],
      terms: [
        ["Musa", "Sprak met Allah."],
        ["Isa", "Zoon van Maryam en geboren zonder vader."],
        ["Dawud", "Kreeg de Zabur."],
      ],
    },
    advanced: {
      title: "Profeten: lessen",
      intro:
        "Hier herken je profeten aan hun volk, familie, beproevingen en bijzondere gaven.",
      points: [
        "Musa werd gered toen de zee spleet.",
        "Yusuf staat bekend om zijn droom, beproevingen in Egypte en het uitleggen van dromen.",
        "Salih werd naar Thamud gestuurd en Hud naar het volk Ad.",
        "Sulayman stond bekend om wijsheid en koningschap.",
      ],
      terms: [
        ["Harun", "Broer van Musa."],
        ["Ibrahim", "Werd beproefd met het offer."],
        ["Maryam", "Moeder van Isa."],
      ],
    },
    expert: {
      title: "Profeten: verdieping",
      intro:
        "Deze ronde vraagt om specifieke bijnamen, familiebanden en diepere herkenningspunten uit profetenverhalen.",
      points: [
        "Yunus wordt Dhun-Nun genoemd.",
        "Ibrahim was de vader van Ismail; Ismail is sterk verbonden met de Ka'bah.",
        "Ayyub staat bekend om grote sabr tijdens ziekte.",
        "Zakariya was de vader van Yahya.",
      ],
      terms: [
        ["Sulayman", "Begreep de taal van vogels."],
        ["Yusuf", "Werd door zijn broers in een put gegooid."],
        ["Dawud", "Werd koning na Talut."],
      ],
    },
  },
  namen: {
    beginner: {
      title: "Namen van Allah: basis",
      intro:
        "Deze quiz helpt je bekende Namen van Allah herkennen en koppelen aan hun betekenis.",
      points: [
        "Ar-Rahman betekent De Meest Barmhartige.",
        "Al-Alim betekent De Alwetende.",
        "Al-Malik betekent De Koning.",
        "Ar-Razzaq betekent De Voorziener.",
      ],
      terms: [
        ["Al-Wadud", "De Liefdevolle."],
        ["As-Sami", "De Alhorende."],
        ["Al-Basir", "De Alziende."],
      ],
    },
    advanced: {
      title: "Namen van Allah: betekenis",
      intro:
        "Hier oefen je met Namen die eigenschappen als scheppen, vergeven, vrede, bescherming en rechtvaardigheid laten zien.",
      points: [
        "Al-Khaliq betekent De Schepper.",
        "Al-Ghaffar betekent De Vergever.",
        "As-Salam betekent De Bron van vrede.",
        "Al-Qayyum betekent De Zelfbestaande Onderhouder.",
      ],
      terms: [
        ["Al-Fattah", "De Openaar."],
        ["Al-Hafiz", "De Beschermer."],
        ["Al-Karim", "De Edelmoedige."],
      ],
    },
    expert: {
      title: "Namen van Allah: verdieping",
      intro:
        "Deze ronde gaat over Namen die subtiele, wijze en allesomvattende eigenschappen van Allah aanduiden.",
      points: [
        "Al-Latif betekent De Zachtmoedige Subtiele.",
        "Al-Hakeem betekent De Alwijze.",
        "Al-Quddus betekent De Heilige.",
        "Al-Awwal betekent De Eerste en Al-Akhir betekent De Laatste.",
      ],
      terms: [
        ["Al-Batin", "De Verborgene."],
        ["Al-Matin", "De Standvastige Sterke."],
        ["Al-Jami", "De Verzamelaar."],
      ],
    },
  },
};

const quizTheoryStudyAddOns = {
  basis: {
    beginner: {
      points: [
        "Leer de vijf zuilen in vaste volgorde: shahada, salah, zakat, sawm en hajj.",
        "Ramadan hoort bij sawm: moslims vasten deze maand van fajr tot zonsondergang.",
        "Vrijdag is belangrijk door Jumu'ah, het gezamenlijke vrijdaggebed.",
        "Bij basisvragen helpt het om eerst te herkennen of de vraag over geloof, aanbidding of gedrag gaat.",
      ],
      terms: [
        ["Salah", "Het gebed; een van de vijf zuilen."],
        ["Sawm", "Vasten, vooral bekend door Ramadan."],
        ["Hajj", "De bedevaart naar Mekka voor wie daartoe in staat is."],
        ["Dua", "Een persoonlijke smeekbede aan Allah."],
      ],
      checkpoints: [
        "Kun je de vijf zuilen hardop noemen zonder te spieken?",
        "Weet je het verschil tussen halal, haram en een verplicht onderdeel?",
        "Herken je korte woorden zoals Bismillah, Alhamdulillah en dua in een vraag?",
      ],
      examTips: [
        "Bij meerkeuzevragen staan vaak twee bekende woorden tussen de opties. Kies niet wat bekend klinkt, maar wat precies bij de omschrijving past.",
      ],
    },
    advanced: {
      points: [
        "Sunnah en hadith horen bij elkaar, maar zijn niet hetzelfde: sunnah is het voorbeeld, hadith is een overlevering.",
        "Een goede daad begint met niyyah. Dezelfde handeling kan anders wegen door de intentie erachter.",
        "Tawhid is de basis van geloof: Allah alleen aanbidden.",
        "Sabr is actief geduld: doorgaan met het goede en jezelf beheersen bij moeite.",
        "Shukr is dankbaarheid met hart, woorden en daden.",
      ],
      terms: [
        ["Hadith", "Een overlevering over de Profeet."],
        ["Sunnah", "Het voorbeeld en de weg van de Profeet."],
        ["Niyyah", "Intentie: waarom je iets doet."],
        ["Tawhid", "Allah als de Ene erkennen en aanbidden."],
      ],
      checkpoints: [
        "Kun je sunnah en hadith in eigen woorden uit elkaar houden?",
        "Kun je bij een voorbeeld herkennen of het over sabr, shukr of niyyah gaat?",
        "Weet je dat tawhid geen gedragsterm is, maar over aanbidding en geloof gaat?",
      ],
      examTips: [
        "Let op signaalwoorden: 'voorbeeld van de Profeet' wijst meestal naar sunnah, 'overlevering' naar hadith en 'waarom je iets doet' naar niyyah.",
      ],
    },
    expert: {
      points: [
        "Ihsan is het hoogste niveau in de bekende hadith van Jibril: aanbidden met diepe bewustheid van Allah.",
        "Taqwa betekent niet alleen angst, maar waakzaam leven met bewustzijn van Allah.",
        "Tawakkul is geen passief afwachten; je doet je best en vertrouwt daarna op Allah.",
        "Aqidah gaat over wat je gelooft. Fiqh gaat over hoe regels worden begrepen en toegepast.",
        "Ikhlas beschermt goede daden tegen showen of verkeerde bedoelingen.",
      ],
      terms: [
        ["Aqidah", "Geloofsleer: de basis van wat een moslim gelooft."],
        ["Fiqh", "Begrip van islamitische regels."],
        ["Rizq", "Voorziening die Allah geeft."],
        ["Tawbah", "Berouw tonen en terugkeren naar Allah."],
      ],
      checkpoints: [
        "Kun je ihsan, taqwa en tawakkul van elkaar onderscheiden?",
        "Herken je of een vraag over geloofsleer, regels of karakter gaat?",
        "Kun je uitleggen waarom tawakkul altijd samen kan gaan met inspanning?",
      ],
      examTips: [
        "Bij expertvragen lijken antwoorden vaak allemaal islamitisch. Zoek de kern van de definitie: geloofsleer, regels, karakter of vertrouwen.",
      ],
    },
  },
  gebed: {
    beginner: {
      points: [
        "De vijf verplichte gebeden vormen het dagritme: Fajr, Dhuhr, Asr, Maghrib en Isha.",
        "Fajr is voor zonsopkomst; Dhuhr rond de middag; Asr later op de dag; Maghrib na zonsondergang; Isha in de nacht.",
        "Wudhu is voorbereiding op het gebed en hoort bij reinheid.",
        "De plek van gebed hoort schoon te zijn.",
        "Allahu Akbar opent het gebed; de adhan roept mensen op tot het gebed.",
      ],
      terms: [
        ["Fajr", "Het gebed rond de dageraad."],
        ["Dhuhr", "Het middaggebed."],
        ["Maghrib", "Het gebed na zonsondergang."],
        ["Isha", "Het nachtgebed."],
      ],
      checkpoints: [
        "Kun je de vijf gebeden in volgorde zetten?",
        "Weet je welke woorden bij starten, oproepen en richten horen?",
        "Kun je uitleggen waarom wudhu voor het gebed belangrijk is?",
      ],
      examTips: [
        "Tijdwoorden helpen: 'dageraad' is Fajr, 'middag' is Dhuhr, 'zonsondergang' is Maghrib en 'nacht' is Isha.",
      ],
    },
    advanced: {
      points: [
        "De basisvolgorde is staan, reciteren, buigen, weer rechtop staan, neerknielen, zitten en opnieuw neerknielen.",
        "Qiyam is staan; ruku is buigen; sujud is neerknielen.",
        "Tashahhud hoort bij het zitten aan het einde van het gebed.",
        "Salam sluit het gebed af.",
        "Een imam gaat voor; de volgers bidden achter hem mee.",
      ],
      terms: [
        ["Qiyam", "Staan in het gebed."],
        ["Ruku", "Buiging."],
        ["Sujud", "Neerknieling."],
        ["Salam", "De afsluitende groet van het gebed."],
      ],
      checkpoints: [
        "Kun je ruku en sujud direct herkennen aan de houding?",
        "Weet je wat direct na ruku gebeurt?",
        "Weet je welke handeling de afsluiting is?",
      ],
      examTips: [
        "Maak in je hoofd een mini-filmpje van de gebedsvolgorde. Houdingsvragen worden dan veel makkelijker.",
      ],
    },
    expert: {
      points: [
        "Al-Fatiha wordt in elke rak'ah gelezen; dit is een vaak terugkerend kernpunt.",
        "Khushu' gaat over aandacht, nederigheid en concentratie in het gebed.",
        "Sami'a Allahu liman hamidah hoort bij het opkomen uit ruku.",
        "Sujud as-sahw is verbonden met vergeetachtigheid in het gebed.",
        "Jama'ah betekent samen bidden; Jumu'ah is het vrijdaggebed rond Dhuhr.",
        "Rawatib zijn sunnah-gebeden rond verplichte gebeden.",
      ],
      terms: [
        ["Rak'ah", "Een gebedseenheid met staan, buigen en neerknielen."],
        ["Khushu'", "Rustige concentratie en aanwezigheid in het gebed."],
        ["Sutrah", "Afscheiding voor iemand die bidt."],
        ["Rawatib", "Sunnah-gebeden rond verplichte gebeden."],
      ],
      checkpoints: [
        "Kun je Jumu'ah, jama'ah en witr uit elkaar houden?",
        "Weet je welke uitspraak bij welke houding hoort?",
        "Herken je wanneer een vraag over verplicht, sunnah of correctie gaat?",
      ],
      examTips: [
        "Expertvragen gebruiken vaak Arabische termen die op elkaar lijken. Koppel elk woord aan een concrete situatie in het gebed.",
      ],
    },
  },
  quran: {
    beginner: {
      points: [
        "De Qur'an is de belangrijkste bron voor moslims.",
        "De Qur'an werd in het Arabisch geopenbaard aan de Profeet Muhammad.",
        "Jibril bracht de openbaring.",
        "Een surah is een hoofdstuk; een ayah is een vers.",
        "Al-Fatiha is de eerste surah in de mushaf en wordt in elke rak'ah gelezen.",
      ],
      terms: [
        ["Surah", "Een hoofdstuk van de Qur'an."],
        ["Ayah", "Een vers van de Qur'an."],
        ["Reciteren", "De Qur'an mooi en zorgvuldig lezen."],
        ["Mushaf", "De geschreven Qur'an als boek."],
      ],
      checkpoints: [
        "Weet je het verschil tussen surah en ayah?",
        "Kun je Al-Fatiha, Al-Ikhlas en Qur'an herkennen aan korte omschrijvingen?",
        "Weet je wie de openbaring bracht?",
      ],
      examTips: [
        "Bij basisvragen over de Qur'an draait het vaak om indeling: taal, surah, ayah, aantal en eerste surah.",
      ],
    },
    advanced: {
      points: [
        "De eerste openbaring begon met Iqra in de grot Hira.",
        "Al-Baqarah is de langste surah; Al-Kawthar is de kortste surah.",
        "Al-Ikhlas vat tawhid kort en krachtig samen.",
        "Tajwid helpt bij correcte recitatie.",
        "Tafsir is uitleg van de betekenis van de Qur'an.",
        "Makki en Madani verwijzen meestal naar de periode van openbaring.",
      ],
      terms: [
        ["Iqra", "Lees/reciteer; verbonden met de eerste openbaring."],
        ["Tajwid", "Regels voor correcte recitatie."],
        ["Tafsir", "Uitleg van de Qur'an."],
        ["Makki/Madani", "Aanduiding van periode/context van openbaring."],
      ],
      checkpoints: [
        "Kun je langste, kortste en eerste surah uit elkaar houden?",
        "Weet je wat tajwid en tafsir betekenen?",
        "Herken je vragen over openbaringsplaats en openbaringsperiode?",
      ],
      examTips: [
        "Let op of de vraag vraagt naar recitatie of uitleg. Recitatie wijst naar tajwid; uitleg wijst naar tafsir.",
      ],
    },
    expert: {
      points: [
        "Ayat al-Kursi staat in Al-Baqarah 2:255.",
        "De Qur'an wordt vaak verdeeld in 30 juz om het lezen te plannen.",
        "Qira'ah betekent recitatiestijl.",
        "Waqf gaat over pauzeren of stoppen tijdens recitatie.",
        "Sabab an-nuzul gaat over de aanleiding van openbaring.",
        "Mutawatir betekent breed en sterk overgeleverd.",
      ],
      terms: [
        ["Juz", "Een van de 30 leesdelen van de Qur'an."],
        ["Qira'ah", "Een recitatiestijl."],
        ["Waqf", "Pauzeren of stoppen in recitatie."],
        ["At-Tawbah", "Surah die in de mushaf niet met Bismillah begint."],
      ],
      checkpoints: [
        "Weet je welke begrippen over indeling, recitatie en overlevering gaan?",
        "Kun je Ayat al-Kursi koppelen aan Al-Baqarah 2:255?",
        "Kun je At-Tawbah herkennen aan de Bismillah-vraag?",
      ],
      examTips: [
        "Bij expertvragen helpt sorteren: gaat de vraag over plaats in de Qur'an, leesindeling, recitatieregel of overlevering?",
      ],
    },
  },
  profeten: {
    beginner: {
      points: [
        "Profeten riepen hun volk op tot aanbidding van Allah en goed gedrag.",
        "Nuh bouwde de ark; Yunus werd opgeslokt door een grote vis.",
        "Musa sprak met Allah.",
        "Isa is de zoon van Maryam en werd zonder vader geboren.",
        "Muhammad is de laatste profeet in de Islam.",
      ],
      terms: [
        ["Nuh", "Verbonden met de ark."],
        ["Yunus", "Verbonden met de grote vis."],
        ["Maryam", "Moeder van Isa."],
        ["Zabur", "Openbaring die Dawud kreeg."],
      ],
      checkpoints: [
        "Kun je elke profeet koppelen aan een herkenbaar verhaal?",
        "Weet je wie de laatste profeet is?",
        "Weet je welke profeten met bekende openbaringen verbonden zijn?",
      ],
      examTips: [
        "Maak duo's: profeet plus herkenningswoord, zoals Nuh-ark, Musa-spreken, Yunus-vis en Isa-Maryam.",
      ],
    },
    advanced: {
      points: [
        "Musa werd met zijn volk gered toen de zee spleet.",
        "Yusuf werd beproefd, kwam in Egypte terecht en kon dromen uitleggen.",
        "Salih werd naar Thamud gestuurd; Hud naar Ad.",
        "Sulayman was profeet en koning en stond bekend om wijsheid.",
        "Ibrahim werd beproefd met het offer.",
        "Harun was de broer van Musa.",
      ],
      terms: [
        ["Thamud", "Volk waar Salih naar werd gestuurd."],
        ["Ad", "Volk waar Hud naar werd gestuurd."],
        ["Harun", "Broer van Musa."],
        ["Sulayman", "Bekend om wijsheid en koningschap."],
      ],
      checkpoints: [
        "Kun je volk en profeet aan elkaar koppelen?",
        "Kun je Yusuf herkennen aan dromen en Egypte?",
        "Weet je welke profeet bij wijsheid en koningschap hoort?",
      ],
      examTips: [
        "Bij verhalenvragen is de locatie of beproeving meestal de sleutel: zee, Egypte, offer, volk of koningschap.",
      ],
    },
    expert: {
      points: [
        "Dhun-Nun is een bijnaam van Yunus.",
        "Ibrahim was de vader van Ismail; Ismail is sterk verbonden met de Ka'bah.",
        "Ayyub staat bekend om sabr tijdens ziekte.",
        "Zakariya was de vader van Yahya.",
        "Sulayman begreep de taal van vogels.",
        "Yusuf werd door zijn broers in een put gegooid.",
      ],
      terms: [
        ["Dhun-Nun", "Bijnaam van Yunus."],
        ["Ismail", "Zoon van Ibrahim, verbonden met de Ka'bah."],
        ["Yahya", "Zoon van Zakariya."],
        ["Ayyub", "Bekend om geduld tijdens ziekte."],
      ],
      checkpoints: [
        "Kun je bijnamen, vaders en zonen uit elkaar houden?",
        "Herken je welke profeet bij ziekte, put, vuur of vogels hoort?",
        "Weet je welke details bij Ibrahim, Yusuf en Sulayman horen?",
      ],
      examTips: [
        "Expertvragen testen vaak details. Leer de namen als koppelingen: bijnaam, familieband, beproeving en gave.",
      ],
    },
  },
  namen: {
    beginner: {
      points: [
        "De Namen van Allah leren je Zijn eigenschappen beter herkennen.",
        "Ar-Rahman wijst op grote barmhartigheid.",
        "Al-Alim betekent dat Allah alles weet.",
        "Al-Malik betekent De Koning: macht en heerschappij behoren aan Allah.",
        "Ar-Razzaq betekent De Voorziener.",
      ],
      terms: [
        ["Ar-Rahman", "De Meest Barmhartige."],
        ["Al-Alim", "De Alwetende."],
        ["Al-Malik", "De Koning."],
        ["Ar-Razzaq", "De Voorziener."],
      ],
      checkpoints: [
        "Kun je de betekenis van elke naam in een kort Nederlands woord zeggen?",
        "Herken je of een vraag gaat over weten, horen, zien, liefde of voorziening?",
        "Kun je Al-Alim, As-Sami en Al-Basir uit elkaar houden?",
      ],
      examTips: [
        "Veel opties lijken positief. Koppel de Arabische naam aan precies een eigenschap: weten, horen, zien, geven of barmhartigheid.",
      ],
    },
    advanced: {
      points: [
        "Al-Khaliq betekent De Schepper.",
        "Al-Ghaffar wijst op Allahs vergeving.",
        "As-Salam betekent De Bron van vrede.",
        "Al-Qayyum betekent De Zelfbestaande Onderhouder.",
        "Al-Hafiz betekent De Beschermer.",
        "Al-Karim betekent De Edelmoedige.",
      ],
      terms: [
        ["Al-Khaliq", "De Schepper."],
        ["Al-Ghaffar", "De Vergever."],
        ["As-Salam", "De Bron van vrede."],
        ["Al-Mujib", "De Verhoorder."],
      ],
      checkpoints: [
        "Kun je scheppen, vergeven, beschermen en verhoren uit elkaar houden?",
        "Herken je namen die met zorg en onderhoud te maken hebben?",
        "Weet je dat As-Salam niet simpelweg 'groet' betekent, maar De Bron van vrede?",
      ],
      examTips: [
        "Vertaal niet alleen op klank. Vraag jezelf af welke eigenschap de omschrijving noemt.",
      ],
    },
    expert: {
      points: [
        "Al-Latif wijst op subtiele, zachte zorg van Allah.",
        "Al-Hakeem betekent De Alwijze.",
        "Al-Quddus betekent De Heilige.",
        "Al-Awwal en Al-Akhir vormen een betekenis-paar: De Eerste en De Laatste.",
        "Az-Zahir en Al-Batin vormen ook een paar: De Openlijke en De Verborgene.",
        "Al-Jami betekent De Verzamelaar.",
      ],
      terms: [
        ["Al-Latif", "De Zachtmoedige Subtiele."],
        ["Al-Hakeem", "De Alwijze."],
        ["Al-Quddus", "De Heilige."],
        ["Al-Warith", "De Erfgenaam."],
      ],
      checkpoints: [
        "Kun je betekenis-paren herkennen zoals Eerste/Laatste en Openlijke/Verborgene?",
        "Weet je welke Namen wijsheid, heiligheid, kracht en verzamelen aanduiden?",
        "Kun je subtiel verschil zien tussen Al-Latif, Al-Hakeem en Al-Quddus?",
      ],
      examTips: [
        "Bij expertvragen over Namen werken paren goed als geheugensteun. Leer namen die logisch tegenover of naast elkaar staan samen.",
      ],
    },
  },
};

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
  progressTabButton: document.querySelector('[data-view="progress"]'),
  quickViewButtons: document.querySelectorAll("[data-go-view]"),
  toast: document.querySelector("#toast"),
  settingsButton: document.querySelector("#settingsButton"),
  closeSettingsButton: document.querySelector("#closeSettingsButton"),
  settingsOverlay: document.querySelector("#settingsOverlay"),
  darkModeToggle: document.querySelector("#darkModeToggle"),
  resetProgressButton: document.querySelector("#resetProgressButton"),
  shareAppButton: document.querySelector("#shareAppButton"),
  resetConfirm: document.querySelector("#resetConfirm"),
  cancelResetButton: document.querySelector("#cancelResetButton"),
  confirmResetButton: document.querySelector("#confirmResetButton"),
  challengeCelebrationOverlay: document.querySelector("#challengeCelebrationOverlay"),
  closeChallengeCelebrationButton: document.querySelector("#closeChallengeCelebrationButton"),
  continueChallengeCelebrationButton: document.querySelector("#continueChallengeCelebrationButton"),
  challengeCelebrationMark: document.querySelector("#challengeCelebrationMark"),
  challengeCelebrationTitle: document.querySelector("#challengeCelebrationTitle"),
  challengeCelebrationMessage: document.querySelector("#challengeCelebrationMessage"),
  challengeCelebrationReward: document.querySelector("#challengeCelebrationReward"),
  challengeCelebrationBadge: document.querySelector("#challengeCelebrationBadge"),
  homeHeartChip: document.querySelector("#homeHeartChip"),
  homeHeartCount: document.querySelector("#homeHeartCount"),
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
  quizHeartChip: document.querySelector("#quizHeartChip"),
  quizHeartCount: document.querySelector("#quizHeartCount"),
  quizXpChip: document.querySelector("#quizXpChip"),
  quizSetupCard: document.querySelector("#quizSetupCard"),
  quizRouteList: document.querySelector("#quizRouteList"),
  quizLockNote: document.querySelector("#quizLockNote"),
  quizCard: document.querySelector("#quizCard"),
  quizTopic: document.querySelector("#quizTopic"),
  quizStep: document.querySelector("#quizStep"),
  quizTheoryPanel: document.querySelector("#quizTheoryPanel"),
  questionText: document.querySelector("#questionText"),
  answerList: document.querySelector("#answerList"),
  quizFeedback: document.querySelector("#quizFeedback"),
  nextQuestionButton: document.querySelector("#nextQuestionButton"),
  stopQuizButton: document.querySelector("#stopQuizButton"),
  restartQuizButton: document.querySelector("#restartQuizButton"),
  quizStopConfirm: document.querySelector("#quizStopConfirm"),
  cancelStopQuizButton: document.querySelector("#cancelStopQuizButton"),
  confirmStopQuizButton: document.querySelector("#confirmStopQuizButton"),
  quizResultCard: document.querySelector("#quizResultCard"),
  quizResultTitle: document.querySelector("#quizResultTitle"),
  quizResultText: document.querySelector("#quizResultText"),
  quizMistakeReview: document.querySelector("#quizMistakeReview"),
  newQuizButton: document.querySelector("#newQuizButton"),
  changeQuizButton: document.querySelector("#changeQuizButton"),
  progressLevelChip: document.querySelector("#progressLevelChip"),
  progressTotalXp: document.querySelector("#progressTotalXp"),
  progressRing: document.querySelector("#progressRing"),
  ringPercent: document.querySelector("#ringPercent"),
  badgeCount: document.querySelector("#badgeCount"),
  badgeList: document.querySelector("#badgeList"),
  dailyChallengeTimer: document.querySelector("#dailyChallengeTimer"),
  challengeList: document.querySelector("#challengeList"),
  quizHistoryList: document.querySelector("#quizHistoryList"),
};

let state = loadState();
let quizSession = createQuizSession();
let toastTimer;
let dailyChallengeTimer;
let activeDailyChallengeKey = getLocalDayKey();
let isDarkMode = localStorage.getItem(THEME_KEY) === "dark";

applyTheme();

function createInitialState() {
  return {
    xp: 0,
    hearts: MAX_HEARTS,
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
    recentQuizQuestionIds: [],
    challengeClaims: {},
    dailyChallengeClaims: {},
    dailyChallengeSelections: {},
    badges: {},
  };
}

function loadState() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return createInitialState();

    const parsed = JSON.parse(stored);
    return {
      xp: Number.isFinite(parsed.xp) ? parsed.xp : 0,
      hearts: normalizeHearts(parsed.hearts),
      goals: Array.isArray(parsed.goals) ? parsed.goals : createInitialState().goals,
      quizResults: Array.isArray(parsed.quizResults) ? parsed.quizResults : [],
      quizProgress: parsed.quizProgress && typeof parsed.quizProgress === "object" ? parsed.quizProgress : {},
      recentQuizQuestionIds: Array.isArray(parsed.recentQuizQuestionIds)
        ? parsed.recentQuizQuestionIds.filter((item) => typeof item === "string").slice(-RECENT_QUIZ_QUESTION_LIMIT)
        : [],
      challengeClaims: normalizeRecord(parsed.challengeClaims),
      dailyChallengeClaims:
        parsed.dailyChallengeClaims && typeof parsed.dailyChallengeClaims === "object"
          ? parsed.dailyChallengeClaims
          : {},
      dailyChallengeSelections: normalizeDailyChallengeSelections(parsed.dailyChallengeSelections),
      badges: normalizeRecord(parsed.badges),
    };
  } catch {
    return createInitialState();
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function normalizeRecord(value) {
  if (Array.isArray(value)) {
    return value.reduce((record, item) => {
      if (typeof item === "string") record[item] = new Date().toISOString();
      if (item && typeof item === "object" && typeof item.id === "string") {
        record[item.id] = item.earnedAt || item.claimedAt || new Date().toISOString();
      }
      return record;
    }, {});
  }

  return value && typeof value === "object" ? value : {};
}

function normalizeDailyChallengeSelections(value) {
  if (!value || typeof value !== "object" || Array.isArray(value)) return {};

  return Object.entries(value).reduce((record, [dayKey, selection]) => {
    if (typeof dayKey !== "string" || !Array.isArray(selection)) return record;

    const ids = selection.filter((id) => typeof id === "string");
    if (ids.length) record[dayKey] = ids;
    return record;
  }, {});
}

function normalizeHearts(value) {
  const hearts = Number(value);
  if (!Number.isFinite(hearts)) return MAX_HEARTS;

  return Math.min(MAX_HEARTS, Math.max(MIN_HEARTS, Math.trunc(hearts)));
}

function getHeartDisplay(value = state.hearts) {
  const hearts = normalizeHearts(value);
  return `${"❤️".repeat(hearts)}${"♡".repeat(MAX_HEARTS - hearts)}`;
}

function renderHearts() {
  const hearts = normalizeHearts(state.hearts);
  state.hearts = hearts;
  const label = `${hearts} van ${MAX_HEARTS} hartjes`;

  [dom.homeHeartCount, dom.quizHeartCount].forEach((heartCount) => {
    heartCount.textContent = getHeartDisplay(hearts);
  });

  [dom.homeHeartChip, dom.quizHeartChip].forEach((heartChip) => {
    heartChip.setAttribute("aria-label", label);
  });
}

function hasMissingHearts() {
  return normalizeHearts(state.hearts) < MAX_HEARTS;
}

function addHeart() {
  const currentHearts = normalizeHearts(state.hearts);
  state.hearts = Math.min(MAX_HEARTS, currentHearts + HEART_REWARD_AMOUNT);
  saveState();
  renderHearts();
  renderQuizSetup();
  renderChallenges();
  return state.hearts > currentHearts;
}

function loseHeart() {
  state.hearts = Math.max(MIN_HEARTS, normalizeHearts(state.hearts) - 1);
}

function getLocalDayKey(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function isToday(isoDate, dayKey = getLocalDayKey()) {
  return Boolean(isoDate) && getLocalDayKey(new Date(isoDate)) === dayKey;
}

function getDailyClaims(dayKey = getLocalDayKey()) {
  const claims = state.dailyChallengeClaims?.[dayKey];
  return claims && typeof claims === "object" ? claims : {};
}

function getChallengeById(challengeId) {
  return challengeCatalog.find((challenge) => challenge.id === challengeId);
}

function getRotatingDailyChallengeIds() {
  return challengeCatalog
    .map((challenge) => challenge.id)
    .filter((challengeId) => challengeId !== DAILY_CHALLENGE_FIXED_ID);
}

function getSelectedDailyChallengeIds(dayKey = getLocalDayKey()) {
  return ensureDailyChallengeSelection(dayKey);
}

function ensureDailyChallengeSelection(dayKey = getLocalDayKey()) {
  const rotatingIds = getRotatingDailyChallengeIds();
  const rotatingTarget = Math.min(DAILY_CHALLENGE_ROTATING_COUNT, rotatingIds.length);
  const targetCount = rotatingTarget + (getChallengeById(DAILY_CHALLENGE_FIXED_ID) ? 1 : 0);

  if (!state.dailyChallengeSelections || typeof state.dailyChallengeSelections !== "object") {
    state.dailyChallengeSelections = {};
  }

  const existingSelection = normalizeDailyChallengeIdList(state.dailyChallengeSelections[dayKey], rotatingTarget);
  if (existingSelection.length === targetCount) {
    if (!areStringListsEqual(existingSelection, state.dailyChallengeSelections[dayKey])) {
      state.dailyChallengeSelections[dayKey] = existingSelection;
      saveState();
    }
    return existingSelection;
  }

  const chosenRotatingIds = existingSelection.filter((challengeId) => challengeId !== DAILY_CHALLENGE_FIXED_ID);
  Object.keys(getDailyClaims(dayKey)).forEach((challengeId) => {
    if (
      challengeId !== DAILY_CHALLENGE_FIXED_ID &&
      rotatingIds.includes(challengeId) &&
      !chosenRotatingIds.includes(challengeId) &&
      chosenRotatingIds.length < rotatingTarget
    ) {
      chosenRotatingIds.push(challengeId);
    }
  });

  pickDailyChallengeIds(dayKey, rotatingTarget - chosenRotatingIds.length, chosenRotatingIds).forEach((challengeId) => {
    if (!chosenRotatingIds.includes(challengeId)) chosenRotatingIds.push(challengeId);
  });

  const selection = normalizeDailyChallengeIdList(
    [DAILY_CHALLENGE_FIXED_ID, ...chosenRotatingIds],
    rotatingTarget
  );
  state.dailyChallengeSelections[dayKey] = selection;
  saveState();
  return selection;
}

function normalizeDailyChallengeIdList(selection, rotatingTarget = DAILY_CHALLENGE_ROTATING_COUNT) {
  const selectedIds = [];
  const rotatingIds = getRotatingDailyChallengeIds();
  let rotatingSelectedCount = 0;

  if (getChallengeById(DAILY_CHALLENGE_FIXED_ID)) selectedIds.push(DAILY_CHALLENGE_FIXED_ID);
  if (!Array.isArray(selection)) return selectedIds;

  selection.forEach((challengeId) => {
    if (
      challengeId !== DAILY_CHALLENGE_FIXED_ID &&
      rotatingIds.includes(challengeId) &&
      !selectedIds.includes(challengeId) &&
      rotatingSelectedCount < rotatingTarget
    ) {
      selectedIds.push(challengeId);
      rotatingSelectedCount += 1;
    }
  });

  return selectedIds;
}

function pickDailyChallengeIds(dayKey, count, excludedIds = []) {
  if (count <= 0) return [];

  const excluded = new Set(excludedIds);
  const pool = getRotatingDailyChallengeIds().filter((challengeId) => !excluded.has(challengeId));
  const usedIds = getPreviouslyUsedDailyChallengeIds(dayKey);
  const selectedIds = shuffleStrings(pool.filter((challengeId) => !usedIds.has(challengeId))).slice(0, count);
  if (selectedIds.length >= count) return selectedIds;

  const previousIds = getMostRecentDailyChallengeIds(dayKey);
  const refillPool = pool.filter((challengeId) => !selectedIds.includes(challengeId) && !previousIds.has(challengeId));
  const fallbackPool = refillPool.length
    ? refillPool
    : pool.filter((challengeId) => !selectedIds.includes(challengeId));

  return [
    ...selectedIds,
    ...shuffleStrings(fallbackPool).slice(0, count - selectedIds.length),
  ];
}

function getPreviouslyUsedDailyChallengeIds(dayKey) {
  const usedIds = new Set();

  Object.entries(state.dailyChallengeSelections || {}).forEach(([selectionDay, selection]) => {
    if (selectionDay === dayKey || !Array.isArray(selection)) return;
    selection.forEach((challengeId) => addRotatingDailyChallengeId(usedIds, challengeId));
  });

  Object.entries(state.dailyChallengeClaims || {}).forEach(([claimDay, claims]) => {
    if (claimDay === dayKey || !claims || typeof claims !== "object") return;
    Object.keys(claims).forEach((challengeId) => addRotatingDailyChallengeId(usedIds, challengeId));
  });

  return usedIds;
}

function addRotatingDailyChallengeId(collection, challengeId) {
  if (challengeId !== DAILY_CHALLENGE_FIXED_ID && getRotatingDailyChallengeIds().includes(challengeId)) {
    collection.add(challengeId);
  }
}

function getMostRecentDailyChallengeIds(dayKey) {
  const previousDay = Object.keys(state.dailyChallengeSelections || {})
    .filter((selectionDay) => selectionDay !== dayKey)
    .sort()
    .pop();
  const selection = previousDay ? state.dailyChallengeSelections[previousDay] : [];
  return new Set(
    Array.isArray(selection)
      ? selection.filter((challengeId) => challengeId !== DAILY_CHALLENGE_FIXED_ID)
      : []
  );
}

function shuffleStrings(values) {
  const shuffled = [...values];

  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]];
  }

  return shuffled;
}

function areStringListsEqual(firstList, secondList) {
  return (
    Array.isArray(firstList) &&
    Array.isArray(secondList) &&
    firstList.length === secondList.length &&
    firstList.every((value, index) => value === secondList[index])
  );
}

function getNextDailyReset() {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
}

function formatTimeLeft(milliseconds) {
  const totalSeconds = Math.max(0, Math.floor(milliseconds / 1000));
  const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
  const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, "0");
  const seconds = String(totalSeconds % 60).padStart(2, "0");
  return `${hours}:${minutes}:${seconds}`;
}

function formatDateLabel(isoDate) {
  if (!isoDate) return "";

  return new Intl.DateTimeFormat("nl-NL", {
    day: "2-digit",
    month: "short",
  }).format(new Date(isoDate));
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
  renderHearts();
  renderDailyAyah();
  renderHomeGoals();
  renderGoals();
  renderChallenges();
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
  hideResetConfirm();
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
          <span class="goal-status">+${GOAL_XP} XP</span>
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
      const status = goal.completed ? "Voltooid" : `+${GOAL_XP} XP`;
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

function getTodaysCompletedGoalCount(dayKey = getLocalDayKey()) {
  return state.goals.filter((goal) => goal.completed && isToday(goal.completedAt, dayKey)).length;
}

function getTodaysFinishedQuizCount(dayKey = getLocalDayKey()) {
  return state.quizResults.filter((result) => isToday(result.date, dayKey)).length;
}

function getTodaysPassedQuizCount(dayKey = getLocalDayKey()) {
  return state.quizResults.filter(
    (result) =>
      isToday(result.date, dayKey) &&
      Number(result.score) >= QUIZ_PASS_SCORE &&
      Number(result.total) >= QUIZ_QUESTION_COUNT
  ).length;
}

function getTodaysPerfectQuizCount(dayKey = getLocalDayKey()) {
  return state.quizResults.filter(
    (result) =>
      isToday(result.date, dayKey) &&
      Number(result.total) > 0 &&
      Number(result.score) === Number(result.total)
  ).length;
}

function getTodaysCorrectAnswerCount(dayKey = getLocalDayKey()) {
  return state.quizResults
    .filter((result) => isToday(result.date, dayKey))
    .reduce((total, result) => total + Math.max(0, Number(result.score) || 0), 0);
}

function getTodaysAnsweredQuestionCount(dayKey = getLocalDayKey()) {
  return state.quizResults
    .filter((result) => isToday(result.date, dayKey))
    .reduce((total, result) => total + Math.max(0, Number(result.total) || 0), 0);
}

function getTodaysUniqueQuizSubjectCount(dayKey = getLocalDayKey()) {
  return new Set(
    state.quizResults
      .filter((result) => isToday(result.date, dayKey) && result.subjectId)
      .map((result) => result.subjectId)
  ).size;
}

function getTodaysQuizSubjectCount(subjectId, dayKey = getLocalDayKey()) {
  return state.quizResults.filter((result) => isToday(result.date, dayKey) && result.subjectId === subjectId).length;
}

function getTodaysUniqueQuizDifficultyCount(dayKey = getLocalDayKey()) {
  return new Set(
    state.quizResults
      .filter((result) => isToday(result.date, dayKey) && result.difficultyId)
      .map((result) => result.difficultyId)
  ).size;
}

function getTodaysBestQuizScore(dayKey = getLocalDayKey()) {
  return state.quizResults
    .filter((result) => isToday(result.date, dayKey))
    .reduce((bestScore, result) => Math.max(bestScore, Number(result.score) || 0), 0);
}

function getBadgeById(badgeId) {
  return badgeCatalog.find((badge) => badge.id === badgeId);
}

function getDailyBadgeEarnedAt(badgeId) {
  const challenge = challengeCatalog.find((item) => item.badgeId === badgeId);
  if (!challenge) return null;

  return Object.values(state.dailyChallengeClaims || {})
    .map((claims) => (claims && typeof claims === "object" ? claims[challenge.id] : null))
    .find(Boolean);
}

function getBadgeEarnedAt(badgeId) {
  const claimedChallenge = challengeCatalog.find(
    (challenge) => challenge.badgeId === badgeId && state.challengeClaims?.[challenge.id]
  );
  return (
    state.badges?.[badgeId] ||
    getDailyBadgeEarnedAt(badgeId) ||
    (claimedChallenge ? state.challengeClaims[claimedChallenge.id] : null)
  );
}

function getChallengeModels() {
  const dayKey = getLocalDayKey();
  const dailyClaims = getDailyClaims(dayKey);

  return getSelectedDailyChallengeIds(dayKey)
    .map((challengeId) => getChallengeById(challengeId))
    .filter(Boolean)
    .map((challenge) => {
      const value = challenge.getProgress();
      const displayValue = Math.min(value, challenge.target);
      const isClaimed = Boolean(dailyClaims[challenge.id]);
      const isReady = value >= challenge.target;
      const progressPercent = Math.min(100, Math.round((displayValue / challenge.target) * 100));

      return {
        ...challenge,
        badge: getBadgeById(challenge.badgeId),
        displayValue,
        isClaimed,
        isReady,
        progressPercent,
        progressLabel: challenge.progressText(displayValue, challenge.target),
      };
    });
}

function renderChallenges() {
  const challenges = getChallengeModels().sort((a, b) => {
    if (a.isClaimed !== b.isClaimed) return a.isClaimed ? 1 : -1;
    if (a.isReady !== b.isReady) return a.isReady ? -1 : 1;
    return b.progressPercent - a.progressPercent;
  });
  const claimableCount = challenges.filter((challenge) => challenge.isReady && !challenge.isClaimed).length;

  dom.challengeList.innerHTML = challenges.map((challenge) => renderChallengeItem(challenge)).join("");
  dom.progressTabButton.classList.toggle("has-alert", claimableCount > 0);
  dom.progressTabButton.setAttribute(
    "aria-label",
    claimableCount > 0 ? `Progressie, ${claimableCount} dagelijkse challenge te claimen` : "Progressie"
  );
  renderBadges();
}

function renderChallengeItem(challenge) {
  const statusLabel = challenge.isClaimed ? "Vandaag voltooid" : challenge.isReady ? "Klaar om te claimen" : "Nog bezig";
  const rewardType = getChallengeRewardType();
  const rewardLabel = challenge.isClaimed ? "Beloning geclaimd" : getChallengeRewardLabel(challenge, rewardType);
  const buttonLabel = challenge.isClaimed
    ? "Bekijk beloning"
    : challenge.isReady
      ? rewardType === "heart"
        ? "Claim hartje"
        : `Claim +${challenge.xp} XP`
      : "Nog bezig";
  const buttonAttributes = challenge.isClaimed
    ? `data-show-challenge-celebration="${challenge.id}"`
    : challenge.isReady
      ? `data-claim-challenge="${challenge.id}"`
      : "disabled";

  return `
    <article class="challenge-item ${challenge.isReady ? "ready" : ""} ${challenge.isClaimed ? "claimed" : ""}">
      <span class="challenge-mark ${challenge.isClaimed ? "earned" : ""}" aria-hidden="true">${escapeHtml(challenge.badge.mark)}</span>
      <div class="challenge-body">
        <div class="challenge-item-heading">
          <div>
            <strong>${escapeHtml(challenge.title)}</strong>
            <p>${escapeHtml(challenge.description)}</p>
          </div>
          <div class="challenge-meta">
            <span class="challenge-status">${statusLabel}</span>
            <span class="challenge-xp">${escapeHtml(rewardLabel)}</span>
          </div>
        </div>
        <div class="challenge-progress-row">
          <div class="challenge-progress-track" aria-hidden="true">
            <span class="challenge-progress-fill" style="width: ${challenge.progressPercent}%"></span>
          </div>
          <span>${escapeHtml(challenge.progressLabel)}</span>
        </div>
      </div>
      <button class="challenge-claim-button" type="button" ${buttonAttributes}>${buttonLabel}</button>
    </article>
  `;
}

function getChallengeRewardType() {
  return hasMissingHearts() ? "heart" : "xp";
}

function getChallengeRewardLabel(challenge, rewardType = getChallengeRewardType()) {
  return rewardType === "heart" ? `+${HEART_REWARD_AMOUNT} hartje` : `+${challenge.xp} XP`;
}

function renderBadges() {
  const earnedCount = badgeCatalog.filter((badge) => getBadgeEarnedAt(badge.id)).length;
  dom.badgeCount.textContent = `${earnedCount}/${badgeCatalog.length}`;

  dom.badgeList.innerHTML = badgeCatalog
    .map((badge) => {
      const earnedAt = getBadgeEarnedAt(badge.id);
      const earnedText = earnedAt ? `Behaald op ${formatDateLabel(earnedAt)}` : "Nog te behalen";
      return `
        <article class="badge-item ${earnedAt ? "earned" : ""}">
          <span class="badge-mark" aria-hidden="true">${escapeHtml(badge.mark)}</span>
          <div>
            <strong>${escapeHtml(badge.title)}</strong>
            <p>${escapeHtml(badge.description)}</p>
            <span>${escapeHtml(earnedText)}</span>
          </div>
        </article>
      `;
    })
    .join("");
}

function claimChallenge(challengeId) {
  const challenge = getChallengeModels().find((item) => item.id === challengeId);
  if (!challenge || !challenge.isReady || challenge.isClaimed) return;

  const claimedAt = new Date().toISOString();
  const dayKey = getLocalDayKey();
  if (!state.dailyChallengeClaims || typeof state.dailyChallengeClaims !== "object") state.dailyChallengeClaims = {};
  if (!state.dailyChallengeClaims[dayKey] || typeof state.dailyChallengeClaims[dayKey] !== "object") {
    state.dailyChallengeClaims[dayKey] = {};
  }
  if (!state.badges || typeof state.badges !== "object") state.badges = {};
  const isNewBadge = !state.badges[challenge.badgeId];
  const rewardType = getChallengeRewardType();
  state.dailyChallengeClaims[dayKey][challenge.id] = claimedAt;
  if (!state.badges[challenge.badgeId]) state.badges[challenge.badgeId] = claimedAt;
  const heartAdded = rewardType === "heart" ? addHeart() : false;

  if (rewardType === "xp") {
    awardXp(challenge.xp);
  }

  showChallengeCelebration(challenge, isNewBadge, rewardType, heartAdded);
}

function handleChallengeClick(event) {
  const showButton = event.target.closest("[data-show-challenge-celebration]");
  if (showButton) {
    const challenge = getChallengeModels().find((item) => item.id === showButton.dataset.showChallengeCelebration);
    if (challenge) showChallengeCelebration(challenge, false, "claimed");
    return;
  }

  const claimButton = event.target.closest("[data-claim-challenge]");
  if (!claimButton) return;
  claimChallenge(claimButton.dataset.claimChallenge);
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
  if (isDifficultyUnlocked(subjectId, difficulty.id)) return `${QUIZ_COMPLETION_XP} XP bij afronden`;

  const previousDifficulty = getPreviousDifficulty(difficulty.id);
  return `Haal 6/10 op ${previousDifficulty.label}`;
}

function getQuestionPool(subjectId, difficultyId) {
  return allQuizQuestions.filter((question) => {
    const matchesSubject = subjectId === "mixed" || question.subject === subjectId;
    return matchesSubject && question.difficulty === difficultyId;
  });
}

function getQuestionId(question) {
  return `${question.subject}:${question.difficulty}:${question.question}`;
}

function prepareQuizQuestion(question) {
  const shuffledAnswers = shuffleItems(
    question.answers.map((answer, index) => ({
      answer,
      isCorrect: index === question.correct,
    }))
  );

  return {
    ...question,
    id: getQuestionId(question),
    answers: shuffledAnswers.map((item) => item.answer),
    correct: shuffledAnswers.findIndex((item) => item.isCorrect),
  };
}

function getQuizQuestions(subjectId, difficultyId) {
  const pool = getQuestionPool(subjectId, difficultyId);
  const recentQuestionIds = new Set(state.recentQuizQuestionIds || []);
  const freshQuestions = shuffleItems(pool.filter((question) => !recentQuestionIds.has(getQuestionId(question))));
  const repeatQuestions = shuffleItems(pool.filter((question) => recentQuestionIds.has(getQuestionId(question))));

  return [...freshQuestions, ...repeatQuestions].slice(0, QUIZ_QUESTION_COUNT).map(prepareQuizQuestion);
}

function mergeQuizTheory(baseTheory, addOn = {}) {
  return {
    ...baseTheory,
    points: [...(baseTheory.points || []), ...(addOn.points || [])],
    terms: [...(baseTheory.terms || []), ...(addOn.terms || [])],
    checkpoints: [...(baseTheory.checkpoints || []), ...(addOn.checkpoints || [])],
    examTips: [...(baseTheory.examTips || []), ...(addOn.examTips || [])],
  };
}

function getQuizTheory(subjectId, difficultyId) {
  const difficulty = getDifficultyById(difficultyId);
  const subject = getSubjectById(subjectId);

  if (subject.id === "mixed") {
    return getMixedQuizTheory(difficulty.id);
  }

  const baseTheory =
    quizTheoryBank[subject.id]?.[difficulty.id] || {
      title: `${subject.label} - ${difficulty.label}`,
      intro: subject.description,
      points: [difficulty.description],
      terms: [],
    };
  const addOn = quizTheoryStudyAddOns[subject.id]?.[difficulty.id];

  return mergeQuizTheory(baseTheory, addOn);
}

function getMixedQuizTheory(difficultyId) {
  const difficulty = getDifficultyById(difficultyId);
  const subjectTheories = quizSubjects
    .filter((subject) => subject.id !== "mixed")
    .map((subject) => ({
      subject,
      theory: getQuizTheory(subject.id, difficulty.id),
    }));

  return {
    title: `Gemengd: ${difficulty.label}`,
    intro:
      "Deze quiz mixt onderwerpen. Lees per onderdeel het belangrijkste herkenningspunt, zodat je sneller ziet waar de vraag over gaat.",
    points: subjectTheories.flatMap(({ subject, theory }) =>
      theory.points.slice(0, 2).map((point) => `${subject.label}: ${point}`)
    ),
    terms: subjectTheories.map(({ subject, theory }) => {
      const [term, meaning] = theory.terms[0] || [subject.label, theory.intro];
      return [`${subject.label}: ${term}`, meaning];
    }),
    checkpoints: subjectTheories.map(
      ({ subject, theory }) => `${subject.label}: ${theory.checkpoints?.[0] || "Ken je de belangrijkste kernpunten?"}`
    ),
    examTips: [
      "Bij een gemengde quiz is het onderwerp herkennen stap 1. Bepaal eerst of de vraag gaat over basiskennis, gebed, Qur'an, profeten of Namen van Allah.",
    ],
  };
}

function renderTheoryStudySections(theory, options = {}) {
  const pointLimit = options.pointLimit || theory.points.length;
  const points = theory.points.slice(0, pointLimit);

  return `
    <ul class="quiz-theory-points">
      ${points.map((point) => `<li>${escapeHtml(point)}</li>`).join("")}
    </ul>
    ${
      theory.terms?.length
        ? `
          <dl class="quiz-theory-terms">
            ${theory.terms
              .map(
                ([term, meaning]) => `
                  <div>
                    <dt>${escapeHtml(term)}</dt>
                    <dd>${escapeHtml(meaning)}</dd>
                  </div>
                `
              )
              .join("")}
          </dl>
        `
        : ""
    }
    ${
      theory.checkpoints?.length
        ? `
          <div class="quiz-theory-study-block">
            <strong>Check jezelf</strong>
            <ul>
              ${theory.checkpoints.map((checkpoint) => `<li>${escapeHtml(checkpoint)}</li>`).join("")}
            </ul>
          </div>
        `
        : ""
    }
    ${
      theory.examTips?.length
        ? `
          <div class="quiz-theory-study-block quiz-theory-tip-block">
            <strong>Tentamen-tip</strong>
            <ul>
              ${theory.examTips.map((tip) => `<li>${escapeHtml(tip)}</li>`).join("")}
            </ul>
          </div>
        `
        : ""
    }
  `;
}

function renderQuizTheoryPreview(subjectId) {
  return `
    <section class="quiz-theory-preview" aria-label="Theorie per niveau">
      <div class="quiz-theory-preview-head">
        <div>
          <p class="eyebrow">Eerst inlezen</p>
          <h3>Theorie per quiz</h3>
        </div>
      </div>
      <div class="quiz-theory-accordion">
        ${quizDifficulties
          .map((difficulty) => {
            const theory = getQuizTheory(subjectId, difficulty.id);

            return `
              <details class="quiz-theory-details" ${difficulty.id === "beginner" ? "open" : ""}>
                <summary>
                  <span>${escapeHtml(difficulty.label)}</span>
                  <small>${escapeHtml(theory.title)}</small>
                </summary>
                <p>${escapeHtml(theory.intro)}</p>
                ${renderTheoryStudySections(theory)}
              </details>
            `;
          })
          .join("")}
      </div>
    </section>
  `;
}

function renderQuizTheoryPanel(subjectId, difficultyId) {
  const theory = getQuizTheory(subjectId, difficultyId);

  dom.quizTheoryPanel.innerHTML = `
    <div class="quiz-theory-title-row">
      <div>
        <p class="eyebrow">Theorie</p>
        <h3>${escapeHtml(theory.title)}</h3>
      </div>
      <span>Lees eerst</span>
    </div>
    <p class="quiz-theory-intro">${escapeHtml(theory.intro)}</p>
    ${renderTheoryStudySections(theory)}
  `;
}

function getQuestionExplanation(question) {
  if (question.explanation) return question.explanation;

  const correctAnswer = question.answers[question.correct];
  const subjectHints = {
    basis: "Dit is een basisbegrip dat vaak terugkomt in het dagelijks leren.",
    gebed: "Dit helpt je de volgorde en betekenis van het gebed beter herkennen.",
    quran: "Dit gaat over hoe de Qur'an is opgebouwd, gelezen of geopenbaard.",
    profeten: "Dit hoort bij het verhaal en de lessen van deze profeet.",
    namen: "Deze naam leert je een eigenschap van Allah herkennen.",
  };

  return `Het juiste antwoord is "${correctAnswer}". ${
    subjectHints[question.subject] || "Onthoud dit kernpunt voor de volgende ronde."
  }`;
}

function getAnswerFeedback(question, isCorrect) {
  const explanation = getQuestionExplanation(question);
  if (isCorrect) return `Goed antwoord. ${explanation}`;

  return explanation.startsWith("Het juiste antwoord")
    ? `Nog niet. ${explanation}`
    : `Nog niet. Het juiste antwoord is: ${question.answers[question.correct]}. ${explanation}`;
}

function rememberQuizQuestions(questions) {
  const recentIds = Array.isArray(state.recentQuizQuestionIds) ? [...state.recentQuizQuestionIds] : [];

  questions.forEach((question) => {
    const questionId = question.id || getQuestionId(question);
    const existingIndex = recentIds.indexOf(questionId);
    if (existingIndex !== -1) recentIds.splice(existingIndex, 1);
    recentIds.push(questionId);
  });

  state.recentQuizQuestionIds = recentIds.slice(-RECENT_QUIZ_QUESTION_LIMIT);
}

function shuffleItems(items) {
  return [...items]
    .map((item) => ({ item, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ item }) => item);
}

function renderQuizSetup() {
  const selectedSubjectId = quizSession.subjectId;
  const hasHearts = normalizeHearts(state.hearts) > 0;
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

    dom.quizXpChip.textContent = `+${QUIZ_COMPLETION_XP} XP per quiz`;
    dom.quizLockNote.textContent = hasHearts
      ? "Kies eerst een onderwerp. Daarna open je de drie moeilijkheidsgraden."
      : "Je hebt 0 hartjes. Je kunt nu geen quiz starten.";
    return;
  }

  const selectedSubject = getSubjectById(selectedSubjectId);
  const passedCount = quizDifficulties.filter((difficulty) => hasPassedQuiz(selectedSubject.id, difficulty.id)).length;
  const difficultyButtons = quizDifficulties
    .map((difficulty) => {
      const isUnlocked = isDifficultyUnlocked(selectedSubject.id, difficulty.id);
      const isPassed = hasPassedQuiz(selectedSubject.id, difficulty.id);
      const bestScore = getBestQuizScore(selectedSubject.id, difficulty.id);
      const status = !hasHearts && isUnlocked
        ? "Geen hartjes"
        : isPassed
        ? `${bestScore}/10 gehaald`
        : getDifficultyRequirementText(selectedSubject.id, difficulty);
      const disabled = isUnlocked && hasHearts ? "" : "disabled";

      return `
        <button
          class="difficulty-tile ${isPassed ? "passed" : ""} ${isUnlocked ? "" : "locked"} ${!hasHearts && isUnlocked ? "no-hearts" : ""}"
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

      ${renderQuizTheoryPreview(selectedSubject.id)}

      <div class="difficulty-tile-grid">${difficultyButtons}</div>
    </section>
  `;

  dom.quizXpChip.textContent = `+${QUIZ_COMPLETION_XP} XP per quiz`;
  dom.quizLockNote.textContent = hasHearts
    ? "Elke quiz heeft 10 vragen. Haal minimaal 6 goed om het volgende niveau binnen dat onderwerp vrij te spelen."
    : "Je hebt 0 hartjes. Je kunt nu geen quiz starten.";
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
  if (difficulty.id === "beginner") {
    dom.quizTheoryPanel.classList.remove("hidden");
    dom.quizTheoryPanel.setAttribute("aria-hidden", "false");
    renderQuizTheoryPanel(subject.id, difficulty.id);
  } else {
    dom.quizTheoryPanel.classList.add("hidden");
    dom.quizTheoryPanel.setAttribute("aria-hidden", "true");
    dom.quizTheoryPanel.innerHTML = "";
  }
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
  const xpEarned = QUIZ_COMPLETION_XP;
  const percentage = Math.round((score / quizSession.questions.length) * 100);
  const mistakes = quizSession.questions
    .map((question, index) => {
      const selectedIndex = quizSession.selectedAnswers[index];
      return {
        index,
        question,
        selectedIndex,
        selectedAnswer: Number.isInteger(selectedIndex) ? question.answers[selectedIndex] : "Geen antwoord",
        correctAnswer: question.answers[question.correct],
        explanation: getQuestionExplanation(question),
      };
    })
    .filter((item) => item.selectedIndex !== item.question.correct);

  dom.quizResultTitle.textContent =
    percentage >= 80 ? "Sterke ronde" : percentage >= 50 ? "Goed geoefend" : "Blijf rustig oefenen";
  dom.quizResultText.textContent = `${subject.label} - ${difficulty.label}: ${score} van de ${quizSession.questions.length} goed en ${xpEarned} XP verdiend.${
    score >= QUIZ_PASS_SCORE ? "" : " Je verloor 1 hartje."
  }`;
  dom.quizMistakeReview.innerHTML = mistakes.length
    ? `
      <div class="quiz-review-heading">
        <strong>Nog even leren</strong>
        <span>${mistakes.length} ${mistakes.length === 1 ? "fout" : "fouten"}</span>
      </div>
      <div class="quiz-mistake-list">
        ${mistakes
          .map(
            (mistake) => `
              <article class="quiz-mistake-item">
                <span class="mistake-number">Vraag ${mistake.index + 1}</span>
                <h4>${escapeHtml(mistake.question.question)}</h4>
                <dl class="mistake-answers">
                  <div>
                    <dt>Jouw antwoord</dt>
                    <dd class="wrong-answer">${escapeHtml(mistake.selectedAnswer)}</dd>
                  </div>
                  <div>
                    <dt>Juiste antwoord</dt>
                    <dd class="correct-answer">${escapeHtml(mistake.correctAnswer)}</dd>
                  </div>
                </dl>
                <p>${escapeHtml(mistake.explanation)}</p>
              </article>
            `
          )
          .join("")}
      </div>
    `
    : `
      <div class="quiz-perfect-review">
        <strong>Geen fouten deze ronde.</strong>
        <span>Je had alle antwoorden goed.</span>
      </div>
    `;
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
    selectedAnswers: [],
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
  quizSession.selectedAnswers[quizSession.currentIndex] = answerIndex;

  dom.answerList.querySelectorAll(".answer-button").forEach((button) => {
    const buttonIndex = Number(button.dataset.answerIndex);
    button.disabled = true;
    button.classList.toggle("correct", buttonIndex === currentQuestion.correct);
    button.classList.toggle("wrong", buttonIndex === answerIndex && !isCorrect);
  });

  dom.quizFeedback.textContent = getAnswerFeedback(currentQuestion, isCorrect);
  dom.quizFeedback.className = `feedback ${isCorrect ? "good" : "bad"}`;
  dom.nextQuestionButton.disabled = false;
}

function goToNextQuestion() {
  if (quizSession.selectedAnswer === null) return;
  hideQuizStopConfirm();

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
  const xpEarned = QUIZ_COMPLETION_XP;
  quizSession.finished = true;
  quizSession.xpGranted = true;
  if (score < QUIZ_PASS_SCORE) loseHeart();

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
  rememberQuizQuestions(quizSession.questions);

  if (state.quizResults.length > 20) {
    state.quizResults = state.quizResults.slice(-20);
  }

  if (xpEarned > 0) {
    awardXp(xpEarned, "Quiz afgerond");
  } else {
    saveState();
    render();
  }
  renderQuiz();
}

function startQuiz(subjectId = quizSession.subjectId, difficultyId = quizSession.difficultyId) {
  const subject = getSubjectById(subjectId);
  const difficulty = getDifficultyById(difficultyId);

  if (normalizeHearts(state.hearts) <= MIN_HEARTS) {
    renderQuizSetup();
    showToast("Je hebt geen hartjes meer.");
    return;
  }

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
    selectedAnswers: [],
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

  hideQuizStopConfirm();
  startQuiz();
}

function showQuizSetup() {
  hideQuizStopConfirm();
  quizSession = {
    ...createQuizSession(),
    subjectId: quizSession.subjectId,
    difficultyId: quizSession.difficultyId,
  };
  renderQuiz();
}

function showQuizStopConfirm() {
  dom.quizStopConfirm.classList.remove("hidden");
  dom.confirmStopQuizButton.focus();
}

function hideQuizStopConfirm() {
  dom.quizStopConfirm.classList.add("hidden");
}

function stopQuiz() {
  const subjectId = quizSession.subjectId;
  const difficultyId = quizSession.difficultyId;

  quizSession = {
    ...createQuizSession(),
    subjectId,
    difficultyId,
  };
  hideQuizStopConfirm();
  renderQuiz();
  showToast("Quiz gestopt.");
}

function updateDailyChallengeTimer() {
  const dayKey = getLocalDayKey();
  if (dayKey !== activeDailyChallengeKey) {
    activeDailyChallengeKey = dayKey;
    renderChallenges();
  }

  const timeLeft = getNextDailyReset().getTime() - Date.now();
  dom.dailyChallengeTimer.textContent = formatTimeLeft(timeLeft);
}

function startDailyChallengeTimer() {
  window.clearInterval(dailyChallengeTimer);
  updateDailyChallengeTimer();
  dailyChallengeTimer = window.setInterval(updateDailyChallengeTimer, 1000);
}

function showChallengeCelebration(challenge, isNewBadge, rewardType = getChallengeRewardType(), heartAdded = false) {
  const rewardText =
    rewardType === "heart"
      ? heartAdded
        ? `+${HEART_REWARD_AMOUNT} hartje verdiend`
        : "Hartjes waren al vol"
      : rewardType === "xp"
        ? `+${challenge.xp} XP verdiend`
        : "Beloning vandaag geclaimd";

  dom.challengeCelebrationMark.textContent = challenge.badge.mark;
  dom.challengeCelebrationTitle.textContent = "Allahoema baarik!";
  dom.challengeCelebrationMessage.textContent = `Je hebt vandaag "${challenge.title}" behaald. Ga zo door.`;
  dom.challengeCelebrationReward.textContent = rewardText;
  dom.challengeCelebrationBadge.textContent = isNewBadge
    ? `Nieuwe badge: ${challenge.badge.title}`
    : `Badge: ${challenge.badge.title}`;
  dom.challengeCelebrationOverlay.classList.remove("hidden");
  dom.challengeCelebrationOverlay.setAttribute("aria-hidden", "false");
  dom.continueChallengeCelebrationButton.focus();
}

function closeChallengeCelebration() {
  dom.challengeCelebrationOverlay.classList.add("hidden");
  dom.challengeCelebrationOverlay.setAttribute("aria-hidden", "true");
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

function showResetConfirm() {
  dom.resetConfirm.classList.remove("hidden");
  dom.confirmResetButton.focus();
}

function hideResetConfirm() {
  dom.resetConfirm.classList.add("hidden");
}

function resetProgress() {
  state = createInitialState();
  quizSession = createQuizSession();
  saveState();
  render();
  renderQuiz();
  hideResetConfirm();
  closeSettings();
  showToast("Voortgang is gewist.");
}

async function shareApp() {
  const shareData = {
    title: "DeenQuest",
    text: "Leer met DeenQuest over Islam via doelen, quizzen, XP en daily challenges.",
    url: window.location.href,
  };

  if (navigator.share) {
    try {
      await navigator.share(shareData);
      return;
    } catch (error) {
      if (error.name === "AbortError") return;
    }
  }

  if (navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(shareData.url);
      showToast("Link gekopieerd.");
      return;
    } catch {
      // Fall through to the unavailable message below.
    }
  }

  showToast("Delen is niet beschikbaar op dit apparaat.");
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

dom.challengeList.addEventListener("click", handleChallengeClick);

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
dom.stopQuizButton.addEventListener("click", showQuizStopConfirm);
dom.cancelStopQuizButton.addEventListener("click", hideQuizStopConfirm);
dom.confirmStopQuizButton.addEventListener("click", stopQuiz);
dom.restartQuizButton.addEventListener("click", resetQuiz);
dom.newQuizButton.addEventListener("click", resetQuiz);
dom.changeQuizButton.addEventListener("click", showQuizSetup);
dom.settingsButton.addEventListener("click", openSettings);
dom.closeSettingsButton.addEventListener("click", closeSettings);
dom.darkModeToggle.addEventListener("change", (event) => setDarkMode(event.target.checked));
dom.settingsOverlay.addEventListener("click", (event) => {
  if (event.target === dom.settingsOverlay) closeSettings();
});
dom.shareAppButton.addEventListener("click", shareApp);
dom.resetProgressButton.addEventListener("click", showResetConfirm);
dom.cancelResetButton.addEventListener("click", hideResetConfirm);
dom.confirmResetButton.addEventListener("click", resetProgress);
dom.closeChallengeCelebrationButton.addEventListener("click", closeChallengeCelebration);
dom.continueChallengeCelebrationButton.addEventListener("click", closeChallengeCelebration);
dom.challengeCelebrationOverlay.addEventListener("click", (event) => {
  if (event.target === dom.challengeCelebrationOverlay) closeChallengeCelebration();
});

document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return;

  if (!dom.challengeCelebrationOverlay.classList.contains("hidden")) {
    closeChallengeCelebration();
    return;
  }

  if (!dom.quizStopConfirm.classList.contains("hidden")) {
    hideQuizStopConfirm();
    return;
  }

  if (!dom.settingsOverlay.classList.contains("hidden")) {
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
startDailyChallengeTimer();
