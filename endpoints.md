API Endpoints

Base URL: /api/public/v1

All endpoints require:
Authentication: Authorization: Bearer <token> header

Required scope: Varies per endpoint

1. GET /api/public/v1/balance
Auth Scope: wallet:read
Query Parameters:
currency (optional, multiple): Filter by currency (e.g., ?currency=BRL&currency=USDT)
detail (optional): Include wallet details (?detail=true or ?detail=1 or ?detail=yes)
Response: User balance information

200:

{
    "balances": {
        "BRL": {
            "available_cents": 0,
            "locked_cents": 0,
            "total_cents": 0
        }
    },
    "user": {
        "email": "hugocebrian@outlook.com",
        "id": "69148959e9f08df836ff9aa2",
        "name": "Victor Hugo"
    }
}

2. GET /api/public/v1/wallets
Auth Scope: wallet:read
Query Parameters:
limit (optional): Number of wallets to return (default: 20, max: 200)
Response: List of user wallets

200:

{
    "items": [
        {
            "available_cents": 0,
            "created_at": "2025-11-12T13:19:21.090000Z",
            "locked_cents": 0,
            "wallet_id": "691489598c48b81f7087ed83"
        }
    ]
}

3. POST /api/public/v1/transactions/pix
Auth Scope: payments:create
Headers:
Idempotency-Key (optional): Idempotency key for the request
Body Parameters:
amount_cents or amountCents (required): Amount in cents (integer)
comment (optional): Comment/description for the transaction
Response: Created PIX transaction with QR code


200
{
    "amountCents": 500,
    "expiresAt": "2025-11-25T22:40:55.109000Z",
    "feeCents": 200,
    "netCents": 300,
    "qrCode": "00020101021226810014br.gov.bcb.pix2559qr.woovi.com/qr/v2/cob/44bf9610-d4b8-412b-abe7-f0a6909a74d852040000530398654045.005802BR5916VETUSPAY_IP_LTDA6009Sao_Paulo62290525907ba5795ce34aa59146a3bd063045159",
    "qrCodeUrl": "https://api.woovi.com/openpix/charge/brcode/image/5570b3fe-cf83-4de9-8c61-283595247baa.png",
    "saleId": "69262f4b53e9bd75799f3248",
    "status": "pending"
}

status: "expired"

{
    "amountCents": 500,
    "feeCents": 200,
    "netCents": 300,
    "raw": {
        "charge": {
            "additionalInfo": [],
            "brCode": "00020101021226810014br.gov.bcb.pix2559qr.woovi.com/qr/v2/cob/0107eb2d-b753-4bb5-a1a2-35e5ed832ffb52040000530398654045.005802BR5916VETUSPAY_IP_LTDA6009Sao_Paulo622905257850637228e649dfb2b787ab463045A2F",
            "comment": "Test 1",
            "correlationID": "69148959e9f08df836ff9aa2-1764277188318-999606499e2c",
            "createdAt": "2025-11-27T20:59:48.509Z",
            "discount": 0,
            "ensureSameTaxID": false,
            "expiresDate": "2025-11-27T21:04:48.466Z",
            "expiresIn": 300,
            "fee": 85,
            "globalID": "Q2hhcmdlOjY5MjhiYmM0ZjAxM2ZhYTlkNmEwZDU2Ng==",
            "identifier": "7850637228e649dfb2b787ab401d0b84",
            "paymentLinkID": "5f0c8fe8-2c2d-4499-8967-ee3efc24884b",
            "paymentLinkUrl": "https://woovi.com/pay/5f0c8fe8-2c2d-4499-8967-ee3efc24884b",
            "paymentMethods": {
                "pix": {
                    "brCode": "00020101021226810014br.gov.bcb.pix2559qr.woovi.com/qr/v2/cob/0107eb2d-b753-4bb5-a1a2-35e5ed832ffb52040000530398654045.005802BR5916VETUSPAY_IP_LTDA6009Sao_Paulo622905257850637228e649dfb2b787ab463045A2F",
                    "fee": 85,
                    "identifier": "7850637228e649dfb2b787ab401d0b84",
                    "method": "PIX_COB",
                    "qrCodeImage": "https://api.woovi.com/openpix/charge/brcode/image/5f0c8fe8-2c2d-4499-8967-ee3efc24884b.png",
                    "status": "ACTIVE",
                    "transactionID": "7850637228e649dfb2b787ab401d0b84",
                    "txId": "7850637228e649dfb2b787ab401d0b84",
                    "value": 500
                }
            },
            "pixKey": "8a5fb48d-4999-4fbc-b956-446e13f19090",
            "qrCodeImage": "https://api.woovi.com/openpix/charge/brcode/image/5f0c8fe8-2c2d-4499-8967-ee3efc24884b.png",
            "status": "ACTIVE",
            "transactionID": "7850637228e649dfb2b787ab401d0b84",
            "type": "DYNAMIC",
            "updatedAt": "2025-11-27T20:59:48.509Z",
            "value": 500,
            "valueWithDiscount": 500
        }
    },
    "saleId": "6928bbc40c954bd59f12ec30",
    "status": "expired"
}

