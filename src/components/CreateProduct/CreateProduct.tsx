import React, { useState } from 'react';
import { Product } from '../../App';

interface CreateProductProps {
  handleAddNewProduct: (newProduct: Product) => void;
  onClose: () => void;
}

const CreateProduct: React.FC<CreateProductProps> = ({handleAddNewProduct: handleAddNewProduct, onClose: handleCloseNewProductModal}) => {
  const [images, setImages] = useState(['']);
  const [title, setTitle] = useState('');
  const [brand, setBrand] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImages([e.target.value]);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleBrandChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBrand(e.target.value);
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(e.target.value);
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };

  const handleCreateProduct = () => {
    const newProduct: Product = {
      images,
      title,
      brand,
      price: Number(price),
      description,
      id: 0,
      discountPercentage: 0,
      rating: 0,
      stock: 0,
      category: '',
      thumbnail: '',
      favorite: false,
      quantity: 0,
    };
    handleAddNewProduct(newProduct);
    setImages(['']);
    setTitle('');
    setBrand('');
    setPrice('');
    setDescription('');
  };

  return (
    <div className="create-product">
        <div className="modal-content">
          <div className="modal-header d-flex justify-content-between mb-2 border-bottom">
            <h2>Create a Product</h2>
            <button className='btn btn-light' onClick={handleCloseNewProductModal}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16">
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
              </svg>
            </button>
          </div>
          <div className="modal-body pb-2 mb-2 border-bottom d-flex flex-column">
            <div className='d-flex justify-content-between'>
              <label className='w-25' htmlFor="image">Image URL:</label>
              <input type="text" className='form-control' id="image" value={images} onChange={handleImageChange} />
            </div>
            <div className='d-flex justify-content-between'>
              <label className='w-25' htmlFor="title">Title:</label>
              <input type="text" className='form-control' id="title" value={title} onChange={handleTitleChange} />
            </div>
            <div className='d-flex justify-content-between'>
              <label className='w-25' htmlFor="brand">Brand:</label>
              <input type="text" className='form-control' id="brand" value={brand} onChange={handleBrandChange} />
            </div>
            <div className='d-flex justify-content-between'>
              <label className='w-25' htmlFor="price">Price:</label>
              <input type="number" className='form-control' id="price" value={price} onChange={handlePriceChange} />
            </div>
            <div className='d-flex justify-content-between'>
              <label className='w-25' htmlFor="description">Description:</label>
              <textarea className='form-control' id="description" value={description} onChange={handleDescriptionChange} />
            </div>
          </div>
          <div className='d-flex justify-content-between'>
            <button className='btn btn-secondary' onClick={handleCloseNewProductModal}>Cancel</button>
            <button className='btn btn-secondary' onClick={handleCreateProduct}>Create Product</button>
          </div>
        </div>
    </div>
  );
};

export default CreateProduct;
