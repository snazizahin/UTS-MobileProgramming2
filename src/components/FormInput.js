import React from 'react'
import Button from "./Button"

// Komponen FormInput untuk menambahkan transaksi baru
class FormInput extends React.Component {
  // State untuk menyimpan data input
  state = {
    deskripsi: '',
    tanggal: '',
    jumlah: '',
  };

  // Fungsi untuk mengubah state deskripsi saat input berubah
  changeDeskripsi = e => {
    this.setState({ deskripsi: e.target.value });
  };

  // Fungsi untuk mengubah state tanggal saat input berubah
  changeTanggal = e => {
    this.setState({ tanggal: e.target.value });
  };

  // Fungsi untuk mengubah state jumlah saat input berubah
  changeJumlah = e => {
    this.setState({ jumlah: e.target.value });
  };

  // Fungsi untuk submit form dan menambahkan transaksi baru
  submit = e => {
    e.preventDefault(); // Mencegah reload halaman
    if(this.state.deskripsi !== "" && this.state.tanggal !== "" && this.state.jumlah !== ""){
      // Memanggil fungsi add dari props untuk menambahkan transaksi
      this.props.add({
        deskripsi: this.state.deskripsi,
        tanggal: this.state.tanggal,
        jumlah: parseInt(this.state.jumlah),
        kategori: this.props.formType
      });
    }
    // Mengosongkan input setelah submit
    this.setState({
      deskripsi: "",
      tanggal: "",
      jumlah: ""
    });
  };

  render() {
    // Menentukan judul form berdasarkan tipe transaksi
    const formTitle = this.props.formType === 'IN' ? 'Tambah Pemasukan' : 'Tambah Pengeluaran';
    return(
      // Overlay untuk form
      <div style={overlay}>
        <div style={formContainer}>
          {/* Tombol untuk menutup form */}
          <button style={closeButton} onClick={this.props.onClose}>&times;</button>
          {/* Form untuk input transaksi */}
          <form style={formInput} onSubmit={this.submit}>
            <div style={formGroup}>
              <p style={formTitleStyle}>{formTitle}</p>
              <label style={label}>Deskripsi</label>
              <input 
                type="text"
                onChange={this.changeDeskripsi}
                value={this.state.deskripsi}
                style={formControl}
                placeholder="tambahkan deskripsi"
                required
              />
            </div>
            <div style={formGroup}>
              <label style={label}>Tanggal</label>
              <input 
                type="date"
                onChange={this.changeTanggal}
                value={this.state.tanggal}
                style={formControl}
                placeholder="pilih tanggal"
                required
              />
            </div>
            <div style={formGroup}>
              <label style={label}>Jumlah</label>
              <input 
                type="number"
                onChange={this.changeJumlah}
                value={this.state.jumlah}
                style={formControl}
                placeholder="nominal"
                required
              />
            </div>
            {/* Tombol untuk submit form */}
            <Button text="Add" variant="primary" action={this.submit}/>
          </form>
        </div>
      </div>
    );
  }
}

export default FormInput;

// Gaya CSS untuk overlay form
const overlay = {
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

// Gaya CSS untuk kontainer form
const formContainer = {
  position: 'relative',
  backgroundColor: '#f9f9f9',
  border: '1px solid #ddd',
  padding: '20px',
  borderRadius: '5px',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  width: '300px',
  zIndex: 1001,
};

// Gaya CSS untuk tombol close form
const closeButton = {
  position: 'absolute',
  top: '10px',
  right: '10px',
  background: 'none',
  border: 'none',
  fontSize: '20px',
  cursor: 'pointer',
};

// Gaya CSS untuk form
const formInput = {
  display: 'flex',
  flexDirection: 'column',
};

// Gaya CSS untuk setiap grup input dalam form
const formGroup = {
  marginBottom: '15px',
};

// Gaya CSS untuk label input
const label = {
  display: 'block',
  marginBottom: '5px',
  fontWeight: 'bold',
};

// Gaya CSS untuk input
const formControl = {
  width: '100%',
  padding: '8px',
  boxSizing: 'border-box',
  border: '1px solid #ddd',
  borderRadius: '4px',
};

// Gaya CSS untuk judul form
const formTitleStyle = {
  textAlign: 'center',
  fontSize: '16px',
  marginBottom: '20px',
};
