// import { useCallback } from "react";

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

// export const POSTCALLBACK = useCallback(async () => {
//   try {
//     const response = await fetch(baseURL + link, {
//       method: "POST",
//       body: body,
//       credentials: "include",
//     });
//     const data = await response.json();
//     console.log(" Get Post data => ", data);
//     return data;
//   } catch (error) {
//     console.error("Encounter Error => ", error);
//   }
// });

export const GET = async (link) =>
  fetch(baseURL + link, {
    method: "GET",
    credentials: "include",
  }).then((response) => response.json());
