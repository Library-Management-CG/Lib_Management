import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate'
})
export class TurncatePipe implements PipeTransform {

  //transform(value: unknown, ...args: unknown[]): unknown {
  //  return null;
  //}
  transform(value: string, length: number): string {
    if (value.length <= length) {
      return value;
    }
    return value.substring(0, length) + '...';
  }

}
