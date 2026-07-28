export async function loadProjects() {
  const response = await fetch(
    new URL("./projects.json?v=world2-intro5", import.meta.url),
  );
  if (!response.ok) {
    throw new Error(`프로젝트 소개 데이터를 불러오지 못했습니다: ${response.status}`);
  }
  return response.json();
}
