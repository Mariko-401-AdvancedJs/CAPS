'use strict';

const flowers = require('../clients/206Flowers/flowers');
let timeStamp = new Date();
let order = {
  storeName: 'RIKO GREENS', orderID: '8934752934-8943719875275', customerName: 'Frank Ocean', address: "CALIFORNIA"
};
let messageID = '123456';

let test = {
  MESSAGE: { EVENT: 'TEST', timeStamp, order, messageID }
}
//:::::::::::::::::::::::::::::::::::::::::::::::::::::

describe('logger middleware', () => {
  let consoleSpy;

  beforeEach(() => {
    // Attach to the console
    consoleSpy = jest.spyOn(console, 'log').mockImplementation();
  });

  afterEach(() => {
    consoleSpy.mockRestore();
  });

  it('CLIENT SHOULD GET MESSAGE: PICKUP CONFIRMATION', () => {
    flowers.confirmPickup(test);
    expect(consoleSpy).toHaveBeenCalled();
  })

  it('CLIENT SHOULD GET MESSAGE: OUT FOR DELIVERY', () => {
    flowers.outForDelivery(test);
    expect(consoleSpy).toHaveBeenCalled();
  })

  it('CLIENT SHOULD GET MESSAGE: SUCCESSFUL DELIVERY', () => {
    flowers.deliveredPackage(test);
    expect(consoleSpy).toHaveBeenCalled();
  })

  it('CLIENT SHOULD SEND CONFIRMATION TO SERVER: MESSAGE RECEIVED', () => {
    flowers.received(test);
    expect(consoleSpy).toHaveBeenCalled();
  })
})