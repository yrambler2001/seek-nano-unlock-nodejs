const usb = require('usb');

// --- CONFIGURATION ---
// TODO: Replace with your device's Vendor and Product IDs.
// You can find these using `lsusb` on Linux/macOS or in Device Manager on Windows.
const VENDOR_ID = 0x289d;
const PRODUCT_ID = 0x0011;

/**
 * Defines the parameters for the USB control transfer command.
 * See the USB 2.0 specification, Chapter 9, for a detailed explanation.
 * TODO: Replace these values with the specific command for your device.
 */
const CONTROL_TRANSFER_COMMAND = {
  // A bit-field specifying the direction, type, and recipient of the request.
  // 0x50 = 01010000b
  //   - Direction: Host-to-Device (bit 7=0)
  //   - Type: Vendor (bits 6:5=10)
  //   - Recipient: Other (bits 4:0=00000)
  bmRequestType: 0x50,

  // The specific request code for your device's command.
  bRequest: 0x37,

  // A value passed to the device, its meaning is vendor-specific.
  wValue: 0x0000,

  // An index passed to the device, often used to specify an interface or endpoint.
  wIndex: 0x0000,

  // The data payload to send with the command.
  data: Buffer.from([0xfc, 0x00, 0x04, 0x00]),
};

// --- MAIN SCRIPT ---

console.log(`🔎 Searching for USB device... (VID: 0x${VENDOR_ID.toString(16)}, PID: 0x${PRODUCT_ID.toString(16)})`);

const device = usb.findByIds(VENDOR_ID, PRODUCT_ID);

if (!device) {
  console.error('❌ Device not found. Please check the VID/PID and ensure the device is connected.');
  process.exit(1);
}

console.log('✅ Device found. Attempting to open...');

try {
  device.open();
  console.log('🗣️ Sending control transfer command...');

  device.controlTransfer(
    CONTROL_TRANSFER_COMMAND.bmRequestType,
    CONTROL_TRANSFER_COMMAND.bRequest,
    CONTROL_TRANSFER_COMMAND.wValue,
    CONTROL_TRANSFER_COMMAND.wIndex,
    CONTROL_TRANSFER_COMMAND.data,
    (error, data) => {
      if (error) {
        console.error('🔥 Error during control transfer:', error);
      } else {
        console.log('🚀 Command sent successfully!');
        console.log('Received data:', data);
      }
      // Always close the device connection when done.
      device.close();
      console.log('🔌 Device connection closed.');
    },
  );
} catch (error) {
  console.error(`🚨 An unexpected error occurred: ${error.message}`);
  // If an error occurred (e.g., permission error), try to close the device gracefully.
  if (device) {
    try {
      device.close();
      console.log('🔌 Device connection closed due to an error.');
    } catch (closeError) {
      console.error('Failed to close device during error handling:', closeError);
    }
  }
}
