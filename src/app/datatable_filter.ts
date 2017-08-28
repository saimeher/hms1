// // import * as _ from "lodash";
// // import {Pipe, PipeTransform} from "@angular/core";

// // @Pipe({
// //     name: "dataFilter"
// // })
// // export class DataFilterPipe implements PipeTransform {

// //     transform(array: any[], query: string): any {
// //         if (query) {
// //             return _.filter(array, row=>row.raised_by.indexOf(query) > -1);
// //         }
// //         return array;
// //     }
// // }


// import * as _ from "lodash";
// import {Pipe, PipeTransform} from "@angular/core";

// @Pipe({
//     name: "dataFilter"
// })
// export class DataFilterPipe implements PipeTransform {
// keys = [];
//     transform(array: any[], query: string): any {
//        if (array != null && array.length > 0) {
//   let ans = [];
// if()
//   if (this.keys.length == 0) {
//     this.keys = Object.keys(array[0]);
//   }

//   for (let i of array) {
//     for (let k of this.keys) {
//       if (i[k].toString().match('^.*' + query +'.*$')) {
//         ans.push(i);
//         break;
//       }
//     }
//   }
//   return ans;
//     }
//     }
// }


import * as _ from "lodash";
import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
    name: "dataFilter"
})
export class DataFilterPipe implements PipeTransform {

    // transform(array: any[], query: string): any {
    //     if (query) {
    //         return _.filter(array, row=>row.problem.indexOf(query) > -1);
    //     }
    //     return array;
    // }
    keys = [];
    transform(array: any[], query: string): any {
       if(query==''){
        return array
     }
    
      if (array != null && array.length > 0) {
  let ans = [];

  if (this.keys.length == 0) {
    this.keys = Object.keys(array[0]);
  }

  for (let i of array) {
    for (let k of this.keys) {
      // console.log(i,'ival test');
      if(i[k]!=null)
      {
       if (i[k].toLowerCase().match('^.*' + query +'.*$')) {
        ans.push(i);
        break;
      }
       else if (i[k].toUpperCase().match('^.*' + query +'.*$')) {
        ans.push(i);
        break;
      }
    }
    }
  }
  return ans;
    } 
    
     
}
}






