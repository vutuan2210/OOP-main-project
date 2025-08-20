
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

// Debounce function call api sau 300ms kể từ lần nhập cuối cùng
function debounce(fn, delay) {
    let timeoutId;
    return function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => fn.apply(this, args), delay);
    };
}

const fetchProductsDebounced = debounce(fetchProducts, 300);

document.getElementById('name').addEventListener('input', fetchProductsDebounced);
document.getElementById('category').addEventListener('change', fetchProductsDebounced);
document.getElementById('minPrice').addEventListener('change', fetchProductsDebounced);
document.getElementById('maxPrice').addEventListener('change', fetchProductsDebounced);
document.getElementById('filterBtn').addEventListener('click', fetchProducts);

// Tải toàn bộ khi mở

fetchProducts()