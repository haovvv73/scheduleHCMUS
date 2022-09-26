class Validation {
    constructor(){}
    checkEmty(inputVal, spanID, message) {
        // trim(): xóa dấu khoảng cách đằng trước và đằng sau
        if (inputVal.trim() != "") {
            // dữ liệu hợp lệ
            document.getElementById(spanID).innerHTML = "";
            return true;
        } else {
            //dữ liệu không hợp lệ
            document.getElementById(spanID).innerHTML = message;
            return false;
        }
    }

    checkDropDown(value, id, message) {
        if (value != "") {
            document.getElementById(id).innerHTML = "";
            return true;
        } else {
            document.getElementById(id).innerHTML = message;
            return false;
        }
    }

    checkTimeLesson(start, end, id, message){
        if(end - start >= 1 && start >= 1 && end <= 12){
            document.getElementById(id).innerHTML = "";
            return true;
        }else{
            document.getElementById(id).innerHTML = message;
            return false;
        }
    }
}