'use strict';

const widgets = require('../clients/widgets/widgets');
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
    widgets.confirmPickup(test);
    expect(consoleSpy).toHaveBeenCalled();
  })

  it('CLIENT SHOULD GET MESSAGE: OUT FOR DELIVERY', () => {
    widgets.outForDelivery(test);
    expect(consoleSpy).toHaveBeenCalled();
  })

  it('CLIENT SHOULD GET MESSAGE: SUCCESSFUL DELIVERY', () => {
    widgets.deliveredPackage(test);
    expect(consoleSpy).toHaveBeenCalled();
  })

  it('CLIENT SHOULD SEND CONFIRMATION TO SERVER: MESSAGE RECEIVED', () => {
    widgets.received(test);
    expect(consoleSpy).toHaveBeenCalled();
  })
})