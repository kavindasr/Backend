const User = require('../models/user.model')
const bcrypt = require('bcrypt');
var generator = require('generate-password');
const converter = require('../util/converter')

/**
 *@returns Array<{officerID, name, role, stationID, stationName, location, type, contactNo}> 
 */
exports.getUsers = async (req, res) => {
	let users = [];
	try {
		users = await User.findAll({ attributes: { exclude: 'password' } });
		users = users.map(item => converter(item.dataValues))
		return res.status(200).send(users);
	} catch (e) {
		return res.status(400).send(e.message);
	}
};

/**
 * @description Auto generates a password and send it to users mail
 *@returns Object 
 */
exports.createUser = async (req, res) => {
	let user = req.body;
	try {
		let password = generator.generate({
			length: 10,
			numbers: true,
        })
        console.log(password);
		let salt = await bcrypt.genSalt(10);
		user.password = await bcrypt.hash(password, salt);
		user = await User.create(user);
		user = converter(user.dataValues);
		// sendMail("SLF New User Password",password,user.email)
		return res
			.status(200)
			.send({ ...user, password: password });
	} catch (e) {
		return res.status(400).send({ status: 400, message: e.message });
	}
};


/**
 * @param {Object} req: req.body: Any attribute excluding password
 *@returns Object{officerID, name, role, stationID, stationName, location, type, contactNo}
 */

exports.updateUser = async (req, res) => {
	let user = {};
	try {
		user = await User.update({ ...req.body}, { where: { id: req.params.userId }, returning: true });
		user = await User.findOne({ attributes:{exclude:'password'},where: { id: req.params.userId }});
		user = converter(user.dataValues)
		return res.status(200).send(user);
	} catch (e) {
		return res.status(400).send(e.message);
	}
};
/**
 * @returns success or error message 
 */
exports.deleteUser = async (req, res) => {
	try {
		await User.destroy({ where: { id: req.params.userId } });
		return res.status(200).send('User succesfully deleted');
	} catch (e) {
		return res.status(400).send(e.message);
	}
};


/**

/**
 * @returns success or error message 
 */
exports.changePassword = async (req,res) =>{
	let password = req.body.newPassword;
	let confirmPassword = req.body.confirmNewPassword;
	console.log(req.body);
	if(password != confirmPassword){
		return res.status(400).send("Passwords dont match")
	}
	let salt = await bcrypt.genSalt(10);
	password = await bcrypt.hash(password, salt);
	try{
		user = await User.update({password:password},{where:{officerID:req.params.userId}})
		user = await User.findOne({where:{officerID:req.params.userId}})
		sendMail("SLF New User Password",req.body.confirmNewPassword,user.email)
		return res.status(200).send("Password succesfully changed")
	} catch (e){
		return res.status(400).send(e.message)
	}
}
