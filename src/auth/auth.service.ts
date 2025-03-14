
import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'prisma.service';
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
 constructor(private prisma: PrismaService, private readonly jwtService: JwtService) {}



 async validateUser(email: string, pass: string): Promise<any> {
  const user = await this.prisma.user.findUnique({
    where: { email },
  });

  if (user && (await bcrypt.compare(pass, user.password))) {
    const { password, ...result } = user;
    return result;
  }
  return null;
}

async login(user: any) {
  const payload = { email: user.email, sub: user.id };
  return { access_token: this.jwtService.sign(payload) };
}

}
