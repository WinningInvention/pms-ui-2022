import * as yup from "yup"
export const PatientUpdateSchema = yup
  .object()
  .shape({
    isSpecialist: yup.boolean().required('required.'),
    provisionaldiagnosis: yup.string().required('Beds is required.'),

  }).required();

