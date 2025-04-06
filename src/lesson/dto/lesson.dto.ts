import { IsEnum, IsNumber, IsString } from 'class-validator';

enum Week {
  ODD = 'ODD',
  EVEN = 'EVEN',
}

enum Day {
  MONDAY = 'MONDAY',
  TUESDAY = 'TUESDAY',
  WEDNESDAY = 'WEDNESDAY',
  THURSDAY = 'THURSDAY',
  FRIDAY = 'FRIDAY',
  SATURDAY = 'SATURDAY',
  SUNDAY = 'SUNDAY',
}

export class CreateLessonDto {
  @IsString({ message: 'Title is not valid' })
  subject: string;

  @IsString({ message: 'Week type is required' })
  @IsEnum(Week, { message: 'Week is not valid' })
  week: Week;

  @IsString({ message: 'Day type is required' })
  @IsEnum(Day, { message: 'Day is not valid' })
  day: Day;

  @IsNumber()
  teacherId: number;

  @IsString()
  classId: string;
}
