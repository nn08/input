let dbConfig = require("../Utilities/mysqlConfig");



let getDescription = (criteria, callback) => {
    dbConfig.getDB().query(`select * from skills_description where 1`,criteria, callback);
}

let getEmployeeInfo = (criteria, callback) => {
    dbConfig.getDB().query(`select e.employee_name as eName, m.employee_name as amName, e.department, e.office from employee e left join manager r on e.employee_id=r.employee_id left join employee m on r.am_id = m.employee_id where e.employee_id = 123`,criteria, callback);
}

let createRecord = (dataToSet, callback) => {
    console.log("replace into record (period, employee_id, skill_id, rating, comment) VALUES ?", [dataToSet]);
    dbConfig.getDB().query(`replace into record (period, employee_id, skill_id, self_rating, comment) VALUES ? `, [dataToSet], callback);
}

/*
let getRecordDetail = (criteria, callback) => {
	let conditions = "";
    criteria.id ? conditions += ` and id = '${criteria.id}'` : true;
    dbConfig.getDB().query(`select * from record where 1 ${conditions}`, callback);
}

let getRecordDetailByPeriod = (criteria, callback) => {
	let conditions = "";
    criteria.period ? conditions += ` and period = '${criteria.period}'` : true;
    dbConfig.getDB().query(`select * from record where 1 ${conditions}`, callback);
}


let deleteRecord = (criteria, callback) => {
    let conditions = "";
   criteria.id ? conditions += ` and id = '${criteria.id}'` : true;
   console.log(`delete from record where 1 ${conditions}`);
   dbConfig.getDB().query(`delete from record where 1 ${conditions}`, callback);

}

let updateRecord = (criteria,dataToSet,callback) => {
	let conditions = "";
    let setData = "";
    criteria.id ? conditions += ` and id = '${criteria.id}'` : true;
    dataToSet.rating ? setData += `rating = '${dataToSet.rating}'` : true;
    dataToSet.period ? setData += `, period = '${dataToSet.period}'` : true;
    console.log(`UPDATE record SET ${setData} where 1 ${conditions}`);
    dbConfig.getDB().query(`UPDATE record SET ${setData} where 1 ${conditions}`, callback);
}*/

module.exports = {
    getDescription : getDescription,
    getEmployeeInfo: getEmployeeInfo,
    createRecord : createRecord,
/*
    deleteRecord : deleteRecord,
    updateRecord : updateRecord,
    getRecordDetail : getRecordDetail,
    getRecordDetailByPeriod : getRecordDetailByPeriod*/
}
