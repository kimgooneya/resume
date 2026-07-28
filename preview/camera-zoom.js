export function createZoomController(initialZoom) {
  let targetZoom = null;

  return {
    animateTo(nextZoom) {
      targetZoom = nextZoom;
    },
    cancel() {
      targetZoom = null;
    },
    update(currentZoom, delta, reducedMotion) {
      if (targetZoom === null) return currentZoom;

      const destination = targetZoom;
      const blend = reducedMotion ? 1 : 1 - Math.exp(-delta * 10);
      const nextZoom = currentZoom + (destination - currentZoom) * blend;
      if (Math.abs(nextZoom - destination) >= 0.001) return nextZoom;

      targetZoom = null;
      return destination;
    },
  };
}
