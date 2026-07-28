import { describe, expect, test } from "bun:test";

import { createZoomController } from "../preview/camera-zoom.js";

describe("camera zoom controller", () => {
  test("preserves a manual wheel zoom after a scripted transition is cancelled", () => {
    // Given: a travel-view transition that was interrupted by a wheel gesture
    const zoom = createZoomController(1);
    zoom.animateTo(2.1);
    zoom.cancel();

    // When: the next animation frame updates the camera
    const actual = zoom.update(1.43, 0.9, false);

    // Then: the manual zoom remains instead of returning to the scripted target
    expect(actual).toBe(1.43);
  });

  test("settles a scripted zoom without overshooting", () => {
    // Given: the overview is transitioning into the travel view
    const zoom = createZoomController(1);
    zoom.animateTo(2.1);

    // When: frames advance
    let actual = 1;
    for (let frame = 0; frame < 120; frame += 1) {
      actual = zoom.update(actual, 1 / 60, false);
    }

    // Then: the target is reached and remains stable
    expect(actual).toBeCloseTo(2.1, 3);
    expect(zoom.update(actual, 1 / 60, false)).toBe(actual);
  });
});
