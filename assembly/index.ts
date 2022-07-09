import "wasi";
import { Console } from "as-wasi/assembly";
import { JSON } from "assemblyscript-json/assembly"; 

const customDiscount = (input: string): string => {
  const config = <JSON.Obj>(JSON.parse(input));
  const lines = config.getObj("cart")!.getArr("lines")!
  const totalQuantity = lines.valueOf()
    .map<i64>((line) => (<JSON.Obj>line).getInteger("quantity")!.valueOf())
    .reduce((sum, current) => sum + current, 0 as i64);

  if (totalQuantity < 3) {
    return `{
      "discountApplicationStrategy": "FIRST",
      "discounts": []
    }`;
  }
  
  return `{
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
  }`;
}

const input = Console.readAll()!;
const output = customDiscount(input)
Console.log(output);