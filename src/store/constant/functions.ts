import {defaultParams, Fetch, newFormData} from '@/utils/fetch';
import {setUserAction} from '@/store/constant/index';
import {global} from '@/global';

export interface LoginParams {
  email: string;
  password: string;
}

export const requestLogin = async (params: LoginParams) => {
  let formData = newFormData({
    ...params,
    ...defaultParams,
    client_secret: global().client_secret,
  });
  const {data} = await Fetch.post('api.base.vn/ajax/mobile/login', formData);
  if (!data) {
    return null;
  }

  setUserAction({
    id: data.client.user_id,
    accessToken: data.client.access_token,
  });
};

export const checkAccessToken = async (access_token: string) => {
  let formData = newFormData({
    access_token,
    client_auth: 1,
    ...defaultParams,
  });
  const {data} = await Fetch.post(
    'message.base.vn/ajax/api/message/message/previous',
    formData,
  );
  return data.httpCode == '200';
};
