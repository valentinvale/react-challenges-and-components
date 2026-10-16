import { useState, type ComponentPropsWithoutRef, type FormEvent } from "react";
import type { EmploymentType, JobExperience, Month } from "./types";

import "../../styles/AddExperienceForm.css";

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

  const [notifyNetwork, setNotifyNetwork] = useState<boolean>(false);

  const [submitted, setSubmitted] = useState<boolean>(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);

    const endDate =
      !isCurrentJob && endMonth && endYear
        ? { month: endMonth, year: endYear }
        : undefined;

    if (!jobTitle || !companyName || !startMonth || !startYear) {
      //alert("Please fill in all required fields.");
      console.log(jobTitle, companyName, startMonth, startYear);
      return;
    }

    if (!isCurrentJob && (!endMonth || !endYear)) {
      return;
    }

    if (!isCurrentJob) {
      const start = Number(startYear) * 12 + months.indexOf(startMonth);
      const end = Number(endYear) * 12 + months.indexOf(endMonth!);

      if (end < start) {
        return;
      }
    }

    const jobExperience: JobExperience = {
      jobTitle,
      ...(employmentType && { employmentType }),
      company: companyName,
      isCurrent: isCurrentJob,
      startDate: { month: startMonth, year: startYear },
      ...(endDate && { endDate }),
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
    setSubmitted(false);
    onCancel();
  }

  return (
    visible && (
      <form
        className={`${rest.className} add-experience-form`}
        onSubmit={handleSubmit}
        {...rest}
        noValidate
      >
        <div className="form-header">
          <h2>Add experience</h2>
          <button
            type="button"
            onClick={() => {
              setSubmitted(false);
              onCancel();
            }}
          >
            <i className="fa-solid fa-x"></i>
          </button>
        </div>
        <div className="form-body">
          <div className="notification-container">
            <p className="notification-p">
              <b>Notify network</b>
              <br />
              Turn on to notify your network of key profile changes (such as new
              jobs) and work anniversaries. Updates can take up to 2 hours.
              Learn more at{" "}
              <a className="learn-more-button">sharing profile changes</a>.
            </p>
            <div className="notification-toggle-container">
              <label className="notification-label" htmlFor="notifications">
                {notifyNetwork ? "On" : "Off"}
                <input
                  type="checkbox"
                  id="notifications"
                  className="notification-input"
                  checked={notifyNetwork}
                  onChange={() => setNotifyNetwork(!notifyNetwork)}
                />
                <div className="notification-toggle"></div>
              </label>
            </div>
          </div>
          <div className="indications-container">
            <p className="indications-p">* indicates required</p>
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
            {submitted && !jobTitle && (
              <span className="form-item-error">
                <i className="fa-solid fa-circle-xmark"></i> Title is a required
                field
              </span>
            )}
          </div>
          <div className="form-item">
            <label htmlFor="employment-type">Employment type</label>
            <select
              id="employment-type"
              value={employmentType ?? ""}
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
            {submitted && !companyName && (
              <span className="form-item-error">
                <i className="fa-solid fa-circle-xmark"></i> Company is a
                required field
              </span>
            )}
          </div>
          <div className="form-item form-checkbox">
            <input
              id="current-job"
              type="checkbox"
              checked={isCurrentJob}
              onChange={() => setIsCurrentJob(!isCurrentJob)}
            />
            <label htmlFor="current-job">
              I am currently working in this role
            </label>
          </div>
          <div className="form-item form-date">
            <label htmlFor="start-date">Start date*</label>
            <div className="date-inputs">
              <select
                id="start-date"
                value={startMonth ?? ""}
                onChange={(e) => {
                  e.target.value
                    ? setStartMonth(e.target.value as Month)
                    : setStartMonth(undefined);

                  setEndMonth(undefined);
                  setEndYear("");
                }}
              >
                <option value="">Month</option>
                {months.map((month) => (
                  <option key={month} value={month}>
                    {month}
                  </option>
                ))}
              </select>
              <select
                value={startYear}
                onChange={(e) => {
                  setStartYear(e.target.value);

                  setEndMonth(undefined);
                  setEndYear("");
                }}
              >
                <option value="">Year</option>
                {Array.from(
                  { length: 100 },
                  (_, i) => new Date().getFullYear() - i,
                ).map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
            {submitted && (!startMonth || !startYear) && (
              <span className="form-item-error">
                <i className="fa-solid fa-circle-xmark"></i> Start date is a
                required field
              </span>
            )}
          </div>
          <div className="form-item form-date">
            <label htmlFor="end-date">End date*</label>
            <div className="date-inputs">
              <select
                id="end-date"
                disabled={isCurrentJob}
                value={endMonth ?? ""}
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
                      <option key={month} value={month}>
                        {month}
                      </option>
                    ),
                )}
              </select>
              <select
                disabled={isCurrentJob}
                value={endYear}
                onChange={(e) => {
                  setEndYear(e.target.value);
                  setEndMonth(undefined);
                }}
              >
                <option value="">Year</option>
                {Array.from(
                  { length: 100 },
                  (_, i) => new Date().getFullYear() - i,
                ).map(
                  (year) =>
                    year >= parseInt(startYear) && (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ),
                )}
              </select>
            </div>
            {submitted && !isCurrentJob && (!endMonth || !endYear) && (
              <span className="form-item-error">
                <i className="fa-solid fa-circle-xmark"></i> End date is a
                required field
              </span>
            )}
          </div>
        </div>
        <div className="form-footer">
          <button type="submit">Save</button>
        </div>
      </form>
    )
  );
}
