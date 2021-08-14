import React, { Component } from 'react'
import FormDangKy from './FormDangKy'
import TableDanhSachSinhVien from './TableDanhSachSinhVien'

export default class BaiTapQuanLySinhVien extends Component {
  render() {
    return (
      <div className="container">
        <FormDangKy></FormDangKy>
        <TableDanhSachSinhVien></TableDanhSachSinhVien>
      </div>
    )
  }
}
