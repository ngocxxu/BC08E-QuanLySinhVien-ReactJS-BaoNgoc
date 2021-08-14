const stateDefaut = {
  mangSinhVien: [
    {
      maSinhVien: 1,
      taiKhoan: "quachngoc",
      hoTen: "Quach Ngoc",
      soDienThoai: 1234567891,
      email: "quach.ngoc@gmail.com"
    },
    {
      maSinhVien: 2,
      taiKhoan: "quachlinh",
      hoTen: "Quach Linh",
      soDienThoai: 1234567899,
      email: "quach.linh@gmail.com"
    }
  ],
  sinhVienAdjust: {
    maSinhVien: "",
    hoTen: "",
    soDienThoai: "",
    email: ""
  },
  sinhVien: {
    values: {
      maSinhVien: "",
      hoTen: "",
      soDienThoai: "",
      email: ""
    },
    errors: {
      maSinhVien: "",
      hoTen: "",
      soDienThoai: "",
      email: ""
    }
  },
  timKiemSinhVien:{
    search: "",
    taiKhoan: "",
  }

};

export const QuanLySinhVienReducer = (state = stateDefaut, action) => {
  switch (action.type) {
    case 'HANDLE_CHANGE_INPUT':{
      state.sinhVien = action.sinhVien;
      return {...state}
    }
    case 'THEM_SINH_VIEN':{
      state.mangSinhVien = [...state.mangSinhVien, action.sinhVien];
      return {...state};
    }
    case 'XOA_SINH_VIEN':{
      state.mangSinhVien = [...state.mangSinhVien].filter(sinhVien => sinhVien.taiKhoan !== action.taiKhoan);
      return {...state};
    }
    case 'CHINH_SUA_SINH_VIEN':{
      state.sinhVien.values = action.sinhVienChinhSua;
      state.sinhVien = {...state.sinhVien};

      return {...state};
    }
    case 'CAP_NHAT_SINH_VIEN':{
      const mangSVCapNhat = [...state.mangSinhVien];
      let index = mangSVCapNhat.findIndex(sinhVien => sinhVien.taiKhoan === action.sinhVienCapNhat.taiKhoan)
      console.log(index)
      if(index !== -1){
        mangSVCapNhat[index] = action.sinhVienCapNhat;
      }
      state.mangSinhVien = mangSVCapNhat;
      return {...state};
    }
    case 'TIM_KIEM_SINH_VIEN':{

      state.mangSinhVien = [...state.mangSinhVien].filter(sinhVien => sinhVien.taiKhoan == state.timKiemSinhVien.search);
      return {...state};
    }
    case 'VALUE_SEARCH':{
      state.timKiemSinhVien = action.search;
      return {...state}

    }

    default:
      return state;
  }
};
