import {global} from '@/global';
import qs from 'query-string';
import axios from 'axios';

export const defaultParams = {
  client_key: global().client_key,
  __code: 'native',
};

export const Fetch = axios.create({
  headers: {
    'Content-Type': 'multipart/form-data',
  },
  transformRequest: (data, headers) => data,
  baseURL: global().baseUrl,
});

export const toUrlEncoded = (obj: {[key: string]: any}) => {
  return qs.stringify(obj);
};

export const newFormData = (
  params: {[key: string]: any},
  images: string[] = [],
  form: FormData = new FormData(),
) => {
  for (let key in params) {
    if (images.includes(key)) {
      form.append('photo', {
        uri: params[key],
        type: 'image/jpg',
        name: 'checkin.jpg',
      });
      continue;
    }
    form.append(key, params[key]);
  }
  return form;
};
