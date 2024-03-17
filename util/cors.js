export default function handler(req, res, next) {
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Origin", "*");
  
  // If the request method is OPTIONS, it's a preflight request, so respond immediately with 200 OK
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // For all other requests, continue to the next handler
  return next();
}
