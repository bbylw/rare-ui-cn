"use client";

import {
  GitHubActivity,
  type Contribution,
  type ContributionLevel,
  type RepoContribution,
} from "@/components/ui/github-activity";

const REPOS: RepoContribution[] = [
  { name: "swamimalode07/rare-ui", count: 412 },
  { name: "swamimalode07/portfolio", count: 188 },
  { name: "swamimalode07/motion-lab", count: 96 },
];

function buildContributions(): Contribution[] {
  const days: Contribution[] = [];
  const end = Date.UTC(2026, 8, 27);
  let seed = 20260927;
  const next = () => {
    seed = (seed * 1103515245 + 12345) % 2147483648;
    return seed / 2147483648;
  };

  for (let offset = 26 * 7 - 1; offset >= 0; offset -= 1) {
    const date = new Date(end - offset * 86400000).toISOString().slice(0, 10);
    const roll = next();
    const count = roll > 0.58 ? Math.floor(roll * 24) : 0;
    const level: ContributionLevel =
      count === 0 ? 0 : count < 5 ? 1 : count < 11 ? 2 : count < 17 ? 3 : 4;
    days.push({ date, count, level });
  }

  return days;
}

const CONTRIBUTIONS = buildContributions();

export default function GitHubActivityPreview() {
  return (
    <div className="w-full max-w-xl overflow-x-auto">
      <GitHubActivity
        contributions={CONTRIBUTIONS}
        repos={REPOS}
        year={2026}
        accent="#fc4c01"
        months={6}
        cellSize={12}
        label="贡献最多的仓库"
        defaultOpen
      />
    </div>
  );
}
