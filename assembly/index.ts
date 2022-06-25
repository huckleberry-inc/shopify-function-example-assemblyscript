import "wasi";
import { Console } from "as-wasi/assembly";
import { JSON } from "assemblyscript-json/assembly"; 

function main ():void {
  const input = Console.readAll();
  const _config = <JSON.Obj>(JSON.parse(input));
  
  // Change code here
  
  Console.log(`{
    "discountApplicationStrategy": "FIRST",
    "discounts": [
      {
        "value": {
          "percentage": {
            "value": 10
          }
        },
        "targets": [
          {
            "orderSubtotal": {
              "excludedVariantIds": []
            }
          }
        ],
        "message": "10% off"
      }
    ]
  }`);
}

main()