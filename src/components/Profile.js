import React from 'react' 
import logo from '../Azizah.jpeg'

// Komponen Profile yang menerima prop 'sisaUang'
const Profile = ({ sisaUang }) => {
  return (
    <div className="profile">
      <img src={logo} alt="logo" />                 {/* Menampilkan gambar profil */}
      <h3>Siti Nurazizah</h3>                       {/* Menampilkan nama pengguna */}
      <span>Saldo</span>                            {/* Menampilkan label saldo */}
      <h3>Rp. {sisaUang}</h3>                       {/* Menampilkan jumlah saldo */}
    </div>
  );
};

export default Profile; // Mengekspor komponen Profile
