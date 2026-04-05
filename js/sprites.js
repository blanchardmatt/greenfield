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

  // Helper: generate a row from a compact string
  // Each char maps to a color. Much more compact than full arrays.
  const P = {
    '.': _, 'K': BK, 's': SK, 'd': SD, 'W': WH, 'b': BR, 'B': BD,
    'l': BL, 'u': BU, 'r': RD, 'g': GR, 'G': GD, 'y': GY, 'k': GK,
    'Y': YL, 'p': PP, 'P': PD, 'o': OR, 'D': DS, 'E': DD, 'S': SV,
    'T': TN, 't': TD, 'L': LB, 'R': RH, 'F': PK,
    'c': CY, 'C': CD, 'O': OG, 'V': DB, 'h': LG, 'M': PN, 'H': HB, 'A': AM,
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
    '..............KKKKKK............',
    '.............KbbbbbbK...........',
    '............KbbbbbbbbK..........',
    '...........KbbbbbbbbbbK.........',
    '...........KbbbbbbbbbbK.........',
    '..........KbbbbbbbbbbbbK........',
    '..........KssssssssssssK........',
    '..........KssssssssssssK........',
    '..........KssKKssssKKssK........',
    '..........KssKKssssKKssK........',
    '..........KssssssssssssK........',
    '..........KsssssddsssssK........',
    '...........KssssssssssK.........',
    '...........KssssdddssK..........',
    '............KKKKKKKKKK..........',
    '.............KKKKKKKK...........',
    '.........KKKllllllllKKK.........',
    '........KllllllllllllllK........',
    '.......KlllllllllllllllK........',
    '.......KullllllllllllluK........',
    '.......KullllllYlllllluK........',
    '......KsKKllllllllllKKsK........',
    '......KssKllllllllllKssK........',
    '.......KKKllllllllllKKK.........',
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
    '.........KKKK....KKKK...........',
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
    '..............KKKKKK............',
    '.............KbbbbbbK...........',
    '............KbbbbbbbbK..........',
    '...........KbbbbbbbbbbK.........',
    '...........KbbbbbbbbbbK.........',
    '..........KbbbbbbbbbbbbK........',
    '..........KssssssssssssK........',
    '..........KssssssssssssK........',
    '..........KssKKssssKKssK........',
    '..........KssKKssssKKssK........',
    '..........KssssssssssssK........',
    '..........KsssssddsssssK........',
    '...........KssssssssssK.........',
    '...........KssssdddssK..........',
    '............KKKKKKKKKK..........',
    '.............KKKKKKKK...........',
    '.........KKKllllllllKKK.........',
    '........KllllllllllllllK........',
    '.......KlllllllllllllllK........',
    '.......KullllllllllllluK........',
    '.......KullllllYlllllluK........',
    '......KsKKllllllllllKKsK........',
    '......KssKllllllllllKssK........',
    '.......KKKllllllllllKKK.........',
    '........KuullllllluuK...........',
    '........KuullllllluuK...........',
    '.........KllllllllllK...........',
    '.........KllllllllllK...........',
    '.........KllllKKllllK...........',
    '.........KllKK..KKllK...........',
    '........KllK......KllK..........',
    '........KbbK......KbbK..........',
    '........KKKK......KKKK..........',
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
    '............KKKKKKKKKK..........',
    '...........KWWWWWWWWWWk.........',
    '..........KWWWWWWWWWWWWK........',
    '.........KWWWWWWWWWWWWWWk.......',
    '.........KWWWWWWWWWWWWWWk.......',
    '........KWWWWWWWWWWWWWWWWk......',
    '........KWssssssssssssssWK......',
    '........KWssssssssssssssWK......',
    '........KWssKKssssssKKssWK......',
    '........KWssKKssssssKKssWK......',
    '........KWssssssssssssssWK......',
    '........KWssssssddsssssWK.......',
    '.........KssssssssssssssK.......',
    '.........KssWWWWWWWWWWssK.......',
    '..........KWWKKKKKKKWWK.........',
    '..........KWWWKKKKKWWWK.........',
    '.........KKgggggggggggKK........',
    '........KgggggggggggggggK.......',
    '.......KggggggggggggggggK.......',
    '.......KGgggggggggggggGgK.......',
    '.......KGgggggggggggggGgK.......',
    '......KsKKgggggggggggKKsK.......',
    '......KssKgggggggggggKssK.......',
    '.......KKKgggggggggggKKK........',
    '........KGGgggggggGGGK..........',
    '........KgggggggggggggK.........',
    '........KgggggggggggggK.........',
    '........KgggggggggggggK.........',
    '........KgggggggggggggK.........',
    '........KgggggggggggggK.........',
    '........KggggKKKKggggK..........',
    '.........KgggK..KgggK...........',
    '.........KgggK..KgggK...........',
    '.........KbbbK..KbbbK...........',
    '.........KKKK....KKKK...........',
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
    '...............KKKK.............',
    '..............KppppK............',
    '.............KppppppK...........',
    '............KppppppppK..........',
    '...........KppppppppppK.........',
    '..........KppppppppppppK........',
    '..........KssssssssssssK........',
    '..........KssssssssssssK........',
    '..........KssKKssssKKssK........',
    '..........KssKKssssKKssK........',
    '..........KssssssssssssK........',
    '..........KsssssddsssssK........',
    '...........KssssssssssK.........',
    '...........KssssdddssK..........',
    '............KKKKKKKKKK..........',
    '.............KKKKKKKK...........',
    '........KKKppppppppppKKK........',
    '.......KppppppppppppppppK.......',
    '......KppppppppppppppppppK......',
    '......KPpppppppppppppppPpK......',
    '......KPpppppppppppppppPpK......',
    '.....KsKKpppppppppppppKKsK......',
    '.....KssKpppppppppppppKssK......',
    '......KKKpppppppppppppKKK.......',
    '.......KPPpppppppppPPPK.........',
    '.......KpppppppppppppppK........',
    '......KpppppppppppppppppK.......',
    '......KpppppppppppppppppK.......',
    '.....KpppppppppppppppppppK......',
    '.....KpppppppppppppppppppK......',
    '.....KpppppppKKKKpppppppK.......',
    '......KppppKK....KKppppK........',
    '......KppppK......KppppK........',
    '......KbbbbK......KbbbbK........',
    '......KKKKK........KKKKK........',
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
    '............KKKKKKKKKK..........',
    '...........KYYYYYYYYYYk.........',
    '..........KYYYYYYYYYYYYk........',
    '.........KYYYYYYYYYYYYYYk.......',
    '.........KYYYYYYYYYYYYYYk.......',
    '........KYYYYYYYYYYYYYYYYk......',
    '........KYssssssssssssssYK......',
    '........KYssssssssssssssYK......',
    '........KYssKKssssssKKssYK......',
    '........KYssKKssssssKKssYK......',
    '........KYssssssssssssssYK......',
    '........KYsssssFFFsssssYK.......',
    '.........KYsssssssssssYK........',
    '.........KYssssssssssYK.........',
    '..........KYKKKKKKKKYk..........',
    '..........KYYYYYYYYYYK..........',
    '.........KKrrrrrrrrrrKK.........',
    '........KrrrrrrrrrrrrrrK........',
    '.......KrrrrrrrrrrrrrrrrK.......',
    '.......KrrrrrrrrrrrrrrrrK.......',
    '.......KrrrrrrrrrrrrrrrrK.......',
    '......KsKKrrrrrrrrrrrrKKsK......',
    '......KssKrrrrrrrrrrrrKssK......',
    '.......KKKrrrrrrrrrrrrKKK.......',
    '........KrrrrrrrrrrrrrrK........',
    '.......KrrrrrrrrrrrrrrrrK.......',
    '......KrrrrrrrrrrrrrrrrrrK......',
    '......KrrrrrrrrrrrrrrrrrrK......',
    '.....KrrrrrrrrrrrrrrrrrrrrK.....',
    '.....KrrrrrrrrrrrrrrrrrrrrK.....',
    '.....KrrrrrrrrrrrrrrrrrrrrK.....',
    '.....KrrrrrrrrrrrrrrrrrrrrK.....',
    '.....KKKKKKKKKKKKKKKKKKKKk......',
    '..........KbbbbKKbbbbK..........',
    '..........KKKKK..KKKKK..........',
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
    '...........KKKKKKKKKKKK.........',
    '..........KkkkkkkkkkkkkK........',
    '.........KkkKKkkkkkkKKkkK.......',
    '.........KkkkkkkkkkkkkkkK.......',
    '.........KkkkkkkkkkkkkkkK.......',
    '........KssssssssssssssssK......',
    '........KssssssssssssssssK......',
    '........KssRRsssssssRRssK.......',
    '........KssRRsssssssRRssK.......',
    '........KssssssssssssssssK......',
    '........KsssssKKKKsssssK........',
    '.........KssssssssssssK.........',
    '..........KKKKKKKKKKKK..........',
    '...........KKKKKKKKKKK..........',
    '......KKKKKkkkkkkkkkkkKKKKK.....',
    '.....KkkkkkkkkkkkkkkkkkkkkkK....',
    '....KkkkkkkkkkkkkkkkkkkkkkkK....',
    '....KKkkkkkkkkkkkkkkkkkkkkKK....',
    '.....KKkkkkkkkkkRkkkkkkkKK......',
    '......KsKKkkkkkkkkkkkKKsK.......',
    '......KssKkkkkkkkkkkkKssK.......',
    '.......KKKkkkkkkkkkkkKKK........',
    '........KKKkkkkkkkKKKK..........',
    '........KkkkkkkkkkkkkK..........',
    '........KkkkkkkkkkkkkK..........',
    '........KkkkkkkkkkkkkK..........',
    '........KkkkkkKKkkkkkkK.........',
    '.........KkkKK..KKkkK...........',
    '........KkkkK....KkkkK..........',
    '........KKKKK....KKKKK..........',
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
    '..............KKKKKK............',
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
    '............KKKKKKKKKKKK........',
    '.............KKKKKKKKKK.........',
    '.........KKKggggggggggKKK.......',
    '........KgggggggggggggggK.......',
    '.......KggggggggggggggggK.......',
    '.......KGgggggggggggggGgK.......',
    '.......KGgggggggggggggGgK.......',
    '......KDKKgggggggggggKKDK.......',
    '......KDDKgggggggggggKDDK.......',
    '.......KKKgggggggggggKKK..KK....',
    '........KGGgggggggGGGK..KRRK....',
    '........KbbbbbbbbbbbbK.KRRRK....',
    '........KbbbbbbbbbbbbK.KRrRK....',
    '........KbbbbbbbbbbbbKKRRRRK....',
    '........KbbbbKKKKbbbbKKRRRK.....',
    '.........KbbK....KbbK.KKKK......',
    '.........KbbK....KbbK...........',
    '........KbbbK....KbbbK..........',
    '........KKKKK....KKKKK..........',
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
    '..............KKKKKK............',
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
    '............KKKKKKKKKKKK........',
    '.............KKKKKKKKKK.........',
    '.........KKKggggggggggKKK.......',
    '........KgggggggggggggggK.......',
    '.......KggggggggggggggggK.......',
    '.......KGgggggggggggggGgK.......',
    '.......KGgggggggggggggGgK.......',
    '.......KDKKgggggggggggKKDK......',
    '.......KDDKgggggggggggKDDK......',
    '....KK..KKKgggggggggggKKK.......',
    '...KRRK..KGGgggggggGGGK.........',
    '...KRRRK.KbbbbbbbbbbbbK.........',
    '...KRrRK.KbbbbbbbbbbbbK.........',
    '...KRRRRK.KbbbbbbbbbbK..........',
    '....KRRRK.KbbKKKKbbbbK..........',
    '.....KKKK..KbbK..KbbK...........',
    '..........KbbK....KbbK..........',
    '..........KbbK....KbbK..........',
    '..........KKKK....KKKK..........',
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
    '............KKKKKKKK............',
    '...........KrrrrrrrrK...........',
    '..........KrrrrrrrrrrK..........',
    '..........KssssssssssK..........',
    '..........KssKKssKKssK..........',
    '..........KssssssssssK..........',
    '..........KsrrrrrrrrK...........',
    '..........KsrrrrrrrrsK..........',
    '...........KrrKKKKrrK...........',
    '............KKKKKKKK............',
    '.........KKHHHHHHHHHHkK.........',
    '........KHHHHHHHHHHHHHHk........',
    '........KHHHHHHHHHHHHHHk........',
    '.......KsKKHHHHHHHHKKsK.........',
    '.......KssKHHHHHHHHKssK.........',
    '........KKkHHHHHHHHkKK..........',
    '........KHHHHHHHHHHHHk..........',
    '........KbbbbKKKKbbbbK..........',
    '.........KbbK....KbbK...........',
    '.........KbbK....KbbK...........',
    '.........KKKK....KKKK...........',
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
    '..............KKKK..............',
    '.............KggggK.............',
    '............KggggggK............',
    '...........KgggggggK............',
    '...........KgssssssgK...........',
    '...........KssssssssK...........',
    '...........KssKKKKssK...........',
    '...........KssssssssK...........',
    '............KssddsK.............',
    '.............KKKKKK.............',
    '.........KKKggggggKKK...........',
    '........KgggggggggggggK.........',
    '........KGggggggggggGgK.........',
    '.......KsKKgggggggKKsK..........',
    '.......KssKgggggggKssK..........',
    '........KKKgggggggKKK...........',
    '.........KgggggggggK............',
    '.........KbbbbbbbbbbK...........',
    '.........KbbbbKKbbbbK...........',
    '..........KbbK..KbbK............',
    '..........KbbK..KbbK............',
    '.........KbbbK..KbbbK...........',
    '.........KKKK....KKKK...........',
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
    '..............KKKK..............',
    '.............KsdsdK.............',
    '............KsdsdsdK............',
    '............KssssssK............',
    '............KssssssK............',
    '............KsKKKKsK............',
    '............KssssssK............',
    '.............KsddK..............',
    '..............KKKK..............',
    '.........KKKooooooKKK...........',
    '........KooooooooooooK..........',
    '.......KooooooooooooooK.........',
    '.......KooooooooooooooK.........',
    '......KsKKooooooooKKsK..........',
    '......KssKooooooooKssK..........',
    '.......KKKooooooooKKK...........',
    '........KooooooooooK............',
    '........KooooooooooK............',
    '........KoooKKKKoooK............',
    '.........KooK..KooK.............',
    '.........KooK..KooK.............',
    '.........KbbK..KbbK.............',
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
  const monk_f2 = monk_f1;

  // ===== THIEF — dark cloak, mask =====
  const thief_f1 = decode([
    '..............KKKK..............',
    '.............KkkkkK.............',
    '............KkkkkkkK............',
    '...........KkkkkkkkK............',
    '...........KssssssssK...........',
    '...........KssKKKKssK...........',
    '...........KkkkkkkkK............',
    '...........KkksddkkK............',
    '............KKKKKKKK............',
    '.........KKKkkkkkkKKK...........',
    '........KkkkkkkkkkkkkkK.........',
    '........KkkkkkkkkkkkkkK.........',
    '.......KsKKkkkkkkkKKsK..........',
    '.......KssKkkkkkkkKssK..........',
    '........KKKkkkkkkkKKK...........',
    '.........KkkkkkkkkkK............',
    '.........KkkkkkkkkkkK...........',
    '.........KkkkkKKkkkkK...........',
    '..........KkkK..KkkK............',
    '..........KkkK..KkkK............',
    '.........KkkkK..KkkkK...........',
    '.........KKKK....KKKK...........',
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
    '..............KKKK..............',
    '.............KyyyyK.............',
    '............KyyyyyyK............',
    '...........KyyyyyyyyK...........',
    '...........KysssssysK...........',
    '...........KssKKKKssK...........',
    '...........KssssssssK...........',
    '...........KyssddsyK............',
    '............KKKKKKKK............',
    '.........KKKyyyyyyyyKKK.........',
    '........KyyyyyyyyyyyyyyyyK......',
    '.......KyyyyyyyyyyyyyyyyyK......',
    '.......KkyyyyYYYyyyyykyK........',
    '......KsKKyyyyyyyyKKsK..........',
    '......KssKyyyyyyyyKssK..........',
    '.......KKKyyyyyyyyKKK...........',
    '........KyyyyyyyyyyyyK..........',
    '........KyyyyKKKKyyyyK..........',
    '.........KyyK....KyyK...........',
    '.........KyyK....KyyK...........',
    '........KyyyK....KyyyK..........',
    '........KKKKK....KKKKK..........',
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
    '...........KssssssssK...........',
    '...........KssssssssK...........',
    '...........KssKKKKssK...........',
    '...........KssssssssK...........',
    '............KsdddsK.............',
    '.............KKKKKK.............',
    '.........KKKccccccKKK...........',
    '........KccccccccccccK..........',
    '.......KccccccccccccccK.........',
    '.......KCccccccccccccCK.........',
    '......KsKKccccccccKKsK..........',
    '......KssKccccccccKssK..........',
    '.......KKKccccccccKKK...........',
    '........KccccccccccK............',
    '........KbbbbbbbbbbK............',
    '........KbbbbKKbbbbK............',
    '.........KbbK..KbbK.............',
    '.........KbbK..KbbK.............',
    '........KbbbK..KbbbK............',
    '........KKKK....KKKK............',
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
    '........KKKKKKKKKKKkK...........',
    '..........KssssssssK............',
    '..........KssssssssK............',
    '..........KssKKKKssK............',
    '..........KssssssssK............',
    '...........KssddsK..............',
    '............KKKKKK..............',
    '.........KKpppppppKKK...........',
    '........KpppppppppppppK.........',
    '.......KpppppppppppppppK........',
    '.......KPpppppppppppppPK........',
    '......KsKKpppppppppKKsK.........',
    '......KssKpppppppppKssK.........',
    '.......KKKpppppppppKKK..........',
    '......KppppppppppppppppK........',
    '.....KppppppppppppppppppK.......',
    '.....KppppppppppppppppppK.......',
    '.....KKKKKKKKKKKKKKKKKKKKK......',
    '..........KbbbbbbbbK............',
    '..........KKKKKKKKKK............',
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
    '..........KKKKKKKKKK............',
    '.........KYYYYYYYYYYk...........',
    '........KYYYYYYYYYYYYK..........',
    '........KYYYYYYYYYYYYk..........',
    '........KKKKKKKKKKKKKKK.........',
    '..........KssssssssK............',
    '..........KssKKKKssK............',
    '..........KssssssssK............',
    '...........KssddsK..............',
    '............KKKKKK..............',
    '.........KKlllllllKKK...........',
    '........KlllllllllllllK.........',
    '.......KllllllllllllllK.........',
    '.......KulllllllllllluK.........',
    '......KsKKllllllllKKsK..........',
    '......KssKllllllllKssK..........',
    '.......KKKllllllllKKK...........',
    '........KllllllllllK............',
    '........KbbbbKKbbbbK............',
    '.........KbbK..KbbK.............',
    '.........KbbK..KbbK.............',
    '........KbbbK..KbbbK............',
    '........KKKK....KKKK............',
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
    '............KKKKKK..............',
    '...........KbbbbbbK.............',
    '...........KssssssK.............',
    '...........KsKKKKsK.............',
    '...........KssssssK.............',
    '............KsddK...............',
    '.............KKKK...............',
    '..........KKrrrrKK..............',
    '.........KrrrrrrrrK.............',
    '.........KrrrrrrrrK.............',
    '........KsKrrrrrrKsK............',
    '........KsKrrrrrrKsK............',
    '.........KKrrrrrrKK.............',
    '..........KrrrrrrK..............',
    '..........KbbKKbbK..............',
    '...........KbKKbK...............',
    '...........KKKKKK...............',
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
    '..........KssKKKKssK............',
    '..........KssssssssK............',
    '...........KssddsK..............',
    '............KKKKKK..............',
    '.........KKMMMMMMMKKk...........',
    '........KMMMMMMMMMMMMMk.........',
    '.......KMMMMMMMMMMMMMMk.........',
    '.......KMMMMMMMMMMMMMMk.........',
    '......KsKKMMMYYMMMKKsK..........',
    '......KssKMMMMMMMMMKssK.........',
    '.......KKKMMMMMMMMMKKK..........',
    '........KMMMMMMMMMMMk...........',
    '........KMMMMKKMMMMk............',
    '.........KMMk..KMMk.............',
    '.........KMMk..KMMk.............',
    '........KMMMk..KMMMk............',
    '........KKKKk..KKKKk............',
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
  };

  // Props — static objects
  const props = {
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
