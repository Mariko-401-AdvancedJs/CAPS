'use strict';

const vendor = require('../clients/vendor/vendor');


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

  it('should show DRIVER: Picked up', () => {
    vendor.onTheWay({ orderID: '12345' });
    expect(consoleSpy).toHaveBeenCalled();
  })

  it('should return console log from otw', () => {
    vendor.deliveredPackage({ customerName: 'riko', orderID: '1232' });
    expect(consoleSpy).toHaveBeenCalled();
  })
})