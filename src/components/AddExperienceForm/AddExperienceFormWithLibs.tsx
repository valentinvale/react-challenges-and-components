import { useState, type ComponentPropsWithoutRef } from "react";
import type { JobExperience } from "./types";
import { useForm, type SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import "../../styles/AddExperienceForm.css";

const months = [
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
] as const;

type FormInput = z.input<typeof FormSchema>;
type FormOutput = z.output<typeof FormSchema>;

const monthField = z.union([z.enum(months), z.literal("")]);

const FormSchema = z
  .object({
    jobTitle: z.string().trim().min(1, { message: "Job title is required" }),
    employmentType: z.enum([
      "",
      "Full-time",
      "Part-time",
      "Internship",
      "Contract",
    ]),
    companyName: z
      .string()
      .trim()
      .min(1, { message: "Company name is required" }),
    isCurrentJob: z.boolean(),
    startMonth: monthField.refine((val) => val !== "", {
      message: "Start month is required",
    }),
    startYear: z
      .string()
      .regex(/^\d{4}$/, { message: "Start year is required" }),
    endMonth: monthField,
    endYear: z.union([z.string().regex(/^\d{4}$/), z.literal("")]),
  })
  .superRefine((data, ctx) => {
    if (data.isCurrentJob) return;

    if (!data.endMonth) {
      ctx.addIssue({
        code: "custom",
        path: ["endMonth"],
        message: "End month is required",
      });
    }

    if (!data.endYear) {
      ctx.addIssue({
        code: "custom",
        path: ["endYear"],
        message: "End year is required",
      });
    }

    if (
      !data.startMonth ||
      !data.startYear ||
      !data.endMonth ||
      !data.endYear
    ) {
      return;
    }

    const start = Number(data.startYear) * 12 + months.indexOf(data.startMonth);
    const end = Number(data.endYear) * 12 + months.indexOf(data.endMonth);

    if (end < start) {
      ctx.addIssue({
        code: "custom",
        path: ["endMonth"],
        message: "End date cannot be before start date",
      });
    }
  });

type AddExperienceFormProps = {
  visible: boolean;
  onSave: (newExperience: JobExperience) => void | Promise<void>;
  onCancel: () => void;
} & ComponentPropsWithoutRef<"form">;

export default function AddExperienceFormWithLibs({
  visible,
  onSave,
  onCancel,
  ...rest
}: AddExperienceFormProps) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    trigger,
    formState: { errors, isSubmitted },
  } = useForm<FormInput, unknown, FormOutput>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      jobTitle: "",
      employmentType: "",
      companyName: "",
      isCurrentJob: false,
      startMonth: "",
      startYear: "",
      endMonth: "",
      endYear: "",
    },
  });

  const [notifyNetwork, setNotifyNetwork] = useState<boolean>(false);

  const onSubmit: SubmitHandler<FormOutput> = async (data) => {
    const {
      jobTitle,
      employmentType,
      companyName,
      isCurrentJob,
      startMonth,
      startYear,
      endMonth,
      endYear,
    } = data;

    const endDate =
      !isCurrentJob && endMonth && endYear
        ? { month: endMonth, year: endYear }
        : undefined;

    const jobExperience: JobExperience = {
      jobTitle,
      ...(employmentType && { employmentType }),
      company: companyName,
      isCurrent: isCurrentJob,
      startDate: {
        month: startMonth,
        year: startYear,
      },
      ...(endDate && { endDate }),
    };

    console.log("Submitting job experience:", jobExperience);
    await onSave(jobExperience);

    reset();

    onCancel();
  };

  return (
    visible && (
      <>
        <div className="form-overlay"></div>
        <form
          className={`${rest.className} add-experience-form`}
          onSubmit={handleSubmit(onSubmit)}
          {...rest}
          noValidate
        >
          <div className="form-header">
            <h2>Add experience</h2>
            <button
              type="button"
              onClick={() => {
                reset();
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
                Turn on to notify your network of key profile changes (such as
                new jobs) and work anniversaries. Updates can take up to 2
                hours. Learn more at{" "}
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
                {...register("jobTitle")}
              />
              {isSubmitted && errors.jobTitle && (
                <span className="form-item-error">
                  <i className="fa-solid fa-circle-xmark"></i>{" "}
                  {errors.jobTitle?.message}
                </span>
              )}
            </div>
            <div className="form-item">
              <label htmlFor="employment-type">Employment type</label>
              <select id="employment-type" {...register("employmentType")}>
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
                {...register("companyName")}
              />
              {isSubmitted && errors.companyName && (
                <span className="form-item-error">
                  <i className="fa-solid fa-circle-xmark"></i>{" "}
                  {errors.companyName?.message}
                </span>
              )}
            </div>
            <div className="form-item form-checkbox">
              <input
                id="current-job"
                type="checkbox"
                {...register("isCurrentJob", {
                  onChange: () => {
                    void trigger(["endMonth", "endYear"]);
                  },
                })}
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
                  {...register("startMonth", {
                    onChange: () => {
                      setValue("endMonth", "", { shouldValidate: true });
                      setValue("endYear", "", { shouldValidate: true });
                    },
                  })}
                >
                  <option value="">Month</option>
                  {months.map((month) => (
                    <option key={month} value={month}>
                      {month}
                    </option>
                  ))}
                </select>
                <select
                  {...register("startYear", {
                    onChange: () => {
                      setValue("endMonth", "", { shouldValidate: true });
                      setValue("endYear", "", { shouldValidate: true });
                    },
                  })}
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
              {isSubmitted && (errors.startMonth || errors.startYear) && (
                <span className="form-item-error">
                  <i className="fa-solid fa-circle-xmark"></i>{" "}
                  {errors.startMonth?.message ?? errors.startYear?.message}
                </span>
              )}
            </div>
            <div className="form-item form-date">
              <label htmlFor="end-date">End date*</label>
              <div className="date-inputs">
                <select
                  id="end-date"
                  disabled={watch("isCurrentJob")}
                  {...register("endMonth")}
                >
                  <option value="">Month</option>
                  {months.map(
                    (month) =>
                      (months.findIndex((m) => m === month) >=
                        months.findIndex((m) => m === watch("startMonth")) ||
                        watch("startYear") !== watch("endYear")) && (
                        <option key={month} value={month}>
                          {month}
                        </option>
                      ),
                  )}
                </select>
                <select
                  disabled={watch("isCurrentJob")}
                  {...register("endYear", {
                    onChange: () => {
                      setValue("endMonth", "", { shouldValidate: true });
                    },
                  })}
                >
                  <option value="">Year</option>
                  {Array.from(
                    { length: 100 },
                    (_, i) => new Date().getFullYear() - i,
                  ).map(
                    (year) =>
                      year >= parseInt(watch("startYear")) && (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      ),
                  )}
                </select>
              </div>
              {isSubmitted &&
                !watch("isCurrentJob") &&
                (errors.endMonth || errors.endYear) && (
                  <span className="form-item-error">
                    <i className="fa-solid fa-circle-xmark"></i>{" "}
                    {errors.endMonth?.message ?? errors.endYear?.message}
                  </span>
                )}
            </div>
          </div>
          <div className="form-footer">
            <button type="submit">Save</button>
          </div>
        </form>
      </>
    )
  );
}
