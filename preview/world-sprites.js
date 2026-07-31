const CANVAS_WIDTH = 384;
const CANVAS_HEIGHT = 288;

function fill(context, color, x, y, width, height) {
  const left = Math.max(0, x);
  const top = Math.max(0, y);
  const right = Math.min(CANVAS_WIDTH, x + width);
  const bottom = Math.min(CANVAS_HEIGHT, y + height);
  if (left >= right || top >= bottom) return;
  context.fillStyle = color;
  context.fillRect(left, top, right - left, bottom - top);
}

export function drawSign(context, palette, point) {
  const { x, y } = point;
  fill(context, palette[0], x + 7, y + 6, 3, 14);
  fill(context, palette[0], x, y, 18, 9);
  fill(context, palette[2], x + 3, y + 2, 12, 5);
  fill(context, palette[3], x + 11, y + 2, 3, 3);
}

export function drawLandmark(context, region, point) {
  const [darkest, dark, mid, light] = region.palette;
  const { x, y } = point;
  switch (region.landmark.sprite) {
    case "observatory":
      fill(context, darkest, x - 48, y - 4, 112, 24);
      fill(context, dark, x - 42, y, 100, 16);
      fill(context, mid, x - 34, y + 4, 84, 12);
      fill(context, darkest, x - 34, y - 18, 84, 22);
      fill(context, mid, x - 28, y - 15, 72, 18);
      fill(context, darkest, x - 23, y - 39, 62, 26);
      fill(context, dark, x - 17, y - 45, 50, 32);
      fill(context, mid, x - 10, y - 51, 36, 34);
      fill(context, light, x - 3, y - 55, 22, 10);
      fill(context, darkest, x - 7, y - 8, 28, 24);
      fill(context, light, x + 1, y - 3, 12, 12);
      fill(context, darkest, x - 31, y - 12, 13, 16);
      fill(context, light, x - 27, y - 8, 5, 8);
      fill(context, darkest, x + 34, y - 12, 13, 16);
      fill(context, light, x + 38, y - 8, 5, 8);
      fill(context, light, x + 33, y - 42, 7, 29);
      fill(context, darkest, x + 37, y - 51, 31, 8);
      fill(context, dark, x + 55, y - 47, 9, 15);
      fill(context, darkest, x - 40, y + 16, 96, 6);
      break;
    case "tower":
      fill(context, darkest, x - 36, y + 12, 88, 16);
      fill(context, dark, x - 30, y + 5, 76, 15);
      fill(context, darkest, x - 24, y - 36, 64, 47);
      fill(context, dark, x - 18, y - 41, 52, 50);
      fill(context, mid, x - 10, y - 45, 36, 52);
      fill(context, light, x + 2, y - 46, 12, 7);
      for (let row = 0; row < 5; row += 1) {
        fill(context, darkest, x - 13, y - 34 + row * 9, 42, 3);
        fill(context, light, x - 5, y - 31 + row * 9, 9, 5);
        fill(context, light, x + 12, y - 31 + row * 9, 9, 5);
      }
      fill(context, darkest, x - 30, y - 18, 9, 29);
      fill(context, mid, x - 27, y - 13, 4, 18);
      fill(context, darkest, x + 37, y - 24, 10, 35);
      fill(context, light, x + 40, y - 18, 4, 16);
      fill(context, darkest, x - 16, y - 46, 48, 6);
      break;
    case "workshop":
      fill(context, darkest, x - 42, y - 12, 104, 38);
      fill(context, dark, x - 36, y - 7, 92, 28);
      fill(context, mid, x - 29, y - 2, 78, 19);
      fill(context, darkest, x - 48, y - 23, 116, 13);
      fill(context, mid, x - 37, y - 30, 42, 8);
      fill(context, mid, x + 14, y - 30, 43, 8);
      fill(context, darkest, x - 9, y - 19, 30, 12);
      fill(context, light, x - 3, y - 16, 18, 6);
      fill(context, darkest, x - 14, y + 2, 31, 19);
      fill(context, light, x - 6, y + 7, 15, 8);
      fill(context, darkest, x + 38, y - 43, 14, 37);
      fill(context, dark, x + 42, y - 39, 6, 29);
      fill(context, light, x + 40, y - 45, 10, 7);
      fill(context, darkest, x - 33, y - 4, 12, 13);
      fill(context, light, x - 29, y, 5, 6);
      fill(context, darkest, x + 24, y - 4, 12, 13);
      fill(context, light, x + 28, y, 5, 6);
      fill(context, darkest, x - 37, y + 21, 94, 5);
      break;
    case "relay":
      fill(context, darkest, x - 42, y - 4, 96, 30);
      fill(context, dark, x - 36, y, 84, 20);
      fill(context, mid, x - 29, y + 4, 70, 12);
      fill(context, darkest, x - 18, y - 21, 48, 21);
      fill(context, mid, x - 12, y - 17, 36, 13);
      fill(context, light, x - 5, y - 14, 22, 6);
      fill(context, darkest, x + 2, y - 46, 8, 29);
      fill(context, light, x - 31, y - 43, 35, 7);
      fill(context, dark, x - 25, y - 37, 25, 5);
      fill(context, darkest, x - 34, y - 46, 7, 18);
      fill(context, light, x + 10, y - 39, 33, 7);
      fill(context, dark, x + 14, y - 33, 25, 5);
      fill(context, darkest, x + 40, y - 45, 7, 18);
      fill(context, darkest, x - 29, y + 5, 12, 11);
      fill(context, light, x - 25, y + 8, 5, 5);
      fill(context, darkest, x + 30, y + 5, 12, 11);
      fill(context, light, x + 34, y + 8, 5, 5);
      fill(context, darkest, x - 35, y + 20, 82, 6);
      break;
    case "lighthouse":
      fill(context, darkest, x - 54, y + 12, 96, 16);
      fill(context, dark, x - 47, y + 7, 82, 15);
      fill(context, darkest, x - 20, y - 29, 42, 42);
      fill(context, mid, x - 13, y - 24, 28, 36);
      fill(context, light, x - 7, y - 18, 16, 12);
      fill(context, darkest, x - 29, y - 39, 60, 15);
      fill(context, dark, x - 24, y - 45, 50, 12);
      fill(context, light, x - 17, y - 42, 36, 7);
      fill(context, darkest, x - 5, y - 46, 12, 7);
      fill(context, darkest, x - 11, y - 2, 24, 6);
      fill(context, darkest, x - 8, y + 8, 18, 5);
      fill(context, light, x - 54, y - 38, 25, 5);
      fill(context, light, x + 31, y - 38, 25, 5);
      fill(context, darkest, x - 58, y - 41, 8, 11);
      fill(context, darkest, x + 52, y - 41, 8, 11);
      fill(context, darkest, x - 39, y + 2, 15, 10);
      fill(context, mid, x - 35, y + 5, 7, 5);
      fill(context, darkest, x + 24, y + 2, 14, 10);
      fill(context, mid, x + 28, y + 5, 6, 5);
      break;
  }
}

