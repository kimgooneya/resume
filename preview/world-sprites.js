const CANVAS_WIDTH = 384;
const CANVAS_HEIGHT = 288;
// allow: SIZE_OK — coordinate-locked pixel silhouettes are one visual asset boundary.

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

export function drawResident(context, region, point, resident = region.resident) {
  const [darkest, dark, mid, light] = region.palette;
  const { x, y } = point;
  fill(context, darkest, x + 2, y + 39, 31, 4);
  fill(context, darkest, x + 6, y + 31, 9, 10);
  fill(context, darkest, x + 22, y + 33, 9, 8);
  fill(context, mid, x + 8, y + 34, 5, 4);
  fill(context, mid, x + 24, y + 35, 5, 3);
  fill(context, darkest, x + 3, y + 12, 29, 21);
  fill(context, dark, x + 7, y + 15, 21, 15);
  fill(context, mid, x + 10, y + 19, 15, 9);
  fill(context, light, x + 8, y + 14, 19, 4);
  fill(context, darkest, x + 5, y + 18, 5, 13);
  fill(context, darkest, x + 27, y + 18, 5, 13);
  fill(context, light, x + 4, y + 29, 4, 4);
  fill(context, light, x + 28, y + 27, 4, 4);
  fill(context, darkest, x + 6, y - 6, 22, 20);
  fill(context, dark, x + 8, y - 9, 18, 7);
  fill(context, mid, x + 11, y - 11, 12, 4);
  fill(context, light, x + 10, y - 2, 14, 10);
  fill(context, darkest, x + 12, y + 1, 3, 3);
  fill(context, darkest, x + 20, y + 1, 3, 3);
  fill(context, mid, x + 16, y + 5, 4, 2);

  switch (resident.sprite) {
    case "researcher":
      fill(context, darkest, x + 28, y + 10, 7, 23);
      fill(context, light, x + 25, y + 14, 8, 15);
      fill(context, mid, x + 27, y + 18, 5, 5);
      fill(context, darkest, x + 10, y, 6, 2);
      fill(context, darkest, x + 19, y, 6, 2);
      fill(context, light, x + 25, y + 28, 5, 4);
      break;
    case "engineer":
      fill(context, darkest, x + 5, y - 14, 24, 7);
      fill(context, mid, x + 8, y - 17, 18, 5);
      fill(context, light, x + 11, y + 18, 8, 12);
      fill(context, darkest, x + 28, y + 13, 6, 18);
      fill(context, mid, x + 30, y + 10, 8, 5);
      fill(context, light, x + 31, y + 11, 5, 2);
      break;
    case "maker":
      fill(context, darkest, x + 34, y + 13, 4, 25);
      fill(context, darkest, x + 28, y + 8, 14, 7);
      fill(context, light, x + 31, y + 10, 8, 3);
      fill(context, light, x + 28, y + 25, 5, 4);
      fill(context, mid, x + 12, y + 20, 12, 10);
      fill(context, light, x + 6, y + 22, 7, 5);
      break;
    case "controller":
      fill(context, darkest, x + 6, y - 20, 4, 17);
      fill(context, darkest, x + 24, y - 20, 4, 17);
      fill(context, light, x + 4, y - 22, 8, 4);
      fill(context, light, x + 22, y - 22, 8, 4);
      fill(context, mid, x + 11, y + 19, 14, 11);
      fill(context, light, x + 28, y + 16, 5, 8);
      break;
    case "guide":
      fill(context, darkest, x + 1, y - 10, 32, 6);
      fill(context, mid, x + 7, y - 15, 20, 7);
      fill(context, darkest, x + 39, y + 4, 4, 32);
      fill(context, darkest, x + 33, y + 5, 16, 14);
      fill(context, light, x + 36, y + 8, 10, 7);
      fill(context, mid, x + 34, y + 18, 14, 3);
      fill(context, light, x + 29, y + 27, 5, 4);
      fill(context, mid, x + 13, y + 18, 12, 13);
      break;
  }
}