4. GET /api/public/v1/transactions/pix
Auth Scope: payments:read
Query Parameters:
limit (optional): Number of transactions to return (default: 20, max: 100)
status (optional): Filter by status (pending, paid, expired, failed, refused)
Response: List of latest PIX transactions

200:

status: "pending":

{
    "amountCents": 500,
    "brCode": "00020101021226810014br.gov.bcb.pix2559qr.woovi.com/qr/v2/cob/22f6337b-5615-424b-b03d-b69c27a1c5c752040000530398654045.005802BR5916VETUSPAY_IP_LTDA6009Sao_Paulo6229052561df0af6628b41cc92ec5370463045966",
    "expiresAt": "2025-12-02T00:30:49.952000Z",
    "feeCents": 200,
    "id": "692e320e1bb2608c187f94fb",
    "netCents": 300,
    "qrCodeUrl": "https://api.woovi.com/openpix/charge/brcode/image/291a639e-1a59-4a18-8078-f111733ceb2e.png",
    "raw": {
        "charge": {
            "additionalInfo": [],
            "brCode": "00020101021226810014br.gov.bcb.pix2559qr.woovi.com/qr/v2/cob/22f6337b-5615-424b-b03d-b69c27a1c5c752040000530398654045.005802BR5916VETUSPAY_IP_LTDA6009Sao_Paulo6229052561df0af6628b41cc92ec5370463045966",
            "comment": "Test 1",
            "correlationID": "69148959e9f08df836ff9aa2-1764635149716-1de60da76cc8",
            "createdAt": "2025-12-02T00:25:49.991Z",
            "discount": 0,
            "ensureSameTaxID": false,
            "expiresDate": "2025-12-02T00:30:49.952Z",
            "expiresIn": 300,
            "fee": 85,
            "globalID": "Q2hhcmdlOjY5MmUzMjBkMzk3NmI2NGU0ZjEyODdhNQ==",
            "identifier": "61df0af6628b41cc92ec53704f02e0b2",
            "paymentLinkID": "291a639e-1a59-4a18-8078-f111733ceb2e",
            "paymentLinkUrl": "https://woovi.com/pay/291a639e-1a59-4a18-8078-f111733ceb2e",
            "paymentMethods": {
                "pix": {
                    "brCode": "00020101021226810014br.gov.bcb.pix2559qr.woovi.com/qr/v2/cob/22f6337b-5615-424b-b03d-b69c27a1c5c752040000530398654045.005802BR5916VETUSPAY_IP_LTDA6009Sao_Paulo6229052561df0af6628b41cc92ec5370463045966",
                    "fee": 85,
                    "identifier": "61df0af6628b41cc92ec53704f02e0b2",
                    "method": "PIX_COB",
                    "qrCodeImage": "https://api.woovi.com/openpix/charge/brcode/image/291a639e-1a59-4a18-8078-f111733ceb2e.png",
                    "status": "ACTIVE",
                    "transactionID": "61df0af6628b41cc92ec53704f02e0b2",
                    "txId": "61df0af6628b41cc92ec53704f02e0b2",
                    "value": 500
                }
            },
            "pixKey": "8a5fb48d-4999-4fbc-b956-446e13f19090",
            "qrCodeImage": "https://api.woovi.com/openpix/charge/brcode/image/291a639e-1a59-4a18-8078-f111733ceb2e.png",
            "status": "ACTIVE",
            "transactionID": "61df0af6628b41cc92ec53704f02e0b2",
            "type": "DYNAMIC",
            "updatedAt": "2025-12-02T00:25:49.991Z",
            "value": 500,
            "valueWithDiscount": 500
        }
    },
    "status": "pending"
}

status: "expired":

