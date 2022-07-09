const { execSync } = require('child_process')
const outputFunctionRunner = (input) => execSync(`./function-runner -f build/release.wasm ${input} -j | jq .output.JsonOutput`)

test('no discounts', () => {
  const output = outputFunctionRunner("./test/no-discounts.json")

  expect(JSON.parse(output.toString())).toStrictEqual({                                                                                                                                                     
    "discountApplicationStrategy": "FIRST",
    "discounts": [],
  });
});

test('discounts', () => {
  const output = outputFunctionRunner("./test/discounts.json")

  expect(JSON.parse(output.toString())).toStrictEqual({
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
  });
});