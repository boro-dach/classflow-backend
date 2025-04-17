import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { SchoolModule } from './school/school.module';
import { ClassModule } from './class/class.module';
import { JoinRequestModule } from './join-request/join-request.module';
import { LessonModule } from './lesson/lesson.module';
import { GradeModule } from './grade/grade.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    AuthModule,
    SchoolModule,
    ClassModule,
    JoinRequestModule,
    LessonModule,
    GradeModule,
    UserModule,
  ],
  providers: [AppService],
})
export class AppModule {}
