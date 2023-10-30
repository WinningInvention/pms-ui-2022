import * as yup from "yup"
export const ReferalCommentSchema = yup
  .object()
  .shape({
    referalStatusId: yup.string().required('ICU Care Status is required.'),
    comment: yup.string().required('Comment is required.'),
  }).required();

