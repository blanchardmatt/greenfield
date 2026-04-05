/**
 * SpriteLibrary — Built-in 32x48 pixel character sprites.
 * Each sprite has 2 animation frames (idle toggle).
 * Pixel data is stored as arrays of hex color strings; null = transparent.
 */
const SpriteLibrary = (() => {
  const W = 32;
  const H = 48;
  const _ = null; // transparent

  // Color shortcuts
  const BK = '#111111'; // black outlines
  const SK = '#f0b888'; // skin
  const SD = '#c08060'; // skin dark
  const WH = '#eeeeee'; // white
  const BR = '#885522'; // brown
  const BD = '#663311'; // brown dark
  const BL = '#4444cc'; // blue
  const BU = '#3333aa'; // blue dark
  const RD = '#cc3333'; // red
  const GR = '#338833'; // green
  const GD = '#226622'; // green dark
  const GY = '#888888'; // gray
  const GK = '#555555'; // gray dark
  const YL = '#ddcc44'; // yellow
  const PP = '#8844aa'; // purple
  const PD = '#663388'; // purple dark
  const OR = '#dd8833'; // orange
  const DS = '#6644aa'; // dark elf skin
  const DD = '#553399'; // dark elf skin dark
  const SV = '#bbbbcc'; // silver/white hair
  const TN = '#aa7744'; // tan/wood (guitar body)
  const TD = '#775533'; // tan dark (guitar neck)
  const LB = '#6688dd'; // light blue highlight
  const RH = '#dd5555'; // red highlight
  const PK = '#ffaaaa'; // pink
  const CY = '#44bbbb'; // cyan/teal
  const CD = '#338888'; // cyan dark
  const OG = '#558833'; // olive green
  const DB = '#2244aa'; // dark blue
  const LG = '#88cc88'; // light green
  const PN = '#cc66aa'; // pink/magenta
  const HB = '#886644'; // hide brown (leather)
  const AM = '#cc8844'; // amber
  // Diverse skin tones (gradient from pale to deep)
  const S2 = '#8b5e3c'; // medium brown skin
  const S3 = '#d4a06a'; // olive/tan skin
  const S4 = '#3c2415'; // very dark skin
  const S5 = '#fdd9b5'; // pale/light skin
  const S6 = '#c68642'; // warm brown skin
  const S7 = '#503020'; // deep brown skin
  const S8 = '#e8b98a'; // light tan skin
  const S9 = '#a0724a'; // medium-dark brown skin
  // Eye colors
  const EG = '#22aa44'; // green eyes
  const EB = '#2266cc'; // blue eyes
  const EA = '#996633'; // amber/brown eyes
  // Hair colors
  const HK = '#222222'; // black hair
  const HR = '#aa3322'; // red/auburn hair
  const HG = '#888888'; // gray hair
  const HN = '#cc9944'; // blonde hair
  // Alien skin tones
  const XG = '#33dd66'; // green alien skin
  const XB = '#5588ff'; // blue alien skin
  const XP = '#ff66aa'; // pink alien skin
  const XO = '#ff8800'; // orange alien skin

  // Helper: generate a row from a compact string
  // Each char maps to a color. Much more compact than full arrays.
  const P = {
    '.': _, 'K': BK, 's': SK, 'd': SD, 'W': WH, 'b': BR, 'B': BD,
    'l': BL, 'u': BU, 'r': RD, 'g': GR, 'G': GD, 'y': GY, 'k': GK,
    'Y': YL, 'p': PP, 'P': PD, 'o': OR, 'D': DS, 'E': DD, 'S': SV,
    'T': TN, 't': TD, 'L': LB, 'R': RH, 'F': PK,
    'c': CY, 'C': CD, 'O': OG, 'V': DB, 'h': LG, 'M': PN, 'H': HB, 'A': AM,
    '1': S2, '2': S3, '3': S4, '4': S5, '5': EG, '6': EB, '7': EA,
    'i': S6, 'j': S7, 'e': S8, 'f': S9,
    '8': HK, '9': HR, '0': HG, 'N': HN,
    'X': XG, 'Z': XB, 'Q': XP, 'J': XO,
  };

  function decode(rows) {
    return rows.map(row => {
      const out = [];
      for (let i = 0; i < row.length; i++) {
        out.push(P[row[i]] !== undefined ? P[row[i]] : _);
      }
      return out;
    });
  }

  // ===== WARRIOR — blue armor, brown hair, sword =====
  const warrior_f1 = decode([
    '..............s66sKK............',
    '.............KbbbbbbK...........',
    '............KbbbbbbbbK..........',
    '...........KbbbbbbbbbbK.........',
    '...........KbbbbbbbbbbK.........',
    '..........KbbbbbbbbbbbbK........',
    '..........KssssssssssssK........',
    '..........KssssssssssssK........',
    '..........Ksss6ssss6sssK........',
    '..........Ksss6ssss6sssK........',
    '..........KssssssssssssK........',
    '..........KsssssddsssssK........',
    '...........KssssssssssK.........',
    '...........KssssdddssK..........',
    '............s66sKKKKKK..........',
    '.............s66sKKKK...........',
    '.........s6Kllllllll6sK.........',
    '........KllllllllllllllK........',
    '.......KlllllllllllllllK........',
    '.......KullllllllllllluK........',
    '.......KullllllYlllllluK........',
    '......Kss6llllllllll6ssK........',
    '......KssKllllllllllKssK........',
    '.......s6Kllllllllll6sK.........',
    '........KuullllllluuK...........',
    '........KuullllllluuK...........',
    '.........KllllllllllK...........',
    '.........KllllllllllK...........',
    '.........KllllKKllllK...........',
    '.........KlllKKKlllK............',
    '..........KllK..KllK............',
    '..........KllK..KllK............',
    '.........KlllK..KlllK...........',
    '.........KbbbK..KbbbK...........',
    '.........s66s....KKKK...........',
    '................................',
    '................................',
    '................................',
    '................................',
    '................................',
    '................................',
    '................................',
    '................................',
    '................................',
    '................................',
    '................................',
    '................................',
    '................................',
  ]);

  const warrior_f2 = decode([
    '..............s66sKK............',
    '.............KbbbbbbK...........',
    '............KbbbbbbbbK..........',
    '...........KbbbbbbbbbbK.........',
    '...........KbbbbbbbbbbK.........',
    '..........KbbbbbbbbbbbbK........',
    '..........KssssssssssssK........',
    '..........KssssssssssssK........',
    '..........Ksss6ssss6sssK........',
    '..........Ksss6ssss6sssK........',
    '..........KssssssssssssK........',
    '..........KsssssddsssssK........',
    '...........KssssssssssK.........',
    '...........KssssdddssK..........',
    '............s66sKKKKKK..........',
    '.............s66sKKKK...........',
    '.........s6Kllllllll6sK.........',
    '........KllllllllllllllK........',
    '.......KlllllllllllllllK........',
    '.......KullllllllllllluK........',
    '.......KullllllYlllllluK........',
    '......Kss6llllllllll6ssK........',
    '......KssKllllllllllKssK........',
    '.......s6Kllllllllll6sK.........',
    '........KuullllllluuK...........',
    '........KuullllllluuK...........',
    '.........KllllllllllK...........',
    '.........KllllllllllK...........',
    '.........KllllKKllllK...........',
    '.........Klls6..6sllK...........',
    '........KllK......KllK..........',
    '........KbbK......KbbK..........',
    '........s66s......KKKK..........',
    '................................',
    '................................',
    '................................',
    '................................',
    '................................',
    '................................',
    '................................',
    '................................',
    '................................',
    '................................',
    '................................',
    '................................',
    '................................',
    '................................',
    '................................',
  ]);

  // ===== OLD MAN — white hair, green robe, beard =====
  const oldman_f1 = decode([
    '............s77sKKKKKK..........',
    '...........KWWWWWWWWWWk.........',
    '..........KWWWWWWWWWWWWK........',
    '.........KWWWWWWWWWWWWWWk.......',
    '.........KWWWWWWWWWWWWWWk.......',
    '........KWWWWWWWWWWWWWWWWk......',
    '........KWssssssssssssssWK......',
    '........KWssssssssssssssWK......',
    '........KWsss7ssssss7sssWK......',
    '........KWsss7ssssss7sssWK......',
    '........KWssssssssssssssWK......',
    '........KWssssssddsssssWK.......',
    '.........KssssssssssssssK.......',
    '.........KssWWWWWWWWWWssK.......',
    '..........KWWs77sKKKWWK.........',
    '..........KWWWs77sKWWWK.........',
    '.........s7ggggggggggg7s........',
    '........KgggggggggggggggK.......',
    '.......KggggggggggggggggK.......',
    '.......KGgggggggggggggGgK.......',
    '.......KGgggggggggggggGgK.......',
    '......Kss7ggggggggggg7ssK.......',
    '......KssKgggggggggggKssK.......',
    '.......s7Kggggggggggg7sK........',
    '........KGGgggggggGGGK..........',
    '........KgggggggggggggK.........',
    '........KgggggggggggggK.........',
    '........KgggggggggggggK.........',
    '........KgggggggggggggK.........',
    '........KgggggggggggggK.........',
    '........Kggggs77sggggK..........',
    '.........KgggK..KgggK...........',
    '.........KgggK..KgggK...........',
    '.........KbbbK..KbbbK...........',
    '.........s77s....KKKK...........',
    '................................',
    '................................',
    '................................',
    '................................',
    '................................',
    '................................',
    '................................',
    '................................',
    '................................',
    '................................',
    '................................',
    '................................',
    '................................',
  ]);

  const oldman_f2 = oldman_f1;

  // ===== MAGE — purple hat and robe =====
  const mage_f1 = decode([
    '...............4554.............',
    '..............KppppK............',
    '.............KppppppK...........',
    '............KppppppppK..........',
    '...........KppppppppppK.........',
    '..........KppppppppppppK........',
    '..........K444444444444K........',
    '..........K444444444444K........',
    '..........K444544445444K........',
    '..........K444544445444K........',
    '..........K444444444444K........',
    '..........K44444ss44444K........',
    '...........K4444444444K.........',
    '...........K4444sss44K..........',
    '............4554KKKKKK..........',
    '.............4554KKKK...........',
    '........45Kpppppppppp54K........',
    '.......KppppppppppppppppK.......',
    '......KppppppppppppppppppK......',
    '......KPpppppppppppppppPpK......',
    '......KPpppppppppppppppPpK......',
    '.....K445ppppppppppppp544K......',
    '.....K44KpppppppppppppK44K......',
    '......45Kppppppppppppp54K.......',
    '.......KPPpppppppppPPPK.........',
    '.......KpppppppppppppppK........',
    '......KpppppppppppppppppK.......',
    '......KpppppppppppppppppK.......',
    '.....KpppppppppppppppppppK......',
    '.....KpppppppppppppppppppK......',
    '.....Kppppppp4554pppppppK.......',
    '......Kpppp45....54ppppK........',
    '......KppppK......KppppK........',
    '......KbbbbK......KbbbbK........',
    '......4554K........KKKKK........',
    '................................',
    '................................',
    '................................',
    '................................',
    '................................',
    '................................',
    '................................',
    '................................',
    '................................',
    '................................',
    '................................',
    '................................',
    '................................',
  ]);

  const mage_f2 = mage_f1;

  // ===== PRINCESS — yellow hair, red dress =====
  const princess_f1 = decode([
    '............2662KKKKKK..........',
    '...........KYYYYYYYYYYk.........',
    '..........KYYYYYYYYYYYYk........',
    '.........KYYYYYYYYYYYYYYk.......',
    '.........KYYYYYYYYYYYYYYk.......',
    '........KYYYYYYYYYYYYYYYYk......',
    '........KY22222222222222YK......',
    '........KY22222222222222YK......',
    '........KY22262222226222YK......',
    '........KY22262222226222YK......',
    '........KY22222222222222YK......',
    '........KY22222FFF22222YK.......',
    '.........KY22222222222YK........',
    '.........KY2222222222YK.........',
    '..........KY2662KKKKYk..........',
    '..........KYYYYYYYYYYK..........',
    '.........26rrrrrrrrrr62.........',
    '........KrrrrrrrrrrrrrrK........',
    '.......KrrrrrrrrrrrrrrrrK.......',
    '.......KrrrrrrrrrrrrrrrrK.......',
    '.......KrrrrrrrrrrrrrrrrK.......',
    '......K226rrrrrrrrrrrr622K......',
    '......K22KrrrrrrrrrrrrK22K......',
    '.......26Krrrrrrrrrrrr62K.......',
    '........KrrrrrrrrrrrrrrK........',
    '.......KrrrrrrrrrrrrrrrrK.......',
    '......KrrrrrrrrrrrrrrrrrrK......',
    '......KrrrrrrrrrrrrrrrrrrK......',
    '.....KrrrrrrrrrrrrrrrrrrrrK.....',
    '.....KrrrrrrrrrrrrrrrrrrrrK.....',
    '.....KrrrrrrrrrrrrrrrrrrrrK.....',
    '.....KrrrrrrrrrrrrrrrrrrrrK.....',
    '.....2662KKKKKKKKKKKKKKKKk......',
    '..........KbbbbKKbbbbK..........',
    '..........2662K..KKKKK..........',
    '................................',
    '................................',
    '................................',
    '................................',
    '................................',
    '................................',
    '................................',
    '................................',
    '................................',
    '................................',
    '................................',
    '................................',
    '................................',
  ]);

  const princess_f2 = princess_f1;

  // ===== VILLAIN — dark armor, red eyes, cape =====
  const villain_f1 = decode([
    '...........srrsKKKKKKKK.........',
    '..........KkkkkkkkkkkkkK........',
    '.........KkksrkkkkkkrskkK.......',
    '.........KkkkkkkkkkkkkkkK.......',
    '.........KkkkkkkkkkkkkkkK.......',
    '........KssssssssssssssssK......',
    '........KssssssssssssssssK......',
    '........KssRRsssssssRRssK.......',
    '........KssRRsssssssRRssK.......',
    '........KssssssssssssssssK......',
    '........KssssssrrssssssK........',
    '.........KssssssssssssK.........',
    '..........srrsKKKKKKKK..........',
    '...........srrsKKKKKKK..........',
    '......srrsKkkkkkkkkkkkKKKKK.....',
    '.....KkkkkkkkkkkkkkkkkkkkkkK....',
    '....KkkkkkkkkkkkkkkkkkkkkkkK....',
    '....srkkkkkkkkkkkkkkkkkkkkrs....',
    '.....srkkkkkkkkkRkkkkkkkrs......',
    '......KssrkkkkkkkkkkkrssK.......',
    '......KssKkkkkkkkkkkkKssK.......',
    '.......srKkkkkkkkkkkkrsK........',
    '........srKkkkkkkkrsKK..........',
    '........KkkkkkkkkkkkkK..........',
    '........KkkkkkkkkkkkkK..........',
    '........KkkkkkkkkkkkkK..........',
    '........KkkkkkKKkkkkkkK.........',
    '.........Kkksr..rskkK...........',
    '........KkkkK....KkkkK..........',
    '........srrsK....KKKKK..........',
    '................................',
    '................................',
    '................................',
    '................................',
    '................................',
    '................................',
    '................................',
    '................................',
    '................................',
    '................................',
    '................................',
    '................................',
    '................................',
    '................................',
    '................................',
    '................................',
    '................................',
    '................................',
  ]);

  const villain_f2 = villain_f1;

  // ===== DARK ELF RANGER — purple skin, silver hair, green cloak, electric guitar =====
  const dark_elf_ranger_f1 = decode([
    '..............DrrDKK............',
    '.............KSSSSSSK...........',
    '............KSSSSSSSSK..........',
    '...........KSSSSSSSSSSK.........',
    '...........KSSSSSSSSSSK.........',
    '..........KSSSSSSSSSSSSSK.......',
    '..........KSDDDDDDDDDDDSK.......',
    '..........KSDDDDDDDDDDDSK.......',
    '..........KSDDrrDDDDrrDDSK......',
    '..........KSDDrrDDDDrrDDSK......',
    '..........KSDDDDDDDDDDDSK.......',
    '..........KSDDDDDEEDDDDSK.......',
    '...........KDDDDDDDDDDDK........',
    '...........KDDDDDEEEDDK.........',
    '............DrrDKKKKKKKK........',
    '.............DrrDKKKKKK.........',
    '.........DrKggggggggggrDK.......',
    '........KgggggggggggggggK.......',
    '.......KggggggggggggggggK.......',
    '.......KGgggggggggggggGgK.KK....',
    '.......KGgggggggggggggGgKKbK....',
    '......KDDrgggggggggggrDDKbK.....',
    '......KDDKgggggggggggKDDKK......',
    '.......DrKgggggggggggrDRRRK.....',
    '........KGGgggggggGGGKRRrrRK....',
    '........KbbbbbbbbbbbbKRRrrRK....',
    '........KbbbbbbbbbbbbK.KRRRK....',
    '........KbbbbbbbbbbbbK..KKK.....',
    '........KbbbbDrrDbbbbK..........',
    '.........KbbK....KbbK...........',
    '.........KbbK....KbbK...........',
    '........KbbbK....KbbbK..........',
    '................................',
    '................................',
    '................................',
    '................................',
    '................................',
    '................................',
    '................................',
    '................................',
    '................................',
    '................................',
    '................................',
    '................................',
    '................................',
    '................................',
    '................................',
    '................................',
  ]);


  const dark_elf_ranger_f2 = decode([
    '..............DrrDKK............',
    '.............KSSSSSSK...........',
    '............KSSSSSSSSK..........',
    '...........KSSSSSSSSSSK.........',
    '...........KSSSSSSSSSSK.........',
    '..........KSSSSSSSSSSSSSK.......',
    '..........KSDDDDDDDDDDDSK.......',
    '..........KSDDDDDDDDDDDSK.......',
    '..........KSDDrrDDDDrrDDSK......',
    '..........KSDDrrDDDDrrDDSK......',
    '..........KSDDDDDDDDDDDSK.......',
    '..........KSDDDDDEEDDDDSK.......',
    '...........KDDDDDDDDDDDK........',
    '...........KDDDDDEEEDDK.........',
    '............DrrDKKKKKKKK........',
    '.............DrrDKKKKKK.........',
    '.........DrKggggggggggrDK.......',
    '........KgggggggggggggggK.......',
    '........KggggggggggggggggK......',
    '....KK.KGgggggggggggggGgK.......',
    '....KbKKGgggggggggggggGgK.......',
    '.....KbKDDrgggggggggggrDDK......',
    '......KKDDKgggggggggggKDDK......',
    '.....KRRRK.DrKgggggggggggrDK....',
    '....KRrrRRK.KGGgggggggGGGK......',
    '....KRrrRRK.KbbbbbbbbbbbbK......',
    '....KRRRK..KbbbbbbbbbbbbK.......',
    '.....KKK...KbbbbbbbbbbbbK.......',
    '..........KbbbbDrrDbbbbK........',
    '...........KbbK....KbbK.........',
    '...........KbbK....KbbK.........',
    '..........KbbbK....KbbbK........',
    '................................',
    '................................',
    '................................',
    '................................',
    '................................',
    '................................',
    '................................',
    '................................',
    '................................',
    '................................',
    '................................',
    '................................',
    '................................',
    '................................',
    '................................',
    '................................',
  ]);

  // ===== DWARF — short, red beard, leather armor =====
  const dwarf_f1 = decode([
    '................................',
    '................................',
    '................................',
    '................................',
    '............2772KKKK............',
    '...........KrrrrrrrrK...........',
    '..........KrrrrrrrrrrK..........',
    '..........KssssssssssK..........',
    '..........Kss27ss72ssK..........',
    '..........KssssssssssK..........',
    '..........KsrrrrrrrrK...........',
    '..........KsrrrrrrrrsK..........',
    '...........Krr2772rrK...........',
    '............2772KKKK............',
    '.........KKHHHHHHHHHHkK.........',
    '........KHHHHHHHHHHHHHHk........',
    '........KHHHHHHHHHHHHHHk........',
    '.......Ks27HHHHHHHH72sK.........',
    '.......KssKHHHHHHHHKssK.........',
    '........27kHHHHHHHHk72..........',
    '........KHHHHHHHHHHHHk..........',
    '........Kbbbb2772bbbbK..........',
    '.........KbbK....KbbK...........',
    '.........KbbK....KbbK...........',
    '.........2772....KKKK...........',
    '................................',
    '................................',
    '................................',
    '................................',
    '................................',
    '................................',
    '................................',
  ]);
  const dwarf_f2 = dwarf_f1;

  // ===== ARCHER — green hood, bow =====
  const archer_f1 = decode([
    '..............i55i..............',
    '.............KggggK.............',
    '............KggggggK............',
    '...........KgggggggK............',
    '...........KgiiiiiigK...........',
    '...........KiiiiiiiiK...........',
    '...........Kiii55iiiK...........',
    '...........KiiiiiiiiK...........',
    '............Kii33iK.............',
    '.............i55iKK.............',
    '.........i5Kgggggg5iK...........',
    '........KgggggggggggggK.........',
    '........KGggggggggggGgK.........',
    '.......Kii5ggggggg5iiK..........',
    '.......KiiKgggggggKiiK..........',
    '........i5Kggggggg5iK...........',
    '.........KgggggggggK............',
    '.........KbbbbbbbbbbK...........',
    '.........KbbbbKKbbbbK...........',
    '..........KbbK..KbbK............',
    '..........KbbK..KbbK............',
    '.........KbbbK..KbbbK...........',
    '.........i55i....KKKK...........',
    '................................',
    '................................',
    '................................',
    '................................',
    '................................',
    '................................',
    '................................',
    '................................',
    '................................',
  ]);
  const archer_f2 = archer_f1;

  // ===== MONK — bald, orange robes =====
  const monk_f1 = decode([
    '..............j77j..............',
    '.............Kj3j3K.............',
    '............Kj3j3j3K............',
    '............KjjjjjjK............',
    '............KjjjjjjK............',
    '............Kjj77jjK............',
    '............KjjjjjjK............',
    '.............Kj33K..............',
    '..............j77j..............',
    '.........j7Koooooo7jK...........',
    '........KooooooooooooK..........',
    '.......KooooooooooooooK.........',
    '.......KooooooooooooooK.........',
    '......Kjj7oooooooo7jjK..........',
    '......KjjKooooooooKjjK..........',
    '.......j7Koooooooo7jK...........',
    '........KooooooooooK............',
    '........KooooooooooK............',
    '........Koooj77joooK............',
    '.........KooK..KooK.............',
    '.........KooK..KooK.............',
    '.........KbbK..KbbK.............',
    '.........j77j..KKKK.............',
    '................................',
    '................................',
    '................................',
    '................................',
    '................................',
    '................................',
    '................................',
    '................................',
    '................................',
  ]);
  const monk_f2 = monk_f1;

  // ===== THIEF — dark cloak, mask =====
  const thief_f1 = decode([
    '..............sKKs..............',
    '.............KkkkkK.............',
    '............KkkkkkkK............',
    '...........KkkkkkkkK............',
    '...........KssssssssK...........',
    '...........KsssKKsssK...........',
    '...........KkkkkkkkK............',
    '...........KkksddkkK............',
    '............sKKsKKKK............',
    '.........sKKkkkkkkKsK...........',
    '........KkkkkkkkkkkkkkK.........',
    '........KkkkkkkkkkkkkkK.........',
    '.......KssKkkkkkkkKssK..........',
    '.......KssKkkkkkkkKssK..........',
    '........sKKkkkkkkkKsK...........',
    '.........KkkkkkkkkkK............',
    '.........KkkkkkkkkkkK...........',
    '.........KkkkkKKkkkkK...........',
    '..........KkkK..KkkK............',
    '..........KkkK..KkkK............',
    '.........KkkkK..KkkkK...........',
    '.........sKKs....KKKK...........',
    '................................',
    '................................',
    '................................',
    '................................',
    '................................',
    '................................',
    '................................',
    '................................',
    '................................',
    '................................',
  ]);
  const thief_f2 = thief_f1;

  // ===== KNIGHT — full plate, helmet =====
  const knight_f1 = decode([
    '..............e66e..............',
    '.............KyyyyK.............',
    '............KyyyyyyK............',
    '...........KyyyyyyyyK...........',
    '...........KyeeeeeyeK...........',
    '...........Keee66eeeK...........',
    '...........KeeeeeeeeK...........',
    '...........KyeeddeyK............',
    '............e66eKKKK............',
    '.........e6Kyyyyyyyy6eK.........',
    '........KyyyyyyyyyyyyyyyyK......',
    '.......KyyyyyyyyyyyyyyyyyK......',
    '.......KkyyyyYYYyyyyykyK........',
    '......Kee6yyyyyyyy6eeK..........',
    '......KeeKyyyyyyyyKeeK..........',
    '.......e6Kyyyyyyyy6eK...........',
    '........KyyyyyyyyyyyyK..........',
    '........Kyyyye66eyyyyK..........',
    '.........KyyK....KyyK...........',
    '.........KyyK....KyyK...........',
    '........KyyyK....KyyyK..........',
    '........e66eK....KKKKK..........',
    '................................',
    '................................',
    '................................',
    '................................',
    '................................',
    '................................',
    '................................',
    '................................',
    '................................',
    '................................',
  ]);
  const knight_f2 = knight_f1;

  // ===== BARD — feathered hat, teal tunic =====
  const bard_f1 = decode([
    '.............KhKKK..............',
    '............KhccccK.............',
    '...........KccccccccK...........',
    '...........K44444444K...........',
    '...........K44444444K...........',
    '...........K44455444K...........',
    '...........K44444444K...........',
    '............K4sss4K.............',
    '.............4554KK.............',
    '.........45Kcccccc54K...........',
    '........KccccccccccccK..........',
    '.......KccccccccccccccK.........',
    '.......KCccccccccccccCK.........',
    '......K445cccccccc544K..........',
    '......K44KccccccccK44K..........',
    '.......45Kcccccccc54K...........',
    '........KccccccccccK............',
    '........KbbbbbbbbbbK............',
    '........KbbbbKKbbbbK............',
    '.........KbbK..KbbK.............',
    '.........KbbK..KbbK.............',
    '........KbbbK..KbbbK............',
    '........4554....KKKK............',
    '................................',
    '................................',
    '................................',
    '................................',
    '................................',
    '................................',
    '................................',
    '................................',
    '................................',
  ]);
  const bard_f2 = bard_f1;

  // ===== WITCH — tall hat, dark dress =====
  const witch_f1 = decode([
    '..............KK................',
    '.............KpKK...............',
    '............KpppK...............',
    '...........KpppppK..............',
    '..........KpppppppK.............',
    '........4554KKKKKKKkK...........',
    '..........K44444444K............',
    '..........K44444444K............',
    '..........K44455444K............',
    '..........K44444444K............',
    '...........K44ss4K..............',
    '............4554KK..............',
    '.........45ppppppp54K...........',
    '........KpppppppppppppK.........',
    '.......KpppppppppppppppK........',
    '.......KPpppppppppppppPK........',
    '......K445ppppppppp544K.........',
    '......K44KpppppppppK44K.........',
    '.......45Kppppppppp54K..........',
    '......KppppppppppppppppK........',
    '.....KppppppppppppppppppK.......',
    '.....KppppppppppppppppppK.......',
    '.....4554KKKKKKKKKKKKKKKKK......',
    '..........KbbbbbbbbK............',
    '..........4554KKKKKK............',
    '................................',
    '................................',
    '................................',
    '................................',
    '................................',
    '................................',
    '................................',
  ]);
  const witch_f2 = witch_f1;

  // ===== FARMER — straw hat, overalls =====
  const farmer_f1 = decode([
    '..........f77fKKKKKK............',
    '.........KYYYYYYYYYYk...........',
    '........KYYYYYYYYYYYYK..........',
    '........KYYYYYYYYYYYYk..........',
    '........f77fKKKKKKKKKKK.........',
    '..........KffffffffK............',
    '..........Kfff77fffK............',
    '..........KffffffffK............',
    '...........KffddfK..............',
    '............f77fKK..............',
    '.........f7lllllll7fK...........',
    '........KlllllllllllllK.........',
    '.......KllllllllllllllK.........',
    '.......KulllllllllllluK.........',
    '......Kff7llllllll7ffK..........',
    '......KffKllllllllKffK..........',
    '.......f7Kllllllll7fK...........',
    '........KllllllllllK............',
    '........KbbbbKKbbbbK............',
    '.........KbbK..KbbK.............',
    '.........KbbK..KbbK.............',
    '........KbbbK..KbbbK............',
    '........f77f....KKKK............',
    '................................',
    '................................',
    '................................',
    '................................',
    '................................',
    '................................',
    '................................',
    '................................',
    '................................',
  ]);
  const farmer_f2 = farmer_f1;

  // ===== CHILD — small, simple =====
  const child_f1 = decode([
    '................................',
    '................................',
    '................................',
    '................................',
    '................................',
    '................................',
    '............1661KK..............',
    '...........KbbbbbbK.............',
    '...........K111111K.............',
    '...........K116611K.............',
    '...........K111111K.............',
    '............K133K...............',
    '.............1661...............',
    '..........16rrrr61..............',
    '.........KrrrrrrrrK.............',
    '.........KrrrrrrrrK.............',
    '........K1KrrrrrrK1K............',
    '........K1KrrrrrrK1K............',
    '.........16rrrrrr61.............',
    '..........KrrrrrrK..............',
    '..........KbbKKbbK..............',
    '...........KbKKbK...............',
    '...........1661KK...............',
    '................................',
    '................................',
    '................................',
    '................................',
    '................................',
    '................................',
    '................................',
    '................................',
    '................................',
  ]);
  const child_f2 = child_f1;

  // ===== NOBLE — fancy clothes, crown =====
  const noble_f1 = decode([
    '...........KYK.KYK..............',
    '..........KYYKYYKK..............',
    '..........KYYYYYYYK.............',
    '..........KssssssssK............',
    '..........KssssssssK............',
    '..........Ksss55sssK............',
    '..........KssssssssK............',
    '...........KssddsK..............',
    '............s55sKK..............',
    '.........s5MMMMMMM5sk...........',
    '........KMMMMMMMMMMMMMk.........',
    '.......KMMMMMMMMMMMMMMk.........',
    '.......KMMMMMMMMMMMMMMk.........',
    '......Kss5MMMYYMMM5ssK..........',
    '......KssKMMMMMMMMMKssK.........',
    '.......s5KMMMMMMMMM5sK..........',
    '........KMMMMMMMMMMMk...........',
    '........KMMMMKKMMMMk............',
    '.........KMMk..KMMk.............',
    '.........KMMk..KMMk.............',
    '........KMMMk..KMMMk............',
    '........s55sk..KKKKk............',
    '................................',
    '................................',
    '................................',
    '................................',
    '................................',
    '................................',
    '................................',
    '................................',
    '................................',
    '................................',
  ]);
  const noble_f2 = noble_f1;

  // ===== GREEN ALIEN — big eyes, antennae =====
  const alien_green_f1 = decode([
    '.............K..K...............',
    '............K..K................',
    '...........K..K.................',
    '..........KXXKXK................',
    '.........KXXXXXXXXK.............',
    '........KXXXXXXXXXXK............',
    '........KXXXXXXXXXXK............',
    '........KXXXKKXXKKXXK...........',
    '........KXX.KK..KK.XK...........',
    '........KXXXXXXXXXXK............',
    '........KXXXXXXXXXXK............',
    '.........KXXXddXXXK.............',
    '..........KXXXXXXK..............',
    '...........KKKKKK...............',
    '.........KKggggggKK.............',
    '........KggggggggggK............',
    '.......KggggggggggggK...........',
    '......KXKKggggggggKKXK..........',
    '......KXXKggggggggKXXK..........',
    '.......KKKggggggggKKK...........',
    '........KggggggggggK............',
    '........KggggKKggggK............',
    '.........KggK..KggK.............',
    '.........KKKK..KKKK.............',
    '................................',
    '................................',
    '................................',
    '................................',
    '................................',
    '................................',
    '................................',
    '................................',
  ]);
  const alien_green_f2 = alien_green_f1;

  // ===== BLUE ALIEN — tentacle arms =====
  const alien_blue_f1 = decode([
    '..............KKKK..............',
    '.............KZZZZK.............',
    '............KZZZZZZK............',
    '...........KZZZZZZZZK...........',
    '..........KZZZZZZZZZZK..........',
    '..........KZZZZZZZZZZK..........',
    '..........KZZ6KZZ6KZZK..........',
    '..........KZZKKZZKKZZK..........',
    '..........KZZZZZZZZZZK..........',
    '..........KZZZZddZZZZK..........',
    '...........KZZZZZZZZK...........',
    '............KKKKKKKK............',
    '.........KKllllllllKK...........',
    '........KllllllllllllK..........',
    '.......KllllllllllllllK.........',
    '......KZKKllllllllKKZK..........',
    '.....KZZZKllllllllKZZZK.........',
    '......KZZKllllllllKZZK..........',
    '.......KKKllllllllKKK...........',
    '........KllllllllllK............',
    '........KllllKKllllK............',
    '.........KllK..KllK.............',
    '.........KKKK..KKKK.............',
    '................................',
    '................................',
    '................................',
    '................................',
    '................................',
    '................................',
    '................................',
    '................................',
    '................................',
  ]);
  const alien_blue_f2 = alien_blue_f1;

  // ===== PINK ALIEN — four eyes, tiny =====
  const alien_pink_f1 = decode([
    '................................',
    '................................',
    '................................',
    '................................',
    '............KKKKKKKK............',
    '...........KQQQQQQQQK...........',
    '..........KQQQQQQQQQQK..........',
    '..........KQ5KQ5KQ5KQK..........',
    '..........KQQQQQQQQQQK..........',
    '..........KQQQQddQQQQK..........',
    '...........KQQQQQQQQK...........',
    '............KKKKKKKK............',
    '..........KKrrrrrrKK............',
    '.........KrrrrrrrrrrK...........',
    '........KrrrrrrrrrrrrK..........',
    '......KQKKrrrrrrrrKKQK..........',
    '......KQQKrrrrrrrrKQQK..........',
    '.......KKKrrrrrrrrKKK...........',
    '........KrrrrrrrrrrK............',
    '........KrrrrKKrrrrK............',
    '.........KrrK..KrrK.............',
    '.........KKKK..KKKK.............',
    '................................',
    '................................',
    '................................',
    '................................',
    '................................',
    '................................',
    '................................',
    '................................',
    '................................',
    '................................',
  ]);
  const alien_pink_f2 = alien_pink_f1;

  const sprites = {
    warrior:  [warrior_f1, warrior_f2],
    oldman:   [oldman_f1, oldman_f2],
    mage:     [mage_f1, mage_f2],
    princess: [princess_f1, princess_f2],
    villain:  [villain_f1, villain_f2],
    dark_elf_ranger: [dark_elf_ranger_f1, dark_elf_ranger_f2],
    dwarf:    [dwarf_f1, dwarf_f2],
    archer:   [archer_f1, archer_f2],
    monk:     [monk_f1, monk_f2],
    thief:    [thief_f1, thief_f2],
    knight:   [knight_f1, knight_f2],
    bard:     [bard_f1, bard_f2],
    witch:    [witch_f1, witch_f2],
    farmer:   [farmer_f1, farmer_f2],
    child:    [child_f1, child_f2],
    noble:    [noble_f1, noble_f2],
    alien_green: [alien_green_f1, alien_green_f2],
    alien_blue:  [alien_blue_f1, alien_blue_f2],
    alien_pink:  [alien_pink_f1, alien_pink_f2],
  };

  // Props — static objects
  const props = {
    ufo: decode([
      '..........KKKKKKKKKKKK..........',
      '.........KyyyyyyyyyyyyK.........',
      '........KyyKyKyyKyKyyyK.........',
      '.......KyyyKyKyyKyKyyyyK........',
      '......KyyyyKyKyyKyKyyyyyK.......',
      '....KKyyyyKKKyyKKKyyyyyyyyKK....',
      '..KKyyyyyyyyyyyyyyyyyyyyyyKKK...',
      '.KyyyyyyyyyyyyyyyyyyyyyyyyyykK..',
      'KyyyykKKKKKKKKKKKKKKKkyyyyykK...',
      'KyyyKrrrrrrrrrrrrrrrrKyyyyykK...',
      '.KyyKrrrrrrrrrrrrrrrrKyyyyK.....',
      '..KKKrrrrrrrrrrrrrrrrKKKKK......',
      '....KKKKKKKKKKKKKKKKKkK.........',
      '......KkkkkkkkkkkkkkK...........',
      '.......KKKKKKKKKKKKKK...........',
    ]),
    amplifier: decode([
      '..KKKKKKKKKKKKKK..',
      '.KkkkkkkkkkkkkkkK.',
      'KkkkkkkkkkkkkkkkkK',
      'KkKKKKKKKKKKKKKkK.',
      'KkKkkkkkkkkkkKKkK.',
      'KkKkkkkkkkkkkKKkK.',
      'KkKkkKKKKKkkkKKkK.',
      'KkKkKrrrrKkkkKKkK.',
      'KkKkKrrrrKkkkKKkK.',
      'KkKkkKKKKKkkkKKkK.',
      'KkKkkkkkkkkkkKKkK.',
      'KkKKKKKKKKKKKKKkK.',
      'KkkkkkkkkkkkkkkkkK',
      'KkkKKkkkkkkkKKkkkK',
      'KkkKKkkkkkkkKKkkkK',
      'KkkkkkkkkkkkkkkkkK',
      '.KkkkkkkkkkkkkkkK.',
      '..KKKKKKKKKKKKKK..',
    ]),
  };

  function drawProp(ctx, propName, x, y) {
    const data = props[propName];
    if (!data) return;
    for (let row = 0; row < data.length; row++) {
      for (let col = 0; col < data[row].length; col++) {
        const color = data[row][col];
        if (color) {
          ctx.fillStyle = color;
          ctx.fillRect(x + col, y + row, 1, 1);
        }
      }
    }
  }

  // Emote bubbles — 12x12 pixel art
  const emotes = {
    surprise: decode([
      '...KKKKKK.......................',
      '..KWWWWWWK......................',
      '.KWWWWWWWWK.....................',
      'KWWWKKKKWWWK....................',
      'KWWWKKKKWWWK....................',
      'KWWWWWWWWWWK....................',
      'KWWWWWWWWWWK....................',
      'KWWWKKKKWWWK....................',
      'KWWWKKKKWWWK....................',
      '.KWWWWWWWWK.....................',
      '..KWWWWWWK......................',
      '...KKKKKK.......................',
    ]),
    anger: decode([
      '...KKKKKK.......................',
      '..KrWWWWrK......................',
      '.KWrWWWWrWK.....................',
      'KWWrWWWWrWWK....................',
      'KWWWrrrrWWWK....................',
      'KWWWWWWWWWWK....................',
      'KWWWWWWWWWWK....................',
      'KWWWrrrrWWWK....................',
      'KWWrWWWWrWWK....................',
      '.KWrWWWWrWK.....................',
      '..KrWWWWrK......................',
      '...KKKKKK.......................',
    ]),
    happy: decode([
      '...KKKKKK.......................',
      '..KWWWWWWK......................',
      '.KWWWWWWWWK.....................',
      'KWWYWWWWYWWK....................',
      'KWWYWWWWYWWK....................',
      'KWWWWWWWWWWK....................',
      'KWWYWWWWYWWK....................',
      'KWWWYYYYWWWk....................',
      'KWWWWWWWWWWK....................',
      '.KWWWWWWWWK.....................',
      '..KWWWWWWK......................',
      '...KKKKKK.......................',
    ]),
  };

  function drawSprite(ctx, spriteName, x, y, frame) {
    const spriteFrames = sprites[spriteName];
    if (!spriteFrames) return;
    const data = spriteFrames[frame % spriteFrames.length];
    for (let row = 0; row < data.length; row++) {
      for (let col = 0; col < data[row].length; col++) {
        const color = data[row][col];
        if (color) {
          ctx.fillStyle = color;
          ctx.fillRect(x + col, y + row, 1, 1);
        }
      }
    }
  }

  function drawEmote(ctx, emoteName, x, y) {
    const data = emotes[emoteName];
    if (!data) return;
    for (let row = 0; row < data.length; row++) {
      for (let col = 0; col < data[row].length; col++) {
        const color = data[row][col];
        if (color) {
          ctx.fillStyle = color;
          ctx.fillRect(x + col, y + row, 1, 1);
        }
      }
    }
  }

  function getSpriteNames() {
    return Object.keys(sprites);
  }

  function getSprites() {
    return sprites;
  }

  function getEmotes() {
    return emotes;
  }

  function getEmoteNames() {
    return Object.keys(emotes);
  }

  return { drawSprite, drawEmote, drawProp, getSpriteNames, getSprites, getEmotes, getEmoteNames, W, H };
})();
