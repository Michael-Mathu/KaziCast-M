const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

async function main() {
  console.log("Starting database seeding...");

  // Clean existing data to avoid conflicts
  console.log("Clearing existing data...");
  await prisma.application.deleteMany();
  await prisma.consentRecord.deleteMany();
  await prisma.talentProfile.deleteMany();
  await prisma.casting.deleteMany();
  await prisma.user.deleteMany();

  const passwordHash = bcrypt.hashSync("password123", 12);

  // 1. Create Directors
  console.log("Creating director accounts...");
  const directorDorothy = await prisma.user.create({
    data: {
      email: "dorothy@kazicast.com",
      name: "Dorothy Ghettuba",
      role: "DIRECTOR",
      passwordHash,
    },
  });

  const directorLikayi = await prisma.user.create({
    data: {
      email: "likayi@kazicast.com",
      name: "Likayi Likimani",
      role: "DIRECTOR",
      passwordHash,
    },
  });

  const directorTosh = await prisma.user.create({
    data: {
      email: "tosh@kazicast.com",
      name: "Tosh Gitonga",
      role: "DIRECTOR",
      passwordHash,
    },
  });

  // 2. Create Talent Users
  console.log("Creating talent accounts...");
  const talentSarah = await prisma.user.create({
    data: {
      email: "sarah@kazicast.com",
      name: "Sarah Hassan",
      role: "TALENT",
      passwordHash,
    },
  });

  const talentMumbi = await prisma.user.create({
    data: {
      email: "mumbi@kazicast.com",
      name: "Mumbi Maina",
      role: "TALENT",
      passwordHash,
    },
  });

  const talentBasil = await prisma.user.create({
    data: {
      email: "basil@kazicast.com",
      name: "Basil Mshila",
      role: "TALENT",
      passwordHash,
    },
  });

  const talentPascal = await prisma.user.create({
    data: {
      email: "pascal@kazicast.com",
      name: "Pascal Tokodi",
      role: "TALENT",
      passwordHash,
    },
  });

  const talentKate = await prisma.user.create({
    data: {
      email: "kate@kazicast.com",
      name: "Kate Kamau",
      role: "TALENT",
      passwordHash,
    },
  });

  const talentRaymond = await prisma.user.create({
    data: {
      email: "raymond@kazicast.com",
      name: "Raymond Ofula",
      role: "TALENT",
      passwordHash,
    },
  });

  const talentKabugi = await prisma.user.create({
    data: {
      email: "kabugi@kazicast.com",
      name: "Brian Kabugi",
      role: "TALENT",
      passwordHash,
    },
  });

  const talentGrace = await prisma.user.create({
    data: {
      email: "grace@kazicast.com",
      name: "Grace Wacuka",
      role: "TALENT",
      passwordHash,
    },
  });

  // 3. Create Talent Profiles & Consents
  console.log("Creating talent profiles and consents...");
  const profileSarah = await prisma.talentProfile.create({
    data: {
      userId: talentSarah.id,
      stageName: "Sarah Hassan",
      bio: "Award-winning Kenyan actress, TV host, and producer. Best known for her roles in Zora, Crime and Justice, and Plan B.",
      location: "Nairobi",
      gender: "Female",
      ageRange: "25-35",
      skills: JSON.stringify(["Acting", "Voiceover", "Hosting", "Screenwriting"]),
      verified: true,
      consents: {
        create: [
          {
            type: "LIKENESS_USE",
            description: "Permission granted to use likeness for promotional materials of castings applied to.",
            status: "ACTIVE",
          },
          {
            type: "SHOWREEL_PUBLIC",
            description: "Allow showreels to be listed publicly on director search pages.",
            status: "ACTIVE",
          }
        ]
      }
    },
  });

  const profileMumbi = await prisma.talentProfile.create({
    data: {
      userId: talentMumbi.id,
      stageName: "Mumbi Maina",
      bio: "Highly acclaimed actress known for Sense8, Country Queen, and How to Find a Husband. Passionate about telling authentic African stories.",
      location: "Nairobi",
      gender: "Female",
      ageRange: "30-40",
      skills: JSON.stringify(["Acting", "Stage Performance", "Dialect Coaching", "Salsa Dancing"]),
      verified: true,
      consents: {
        create: [
          {
            type: "LIKENESS_USE",
            description: "Permission granted for project casting evaluations.",
            status: "ACTIVE",
          }
        ]
      }
    },
  });

  const profileBasil = await prisma.talentProfile.create({
    data: {
      userId: talentBasil.id,
      stageName: "Basil",
      bio: "Aspiring actor and physical performer from Mombasa. Passionate about martial arts cinema and dramatic stage play.",
      location: "Mombasa",
      gender: "Male",
      ageRange: "18-25",
      skills: JSON.stringify(["Acting", "Dancing", "Martial Arts", "Swahili Voiceover"]),
      verified: false,
    },
  });

  const profilePascal = await prisma.talentProfile.create({
    data: {
      userId: talentPascal.id,
      stageName: "Pascal Tokodi",
      bio: "Award-winning actor and musician. Best known for his lead role in Selina. Excellent comic timing and vocal abilities.",
      location: "Nairobi",
      gender: "Male",
      ageRange: "25-35",
      skills: JSON.stringify(["Acting", "Singing", "Guitar", "Comedy"]),
      verified: true,
      consents: {
        create: [
          {
            type: "LIKENESS_USE",
            description: "Likeness consent for media productions.",
            status: "ACTIVE",
          },
          {
            type: "AI_TRAINING_OPTOUT",
            description: "Opt-out from synthetic voice/likeness AI training.",
            status: "ACTIVE",
          }
        ]
      }
    },
  });

  const profileKate = await prisma.talentProfile.create({
    data: {
      userId: talentKate.id,
      stageName: "Kate Kamau",
      bio: "Popularly known as Celina. Renowned actress, content creator, and brand influencer. Starred in Sue na Johnnie, Disconnect, and Plan B. Exceptional comedic and dramatic performance skills.",
      location: "Nairobi",
      gender: "Female",
      ageRange: "30-40",
      skills: JSON.stringify(["Acting", "Comedy", "Hosting", "Influencer"]),
      verified: true,
      consents: {
        create: [
          {
            type: "LIKENESS_USE",
            description: "Consent for promotional media and marketing for casting.",
            status: "ACTIVE",
          }
        ]
      }
    },
  });

  const profileRaymond = await prisma.talentProfile.create({
    data: {
      userId: talentRaymond.id,
      stageName: "Raymond Ofula",
      bio: "Veteran actor with over 40 years of international and local screen experience. Notable roles in Lara Croft Tomb Raider, The Boy Who Harnessed the Wind, and Country Queen.",
      location: "Nairobi",
      gender: "Male",
      ageRange: "56+",
      skills: JSON.stringify(["Acting", "Voice Acting", "Stage", "Dialect Coaching"]),
      verified: true,
      consents: {
        create: [
          {
            type: "LIKENESS_USE",
            description: "Likeness release for active production casting matching.",
            status: "ACTIVE",
          }
        ]
      }
    },
  });

  const profileKabugi = await prisma.talentProfile.create({
    data: {
      userId: talentKabugi.id,
      stageName: "Brian Kabugi",
      bio: "Energetic young actor known for Volume and Second Family. Specialized in physical performance, stunts, and contemporary dance choreography.",
      location: "Nairobi",
      gender: "Male",
      ageRange: "18-25",
      skills: JSON.stringify(["Acting", "Dance", "Stunts", "Improvisation"]),
      verified: true,
      consents: {
        create: [
          {
            type: "LIKENESS_USE",
            description: "Likeness release for casting reviews.",
            status: "ACTIVE",
          }
        ]
      }
    },
  });

  const profileGrace = await prisma.talentProfile.create({
    data: {
      userId: talentGrace.id,
      stageName: "Grace Wacuka",
      bio: "Versatile actress and singer. Known for Ayaanle and Married to Work. Expert in voice manipulation, dramatic roles, and live stage musical theater.",
      location: "Nairobi",
      gender: "Female",
      ageRange: "25-35",
      skills: JSON.stringify(["Acting", "Singing", "Voice Acting", "Stage"]),
      verified: true,
      consents: {
        create: [
          {
            type: "LIKENESS_USE",
            description: "Likeness release for casting.",
            status: "ACTIVE",
          },
          {
            type: "AI_TRAINING_OPTOUT",
            description: "Opt-out of all synthetic voice and generative video training.",
            status: "ACTIVE",
          }
        ]
      }
    },
  });

  // 4. Create Castings
  console.log("Creating castings...");
  const dateFuture = (days) => {
    const d = new Date();
    d.setDate(d.getDate() + days);
    return d;
  };

  const castingVolume = await prisma.casting.create({
    data: {
      directorId: directorTosh.id,
      title: "Lead Actor - Aspiring Musician (Volume Season 2)",
      description: "Looking for a young, energetic male lead for the second season of Volume on Netflix. Must be able to sing and act convincingly. The character is a talented youth from a humble background in Nairobi trying to make it in the music industry. Audition scripts will be shared upon shortlisting.",
      roleType: "Lead",
      gender: "Male",
      ageRange: "18-25",
      location: "Nairobi",
      productionType: "TV Series",
      rate: "PAID",
      rateAmount: "50,000 KES per episode",
      deadline: dateFuture(30),
      status: "OPEN",
    },
  });

  const castingSingleKiasi = await prisma.casting.create({
    data: {
      directorId: directorLikayi.id,
      title: "Supporting Female - Sophisticated Corporate Executive",
      description: "Showmax Original Series 'Single Kiasi' is casting for a supporting female role. We need a strong, charismatic actress to play a high-flying corporate lawyer who shakes up the main trio's dynamic. Sophisticated style, strong screen presence, and excellent Swahili and English delivery required.",
      roleType: "Supporting",
      gender: "Female",
      ageRange: "30-40",
      location: "Nairobi",
      productionType: "TV Series",
      rate: "PAID",
      rateAmount: "35,000 KES per shoot day",
      deadline: dateFuture(14),
      status: "OPEN",
    },
  });

  const castingCountryQueen = await prisma.casting.create({
    data: {
      directorId: directorDorothy.id,
      title: "Elder Statesman - Community Patriarch",
      description: "Looking for an elderly male actor to play an influential community leader for the upcoming season of Country Queen on Netflix. Character requires deep emotional range, commanding presence, and fluency in Swahili. Shooting takes place in Machakos and Nairobi.",
      roleType: "Supporting",
      gender: "Male",
      ageRange: "55-70",
      location: "Machakos",
      productionType: "TV Series",
      rate: "PAID",
      rateAmount: "250,000 KES flat rate",
      deadline: dateFuture(21),
      status: "OPEN",
    },
  });

  const castingCoastalBreeze = await prisma.casting.create({
    data: {
      directorId: directorLikayi.id,
      title: "Main Antagonist - Mombasa Coastal Drama",
      description: "Feature-length drama set in the coastal region of Mombasa. Looking for a male actor to play the lead antagonist. The role requires a strong actor who can portray complex emotions, switch between Swahili and coastal slang (Sheng/Kipwani), and has experience with action/combat choreography.",
      roleType: "Lead",
      gender: "Male",
      ageRange: "35-50",
      location: "Mombasa",
      productionType: "Feature Film",
      rate: "PAID",
      rateAmount: "400,000 KES total",
      deadline: dateFuture(5),
      status: "OPEN",
    },
  });

  const castingBackground = await prisma.casting.create({
    data: {
      directorId: directorTosh.id,
      title: "Background Actors - University Students (Sanya)",
      description: "Looking for male and female background talent for an upcoming drama series. Roles are for university students in a campus setting. No prior acting experience required, but must be punctual and enthusiastic. Shoots in Nairobi.",
      roleType: "Background",
      gender: "Any",
      ageRange: "18-25",
      location: "Nairobi",
      productionType: "TV Series",
      rate: "PAID",
      rateAmount: "5,000 KES per day",
      deadline: dateFuture(10),
      status: "OPEN",
    },
  });

  const castingVoice = await prisma.casting.create({
    data: {
      directorId: directorDorothy.id,
      title: "Swahili Voiceover Artist - Safaricom Commercial",
      description: "Looking for a warm, engaging Swahili voiceover artist for an upcoming Safaricom promotional campaign. Must have clear diction, professional voice control, and a modern, conversational tone. Recording will take place at a studio in Westlands, Nairobi.",
      roleType: "Voice",
      gender: "Any",
      ageRange: "20-45",
      location: "Nairobi",
      productionType: "Commercial",
      rate: "PAID",
      rateAmount: "80,000 KES total",
      deadline: dateFuture(12),
      status: "OPEN",
    },
  });

  const castingStunt = await prisma.casting.create({
    data: {
      directorId: directorTosh.id,
      title: "Stunt Double & Coordinator - Mombasa Run Sequence",
      description: "Casting for a stunt double for the lead actor in a high-octane chase sequence. Must have experience with parkour, controlled falls, and stage combat. Safety briefing and rehearsals will be conducted prior to the shoot in Old Town Mombasa.",
      roleType: "Stunt",
      gender: "Male",
      ageRange: "25-35",
      location: "Mombasa",
      productionType: "Feature Film",
      rate: "PAID",
      rateAmount: "45,000 KES per day",
      deadline: dateFuture(18),
      status: "OPEN",
    },
  });

  const castingOther = await prisma.casting.create({
    data: {
      directorId: directorLikayi.id,
      title: "Choreographer / Movement Coach - Coastal Rhythm Musical",
      description: "Casting for a movement coach and traditional choreographer to train actors for an upcoming musical theater production in Mombasa. Must have expertise in coastal folk dances (e.g. Chakacha) and modern stage choreography.",
      roleType: "Other",
      gender: "Any",
      ageRange: "25-50",
      location: "Mombasa",
      productionType: "Musical Theater",
      rate: "PAID",
      rateAmount: "150,000 KES flat rate",
      deadline: dateFuture(25),
      status: "OPEN",
    },
  });

  const datePast = (days) => {
    const d = new Date();
    d.setDate(d.getDate() - days);
    return d;
  };

  const castingNairobiHalfLife = await prisma.casting.create({
    data: {
      directorId: directorTosh.id,
      title: "Main Actor - Mwas (Nairobi Half Life)",
      description: "Casting for the main protagonist 'Mwas', a young aspiring actor from a rural town who moves to Nairobi to pursue his dream, only to get drawn into the city's criminal underworld. Requires high energy, authentic vernacular delivery, and physical agility.",
      roleType: "Lead",
      gender: "Male",
      ageRange: "18-25",
      location: "Nairobi",
      productionType: "Feature Film",
      rate: "PAID",
      rateAmount: "150,000 KES total",
      deadline: datePast(180),
      status: "CLOSED",
    },
  });

  const castingSubira = await prisma.casting.create({
    data: {
      directorId: directorLikayi.id,
      title: "Lead Actress - Subira (Subira)",
      description: "Casting for the titular role 'Subira', a strong-willed young woman in Lamu who struggles against traditional gender roles to pursue her passion for swimming. The role requires swimming capability, emotional depth, and Lamu Swahili dialect.",
      roleType: "Lead",
      gender: "Female",
      ageRange: "18-25",
      location: "Lamu",
      productionType: "Feature Film",
      rate: "PAID",
      rateAmount: "200,000 KES total",
      deadline: datePast(90),
      status: "CLOSED",
    },
  });

  const castingSupaModo = await prisma.casting.create({
    data: {
      directorId: directorDorothy.id,
      title: "Supporting Actor - Mike (Supa Modo)",
      description: "Looking for a young actor to play 'Mike', a supportive and imaginative friend in the community who helps coordinate film-style stunts and movie sets for a terminally ill young girl who dreams of being a superhero.",
      roleType: "Supporting",
      gender: "Male",
      ageRange: "Under 18",
      location: "Maweni",
      productionType: "Feature Film",
      rate: "PAID",
      rateAmount: "50,000 KES total",
      deadline: datePast(120),
      status: "CLOSED",
    },
  });

  // 5. Create Applications
  console.log("Creating casting applications...");
  await prisma.application.create({
    data: {
      castingId: castingSingleKiasi.id,
      talentId: talentSarah.id,
      status: "SHORTLISTED",
      message: "I would love to portray this character. Having worked with Likayi previously, I feel I can bring the exact depth and elegance required for this legal advisory role.",
    },
  });

  await prisma.application.create({
    data: {
      castingId: castingCountryQueen.id,
      talentId: talentMumbi.id,
      status: "PENDING",
      message: "Excited for this next season! I believe I can bring a unique dynamic to the community scenes as requested.",
    },
  });

  await prisma.application.create({
    data: {
      castingId: castingCoastalBreeze.id,
      talentId: talentBasil.id,
      status: "PENDING",
      message: "Habari, I am a Mombasa-based actor with background in martial arts and local dialect. Ready to audition!",
    },
  });

  await prisma.application.create({
    data: {
      castingId: castingVolume.id,
      talentId: talentPascal.id,
      status: "ACCEPTED",
      message: "Hey Tosh, this role is a perfect match for my musical and acting background. Let's make magic again.",
    },
  });

  await prisma.application.create({
    data: {
      castingId: castingSubira.id,
      talentId: talentSarah.id,
      status: "ACCEPTED",
      message: "This role matches my vision perfectly. Ready to swim!",
    },
  });

  await prisma.application.create({
    data: {
      castingId: castingNairobiHalfLife.id,
      talentId: talentMumbi.id,
      status: "REJECTED",
      message: "Applying for any supporting female roles in Mwas's story.",
    },
  });

  await prisma.application.create({
    data: {
      castingId: castingNairobiHalfLife.id,
      talentId: talentPascal.id,
      status: "SHORTLISTED",
      message: "Applying for a minor role in the gangster crew.",
    },
  });

  console.log("Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
