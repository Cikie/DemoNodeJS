const fs = require('fs');
const qs = require('qs');
const ProductService = require('../../service/productService')

class ProductRouting {
    static getHtmlProducts(products, indexHtml) {
        let tbody = '';
        products.map((products, index) => {
            tbody += ` <tr>
            <th scope="row">${index}</th>
            <td>${products.name}</td>
            <td>${products.price}</td>
            <td><a href="/edit/${products.id}" class = "btn btn-success">Edit</a></td>
            <td><a href="/delete/${products.id}" class="btn btn-danger">Delete</a></td>
        </tr>`
        });
        indexHtml = indexHtml.replace('{products}', tbody);
        return indexHtml;
    }

    static showHome(req, res) {
        fs.readFile('./view/index.html', "utf-8", async (err, indexHtml) => {
            if (err) {
                console.log(err)
            } else {
                let products = await ProductService.getProduct();
                indexHtml = ProductRouting.getHtmlProducts(products, indexHtml);
                res.writeHead(200, 'text/html');
                res.write(indexHtml);
                res.end();
            }
        });
    }

    static showFormCreate(req, res) {
        if (req.method === 'GET') {
            fs.readFile('./view/product/create.html', "utf-8", async (err, indexHtml) => {
                if (err) {
                    console.log(err)
                } else {
                    res.writeHead(200, 'text/html');
                    res.write(indexHtml);
                    res.end();
                }
            });
        } else {
            let productChunk = '';
            req.on('data', chunk => {
                productChunk += chunk
            });
            req.on('end', async (err) => {
                if (err) {
                    console.log(err);
                } else {
                    let product = qs.parse(productChunk);
                    console.log(product)
                    await ProductService.saveProduct(product);
                    res.writeHead(301, {'location': '/home'});
                    res.end();
                }
            });
        }
    }
}

module.exports = ProductRouting;