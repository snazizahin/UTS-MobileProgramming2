import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Button from './Button'

// Komponen untuk menampilkan riwayat transaksi
const TransactionHistory = ({ todo, open, del }) => {
  // State untuk mengelola visibilitas modal konfirmasi
  const [showConfirm, setShowConfirm] = useState(false);

  // Fungsi untuk membuka modal konfirmasi
  const openConfirmModal = () => {
    setShowConfirm(true);
  };

  // Fungsi untuk menutup modal konfirmasi
  const closeConfirmModal = () => {
    setShowConfirm(false);
  };

  // Fungsi untuk menghapus transaksi dan menutup modal konfirmasi
  const confirmDelete = () => {
    del(todo.id);
    setShowConfirm(false);
  };

  return (
    <div style={transactionItem}>
      <div className='name'>
        <div className={todo.kategori === 'IN' ? 'in' : 'out'}>
          <i className={todo.kategori === 'IN' ? 'bi bi-wallet2' : 'bi bi-cash'}></i>
        </div>
        <div className='transaksi'>
          <p>{todo.deskripsi}</p>
          <span className='sub-title'>{todo.tanggal}</span>
        </div>
      </div>
      <p className={todo.kategori === 'IN' ? 'in' : 'out'}>Rp.{todo.jumlah}</p>
      <div>
        <Button text='edit' variant="success" action={() => open(todo)} />
        <Button text='delete' variant="danger" action={openConfirmModal} />
      </div>

      {showConfirm && (
        <div style={modalBackdropStyle}>
          <div style={modalContentStyle}>
            <p>Apakah Anda yakin ingin menghapus transaksi ini?</p>
            <div style={modalActionsStyle}>
              <Button variant='success' text='Ya' action={confirmDelete} />
              <Button variant='danger' text='Tidak' action={closeConfirmModal} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Definisi tipe props yang diterima komponen
TransactionHistory.propTypes = {
  todo: PropTypes.object.isRequired,
  open: PropTypes.func.isRequired,
  del: PropTypes.func.isRequired
};

export default TransactionHistory;

// Gaya untuk item transaksi
const transactionItem = {
  background: "#f9f9f9",
  color: "#000",
  display: "flex",
  alignItems: "center",
  height: "3rem",
  padding: "0 1rem",
  justifyContent: "space-between",
  margin: "0.5rem 0",
  borderRadius: "5px",
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)"
};

// Gaya untuk latar belakang modal konfirmasi
const modalBackdropStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1000
};

// Gaya untuk konten modal konfirmasi
const modalContentStyle = {
  background: '#fff',
  padding: '2rem',
  borderRadius: '8px',
  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
  textAlign: 'center'
};

// Gaya untuk tombol dalam modal konfirmasi
const modalActionsStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  marginTop: '1rem'
};
