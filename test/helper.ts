import { execSync } from 'child_process';
import { writeFileSync, unlinkSync } from 'fs';

const INPUT_FILE_PATH = "./test/input.json";
export const inputJSONAndOutputByFunctionRunner = (input: string) => {
  const createInputFile = (input: string) => writeFileSync(INPUT_FILE_PATH, input);
  const outputByFunctionRunner = () => execSync(`./function-runner -f build/release.wasm ${INPUT_FILE_PATH} -j | jq .output.JsonOutput`)

  createInputFile(input);
  return outputByFunctionRunner();
};
export const reset = () => unlinkSync(INPUT_FILE_PATH);