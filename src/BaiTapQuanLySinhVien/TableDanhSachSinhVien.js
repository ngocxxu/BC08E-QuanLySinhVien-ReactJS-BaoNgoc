import React, { Component } from "react";
import { connect } from "react-redux";

class TableDanhSachSinhVien extends Component {
  render() {
    return (
      <div>
        <div className="card-header bg-dark text-white mt-5">
          DANH SÁCH SINH VIÊN
        </div>

        <table className="table">
          <thead>
            <tr>
              <th>Mã sinh viên</th>
              <th>Tài khoản</th>
              <th>Họ tên</th>
              <th>Số điện thoại</th>
              <th>Email</th>
              <th>
                <input placeholder="nhập tên Tài khoản" type='search' name='search' onChange={(event)=>{
                  let {value,name} = event.target;
                  let newValueSearch = {...this.props.timKiemSinhVien.values}
                  newValueSearch[name] = value;
                  this.props.dispatch({
                    type: 'VALUE_SEARCH',
                    search: newValueSearch,
                  })
                }}></input>
                <button type='button' className='btn btn-warning' onClick={() =>{
                  this.props.dispatch({
                    type: 'TIM_KIEM_SINH_VIEN',
                    taiKhoan: this.props.mangSinhVien.taiKhoan
                  })
                }}>Search</button>
              </th>
            </tr>
          </thead>
          <tbody>
            {this.props.mangSinhVien.map((sinhVien,index) => {
              return (
                <tr key={index}>
                  <th>{index + 1}</th>
                  <th>{sinhVien.taiKhoan}</th>
                  <th>{sinhVien.hoTen}</th>
                  <th>{sinhVien.soDienThoai}</th>
                  <th>{sinhVien.email}</th>
                  <th>
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => {
                        this.props.dispatch({
                          type: 'XOA_SINH_VIEN',
                          taiKhoan: sinhVien.taiKhoan
                        })
                      }}
                    >
                      Xóa
                    </button>
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={() => {
                        this.props.dispatch({
                          type: 'CHINH_SUA_SINH_VIEN',
                          sinhVienChinhSua: sinhVien,
                        })
                      }}
                    >
                      Chỉnh sửa
                    </button>
                  </th>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  mangSinhVien: state.QuanLySinhVienReducer.mangSinhVien, 
  timKiemSinhVien: state.QuanLySinhVienReducer.timKiemSinhVien,
});

export default connect(mapStateToProps)(TableDanhSachSinhVien);
