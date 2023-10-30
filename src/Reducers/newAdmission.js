import { NEW_ADMISSION, RESET_NEW_ADMISSION } from "../Actions";

const initialState = {
    "hospital_Number": "",
    "nhS_Number": "",
    "name": "",
    "age": 0,
    "gender": "",
    "dob": "",
    "post_Code": "",
    "health_board": "",
    "repatriation": false,
    "locationMaster_id": 0,
    "another_Hospital": "",
    "specialityMaster_id": 0,
    "admitting_consultant_name_Id": 0,
    "referring_Staff_name": "",
    "provisional_diagnosis": "",
    "priorityLevelMaster_id": 0,
    "organ_Support_requirements": "",
    "previous_Medical": "",
    "infection_Control_Information": "",
    "icU_Care": false,
    "hospital_area": false,
    "icU_care_Status_id": 0,
    "created_date": "",
    "modified_date": "",
    "is_active": false,
    "hospital_id": 0,
    "ward_Location_ID": 0,
    "hospital_Ward_Location": "string"
  };

export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case NEW_ADMISSION:
          return {
            ...state,
             ...payload,
          };
          case RESET_NEW_ADMISSION:
            return{
              ...state,
              ... initialState
            }
          default:
            return state;
        }
}