{
    "amountCents": 500,
    "brCode": "00020101021226810014br.gov.bcb.pix2559qr.woovi.com/qr/v2/cob/0107eb2d-b753-4bb5-a1a2-35e5ed832ffb52040000530398654045.005802BR5916VETUSPAY_IP_LTDA6009Sao_Paulo622905257850637228e649dfb2b787ab463045A2F",
    "expiresAt": "2025-11-28T00:06:47.442000Z",
    "feeCents": 200,
    "id": "6928bbc40c954bd59f12ec30",
    "netCents": 300,
    "qrCodeUrl": "https://api.woovi.com/openpix/charge/brcode/image/5f0c8fe8-2c2d-4499-8967-ee3efc24884b.png",
    "raw": {
        "charge": {
            "additionalInfo": [],
            "brCode": "00020101021226810014br.gov.bcb.pix2559qr.woovi.com/qr/v2/cob/0107eb2d-b753-4bb5-a1a2-35e5ed832ffb52040000530398654045.005802BR5916VETUSPAY_IP_LTDA6009Sao_Paulo622905257850637228e649dfb2b787ab463045A2F",
            "comment": "Test 1",
            "correlationID": "69148959e9f08df836ff9aa2-1764277188318-999606499e2c",
            "createdAt": "2025-11-27T20:59:48.509Z",
            "discount": 0,
            "ensureSameTaxID": false,
            "expiresDate": "2025-11-27T21:04:48.466Z",
            "expiresIn": 300,
            "fee": 85,
            "globalID": "Q2hhcmdlOjY5MjhiYmM0ZjAxM2ZhYTlkNmEwZDU2Ng==",
            "identifier": "7850637228e649dfb2b787ab401d0b84",
            "paymentLinkID": "5f0c8fe8-2c2d-4499-8967-ee3efc24884b",
            "paymentLinkUrl": "https://woovi.com/pay/5f0c8fe8-2c2d-4499-8967-ee3efc24884b",
            "paymentMethods": {
                "pix": {
                    "brCode": "00020101021226810014br.gov.bcb.pix2559qr.woovi.com/qr/v2/cob/0107eb2d-b753-4bb5-a1a2-35e5ed832ffb52040000530398654045.005802BR5916VETUSPAY_IP_LTDA6009Sao_Paulo622905257850637228e649dfb2b787ab463045A2F",
                    "fee": 85,
                    "identifier": "7850637228e649dfb2b787ab401d0b84",
                    "method": "PIX_COB",
                    "qrCodeImage": "https://api.woovi.com/openpix/charge/brcode/image/5f0c8fe8-2c2d-4499-8967-ee3efc24884b.png",
                    "status": "EXPIRED",
                    "transactionID": "7850637228e649dfb2b787ab401d0b84",
                    "txId": "7850637228e649dfb2b787ab401d0b84",
                    "value": 500
                }
            },
            "pixKey": "8a5fb48d-4999-4fbc-b956-446e13f19090",
            "qrCodeImage": "https://api.woovi.com/openpix/charge/brcode/image/5f0c8fe8-2c2d-4499-8967-ee3efc24884b.png",
            "status": "EXPIRED",
            "transactionID": "7850637228e649dfb2b787ab401d0b84",
            "type": "DYNAMIC",
            "updatedAt": "2025-11-27T21:05:02.719Z",
            "value": 500,
            "valueWithDiscount": 500
        }
    },
    "status": "expired"
}

