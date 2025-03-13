
import { Body, Controller, Post, HttpCode, HttpStatus, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './auth.guard';
import { Public } from 'src/public.decorator';
import { AuthGuard } from '@nestjs/passport';


@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

 /*  @HttpCode(HttpStatus.OK)
  @Post('/login')
 async signIn(@Body() signInDto: Record<string, any>) {

  console.log(signInDto);
    
    const userFounded = await this.authService.validate(signInDto.email, signInDto.password);
   
    if (!userFounded) {
      return {
        statusCode: 401,
        message: 'Credenciales incorrectas',
      };
    } 

    return  {
      statusCode: 200,
      message: 'Usuario encontrado',
      data: {
        id: userFounded?.id,
        name: userFounded?.name,
        lastName: userFounded?.lastName,
        contactPhone: userFounded?.contactPhone,
        roles: userFounded?.roles,
        skills: userFounded?.skills,
        experience: userFounded?.experience,
        ratings: userFounded?.ratings,
        educations: userFounded?.educations,
        avatar: userFounded?.avatar,
        email: userFounded?.email,
        categories: userFounded?.categories.map(uc => uc.category), // 🔹 Extraer solo las categorías,
        accessToken: userFounded?.token,
      },
    };
  } */

    
    @Public() // 🔓 No requiere autenticación
    @UseGuards(AuthGuard('local'))
    @Post('login')
    async login(@Request() req) {
      return this.authService.login(req.user);
    }
}