export function drawPlayer(context, palette, player, point) {
  const { x, y } = point;
  const [darkest, dark, mid, light] = palette;
  const alternateStep = (player.x + player.y) % 2 === 1;
  const bob = alternateStep ? -1 : 0;
  const bodyY = y + 13 + bob;
  const headY = y - 7 + bob;
  const leftBootX = alternateStep ? x + 5 : x + 8;
  const rightBootX = alternateStep ? x + 22 : x + 19;
  const leftBootY = y + (alternateStep ? 34 : 37);
  const rightBootY = y + (alternateStep ? 37 : 34);
  const leftArmY = bodyY + (alternateStep ? 8 : 6);
  const rightArmY = bodyY + (alternateStep ? 6 : 8);

  fill(context, darkest, x + 2, y + 42, 31, 3);
  fill(context, darkest, leftBootX, leftBootY, 10, 8);
  fill(context, darkest, rightBootX, rightBootY, 10, 8);
  fill(context, mid, leftBootX + 2, leftBootY + 2, 6, 3);
  fill(context, mid, rightBootX + 2, rightBootY + 2, 6, 3);
  fill(context, darkest, x + 6, bodyY + 18, 10, 13);
  fill(context, darkest, x + 20, bodyY + 18, 10, 13);
  fill(context, dark, x + 8, bodyY + 19, 6, 10);
  fill(context, dark, x + 22, bodyY + 19, 6, 10);
  fill(context, darkest, x, leftArmY, 7, 14);
  fill(context, darkest, x + 28, rightArmY, 7, 14);
  fill(context, light, x + 1, leftArmY + 10, 5, 4);
  fill(context, light, x + 29, rightArmY + 10, 5, 4);
  fill(context, darkest, x + 3, bodyY, 29, 23);
  fill(context, dark, x + 7, bodyY + 3, 21, 17);
  fill(context, mid, x + 10, bodyY + 7, 15, 10);
  fill(context, light, x + 8, bodyY + 2, 19, 4);
  fill(context, darkest, x + 6, headY, 23, 22);

  if (player.facing === "down") {
    fill(context, light, x + 9, headY + 5, 17, 12);
    fill(context, dark, x + 9, headY + 2, 17, 5);
    fill(context, dark, x + 9, headY + 6, 5, 5);
    fill(context, darkest, x + 12, headY + 9, 3, 3);
    fill(context, darkest, x + 21, headY + 9, 3, 3);
    fill(context, mid, x + 17, headY + 13, 3, 2);
    fill(context, light, x + 11, headY + 18, 13, 3);
    fill(context, darkest, x + 22, bodyY - 1, 5, 5);
    fill(context, darkest, x + 9, bodyY, 4, 10);
    fill(context, dark, x + 22, bodyY + 6, 8, 8);
    fill(context, light, x + 23, bodyY + 7, 5, 4);
    return;
  }

  if (player.facing === "up") {
    fill(context, dark, x + 9, headY + 3, 17, 13);
    fill(context, mid, x + 11, headY, 13, 5);
    fill(context, darkest, x + 9, headY + 13, 17, 4);
    fill(context, light, x + 11, bodyY - 2, 13, 3);
    fill(context, darkest, x + 11, bodyY + 2, 13, 12);
    fill(context, dark, x + 14, bodyY + 4, 8, 8);
    fill(context, mid, x + 16, bodyY + 7, 5, 4);
    fill(context, light, x + 17, bodyY + 8, 3, 2);
    fill(context, darkest, x + 10, bodyY, 4, 10);
    fill(context, darkest, x + 23, bodyY, 4, 10);
    return;
  }

  const facesLeft = player.facing === "left";
  const faceX = facesLeft ? x + 7 : x + 14;
  const eyeX = facesLeft ? x + 10 : x + 24;
  const packX = facesLeft ? x + 24 : x + 1;
  const deviceX = facesLeft ? x + 1 : x + 29;
  fill(context, light, faceX, headY + 5, 14, 11);
  fill(context, dark, x + 9, headY + 2, 17, 5);
  fill(context, dark, facesLeft ? x + 20 : x + 9, headY + 6, 6, 8);
  fill(context, darkest, eyeX, headY + 9, 3, 3);
  fill(context, mid, facesLeft ? x + 5 : x + 27, headY + 8, 4, 4);
  fill(context, light, x + 11, bodyY - 2, 13, 3);
  fill(context, darkest, packX, bodyY + 1, 8, 12);
  fill(context, dark, packX + 2, bodyY + 3, 5, 8);
  fill(context, darkest, deviceX, bodyY + 5, 6, 8);
  fill(context, light, deviceX + 1, bodyY + 6, 4, 4);
  fill(context, mid, facesLeft ? x : x + 31, bodyY + 15, 4, 3);
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
