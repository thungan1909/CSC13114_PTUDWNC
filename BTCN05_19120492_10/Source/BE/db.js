const pgp = require('pg-promise')({
    capSQL: true,
});
const schema = 'public';

// Database local
// const cn = {
//     user: 'postgres',
//     host: 'localhost',
//     database: 'registerAdvancedWeb', // điền tên db trên máy của mình vào
//     password: '123', // điền password master
//     port: 5432,
//     max: 30
// };

// Database đã được host
const cn = {
    user: 'fcopuzqtopjjuu',
    host: 'ec2-35-170-21-76.compute-1.amazonaws.com',
    database: 'd10i9h2i13rn7i', // điền tên db trên máy của mình vào
    password: '5e73a59493186c6155f76d3fae5ddff75e6ed312092252e18e54f07524194fcc', // điền password master
    port: 5432,
    max: 30,
    ssl: {
        require: true,
        rejectUnauthorized: false,
    },
};
const db = pgp(cn);

exports.load = async (tbName, orderBy) => {
    const table = new pgp.helpers.TableName({ table: tbName, schema: schema });
    const qStr = pgp.as.format(
        `SELECT * FROM $1 ORDER BY "${orderBy}" ASC `,
        table
    );

    try {
        const res = await db.any(qStr);
        return res;
    } catch (error) {
        console.log('error db/load: ', error);
    }
};

exports.get = async (tbName, fieldName, value) => {
    const table = new pgp.helpers.TableName({ table: tbName, schema: schema });
    const qStr = pgp.as.format(
        `SELECT * FROM $1 WHERE "${fieldName}"='${value}'`,
        table
    );

    try {
        const res = await db.any(qStr);
        return res;
    } catch (error) {
        console.log('error db/get: ', error);
    }
};

exports.add = async (tbName, entity) => {
    const table = new pgp.helpers.TableName({ table: tbName, schema: schema });
    const qStr = pgp.helpers.insert(entity, null, table) + ' RETURNING *';

    try {
        const res = await db.one(qStr);
        return res;
    } catch (error) {
        console.log('error db/add: ', error);
    }
};