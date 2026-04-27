import { useForm } from "react-hook-form";
import type z from "zod";
import type { createJobSchema } from "../types";
type FormFields = z.infer<typeof createJobSchema>;
const JobForm = () => {
  const { register } = useForm<FormFields>();
  return (
    <form>
      <input type="text" placeholder="Job Title" {...register("title")} />
      <input type="text" placeholder="Company" {...register("company")} />
      <input
        type="date"
        placeholder="Application Date"
        {...register("appliedDate")}
      />
      <select></select>
    </form>
  );
};

export default JobForm;
