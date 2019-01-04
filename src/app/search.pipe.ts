import { Pipe, PipeTransform } from '@angular/core';
@Pipe({ name: 'searchPipe' })
export class SearchPipe implements PipeTransform {
  transform(listofValue: any[], searchText: string): any[] {
    if (!listofValue) {
      return [];
    }
    if (!searchText) {
      return listofValue;
    }
    searchText = searchText.toLowerCase();
    return listofValue.filter(list => {
      if (list instanceof Object) {
        return list.name.toLowerCase().includes(searchText);
      }
    });
    // const finalobj: any[] = [];
    // listofValue.forEach(element => {
    //   if (element instanceof Object) {
    //     if (element.name.toLowerCase().includes(searchText)) {
    //       finalobj.push(element);
    //     }
    //   }
    // });
    // return finalobj;
  }
}
