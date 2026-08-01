const MOVEMENT_CODES = new Set([
  "ArrowUp",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
]);

export function createMovementController(_joystickElement, hooks) {
  const pressed = new Set();

  function read() {
    const up = pressed.has("ArrowUp");
    const down = pressed.has("ArrowDown");
    const left = pressed.has("ArrowLeft");
    const right = pressed.has("ArrowRight");
    if (up || down || left || right) {
      return {
        x: Number(down) - Number(up) + Number(right) - Number(left),
        z: Number(down) - Number(up) + Number(left) - Number(right),
      };
    }
    return { x: 0, z: 0 };
  }

  function reset() {
    pressed.clear();
  }

  window.addEventListener("keydown", (event) => {
    if (!hooks.isEnabled() || !MOVEMENT_CODES.has(event.code)) return;
    event.preventDefault();
    pressed.add(event.code);
    if (event.repeat) return;
    hooks.onStart();
    hooks.onPulse(read());
  });
  window.addEventListener("keyup", (event) => pressed.delete(event.code));
  window.addEventListener("blur", reset);

  return { read, reset };
}
