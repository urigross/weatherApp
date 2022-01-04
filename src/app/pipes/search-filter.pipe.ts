import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchFilter'
})
export class SearchFilterPipe implements PipeTransform {

  transform(value: any, search: string): any {
    if(search) {
      let solution = value.filter((v:any)=>{
        if (v) return v.toLowerCase().indexOf(search.toLocaleLowerCase())!==-1;
        return;        
      })
      return solution;
    }
    return value;
  }
}
