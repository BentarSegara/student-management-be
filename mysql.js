import mysql from "mysql2/promise";
import "dotenv/config";

export default class MySQL {
  #connection;
  #selectedData;
  constructor(dbConfig) {
    this._dbConfig = dbConfig;
  }

  set connection(newConnection) {
    return (this.#connection = newConnection);
  }

  set selectedData(newData) {
    return (this.#selectedData = newData);
  }

  get selectedData() {
    return this.#selectedData;
  }

  async connect() {
    try {
      const connection = await mysql.createConnection(this._dbConfig);
      console.log("Connected to MySQL database!");
      this.connection = connection;
    } catch (err) {
      throw new Error(`Gagal menghubungkan ke mysql: ${err.message}`);
    }
  }

  async insert(tableName, columns, data) {
    const columnList = columns.join(", ");
    const dataQuery = data.map((_) => "?");
    try {
      const insertResult = await this.#connection.query(
        `INSERT INTO ${tableName} (${columnList}) VALUES (${dataQuery.join(
          ", "
        )})`,
        data
      );
      return insertResult;
    } catch (err) {
      throw new Error(`Gagal menambahkan data: ${err.message}`);
    }
  }

  async select(tableName) {
    try {
      const dataSelect = await this.#connection.query(
        `SELECT * FROM ${tableName}`
      );
      console.log("data berhasil diambil\nmenampilkan data...");
      this.selectedData = dataSelect;
      return dataSelect;
    } catch (err) {
      throw new Error(`Gagal mengambil data: ${err.message}`);
    }
  }

  async update(tableName, columns, newData, id) {
    try {
      const columnValue = columns.map((column) => `${column}=?`);
      await this.#connection.query(
        `UPDATE ${tableName} SET ${columnValue.join(", ")} WHERE id = ?`,
        [...newData, id]
      );
      console.log(`Data dengan id ${id} berhasil diperbarui`);
    } catch (err) {
      throw new Error(
        `Gagal memperbarui data pada kolom ${columns.join(", ")}: ${
          err.message
        }`
      );
    }
  }

  async delete(tableName, id) {
    try {
      await this.#connection.query(`DELETE FROM ${tableName} WHERE id = ?`, [
        id,
      ]);
      console.log(`Data dengan id ${id} berhasil dihapus`);
    } catch (err) {
      throw new Error(`Gagal menghapus data: ${err.message}`);
    }
  }
}
