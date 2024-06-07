import React from 'react'
import PropTypes from "prop-types"

// Komponen Button menerima props: variant, text, dan action
const Button = ({ variant, text, action }) => {
    return (
        // Render elemen button dengan class yang disesuaikan dengan variant dan teks dari props
        // Ketika button diklik, jalankan fungsi action dari props
        <button onClick={action} className={`btn btn-${variant}`}>
            {text}
        </button>
    );
}

// Validasi tipe props yang diterima oleh komponen Button
Button.propTypes = {
    text: PropTypes.string.isRequired,    // text harus berupa string dan wajib diisi
    variant: PropTypes.string.isRequired, // variant harus berupa string dan wajib diisi
    action: PropTypes.func                // action harus berupa fungsi (optional, jadi tidak diberi isRequired)
}

// Ekspor komponen Button untuk digunakan di tempat lain
export default Button;
