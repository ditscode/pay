const fetch = require('node-fetch');
const readlineSync = require('readline-sync');
const delay = require('delay');
const cheerio = require('cheerio');
const moment = require('moment');
const fs = require('async-file');
const uuidv4 = require('uuid/v4');
var uuid = uuidv4();


const phoneNumber = readlineSync.question('Masukan No Hp: ');

const genUniqueId = length =>
    new Promise((resolve, reject) => {
        var text = "";
        var possible =
            "abcdefghijklmnopqrstuvwxyz1234567890";

        for (var i = 0; i < length; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        resolve(text);
    });

const functionGenName = () => new Promise((resolve, reject) => {
	fetch('https://fakenametool.net/random-name-generator/random/id_ID/indonesia/1', {
		method: 'GET'
	})
	.then(res => res.text())
	.then(result => {
		const $ = cheerio.load(result);
		const resText = $('div[class=col-lg-10] span').text();
		resolve(resText);
	})
	.catch(err => {
		reject(err)
	})
});



const functionDaftarGojek = (email, name, uuid, uniqid) => new Promise((resolve, reject) => {
	const url = 'https://api.gojekapi.com/v5/customers';

	const boday = {
		"email":email,
		"name":name,
		"phone": `+${phoneNumber}`,
		"signed_up_country":"ID"
	};

	fetch (url, {
		method : 'POST',
		headers : {
			'X-Session-ID': uuid,
			'X-Platform': 'Android',
			'X-UniqueId': uniqid,
			'X-AppVersion': '3.34.1',
			'X-AppId': 'com.gojek.app',
			'Accept': 'application/json',
			// 'D1': '03:25:1E:AE:CD:AF:35:FE:18:3C:15:B4:1F:94:6C:C2:0E:54:3D:84:3A:49:89:59:D9:90:EB:62:B8:AC:26:9C',
			'X-PhoneModel': 'Android,Custom',
			'X-PushTokenType': 'FCM',
			'X-DeviceOS': 'Android,6.0', 
			'Authorization': 'Bearer',
			'Accept-Language': 'en-ID',
			'X-User-Locale': 'en_ID',
			'Content-Type': 'application/json; charset=UTF-8',
			'User-Agent': 'okhttp/3.12.1'
		},
		body: JSON.stringify(boday)
	})
	.then(res => res.json())
	.then(result => {
		resolve(result)
	})
	.catch(err => {
		resolve(err)
	})
});


const functionInputOtp = (otp, otpToken, uuid, uniqid) => new Promise((resolve, reject) => {
	const url = 'https://api.gojekapi.com/v5/customers/phone/verify';

	const boday = {
		"client_name":"gojek:cons:android",
		"client_secret":"83415d06-ec4e-11e6-a41b-6c40088ab51e",
		"data":
		{
			"otp": otp,
			"otp_token":otpToken
		}
	};

	fetch (url, {
		method : 'POST',
		headers : {
			'X-Session-ID': uuid,
			'X-Platform': 'Android',
			'X-UniqueId': uniqid,
			'X-AppVersion': '3.34.1',
			'X-AppId': 'com.gojek.app',
			'Accept': 'application/json',
			// 'D1': '03:25:1E:AE:CD:AF:35:FE:18:3C:15:B4:1F:94:6C:C2:0E:54:3D:84:3A:49:89:59:D9:90:EB:62:B8:AC:26:9C',
			'X-PhoneModel': 'Android,Custom',
			'X-PushTokenType': 'FCM',
			'X-DeviceOS': 'Android,6.0', 
			'Authorization': 'Bearer',
			'Accept-Language': 'en-ID',
			'X-User-Locale': 'en_ID',
			'Content-Type': 'application/json; charset=UTF-8',
			'User-Agent': 'okhttp/3.12.1'
		},
		body: JSON.stringify(boday)
	})
	.then(res => res.json())
	.then(result => {
		resolve(result)
	})
	.catch(err => {
		reject(err)
	})
});


const functionSetPin = (pin, otpPin, accessToken, uuid, uniqid) => new Promise((resolve, reject) => {
	const url = 'https://api.gojekapi.com/wallet/pin';

	const boday = {
		"pin":pin
	};

	fetch (url, {
		method : 'POST',
		headers : {
			'otp': otpPin,
			'X-AppVersion': '3.30.2',
            'X-UniqueId': uniqid,
            'X-Session-ID': uuid,
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json; charset=UTF-8'
		},
		body: JSON.stringify(boday)
	})
	.then(res => res.json())
	.then(result => {
		resolve(result)
	})
	.catch(err => {
		reject(err)
	})
});

const functionSendOtpSetPin = (pin, otpPin, accessToken, uuid, uniqid) => new Promise((resolve, reject) => {
	const url = 'https://api.gojekapi.com/wallet/pin';

	const boday = {
		"pin":pin
	};

	fetch (url, {
		method : 'POST',
		headers : {
			'X-AppVersion': '3.30.2',
            'X-UniqueId': uniqid,
            'X-Session-ID': uuid,
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json; charset=UTF-8'
		},
		body: JSON.stringify(boday)
	})
	.then(res => res.json())
	.then(result => {
		resolve(result)
	})
	.catch(err => {
		reject(err)
	})
});


const functionRedeem = (accessToken, uuid, uniqid) => new Promise((resolve, reject) => {
    const url = 'https://api.gojekapi.com/go-promotions/v1/promotions/enrollments';

    const boday = {
        "promo_code":"SERIUSMAIN"
};

    fetch (url, {
        method : 'POST',
        headers : {
            'X-AppVersion': '3.30.2',
            'X-UniqueId': uniqid,
            'X-Session-ID': uuid,
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify(boday)
    })
    .then(res => res.json())
    .then(result => {
        resolve(result)
    })
    .catch(err => {
        reject(err)
    })
});

const functionGetQrCode = (accessTokenSend, uuid, uniqid) => new Promise((resolve, reject) => {
    const url = `https://api.gojekapi.com/wallet/qr-code?phone_number=%2B${phoneNumber}`;


    fetch(url, {
        method: 'GET',
        headers: {
            'X-AppVersion': '3.30.2',
            'X-UniqueId': uniqid,
            'X-Session-ID': uuid,
            Authorization: `Bearer ${accessTokenSend}`,
            'Content-Type': 'application/json; charset=UTF-8'
        },
    })
        .then(res => res.json())
        .then(result => {
            resolve(result)
        })
        .catch(err => {
            resolve(err)
        })

});



const functionTransfer = (accessTokenSend, qrId, uuid, uniqid) => new Promise((resolve, reject) => {
    const url = 'https://api.gojekapi.com/v2/fund/transfer';

    const boday = { 
        "amount": "22000",
        "description": "", 
        "qr_id": qrId 
    }
    fetch(url, {
        method: 'POST',
        headers: {
            'pin': '112233',
            'X-AppVersion': '3.30.2',
            'X-UniqueId': uniqid,
            'X-Session-ID': uuid,
            Authorization: `Bearer ${accessTokenSend}`,
            'Content-Type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify(boday)
    })
        .then(res => res.json())
        .then(result => {
            resolve(result)
        })
        .catch(err => {
            resolve(err)
        })

});


const functionOrder = (accessToken, uuid, uniqid) => new Promise((resolve, reject) => {
    const url = 'https://api.gojekapi.com/gobills-form/v1/inquire';

    const boday = {
    	"biller_tag":"GOO_WALLET",
    	"denomination_tag":"GOO_20K",
    	"input":{},
    	"promotions_enabled":true
    };

    fetch(url, {
        method: 'POST',
        headers: {
            'X-AppVersion': '3.30.2',
            'X-UniqueId': uniqid,
            'X-Session-ID': uuid,
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify(boday)
    })
        .then(res => res.json())
        .then(result => {
            resolve(result)
        })
        .catch(err => {
            resolve(err)
        })

});


const functionOrderGpc = (inquiryId, promoId, accessToken, uuid, uniqid) => new Promise((resolve, reject) => {
    const url = 'https://api.gojekapi.com/gobills/v3/payment';

    const boday = {
    	"inquiryId":inquiryId,
    	"paymentToken":"eyJ0eXBlIjoiR09QQVlfV0FMTEVUIiwiaWQiOiIifQ==",
    	"pin":"112233",
    	"productTag":"GOO_WALLET",
    	"promotionId":promoId,
    	"requestId":`e7e23895-6880-42c6-ac95-${genUniqueId(12)}`
    };

    fetch(url, {
        method: 'POST',
        headers: {
            'X-AppVersion': '3.30.2',
            'X-UniqueId': uniqid,
            'X-Session-ID': uuid,
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify(boday)
    })
        .then(res => res.json())
        .then(result => {
            resolve(result)
        })
        .catch(err => {
            resolve(err)
        })

});


const functionCode = (orderIdY, accessToken, uuid, uniqid) => new Promise((resolve, reject) => {
    fetch(`https://api.gojekapi.com/gobills-form/v1/response-form-data?order_id=${orderIdY}&screen=history_details`, {
        method: 'GET',
        headers: {
            'X-AppVersion': '3.30.2',
            'X-UniqueId': uniqid,
            'X-Session-ID': uuid,
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json; charset=UTF-8'
        },
    })
        .then(res => res.json())
        .then(result => {
            resolve(result)
        })
        .catch(err => {
            resolve(err)
        })

});

const functionQr = (accessToken, uuid, uniqid) => new Promise((resolve, reject) => {
    const url = 'https://api.gojekapi.com/v1/explore';

    const boday = {"data":"{\"activity\":\"GP:MT\",\"data\":{\"receiverid\":\"e18e552a-0260-4430-b066-a64152eb05ec\"}}","type":"QR_CODE"};

    fetch(url, {
        method: 'POST',
        headers: {
            'X-AppVersion': '3.30.2',
            'X-UniqueId': uniqid,
            'X-Session-ID': uuid,
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify(boday)
    })
        .then(res => res.json())
        .then(result => {
            resolve(result)
        })
        .catch(err => {
            resolve(err)
        })

});

const functionIsi = (accessToken, uuid, uniqid) => new Promise((resolve, reject) => {
    const url = 'https://api.gojekapi.com/v1/payment';

    const boday = {"amount":20000,"metadata":{"tags":"{ \"service_type\": \"GOPAY_OFFLINE\" }","channel_type":"STATIC_QR","merchant_cross_reference_id":"e18e552a-0260-4430-b066-a64152eb05ec","external_merchant_name":"Soto Seger Pak Man Klaten"},"payment_request_type":"STATIC_QR","receiver_payment_handle":"e18e552a-0260-4430-b066-a64152eb05ec"};
    fetch(url, {
        method: 'POST',
        headers: {
            'pin':'',
            'X-AppVersion': '3.30.2',
            'X-UniqueId': uniqid,
            'X-Session-ID': uuid,
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify(boday)
    })
        .then(res => res.json())
        .then(result => {
            resolve(result)
        })
        .catch(err => {
            resolve(err)
        })
});

const functionSukses = (reffId, accessToken, uuid, uniqid) => new Promise((resolve, reject) => {
    const url = 'https://api.gojekapi.com/v1/payment?action=fulfill';

    const boday = {
        "promotion_ids":[],
        "reference_id":reffId,
        "token":"eyJ0eXBlIjoiR09QQVlfV0FMTEVUIiwiaWQiOiIifQ=="
    };
    fetch(url, {
        method: 'PATCH',
        headers: {
            'pin': '112233',
            'X-AppVersion': '3.30.2',
            'X-UniqueId': uniqid,
            'X-Session-ID': uuid,
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify(boday)
    })
        .then(res => res.json())
        .then(result => {
            resolve(result)
        })
        .catch(err => {
            resolve(err)
        })

});

const functionSaldoAkun = (accessToken, uuid, uniqid) => new Promise((resolve, reject) => {
    fetch(`https://api.gojekapi.com/wallet/profile/detailed`, {
        method: 'GET',
        headers: {
            'X-AppVersion': '3.30.2',
            'X-UniqueId': uniqid,
            'X-Session-ID': uuid,
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json; charset=UTF-8'
        },
    })
        .then(res => res.json())
        .then(result => {
            resolve(result)
        })
        .catch(err => {
            resolve(err)
        })

});

const functionSaldoUtama = (accessTokenSend, uuid, uniqid) => new Promise((resolve, reject) => {
    fetch(`https://api.gojekapi.com/wallet/profile/detailed`, {
        method: 'GET',
        headers: {
            'X-AppVersion': '3.30.2',
            'X-UniqueId': uniqid,
            'X-Session-ID': uuid,
            Authorization: `Bearer ${accessTokenSend}`,
            'Content-Type': 'application/json; charset=UTF-8'
        },
    })
        .then(res => res.json())
        .then(result => {
            resolve(result)
        })
        .catch(err => {
            resolve(err)
        })

});

(async () => { 
	try {
		const uniqueid = await genUniqueId(16);
        const name = await functionGenName();
        const mail = await genUniqueId(7);
        const email = `${mail}@gmail.com`;
        const daftar = await functionDaftarGojek(email, name, uuid, uniqueid);
        if (daftar.success == false){
        	console.log(daftar)
        }
        const otpToken = daftar.data.otp_token;
        const otp = await readlineSync.question('Masukan Otp: ');
        const sendOtp = await functionInputOtp(otp, otpToken, uuid, uniqueid);
        if (!sendOtp.data.access_token) {
            console.log(sendOtp)
        }
        const accessToken =	 await  sendOtp.data.access_token;
        const saveToken = await fs.appendFile('token.txt',`${accessToken}\n`, function (err) {
            if (err) throw err;
            console.log('Gagal Menyimpan Acces Token!');
        });
		const pin = await readlineSync.question('Masukan Pin: ');   
		const setOtpPin = await functionSetPin(pin, '', accessToken, uuid, uniqueid);
		const otpPin = await readlineSync.question('Masukan Otp: ');
		const setPin = await functionSetPin(pin, otpPin, accessToken, uuid, uniqueid);
        console.log(`[ ${moment().format('HH:mm:ss')} ] Set Pin Sukses`);
        const redeem = await functionRedeem(accessToken, uuid, uniqueid);
        if (!redeem.data.message) {
            console.log(redeem)
        }
        const pesan = await redeem.data.message;
        console.log(`[ ${moment().format('HH:mm:ss')} ] `+pesan);
        const accessTokenSend = 'PASTE TOKEN WAT SENDER GOPAYLO DISINI!!!';
        const getQrId = await functionGetQrCode(accessTokenSend, uuid, uniqueid);
        if (!getQrId.data.qr_id) {
        	console.log(getQrId)
        }
        const qrId = await getQrId.data.qr_id;
        const sendSaldo = await functionTransfer(accessTokenSend, qrId, uuid, uniqueid);
        if (!sendSaldo.data.transaction_ref) {
        	console.log(sendSaldo)
        }
        const sal = await sendSaldo.data.transaction_ref;
        console.log(`[ ${moment().format('HH:mm:ss')} ] Kirim Saldo 22.000 Sukses - Trx Id: `+sal);
        const order = await functionOrder(accessToken, uuid, uniqueid);
        if (!order.data.meta_data.promotion.recommended_promotion_id) {
        	console.log(order)
        }
        const promoId = await order.data.meta_data.promotion.recommended_promotion_id;
        console.log(`[ ${moment().format('HH:mm:ss')} ] Memproses Orderan Google Play 20k`);
        if (!order.data.meta_data.inquiry_id) {
        	console.log(order)
        }
        const inquiryId = await order.data.meta_data.inquiry_id;
        const orderGpc = await functionOrderGpc(inquiryId, promoId, accessToken, uuid, uniqueid);
        if (!orderGpc.data.orderId) {
        	console.log(orderGpc)
        }
        const orderIdY = await orderGpc.data.orderId;
        await delay(5000);
        const cekCode = await functionCode(orderIdY, accessToken, uuid, uniqueid);
        if (!cekCode.data.sections[1].elements[0].value) {
        	console.log(cekCode)
        }
        const code = await cekCode.data.sections[1].elements[0].value;
        console.log(`[ ${moment().format('HH:mm:ss')} ] Pembelian Vocer Google Play 20k Sukses - Code: `+code);
        const save = await fs.appendFile('gpc.txt', `${code}\n`, function (err) {
        if (err) throw err;
        console.log(`Gagal Menyimpan Code!`);
    });
        console.log(`[ ${moment().format('HH:mm:ss')} ] Code Tersimpan di gpc.txt`);
        // const qr = await functionQr(accessToken, uuid, uniqueid);
        // const isi = await functionIsi(accessToken, uuid, uniqueid);
        // if (!isi.data.reference_id) {
        //     console.log(isi)
        // }
        // const reffId = await isi.data.reference_id;
        // const tf = await functionSukses(reffId, accessToken, uuid, uniqueid);
        // if (!tf.data.transaction_ref) {
        //     console.log(tf)
        // }
        // const id = await tf.data.transaction_ref;
        // console.log(`[ ${moment().format('HH:mm:ss')} ] Transaksi Ke Merchant Soto Seger Pak Man Klaten - Jumlah 20.000 - Transaction ID: `+id);
        const saldoAkun = await functionSaldoAkun(accessToken, uuid, uniqueid);
        if (!saldoAkun.data.balance) {
        	console.log('Gagal Cek Saldo!')
        }
        const akun = await saldoAkun.data.balance;
        console.log(`[ ${moment().format('HH:mm:ss')} ] Sisa Saldo Akun: `+akun);
        const saldoUtama = await functionSaldoUtama(accessTokenSend, uuid, uniqueid);
        if (!saldoUtama.data.balance) {
        	console.log(saldoUtama)
        }
        const utama = await saldoUtama.data.balance;
        console.log(`[ ${moment().format('HH:mm:ss')} ] Sisa Saldo Akun Utama: `+utama);
	} catch (e) {
		console.log(e)
	}
})();