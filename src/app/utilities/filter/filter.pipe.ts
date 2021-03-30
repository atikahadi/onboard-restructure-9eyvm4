import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  pure: false,
})
export class FilterPipe implements PipeTransform {

  transform(value: any[], filterString: string, propName: string): any {
    // console.log(filterString);
    if (
      value.length === 0 ||
      filterString === '' ||
      filterString === undefined ||
      filterString === 'All'
    ) {
      return value;
    }

    const resultArray: any[] = [];
    for (const item of value) {
      // console.log(item);
      // console.log('tag' + item.tags[0].title);

      for (var i = 0; i < item.tags.length; i++) {
        if (item.tags[i].title === filterString) {
          resultArray.push(item);
        }
      }
    }
    // console.log('resultArray:' + resultArray);
    return resultArray;
  }
}
