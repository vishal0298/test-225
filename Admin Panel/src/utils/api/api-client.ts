/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { QueryCache } from "@tanstack/react-query";
import toast from "react-hot-toast";
// import * as auth from 'auth-provider'

const apiURL = "PASTE_YOUR_URL_HERE";

const queryCache = new QueryCache({
  onError: (error) => {
    console.log(error);
  },
  onSuccess: (data) => {
    console.log(data);
  },
});

async function client(
  endpoint: string,
  {
    data,
    headers: customHeaders,
    ...customConfig
  }: Partial<RequestInit> & { data?: unknown } = {}
) {
  const token = localStorage.getItem("token");
  const config: RequestInit = {
    method: data ? "POST" : "GET",
    body: data ? JSON.stringify(data) : undefined,
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
      "Content-Type": data ? "application/json" : "",
      ...customHeaders,
    },
    ...customConfig,
  };

  return await window
    .fetch(`${apiURL}/${endpoint}`, config)
    .then(async (response) => {
      const data = await response.json();

      if (response.status === 401) {
        queryCache.clear();
        // await auth.logout()
        // refresh the page for them
        toast.error(data?.message);
        // eslint-disable-next-line prefer-promise-reject-errors
        return await Promise.reject({ message: "Please re-authenticate." });
      }
      if (response.ok) {
        return data;
      } else {
        toast.error(data?.message);
        return await Promise.reject(data);
      }
    });
}

export { client };
