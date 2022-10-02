const express=require('express');
const morgan=require('morgan')
const bodyParser=require('body-parser')
const cookieParser=require('cookie-parser')
var mongoose = require('mongoose');
var cors = require('cors');
const app=express();
// var api=require('/routes')
let MetaApi = require('metaapi.cloud-sdk').default;

const token = 'h1o6qbeUShy2Vi071NTmXZY0iyXQDp2b9R3AeFlNQ2wMw03fJDL9SfP56MnSDoNi';
const metaapi = new MetaApi(token);

app.use(morgan('dev'))
app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cookieParser())

app.get('/one',async (req,res)=>{
const account = await metaapi.metatraderAccountApi.getAccount('cf739a70-abf6-47d8-a217-e7c756942ba2');
const connection = account.getStreamingConnection();
await connection.connect();
const historyStorage = connection.historyStorage;
console.log(historyStorage.orderSynchronizationFinished);
console.log(historyStorage.dealSynchronizationFinished);

console.log(historyStorage.deals);
// console.log(historyStorage.dealsByTicket(1));
// console.log(historyStorage.dealsByPosition(1));
// console.log(historyStorage.historyOrders);
// console.log(historyStorage.historyOrdersByTicket(1));
// console.log(historyStorage.historyOrdersByPosition(1));

	res.json(historyStorage.deals)
})

app.listen(3000,()=>{console.log('hello word')})

function calc(){
var r=0
	for(let i=0;i<100;i++){
r++
	}
	return r
}
function calc_promise(){

	return new Promise((resolve,reject)=>{
console.log(calc())
	resolve(calc());
	})
}