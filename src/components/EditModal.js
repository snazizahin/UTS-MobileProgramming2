import React from "react"
import Button from "./Button"

// Komponen EditModal untuk menampilkan dan mengedit transaksi
class EditModal extends React.Component {
  render() {
    const { edit, close, data, change, update } = this.props;
    // Jika edit bernilai true, tampilkan modal edit
    if (edit) {
      return (
        <div style={modalContainer}>
          <div style={modalBox}>
            <p style={formTitleStyle}>Edit Transaksi</p>
            <div style={inputContainer}>
              <label style={label}>Deskripsi</label>
              <input
                type="text"
                name="deskripsi"
                value={data.deskripsi} // Nilai deskripsi dari data yang sedang diedit
                onChange={change}      // Fungsi untuk menangani perubahan input
                style={input}
              />
            </div>
            <div style={inputContainer}>
              <label style={label}>Tanggal</label>
              <input
                type="date"
                name="tanggal"
                value={data.tanggal}  // Nilai tanggal dari data yang sedang diedit
                onChange={change}     // Fungsi untuk menangani perubahan input
                style={input}
              />
            </div>
            <div style={inputContainer}>
              <label style={label}>Jumlah</label>
              <input
                type="number"
                name="jumlah"
                value={data.jumlah} // Nilai jumlah dari data yang sedang diedit
                onChange={change}   // Fungsi untuk menangani perubahan input
                style={input}
              />
            </div>
            <div style={btnGroup}>
              <Button text="edit" variant="success" action={update} /> {/* Tombol untuk mengupdate data */}
              <Button text="cancel" variant="danger" action={close} /> {/* Tombol untuk menutup modal */}
            </div>
          </div>
        </div>
      );
    } else {
      // Jika edit bernilai false, maka tidak akan menampilkan apapun
      return null;
    }
  }
}

export default EditModal;

// Gaya untuk kontainer modal
const modalContainer = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1000,
};

// Gaya untuk kotak modal
const modalBox = {
  backgroundColor: '#fff',
  padding: '20px',
  borderRadius: '5px',
  width: '300px',
  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
};

// Gaya untuk kontainer input
const inputContainer = {
  marginBottom: '15px',
};

// Gaya untuk label input
const label = {
  display: 'block',
  marginBottom: '5px',
  fontWeight: 'bold',
};

// Gaya untuk input
const input = {
  width: '100%',
  padding: '8px',
  boxSizing: 'border-box',
  border: '1px solid #ddd',
  borderRadius: '4px',
};

// Gaya untuk grup tombol
const btnGroup = {
  display: 'flex',
  justifyContent: 'space-between',
};

// Gaya untuk judul form
const formTitleStyle = {
  textAlign: 'center',
  fontSize: '16px',
  marginBottom: '20px',
};
