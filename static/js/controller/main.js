// GLOBAL function
let getID = (id) => {
    return document.getElementById(id);
}

// global variable
let user
let validation = new Validation()
let userService = new UserService()

// dom element table schedule
let scheduleCol = []
scheduleCol[0] = getID('scheduleCol1')
scheduleCol[1] = getID('scheduleCol2')
scheduleCol[2] = getID('scheduleCol3')
scheduleCol[3] = getID('scheduleCol4')
scheduleCol[4] = getID('scheduleCol5')
scheduleCol[5] = getID('scheduleCol6')

// dom element edit table
// mode
let btnEdit = getID('btnEdit')
let btnDelete = getID('btnDelete')
let btnResetMode = getID('btnResetMode')
// nofication display
let nofication = getID('Nofication') // validation
let saveDiag = getID('saveDiag') // status is save
// btn form
let editTableForm = getID('editTableForm')
let btnadd = getID('add')
let btnclear = getID('clear')
let btnUpdate = getID('update')

// dom btn login
let btnLogin = getID('btnLogin')
// dom btn register
let btnRegister = getID('btnRegister')
// dom  btn logout
let btnlogout = getID('btnlogout')

// -------------------------------------------------------------------------

// api fucntion
// get detail data from sever
let getUser = (id) => {
    saveDiag.innerHTML = `
    <div class="saveSchedule" >
        <p> waiting...... </p>
    </div> `
    userService.getData(id)
        .then((result) => {
            let data = result.data;
            user = new User(data.userName, data.class, data.lessons, data.mapLesson)
            render()
            saveDiag.innerHTML = ''
        })
        .catch((err) => {
            saveDiag.innerHTML = `
            <div class="saveSchedule" >
                <p style="color: red;"> ctrl + f5 lại nha  </p>
            </div>`
        })
}
// check acc is save local store = yes => getuser()
let checkLocal = () => {
    if (localStorage.getItem("id")) {
        let id = JSON.parse(localStorage.getItem("id"))
        // remove ui login/register
        document.getElementById('scheduleTablelog').remove()
        getUser(id)
    }
}
checkLocal()

// post data to sever
let saveUser = async (id, data) => {
    saveDiag.innerHTML = `
        <div class="saveSchedule" >
            <p> waiting...... </p>
        </div> `
    await userService.updateData(id, data)
        .then((result) => {
            saveDiag.innerHTML = `
            <div class="saveSchedule" >
                <p style="color: green;" >success</p>
            </div>`
            setTimeout(() => {
                saveDiagRender(false);
            }, 1000)
        })
        .catch((err) => {
            saveDiag.innerHTML = `
            <div class="saveSchedule" >
                <p style="color: red;">vui lòng cập nhập lại</p>
            </div>`
            setTimeout(() => {
                location.reload();
            }, 1000)
        })
}
// function say save schedule before user leave =yes=> saveUser()
let saveDiagRender = (isSave) => {
    if (isSave) {
        saveDiag.innerHTML = `
        <div class="saveSchedule" >
            <p> hãy lưu khi bạn đã chỉnh sửa xong </p>
            <button class="saveSchedule__btn" onclick="saveUser(1,user)"> save </button>
        </div>`
    } else {
        saveDiag.innerHTML = ''
    }
}

// -------------------------------------------------------------------------

// function handle check acc is create and check name, pass user
let checkIsCreate = (list = [], valueName, valuePass) => {
    let flag = false;
    list.map((item, index) => {
        if (item.userName.toLowerCase().trim() === valueName.toLowerCase().trim() && item.userPass === valuePass) {
            // is create => save local to login
            localStorage.setItem("id", JSON.stringify(item.id))
            flag = true;
        }
    })
    return flag
}
// function handle check accout is registed 
let checkIsRegister = (list = [], valueName) => {
    let flag = false;
    list.map((item, index) => {
        if (item.userName.toLowerCase().trim() == valueName.toLowerCase().trim()) {
            flag = true;
        }
    })
    return flag
}
// LOGIN account btn
btnLogin.addEventListener('click', (e) => {
    e.preventDefault()
    // dom login login form 
    let inpLoginName = getID('inpLoginName').value
    let inpLoginPass = getID('inpLoginPass').value

    let isCheck = true
    isCheck &= validation.checkEmty(inpLoginName, 'loginNofication', 'không bỏ trống')
    isCheck &= validation.checkEmty(inpLoginPass, 'loginNofication', 'không bỏ trống')

    if (isCheck) {
        // get data to check is create
        document.getElementById('loginNofication').innerHTML = '<span style="color: green;"> ok, please wait </span>'
        userService.getListUser()
            .then((result) => {
                if (checkIsCreate(result.data, inpLoginName, inpLoginPass)) {
                    document.getElementById('loginNofication').innerHTML = '<span style="color: grey;"></span>'
                    checkLocal()
                } else {
                    document.getElementById('loginNofication').innerHTML = '<span style="color: red;"> sai tài khoản hoặc mật khẩu </span>'
                }
            })
            .catch((err) => {
            })
    }

})
// REGISTER account btn
btnRegister.addEventListener('click', (e) => {
    e.preventDefault()
    // dom login register form 
    let inpRegisterName = getID('inpRegisterName').value
    let inpRegisterPass = getID('inpRegisterPass').value
    let inpRegisterClass = getID('inpRegisterClass').value

    let isCheck = true
    isCheck &= validation.checkEmty(inpRegisterName, 'registerNofication', 'không bỏ trống')
    isCheck &= validation.checkEmty(inpRegisterPass, 'registerNofication', 'không bỏ trống')
    isCheck &= validation.checkEmty(inpRegisterClass, 'registerNofication', 'không bỏ trống')

    if (isCheck) {
        // make obj user
        let newUser = {
            userName: inpRegisterName,
            class: inpRegisterClass,
            userPass: inpRegisterPass,
        }
        // get data to check is create
        userService.getListUser()
            .then((result) => {
                if (checkIsRegister(result.data, inpRegisterName)) {
                    document.getElementById('registerNofication').innerHTML = '<span style="color: red;"  > đã tồn tại account </sp>'
                } else {
                    // add list acc
                    userService.addListUser(newUser)
                    // add list lesson
                    let newUser2 = new User(newUser.userName, newUser.class)
                    userService.addDate(newUser2)
                    document.getElementById('registerNofication').innerHTML = '<span style="color: green;" > success </span>'
                }
            })
            .catch((err) => {
            })
    }
})
// LOGOUT account btn
btnlogout.addEventListener('click', () => {
    localStorage.removeItem("id")
    window.location.reload()
})

