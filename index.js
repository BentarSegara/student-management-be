import MySQL from "./mysql.js";
import express from "express";

const app = express();
const port = 3000;

const dbConfig = {
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
};

const connectDB = new MySQL(dbConfig);
await connectDB.connect();

app.use(express.json());

app.get("/mahasiswa", async (req, res) => {
  try {
    const [dataToSend] = await connectDB.select("mahasiswa");

    res.status(200).json({
      status: "Success",
      message: "Data berhasil diambil",
      data: dataToSend,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: "error",
      message: `Terjadi kesalahan saat mengambil data: ${err.message}`,
    });
  }
});

app.post("/mahasiswa/store", async (req, res) => {
  try {
    const { columns, data } = req.body;
    const [insertData] = await connectDB.insert("mahasiswa", columns, data);

    res.status(200).json({
      status: "Success",
      message: "Data berhasil ditambahkan",
      data: {
        id: insertData.insertId,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: "error",
      message: `Terjadi kesalahan saat menambahkan data: ${err.message}`,
    });
  }
});

app.put("/mahasiswa/update", async (req, res) => {
  try {
    const { id } = req.query;
    const { columns, new_data } = req.body;

    await connectDB.update("mahasiswa", columns, new_data, id);
    res.status(200).json({
      status: "Success",
      message: `Data mahasiswa dengan ID ${id} berhasil diperbarui`,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: "error",
      message: `Terjadi kesalahan saat memperbarui data: ${err.message}`,
    });
  }
});

app.delete("/mahasiswa/destroy", async (req, res) => {
  try {
    const { id } = req.query;
    await connectDB.delete("mahasiswa", id);
    res.status(200).json({
      status: "Success",
      message: `Data mahasiswa dengan id ${id} berhasil dihapus`,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: "error",
      message: `Terjadi kesalahan saat menghapus data: ${err.message}`,
    });
  }
});

// app.patch("/mahasiswa/update", async (req, res) => {
//   try {
//     const { id } = req.query;
//     const { column_name, new_data } = req.body;

//     await connectDB.update("mahasiswa", column_name, new_data, id);
//     res.status(200).json({
//       status: "Success",
//       message: `Data mahasiswa dengan ID ${id} berhasil diperbarui`,
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({
//       status: "error",
//       message: `Terjadi kesalahan saat memperbarui data: ${err.message}`,
//     });
//   }
// });

app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
