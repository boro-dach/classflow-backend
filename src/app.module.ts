import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { StudentModule } from './student/student.module';
import { TeacherModule } from './teacher/teacher.module';
import { ParentModule } from './parent/parent.module';
import { SchoolModule } from './school/school.module';
import { ClassModule } from './class/class.module';
import { JoinRequestModule } from './join-request/join-request.module';
import { LessonModule } from './lesson/lesson.module';
import { GradeModule } from './grade/grade.module';

@Module({
  imports: [AuthModule, StudentModule, TeacherModule, ParentModule, SchoolModule, ClassModule, JoinRequestModule, LessonModule, GradeModule],
  providers: [AppService],
})
export class AppModule {}
