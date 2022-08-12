/**
 * PROJECT: STAFF MANAGEMENT (CRUD)
 * Features:
 *     1. Thêm 1 nhân viên mới
 *     2. Hiển thị danh sách sinh viên
 *     3. Cập nhật sinh viên
 *     4. Xoá sinh viên
 *     5. Tìm kiếm nhân viên theo loại
 * Design: ready
 * Phân tích lớp đối tượng: staff
 *    + id
 *    + name
 *    + email
 *    + password
 *    + date
 *    + basicSalary
 *    + position
 *    + timeWork
 *    + calSalary()
 *
 */

var staffList = [];
// console.log(staffList)
function creatStaff() {
    // debugger
    //lấy thông tin từ input
    var staffId = document.getElementById("tknv").value;
    var staffName = document.getElementById("name").value;
    var staffEmail = document.getElementById("email").value;
    var staffPassword = document.getElementById("password").value;
    var staffDate = document.getElementById("datepicker").value;
    var staffBasicSalary = + document.getElementById("luongCB").value;
    var staffPosition = document.getElementById("chucvu").value;
    var staffTimework = + document.getElementById("gioLam").value;
    console.log(staffPosition)

    var staff = new Staff(
        staffId,
        staffName,
        staffEmail,
        staffPassword,
        staffDate,
        staffBasicSalary,
        staffPosition,
        staffTimework
    );

    console.log(staff);


    //-------------- kiểm tra dữ liệu đầu vào---------------------
    /**
     * kiểm tra rỗng
     * 
     */
    var valid = true;
    valid &= checkEmpty(staff.id, "#tbTKNV", "tài khoản") & checkEmpty(staff.name, "#tbTen", "Tên nhân viên") & checkEmpty(staff.email, "#tbEmail", "Email") & checkEmpty(staff.password, "#tbMatKhau", "mật khẩu") & checkEmpty(staff.date, "#tbNgay", "ngày") & checkEmpty(staff.basicSalary, "#tbLuongCB", "lương") & checkEmpty(staff.position, "#tbChucVu", "chức vụ") & checkEmpty(staff.timeWork, "#tbGiolam", "số giờ làm")
    // kiểm tra định dạng
    if (checkEmpty(staff.id, "#tbTKNV", "tài khoản")) {
        valid &= checkNumber(staff.id, "#tbTKNV", "tài khoản")
    }

    if (checkEmpty(staff.name, "#tbTen", "Tên nhân viên")) {
        valid &= checkCharacter(staff.name, "#tbTen", "Tên nhân viên")
    }

    if (checkEmpty(staff.basicSalary, "#tbLuongCB", "lương")) {
        valid &= checkNumber(staff.basicSalary, "#tbLuongCB", "lương")
    }

    if (checkEmpty(staff.timeWork, "#tbGiolam", "số giờ làm")) {
        valid &= checkNumber(staff.timeWork, "#tbGiolam", "")
    }

    if (checkEmpty(staff.password, "#tbMatKhau", "mật khẩu")) {
        valid &= checkPassword(staff.password, "#tbMatKhau", "")
    }

    if (checkEmpty(staff.email, "#tbEmail", "Email")) {
        valid &= checkEmail(staff.email, "#tbEmail", "")
    }

    if (checkEmpty(staff.position, "#tbChucVu", "chức vụ")) {
        valid &= checkPosition(staff.position, "#tbChucVu", "")
    }

    if (!valid) {
        return;
    }

    // // kiểm tra độ dài

    valid &= checkLength(staff.id, "#tbTKNV", "tài khoản", 4, 6)


    valid &= checkValue(staff.basicSalary, "#tbLuongCB", "lương", 1000000, 20000000) & checkValue(staff.timeWork, "#tbGiolam", "số giờ làm", 80, 200);
    if (!valid) {
        return;
    }



    if (!valid) {
        return;
    }

    // push đối tượng nhân viên vào danh sách
    staffList.push(staff);
    // gọi hàm in ra  table khi thêm 1 nhân viên mới
    renderStaffList(staffList);
    // lưu table danh sách sinh viên vào localstorage
    saveLocalStorage(staffList, 'arrS')
}
// creatStaff()

