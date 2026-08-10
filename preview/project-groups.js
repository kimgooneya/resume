const formatProjectPeriod = (features) => {
  const periods = [...new Set(features.map(({ period }) => period))].sort().reverse();
  return periods.length === 1 ? periods[0] : `${periods.at(-1)} — ${periods[0]}`;
};

const MISCELLANEOUS_PROJECT = "기타";

export const groupCasesByProject = (cases) => {
  const groupedCases = new Map();

  cases.forEach((caseStudy) => {
    const features = groupedCases.get(caseStudy.project);
    if (features) {
      features.push(caseStudy);
      return;
    }
    groupedCases.set(caseStudy.project, [caseStudy]);
  });

  const projectEntries = [...groupedCases.entries()].filter(([title]) => title !== MISCELLANEOUS_PROJECT);
  const miscellaneous = groupedCases.get(MISCELLANEOUS_PROJECT);
  if (miscellaneous) projectEntries.push([MISCELLANEOUS_PROJECT, miscellaneous]);

  return projectEntries.map(([title, features], index) => ({
    number: String(index + 1).padStart(2, "0"),
    title,
    period: formatProjectPeriod(features),
    features,
  }));
};
