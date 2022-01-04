import json from './coverage/coverage-summary.json';
import fs from 'fs';

const main = () => {
  fs.writeFileSync(
    './nyc-total.json',
    JSON.stringify({
      branches: json.total.branches.pct,
      functions: json.total.branches.pct,
      lines: json.total.lines.pct,
      statements: json.total.statements.pct,
    }),
  );
};

main();
