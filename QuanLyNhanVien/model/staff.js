function Staff(id, name, email, password, date, basicSalary, position, timeWork){
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.date = date;
    this.basicSalary = basicSalary;
    this.position = position;
    this.timeWork = timeWork;
    
    this.calSalary = function () {
        // console.log(obStaff.position);
        if (obStaff.position == "Sếp") {
            return obStaff.basicSalary*3
        } else if (obStaff.position == "Trưởng phòng") {
            return obStaff.basicSalary*2
        } else if (obStaff.position == "Nhân viên") {
            return obStaff.basicSalary
        }
    }

    this.compare = function() {
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
}