import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

export enum HTTP_STATUS {
  OK = 200,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
  NO_CONTENT = 204
}

/**
 * Makes an authenticated GET request to the Jira API
 * @param url The URL to make the request to
 * @param email The email for basic auth
 * @param apiToken The API token for basic auth
 * @param options Additional axios request options
 * @returns The response data
 */
export async function makeGetRequest<T>(
  url: string,
  email: string,
  apiToken: string,
  options: Partial<AxiosRequestConfig> = {}
): Promise<T> {
  try {
    const response: AxiosResponse = await axios({
      method: 'GET',
      url,
      headers: {
        'Authorization': `Basic ${Buffer.from(`${email}:${apiToken}`).toString('base64')}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      ...options
    });

    if (response.status !== HTTP_STATUS.OK) {
      console.log(`Request to ${url} failed with status ${response.status}`);
      throw new Error(`Request failed with status ${response.status}`);
    }

    return response.data as T;
  } catch (error) {
    console.error('HTTP request failed:', error);
    throw error;
  }
}

/**
 * Makes an authenticated DELETE request to the Jira API
 * @param url The URL to make the request to
 * @param email The email for basic auth
 * @param apiToken The API token for basic auth
 * @param options Additional axios request options
 * @returns The response data
 */
export async function makeDeleteRequest<T>(
  url: string,
  email: string,
  apiToken: string,
  options: Partial<AxiosRequestConfig> = {}
) {
  try {
    const response: AxiosResponse = await axios({
      method: 'DELETE',
      url,
      headers: {
        'Authorization': `Basic ${Buffer.from(`${email}:${apiToken}`).toString('base64')}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      ...options
    });

    if (response.status !== HTTP_STATUS.NO_CONTENT) {
      console.log(`Request to ${url} failed with status ${response.status}`);
      throw new Error(`Request failed with status ${response.status}`);
    }

    return response.data as T;
  } catch (error) {
    console.error('HTTP request failed:', error);
    throw error;
  }
}   