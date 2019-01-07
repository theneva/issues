interface IssueBase {
  id: number;
  name: string;
  summary: string;
}

export interface IssueSummary extends IssueBase {}

interface CharacterBase {
  id: number;
  name: string;
  description: string;
  alias: string;
}

export interface CharacterSummary extends CharacterBase {}

export interface Issue extends IssueBase {
  characters: CharacterSummary[];
}

export interface Character extends CharacterBase {
  issues: IssueSummary[];
}
