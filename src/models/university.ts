export interface University {
  id?: number;
  name: string;
  location: string;
  accreditation: string;
}

export interface UniversityMajor {
  id?: number;
  name: string;
}

export interface ScrapedUniversity {
  id: string;
  universityName: string;
  city: string;
  province: string;
  // detailUrl?: string;
  // majors: ScrapedMajor[];
}

export interface ScrapedMajor {
  name: string;
  quota: string;
  applicants: string;
}

export interface UniversityCoba {
  name: string;
}