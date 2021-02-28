const config = require('../config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../_helper/db');
const User = db.User;
var fs = require('fs');



module.exports = {
    authenticate,
    create,
    getById,
    getAll,
    update,
    delete: _delete,
}

async function authenticate({ username, password, deptName }) {
    const user = await User.findOne({ username });
    console.log(user)
    
        if (user && bcrypt.compareSync(password, user.hash)) {
            const { hash, ...userWithoutHash } = user.toObject();
            const token = jwt.sign({ sub: user.id }, config.secret, {
                expiresIn: '4d'
            });
            return {
                ...userWithoutHash,
                token
            }
        }
}

async function create(userParam) {
   
    // validate 
    console.log(userParam)
    if (await User.findOne({ username: userParam.username })) {
        throw 'Username "' + userParam.username + '" is already taken';
    }
    const user = new User(userParam);

    // hash password
    if (userParam.password) {
        user.hash = bcrypt.hashSync(userParam.password, 10);
    }

    const default_profile = await base64_encode('assets/default_icon.png');

    user.profilePic = fs.readFileSync('assets/default_icon.png');
    user.imageSrc = default_profile;
    user.phoneNo= userParam.phone;
    user.emailId =userParam.Email;

    // save user
    await user.save();
   
}

async function base64_encode(file) {
    var bitmap = fs.readFileSync(file);

    // console.log("bitmap " + bitmap)
    return new Buffer.from(bitmap).toString('base64');
}
async function _delete(id) {
    await User.findByIdAndRemove(id);
}


async function getById(id) {
    console.log("inside getById of user")
    console.log(id)
    return await User.findById(id).select('-hash');
}

async function getAll() {
    return await User.find().select('-hash');
}

async function update(id, userParam) {
    console.log(id)
    const user = await User.findOne({ _id: id });
    console.log(user)
    // validate
    if (!user) throw 'User not found';

    // copy userParam properties to user
    Object.assign(user, userParam);
    console.log(user);
    await user.save();
    return user;
}