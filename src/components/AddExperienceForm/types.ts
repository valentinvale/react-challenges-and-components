export type Month = "January" | "February" | "March" | "April" | "May" | "June" | "July" | "August" | "September" | "October" | "November" | "December" | undefined

export type EmploymentType = "Full-time" | "Part-time" | "Internship" | "Contract" | undefined

export type JobExperience = {
    jobTitle: string;
    employmentType?: EmploymentType 
    company: string;
    isCurrent: boolean;
    startDate: {
        month: Month;
        year: string;
    };
    endDate?: {
        month: Month;
        year: string;
    }
}