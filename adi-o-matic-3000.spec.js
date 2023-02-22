import fs from 'node:fs'
import { expect, test } from "vitest";
import { adiOMatic3000 } from "./adi-o-matic-3000";

const csv = fs.readFileSync('./mock-data.csv', 'utf-8')

test("adi-o-matic 3000 generates correct yaml", () => {
  const yaml = adiOMatic3000(csv)

  expect(yaml).toMatchSnapshot()
});