{
    "count": 8,
    "items": [
        {
            "amountCents": 500,
            "chargeId": "5483db2340e6496fbf38564ff4e2ab8b",
            "createdAt": "2025-11-25T23:19:13.458000Z",
            "expiresAt": "2025-11-25T23:24:13.501000Z",
            "feeCents": 200,
            "id": "6926397183d8d0025e670124",
            "netCents": 300,
            "status": "pending",
            "updatedAt": "2025-11-25T23:19:13.458000Z"
        },
        {
            "amountCents": 500,
            "chargeId": "907ba5795ce34aa59146a3bd0c187415",
            "createdAt": "2025-11-25T22:35:55.068000Z",
            "expiresAt": "2025-11-25T22:40:55.109000Z",
            "feeCents": 200,
            "id": "69262f4b53e9bd75799f3248",
            "netCents": 300,
            "status": "failed",
            "updatedAt": "2025-11-25T22:40:57.693000Z"
        },
        {
            "amountCents": 500,
            "chargeId": "cbcb9d665c1844a99a9f943e34d7c3d9",
            "createdAt": "2025-11-25T22:33:25.175000Z",
            "expiresAt": "2025-11-26T01:40:24.175000Z",
            "feeCents": 200,
            "id": "69262eb553e9bd75799f3247",
            "netCents": 300,
            "status": "expired",
            "updatedAt": "2025-11-25T22:33:50.478000Z"
        },
        {
            "amountCents": 500,
            "chargeId": "d0accc130bf747aaa13aca3ff1bfddab",
            "createdAt": "2025-11-25T22:33:04.635000Z",
            "expiresAt": "2025-11-26T01:40:03.635000Z",
            "feeCents": 200,
            "id": "69262ea05ae36806c729651d",
            "netCents": 300,
            "status": "expired",
            "updatedAt": "2025-11-25T22:33:54.611000Z"
        },
        {
            "amountCents": 500,
            "chargeId": "a51b2a5cece14d0fa055b3e272d9a5ce",
            "createdAt": "2025-11-25T22:31:56.405000Z",
            "expiresAt": "2025-11-26T01:38:55.405000Z",
            "feeCents": 200,
            "id": "69262e5c5ae36806c729651c",
            "netCents": 300,
            "status": "expired",
            "updatedAt": "2025-11-25T22:33:58.140000Z"
        },
        {
            "amountCents": 500,
            "chargeId": "b39f253cd6b04b62a75af3eadccca251",
            "createdAt": "2025-11-25T22:15:51.470000Z",
            "expiresAt": "2025-11-26T01:22:50.470000Z",
            "feeCents": 200,
            "id": "69262a975ae36806c729651b",
            "netCents": 300,
            "status": "expired",
            "updatedAt": "2025-11-25T23:11:44.922000Z"
        },
        {
            "amountCents": 500,
            "chargeId": "6a79a55f31814e5b80bc198c2f2e21e1",
            "createdAt": "2025-11-25T22:13:52.786000Z",
            "expiresAt": null,
            "feeCents": 200,
            "id": "69262a205ae36806c729651a",
            "netCents": 300,
            "status": "paid",
            "updatedAt": "2025-11-25T22:25:26.022000Z"
        },
        {
            "amountCents": 500,
            "chargeId": "e6506a0f09b2477cb00ef4fa21d338bd",
            "createdAt": "2025-11-25T18:38:14.804000Z",
            "expiresAt": null,
            "feeCents": 200,
            "id": "6925f7966bf5db6ff6cdf86d",
            "netCents": 300,
            "status": "paid",
            "updatedAt": "2025-11-25T18:45:13.260000Z"
        }
    ]
}

5. GET /api/public/v1/transactions/pix/<sale_id>
Auth Scope: payments:read
Path Parameters:
sale_id (required): Sale/transaction ID
Query Parameters:
sync (optional): Sync with provider (?sync=true or ?sync=1 or ?sync=yes)
Response: PIX transaction status and details

