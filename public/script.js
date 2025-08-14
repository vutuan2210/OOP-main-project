async function fetchProducts() {
    const name = document.getElementById('name').value;
    const category = document.getElementById('category').value;
    const minPrice = document.getElementById('minPrice').value;
    const maxPrice = document.getElementById('maxPrice').value;

    const res = await fetch(`/api/products?name=${name}&category=${category}&minPrice=${minPrice}&maxPrice=${maxPrice}`);
    const products = await res.json();

    renderProducts(products);
}

function renderProducts(products) {
    const list = document.getElementById('product-list');
    list.innerHTML = '';

    if (products.length === 0) {
        list.innerHTML = '<p>Không tìm thấy sản phẩm</p>';
        return;
    }

    products.forEach(p => {
        const card = document.createElement('div');
        card.classList.add('product-card');
        card.innerHTML = `
            <h3>${p.name}</h3>
            <p>Loại: ${p.category}</p>
            <p>Giá: ${p.price.toLocaleString()} VND</p>
        `;
        list.appendChild(card);
    });
}
document.getElementById('name').addEventListener('input', fetchProducts);
document.getElementById('category').addEventListener('change', fetchProducts);
document.getElementById('minPrice').addEventListener('change', fetchProducts);
document.getElementById('maxPrice').addEventListener('change', fetchProducts);
document.getElementById('filterBtn').addEventListener('click', fetchProducts);
document.getElementById('filterBtn').addEventListener('click', fetchProducts);




// Tải toàn bộ khi mở trang
fetchProducts();
