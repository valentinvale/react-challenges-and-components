export type JobExperience = {
    jobTitle: string;
    employmentType: string;
    company: string;
    isCurrent: boolean;
    startDate: {
        month: string;
        year: string;
    };
    endDate?: {
        month: string;
        year: string;
    }
}