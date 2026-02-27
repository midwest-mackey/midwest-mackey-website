import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'Filter',
  standalone: false,
})
export class FilterPipe implements PipeTransform {
  // transform(value: any, args?: any): any {
  //   if (!value) return null;
  //   if (!args) return value;

  //   args = args.toLowerCase();
  //   debugger;
  //   return value.filter(function(item) {
  //     return JSON.stringify(item)
  //     .toLowerCase()
  //     .includes(args);
  //   })
  // }


  /**
   * Angular pipe transform
   */
  transform(items: any, filter: any): any {
    if (!filter) {
      return items;
    }

    if (!Array.isArray(items)) {
      return items;
    }

    if (filter && Array.isArray(items)) {
      const filterKeys = Object.keys(filter);
      return items.filter((item) => filterKeys.some((keyName) => {
        const filterString = filter[keyName] ? filter[keyName].toUpperCase().trim() : '';
        const itemString = item[keyName] ? item[keyName].toUpperCase().trim() : '';
        return itemString.indexOf(filterString) !== -1 || filter[keyName] === '';
      })
      );
    }
  }
}