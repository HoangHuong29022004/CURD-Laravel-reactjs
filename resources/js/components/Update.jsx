import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function Update() {
    const [item, setItem] = useState({ name: '', price: '' });
    const [successMessage, setSuccessMessage] = useState('');
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const getItem = async () => {
            try {
                const uri = `http://localhost:8000/items/${params.id}/edit`;
                const response = await axios.get(uri);
                setItem(response.data);
            } catch (error) {
                console.error("Failed to fetch item:", error);
            }
        };

        getItem();
    }, [params.id]);

    const updateItem = async (e) => {
        e.preventDefault();
        const uri = `http://localhost:8000/items/${params.id}`;
        try {
            await axios.patch(uri, item);
            setSuccessMessage('Item Updated Successfully!');
            setTimeout(() => {
                setSuccessMessage('');
                navigate('/'); // Replace '/' with your actual route name for the item list
            }, 1000);
        } catch (error) {
            console.error("Failed to update item:", error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setItem(prevItem => ({ ...prevItem, [name]: value }));
    };

    return (
        <div className="container mt-5">
            <div className="card shadow-lg">
                <div className="card-header bg-gradient-primary text-white">
                    <h1 className="card-title text-center">Edit an Item</h1>
                </div>
                <div className="card-body">
                    {successMessage && (
                        <div className="alert alert-success">
                            {successMessage}
                        </div>
                    )}
                    <form onSubmit={updateItem}>
                        <div className="row g-3">
                            <div className="col-md-6">
                                <label htmlFor="itemName" className="form-label">Item Name:</label>
                                <input
                                    type="text"
                                    id="itemName"
                                    name="name"
                                    className="form-control"
                                    value={item.name}
                                    onChange={handleInputChange}
                                    placeholder="Enter item name"
                                    required
                                />
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="itemPrice" className="form-label">Item Price:</label>
                                <input
                                    type="text"
                                    id="itemPrice"
                                    name="price"
                                    className="form-control"
                                    value={item.price}
                                    onChange={handleInputChange}
                                    placeholder="Enter item price"
                                    required
                                />
                            </div>
                        </div>
                        <div className="text-center mt-4">
                            <button type="submit" className="btn btn-primary px-4">Update Item</button>
                        </div>
                    </form>
                    <div className="mt-4 d-flex justify-content-start">
                        <button onClick={() => navigate('/')} className="btn btn-outline-secondary">
                            <i className="bi bi-arrow-left-circle"></i> Return to Items List
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Update;