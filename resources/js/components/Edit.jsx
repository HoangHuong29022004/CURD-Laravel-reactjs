import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

export default function Edit() {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        fetchItem();
    }, []);

    const fetchItem = async () => {
        const response = await axios.get(`/items/${id}`);
        setName(response.data.name);
        setPrice(response.data.price);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.put(`/items/${id}`, { name, price });
        navigate('/');
    };

    return (
        <div>
            <h2>Chỉnh sửa mục</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Tên</label>
                    <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Giá</label>
                    <input type="text" className="form-control" value={price} onChange={(e) => setPrice(e.target.value)} />
                </div>
                <button type="submit" className="btn btn-primary">Cập nhật</button>
            </form>
        </div>
    );
}