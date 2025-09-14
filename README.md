# Node.js USB Control Transfer Example

This project provides a clear and simple example of how to send a USB control transfer command to a specific device using Node.js and the node `usb` library.

It allows to use https://github.com/JoeC-de/ThermoVision_JoeC https://joe-c.de/software/thermovision (and maybe other things) with the Seek Nano 300 or 200

See also https://github.com/yrambler2001/seek-nano-unlock-csharp

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: [Download & Install Node.js](https://nodejs.org/)
- **System-level USB library (`libusb`)**: The `usb` package requires it.
  - **macOS**: Works out of the box.
  - **Debian/Ubuntu**: `sudo apt-get install build-essential libudev-dev`
  - **Windows**: You'll need to use [Zadig](https://zadig.akeo.ie/) to install the correct driver (usually `WinUSB` or `libusb-win32`) for your specific device.

## Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/yrambler2001/seek-nano-unlock-nodejs
    cd seek-nano-unlock-nodejs
    ```

2.  **Install dependencies:**
    ```bash
    npm i
    ```

## Configuration

1.  **Find Your Device IDs**: You must update the Vendor ID (VID) and Product ID (PID) to match your target device.

    - **On Linux/macOS**: Run the `lsusb` command in your terminal.
    - **On Windows**: Open Device Manager, find your device, go to `Properties` -> `Details`, and select `Hardware Ids` from the dropdown.

2.  **Update the Code**: Open `index.js` and modify these constants:

    ```javascript
    // --- CONFIGURATION ---
    // TODO: Replace with your device's Vendor and Product IDs
    const VENDOR_ID = 0x289d;
    const PRODUCT_ID = 0x0011;
    ```

## Usage

Run the script from your terminal.

```bash
npm run start
```

If successful, you will see output indicating that the device was found and the command was sent.
