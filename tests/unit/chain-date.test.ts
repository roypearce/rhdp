import ChainDate, { TimePeriod } from '../../src/chain-date';

test('add', () => {
  const chainDate = new ChainDate('2021-01-01');
  expect(chainDate.add(1, TimePeriod.Day).format()).toEqual('2021-01-02');
  expect(chainDate.add(1, TimePeriod.Week).format()).toEqual('2021-01-09');
  expect(chainDate.add(1, TimePeriod.Month).format()).toEqual('2021-02-09');
  expect(chainDate.add(1, TimePeriod.Year).format()).toEqual('2022-02-09');
});

test('add 1 month with restrictToMonth', () => {
  const chainDate = new ChainDate('2022-01-31');
  expect(chainDate.add(1, TimePeriod.Month, true).format()).toEqual('2022-02-28');
});

test('add 1 year with restrictToMonth', () => {
  const chainDate = new ChainDate('2024-02-29');
  expect(chainDate.add(1, TimePeriod.Year, true).format()).toEqual('2025-02-28');
});

test('clone', () => {
  const chainDate = new ChainDate('2021-01-01');
  const clonedChainDate = chainDate.clone().add(1, TimePeriod.Day);
  expect(chainDate.format()).toEqual('2021-01-01');
  expect(clonedChainDate.format()).toEqual('2021-01-02');
});

test('endOfMonth', () => {
  const chainDate = new ChainDate('2021-01-01');
  expect(chainDate.endOfMonth().format()).toEqual('2021-01-31');
});

test('endOfYear', () => {
  const chainDate = new ChainDate('2021-01-01');
  expect(chainDate.endOfYear().format()).toEqual('2021-12-31');
});

test('format', () => {
  const chainDate = new ChainDate('2021-01-01');
  expect(chainDate.format()).toEqual('2021-01-01');
});

test('getDate', () => {
  const chainDate = new ChainDate('2021-01-02');
  expect(chainDate.getDate()).toEqual(2);
});

test('getDay', () => {
  const chainDate = new ChainDate('2021-01-01');
  expect(chainDate.getDay()).toEqual(5);
});

test('getFullYear', () => {
  const chainDate = new ChainDate('2021-01-01');
  expect(chainDate.getFullYear()).toEqual(2021);
});

test('getMonth', () => {
  const chainDate = new ChainDate('2021-01-01');
  expect(chainDate.getMonth()).toEqual(1);
});

test('setDay', () => {
  const chainDate = new ChainDate('2021-01-01');
  expect(chainDate.setDay(5).format()).toEqual('2021-01-05');
});

test('setFullDate', () => {
  const chainDate = new ChainDate('2021-01-01');
  expect(chainDate.setFullDate(2022, 2, 3).format()).toEqual('2022-02-03');
});

test('setMonth', () => {
  const chainDate = new ChainDate('2021-01-01');
  expect(chainDate.setMonth(6).format()).toEqual('2021-06-01');
});

test('setMonth with restrictToMonth', () => {
  const chainDate = new ChainDate('2022-01-31');
  expect(chainDate.setMonth(2, true).format()).toEqual('2022-02-28');
});

test('setYear', () => {
  const chainDate = new ChainDate('2021-01-01');
  expect(chainDate.setYear(2022).format()).toEqual('2022-01-01');
});

test('setYear with restrictToMonth', () => {
  const chainDate = new ChainDate('2024-02-29');
  expect(chainDate.setYear(2023, true).format()).toEqual('2023-02-28');
});

test('startOfMonth', () => {
  const chainDate = new ChainDate('2021-01-15');
  expect(chainDate.startOfMonth().format()).toEqual('2021-01-01');
});

test('startOfYear', () => {
  const chainDate = new ChainDate('2021-01-15');
  expect(chainDate.startOfYear().format()).toEqual('2021-01-01');
});
