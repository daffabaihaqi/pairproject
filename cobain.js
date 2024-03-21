const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);
const hash = bcrypt.hashSync("daffaaa", salt);


console.log(bcrypt.compareSync("daffaaa", hash));

console.log(bcrypt.compareSync("daffa", hash));

