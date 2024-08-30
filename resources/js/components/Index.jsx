import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from 'axios';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

function Index() {
    const [items, setItems] = useState([]);
    const [trashedItems, setTrashedItems] = useState([]);
    const [successMessage, setSuccessMessage] = useState('');
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [itemIdToDelete, setItemIdToDelete] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const uri = 'http://localhost:8000/items';
                const response = await axios.get(uri);
                setItems(response.data);
            } catch (error) {
                console.error('Error fetching item list:', error);
            }
        };

        const fetchTrashedItems = async () => {
            try {
                const uri = 'http://localhost:8000/items/trashed';
                const response = await axios.get(uri);
                setTrashedItems(response.data);
            } catch (error) {
                console.error('Error fetching trashed items list:', error);
            }
        };

        fetchItems();
        fetchTrashedItems();
    }, []);

    useEffect(() => {
        const deletedItems = JSON.parse(localStorage.getItem('deletedItems'));
        if (deletedItems) {
            setTrashedItems(deletedItems);
        }
    }, []);

    const openDeleteConfirmation = (id) => {
        setItemIdToDelete(id);
        setShowDeleteModal(true);
    };

    const closeModal = () => {
        setShowDeleteModal(false);
    };

    const confirmDelete = async () => {
        if (itemIdToDelete !== null) {
            try {
                const uri = `http://localhost:8000/items/${itemIdToDelete}`;
                await axios.delete(uri);
                setItems(currentItems => currentItems.filter((item) => item.id !== itemIdToDelete));
                const deletedItem = items.find(item => item.id === itemIdToDelete);
                setTrashedItems([...trashedItems, deletedItem]);
                setSuccessMessage('Đã chuyển mục vào thùng rác!');
                setTimeout(() => {
                    setSuccessMessage('');
                    navigate('/');
                }, 1000);
                closeModal();
                localStorage.setItem('deletedItems', JSON.stringify([...trashedItems, deletedItem]));
            } catch (error) {
                console.error('Lỗi khi xóa mục:', error);
            }
        }
    };

    const restoreItem = async (id) => {
        try {
            const uri = `http://localhost:8000/items/restore/${id}`;
            await axios.put(uri);
            setTrashedItems(currentItems => currentItems.filter((item) => item.id !== id));
            setSuccessMessage('Khôi phục mục thành công!');
            setTimeout(() => {
                setSuccessMessage('');
                navigate('/');
            }, 1000);
            localStorage.setItem('deletedItems', JSON.stringify(trashedItems.filter((item) => item.id !== id)));
        } catch (error) {
            console.error('Lỗi khi khôi phục mục:', error);
        }
    };

    const forceDeleteItem = async (id) => {
        try {
            const uri = `http://localhost:8000/items/force-delete/${id}`;
            await axios.delete(uri);
            setTrashedItems(currentItems => currentItems.filter((item) => item.id !== id));
            setSuccessMessage('Xóa vĩnh viễn mục thành công!');
            setTimeout(() => {
                setSuccessMessage('');
                navigate('/');
            }, 1000);
            localStorage.setItem('deletedItems', JSON.stringify(trashedItems.filter((item) => item.id !== id)));
        } catch (error) {
            console.error('Lỗi khi xóa vĩnh viễn mục:', error);
        }
    };

    return (
        <div className="container mt-5">
            <h1 className="mb-4">Danh sách mục</h1>
            {successMessage && (
                <div className="alert alert-success">
                    {successMessage}
                </div>
            )}
            <div className="d-flex justify-content-end mb-4">
                <Link to="/create" className="btn btn-success"><i className="bi bi-plus-lg"></i> Tạo mục mới</Link>
            </div>

            <div className="table-responsive">
                <table className="table table-hover table-bordered">
                    <thead className="table-dark">
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Tên mục</th>
                            <th scope="col">Giá mục</th>
                            <th scope="col" style={{ width: "20%" }}>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item) => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td>{item.price} VNĐ</td>
                                <td>
                                    <Link to={`/edit/${item.id}`} className="btn btn-sm btn-outline-primary me-2">
                                        <i className="bi bi-pencil-square me-1"></i> Sửa
                                    </Link>
                                    <Button variant="outline-danger" size="sm" className="me-2">
                                        <i className="bi bi-trash me-1"></i> Xóa
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <h2 className="mt-5">Thùng rác</h2>
            <div className="table-responsive">
                <table className="table table-hover table-bordered">
                    <thead className="table-dark">
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Tên mục</th>
                            <th scope="col">Giá mục</th>
                            <th scope="col" style={{ width: "20%" }}>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {trashedItems.map((item) => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td>{item.price} VNĐ</td>
                                <td>
                                    <Button variant="outline-success" size="sm" onClick={() => restoreItem(item.id)}>
                                        <i className="bi bi-arrow-clockwise me-1"></i> Khôi phục
                                    </Button>
                                    <Button variant="outline-danger" size="sm" onClick={() => forceDeleteItem(item.id)} className="ms-2">
                                        <i className="bi bi-trash me-1"></i> Xóa luôn
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <Modal show={showDeleteModal} onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Xác nhận xóa</Modal.Title>
                </Modal.Header>
                <Modal.Body>Bạn có chắc chắn muốn xóa mục này không?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeModal}>Hủy</Button>
                    <Button variant="danger" onClick={confirmDelete}>Xóa</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default Index;