{
    "amountCents": 500,
    "brCode": "00020101021226810014br.gov.bcb.pix2559qr.woovi.com/qr/v2/cob/6bda0c48-3690-4011-ba22-af6a92dbedfd52040000530398654045.005802BR5916VETUSPAY_IP_LTDA6009Sao_Paulo62290525bac107b7eab34c978b5d4c6b96304D613",
    "expiresAt": "2025-11-25T23:30:28.285000Z",
    "feeCents": 200,
    "id": "69263ae883d8d0025e670125",
    "netCents": 300,
    "qrCodeUrl": "https://api.woovi.com/openpix/charge/brcode/image/5b04968d-e45a-48c8-9c48-298cd6f675f9.png",
    "raw": {
        "charge": {
            "additionalInfo": [],
            "brCode": "00020101021226810014br.gov.bcb.pix2559qr.woovi.com/qr/v2/cob/6bda0c48-3690-4011-ba22-af6a92dbedfd52040000530398654045.005802BR5916VETUSPAY_IP_LTDA6009Sao_Paulo62290525bac107b7eab34c978b5d4c6b96304D613",
            "comment": "Test 1",
            "correlationID": "69148959e9f08df836ff9aa2-1764113128031-b7eb3fa97144",
            "createdAt": "2025-11-25T23:25:28.325Z",
            "discount": 0,
            "ensureSameTaxID": false,
            "expiresDate": "2025-11-25T23:30:28.285Z",
            "expiresIn": 300,
            "fee": 85,
            "globalID": "Q2hhcmdlOjY5MjYzYWU4MTVhOTdiZmE4NDVmMjU0YQ==",
            "identifier": "bac107b7eab34c978b5d4c6b9505ffcb",
            "paymentLinkID": "5b04968d-e45a-48c8-9c48-298cd6f675f9",
            "paymentLinkUrl": "https://woovi.com/pay/5b04968d-e45a-48c8-9c48-298cd6f675f9",
            "paymentMethods": {
                "pix": {
                    "brCode": "00020101021226810014br.gov.bcb.pix2559qr.woovi.com/qr/v2/cob/6bda0c48-3690-4011-ba22-af6a92dbedfd52040000530398654045.005802BR5916VETUSPAY_IP_LTDA6009Sao_Paulo62290525bac107b7eab34c978b5d4c6b96304D613",
                    "fee": 85,
                    "identifier": "bac107b7eab34c978b5d4c6b9505ffcb",
                    "method": "PIX_COB",
                    "qrCodeImage": "https://api.woovi.com/openpix/charge/brcode/image/5b04968d-e45a-48c8-9c48-298cd6f675f9.png",
                    "status": "ACTIVE",
                    "transactionID": "bac107b7eab34c978b5d4c6b9505ffcb",
                    "txId": "bac107b7eab34c978b5d4c6b9505ffcb",
                    "value": 500
                }
            },
            "pixKey": "8a5fb48d-4999-4fbc-b956-446e13f19090",
            "qrCodeImage": "https://api.woovi.com/openpix/charge/brcode/image/5b04968d-e45a-48c8-9c48-298cd6f675f9.png",
            "status": "ACTIVE",
            "transactionID": "bac107b7eab34c978b5d4c6b9505ffcb",
            "type": "DYNAMIC",
            "updatedAt": "2025-11-25T23:25:28.325Z",
            "value": 500,
            "valueWithDiscount": 500
        }
    },
    "status": "pending"
}

6. POST /api/public/v1/withdrawals
Auth Scope: withdrawals:write
Headers:
Idempotency-Key (optional): Idempotency key for the request
Body Parameters:
amount_cents or amountCents (required): Amount in cents (integer, must be between MIN_WITHDRAWAL_CENTS and MAX_WITHDRAWAL_CENTS)
Response: Withdrawal details with balance information (current and after withdrawal if successful)

RES:

{
    "amount_cents": 600,
    "balances": {
        "after": {
            "BRL": {
                "available_cents": 0,
                "locked_cents": 0,
                "total_cents": 0
            }
        },
        "current": {
            "BRL": {
                "available_cents": 600,
                "locked_cents": 0,
                "total_cents": 600
            }
        }
    },
    "destination": {
        "account": "10712869",
        "bank": "NU PAGAMENTOS - IP",
        "branch": "1",
        "name": "Victor Hugo Bernardo Ferreira Damasceno",
        "pixKey": "17927620703",
        "taxIDMasked": "179.***.***-03"
    },
    "fee_cents": 500,
    "net_amount_cents": 100,
    "ok": true,
    "status": "approved",
    "total_debit_cents": 600,
    "transaction": {
        "creditParty": {
            "account": {
                "account": "10712869",
                "accountType": "TRAN",
                "branch": "1"
            },
            "holder": {
                "name": "Victor Hugo Bernardo Ferreira Damasceno",
                "nameFriendly": "Victor Hugo Bernardo Ferreira Damasceno",
                "taxID": {
                    "taxID": "17927620703",
                    "type": "BR:CPF"
                }
            },
            "pixKey": {
                "pixKey": "17927620703",
                "type": "CPF"
            },
            "psp": {
                "id": "18236120",
                "name": "NU PAGAMENTOS - IP"
            }
        },
        "debitParty": {
            "account": {
                "account": "00000000000001239430",
                "accountType": "TRAN",
                "branch": "0001"
            },
            "holder": {
                "name": "VETUSPAY IP LTDA",
                "nameFriendly": "VETUSPAY IP LTDA",
                "taxID": {
                    "taxID": "62569931000162",
                    "type": "BR:CNPJ"
                }
            },
            "psp": {
                "code": "54811417",
                "id": "54811417",
                "name": "WOOVI IP LTDA"
            }
        },
        "endToEndId": "E548114172025112522574SdZdXgBBF2",
        "time": "2025-11-25T22:57:52.080Z",
        "value": 100
    },
    "transactionId": "E548114172025112522574SdZdXgBBF2",
    "wallet": {
        "available_cents": 0,
        "locked_cents": 0
    },
    "wid": "WID-20251125-8EE83F"
}

