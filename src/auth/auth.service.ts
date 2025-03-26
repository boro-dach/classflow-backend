import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto, RegisterDto } from './dto/auth.dto';
import { StudentService } from 'src/student/student.service';
import { TeacherService } from 'src/teacher/teacher.service';
import { ParentService } from 'src/parent/parent.service';

export interface TokenPayload {
  email: string;
}

@Injectable()
export class AuthService {
  constructor(
    private jwt: JwtService,
    private student: StudentService,
    private teacher: TeacherService,
    private parent: ParentService,
  ) {}

  //universal functions

  issueToken(email: string) {
    const token = this.jwt.sign(
      { email },
      {
        expiresIn: '7d',
      },
    );

    return token;
  }

  //student functions

  async registerStudent(dto: RegisterDto) {
    const oldStudent = await this.student.getByEmail(dto.email);

    if (oldStudent) throw new BadRequestException('User already exists');

    const token = this.issueToken(dto.email);

    const student = await this.student.create(dto, token);

    return { student, token };
  }

  async loginStudent(dto: LoginDto) {
    const student = await this.validateStudent(dto);

    const token = this.issueToken(dto.email);

    return { student, token };
  }

  private async validateStudent(dto: LoginDto) {
    const student = await this.student.getByEmail(dto.email);

    if (!student) throw new NotFoundException('User not found');

    return student;
  }

  //teacher functions

  async registerTeacher(dto: RegisterDto) {
    const oldTeacher = await this.teacher.getByEmail(dto.email);

    if (oldTeacher) throw new BadRequestException('User already exists');

    const token = this.issueToken(dto.email);

    const teacher = await this.teacher.create(dto, token);

    return { teacher, token };
  }

  async loginTeacher(dto: LoginDto) {
    const teacher = await this.validateTeacher(dto);

    const token = this.issueToken(dto.email);

    return { teacher, token };
  }

  private async validateTeacher(dto: LoginDto) {
    const teacher = await this.teacher.getByEmail(dto.email);

    if (!teacher) throw new NotFoundException('User not found');

    return teacher;
  }

  //parent functions

  async registerParent(dto: RegisterDto) {
    const oldTeacher = await this.parent.getByEmail(dto.email);

    if (oldTeacher) throw new BadRequestException('User already exists');

    const token = this.issueToken(dto.email);

    const parent = await this.parent.create(dto, token);

    return { parent, token };
  }

  async loginParent(dto: LoginDto) {
    const parent = await this.validateParent(dto);

    const token = this.issueToken(dto.email);

    return { parent, token };
  }

  private async validateParent(dto: LoginDto) {
    const parent = await this.parent.getByEmail(dto.email);

    if (!parent) throw new NotFoundException('User not found');

    return parent;
  }
}
