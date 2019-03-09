import axios from 'axios';

const baseUrl = process.env.API_BASE || '';

const parseUrl = (url, params = {}) => {
  const str = Object.keys(params).reduce((result, key) => {
    const res = `${result}${key}=${params[key]}&`;
    return res;
  }, '');
  return `${baseUrl}/api/${url}?${str.substr(0, str.length - 1)}`;
}

export const get = (url, params) => new Promise((resolve, reject) => {
  axios.get(parseUrl(url, params))
    .then((resp) => {
      const { data } = resp;
      if (data && data.success === true) {
        resolve(data);
      } else {
        reject(data);
      }
    })
    .catch(reject)
  // .catch(err => {
  //   if (err.response) {
  //     reject(err.response.data);
  //   } else {
  //     reject({
  //       success: false,
  //       err_msg: error.message,
  //     })
  //   }
  // })
})

export const post = (url, params, postData) => new Promise((resolve, reject) => {
  axios.post(parseUrl(url, params), postData)
    .then((resp) => {
      const { data } = resp;
      if (data && data.success === true) {
        resolve(data);
      } else {
        reject(data);
      }
    })
    .catch(reject)
})
