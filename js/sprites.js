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

  // Helper: generate a row from a compact string
  // Each char maps to a color. Much more compact than full arrays.
  const P = {
    '.': _, 'K': BK, 's': SK, 'd': SD, 'W': WH, 'b': BR, 'B': BD,
    'l': BL, 'u': BU, 'r': RD, 'g': GR, 'G': GD, 'y': GY, 'k': GK,
    'Y': YL, 'p': PP, 'P': PD, 'o': OR, 'D': DS, 'E': DD, 'S': SV,
    'T': TN, 't': TD, 'L': LB, 'R': RH, 'F': PK,
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

  // ===== DARK ELF RANGER — purple skin, silver hair, green cloak, guitar =====
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
    '......KDDKgggggggggggKDDK......K',
    '.......KKKgggggggggggKKK......KT',
    '........KGGgggggggGGGK.......KTT',
    '........KbbbbbbbbbbbbK......KTTK',
    '........KbbbbbbbbbbbbK.....KttK.',
    '........KbbbbbbbbbbbbK....KttK..',
    '........KbbbbKKKKbbbbK...KttK...',
    '.........KbbK....KbbK....KK.....',
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
    '......KDKKgggggggggggKKDK.......',
    '..KTTK.KDDKgggggggggggKDDK......',
    '..KTTK..KKKgggggggggggKKK.......',
    '...KTTK..KGGgggggggGGGK.........',
    '....KTTK.KbbbbbbbbbbbbK.........',
    '.....KttK.KbbbbbbbbbbbbK........',
    '......KttKKbbbbbbbbbbbbK........',
    '.......KttKbbbbKKKKbbbbK........',
    '.........KKKbbKK..KKbbK.........',
    '..........KbbK......KbbK........',
    '..........KbbK......KbbK........',
    '..........KKKK......KKKK........',
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

  const sprites = {
    warrior:  [warrior_f1, warrior_f2],
    oldman:   [oldman_f1, oldman_f2],
    mage:     [mage_f1, mage_f2],
    princess: [princess_f1, princess_f2],
    villain:  [villain_f1, villain_f2],
    dark_elf_ranger: [dark_elf_ranger_f1, dark_elf_ranger_f2],
  };

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

  return { drawSprite, drawEmote, getSpriteNames, getSprites, getEmotes, getEmoteNames, W, H };
})();
