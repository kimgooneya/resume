import {
  createTouchJoystick,
  mapJoystickToWorld,
} from "./touch-joystick.js?v=touch-stick1";

const MOVEMENT_CODES = new Set([
  "ArrowUp",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "KeyW",
  "KeyA",
  "KeyS",
  "KeyD",
]);

export function createMovementController(joystickElement, hooks) {
  const pressed = new Set();
  let joystickInput = { x: 0, y: 0 };

  function read() {
    const up = pressed.has("ArrowUp") || pressed.has("KeyW");
    const down = pressed.has("ArrowDown") || pressed.has("KeyS");
    const left = pressed.has("ArrowLeft") || pressed.has("KeyA");
    const right = pressed.has("ArrowRight") || pressed.has("KeyD");
    if (up || down || left || right) {
      return {
        x: Number(down) - Number(up) + Number(right) - Number(left),
        z: Number(down) - Number(up) + Number(left) - Number(right),
      };
    }
    return mapJoystickToWorld(joystickInput);
  }

  const joystick = createTouchJoystick(joystickElement, (input) => {
    const started = joystickInput.x === 0 && joystickInput.y === 0;
    joystickInput = input;
    if (input.x === 0 && input.y === 0) return;
    if (started) hooks.onStart();
    hooks.onPulse(read());
  });

  function reset() {
    pressed.clear();
    joystickInput = { x: 0, y: 0 };
    joystick.reset();
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