// --------------------------------------------------------------------------

// btn add lesson
btnadd.addEventListener('click', () => {
    // form
    let inpDay = getID('inpDay')
    let inpRoom = getID('inpRoom')
    let inpName = getID('inpName')
    let inpNote = getID('inpNote')
    let inpTimeEnd = getID('inpTimeEnd')
    let inpLocation = getID('inpLocation')
    let inpTimeStart = getID('inpTimeStart')

    // flag validation
    let isCheck = true

    isCheck &= validation.checkEmty(inpName.value, 'empty', 'không bỏ trống')
    isCheck &= validation.checkEmty(inpTimeStart.value, 'empty', 'không bỏ trống')
    isCheck &= validation.checkEmty(inpTimeEnd.value, 'empty', 'không bỏ trống')
    isCheck &= validation.checkTimeLesson(inpTimeStart.value, inpTimeEnd.value, 'timeLesson', 'tiết học 1 -> 12 và tiết kết thúc lớn hơn tiết bắt đầu')
    isCheck &= validation.checkEmty(inpRoom.value, 'empty', 'không bỏ trống')
    isCheck &= validation.checkDropDown(inpDay.value, 'empty', 'không bỏ trống')
    isCheck &= validation.checkDropDown(inpLocation.value, 'empty', 'không bỏ trống')

    if (isCheck) {
        let lesson = new Lesson(
            inpName.value,
            inpNote.value,
            inpTimeStart.value,
            inpTimeEnd.value,
            inpDay.value,
            inpRoom.value,
            inpLocation.value)

        // check map true => add / false => nofication
        if (user.checkMap(lesson.day, lesson.timeStart, lesson.timeEnd) == true) {
            user.lessons[lesson.day].push(lesson)
            render()
            saveDiagRender(true)
        } else {
            document.getElementById('timeLesson').innerHTML = "trùng giờ"
        }
    }
})
// btn clear form 
btnclear.addEventListener('click', () => {
    editTableForm.reset()
})

// show schedule to client
// function find size shape lesson
let sizeShape = (timeStart, timeEnd) => {
    let span = timeEnd - timeStart;
    let size = (span + 1) * 38 + span * 3;
    // value size height
    return size;
}
let render = () => {
    // reset form
    editTableForm.reset()
    // prepare for render
    user.resetMapLesson()
    user.sortLesson()
    // render
    user.lessons.map((day, key) => {
        let content = '';
        day.map((item, index) => {
            // save map
            user.saveMap(item.day, item.timeStart, item.timeEnd)
            // size shape
            let height = sizeShape(item.timeStart, item.timeEnd)
            // cal number state     
            let state = user.stateShape(item.day, item.timeStart)
            // add note
            let note = ''
            if (item.note.trim() != '') {
                note = `
                    <div class="schedule__nofiicon"> 
                        <i class="fa fa-bell"></i>
                    </div>
                <span class="schedule__noficationed ">${item.note}</span>`
            }
            // render
            //render state
            if (state > 1) {
                for (let i = 1; i < state; i++) {
                    content += '<div class="schedule__tableitem schedule__hide" ></div>'
                }
            }
            // render lesson
            content += `
                    <div class="schedule__tableitem spanfontsize" style="height: ${height}px;" >
                    <p>${item.name}</p> 
                    <span style="color:#d69c69;font-weight: 600;" > ${item.location} - ${item.room}</span>
                    <div class="schedule__edit bdedit" onclick="showDetailLesson(${key},${index})" ></div> 
                    <div class="schedule__delete bddelete" onclick="deleteLesson(${key},${index})"></div>
                    ${note}
                    </div>`
        })
        scheduleCol[key].innerHTML = content;
    })
    // render user info
    getID('divName').innerHTML = `<span style="font-weight: 600;">Name</span> : ${user.userName}`
    getID('divClass').innerHTML = `<span style="font-weight: 600;">Class</span> : ${user.class}`
}

