import * as yup from "yup"
export const PredictedSchema = yup
  .object()
  .shape({
    predictedDatetime: yup.date().required('Date is required.'),
  }).required();

  

  export const ReadySchema = yup
  .object()
  .shape({
    isPACKOorRecovery: yup.boolean().required('Recovery required.'),
  }).required();