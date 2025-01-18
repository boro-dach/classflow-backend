import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma.service';
import * as argon2 from 'argon2';
import { studentRegisterDto, studentLoginDto, teacherRegisterDto, teacherLoginDto } from './dto/auth.dto';

const logger = new Logger();

export interface TokenPayload {
  id: number;
  email: string;
  role: 'student' | 'teacher';
}

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  // Генерация JWT токена
  public async generateToken(payload: TokenPayload): Promise<string> {
    return this.jwtService.sign(payload);
  }

  // Регистрация студента
  public async registerStudent(dto: studentRegisterDto) {
    // Хеширование пароля
    const hashedPassword = await argon2.hash(dto.password);

    // Создание нового студента в базе данных
    const student = await this.prisma.student.create({
      data: {
        email: dto.email,
        password: hashedPassword,
        name: dto.name,
        surname: dto.surname,
      },
    });

    logger.log('при геристрации создан ученик ', student)

    // Генерация токена для студента
    const token = await this.generateToken({
      id: student.id,
      email: student.email,
      role: 'student',
    });

    logger.log('ученику сгенерирован токен ', token)

    // Обновление данных студента с добавлением токена
    await this.prisma.student.update({
      where: { id: student.id },
      data: { accessToken: token },
    });

    // Возвращаем результат с данными студента и токеном

    return {
      id: student.id,
      name: student.name,
      surname: student.surname,
      email: student.email,
      token
    };
  }

  // Логин студента
  public async loginStudent(dto: studentLoginDto) {
    const student = await this.prisma.student.findUnique({
      where: { email: dto.email },
    });

    // Проверка, существует ли студент
    if (!student) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Проверка пароля
    const isPasswordValid = await argon2.verify(student.password, dto.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Генерация нового токена для студента
    const token = await this.generateToken({
      id: student.id,
      email: student.email,
      role: 'student',
    });

    // Обновление токена в базе данных
    await this.prisma.student.update({
      where: { id: student.id },
      data: { accessToken: token },
    });

    // Возвращаем результат с данными студента и токеном
    return {
      id: student.id,
      name: student.name,
      surname: student.surname,
      email: student.email,
      token
    };
  }

    // Регистрация учителя
    public async registerTeacher(dto: teacherRegisterDto) {
      // Хеширование пароля
      const hashedPassword = await argon2.hash(dto.password);
  
      // Создание нового студента в базе данных
      const teacher = await this.prisma.teacher.create({
        data: {
          email: dto.email,
          password: hashedPassword,
          name: dto.name,
          surname: dto.surname,
        },
      });
  
      logger.log('при геристрации создан учитель ', teacher)
  
      // Генерация токена для учителя
      const token = await this.generateToken({
        id: teacher.id,
        email: teacher.email,
        role: 'teacher',
      });
  
      logger.log('учителю сгенерирован токен ', token)
  
      // Обновление данных студента с добавлением токена
      await this.prisma.teacher.update({
        where: { id: teacher.id },
        data: { accessToken: token },
      });
  
      // Возвращаем результат с данными студента и токеном
  
      return {
        id: teacher.id,
        name: teacher.name,
        surname: teacher.surname,
        email: teacher.email,
        token
      };
    }
  
    // Логин учителя
    public async loginTeacher(dto: teacherLoginDto) {
      const teacher = await this.prisma.teacher.findUnique({
        where: { email: dto.email },
      });
  
      // Проверка, существует ли студент
      if (!teacher) {
        throw new UnauthorizedException('Invalid credentials');
      }
  
      // Проверка пароля
      const isPasswordValid = await argon2.verify(teacher.password, dto.password);
      if (!isPasswordValid) {
        throw new UnauthorizedException('Invalid credentials');
      }
  
      // Генерация нового токена для студента
      const token = await this.generateToken({
        id: teacher.id,
        email: teacher.email,
        role: 'teacher',
      });
  
      // Обновление токена в базе данных
      await this.prisma.teacher.update({
        where: { id: teacher.id },
        data: { accessToken: token },
      });
  
      // Возвращаем результат с данными студента и токеном
      return {
        id: teacher.id,
        name: teacher.name,
        surname: teacher.surname,
        email: teacher.email,
        token
      };
    }

  // Валидация токена
  public async validateToken(token: string): Promise<boolean> {
    try {
      const payload = await this.jwtService.verify(token);

      // Проверка роли пользователя и токена
      if (payload.role === 'student') {
        const student = await this.prisma.student.findUnique({
          where: { id: payload.id },
        });
        return student?.accessToken === token;
      } else if (payload.role === 'teacher') {
        const teacher = await this.prisma.teacher.findUnique({
          where: { id: payload.id },
        });
        return teacher?.accessToken === token;
      }

      return false;
    } catch {
      return false;
    }
  }

  // Валидация запроса с проверкой токена
  public async validateRequest(token: string): Promise<TokenPayload> {
    if (!token) {
      throw new UnauthorizedException();
    }

    const isValid = await this.validateToken(token);

    if (!isValid) {
      throw new UnauthorizedException();
    }

    return this.jwtService.decode(token) as TokenPayload;
  }
}
