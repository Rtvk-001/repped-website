import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProductForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    image: null
  });
  const [imagePreview, setImagePreview] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, image: file });
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, price, description, image } = formData;
    if (!name || !price || !description || !image) {
      return toast.error('All fields are required');
    }

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', name);
      formDataToSend.append('price', price);
      formDataToSend.append('description', description);
      formDataToSend.append('image', image);

      const response = await axios.post('http://localhost:5000/api/products/create', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      const { success, message } = response.data;
      if (success) {
        toast.success(message);
        // Clear the form fields
        setFormData({ name: '', price: '', description: '', image: null });
        setImagePreview(null);
      } else {
        toast.error(message);
      }
    } catch (error) {
      toast.error('An error occurred');
    }
  };

  return (
    <div className="container">
      <h1>Add Product</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter product name"
          />
        </div>
        <div>
          <label htmlFor="price">Price</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Enter product price"
          />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter product description"
          />
        </div>
        <div>
          <label htmlFor="image">Image</label>
          <input
            type="file"
            name="image"
            onChange={handleImageChange}
          />
          {imagePreview && (
            <div>
              <img src={imagePreview} alt="Preview" style={{ width: '100px', height: '100px' }} />
            </div>
          )}
        </div>
        <button type="submit">Add Product</button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default ProductForm;