export function drawResident(context, region, point) {
  const [darkest, dark, mid, light] = region.palette;
  const { x, y } = point;
  fill(context, darkest, x, y + 25, 26, 4);
  fill(context, darkest, x + 2, y - 9, 22, 12);
  fill(context, dark, x + 3, y - 14, 18, 12);
  fill(context, mid, x + 6, y - 10, 12, 5);
  fill(context, light, x + 6, y - 3, 12, 8);
  fill(context, darkest, x + 8, y, 3, 3);
  fill(context, dark, x + 2, y + 5, 22, 16);
  fill(context, mid, x + 7, y + 8, 12, 8);
  fill(context, darkest, x + 3, y + 20, 7, 7);
  fill(context, darkest, x + 16, y + 20, 7, 7);
  fill(context, light, x + 21, y + 7, 4, 8);

  switch (region.resident.sprite) {
    case "researcher":
      fill(context, light, x + 17, y + 6, 11, 15);
      fill(context, darkest, x + 25, y + 4, 3, 20);
      fill(context, mid, x + 19, y + 9, 6, 4);
      break;
    case "engineer":
      fill(context, mid, x + 1, y - 16, 23, 5);
      fill(context, light, x + 5, y + 8, 7, 11);
      fill(context, darkest, x + 22, y + 5, 6, 19);
      break;
    case "maker":
      fill(context, mid, x + 5, y + 8, 12, 11);
      fill(context, darkest, x + 22, y + 2, 5, 22);
      fill(context, light, x + 19, y, 9, 7);
      break;
    case "controller":
      fill(context, darkest, x + 1, y - 16, 4, 13);
      fill(context, darkest, x + 20, y - 16, 6, 13);
      fill(context, mid, x + 6, y + 8, 12, 9);
      fill(context, light, x + 23, y + 4, 5, 7);
      break;
    case "guide":
      fill(context, darkest, x, y - 11, 28, 5);
      fill(context, mid, x + 10, y + 7, 12, 14);
      fill(context, darkest, x, y + 1, 4, 23);
      fill(context, light, x, y - 5, 10, 9);
      break;
  }
}

export function drawPlayer(context, palette, player, point) {
  const { x, y } = point;
  fill(context, palette[0], x + 2, y + 7, 12, 2);
  fill(context, palette[0], x + 4, y + 2, 8, 5);
  fill(context, palette[3], x + 5, y + 4, 6, 3);
  fill(context, palette[1], x + 4, y + 8, 8, 6);
  fill(context, palette[2], x + (player.facing === "left" ? 3 : 10), y + 9, 3, 3);
  fill(context, palette[0], x + 4, y + 14, 3, 2);
  fill(context, palette[0], x + 9, y + 14, 3, 2);
}

export function drawMarker(context, palette, point) {
  const { x, y } = point;
  fill(context, palette[3], x, y, 4, 2);
  fill(context, palette[3], x, y, 2, 4);
  fill(context, palette[3], x + 12, y, 4, 2);
  fill(context, palette[3], x + 14, y, 2, 4);
  fill(context, palette[3], x, y + 14, 4, 2);
  fill(context, palette[3], x + 12, y + 14, 4, 2);
}