7. GET /api/public/v1/withdrawals
Auth Scope: withdrawals:read
Query Parameters:
limit (optional): Number of withdrawals to return (default: 20, max: 100)
status (optional): Filter by status (pending, processing, approved, refused, failed)
Response: List of user withdrawals

{
    "items": [
        {
            "amountCents": 600,
            "createdAt": "2025-11-25T22:57:51.444000Z",
            "feeCents": 500,
            "netAmountCents": 100,
            "status": "approved",
            "totalDebitCents": 600,
            "transactionId": "E548114172025112522574SdZdXgBBF2",
            "updatedAt": "2025-11-25T22:57:52.092000Z",
            "wid": "WID-20251125-8EE83F"
        },
        {
            "amountCents": 600,
            "createdAt": "2025-11-25T22:55:56.433000Z",
            "feeCents": 500,
            "netAmountCents": 100,
            "status": "failed",
            "totalDebitCents": 600,
            "transactionId": "",
            "updatedAt": "2025-11-25T22:55:56.672000Z",
            "wid": "WID-20251125-E7C33F"
        },
        {
            "amountCents": 600,
            "createdAt": "2025-11-25T22:50:20.510000Z",
            "feeCents": 500,
            "netAmountCents": 100,
            "status": "failed",
            "totalDebitCents": 600,
            "transactionId": "",
            "updatedAt": "2025-11-25T22:50:20.654000Z",
            "wid": "WID-20251125-AE2EC1"
        },
        {
            "amountCents": 600,
            "createdAt": "2025-11-25T22:48:53.485000Z",
            "feeCents": 500,
            "netAmountCents": 100,
            "status": "failed",
            "totalDebitCents": 600,
            "transactionId": "",
            "updatedAt": "2025-11-25T22:48:53.698000Z",
            "wid": "WID-20251125-9DBE67"
        }
    ]
}

8. GET /api/public/v1/withdrawals/<wid>
Auth Scope: withdrawals:read
Path Parameters:
wid (required): Withdrawal ID (format: WID-YYYYMMDD-XXXXXX)
Response: Withdrawal details

{
    "amount_cents": 600,
    "balances": {
        "BRL": {
            "available_cents": 0,
            "locked_cents": 0,
            "total_cents": 0
        }
    },
    "created_at": "2025-11-25T22:57:51.444000Z",
    "destination": {
        "account": "10712869",
        "bank": "NU PAGAMENTOS - IP",
        "branch": "1",
        "name": "Victor Hugo Bernardo Ferreira Damasceno",
        "pixKey": "17927620703",
        "taxIDMasked": "179.***.***-03"
    },
    "fee_cents": 500,
    "net_amount_cents": 100,
    "status": "approved",
    "total_debit_cents": 600,
    "transaction": {
        "creditParty": {
            "account": {
                "account": "10712869",
                "accountType": "TRAN",
                "branch": "1"
            },
            "holder": {
                "name": "Victor Hugo Bernardo Ferreira Damasceno",
                "nameFriendly": "Victor Hugo Bernardo Ferreira Damasceno",
                "taxID": {
                    "taxID": "17927620703",
                    "type": "BR:CPF"
                }
            },
            "pixKey": {
                "pixKey": "17927620703",
                "type": "CPF"
            },
            "psp": {
                "id": "18236120",
                "name": "NU PAGAMENTOS - IP"
            }
        },
        "debitParty": {
            "account": {
                "account": "00000000000001239430",
                "accountType": "TRAN",
                "branch": "0001"
            },
            "holder": {
                "name": "VETUSPAY IP LTDA",
                "nameFriendly": "VETUSPAY IP LTDA",
                "taxID": {
                    "taxID": "62569931000162",
                    "type": "BR:CNPJ"
                }
            },
            "psp": {
                "code": "54811417",
                "id": "54811417",
                "name": "WOOVI IP LTDA"
            }
        },
        "endToEndId": "E548114172025112522574SdZdXgBBF2",
        "time": "2025-11-25T22:57:52.080Z",
        "value": 100
    },
    "transactionId": "E548114172025112522574SdZdXgBBF2",
    "updated_at": "2025-11-25T22:57:52.092000Z",
    "wallet": {
        "available_cents": 0,
        "locked_cents": 0
    },
    "wid": "WID-20251125-8EE83F"
}