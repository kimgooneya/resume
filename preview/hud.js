export function createHud(villages, onSelect, onIntro, onFastTravel) {
  const nav = document.querySelector("#village-nav");
  const projectDetail = document.querySelector("#project-detail");
  const detail = {
    biome: document.querySelector("#detail-biome"),
    title: document.querySelector("#detail-title"),
    role: document.querySelector("#detail-role"),
    copy: document.querySelector("#detail-copy"),
  };
  const journeyStatus = document.querySelector("#journey-status");
  const discoveredCount = document.querySelector("#discovered-count");
  const detailDiscovered = document.querySelector("#detail-discovered");
  const destinationArrow = document.querySelector("#destination-arrow");
  const introTrigger = document.querySelector("#intro-trigger");
  const fastTravelTrigger = document.querySelector("#fast-travel-trigger");
  const zoomLevel = document.querySelector("#zoom-level");
  let lastZoomPercent = -1;
  let selectedVillage = null;

  villages.forEach((village, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.dataset.village = village.id;
    button.setAttribute("aria-pressed", "false");
    button.innerHTML = `<span>${String(index + 1).padStart(2, "0")}</span>${village.label}`;
    button.addEventListener("click", () => onSelect(village.id));
    nav.append(button);
  });

  function setActive(id) {
    nav.querySelectorAll("button").forEach((button) => {
      button.setAttribute("aria-pressed", String(button.dataset.village === id));
    });
  }

  function select(village, project) {
    selectedVillage = village;
    detail.biome.textContent = `${village.biome.toUpperCase()} VILLAGE`;
    detail.title.textContent = village.landmark;
    detail.role.textContent = project.role;
    detail.copy.textContent =
      "직접 걸어가거나 바로 이동해 프로젝트 랜드마크를 발견해보세요.";
    fastTravelTrigger.hidden = false;
    fastTravelTrigger.setAttribute(
      "aria-label",
      `${village.landmark}로 바로 이동`,
    );
    introTrigger.hidden = true;
    projectDetail.classList.add("is-revealed");
  }

  function arrive(village, project) {
    selectedVillage = village;
    detail.biome.textContent = `${village.biome.toUpperCase()} VILLAGE`;
    detail.title.textContent = village.landmark;
    detail.role.textContent = project.role;
    detail.copy.textContent =
      "도착했습니다. 스페이스바를 눌러 소개\u00a0내용을\u00a0열어보세요.";
    fastTravelTrigger.hidden = true;
    introTrigger.hidden = false;
    projectDetail.classList.add("is-revealed");
  }

  function leaveArrival() {
    introTrigger.hidden = true;
    fastTravelTrigger.hidden = !selectedVillage;
  }

  function setDiscovered(count) {
    const total = String(count).padStart(2, "0");
    discoveredCount.textContent = total;
    detailDiscovered.textContent = total;
  }

  function updateJourney(destination, explorer, tileSize) {
    if (!destination) {
      journeyStatus.textContent = "FREE EXPLORATION";
      destinationArrow.style.transform = "rotate(0deg)";
      return;
    }
    const targetX = destination.position.x * tileSize;
    const targetZ = destination.position.z * tileSize;
    const distance = Math.hypot(
      explorer.position.x - targetX,
      explorer.position.z - targetZ,
    );
    journeyStatus.textContent =
      distance < tileSize * 2.8
        ? `${destination.label} 도착`
        : `${destination.label} · ${Math.ceil(distance)}m`;
    const angle =
      Math.atan2(targetX - explorer.position.x, targetZ - explorer.position.z) *
      (180 / Math.PI);
    destinationArrow.style.transform = `rotate(${angle}deg)`;
  }

  function updateZoom(value) {
    const percent = Math.round(value * 100);
    if (percent === lastZoomPercent) return;
    lastZoomPercent = percent;
    zoomLevel.textContent = String(percent);
  }

  introTrigger.addEventListener("click", onIntro);
  fastTravelTrigger.addEventListener("click", onFastTravel);

  return {
    arrive,
    leaveArrival,
    select,
    setActive,
    setDiscovered,
    updateJourney,
    updateZoom,
  };
}
