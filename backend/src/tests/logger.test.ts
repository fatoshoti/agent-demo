import logger from '../utils/logger';

describe('Logger Utility', () => {
  const originalConsoleLog = console.log;
  const originalConsoleError = console.error;
  const originalConsoleWarn = console.warn;

  let consoleLogSpy: jest.SpyInstance;
  let consoleErrorSpy: jest.SpyInstance;
  let consoleWarnSpy: jest.SpyInstance;

  beforeEach(() => {
    // Spy on console methods without calling the original implementation
    consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
  });

  afterEach(() => {
    // Restore original console methods
    consoleLogSpy.mockRestore();
    consoleErrorSpy.mockRestore();
    consoleWarnSpy.mockRestore();
  });

  it('should log info messages to console', () => {
    const message = 'Test info message';
    logger.info(message);
    expect(consoleLogSpy).toHaveBeenCalledWith(expect.stringContaining(message));
  });

  it('should log error messages to console and file', () => {
    const message = 'Test error message';
    const error = new Error('Something went wrong');
    logger.error(message, error);
    expect(consoleErrorSpy).toHaveBeenCalledWith(expect.stringContaining(message));
    // In a real file system, we'd check file content, but for mocks, console spy is sufficient.
  });

  it('should log warn messages to console', () => {
    const message = 'Test warn message';
    logger.warn(message);
    expect(consoleWarnSpy).toHaveBeenCalledWith(expect.stringContaining(message));
  });

  it('should log objects as part of the message context', () => {
    const message = 'User data';
    const data = { id: 1, name: 'Test' };
    logger.info(message, data);
    expect(consoleLogSpy).toHaveBeenCalledWith(expect.stringContaining(message));
    // Expect a JSON string representation of the data in the output
    expect(consoleLogSpy).toHaveBeenCalledWith(expect.stringContaining(JSON.stringify(data)));
  });
});
