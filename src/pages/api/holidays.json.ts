import type { APIRoute } from "astro"

import { getHolidays } from "@/utils/get-holidays"
 
export const GET: APIRoute = async () => {
  const holidays = await getHolidays()

  return new Response(JSON.stringify(holidays), {
    headers: {
      "content-type": "application/json",
    },
  })
}