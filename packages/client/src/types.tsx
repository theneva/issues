interface IssueBase {
  id: number;
  name: string;
  summary: string;
  released: string;
  previousIssueId: number;
  nextIssueId: number;
}

export interface IssueSummaryType extends IssueBase {}

interface CharacterBase {
  id: number;
  name: string;
  description: string;
  alias: string;
}

export interface CharacterSummaryType extends CharacterBase {}

export interface IssueType extends IssueBase {
  characters: CharacterSummaryType[];
}

export interface CharacterType extends CharacterBase {
  issues: IssueSummaryType[];
}
