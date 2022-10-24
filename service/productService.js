const Connection = require('../model/connection');
Connection.connecting();

class ProductService {
    static getProduct() {
        let connection = Connection.getConnection();
        return new Promise((resolve, reject) => {
            connection.query('select * from product', (err, products) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(products);
                }
            });
        });
    };

    static saveProduct(product) {
        let connection = Connection.getConnection();
        return new Promise((resolve, reject) => {
            connection.query(`insert into product(name, price, description) values ('${product.name}',${+product.price},'${product.description}')`, (err, products) => {
                if (err) {
                    reject(err);
                } else {
                    console.log('Created Success !!!')
                    resolve(products);
                }
            });
        });
    };
}

module.exports = ProductService

