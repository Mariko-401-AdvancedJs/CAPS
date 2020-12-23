'use strict';

const driver = require('../clients/driver');

describe('logger middleware', () => {
  let consoleSpy;

  beforeEach(() => {
    consoleSpy = jest.spyOn(console, 'log').mockImplementation();
  });

  afterEach(() => {
    consoleSpy.mockRestore();
  });

  it('should show in-transit', () => {
    driver({ orderID: '12345' });
    setTimeout(() => {
      expect(consoleSpy).toHaveBeenCalled();
    }, 1000);
  })

  it('should show success', () => {
    driver({ orderID: '12345' });
    setTimeout(() => {
      expect(consoleSpy).toHaveBeenCalled();
    }, 3000);
  })
})