const axios = require('axios');
const MockAdapter = require('axios-mock-adapter');
import { makeGetRequest, makeDeleteRequest, HTTP_STATUS } from '../../src/utils/http';

// Create a mock instance of axios
const mockAxios = new MockAdapter(axios);

describe('makeGetRequest', () => {
  const mockUrl = 'https://example.com/api';
  const mockEmail = 'test@example.com';
  const mockApiToken = 'test-token';
  const mockOptions = { params: { key: 'value' } };

  beforeEach(() => {
    mockAxios.reset();
  });

  it('should make a GET request and return data on success', async () => {
    const mockResponseData = { key: 'value' };

    // Mock a successful GET request
    mockAxios.onGet(mockUrl, mockOptions).reply(HTTP_STATUS.OK, mockResponseData);

    const result = await makeGetRequest(mockUrl, mockEmail, mockApiToken, mockOptions);

    expect(result).toEqual(mockResponseData);
  });

  it('should throw an error if the GET request fails with a non-200 status', async () => {
    // Mock a failed GET request
    mockAxios.onGet(mockUrl).reply(HTTP_STATUS.BAD_REQUEST);

    await expect(makeGetRequest(mockUrl, mockEmail, mockApiToken)).rejects.toThrow(
      `Request failed with status code ${HTTP_STATUS.BAD_REQUEST}`
    );
  });

  it('should throw an error if the GET request encounters an exception', async () => {
    // Mock a network error
    mockAxios.onGet(mockUrl).networkError();

    await expect(makeGetRequest(mockUrl, mockEmail, mockApiToken)).rejects.toThrow(
      'Network Error'
    );
  });
});

describe('makeDeleteRequest', () => {
  const mockUrl = 'https://example.com/api';
  const mockEmail = 'test@example.com';
  const mockApiToken = 'test-token';
  const mockOptions = { params: { key: 'value' } };

  beforeEach(() => {
    mockAxios.reset();
  });

  it('should make a DELETE request and return data on success', async () => {
    const mockResponseData = { key: 'value' };

    // Mock a successful DELETE request
    mockAxios.onDelete(mockUrl, mockOptions).reply(HTTP_STATUS.NO_CONTENT, mockResponseData);

    const result = await makeDeleteRequest(mockUrl, mockEmail, mockApiToken, mockOptions);

    expect(result).toEqual(mockResponseData);
  });

  it('should throw an error if the DELETE request fails with a non-204 status', async () => {
    // Mock a failed DELETE request
    mockAxios.onDelete(mockUrl).reply(HTTP_STATUS.BAD_REQUEST);

    await expect(makeDeleteRequest(mockUrl, mockEmail, mockApiToken)).rejects.toThrow(
      `Request failed with status code ${HTTP_STATUS.BAD_REQUEST}`
    );
  });

  it('should throw an error if the DELETE request encounters an exception', async () => {
    // Mock a network error
    mockAxios.onDelete(mockUrl).networkError();

    await expect(makeDeleteRequest(mockUrl, mockEmail, mockApiToken)).rejects.toThrow(
      'Network Error'
    );
  });
});