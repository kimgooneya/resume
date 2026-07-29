const DEAD_ZONE = 0.14;
const ZERO_INPUT = Object.freeze({ x: 0, y: 0 });

export function joystickVector(pointer, center, radius) {
  const offsetX = pointer.x - center.x;
  const offsetY = pointer.y - center.y;
  const distance = Math.hypot(offsetX, offsetY);
  if (distance === 0 || radius <= 0) {
    return { input: ZERO_INPUT, thumb: ZERO_INPUT };
  }

  const directionX = offsetX / distance;
  const directionY = offsetY / distance;
  const thumbDistance = Math.min(distance, radius);
  const rawStrength = thumbDistance / radius;
  const strength =
    rawStrength <= DEAD_ZONE
      ? 0
      : (rawStrength - DEAD_ZONE) / (1 - DEAD_ZONE);

  return {
    input: {
      x: directionX * strength,
      y: directionY * strength,
    },
    thumb: {
      x: directionX * thumbDistance,
      y: directionY * thumbDistance,
    },
  };
}

export function mapJoystickToWorld(input) {
  return {
    x: (input.x + input.y) * Math.SQRT1_2,
    z: (input.y - input.x) * Math.SQRT1_2,
  };
}

export function createTouchJoystick(element, onInput) {
  const thumb = element.querySelector(".touch-joystick__thumb");
  let activePointerId = null;

  function publish(input, thumbPosition) {
    element.style.setProperty("--joystick-x", `${thumbPosition.x}px`);
    element.style.setProperty("--joystick-y", `${thumbPosition.y}px`);
    onInput(input);
  }

  function update(event) {
    if (event.pointerId !== activePointerId) return;
    const bounds = element.getBoundingClientRect();
    const thumbBounds = thumb.getBoundingClientRect();
    const radius = (Math.min(bounds.width, bounds.height) - thumbBounds.width) / 2;
    const vector = joystickVector(
      { x: event.clientX, y: event.clientY },
      {
        x: bounds.left + bounds.width / 2,
        y: bounds.top + bounds.height / 2,
      },
      radius,
    );
    publish(vector.input, vector.thumb);
  }

  function reset(event) {
    if (
      activePointerId === null ||
      (event?.pointerId !== undefined && event.pointerId !== activePointerId)
    ) {
      return;
    }
    const pointerId = activePointerId;
    activePointerId = null;
    element.classList.remove("is-active");
    element.setAttribute("aria-pressed", "false");
    publish(ZERO_INPUT, ZERO_INPUT);
    if (element.hasPointerCapture(pointerId)) {
      element.releasePointerCapture(pointerId);
    }
  }

  element.addEventListener("pointerdown", (event) => {
    event.preventDefault();
    if (activePointerId !== null) return;
    activePointerId = event.pointerId;
    element.setPointerCapture(event.pointerId);
    element.classList.add("is-active");
    element.setAttribute("aria-pressed", "true");
    update(event);
  });
  element.addEventListener("pointermove", update);
  element.addEventListener("pointerup", reset);
  element.addEventListener("pointercancel", reset);
  element.addEventListener("lostpointercapture", reset);
  window.addEventListener("blur", reset);

  return { reset };
}
