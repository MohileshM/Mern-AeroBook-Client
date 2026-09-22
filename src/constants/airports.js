// Mirrors backend/seed/seedData.js so the search form works before any API call resolves
export const INDIAN_AIRPORTS = [
  { code: "DEL", city: "Delhi" },
  { code: "BOM", city: "Mumbai" },
  { code: "BLR", city: "Bengaluru" },
  { code: "MAA", city: "Chennai" },
  { code: "CCU", city: "Kolkata" },
  { code: "HYD", city: "Hyderabad" },
  { code: "PNQ", city: "Pune" },
  { code: "AMD", city: "Ahmedabad" },
  { code: "GOI", city: "Goa" },
  { code: "COK", city: "Kochi" },
  { code: "JAI", city: "Jaipur" },
  { code: "LKO", city: "Lucknow" },
  { code: "IXC", city: "Chandigarh" },
  { code: "GAU", city: "Guwahati" },
  { code: "PAT", city: "Patna" },
];

export const formatINR = (amount) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(amount);
