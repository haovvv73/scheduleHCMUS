class Lesson {
    constructor(name, note, timeStart, timeEnd, day, room, location) {
        this.name = name;
        this.note = note;
        this.day = day;
        this.room = room;
        this.location = location;
        this.timeStart = timeStart;
        this.timeEnd = timeEnd;
        this.timeMid = (this.timeStart + this.timeEnd) / 2
    }
}

// lessons [[], [], [], [], [], []];
// mapLesson monday [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//           tuesday [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//           wednesday [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//           thursday [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//           friday [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//           saturday [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]];
class User {
    constructor(userName, userClass, lessons = [[], [], [], [], [], []], mapLesson = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]]) {
        this.userName = userName;
        this.class = userClass;
        this.lessons = lessons;
        this.mapLesson = mapLesson;
    }
    resetMapLesson() {   //0  1  2  3  4  5  6  7  8  9 10 11
        this.mapLesson = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]];
    }
    // check shape is create
    checkMap(day, start, end) {
        start -= 1;
        for (let i = start; i < end; i++) {
            if (this.mapLesson[day][i] == 1) { return false }
        }
        return true;
    }
    saveMap(day, start, end) {
        start -= 1;
        for (let i = start; i < end; i++) {
            this.mapLesson[day][i] = 1;
        }
    }
    // sort lesson
    sortLesson() {
        for (let k = 0; k < 6; k++) {
            let lenght = this.lessons[k].length
            // buble sort - sort object lesson
            for (let i = 0; i < lenght - 1; i++) {
                for (let j = i; j < lenght - 1 - i; j++) {
                    if (this.lessons[k][j].timeMid > this.lessons[k][j + 1].timeMid) {
                        // swap
                        let temp = this.lessons[k][j]
                        this.lessons[k][j] = this.lessons[k][j + 1]
                        this.lessons[k][j + 1] = temp
                    }
                }
            }
        }
    }
    // create state push shape 
    stateShape(day, start) {
        start -= 1;
        if (start == 0) {
            return 1;
        } else {
            for (let i = start - 1; i >= 0; i--) {
                if (this.mapLesson[day][i] == 1) {
                    return start - i
                }
            }
            return start += 1;
        }

    }
}