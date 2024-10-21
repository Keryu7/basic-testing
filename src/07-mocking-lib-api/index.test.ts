import axios, { AxiosInstance } from 'axios';
import { throttledGetDataFromApi } from './index';

type AxiosResponse = {
  data: string;
};

type ApiTestSettings = {
  URL: string;
  Endpoint: string;
  Response: AxiosResponse;
};

jest.mock('lodash', () => ({
  throttle: jest.fn((fn) => fn),
}));

describe('throttledGetDataFromApi', () => {
  const settings: ApiTestSettings = {
    URL: 'https://jsonplaceholder.typicode.com',
    Endpoint: '/todos/1',
    Response: { data: 'response' },
  };

  let axiosInstance: AxiosInstance;

  beforeEach(() => {
    axiosInstance = {
      get: jest.fn().mockResolvedValue(settings.Response),
    } as unknown as AxiosInstance;

    jest.spyOn(axios, 'create').mockReturnValue(axiosInstance);
  });

  test('should create an instance with provided base url', async () => {
    await throttledGetDataFromApi(settings.Endpoint);

    expect(axios.create).toHaveBeenCalledTimes(1);
    expect(axios.create).toHaveBeenCalledWith({ baseURL: settings.URL });
  });

  test('should perform a request to the correct provided url', async () => {
    await throttledGetDataFromApi(settings.Endpoint);

    expect(axiosInstance.get).toHaveBeenCalledTimes(1);
    expect(axiosInstance.get).toHaveBeenCalledWith(settings.Endpoint);
  });

  test('should return response data', async () => {
    const responseData = await throttledGetDataFromApi(settings.Endpoint);

    expect(responseData).toEqual(settings.Response.data);
  });
});
