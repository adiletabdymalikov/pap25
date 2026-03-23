import { useEffect, useState } from "react";
import LeftSidebar from "../components/left-sidebar";
import { products, categories } from "../data/products";
import 'bootstrap/dist/css/bootstrap.min.css';
const Products = () => {
    const [product, setProducts] = useState([]);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');

    const fetchProducts = () => {
        setProducts(products);
    }
    const searchProducts = (searchText) => {
         const search = product.filter((p) => p.name.toLowerCase().includes(searchText.toLowerCase()));
        if(search.length > 0){
            setProducts(search);
        }else{
            fetchProducts();
        }
    }

    const addProduct = () => {
        const newProduct = {
            id: product.length + 1,
            name,
            description,
            price,
            category,
        };
        alert('Product added!');
        setProducts([...product, newProduct]);
        console.log(product);
    }

    const deleteProduct = (id) => {
        setProducts(product.filter((p) => p.id !== id));
    }
    useEffect(() => {
        fetchProducts();
    }, []);
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-3">
                    <LeftSidebar />
                </div>
                <div className="col-9">
                    {/* <table>
                        <thead>
                            <tr>
                                <th>Фото</th>
                                <th>Название</th>
                                <th>Описание</th>
                                <th>Цена</th>
                                <th>Категория</th>
                                <th>Бренд</th>
                                <th>Наличие</th>
                                <th>Действие</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.length > 0 &&
                                products.map((product) => {
                                    const category = categories.find(c => c.id === product.category_id)?.name || 'Неизвестно';
                                    return (
                                        <tr key={product.id}>
                                            <td>
                                                <img
                                                    src={product.image}
                                                    alt={product.name}
                                                    style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                                                />
                                            </td>
                                            <td>{product.name}</td>
                                            <td>{product.description}</td>
                                            <td>{product.price} сом</td>
                                            <td>{category}</td>
                                            <td>{product.brand || '-'}</td>
                                            <td>{product.stock != null ? product.stock : '-'}</td>
                                            <td>
                                                <button>Details</button>
                                            </td>
                                        </tr>
                                    );
                                })
                            }
                        </tbody>
                    </table> */}
                    <div className="row">
                        <div className="col-6">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Название"
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className="col-6">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Описание"
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>
                        <div className="col-6">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Цена"
                                onChange={(e) => setPrice(e.target.value)}
                            />
                        </div>
                        <div className="col-6">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Категория"
                                onChange={(e) => setCategory(e.target.value)}
                            />
                        </div>
                        <div className="col-6">
                            <button className="btn btn-primary" onClick={addProduct}>Добавить</button>
                        </div>
                    </div>



                    <h1>Список продуктов</h1>

                    <div className="row">
                        <div className="col-6">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Поиск"
                                onChange={(e) => searchProducts(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="row">
                        {product.length > 0 ?
                            <>
                                {product.map((i) =>
                                    <div className="col-3 bg-light p-2">
                                        <div className="product-item">
                                            <h2>{i.name}</h2>
                                            <p>{i.description}</p>
                                            <p><strong>Цена:</strong> {i.price} руб.</p>
                                            <p><strong>Категория:</strong> {
                                                categories.find(c => c.id === i.category_id)?.name || 'Неизвестно'
                                            }</p>
                                            <p><strong>Бренд:</strong> {i.brand}</p>
                                            <p><strong>На складе:</strong> {i.stock} шт.</p>
                                            <button className="btn btn-danger" onClick={() => deleteProduct(i.id)}>Удалить</button>
                                        </div>
                                    </div>
                                )
                                }

                            </>
                            :

                            <div className="col-12">
                                <p>Нет продуктов</p>
                            </div>

                        }
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Products;