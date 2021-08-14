import React, { Component } from "react";
import { connect } from "react-redux";

class FormDangKy extends Component {
  state = {
    values: {
      maSinhVien: "",
      taiKhoan: "",
      hoTen: "",
      soDienThoai: "",
      email: ""
    },
    errors: {
      maSinhVien: "",
      taiKhoan: "",
      hoTen: "",
      soDienThoai: "",
      email: ""
    }
  };

  handleChangeInput = (event) => {
    console.log(this.state);
    let { value, name } = event.target;
    let newValues = { ...this.props.sinhVien.values };
    newValues[name] = value;
    let attrValue = "";
    let regex;
    if (event.target.getAttribute("typeEmail")) {
      attrValue = event.target.getAttribute("typeEmail");
      regex =
        /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i; //regex = /.....
    } else if (event.target.getAttribute("typeText")) {
      attrValue = event.target.getAttribute("typeText");
      regex = /^[A-Za-z]+$/;
    } else if (event.target.getAttribute("typeNumber")) {
      attrValue = event.target.getAttribute("typeNumber");
      regex = /^[0-9]+$/;
    }
    let newErrors = { ...this.props.sinhVien.errors };
    let messageError = "";
    if (value.trim() === "") {
      messageError = "vui lòng không để trống " + name;
    }
    if (regex) {
      if (attrValue === "email") {
        if (!regex.test(value)) {
          messageError = name + " phải nhập đúng định dạng!";
        }
      } else if (attrValue === "text") {
        if (!regex.test(value)) {
          messageError = name + " phải là kí tự";
        }
      } else if (attrValue === "number") {
        if (!regex.test(value)) {
          messageError = name + " phải là số";
        }
      }
    }
    newErrors[name] = messageError;

    this.props.dispatch({
      type: "HANDLE_CHANGE_INPUT",
      sinhVien: {
        values: newValues,
        errors: newErrors
      }
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    let valid = true;
    for (let key in this.props.sinhVien.errors) {
      if (this.props.sinhVien.errors[key] !== "") {
        valid = false;
        break;
      }
    }
    for (let key in this.props.sinhVien.values) {
      if (this.props.sinhVien.values[key] === "") {
        valid = false;
        break;
      }
    }
    if(!valid){
      alert('vui lòng điền đầy đủ thông tin');
      return;
    };

    this.props.dispatch({
      type: 'THEM_SINH_VIEN',
      sinhVien: this.props.sinhVien.values
    })

  };


  render() {
    let { maSinhVien, hoTen, soDienThoai, email } = this.props.sinhVien.values;
    return (
      <form className="form bg-light" onSubmit={this.handleSubmit}>
        <div className="card-header bg-dark text-white">
          THÔNG TIN SINH VIÊN
        </div>
        <div className="row">
          <div className="col-6">
            <div className="form-group">
              <p>Mã sinh viên</p>
              <input
                onChange={this.handleChangeInput}
                value={maSinhVien}
                typeNumber="number"
                name="maSinhVien"
                className="form-control"
              ></input>
              <p className="text-danger">
                {this.props.sinhVien.errors.maSinhVien}
              </p>
            </div>
            <div className="form-group">
              <p>Số điện thoại</p>
              <input
                onChange={this.handleChangeInput}
                value={soDienThoai}
                typeNumber="number"
                name="soDienThoai"
                className="form-control"
              ></input>
              <p className="text-danger">
                {this.props.sinhVien.errors.soDienThoai}
              </p>
            </div>
          </div>
          <div className="col-6">
            <div className="form-group">
              <p>Họ tên</p>
              <input
                onChange={this.handleChangeInput}
                value={hoTen}
                typeText="text"
                name="hoTen"
                className="form-control"
              ></input>
              <p className="text-danger">{this.props.sinhVien.errors.hoTen}</p>
            </div>
            <div className="form-group">
              <p>Email</p>
              <input
                onChange={this.handleChangeInput}
                typeEmail="email"
                value={email}
                name="email"
                className="form-control"
              ></input>
              <p className="text-danger">{this.props.sinhVien.errors.email}</p>
            </div>
          </div>
        </div>
        <button
          type="button"
          className="btn btn-primary mt-3"
          onClick={this.handleSubmit}
         
        >
          Thêm sinh viên
        </button>
        <button
          type="button"
          className="btn btn-warning mt-3"
          onClick={() => {
            this.props.dispatch({
              type: 'CAP_NHAT_SINH_VIEN',
              sinhVienCapNhat: this.props.sinhVien.values,
            })
          }}
        >
          Cập nhật
        </button>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  sinhVienChinhSua: state.QuanLySinhVienReducer.sinhVienChinhSua,
  sinhVien: state.QuanLySinhVienReducer.sinhVien
});

export default connect(mapStateToProps)(FormDangKy);
