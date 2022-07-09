import { functionRunner } from './helper';

test('no discounts', () => {
  const output = functionRunner(JSON.stringify({
    "cart": {
      "lines": [
        { "quantity": 1 }
      ]
    }
  }))

  expect(JSON.parse(output)).toStrictEqual({                                                                                                                                                     
    "discountApplicationStrategy": "FIRST",
    "discounts": [],
  });
});

test('discounts', () => {
  const output = functionRunner(JSON.stringify({
    "cart": {
      "lines": [
        { "quantity": 1 },
        { "quantity": 2 }
      ]
    }
  }))

  expect(JSON.parse(output)).toStrictEqual({
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