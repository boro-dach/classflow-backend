import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';

export function IsTimeString(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isTimeString',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, _args: ValidationArguments) {
          if (typeof value !== 'string') return false;
          return /^([01]\d|2[0-3]):([0-5]\d)$/.test(value);
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} has to be in HH:mm format`;
        },
      },
    });
  };
}
