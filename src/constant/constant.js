const baseURL = "http://localhost:3001/api/";

export const POST = async (link, body) =>
  fetch(baseURL + link, {
    method: "POST",
    // redirect: "follow",
    headers: {
      // Accept: "application/json",
      "Content-Type": "application/json",
      "Access-Control-Allow-Headers": true,
    },
    body: JSON.stringify(body),
    credentials: "include",
  }).then((response) => response.json());

export const POSTFORMDATA = async (link, body) =>
  fetch(baseURL + link, {
    method: "POST",
    body: body,
    credentials: "include",
  }).then((response) => response.json());

export const GET = async (link) =>
  fetch(baseURL + link, {
    method: "GET",
  }).then((response) => response.json());
