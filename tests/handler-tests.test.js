'use strict';

const events = require('../events');
let driver = require('../parts/driver');
// let order = {
//   storeName: 'chocolate factory', orderID: '8934752934-8943719875275', customerName: 'Riko Greens', address: "CALIFORNIA"
// };
describe('logger middleware', () => {
  let consoleSpy;

  beforeEach(() => {
    // Attach to the console
    consoleSpy = jest.spyOn(console, 'log').mockImplementation();
  });

  afterEach(() => {
    consoleSpy.mockRestore();
  });

  it('should show pick-up ready', () => {
    events.emit('pickup', { orderID: '12345' });
    expect(consoleSpy).toHaveBeenCalled();
  })
})