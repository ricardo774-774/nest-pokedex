import { BadRequestException, InternalServerErrorException } from '@nestjs/common';

export function CatchDatabaseErrors() {
  return function (target: any, propertyName: string, descriptor: TypedPropertyDescriptor<any>) {
    const method = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      try {
        return await method.apply(this, args);
      } catch (error) {
        console.error('Caught error:', error);
        // Check if it's a database error by inspecting the error properties
        if (error.code) {  // Assuming database errors have a 'code' property
          console.error('Database error: ', error.code);
          if (error.code === 11000) {
            throw new BadRequestException(`Duplicate data: ${JSON.stringify(error.keyValue)}`);
          }
          throw new InternalServerErrorException('Database error, check server logs');
        }
        // Re-throw the error if it's not a database error
        console.error('Caught error:', error);
        throw error;
      }
    };
  };
}
