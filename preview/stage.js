import * as THREE from "three";

export function createStage(palette, shell) {
  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog(palette["space-deep"], 38, 118);

  const camera = new THREE.OrthographicCamera(-10, 10, 10, -10, 0.1, 160);
  camera.position.set(10, 13, 12);

  const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true,
    powerPreference: "high-performance",
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.1;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFShadowMap;
  renderer.domElement.tabIndex = 0;
  renderer.domElement.setAttribute(
    "aria-label",
    "다섯 마을이 있는 복셀 포트폴리오 월드. 방향키로 이동하고 휠로 확대하며 건물에 도착한 뒤 스페이스바로 소개를 열 수 있습니다.",
  );
  shell.append(renderer.domElement);

  scene.add(
    new THREE.HemisphereLight(
      palette["text-primary"],
      palette["space-core"],
      2.6,
    ),
  );
  const sun = new THREE.DirectionalLight(palette["text-primary"], 4.3);
  sun.position.set(-24, 44, 30);
  sun.castShadow = true;
  sun.shadow.mapSize.set(2048, 2048);
  sun.shadow.camera.near = 1;
  sun.shadow.camera.far = 120;
  sun.shadow.camera.left = -80;
  sun.shadow.camera.right = 80;
  sun.shadow.camera.top = 60;
  sun.shadow.camera.bottom = -60;
  scene.add(sun);

  const rim = new THREE.DirectionalLight(palette["accent-cyan"], 2.2);
  rim.position.set(32, 16, -28);
  scene.add(rim);

  return { camera, renderer, scene };
}
