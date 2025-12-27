# 🎓 Student Management System API

REST API sederhana untuk manajemen data mahasiswa menggunakan **Node.js**, **Express**, dan **MySQL**.

---

## 📋 Daftar Isi

- [Fitur](#-fitur)
- [Tech Stack](#-tech-stack)
- [Struktur Proyek](#-struktur-proyek)
- [Instalasi](#-instalasi)
- [Konfigurasi](#-konfigurasi)
- [Menjalankan Server](#-menjalankan-server)
- [API Endpoints](#-api-endpoints)
- [Contoh Penggunaan](#-contoh-penggunaan)

---

## ✨ Fitur

- **CRUD Lengkap** - Create, Read, Update, Delete data mahasiswa
- **MySQL Database** - Penyimpanan data menggunakan MySQL
- **Class-based Database Handler** - Wrapper MySQL yang terstruktur dan reusable
- **Environment Variables** - Konfigurasi aman menggunakan dotenv
- **ES Modules** - Menggunakan sintaks import/export modern

---

## 🛠 Tech Stack

| Teknologi | Versi | Deskripsi |
|-----------|-------|-----------|
| **Node.js** | - | Runtime JavaScript |
| **Express** | ^5.1.0 | Web framework |
| **MySQL2** | ^3.15.3 | MySQL client dengan Promise support |
| **dotenv** | ^17.2.3 | Environment variables loader |
| **nodemon** | ^3.1.11 | Development auto-restart |

---

## 📂 Struktur Proyek

```
API/
├── index.js          # Entry point & route definitions
├── mysql.js          # MySQL database wrapper class
├── package.json      # Dependencies & scripts
├── .env              # Environment variables (tidak di-track)
├── .gitignore        # Git ignore rules
└── readme.md         # Dokumentasi
```

---

## 🚀 Instalasi

### Prasyarat

- **Node.js** (v18 atau lebih baru direkomendasikan)
- **MySQL Server** yang berjalan
- **npm** atau **yarn**

### Langkah Instalasi

1. **Clone repository**
   ```bash
   git clone <repository-url>
   cd API
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Buat database dan tabel**
   ```sql
   CREATE DATABASE nama_database;
   USE nama_database;
   
   CREATE TABLE mahasiswa (
       id INT AUTO_INCREMENT PRIMARY KEY,
       nama VARCHAR(100) NOT NULL,
       nim VARCHAR(20) NOT NULL,
       jurusan VARCHAR(100),
       -- tambahkan kolom sesuai kebutuhan
   );
   ```

---

## ⚙ Konfigurasi

Buat file `.env` di root direktori proyek dengan isi berikut:

```env
HOST=localhost
USER=root
PASSWORD=your_password
DATABASE=your_database_name
```

| Variable | Deskripsi |
|----------|-----------|
| `HOST` | Host MySQL server |
| `USER` | Username MySQL |
| `PASSWORD` | Password MySQL |
| `DATABASE` | Nama database |

---

## ▶ Menjalankan Server

### Development Mode (dengan auto-reload)

```bash
npm run dev
```

### Production Mode

```bash
node index.js
```

Server akan berjalan di: `http://localhost:3000`

---

## 📡 API Endpoints

### Base URL

```
http://localhost:3000
```

### Endpoints

| Method | Endpoint | Deskripsi |
|--------|----------|-----------|
| `GET` | `/mahasiswa` | Mengambil semua data mahasiswa |
| `POST` | `/mahasiswa/store` | Menambahkan data mahasiswa baru |
| `PUT` | `/mahasiswa/update?id={id}` | Memperbarui data mahasiswa |
| `DELETE` | `/mahasiswa/destroy?id={id}` | Menghapus data mahasiswa |

---

## 📝 Contoh Penggunaan

### 1. GET - Mengambil Semua Data

**Request:**
```bash
curl -X GET http://localhost:3000/mahasiswa
```

**Response:**
```json
{
  "status": "Success",
  "message": "Data berhasil diambil",
  "data": [
    {
      "id": 1,
      "nama": "John Doe",
      "nim": "12345678",
      "jurusan": "Teknik Informatika"
    }
  ]
}
```

---

### 2. POST - Menambahkan Data Baru

**Request:**
```bash
curl -X POST http://localhost:3000/mahasiswa/store \
  -H "Content-Type: application/json" \
  -d '{
    "columns": ["nama", "nim", "jurusan"],
    "data": ["Jane Doe", "87654321", "Sistem Informasi"]
  }'
```

**Response:**
```json
{
  "status": "Success",
  "message": "Data berhasil ditambahkan",
  "data": {
    "id": 2
  }
}
```

---

### 3. PUT - Memperbarui Data

**Request:**
```bash
curl -X PUT "http://localhost:3000/mahasiswa/update?id=1" \
  -H "Content-Type: application/json" \
  -d '{
    "columns": ["nama", "jurusan"],
    "new_data": ["John Smith", "Teknik Elektro"]
  }'
```

**Response:**
```json
{
  "status": "Success",
  "message": "Data mahasiswa dengan ID 1 berhasil diperbarui"
}
```

---

### 4. DELETE - Menghapus Data

**Request:**
```bash
curl -X DELETE "http://localhost:3000/mahasiswa/destroy?id=1"
```

**Response:**
```json
{
  "status": "Success",
  "message": "Data mahasiswa dengan id 1 berhasil dihapus"
}
```

---

## 🏗 MySQL Class Methods

File `mysql.js` menyediakan wrapper class untuk operasi database:

| Method | Parameter | Deskripsi |
|--------|-----------|-----------|
| `connect()` | - | Membuat koneksi ke database |
| `select(tableName)` | `tableName: string` | SELECT semua data dari tabel |
| `insert(tableName, columns, data)` | `tableName: string`, `columns: array`, `data: array` | INSERT data baru |
| `update(tableName, columns, newData, id)` | `tableName: string`, `columns: array`, `newData: array`, `id: number` | UPDATE data berdasarkan ID |
| `delete(tableName, id)` | `tableName: string`, `id: number` | DELETE data berdasarkan ID |

---

## 📄 License

ISC

---

<p align="center">
  Made with ❤️ using Node.js & Express
</p>
