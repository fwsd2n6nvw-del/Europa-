// map.js
// Keep map constants and terrain rules here.
// Future features like crashed UFO, water hole, bonus zones, or obstacles can be added here.

const MAP_CONFIG = {
  gridSize: 30,
  startPosition: { x: 15, y: 15 }
};

const CRATER_TILES = [
  [5,7],[6,7],[6,8],[7,8],
  [19,7],[20,7],[21,8],[22,9],
  [7,9],[8,9],[19,9],[20,10],[21,10],[22,10],
  [9,19],[10,20],[11,20],[8,21],[9,21],[10,21],[11,22],
  [23,22],[24,22],[25,23],[24,24]
];

const GLOW_TILES = [
  [28,13]
];

function terrainType(x,y){
  const seed = (x*17 + y*31 + x*y*7) % 11;
  if(seed < 2) return "t2";
  if(seed < 6) return "t1";
  return "t0";
}

function isCrater(x,y){
  return CRATER_TILES.some(([cx,cy]) => cx === x && cy === y);
}

function isGlow(x,y){
  return GLOW_TILES.some(([gx,gy]) => gx === x && gy === y);
}
