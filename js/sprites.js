/**
 * SpriteLibrary — Built-in 16x24 pixel character sprites.
 * Each sprite has 2 animation frames (idle toggle).
 * Pixel data is stored as arrays of hex color strings; null = transparent.
 */
const SpriteLibrary = (() => {
  const W = 16;
  const H = 24;
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

  // Warrior — blue armor, brown hair
  const warrior_f1 = [
    [_,_,_,_,_,_,BK,BK,BK,BK,_,_,_,_,_,_],
    [_,_,_,_,_,BK,BR,BR,BR,BR,BK,_,_,_,_,_],
    [_,_,_,_,BK,BR,BR,BR,BR,BR,BR,BK,_,_,_,_],
    [_,_,_,_,BK,SK,SK,SK,SK,SK,SK,BK,_,_,_,_],
    [_,_,_,_,BK,SK,BK,SK,SK,BK,SK,BK,_,_,_,_],
    [_,_,_,_,BK,SK,SK,SK,SK,SK,SK,BK,_,_,_,_],
    [_,_,_,_,_,BK,SK,SD,SD,SK,BK,_,_,_,_,_],
    [_,_,_,_,_,_,BK,BK,BK,BK,_,_,_,_,_,_],
    [_,_,_,BK,BK,BL,BL,BL,BL,BL,BL,BK,BK,_,_,_],
    [_,_,BK,BL,BL,BL,BL,BL,BL,BL,BL,BL,BL,BK,_,_],
    [_,_,BK,BU,BL,BL,BL,BL,BL,BL,BL,BL,BU,BK,_,_],
    [_,_,BK,SK,BK,BL,BL,YL,BL,BL,BL,BK,SK,BK,_,_],
    [_,_,_,BK,_,BK,BL,BL,BL,BL,BK,_,BK,_,_,_],
    [_,_,_,_,_,BK,BU,BU,BU,BU,BK,_,_,_,_,_],
    [_,_,_,_,_,BK,BU,BU,BU,BU,BK,_,_,_,_,_],
    [_,_,_,_,_,BK,BL,BL,BL,BL,BK,_,_,_,_,_],
    [_,_,_,_,_,BK,BL,BK,BK,BL,BK,_,_,_,_,_],
    [_,_,_,_,_,BK,BL,BK,BK,BL,BK,_,_,_,_,_],
    [_,_,_,_,BK,BL,BL,BK,BK,BL,BL,BK,_,_,_,_],
    [_,_,_,_,BK,BR,BR,BK,BK,BR,BR,BK,_,_,_,_],
    [_,_,_,_,BK,BK,BK,_,_,BK,BK,BK,_,_,_,_],
    [_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_],
    [_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_],
    [_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_],
  ];

  const warrior_f2 = [
    [_,_,_,_,_,_,BK,BK,BK,BK,_,_,_,_,_,_],
    [_,_,_,_,_,BK,BR,BR,BR,BR,BK,_,_,_,_,_],
    [_,_,_,_,BK,BR,BR,BR,BR,BR,BR,BK,_,_,_,_],
    [_,_,_,_,BK,SK,SK,SK,SK,SK,SK,BK,_,_,_,_],
    [_,_,_,_,BK,SK,BK,SK,SK,BK,SK,BK,_,_,_,_],
    [_,_,_,_,BK,SK,SK,SK,SK,SK,SK,BK,_,_,_,_],
    [_,_,_,_,_,BK,SK,SD,SD,SK,BK,_,_,_,_,_],
    [_,_,_,_,_,_,BK,BK,BK,BK,_,_,_,_,_,_],
    [_,_,_,BK,BK,BL,BL,BL,BL,BL,BL,BK,BK,_,_,_],
    [_,_,BK,BL,BL,BL,BL,BL,BL,BL,BL,BL,BL,BK,_,_],
    [_,_,BK,BU,BL,BL,BL,BL,BL,BL,BL,BL,BU,BK,_,_],
    [_,_,BK,SK,BK,BL,BL,YL,BL,BL,BL,BK,SK,BK,_,_],
    [_,_,_,BK,_,BK,BL,BL,BL,BL,BK,_,BK,_,_,_],
    [_,_,_,_,_,BK,BU,BU,BU,BU,BK,_,_,_,_,_],
    [_,_,_,_,_,BK,BU,BU,BU,BU,BK,_,_,_,_,_],
    [_,_,_,_,_,BK,BL,BL,BL,BL,BK,_,_,_,_,_],
    [_,_,_,_,_,BK,BK,BL,BL,BK,BK,_,_,_,_,_],
    [_,_,_,_,BK,BL,BK,_,_,BK,BL,BK,_,_,_,_],
    [_,_,_,_,BK,BR,BK,_,_,BK,BR,BK,_,_,_,_],
    [_,_,_,_,BK,BK,BK,_,_,BK,BK,BK,_,_,_,_],
    [_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_],
    [_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_],
    [_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_],
    [_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_],
  ];

  // Old man — gray hair, green robe
  const oldman_f1 = [
    [_,_,_,_,_,BK,BK,BK,BK,BK,BK,_,_,_,_,_],
    [_,_,_,_,BK,WH,WH,WH,WH,WH,WH,BK,_,_,_,_],
    [_,_,_,BK,WH,WH,WH,WH,WH,WH,WH,WH,BK,_,_,_],
    [_,_,_,BK,SK,SK,SK,SK,SK,SK,SK,SK,BK,_,_,_],
    [_,_,_,BK,SK,BK,SK,SK,SK,BK,SK,SK,BK,_,_,_],
    [_,_,_,BK,SK,SK,SK,SK,SK,SK,SK,SK,BK,_,_,_],
    [_,_,_,_,BK,SK,SK,SD,SD,SK,SK,BK,_,_,_,_],
    [_,_,_,_,BK,WH,BK,BK,BK,BK,WH,BK,_,_,_,_],
    [_,_,_,BK,GR,GR,GR,GR,GR,GR,GR,GR,BK,_,_,_],
    [_,_,BK,GR,GR,GR,GR,GR,GR,GR,GR,GR,GR,BK,_,_],
    [_,_,BK,GD,GR,GR,GR,GR,GR,GR,GR,GR,GD,BK,_,_],
    [_,_,BK,SK,BK,GR,GR,GR,GR,GR,GR,BK,SK,BK,_,_],
    [_,_,_,BK,_,BK,GR,GR,GR,GR,BK,_,BK,_,_,_],
    [_,_,_,_,_,BK,GD,GD,GD,GD,BK,_,_,_,_,_],
    [_,_,_,_,_,BK,GR,GR,GR,GR,BK,_,_,_,_,_],
    [_,_,_,_,_,BK,GR,GR,GR,GR,BK,_,_,_,_,_],
    [_,_,_,_,_,BK,GR,GR,GR,GR,BK,_,_,_,_,_],
    [_,_,_,_,_,BK,GR,GR,GR,GR,BK,_,_,_,_,_],
    [_,_,_,_,_,BK,GR,BK,BK,GR,BK,_,_,_,_,_],
    [_,_,_,_,_,BK,BR,BK,BK,BR,BK,_,_,_,_,_],
    [_,_,_,_,_,BK,BK,_,_,BK,BK,_,_,_,_,_],
    [_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_],
    [_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_],
    [_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_],
  ];

  const oldman_f2 = oldman_f1; // elder barely moves

  // Mage — purple robe, staff implied
  const mage_f1 = [
    [_,_,_,_,_,_,BK,BK,BK,_,_,_,_,_,_,_],
    [_,_,_,_,_,BK,PP,PP,PP,BK,_,_,_,_,_,_],
    [_,_,_,_,BK,PP,PP,PP,PP,PP,BK,_,_,_,_,_],
    [_,_,_,_,BK,SK,SK,SK,SK,SK,BK,_,_,_,_,_],
    [_,_,_,_,BK,SK,BK,SK,SK,BK,SK,BK,_,_,_,_],
    [_,_,_,_,BK,SK,SK,SK,SK,SK,SK,BK,_,_,_,_],
    [_,_,_,_,_,BK,SK,SD,SD,SK,BK,_,_,_,_,_],
    [_,_,_,_,_,_,BK,BK,BK,BK,_,_,_,_,_,_],
    [_,_,_,BK,PP,PP,PP,PP,PP,PP,PP,PP,BK,_,_,_],
    [_,_,BK,PP,PP,PP,PP,PP,PP,PP,PP,PP,PP,BK,_,_],
    [_,_,BK,PD,PP,PP,PP,PP,PP,PP,PP,PP,PD,BK,_,_],
    [_,_,BK,SK,BK,PP,PP,PP,PP,PP,PP,BK,SK,BK,_,_],
    [_,_,_,BK,_,BK,PP,PP,PP,PP,BK,_,BK,_,_,_],
    [_,_,_,_,_,BK,PD,PD,PD,PD,BK,_,_,_,_,_],
    [_,_,_,_,_,BK,PP,PP,PP,PP,BK,_,_,_,_,_],
    [_,_,_,_,BK,PP,PP,PP,PP,PP,PP,BK,_,_,_,_],
    [_,_,_,BK,PP,PP,PP,PP,PP,PP,PP,PP,BK,_,_,_],
    [_,_,_,BK,PP,PP,PP,BK,PP,PP,PP,PP,BK,_,_,_],
    [_,_,_,_,BK,BK,BK,_,BK,BK,BK,BK,_,_,_,_],
    [_,_,_,_,_,BK,BR,_,_,BR,BK,_,_,_,_,_],
    [_,_,_,_,_,BK,BK,_,_,BK,BK,_,_,_,_,_],
    [_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_],
    [_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_],
    [_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_],
  ];

  const mage_f2 = mage_f1;

  // Princess — yellow hair, red dress
  const princess_f1 = [
    [_,_,_,_,_,BK,BK,BK,BK,BK,BK,_,_,_,_,_],
    [_,_,_,_,BK,YL,YL,YL,YL,YL,YL,BK,_,_,_,_],
    [_,_,_,BK,YL,YL,YL,YL,YL,YL,YL,YL,BK,_,_,_],
    [_,_,_,BK,YL,SK,SK,SK,SK,SK,SK,YL,BK,_,_,_],
    [_,_,_,BK,YL,SK,BK,SK,SK,BK,SK,YL,BK,_,_,_],
    [_,_,_,BK,YL,SK,SK,SK,SK,SK,SK,YL,BK,_,_,_],
    [_,_,_,_,BK,SK,SK,RD,RD,SK,SK,BK,_,_,_,_],
    [_,_,_,_,BK,YL,BK,BK,BK,BK,YL,BK,_,_,_,_],
    [_,_,_,BK,RD,RD,RD,RD,RD,RD,RD,RD,BK,_,_,_],
    [_,_,BK,RD,RD,RD,RD,RD,RD,RD,RD,RD,RD,BK,_,_],
    [_,_,BK,RD,RD,RD,RD,RD,RD,RD,RD,RD,RD,BK,_,_],
    [_,_,BK,SK,BK,RD,RD,RD,RD,RD,RD,BK,SK,BK,_,_],
    [_,_,_,BK,_,BK,RD,RD,RD,RD,BK,_,BK,_,_,_],
    [_,_,_,_,_,BK,RD,RD,RD,RD,BK,_,_,_,_,_],
    [_,_,_,_,BK,RD,RD,RD,RD,RD,RD,BK,_,_,_,_],
    [_,_,_,BK,RD,RD,RD,RD,RD,RD,RD,RD,BK,_,_,_],
    [_,_,BK,RD,RD,RD,RD,RD,RD,RD,RD,RD,RD,BK,_,_],
    [_,_,BK,RD,RD,RD,RD,RD,RD,RD,RD,RD,RD,BK,_,_],
    [_,_,BK,BK,BK,BK,BK,BK,BK,BK,BK,BK,BK,BK,_,_],
    [_,_,_,_,_,BK,BR,BK,BK,BR,BK,_,_,_,_,_],
    [_,_,_,_,_,BK,BK,_,_,BK,BK,_,_,_,_,_],
    [_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_],
    [_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_],
    [_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_],
  ];

  const princess_f2 = princess_f1;

  // Villain — dark armor, red eyes
  const villain_f1 = [
    [_,_,_,_,_,BK,BK,BK,BK,BK,BK,_,_,_,_,_],
    [_,_,_,_,BK,GK,GK,GK,GK,GK,GK,BK,_,_,_,_],
    [_,_,_,BK,GK,BK,GK,GK,GK,BK,GK,GK,BK,_,_,_],
    [_,_,_,BK,GK,GK,GK,GK,GK,GK,GK,GK,BK,_,_,_],
    [_,_,_,BK,SK,SK,SK,SK,SK,SK,SK,SK,BK,_,_,_],
    [_,_,_,BK,SK,RD,SK,SK,SK,RD,SK,SK,BK,_,_,_],
    [_,_,_,_,BK,SK,SK,BK,BK,SK,SK,BK,_,_,_,_],
    [_,_,_,_,_,BK,BK,BK,BK,BK,BK,_,_,_,_,_],
    [_,_,BK,BK,GK,GK,GK,GK,GK,GK,GK,GK,BK,BK,_,_],
    [_,BK,GK,GK,GK,GK,GK,GK,GK,GK,GK,GK,GK,GK,BK,_],
    [_,BK,BK,GK,GK,GK,GK,GK,GK,GK,GK,GK,GK,BK,BK,_],
    [_,_,BK,SK,BK,GK,GK,RD,GK,GK,GK,BK,SK,BK,_,_],
    [_,_,_,BK,_,BK,GK,GK,GK,GK,BK,_,BK,_,_,_],
    [_,_,_,_,_,BK,BK,BK,BK,BK,BK,_,_,_,_,_],
    [_,_,_,_,_,BK,GK,GK,GK,GK,BK,_,_,_,_,_],
    [_,_,_,_,_,BK,GK,GK,GK,GK,BK,_,_,_,_,_],
    [_,_,_,_,_,BK,GK,BK,BK,GK,BK,_,_,_,_,_],
    [_,_,_,_,BK,GK,GK,BK,BK,GK,GK,BK,_,_,_,_],
    [_,_,_,_,BK,BK,BK,_,_,BK,BK,BK,_,_,_,_],
    [_,_,_,_,BK,BK,BK,_,_,BK,BK,BK,_,_,_,_],
    [_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_],
    [_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_],
    [_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_],
    [_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_],
  ];

  const villain_f2 = villain_f1;

  // Dark elf ranger — purple skin, silver hair, green cloak, guitar
  const dark_elf_ranger_f1 = [
    [_,_,_,_,_,BK,BK,BK,BK,BK,_,_,_,_,_,_],
    [_,_,_,_,BK,SV,SV,SV,SV,SV,BK,_,_,_,_,_],
    [_,_,_,BK,SV,SV,SV,SV,SV,SV,SV,BK,_,_,_,_],
    [_,_,_,BK,SV,DS,DS,DS,DS,DS,DS,BK,_,_,_,_],
    [_,_,_,BK,SV,DS,RD,DS,DS,RD,DS,BK,_,_,_,_],
    [_,_,_,BK,SV,DS,DS,DS,DS,DS,DS,BK,_,_,_,_],
    [_,_,_,_,BK,DS,DS,DD,DD,DS,BK,_,_,_,_,_],
    [_,_,_,_,_,BK,BK,BK,BK,BK,_,_,_,_,_,_],
    [_,_,_,BK,GR,GR,GR,GR,GR,GR,GR,GR,BK,_,_,_],
    [_,_,BK,GR,GR,GR,GR,GR,GR,GR,GR,GR,GR,BK,_,_],
    [_,_,BK,GD,GR,GR,GR,GR,GR,GR,GR,GR,GD,BK,_,_],
    [_,_,BK,DS,BK,GR,GR,GR,GR,GR,GR,BK,DS,BK,_,_],
    [_,_,_,BK,_,BK,GR,GR,GR,GR,BK,_,BK,TN,BK,_],
    [_,_,_,_,_,BK,GD,GD,GD,GD,BK,_,BK,TN,BK,_],
    [_,_,_,_,_,BK,GR,GR,GR,GR,BK,_,BK,TD,BK,_],
    [_,_,_,_,_,BK,BR,BR,BR,BR,BK,_,BK,TD,BK,_],
    [_,_,_,_,_,BK,BR,BK,BK,BR,BK,_,_,BK,_,_],
    [_,_,_,_,_,BK,BR,BK,BK,BR,BK,_,_,_,_,_],
    [_,_,_,_,BK,BR,BR,BK,BK,BR,BR,BK,_,_,_,_],
    [_,_,_,_,BK,BK,BK,_,_,BK,BK,BK,_,_,_,_],
    [_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_],
    [_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_],
    [_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_],
    [_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_],
  ];

  const dark_elf_ranger_f2 = [
    [_,_,_,_,_,BK,BK,BK,BK,BK,_,_,_,_,_,_],
    [_,_,_,_,BK,SV,SV,SV,SV,SV,BK,_,_,_,_,_],
    [_,_,_,BK,SV,SV,SV,SV,SV,SV,SV,BK,_,_,_,_],
    [_,_,_,BK,SV,DS,DS,DS,DS,DS,DS,BK,_,_,_,_],
    [_,_,_,BK,SV,DS,RD,DS,DS,RD,DS,BK,_,_,_,_],
    [_,_,_,BK,SV,DS,DS,DS,DS,DS,DS,BK,_,_,_,_],
    [_,_,_,_,BK,DS,DS,DD,DD,DS,BK,_,_,_,_,_],
    [_,_,_,_,_,BK,BK,BK,BK,BK,_,_,_,_,_,_],
    [_,_,_,BK,GR,GR,GR,GR,GR,GR,GR,GR,BK,_,_,_],
    [_,_,BK,GR,GR,GR,GR,GR,GR,GR,GR,GR,GR,BK,_,_],
    [_,_,BK,GD,GR,GR,GR,GR,GR,GR,GR,GR,GD,BK,_,_],
    [_,_,BK,DS,BK,GR,GR,GR,GR,GR,GR,BK,DS,BK,_,_],
    [_,BK,TN,BK,_,BK,GR,GR,GR,GR,BK,_,BK,_,_,_],
    [_,BK,TN,BK,_,BK,GD,GD,GD,GD,BK,_,_,_,_,_],
    [_,BK,TD,BK,_,BK,GR,GR,GR,GR,BK,_,_,_,_,_],
    [_,BK,TD,BK,_,BK,BR,BR,BR,BR,BK,_,_,_,_,_],
    [_,_,BK,_,_,BK,BK,BR,BR,BK,BK,_,_,_,_,_],
    [_,_,_,_,BK,BR,BK,_,_,BK,BR,BK,_,_,_,_],
    [_,_,_,_,BK,BK,BK,_,_,BK,BK,BK,_,_,_,_],
    [_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_],
    [_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_],
    [_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_],
    [_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_],
    [_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_],
  ];

  const sprites = {
    warrior:  [warrior_f1, warrior_f2],
    oldman:   [oldman_f1, oldman_f2],
    mage:     [mage_f1, mage_f2],
    princess: [princess_f1, princess_f2],
    villain:  [villain_f1, villain_f2],
    dark_elf_ranger: [dark_elf_ranger_f1, dark_elf_ranger_f2],
  };

  // Emote bubbles — 8x8 pixel art
  const emotes = {
    surprise: [
      [_,_,BK,BK,BK,BK,_,_],
      [_,BK,WH,WH,WH,WH,BK,_],
      [BK,WH,WH,BK,BK,WH,WH,BK],
      [BK,WH,WH,BK,BK,WH,WH,BK],
      [BK,WH,WH,WH,WH,WH,WH,BK],
      [BK,WH,WH,BK,BK,WH,WH,BK],
      [_,BK,WH,WH,WH,WH,BK,_],
      [_,_,BK,BK,BK,BK,_,_],
    ],
    anger: [
      [_,_,BK,BK,BK,BK,_,_],
      [_,BK,RD,WH,WH,RD,BK,_],
      [BK,WH,RD,WH,WH,RD,WH,BK],
      [BK,WH,WH,RD,RD,WH,WH,BK],
      [BK,WH,WH,RD,RD,WH,WH,BK],
      [BK,WH,RD,WH,WH,RD,WH,BK],
      [_,BK,RD,WH,WH,RD,BK,_],
      [_,_,BK,BK,BK,BK,_,_],
    ],
    happy: [
      [_,_,BK,BK,BK,BK,_,_],
      [_,BK,WH,WH,WH,WH,BK,_],
      [BK,WH,YL,WH,WH,YL,WH,BK],
      [BK,WH,WH,WH,WH,WH,WH,BK],
      [BK,WH,YL,WH,WH,YL,WH,BK],
      [BK,WH,WH,YL,YL,WH,WH,BK],
      [_,BK,WH,WH,WH,WH,BK,_],
      [_,_,BK,BK,BK,BK,_,_],
    ],
  };

  function drawSprite(ctx, spriteName, x, y, frame) {
    const spriteFrames = sprites[spriteName];
    if (!spriteFrames) return;
    const data = spriteFrames[frame % spriteFrames.length];
    for (let row = 0; row < H; row++) {
      for (let col = 0; col < W; col++) {
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
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
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
