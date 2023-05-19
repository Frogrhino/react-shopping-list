import React, { useEffect, useState } from 'react';
import Product from './components/Product/Product';
import ListProduct from './components/ListProduct/ListProduct';
import CreateProduct from './components/CreateProduct/CreateProduct';

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
  favorite: boolean;
  quantity: number,
}


function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [newProductModalOpen, setNewProductModalOpen] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [productsPerPage] = useState<number>(4);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = searchResults.slice(indexOfFirstProduct, indexOfLastProduct);

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    setSearchResults(products.filter((product) =>
      product.title.toLowerCase().includes(searchQuery.toLowerCase())
    ));
  }, [searchQuery, products]);

  const fetchProducts = async () => {
    try {
      const response = await fetch('https://dummyjson.com/products', {
        headers: {
          Accept: 'application/json',
        },
      });
      const data = await response.json();
      const productsArray: Product[]= Object.values(data.products);
      setProducts(productsArray.map(product => ({
        ...product,
        favorite: false,
        quantity: 0,
      })));
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleAddProduct = (newProduct: Product) => {
    try {
      fetch('https://dummyjson.com/products/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProduct)
      })
      .then(res => res.json())
      .then(console.log);
      setProducts([...products, newProduct]);
      setNewProductModalOpen(false);
    } catch (error) {
      console.error('Error adding products:', error);
    }
  };

  const handleToggleFavorite = (id: number) => {
    setProducts((prevProducts) => {
      return prevProducts.map((product) => {
        if (product.id === id) {
          return { ...product, favorite: !product.favorite };
        }
        return product;
      });
    });
  };

  const handleOpenNewProductModal = () => {
    setNewProductModalOpen(true);
  };

  const handleCloseNewProductModal = () => {
    setNewProductModalOpen(false);
  };

  const handleDeleteAll = () => {
    setProducts((prevProducts) =>
      prevProducts.map((product) => ({ ...product, quantity: 0 }))
    );
  };

  const updateQuantity = (productId: number, quantity: number) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === productId && !(quantity === -1 && product.quantity === 0) 
        ? { ...product, quantity: product.quantity + quantity } : product
      )
    );
  };

  const calculateTotalPrice = () => {
    let totalPrice = 0;
    products.forEach((product) => {
      totalPrice += product.price * product.quantity;
    });
    return totalPrice;
  };

  const renderListProducts = () => {
    return (products.map((product) => {
      if(product.quantity > 0){
      return(<ListProduct
        key={product.id}
        id={product.id}
        name={product.title}
        price={product.price}
        category={product.category}
        quantity={product.quantity}
        favorite={product.favorite}
        images={product.images}
        onToggleFavorite={handleToggleFavorite}
        updateQuantity={updateQuantity}
      />)}
    }));
  };

  function handleOrder(): void {
    // TODO: send order to backend
  }

  return (
    <div className='shopping-list container d-flex flex-column justify-content-center'>
      <div>
        <h1 className='mb-4 ms-4 mt-4'>My shopping list</h1>
        <div className='container d-flex flex-row'>
          <div className='left container me-4'>
            <div className='searchAndAdd d-flex justify-content-between container p-2 border rounded'>
              <div className='searchBar w-75'>
                <input
                  type="text"
                  className='form-control'
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                  placeholder="Search products..."
                />
              </div>

              <div>
                <button className='addProduct btn btn-primary' onClick={handleOpenNewProductModal}>Add Product</button>
                  {newProductModalOpen && (
                    <dialog open className='rounded border'>
                      <CreateProduct handleAddNewProduct={handleAddProduct} onClose={handleCloseNewProductModal} />
                    </dialog>
                  )}
              </div>
            </div>

            <div className='suggestions mt-4 containter p-2 border rounded d-flex flex-column align-items-end'>
              <div className='d-flex flex-column'>
                {currentProducts.map((product) => (
                  <Product
                    key={product.id}
                    id={product.id}
                    title={product.title}
                    description={product.description}
                    price={product.price}
                    favorite={product.favorite}
                    images={product.images}
                    updateQuantity={updateQuantity}
                    onToggleFavorite={handleToggleFavorite}
                  />
                ))}
              </div>

              <div className="pagination d-flex justify-content-end h-100 align-items-end justify-content-between">
                <div className='d-flex flex-row'>
                  <button
                    className='btn btn-secondary me-2'
                    onClick={() => setCurrentPage(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-left-circle" viewBox="0 0 16 16">
                      <path fill-rule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"/>
                    </svg>
                  </button>
                  <h2 className='me-2 '>{currentPage}</h2>
                  <button
                    className='btn btn-secondary'
                    onClick={() => setCurrentPage(currentPage + 1)}
                    disabled={indexOfLastProduct >= products.length}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-right-circle" viewBox="0 0 16 16">
                      <path fill-rule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className='right container'>
            <div className='p-2 border rounded'>
              <div className='header d-flex justify-content-between align-items-center'>
                <h2>My Products</h2>
                <button className='btn btn-danger' onClick={handleDeleteAll}>Delete All</button>
              </div>
              <div className='listProducts pb-4 border-bottom'>
                {renderListProducts()}
              </div>

              <div className="price pt-4 border-bottom d-flex justify-content-between">
                <p>Total Price:</p>
                <p>${calculateTotalPrice()}</p>
              </div>

              <div className='d-flex justify-content-end'>
                <button className='confirmOrder btn btn-success mt-3' onClick={handleOrder}>Confirm</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
