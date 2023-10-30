import { getRequest,postRequest,putRequest } from "../_Api/helper";
import Services from "./Services";

const getUserList = async (_perPage, _page, _searchData) => {
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

const createUser = async (data) => {
    try {
        let url = "api/Login/AddNewUser"
      //return postRequest(url, data).then(res => { return res.data });
      return await Services.postRequest(url, data);
    } catch (error) {
      if (error.response.status === 500) {
        throw Error(error.response.data.message);
      }
      throw Error(error.message);
    }
  };

const UserService = {
    getUserList,
    createUser
};

export default UserService;
