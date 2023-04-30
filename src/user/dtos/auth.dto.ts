import { IsString, IsNotEmpty, IsEmail, MinLength, IsEnum, Matches, IsOptional } from "class-validator";
import { UserType } from '@prisma/client'

export class SignupDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @Matches(/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/, {message: "Phone must be a valid phone number"})
    phone: string;

    @IsEmail()
    email: string;

    @IsString()
    @MinLength(5)
    password: string;

    @IsOptional()
    productKey?:string;
}

export class SigninDto {
    @IsNotEmpty()
    @IsString()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}

export class GenerateProductKeyDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    @IsEnum(UserType)
    userType: UserType;
}

// "attributeSet": {
//     "_id": "MobileShopAttributes",
//     "attributes": {
//         "packCount": 15,
//         "balanceType": "token",
//         "collectionV2iap": true,
//         "promoMultiplier": 10,
//         "eventName": "collectionsv2",
//         "isMostPopular": false,
//         "balanceAmount": 1005000000,
//         "packName": "pack5",
//         "isBestValue": true
//     }
// },
// "prices": [
//     {
//         "currencyType": "REAL",
//         "currencyCode": "USD",
//         "amount": 99.99
//     }
// ],
// "enabled": true,
// "categories": [
//     {
//         "_id": "mobile.default.token.shop",
//         "name": "DefaultTokensShopProducts"
//     }
// ],
// "bundle": [],
// "_originalDoc": {
//     "_id": "sku13",
//     "name": "GSNCasinoTokensMesmoOption13",
//     "type": "SIMPLE",
//     "storeIds": [
//         {
//             "id": "dev_gsncasinotokensmesmooption13",
//             "store": "GOOGLE_PLAY"
//         },
//         {
//             "id": "dev_gsncasinotokensmesmooption13",
//             "store": "APP_STORE"
//         },
//         {
//             "id": "dev_gsncasinotokensmesmooption13",
//             "store": "AMAZON"
//         }
//     ],
//     "attributeSet": {
//         "_id": "MobileShopAttributes",
//         "attributes": {
//             "packCount": 15,
//             "balanceType": "token",
//             "collectionV2iap": true,
//             "promoMultiplier": 10,
//             "eventName": "collectionsv2",
//             "isMostPopular": false,
//             "balanceAmount": 5000000,
//             "packName": "pack5",
//             "isBestValue": true
//         }
//     },
//     "prices": [
//         {
//             "currencyType": "REAL",
//             "currencyCode": "USD",
//             "amount": 99.99
//         }
//     ],
//     "enabled": true,
//     "categories": [
//         {
//             "_id": "mobile.default.token.shop",
//             "name": "DefaultTokensShopProducts"
//         }
//     ],
//     "bundle": []