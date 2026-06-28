// game.js
// Main startup, controls, player movement, and action pulse.

const grid = document.getElementById("grid");
const board = document.getElementById("board");
const player = document.getElementById("player");
const ufoFeature = document.getElementById("ufoFeature");

const GRID_SIZE = MAP_CONFIG.gridSize;

let playerPos = { ...MAP_CONFIG.startPosition };
let facing = 1;

function buildGrid(){
  grid.innerHTML = "";

  for(let y = 1; y <= GRID_SIZE; y++){
    for(let x = 1; x <= GRID_SIZE; x++){
      const cell = document.createElement("div");
      cell.className = `cell ${terrainType(x,y)}`;

      if(isCrater(x,y)) cell.className = "cell t3";
      if(isGlow(x,y)) cell.classList.add("glow");

      cell.dataset.x = x;
      cell.dataset.y = y;
      grid.appendChild(cell);
    }
  }

  placeFeature(MAP_FEATURES.crashedUfo, ufoFeature, 1.12, 1.08);
  placePlayer();
}

function cellAt(x,y){
  return grid.querySelector(`[data-x="${x}"][data-y="${y}"]`);
}

function placeFeature(feature, element, widthScale = 1, heightScale = 1){
  const tile = board.clientWidth / GRID_SIZE;
  const centerX = ((feature.x - 1) * tile) + (feature.w * tile / 2);
  const centerY = ((feature.y - 1) * tile) + (feature.h * tile / 2);

  element.style.width = `${tile * feature.w * widthScale}px`;
  element.style.height = `${tile * feature.h * heightScale}px`;
  element.style.transform = `translate3d(${centerX}px,${centerY}px,0)`;
}

function placePlayer(){
  const tile = board.clientWidth / GRID_SIZE;
  const centerX = (playerPos.x - .5) * tile;
  const centerY = (playerPos.y - .5) * tile;

  player.style.width = `${tile * 1.35}px`;
  player.style.height = `${tile * 1.72}px`;
  player.style.transform = `translate3d(${centerX}px,${centerY}px,0)`;

  const sprite = document.getElementById("alienSprite");
  sprite.style.transform = `translate(-50%,-70%) scaleX(${facing})`;
}

function move(dx,dy){
  const nextX = Math.max(1, Math.min(GRID_SIZE, playerPos.x + dx));
  const nextY = Math.max(1, Math.min(GRID_SIZE, playerPos.y + dy));

  if(isBlocked(nextX, nextY)) return;

  playerPos.x = nextX;
  playerPos.y = nextY;

  if(dx < 0) facing = -1;
  if(dx > 0) facing = 1;

  placePlayer();
}

function action(){
  const cell = cellAt(playerPos.x, playerPos.y);
  if(!cell) return;

  cell.classList.remove("action-flash");
  void cell.offsetWidth;
  cell.classList.add("action-flash");
}

function bindControls(){
  document.getElementById("leftBtn").addEventListener("click", () => move(-1,0));
  document.getElementById("rightBtn").addEventListener("click", () => move(1,0));
  document.getElementById("upBtn").addEventListener("click", () => move(0,-1));
  document.getElementById("downBtn").addEventListener("click", () => move(0,1));
  document.getElementById("actionBtn").addEventListener("click", action);

  window.addEventListener("keydown", e => {
    if(e.key === "ArrowLeft") move(-1,0);
    if(e.key === "ArrowRight") move(1,0);
    if(e.key === "ArrowUp") move(0,-1);
    if(e.key === "ArrowDown") move(0,1);
    if(e.key === " " || e.key === "Enter") action();
  });

  window.addEventListener("resize", () => {
    placeFeature(MAP_FEATURES.crashedUfo, ufoFeature, 1.12, 1.08);
    placePlayer();
  }, { passive:true });
}

function startGame(){
  player.innerHTML = alienSpriteSvg();
  ufoFeature.innerHTML = crashedUfoSvg();
  buildGrid();
  bindControls();
}

startGame();
