import React from 'react';

interface ListProductProps {
  id: number;
  name: string;
  price: number;
  category: string;
  quantity: number;
  images?: string[];
  updateQuantity: (id: number, quantity: number) => void;
  favorite: boolean;
  onToggleFavorite: (id: number) => void;
}

const ListProduct: React.FC<ListProductProps> = ({
  id,
  name,
  price,
  category,
  quantity,
  images,
  updateQuantity,
  favorite,
  onToggleFavorite,
}) => {
  return (
    <div className="list-product mt-4 p-2 d-flex">
      {images && <img src={images[0]} alt={name} className="product-image me-4" />}
      <div className='info flex-fill'>
        <h3>{name}</h3>
        <p>Price: ${price}</p>
        <p>Total: ${price*quantity}</p>
        <p>Category: {category}</p>
      </div>
      <div className='d-flex align-items-center'>
        <button
              className='btn btn-secondary me-4'
              onClick={() => onToggleFavorite(id)}
            >
              {favorite
              ? <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-heart-fill" viewBox="0 0 16 16">
                  <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
                </svg>
              : <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-heart" viewBox="0 0 16 16">
                  <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
                </svg>}
        </button>
      </div>

      <div className='quantity d-flex flex-row flex-end align-items-center'>
        <div>
          <button className='btn btn-secondary flex-fill' onClick={() => updateQuantity(id, -1)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-dash" viewBox="0 0 16 16">
              <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z"/>
            </svg>
          </button>
        </div>

        <h4 className='m-2'>{quantity}</h4>
        <div>
          <button className='btn btn-secondary flex-fill' onClick={() => updateQuantity(id, 1)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus" viewBox="0 0 16 16">
              <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
            </svg>
          </button>
        </div>

      </div>
    </div>
  );
};

export default ListProduct;
