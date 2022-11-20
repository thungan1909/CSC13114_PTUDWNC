const db = require('../../db');

const tbName = 'Account';
const idFieldName = 'Username';
module.exports = {
    add: async (data) => {
        const res = await db.add(tbName, data);
        return res;
    },
};
