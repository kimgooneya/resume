import { describe, expect, test } from "bun:test";

import { VILLAGES } from "../preview/world-data.js";

describe("project introduction content", () => {
  test("defines a complete JSON introduction for every village", async () => {
    // Given: the JSON content boundary
    const file = Bun.file(new URL("../preview/projects.json", import.meta.url));

    // When: portfolio content is inspected
    const exists = await file.exists();

    // Then: every landmark has structured introduction content
    expect(exists).toBe(true);
    const projects = await file.json();
    expect(Object.keys(projects).sort()).toEqual(
      VILLAGES.map(({ id }) => id).sort(),
    );
    for (const project of Object.values(projects)) {
      expect(project.title.length).toBeGreaterThan(0);
      expect(project.role.length).toBeGreaterThan(0);
      expect(project.summary.length).toBeGreaterThan(0);
      expect(project.highlights).toHaveLength(3);
      expect(project.stack.length).toBeGreaterThan(1);
    }
  });
});
