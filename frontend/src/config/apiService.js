import Axios from "axios";
import { toast } from "react-toastify";
// import Cache from "../utils/common/cache";
// import { AppBaseError }  from "../utils/common/app_errors";
// import { AppConstant } from '../utils/common/app_constant';


const instance = Axios.create({
  // baseURL: process.env.REACT_APP_BASE_URL
  baseURL: "http://localhost:3001/"
});

// instance.defaults.headers.common['Authorization'] = `Bearer ${Cache.getToken()}`;


export async function get(url) {
  try {
    const response = await instance.get(url, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    return response.data
  } catch (error) {
    //throw (errorHandler(error));
    toast.error(error.response.data.message)

    throw (error);
  }
}

export async function postWith200Check(url, data) {
  try {
    const response = await instance.post(url, data, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (response.data['statusCode'] === '200' || response.data['statusCode'] === 200) {
      return response.data;
    } else {
      //   throw AppBaseError.unknown(response.data['statusCode'], response.data['statusMessage'] ?? AppConstant.httpError);
    }
  } catch (error) {
    toast.error(error.response.data.message)

    //throw (errorHandler(error));
    throw (error);
  }
}
export async function post(url, data) {
  try {
    const response = await instance.post(url, data, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    return response.data
  } catch (error) {
    toast.error(error.response.data.message)

    //throw (errorHandler(error));
    throw (error);
  }
}

export async function postforfile(url, data) {
  try {
    const response = await instance.post(url, data, {
      headers: {
        'Content-Type': 'application/pdf'
      }
    });

    return response.data
  } catch (error) {
    toast.error(error.response.data.message)
    //throw (errorHandler(error));
    throw (error);
  }
}
export async function postfordownload(url, data) {
  try {
    const response = await instance.post(url, data, {

      headers: {
        'Content-Type': 'application/json'
      },
    });

    return response.data
  } catch (error) {
    toast.error(error.response.data.message)

    //throw (errorHandler(error));
    // toast.error(error.response.data.message)
    throw (error);

  }
}


export async function patch(url, data) {
  try {
    const response = await instance.patch(url, data, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    return response.data
  } catch (error) {
    //throw (errorHandler(error));
    toast.error(error.response.data.message)
    throw (error);
  }
}
export async function postCancellable(url, data, ctrl) {
  try {
    const response = await instance.post(url, data, {
      signal: ctrl.signal,
      headers: {
        'Content-Type': 'application/json'
      }
    });

    return response.data
  } catch (error) {
    //throw (errorHandler(error));
    toast.error(error.response.data.message)

    throw (error);
  }
}
export async function postForm(url, data) {
  try {
    const response = await instance.postForm(url, data);

    return response.data
  } catch (error) {
    //throw (errorHandler(error));
    toast.error(error.response.data.message)

    throw (error);
  }
}

export async function upload(url, data, onUpload) {
  try {
    const response = await instance.post(url, data, {

      onUploadProgress: function (e) {
        console.log((e?.progress * 100).toFixed(2));
        onUpload(e);
      },

      /*{
        loaded: number;
        total?: number;
        progress?: number;
        bytes: number; 
        estimated?: number;
        rate?: number; // download speed in bytes
        download: true; // download sign
      }*/
    });
    return response.data
  } catch (error) {
    //throw (errorHandler(error));
    toast.error(error.response.data.message)

    throw (error);
  }
}

// function errorHandler(error) {
//   return error?.description ?? (error?.message ?? AppConstant.httpError);
// }