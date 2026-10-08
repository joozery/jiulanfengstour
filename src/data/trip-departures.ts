import { popularTours } from "./popular-tours";

// Example departures for preview; replace with confirmed schedules and prices.
export const tripDepartures = popularTours.slice(0, 4).map(tour => [
  { id: "nov", date: "12–17 พ.ย. 2569", price: tour.price ?? 0 },
  { id: "dec", date: "10–15 ธ.ค. 2569", price: (tour.price ?? 0) + 2000 },
  { id: "new-year", date: "29 ธ.ค. 2569–3 ม.ค. 2570", price: (tour.price ?? 0) + 5000 },
]);
// Dates below reflect the sample duration of each tour.
tripDepartures[1][0].date = "12–16 พ.ย. 2569";
tripDepartures[1][1].date = "10–14 ธ.ค. 2569";
tripDepartures[1][2].date = "29 ธ.ค. 2569–2 ม.ค. 2570";
tripDepartures[3][0].date = "12–14 พ.ย. 2569";
tripDepartures[3][1].date = "10–12 ธ.ค. 2569";
tripDepartures[3][2].date = "30 ธ.ค. 2569–1 ม.ค. 2570";