function renderStaffList(arrS) {
    var output = "";

    for (var index = 0; index < arrS.length; index++) {
        var obStaff = arrS[index];
        // var staffBasicSalary = + document.getElementById("luongCB").value;
        obStaff.calSalary = function () {
            // console.log(obStaff.position);
            if (obStaff.position == "Sếp") {
                return obStaff.basicSalary * 3
            } else if (obStaff.position == "Trưởng phòng") {
                return obStaff.basicSalary * 2
            } else if (obStaff.position == "Nhân viên") {
                return obStaff.basicSalary
            }
        }
        obStaff.calSalary();
        obStaff.compare = function () {
            if (obStaff.timeWork >= 192) {
                return "loại xuất sắc"
            } else if (obStaff.timeWork < 192 && obStaff.timeWork >= 176) {
                return "loại giỏi"
            } else if (obStaff.timeWork >= 160 && obStaff.timeWork < 176) {
                return "loại khá"
            } else if (obStaff.timeWork < 160) {
                return "loại trung bình"
            }
        }
        obStaff.compare();
        var trS = `
            <tr>
                <td>${obStaff.id}</td>
                <td>${obStaff.name}</td>
                <td>${obStaff.email}</td>
                <td>${obStaff.date}</td>
                <td>${obStaff.position}</td>
                <td>${obStaff.calSalary()}</td>
                <td>${obStaff.compare()}</td>
                <td>
                    <button class="btn btn-danger" onclick="delStaff('${obStaff.id}')">Del</button>
                    <button class="btn btn-primary" onclick="editStaff('${obStaff.id}')">Update</button>
                </td>
            </tr>
        `;
        output += trS;
    }
    document.getElementById("tableDanhSach").innerHTML = output;
    return output;
}


function delStaff(idClick) {
    var indexdel = -1;
    for (index = 0; index < staffList.length; index++) {
        if (staffList[index].id == idClick) {
            indexdel = index;
            break;
        }
    }
    if (indexdel !== -1) {
        staffList.splice(indexdel, 1);

        renderStaffList(staffList);
        saveLocalStorage(staffList, 'arrS')
    }
}

function editStaff(idClick) {
    // console.log("sfdsfsdf", document.getElementById("btnThem"))
    document.getElementById("btnThem").click()

    var staffEdit = null;
    for (var index = 0; index < staffList.length; index++) {
        if (staffList[index].id == idClick) {
            staffEdit = staffList[index];
            break;
        }
    }
    if (staffEdit !== null) {
        document.querySelector('#tknv').value = staffEdit.id;
        document.querySelector('#name').value = staffEdit.name;
        document.querySelector('#email').value = staffEdit.email;
        document.querySelector('#password').value = staffEdit.password;
        document.querySelector('#datepicker').value = staffEdit.date;
        document.querySelector('#luongCB').value = staffEdit.basicSalary;
        document.querySelector('#chucvu').value = staffEdit.position;
        document.querySelector('#gioLam').value = staffEdit.timeWork;
    }
}


