import { Controller, Post, Body, Param, ParseEnumPipe, UnauthorizedException } from '@nestjs/common';
import { GenerateProductKeyDto, SigninDto, SignupDto } from '../dtos/auth.dto';
import { AuthService } from './auth.service';
import { UserType } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('/signup/:userType')
    async signup(
        @Body() body: SignupDto,
        @Param('userType', new ParseEnumPipe(UserType)) userType: UserType){
        console.log(userType)    
        console.log(body.productKey)
        if(userType !== UserType.BUYER){
            if(!body.productKey){
                throw new UnauthorizedException()
            }

            const validProductKey = `${body.email}-${userType}-${process.env.PRODUCT_KEY_SECRET}`
            console.log({"validProductKey":validProductKey})

            const isValidProductKey = await bcrypt.compare(validProductKey, body.productKey);
            console.log({"ProductKey":isValidProductKey})
            if(!isValidProductKey){
                throw new UnauthorizedException();
            }
        }
        return this.authService.signup(body, userType);
    }

    @Post('/signin')
    signin(
        @Body() body: SigninDto){
        return this.authService.signin(body);
    }

    @Post('/key')
    generateProductKey(@Body() {userType, email}: GenerateProductKeyDto){
        return this.authService.generateProductKey(email, userType);
    }
}
