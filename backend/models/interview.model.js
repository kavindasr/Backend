const sequelize = require('../database/connection');
const {DataTypes} = require('sequelize')


const Interview = sequelize.define(
	'Interview',
	{
        InterviewID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
		panelID:  DataTypes.INTEGER ,
        intervieweeID: DataTypes.TEXT,
        date: DataTypes.DATEONLY,
        time: DataTypes.TIME,
        state: {
            type: DataTypes.ENUM,
            values: ['Not Commenced','Ongoing','Completed']
        },
        feedback: DataTypes.TEXT
	},
	{ freezeTableName: true, timestamps: false }
);


module.exports = Interview;