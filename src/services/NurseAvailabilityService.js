import { getRequest,postRequest,putRequest } from "../_Api/helper";
import Services from "./Services";


const createNurseAvailability = async (data) => {
    try {
        let url = "api/NurseTracking/InsertAvailableNurse"
      //return postRequest(url, data).then(res => { return res.data });
      return await Services.postRequest(url, data);
    } catch (error) {
      if (error.response.status === 500) {
        throw Error(error.response.data.message);
      }
      throw Error(error.message);
    }
  };
  const getNurseAvailability = async (_perPage, _page, _searchData) => {
    try {
      _searchData = encodeURIComponent(JSON.stringify(_searchData));
      let url =  'api/NurseTracking/GetAllNurse'
      //return getRequest(url).then(res => { return res.data });
      return await Services.getRequest(url);
    } catch (error) {
      if (error.response.status === 500) {
        throw Error(error.response.data.message);
      }
      throw Error(error.message);
    }
  };

  const getNurseRequiredAvailability = async (_perPage, _page, _searchData) => {
    try {
      _searchData = encodeURIComponent(JSON.stringify(_searchData));
      let url =  'api/NurseTracking/GetRequiredNurseForWeek'
      //return getRequest(url).then(res => { return res.data });
      return await Services.getRequest(url);
    } catch (error) {
      if (error.response.status === 500) {
        throw Error(error.response.data.message);
      }
      throw Error(error.message);
    }
  };

  

  const updateNurseAvailability = async (data) => {
    try {
        let url = "api/NurseTracking/UpdateNurseAvailability"
      //return postRequest(url, data).then(res => { return res.data });
      return await Services.postRequest(url, data);
    } catch (error) {
      if (error.response.status === 500) {
        throw Error(error.response.data.message);
      }
      throw Error(error.message);
    }
  };

const NurseAvailabilityService = {
    createNurseAvailability,
    getNurseAvailability,
    updateNurseAvailability,
    getNurseRequiredAvailability
};

export default NurseAvailabilityService;
