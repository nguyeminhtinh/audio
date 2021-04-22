import { create } from 'apisauce';

class HttpService {
  client = null;

  constructor(options) {
    this.client = create({
      baseURL: process.env.REACT_APP_API_URL,
      headers: {
        'Content-Type': 'application/json',
      },
      ...options,
    });
    this.client.axiosInstance.interceptors.response.use(
      this.onResponseSuccess,
      this.onResponseError
    );
  }

  onResponseSuccess = (response) => {
    return response;
  };
  // console.log(this.client);

  onResponseError = (err) => {
    const status = err.status || err.response.status;
    if (status === 403 || status === 401) {
      // eslint-disable-next-line no-alert
      alert('no auth');
    }

    if (status >= 500 || status === 400) {
      console.error('[axios-global]invalid request');
    }
    return Window.Promise.reject(err);
  };

  get(path, config) {
    return this.client.get(path, config);
  }

  post(path, config) {
    return this.client.post(path, config);
  }

  delete(path, config) {
    return this.client.delete(path, config);
  }
}

const httpService = new HttpService();
export default httpService;
