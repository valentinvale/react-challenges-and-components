export type JobExperience = {
    jobTitle: string;
    employmentType?: "Full-time" | "Part-time" | "Internship" | "Contract" 
    company: string;
    isCurrent: boolean;
    startDate: {
        month: "January" | "February" | "March" | "April" | "May" | "June" | "July" | "August" | "September" | "October" | "November" | "December";
        year: string;
    };
    endDate?: {
        month: "January" | "February" | "March" | "April" | "May" | "June" | "July" | "August" | "September" | "October" | "November" | "December";
        year: string;
    }
}