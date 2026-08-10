const formatProjectPeriod = (features) => {
  const periods = [...new Set(features.map(({ period }) => period))].sort().reverse();
  return periods.length === 1 ? periods[0] : `${periods.at(-1)} — ${periods[0]}`;
};

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

  return [...groupedCases.entries()].map(([title, features], index) => ({
    number: String(index + 1).padStart(2, "0"),
    title,
    period: formatProjectPeriod(features),
    features,
  }));
};
