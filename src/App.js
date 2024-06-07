import React from 'react'
import './App.css'
import Profile from './components/Profile'
import Button from './components/Button'
import FormInput from './components/FormInput'
import EditModal from './components/EditModal'
import TransactionHistory from './components/TransactionHistory'

// Komponen utama aplikasi
class App extends React.Component {
  state = {
    sisaUang: 0, // Menyimpan sisa uang
    uangMasuk: 0, // Menyimpan total uang masuk
    uangKeluar: 0, // Menyimpan total uang keluar
    todos: [
      {
        id: 1,
        deskripsi: 'Gaji',
        tanggal: '2024/04/25',
        jumlah: 0,
        kategori: 'IN' // Kategori IN untuk pemasukan
      },
      {
        id: 2,
        deskripsi: 'SPP',
        tanggal: '2024/05/01',
        jumlah: 0,
        kategori: 'OUT' // Kategori OUT untuk pengeluaran
      }
    ],
    showForm: false, // Menentukan apakah form input ditampilkan
    formType: '', // Menyimpan tipe form (IN/OUT)
    editModal: false, // Menentukan apakah modal edit ditampilkan
    editData: {} // Menyimpan data yang sedang diedit
  }

  // Menambahkan data baru
  addTask = (data) => {
    const id = this.state.todos.length;
    const newTask = {
      id: id + 1,
      deskripsi: data.deskripsi,
      tanggal: data.tanggal,
      jumlah: data.jumlah,
      kategori: data.kategori
    };
    
    // Update uangMasuk atau uangKeluar berdasarkan kategori
    if (data.kategori === 'IN') {
      this.setState(prevState => ({
        uangMasuk: prevState.uangMasuk + parseInt(data.jumlah),
        sisaUang: prevState.sisaUang + parseInt(data.jumlah)
      }));
    } else if (data.kategori === 'OUT') {
      this.setState(prevState => ({
        uangKeluar: prevState.uangKeluar + parseInt(data.jumlah),
        sisaUang: prevState.sisaUang - parseInt(data.jumlah)
      }));
    }

    this.setState({
      todos: [...this.state.todos, newTask],
      showForm: false
    });
  }

  deleteTask = (id) => {
    const taskToDelete = this.state.todos.find(task => task.id === id);
    const filteredTodos = this.state.todos.filter(task => task.id !== id);
  
    // Update uangMasuk atau uangKeluar berdasarkan kategori
    if (taskToDelete.kategori === 'IN') {
      this.setState(prevState => ({
        uangMasuk: prevState.uangMasuk - parseInt(taskToDelete.jumlah),
        sisaUang: prevState.sisaUang - parseInt(taskToDelete.jumlah)
      }));
    } else if (taskToDelete.kategori === 'OUT') {
      this.setState(prevState => ({
        uangKeluar: prevState.uangKeluar - parseInt(taskToDelete.jumlah),
        sisaUang: prevState.sisaUang + parseInt(taskToDelete.jumlah)
      }));
    }
    this.setState({ todos: filteredTodos });
  }

  // Membuka form input
  openForm = (type) => {
    this.setState({
      showForm: true,
      formType: type
    });
  }

  // Menutup form input
  closeForm = () => {
    this.setState({ showForm: false });
  }

  // Membuka modal edit
  openEditModal = (item) => {
    this.setState({
      editModal: true,
      editData: { ...item }
    });
  }

  // Menutup modal edit
  closeEditModal = () => {
    this.setState({ editModal: false, editData: {} });
  }

  // Menangani perubahan input dalam modal edit
  handleEditChange = (e) => {
    this.setState({
      editData: { ...this.state.editData, [e.target.name]: e.target.value }
    });
  }

  // Memperbarui task (history uang) yang sudah diedit
  updateTask = () => {
    const { todos, editData } = this.state;
    const oldTask = todos.find(todo => todo.id === editData.id);
    const updatedTodos = todos.map(todo => todo.id === editData.id ? editData : todo);

    // Update uangMasuk atau uangKeluar berdasarkan kategori
    if (oldTask.kategori === 'IN') {
        this.setState(prevState => ({
        uangMasuk: prevState.uangMasuk - oldTask.jumlah + parseInt(editData.jumlah),
        sisaUang: prevState.sisaUang - oldTask.jumlah + parseInt(editData.jumlah)
      }));
    } else if (oldTask.kategori === 'OUT') {
      this.setState(prevState => ({
        uangKeluar: prevState.uangKeluar - oldTask.jumlah + parseInt(editData.jumlah),
        sisaUang: prevState.sisaUang + oldTask.jumlah - parseInt(editData.jumlah)
      }));
    }

    this.setState({ todos: updatedTodos, editModal: false, editData: {} });
  }

  render() {
    const { todos, uangMasuk, uangKeluar, showForm, formType, editModal, editData, sisaUang } = this.state;
    return (
      <div className="App">
        <div className="left-side">
          <h2>Money Manager</h2>
          <Profile sisaUang={sisaUang} />
        </div>
        <div className="right-side">
          <div className="rincian">
            <div className='card-wrapper'>
              <div className='in'>
                <i className="bi bi-wallet2"> Pemasukan</i>
              </div>
              <h3>Rp. {uangMasuk}</h3>
            </div>
            <div className='card-wrapper'>
              <div className='out'>
                <i className="bi bi-cash"> Pengeluaran</i>
              </div>
              <h3>Rp. {uangKeluar}</h3>
            </div>
          </div>

          <div className='transaction-history'>
            <div className='header'>
              <h4>Riwayat Transaksi</h4>
              <div className='wrapper-button'>
                <Button variant='primary' text='Pemasukan' action={() => this.openForm('IN')} />
                <Button variant='primary' text='Pengeluaran' action={() => this.openForm('OUT')} />
              </div>
            </div>

            {showForm && <FormInput add={this.addTask} formType={formType} onClose={this.closeForm} />}

            {todos.map(item => (
              <TransactionHistory 
                key={item.id} 
                todo={item} 
                del={this.deleteTask}
                open={this.openEditModal}
              />
            ))}
          </div>
        </div>
        {editModal && (
          <EditModal
            edit={editModal}
            close={this.closeEditModal}
            data={editData}
            change={this.handleEditChange}
            update={this.updateTask}
          />
        )}
      </div>
    );
  }
}

export default App;
