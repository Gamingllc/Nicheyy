export interface GeneratedIdea {
  title: string;
  description: string;
  category: string;
  howItWorks: string;
  whyPoints: string[];
}

export interface IdeaResponse {
  idea: GeneratedIdea;
}

export interface SavedIdea extends GeneratedIdea {
  id: string;
  customName: string;
  savedAt: number;
}