// function render mode css
// function switch on/off edit mode or delete mode
let editmdoe = (mode) => {
    let bdedit = document.getElementsByClassName('bdedit')
    let length = bdedit.length;
    if (mode === 'on') {
        for (let i = 0; i < length; i++) {
            bdedit[i].style.opacity = '1'
            bdedit[i].style.zIndex = '99'
        }
    } else {
        for (let i = 0; i < length; i++) {
            bdedit[i].style.opacity = '0'
            bdedit[i].style.zIndex = '-99'
        }
    }

}
let deletemdoe = (mode) => {
    let bddelete = document.getElementsByClassName('bddelete')
    let length = bddelete.length;
    if (mode === 'on') {
        for (let i = 0; i < length; i++) {
            bddelete[i].style.opacity = '1'
            bddelete[i].style.zIndex = '99'
        }
    } else {
        for (let i = 0; i < length; i++) {
            bddelete[i].style.opacity = '0'
            bddelete[i].style.zIndex = '-99'
        }
    }

}

// btn active 
// btn turn on delete shape
btnDelete.addEventListener('click', () => {
    // off edit
    editmdoe('off')
    // on delete
    deletemdoe('on')
    // prevent update and add and clear
    btnadd.style.cursor = 'no-drop';
    btnUpdate.style.cursor = 'no-drop';
    btnclear.style.cursor = 'no-drop';
    btnadd.disabled = true;
    btnclear.disabled = true;
})
// btn turn on edit shape
btnEdit.addEventListener('click', () => {
    // off delete
    deletemdoe('off')
    // on edit
    editmdoe('on')
    btnUpdate.style.cursor = 'pointer';
    // prevent clear and add
    btnadd.style.cursor = 'no-drop';
    btnclear.style.cursor = 'no-drop';
    btnadd.disabled = true;
    btnclear.disabled = true;
})
// btn sesert => turn off delete and edit shape
btnResetMode.addEventListener('click', () => {
    // off delete
    deletemdoe('off')
    // off edit
    editmdoe('off')
    // allow update and add and clear
    btnadd.style.cursor = 'pointer';
    btnUpdate.style.cursor = 'pointer';
    btnclear.style.cursor = 'pointer';
    // undisabled 
    // time start and end
    inpTimeEnd.disabled = false;
    inpTimeStart.disabled = false;
    // btn add,clear,day
    btnadd.disabled = false;
    btnclear.disabled = false;
    inpDay.disabled = false;
    // clear form
    editTableForm.reset()
    // clear validation
    nofication.innerHTML = `<p id="empty"></p> <p id="timeLesson"></p>`
})

// function handle delete and edit - update
// function delete lesson
let deleteLesson = (row, col) => {
    user.lessons[row].splice(col, 1)
    // update sever (mean : delete data)
    render()
    deletemdoe('on')
    saveDiagRender(true)
}
// function edit and update lesson
let vitri;
let showDetailLesson = (row, col) => {
    btnUpdate.disabled = false;
    let inpDay = getID('inpDay')
    let inpRoom = getID('inpRoom')
    let inpName = getID('inpName')
    let inpNote = getID('inpNote')
    let inpTimeEnd = getID('inpTimeEnd')
    let inpLocation = getID('inpLocation')
    let inpTimeStart = getID('inpTimeStart')
    // show edit lesson
    inpDay.value = user.lessons[row][col].day;
    inpRoom.value = user.lessons[row][col].room;
    inpName.value = user.lessons[row][col].name;
    inpNote.value = user.lessons[row][col].note;
    inpTimeEnd.value = user.lessons[row][col].timeEnd;
    inpLocation.value = user.lessons[row][col].location;
    inpTimeStart.value = user.lessons[row][col].timeStart;
    vitri = col;
    // disabled time => can not edit time or add clear item
    inpDay.disabled = true;
    inpTimeEnd.disabled = true;
    inpTimeStart.disabled = true;

    btnadd.disabled = true;
    btnclear.disabled = true;
}
// btn update
btnUpdate.addEventListener('click', () => {
    let inpDay = getID('inpDay')
    let inpRoom = getID('inpRoom')
    let inpName = getID('inpName')
    let inpNote = getID('inpNote')
    let inpTimeEnd = getID('inpTimeEnd')
    let inpLocation = getID('inpLocation')
    let inpTimeStart = getID('inpTimeStart')

    let lesson = new Lesson(
        inpName.value,
        inpNote.value,
        inpTimeStart.value,
        inpTimeEnd.value,
        inpDay.value,
        inpRoom.value,
        inpLocation.value)

    // get user data to edit
    user.lessons[lesson.day][vitri] = lesson
    render()
    editmdoe('on')
    saveDiagRender(true)
    btnUpdate.disabled = true;
})

