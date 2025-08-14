// server.js
const express = require('express');
const path = require('path');
const Product = require('./product');

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, 'public')));

const products = [
    new Product("Laptop Dell XPS 13", "Laptop", 28000000),
    new Product("MacBook Air M2", "Laptop", 32000000),
    new Product("iPhone 14 Pro", "Điện thoại", 27000000),
    new Product("Samsung Galaxy S23", "Điện thoại", 21000000),
    new Product("Tai nghe Sony WH-1000XM5", "Phụ kiện", 8500000),
    new Product("Chuột Logitech MX Master 3S", "Phụ kiện", 2500000),
    new Product("Bàn phím Keychron K2", "Phụ kiện", 2200000),
    new Product("Màn hình LG UltraWide 34''", "Màn hình", 14500000),
    new Product("Màn hình Dell U2723QE", "Màn hình", 16000000),
    new Product("Loa Bluetooth JBL Charge 5", "Phụ kiện", 3800000),
    new Product("Apple Watch Series 9", "Đồng hồ thông minh", 11000000),
    new Product("Kindle Paperwhite", "Thiết bị đọc sách", 3500000)
];


// API lọc sản phẩm
app.get('/api/products', (req, res) => {
    let { name, category, minPrice, maxPrice } = req.query;

    minPrice = parseInt(minPrice) || 0;
    maxPrice = parseInt(maxPrice) || Number.MAX_SAFE_INTEGER;

    const filtered = products.filter(p => {
        return (
            (!name || p.name.toLowerCase().includes(name.toLowerCase())) &&
            (!category || p.category.toLowerCase().includes(category.toLowerCase())) &&
            p.price >= minPrice &&
            p.price <= maxPrice
        );
    });

    res.json(filtered);
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