function updateStaff() {
    var staffUpdate = new Staff();


    staffUpdate.id = document.querySelector("#tknv").value;
    staffUpdate.name = document.querySelector("#name").value;
    staffUpdate.email = document.querySelector("#email").value;
    staffUpdate.password = document.querySelector("#password").value;
    staffUpdate.date = document.querySelector("#datepicker").value;
    staffUpdate.basicSalary = +document.querySelector("#luongCB").value;
    staffUpdate.position = document.querySelector("#chucvu").value;
    staffUpdate.timeWork = +document.querySelector("#gioLam").value;





    console.log(staffUpdate)
    console.log("aaa")

    // duyệt qua từng object trong stafflist, tìm ra vị trí trong obj cần thay đổi

    let indexEdit = -1;
    for (var index = 0; index < staffList.length; index++) {
        if (staffList[index].id === staffUpdate.id) {
            indexEdit = index;
            break;
        }


    }




    if (indexEdit !== -1) {
        //nếu tìm thấy vị trí trong mảng thì lấy obj trong mảng ra gán lại = obj trên giao diện người dùng
        console.log()
        //-------------- kiểm tra dữ liệu đầu vào---------------------
        /**
         * kiểm tra rỗng
         * 
         */
        var valid = true;
        valid &= checkEmpty(staffUpdate.id, "#tbTKNV", "tài khoản") & checkEmpty(staffUpdate.name, "#tbTen", "Tên nhân viên") & checkEmpty(staffUpdate.email, "#tbEmail", "Email") & checkEmpty(staffUpdate.password, "#tbMatKhau", "mật khẩu") & checkEmpty(staffUpdate.date, "#tbNgay", "ngày") & checkEmpty(staffUpdate.basicSalary, "#tbLuongCB", "lương") & checkEmpty(staffUpdate.position, "#tbChucVu", "chức vụ") & checkEmpty(staffUpdate.timeWork, "#tbGiolam", "số giờ làm")
        // kiểm tra định dạng
        if (checkEmpty(staffUpdate.id, "#tbTKNV", "tài khoản")) {
            valid &= checkNumber(staffUpdate.id, "#tbTKNV", "tài khoản")
        }

        if (checkEmpty(staffUpdate.name, "#tbTen", "Tên nhân viên")) {
            valid &= checkCharacter(staffUpdate.name, "#tbTen", "Tên nhân viên")
        }

        if (checkEmpty(staffUpdate.basicSalary, "#tbLuongCB", "lương")) {
            valid &= checkNumber(staffUpdate.basicSalary, "#tbLuongCB", "lương")
        }

        if (checkEmpty(staffUpdate.timeWork, "#tbGiolam", "số giờ làm")) {
            valid &= checkNumber(staffUpdate.timeWork, "#tbGiolam", "")
        }

        if (checkEmpty(staffUpdate.password, "#tbMatKhau", "mật khẩu")) {
            valid &= checkPassword(staffUpdate.password, "#tbMatKhau", "")
        }

        if (checkEmpty(staffUpdate.email, "#tbEmail", "Email")) {
            valid &= checkEmail(staffUpdate.email, "#tbEmail", "")
        }

        if (checkEmpty(staffUpdate.position, "#tbChucVu", "chức vụ")) {
            valid &= checkPosition(staffUpdate.position, "#tbChucVu", "")
        }

        if (!valid) {
            return;
        }

        // // kiểm tra độ dài

        valid &= checkLength(staffUpdate.id, "#tbTKNV", "tài khoản", 4, 6)


        valid &= checkValue(staffUpdate.basicSalary, "#tbLuongCB", "lương", 1000000, 20000000) & checkValue(staffUpdate.timeWork, "#tbGiolam", "số giờ làm", 80, 200);
        if (!valid) {
            return;
        }



        if (!valid) {
            return;
        }
        staffList[index].id = staffUpdate.id
        staffList[index].name = staffUpdate.name
        staffList[index].email = staffUpdate.email
        staffList[index].password = staffUpdate.password
        staffList[index].date = staffUpdate.date
        staffList[index].basicSalary = staffUpdate.basicSalary
        staffList[index].position = staffUpdate.position
        staffList[index].timeWork = staffUpdate.timeWork


        //gọi hàm render truyền cho mảng mới
        console.log("test", staffList[index].name)
        renderStaffList(staffList);
        console.log(staffList)
    }

    // var staffId = document.getElementById("tknv").value;
    //  = document.getElementById("name").value;
    // var staffEmail = document.getElementById("email").value;
    // var staffPassword = document.getElementById("password").value;
    // var staffDate = document.getElementById("datepicker").value;
    // var staffBasicSalary = + document.getElementById("luongCB").value;
    // var staffPosition = document.getElementById("chucvu").value;
    // var staffTimework = + document.getElementById("gioLam").value
}

function clearStaff() {

    var a =
        // debugger
    document.querySelector("#tknv").value = "";
    document.querySelector("#name").value = "";
    document.querySelector("#email").value = "";
    document.querySelector("#password").value = "";
    document.querySelector("#datepicker").value = "";
    document.querySelector("#luongCB").value = "";
    document.querySelector("#chucvu").value = `
    <select class="form-control" id="chucvu">
    <option>Chọn chức vụ</option>
    <option >Sếp</option>
    <option >Trưởng phòng</option>
    <option >Nhân viên</option>
    </select>
    `;
    document.querySelector("#gioLam").value = "";

    document.querySelector("#tbTKNV").innerHTML = "";
    document.querySelector("#tbTen").innerHTML = "";
    document.querySelector("#tbEmail").innerHTML = "";
    document.querySelector("#tbMatKhau").innerHTML = "";
    document.querySelector("#tbNgay").innerHTML = "";
    document.querySelector("#tbLuongCB").innerHTML = "";
    document.querySelector("#tbChucVu").innerHTML = "";
    document.querySelector("#tbGiolam").innerHTML = "";
    
    console.log("aa")
}
// clearStaff()

