function checkEmpty(value, selectorErro, name){
    var valid = true;
    if(value === ""){
        document.querySelector(selectorErro).innerHTML = name + "không được bỏ trống"
        valid = false;
    } else{
        document.querySelector(selectorErro).innerHTML = ""
    }



    return valid;
}

function checkCharacter(value, selectorErro, name){
    var regex = /^[A-Za-z]+$/;
    if(regex.test(value)){
        document.querySelector(selectorErro).innerHTML = "";
        return true
    }

    document.querySelector(selectorErro).innerHTML = name + "tất cả phải là ký tự"
    return false;
}

function checkNumber(value, selectorErro, name){
    var regex = /^[0-9]+$/;
    if(regex.test(value)){
        document.querySelector(selectorErro).innerHTML = "";
        return true
    }

    document.querySelector(selectorErro).innerHTML = name + "tất cả phải là số"
    return false;
}

function checkEmail(value, selectorErro, name){
    var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\ [[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if(regex.test(value)){
        document.querySelector(selectorErro).innerHTML = "";
        return true
    }

    document.querySelector(selectorErro).innerHTML = name + "không phải là email"
    return false;
}

function checkLength(value, selectorErro, name, minlength, maxLength){
    if(value.length < minlength || value.length > maxLength){
        document.querySelector(selectorErro).innerHTML = name + "từ" + minlength + "đến" + maxLength + "ký tự!";
        return false;
    }
    document.querySelector(selectorErro).innerHTML = "";
    return true
}

function checkValue(value, selectorErro, name, minValue, maxValue){
    if(Number(value) < minValue || Number(value) > maxValue){
        document.querySelector(selectorErro).innerHTML = name + "từ" + minValue + "đến" + maxValue;
        return false;
    }
    document.querySelector(selectorErro).innerHTML = "";
    return true
}

function checkPassword(value, selectorErro, name){
    var regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,8}$/
    if(regex.test(value)){
        document.querySelector(selectorErro).innerHTML = "";
        return true
    }

    document.querySelector(selectorErro).innerHTML = name + "Mật khẩu không hợp lệ"
    return false;
}

function checkPosition(value, selectorErro, name){
    
    if(value == "Chọn chức vụ"){
        document.querySelector(selectorErro).innerHTML = name + "Chức vụ không hợp lệ"
        return false;
        
    }

    document.querySelector(selectorErro).innerHTML = "";
    return true
}