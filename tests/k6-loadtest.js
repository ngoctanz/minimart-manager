import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '15s', target: 20 },
    { duration: '30s', target: 20 },
    { duration: '15s', target: 0 },
  ],
  thresholds: {
    http_req_duration: ['p(95)<1500'],
  },
};

export default function () {
  const url = 'http://localhost:8081/v1/receipts'; 

  const payload = JSON.stringify({
    branchId: '6a5a3a136e25efa57985192c',
    listProduct: [
      {
        productId: '6a5a472c6e25efa579854523',
        quantity: 1
      }
    ],
    totalAmount: 22000,
    paymentMethod: 'cash',
    customerPaid: 100000
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2YTVhM2ExMzZlMjVlZmE1Nzk4NTE5MmMiLCJyb2xlIjoiYWRtaW4iLCJicmFuY2hJZCI6IjZhNWEzYTEzNmUyNWVmYTU3OTg1MTkyYyIsImlhdCI6MTc4NDk5ODQ0NCwiZXhwIjoxNzg1MDAyMDQ0fQ.rCPScUtBq4RjV94pMklutUraTJsq4Gjczj7AccSxLNA',
    },
  };

  const res = http.post(url, payload, params);

  check(res, {
    'is status 201 (Created)': (r) => r.status === 201 || r.status === 200,
  });

  sleep(1);
}
