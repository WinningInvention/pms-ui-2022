import { getRequest,postRequest,putRequest } from "../_Api/helper";
import Services from "./Services";

const dsahboardDataList = async () => {
    try {
      let url = 'api/Dashboard/GetGraphValue';
      return await Services.getRequest(url).then(res => { return res });
      //return getRequest(url).then(res => { return res.data });
    } catch (error) {
      if (error.response.status === 500) {
        throw Error(error.response.data.message);
      }
      throw Error(error.message);
    }
  };


const DashboardService = {
    dsahboardDataList
};

export default DashboardService;

