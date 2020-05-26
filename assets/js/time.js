function minutesToTraining(training) {
    let day = training.day;
    hour = training.time.slice(0,2);
    min = training.time.slice(3,5);
    let time = new Date();
    let todayDay = time.getDay();
    if(day == 0) day = 7;
    if(todayDay == 0) todayDay = 7;

    if(day < todayDay) {
        //prosao trening
        if(day == 7) day = 0;
        if(todayDay == 7) day = 0;
        return -1;
    } else if(day == todayDay) {
        let trainingTime = new Date();
        trainingTime.setHours(hour);
        trainingTime.setMinutes(min);
        trainingTime.setSeconds(0);

        if(day == 7) day = 0;
        if(todayDay == 7) day = 0;
        return (trainingTime - time) / (1000 * 60);
    } else return 9999;
}