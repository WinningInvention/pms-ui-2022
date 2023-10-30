import * as yup from "yup"
export const NurseAvailabilitySchema = yup
  .object()
  .shape({
    availabilityDate: yup.string().required('Date is required.'),
    firstShift: yup.string().required('First Shift is required.'),
    secondShift: yup.string().required('Second Shift is required.'),
 }).required();