function removeVietnameseTones(str) {
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
    str = str.replace(/Đ/g, "D");
    // Some system encode vietnamese combining accent as individual utf-8 characters
    // Một vài bộ encode coi các dấu mũ, dấu chữ như một kí tự riêng biệt nên thêm hai dòng này
    str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // ̀ ́ ̃ ̉ ̣  huyền, sắc, ngã, hỏi, nặng
    str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // ˆ ̆ ̛  Â, Ê, Ă, Ơ, Ư
    // Remove extra spaces
    // Bỏ các khoảng trắng liền nhau
    str = str.replace(/ + /g, " ");
    str = str.trim();
    // Remove punctuations
    // Bỏ dấu câu, kí tự đặc biệt
    str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g, " ");
    return str;
}


// tìm kiếm








































































// lưu dữ liệu vào localsorage
function saveLocalStorage(ob, key) {
    var str = JSON.stringify(ob);
    localStorage.setItem(key, str)
};


// lấy dữ liệu từ localstorage
function getLocalStorage(key) {
    if (localStorage.getItem(key)) {
        var str = localStorage.getItem(key);
        //Parse dữ liệu về lại object
        var ob = JSON.parse(str);
        return ob;
    }
    return undefined;
}


//đợi html js load xong thì sẽ động thực thi
window.onload = function () {
    //Lấy ra array sinh viên từ localstorage gán vào staffList
    staffList = getLocalStorage('arrS');
    console.log('staffList', staffList);
    if (staffList == undefined) {
        staffList = []
    }
    renderStaffList(staffList);
    console.log(staffList)
}


console.log(staffList)



























// vì sao console.log(staffList) ở 442 hiện mà console.log(staffList) ở 446 không: gọi hàm creatStaffList ra trong find để có stafflist trước

// hỏi xóa dữ liệu khi click vào thêm nhân viên; validation cho updateStaff, tìm nhân viên


/**
 * ==>gọi dữ liệu từ localstoreage tạo hàm để đánh giá loại nhân viên ==> tạo hạm để tìm nhân viên theo loại vừa làm ==> render ra giao diện
 */
// function classify(arr) {
//     for (var i = 0; i < arr.length; i++) {
//         var obStaff = arr[i];
//         obStaff.compare = function () {
//             if (obStaff1.timeWork >= 192) {
//                 return "loại xuất sắc"
//             } else if (obStaff.timeWork < 192 && obStaff1.timeWork >= 176) {
//                 return "loại giỏi"
//             } else if (obStaff.timeWork >= 160 && obStaff1.timeWork < 176) {
//                 return "loại khá"
//             } else if (obStaff.timeWork < 160) {
//                 return "loại trung bình"
//             }
//         }
//         obStaff.compare();

//     }
// }
// var find = function (arrF) {
//     console.log('hello');
//     // debugger
//     staffList = getLocalStorage('arrS');
//     classify(staffList)
//     console.log(staffList)
//     var key = document.querySelector("#searchName").value;
//     console.log(key)
//     debugger
//     for (var i = 0; i < staffList.length; i++) {
//         var kindStaff = obStaff[i].compare();
//         var tenSinhVien = removeVietnameseTones(kindStaff)
//         if (tenSinhVien.search(key) != -1) {
//             output.push(staffList[index])
//         }
//     }

//     console.log(output);
//     console.log("ssss")
//     renderStaffList(output)

// }

// document.querySelector("#searchName").oninput = find()

function classify(arr) {
    for (var i = 0; i < arr.length; i++) {
        var obStaff = arr[i];
        obStaff.compare = function () {
            if (this.timeWork >= 192) {
                return "loại xuất sắc"
            } else if (this.timeWork < 192 && this.timeWork >= 176) {
                return "loại giỏi"
            } else if (this.timeWork >= 160 && this.timeWork < 176) {
                return "loại khá"
            } else if (this.timeWork < 160) {
                return "loại trung bình"
            }
        }
        obStaff.compare();

    }
}
var find = function (arrF) {
    console.log('hello');
    // debugger
    staffList = getLocalStorage('arrS');
    if (staffList) {
        classify(staffList)
        console.log(staffList)
        var key = document.querySelector("#searchName").value;
        key = removeVietnameseTones(key)
        console.log(key)
        var output = []
        // debugger
        for (var i = 0; i < staffList.length; i++) {
            var kindStaff = staffList[i].compare();
            var tenSinhVien = removeVietnameseTones(kindStaff)

            console.log(tenSinhVien, key, tenSinhVien.search(key));
            if (tenSinhVien.search(key) != -1) {
                output.push(staffList[i])
            }
        }

        console.log(output);
        console.log("ssss")
        renderStaffList(output)
    }

}