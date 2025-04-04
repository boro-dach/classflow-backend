import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { StudentModule } from './student/student.module';
import { TeacherModule } from './teacher/teacher.module';
import { ParentModule } from './parent/parent.module';
import { SchoolModule } from './school/school.module';

@Module({
  imports: [AuthModule, StudentModule, TeacherModule, ParentModule, SchoolModule],
  providers: [AppService],
})
export class AppModule {}
