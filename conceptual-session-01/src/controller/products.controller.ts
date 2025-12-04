import { IncomingMessage, ServerResponse } from "http";
import { readProduct, writeProduct } from "../services/product.server";
import { IProduct } from "../types/product.interface";
import { parseBody } from "../utility/parseBody";
import { sendResponse } from "../utility/sendResponse";

export const productController = async (req: IncomingMessage, res: ServerResponse)=>{
    const url = req.url;
    const method = req.method;
    
    const urlPart = url?.split('/'); // 'product/232/' => ['', 'product', '232']
    const id = urlPart && urlPart[1] === '/products' ? Number(urlPart[2]) : null;

    if(method === 'GET' && url === '/products'){
        try {
            const products = readProduct();
            // res.writeHead(200, {"content-type": "application/json"});
            // res.end(JSON.stringify({message: 'eita produt route', data: products}));
            // return;

            return sendResponse(res,true, 200, 'Product retrived Successfully', products);
        } catch (error) {
            return sendResponse(res,false, 404, "Something wend wrong", error);
        }

    }else if(method === 'GET' && id !== null){
        try {
            const products = readProduct();
            const product = products.find((p: IProduct)=> p.id === id)
            // res.writeHead(200, {"content-type": "application/json"});
            // res.end(JSON.stringify({message: 'eita produt route', data: products}));
            // return;
            return sendResponse(res, true, 200, "product retrived successfully", product);
        } catch (error) {
            return sendResponse(res,false, 404, "Something wend wrong", error);           
        }
    }else if(method === 'POST' && url === '/products'){
        try {
            const body = await parseBody(req);
            // console.log(body);
            const products = readProduct();
            const newProduct = {
                id: Date.now(),
                ...body,
            };
            products.push(newProduct);
            writeProduct(products);
            // res.writeHead(201, {"content-type": "application/json"});
            // res.end(JSON.stringify({message: 'product created successfully', data: newProduct}));
            // return;
            return sendResponse(res, true, 201, "Products created successfully", newProduct);
        } catch (error) {
            return sendResponse(res,false, 404, "Something wend wrong", error);             
        }
    }else if(method === 'PUT' && id !== null){
        const body = await parseBody(req);
        const products = readProduct();
        const index = products.findIndex((p: IProduct)=> p.id === id);
        console.log(index);

        if(index < 0){
            res.writeHead(404, {"content-type": "application/json"});
            res.end(JSON.stringify({message: 'Product not found'}));
            return;
        };
        products[index] = { id: products[index].id,...body}; 
        writeProduct(products);
        res.writeHead(201, {"content-type": "application/json"});
        res.end(JSON.stringify({message: 'Product updated successfully'}));
        return;
    }else if(method === 'DELETE' && id !== null){
        const body = await parseBody(req);
        const products = readProduct();
        const index = products.findIndex((p: IProduct)=> p.id === id);
        console.log(index);

        if(index < 0){
            res.writeHead(404, {"content-type": "application/json"});
            res.end(JSON.stringify({message: 'Product not found'}));
            return;
        };

        products.splice(index, 1);
        writeProduct(products);
        res.writeHead(200, {"content-type": "application/json"});
        res.end(JSON.stringify({message: 'Product delete successfully'}));
        return;

    }
};