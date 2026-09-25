// sample-data.ts
import { type JobExperience } from "./types.ts";

export const sampleJobExperiences: JobExperience[] = [
  {
    jobTitle: "Software Engineer",
    employmentType: "Full-time",
    company: "TechCorp Inc.",
    isCurrent: true,
    startDate: { month: "June", year: "2020" },
  },
  {
    jobTitle: "Frontend Developer",
    employmentType: "Contract",
    company: "Creative Solutions Ltd.",
    isCurrent: false,
    startDate: { month: "January", year: "2018" },
    endDate: { month: "May", year: "2020" },
  },
];