import {
  readFileAsynchronously,
  doStuffByTimeout,
  doStuffByInterval,
} from './index';
import path from 'path';
import fs from 'fs';
import fsp from 'fs/promises';

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const callback = jest.fn();
    const timeout = 1000;

    doStuffByTimeout(callback, timeout);
    jest.advanceTimersByTime(timeout);

    expect(callback).toHaveBeenCalled();
    expect(callback).toHaveBeenCalledTimes(1); // Confirm it's called once after timeout
  });

  test('should call callback only after timeout', () => {
    const callback = jest.fn();
    const timeout = 1000;

    doStuffByTimeout(callback, timeout);
    expect(callback).not.toHaveBeenCalled();

    jest.advanceTimersByTime(timeout);

    expect(callback).toHaveBeenCalled();
  });
});

describe('doStuffByInterval', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and interval', () => {
    const callback = jest.fn();
    const interval = 1000;

    doStuffByInterval(callback, interval);
    jest.advanceTimersByTime(interval);

    expect(callback).toHaveBeenCalled();
    expect(callback).toHaveBeenCalledTimes(1); // Confirm it's called once per interval
  });

  test('should call callback multiple times after multiple intervals', () => {
    const callback = jest.fn();
    const interval = 1000;

    doStuffByInterval(callback, interval);
    expect(callback).not.toHaveBeenCalled();

    jest.advanceTimersByTime(interval);
    expect(callback).toHaveBeenCalledTimes(1);

    jest.advanceTimersByTime(interval);
    expect(callback).toHaveBeenCalledTimes(2);

    jest.advanceTimersByTime(interval);
    expect(callback).toHaveBeenCalledTimes(3);
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    jest.spyOn(fs, 'existsSync').mockReturnValue(false);

    const spy = jest.spyOn(path, 'join');

    await readFileAsynchronously(String());

    expect(spy).toHaveBeenCalledWith(expect.any(String), expect.any(String));
  });

  test('should return null if file does not exist', async () => {
    jest.spyOn(fs, 'existsSync').mockReturnValue(false);
    expect(await readFileAsynchronously(String())).toBeNull();
  });

  test('should return file content if file exists', async () => {
    jest.spyOn(fs, 'existsSync').mockReturnValue(true);
    const fileContent = 'File content';
    jest.spyOn(fsp, 'readFile').mockResolvedValueOnce(fileContent);
    expect(await readFileAsynchronously(String())).toBe(fileContent);
  });
});
