import { ConflictException, HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserType } from '@prisma/client';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

interface SignupParams {
  email: string;
  name: string;
  phone: string;
  password: string;
}

interface SigninParams {
    email: string;
    password: string;
}

@Injectable()
export class AuthService {
  constructor(private readonly prismaService: PrismaService) {}

  async signup({email, password, name, phone}: SignupParams, userType:UserType) {
    const userExists = await this.prismaService.user.findUnique({where: { email }});

    if (userExists) { throw new ConflictException('Email already exists') }

    const hashedPassword = await bcrypt.hash(password, 10);

    let user = await this.prismaService.user.create({data: {email, name, phone, password: hashedPassword, user_type: userType}})
    console.log(user)
    const token = this.genarateJWT(userExists.name, userExists.id);
    console.log(token)
    return token;
  }

  async signin({email, password}: SigninParams) {
    const userExists = await this.prismaService.user.findFirst({where: {email}});

    if(!userExists) { throw new HttpException('Invalid Credentials', 400) };
    const hashedPassword = userExists.password;
    const isValidPassword = await bcrypt.compare(password, hashedPassword);

    if(!isValidPassword) { throw new HttpException('Invalid Credentials', 400) };

    return this.genarateJWT(userExists.name, userExists.id);
  }

  private genarateJWT(name: string, id: number){
    
    return jwt.sign({name, id}, process.env.JSON_TOKEN_KEY, {expiresIn: 360000})
  }

  async generateProductKey(email: string, userType: UserType){
    const userExists = await this.prismaService.user.findUnique({where: { email }});

    if (userExists) { throw new ConflictException('Email already exists') }

    const string = `${email}-${userType}-${process.env.PRODUCT_KEY_SECRET}`

    return bcrypt.hash(string, 10);
  }
}




