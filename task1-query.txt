SELECT SUM(amount) AS total_sales_march
FROM orders
WHERE strftime('%Y-%m', order_date) = '2024-03';
