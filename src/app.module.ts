import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { StudentModule } from './student/student.module';
import { TeacherModule } from './teacher/teacher.module';
import { ParentModule } from './parent/parent.module';

@Module({
  imports: [AuthModule, StudentModule, TeacherModule, ParentModule],
  providers: [AppService],
})
export class AppModule {}
