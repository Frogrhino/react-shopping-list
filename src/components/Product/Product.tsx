import React from 'react';

interface ProductProps {
  id: number;
  title: string;
  description: string;
  price: number;
  favorite: boolean;
  images?: string[];
  updateQuantity: (id: number, quantity: number) => void;
  onToggleFavorite: (id: number) => void;
}

const Product: React.FC<ProductProps> = ({
  id,
  title,
  description,
  price,
  favorite,
  images,
  updateQuantity,
  onToggleFavorite,
}) => {
  const onUpdateQuantity = () => {
    updateQuantity(id, 1);
  };

  const handleToggleFavorite = () => {
    onToggleFavorite(id);
  };

  return (
    <div className="product d-flex p-2 mb-4">
      <div className='product-image me-4'>
        {images && <img src={images[0]} alt={title} className="product-image me-4" />}
      </div>
      <div className='d-flex flex-column'>
        <h5 className="product-title">{title}</h5>
        <p className="product-price">${price}</p>
        <div>
          <p className="product-description">{description}</p>
        </div>
        <div className='product-buttons d-flex flex-row'>
          <div className='me-2'>
            <button className="product-button btn btn-secondary" onClick={handleToggleFavorite}>
              {favorite
              ? <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-heart-fill" viewBox="0 0 16 16">
                  <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
                </svg>
              : <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-heart" viewBox="0 0 16 16">
                  <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
                </svg>}
            </button>
          </div>
          <div>
            <button className="product-button btn btn-secondary" onClick={onUpdateQuantity}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-cart2" viewBox="0 0 16 16">
                <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l1.25 5h8.22l1.25-5H3.14zM5 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
