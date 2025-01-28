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
  name: string;
  city: string;
  province: string;
}