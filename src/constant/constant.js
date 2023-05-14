const baseURL = "http://localhost:3001/api/";

export const POST = async (link, body) =>
  fetch(baseURL + link, {
    method: "POST",
    redirect: "follow",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  }).then((response) => response.json());

export const GET = async (link) =>
  fetch(baseURL + link, {
    method: "GET",
  }).then((response) => response.json());
