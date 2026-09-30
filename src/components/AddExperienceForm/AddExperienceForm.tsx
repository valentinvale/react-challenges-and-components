import { useState, type ComponentPropsWithoutRef, type FormEvent } from "react";
import type { EmploymentType, JobExperience, Month } from "./types";

type AddExperienceFormProps = {
  visible: boolean;
  onSave: (newExperience: JobExperience) => void | Promise<void>;
  onCancel: () => void;
} & ComponentPropsWithoutRef<"form">;

export default function AddExperienceForm({
  visible,
  onSave,
  onCancel,
  ...rest
}: AddExperienceFormProps) {
  const months: string[] = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const [jobTitle, setJobTitle] = useState<string>("");
  const [employmentType, setEmploymentType] =
    useState<EmploymentType>(undefined);
  const [companyName, setCompanyName] = useState<string>("");
  const [isCurrentJob, setIsCurrentJob] = useState<boolean>(false);
  const [startMonth, setStartMonth] = useState<Month>(undefined);
  const [startYear, setStartYear] = useState<string>("");
  const [endMonth, setEndMonth] = useState<Month>(undefined);
  const [endYear, setEndYear] = useState<string>("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const endDate = endMonth && endYear ? { endMonth, endYear } : undefined;

    if (!jobTitle || !companyName || !startMonth || !startYear) {
      alert("Please fill in all required fields.");
      console.log(jobTitle, companyName, startMonth, startYear);
      return;
    }

    const jobExperience: JobExperience = {
      jobTitle,
      ...(employmentType && { employmentType }),
      company: companyName,
      isCurrent: isCurrentJob,
      startDate: { month: startMonth, year: startYear },
      ...(endDate && { endDate: { month: endMonth, year: endYear } }),
    };

    console.log("Submitting job experience:", jobExperience);
    await onSave(jobExperience);
    setJobTitle("");
    setEmploymentType(undefined);
    setCompanyName("");
    setIsCurrentJob(false);
    setStartMonth(undefined);
    setStartYear("");
    setEndMonth(undefined);
    setEndYear("");

    onCancel();
  }

  return (
    visible && (
      <form onSubmit={handleSubmit} {...rest}>
        <div className="form-header">
          <h2>Add experience</h2>
          <button type="button" onClick={onCancel}>
            Close
          </button>
        </div>
        <div className="form-item">
          <label htmlFor="job-title">Title*</label>
          <input
            id="job-title"
            type="text"
            placeholder="Ex: Retail Sales Manager"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
          />
        </div>
        <div className="form-item">
          <label htmlFor="employment-type">Employment type</label>
          <select
            id="employment-type"
            value={employmentType}
            onChange={(e) =>
              e.target.value
                ? setEmploymentType(e.target.value as EmploymentType)
                : setEmploymentType(undefined)
            }
          >
            <option value="">Please select</option>
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Internship">Internship</option>
            <option value="Contract">Contract</option>
          </select>
        </div>
        <div className="form-item">
          <label htmlFor="company-name">Company or organization*</label>
          <input
            id="company-name"
            type="text"
            placeholder="Ex: Microsoft"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
          />
        </div>
        <div className="form-item">
          <label htmlFor="current-job">
            I am currently working in this role
          </label>
          <input
            id="current-job"
            type="checkbox"
            checked={isCurrentJob}
            onChange={() => setIsCurrentJob(!isCurrentJob)}
          />
        </div>
        <div className="form-item form-date">
          <label htmlFor="start-date">Start date*</label>
          <div className="date-inputs">
            <select
              id="start-date"
              value={startMonth}
              onChange={(e) =>
                e.target.value
                  ? setStartMonth(e.target.value as Month)
                  : setStartMonth(undefined)
              }
            >
              <option value="">Month</option>
              {months.map((month) => (
                <option value={month}>{month}</option>
              ))}
            </select>
            <select
              value={startYear}
              onChange={(e) => setStartYear(e.target.value)}
            >
              <option value="">Year</option>
              {Array.from(
                { length: 100 },
                (_, i) => new Date().getFullYear() - i,
              ).map((year) => (
                <option value={year}>{year}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="form-item form-date">
          <label htmlFor="end-date">End date*</label>
          <div className="date-inputs">
            <select
              id="end-date"
              disabled={isCurrentJob}
              value={endMonth}
              onChange={(e) =>
                e.target.value
                  ? setEndMonth(e.target.value as Month)
                  : setEndMonth(undefined)
              }
            >
              <option value="">Month</option>
              {months.map(
                (month) =>
                  (months.findIndex((m) => m === month) >=
                    months.findIndex((m) => m === startMonth) ||
                    startYear !== endYear) && (
                    <option value={month}>{month}</option>
                  ),
              )}
            </select>
            <select
              disabled={isCurrentJob}
              value={endYear}
              onChange={(e) => setEndYear(e.target.value)}
            >
              <option value="">Year</option>
              {Array.from(
                { length: 100 },
                (_, i) => new Date().getFullYear() - i,
              ).map(
                (year) =>
                  year >= parseInt(startYear) && (
                    <option value={year}>{year}</option>
                  ),
              )}
            </select>
          </div>
        </div>
        <button type="submit">Submit</button>
      </form>
    )
  );
}
