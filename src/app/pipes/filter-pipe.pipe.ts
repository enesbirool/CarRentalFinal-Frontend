import { Pipe, PipeTransform } from '@angular/core';
import { Car } from '../models/car';

@Pipe({
  name: 'filterPipe'
})
export class FilterPipePipe implements PipeTransform {

  transform(value: Car[], filterText: string): Car[] {
    let filter = filterText.toLocaleLowerCase();
    let FilteredColors = value.filter((p:Car)=>p.colorName.toLocaleLowerCase().indexOf(filterText)!==-1)

    let FilteredBrands = value.filter((p:Car)=>p.brandName.toLocaleLowerCase().indexOf(filterText)!==-1)

    if(FilteredColors.length>0){
      return FilteredColors
    }

    if(FilteredBrands.length>0){
      return FilteredBrands
    }

    return value
  }
}
