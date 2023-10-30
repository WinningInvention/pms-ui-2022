import { getRequest,postRequest,putRequest } from "../_Api/helper";
import Services from "./Services";

const getZoneList = async (_perPage, _page, _searchData) => {
  try {
    _searchData = encodeURIComponent(JSON.stringify(_searchData));
    let url =  'api/Hospital/GetAllHospital'
    return getRequest(url).then(res => { return res.data });
  } catch (error) {
    if (error.response.status === 500) {
      throw Error(error.response.data.message);
    }
    throw Error(error.message);
  }
};

const createZone = async (data) => {
    try {
        let url = "api/ZoneBed/InsertZoneBed"
      //return postRequest(url, data).then(res => { return res.data });
      return await Services.postRequest(url, data);
    } catch (error) {
      if (error.response.status === 500) {
        throw Error(error.response.data.message);
      }
      throw Error(error.message);
    }
  };

const ZoneService = {
    getZoneList,
    createZone
};

export default ZoneService;
