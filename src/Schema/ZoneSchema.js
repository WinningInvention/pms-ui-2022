import * as yup from "yup"
export const ZoneSchema = yup
  .object()
  .shape({
    zoneName: yup.string().required('Zone Name is required.'),
    totalBeds: yup.string().required('Beds is required.'),

  }).required();

