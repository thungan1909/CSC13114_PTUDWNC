const db = require('../db');

const tbName = 'Account';
const idFieldName = 'Username';
module.exports = {
    get: async (username) => {
        const res = await db.get(tbName, idFieldName, username);
        if (res.length > 0) return res[0];
        return null;
    },
    add: async (data) => {
        const res = await db.add(tbName, data);
        return res;
    },
};