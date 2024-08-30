import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

function Create() {
    const [item, setItem] = useState({ name: '', price: '' }); // State cho item
    const [successMessage, setSuccessMessage] = useState(''); // State cho thông báo thành công
    const navigate = useNavigate(); // Hook để điều hướng

    // Xử lý khi gửi form
    const addItem = async (e) => {
        e.preventDefault(); // Ngăn chặn việc gửi form mặc định
        const uri = 'http://localhost:8000/items'; // Địa chỉ API

        try {
            await axios.post(uri, item); // Gửi yêu cầu POST để thêm item
            setSuccessMessage('Thêm item thành công!'); // Đặt thông báo thành công
            setTimeout(() => {
                setSuccessMessage(''); // Xóa thông báo thành công sau 1 giây
                navigate('/'); // Điều hướng trở lại danh sách item
            }, 1000);
        } catch (error) {
            console.error('Lỗi khi thêm item:', error); // Ghi log lỗi nếu có
        }
    };

    // Xử lý khi có thay đổi input
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setItem(prevItem => ({ ...prevItem, [name]: value })); // Cập nhật state với giá trị input mới
    };

    return (
        <div className="container mt-5">
            <div className="card shadow-lg">
                <div className="card-header bg-gradient-primary text-white">
                    <h1 className="card-title">Tạo một Item</h1>
                </div>
                <div className="card-body">
                    {successMessage && (
                        <div className="alert alert-success">
                            {successMessage} {/* Hiển thị thông báo thành công */}
                        </div>
                    )}
                    <form onSubmit={addItem}> {/* Xử lý khi gửi form */}
                        <div className="row g-3">
                            <div className="col-md-6">
                                <label htmlFor="itemName" className="form-label">Tên Item:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="itemName"
                                    name="name"
                                    value={item.name}
                                    onChange={handleInputChange} // Xử lý khi có thay đổi input
                                    placeholder="Nhập tên item"
                                    required
                                />
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="itemPrice" className="form-label">Giá Item:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="itemPrice"
                                    name="price"
                                    value={item.price}
                                    onChange={handleInputChange} // Xử lý khi có thay đổi input
                                    placeholder="Nhập giá item"
                                    required
                                />
                            </div>
                        </div>
                        <div className="mt-4 text-center">
                            <button type="submit" className="btn btn-primary px-4">
                                <i className="bi bi-plus-lg"></i> Thêm Item
                            </button>
                        </div>
                    </form>
                    <div className="mt-4 d-flex justify-content-start">
                        <button onClick={() => navigate('/')} className="btn btn-outline-secondary">
                            <i className="bi bi-arrow-left-circle"></i> Quay lại Danh sách Item
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Create;