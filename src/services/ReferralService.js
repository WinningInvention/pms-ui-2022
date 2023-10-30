import { getRequest,postRequest,putRequest } from "../_Api/helper";
import Services from "./Services";



const updateReferral = async (_formData) => {
    try {
      let url = 'api/Referal/InsertComment';
      return await Services.postRequest(url, _formData);
    } catch (error) {
      if (error.response.status === 500) {
        throw Error(error.response.data.message);
      }
      throw Error(error.message);
    }
  };

  const referalCommentList = async (referalId) => {
    try {
      let url = 'api/Referal/GetCommentsByReferalId?ReferalId=' + referalId;
      //return getRequest(url).then(res => { return res.data });
      return await Services.getRequest(url);
    } catch (error) {
      if (error.response.status === 500) {
        throw Error(error.response.data.message);
      }
      throw Error(error.message);
    }
  };

  const outlierOutCommentList = async (Id) => {
    try {
      let url = 'api/OutlierOut/GetOutlierOutQueueCommentById?outlierOutQueueId=' + Id;
      //return getRequest(url).then(res => { return res.data });
      return await Services.getRequest(url);
    } catch (error) {
      if (error.response.status === 500) {
        throw Error(error.response.data.message);
      }
      throw Error(error.message);
    }
  };

  const outlierInCommentList = async (Id) => {
    try {
      let url = 'api/OutlierQueueIn/GetOutlierQueueInCommentById?OutlierQueueInId=' + Id;
      //return getRequest(url).then(res => { return res.data });
      return await Services.getRequest(url);
    } catch (error) {
      if (error.response.status === 500) {
        throw Error(error.response.data.message);
      }
      throw Error(error.message);
    }
  };

  const dischangeCommentList = async (Id) => {
    try {
      let url = 'api/Discharge/GetDischargeCommentById?dischargeId=' + Id;
      //return getRequest(url).then(res => { return res.data });
      return await Services.getRequest(url);
    } catch (error) {
      if (error.response.status === 500) {
        throw Error(error.response.data.message);
      }
      throw Error(error.message);
    }
  };


const ReferralService = {
    updateReferral,
    referalCommentList,
    outlierOutCommentList,
    outlierInCommentList,
    dischangeCommentList
};

export default ReferralService;

