const boards = {
    pi4: {
        id: "pi4",
        label: "Raspberry Pi 4B",
        description: "40-pin header (J8). 3.3V logic; 5V is power-only.",
        notes: [
            "GPIO pins are 3.3V only. Do not feed 5V into GPIO.",
            "Pins 27 and 28 are reserved for HAT EEPROM (I2C0)."
        ],
        columns: [
            {
                title: "Odd pins (1-39)",
                pins: [
                    { id: "pi4-1", display: "1", label: "3.3V", meta: "Power", functions: "3.3V supply", type: "power", physical: "1" },
                    { id: "pi4-3", display: "3", label: "GPIO2", meta: "SDA1 (I2C1)", functions: "I2C data", type: "i2c", physical: "3" },
                    { id: "pi4-5", display: "5", label: "GPIO3", meta: "SCL1 (I2C1)", functions: "I2C clock", type: "i2c", physical: "5" },
                    { id: "pi4-7", display: "7", label: "GPIO4", meta: "GPCLK0", functions: "General purpose clock", type: "gpio", physical: "7" },
                    { id: "pi4-9", display: "9", label: "GND", meta: "Ground", functions: "Ground", type: "ground", physical: "9" },
                    { id: "pi4-11", display: "11", label: "GPIO17", meta: "GPIO", functions: "General purpose IO", type: "gpio", physical: "11" },
                    { id: "pi4-13", display: "13", label: "GPIO27", meta: "GPIO", functions: "General purpose IO", type: "gpio", physical: "13" },
                    { id: "pi4-15", display: "15", label: "GPIO22", meta: "GPIO", functions: "General purpose IO", type: "gpio", physical: "15" },
                    { id: "pi4-17", display: "17", label: "3.3V", meta: "Power", functions: "3.3V supply", type: "power", physical: "17" },
                    { id: "pi4-19", display: "19", label: "GPIO10", meta: "MOSI (SPI0)", functions: "SPI0 MOSI", type: "spi", physical: "19" },
                    { id: "pi4-21", display: "21", label: "GPIO9", meta: "MISO (SPI0)", functions: "SPI0 MISO", type: "spi", physical: "21" },
                    { id: "pi4-23", display: "23", label: "GPIO11", meta: "SCLK (SPI0)", functions: "SPI0 clock", type: "spi", physical: "23" },
                    { id: "pi4-25", display: "25", label: "GND", meta: "Ground", functions: "Ground", type: "ground", physical: "25" },
                    { id: "pi4-27", display: "27", label: "GPIO0", meta: "ID_SD (I2C0)", functions: "HAT EEPROM I2C data", type: "i2c", physical: "27", notes: "Reserved for HAT EEPROM." },
                    { id: "pi4-29", display: "29", label: "GPIO5", meta: "GPIO", functions: "General purpose IO", type: "gpio", physical: "29" },
                    { id: "pi4-31", display: "31", label: "GPIO6", meta: "GPIO", functions: "General purpose IO", type: "gpio", physical: "31" },
                    { id: "pi4-33", display: "33", label: "GPIO13", meta: "PWM1", functions: "PWM1 output", type: "pwm", physical: "33" },
                    { id: "pi4-35", display: "35", label: "GPIO19", meta: "PCM_FS", functions: "PCM frame sync", type: "special", physical: "35" },
                    { id: "pi4-37", display: "37", label: "GPIO26", meta: "GPIO", functions: "General purpose IO", type: "gpio", physical: "37" },
                    { id: "pi4-39", display: "39", label: "GND", meta: "Ground", functions: "Ground", type: "ground", physical: "39" }
                ]
            },
            {
                title: "Even pins (2-40)",
                pins: [
                    { id: "pi4-2", display: "2", label: "5V", meta: "Power", functions: "5V supply", type: "power", physical: "2" },
                    { id: "pi4-4", display: "4", label: "5V", meta: "Power", functions: "5V supply", type: "power", physical: "4" },
                    { id: "pi4-6", display: "6", label: "GND", meta: "Ground", functions: "Ground", type: "ground", physical: "6" },
                    { id: "pi4-8", display: "8", label: "GPIO14", meta: "TXD0 (UART)", functions: "UART0 transmit", type: "uart", physical: "8" },
                    { id: "pi4-10", display: "10", label: "GPIO15", meta: "RXD0 (UART)", functions: "UART0 receive", type: "uart", physical: "10" },
                    { id: "pi4-12", display: "12", label: "GPIO18", meta: "PWM0 / PCM_CLK", functions: "PWM0 output, PCM clock", type: "pwm", physical: "12" },
                    { id: "pi4-14", display: "14", label: "GND", meta: "Ground", functions: "Ground", type: "ground", physical: "14" },
                    { id: "pi4-16", display: "16", label: "GPIO23", meta: "GPIO", functions: "General purpose IO", type: "gpio", physical: "16" },
                    { id: "pi4-18", display: "18", label: "GPIO24", meta: "GPIO", functions: "General purpose IO", type: "gpio", physical: "18" },
                    { id: "pi4-20", display: "20", label: "GND", meta: "Ground", functions: "Ground", type: "ground", physical: "20" },
                    { id: "pi4-22", display: "22", label: "GPIO25", meta: "GPIO", functions: "General purpose IO", type: "gpio", physical: "22" },
                    { id: "pi4-24", display: "24", label: "GPIO8", meta: "CE0 (SPI0)", functions: "SPI0 chip select 0", type: "spi", physical: "24" },
                    { id: "pi4-26", display: "26", label: "GPIO7", meta: "CE1 (SPI0)", functions: "SPI0 chip select 1", type: "spi", physical: "26" },
                    { id: "pi4-28", display: "28", label: "GPIO1", meta: "ID_SC (I2C0)", functions: "HAT EEPROM I2C clock", type: "i2c", physical: "28", notes: "Reserved for HAT EEPROM." },
                    { id: "pi4-30", display: "30", label: "GND", meta: "Ground", functions: "Ground", type: "ground", physical: "30" },
                    { id: "pi4-32", display: "32", label: "GPIO12", meta: "PWM0", functions: "PWM0 output", type: "pwm", physical: "32" },
                    { id: "pi4-34", display: "34", label: "GND", meta: "Ground", functions: "Ground", type: "ground", physical: "34" },
                    { id: "pi4-36", display: "36", label: "GPIO16", meta: "GPIO", functions: "General purpose IO", type: "gpio", physical: "36" },
                    { id: "pi4-38", display: "38", label: "GPIO20", meta: "PCM_DIN", functions: "PCM data in", type: "special", physical: "38" },
                    { id: "pi4-40", display: "40", label: "GPIO21", meta: "PCM_DOUT", functions: "PCM data out", type: "special", physical: "40" }
                ]
            }
        ]
    },
    uno: {
        id: "uno",
        label: "Arduino Uno",
        description: "ATmega328P board with 5V logic and classic headers.",
        notes: [
            "Logic level is 5V. Use level shifting for 3.3V devices.",
            "PWM pins: D3, D5, D6, D9, D10, D11."
        ],
        columns: [
            {
                title: "Digital pins",
                pins: [
                    { id: "uno-d0", display: "D0", label: "RX", meta: "UART", functions: "Serial receive", type: "uart" },
                    { id: "uno-d1", display: "D1", label: "TX", meta: "UART", functions: "Serial transmit", type: "uart" },
                    { id: "uno-d2", display: "D2", label: "INT0", meta: "Interrupt", functions: "External interrupt 0", type: "gpio" },
                    { id: "uno-d3", display: "D3", label: "PWM", meta: "INT1", functions: "PWM output, external interrupt 1", type: "pwm" },
                    { id: "uno-d4", display: "D4", label: "GPIO", meta: "Digital", functions: "General purpose IO", type: "gpio" },
                    { id: "uno-d5", display: "D5", label: "PWM", meta: "Digital", functions: "PWM output", type: "pwm" },
                    { id: "uno-d6", display: "D6", label: "PWM", meta: "Digital", functions: "PWM output", type: "pwm" },
                    { id: "uno-d7", display: "D7", label: "GPIO", meta: "Digital", functions: "General purpose IO", type: "gpio" },
                    { id: "uno-d8", display: "D8", label: "GPIO", meta: "Digital", functions: "General purpose IO", type: "gpio" },
                    { id: "uno-d9", display: "D9", label: "PWM", meta: "Digital", functions: "PWM output", type: "pwm" },
                    { id: "uno-d10", display: "D10", label: "SS", meta: "PWM, SPI", functions: "SPI slave select, PWM output", type: "spi" },
                    { id: "uno-d11", display: "D11", label: "MOSI", meta: "PWM, SPI", functions: "SPI MOSI, PWM output", type: "spi" },
                    { id: "uno-d12", display: "D12", label: "MISO", meta: "SPI", functions: "SPI MISO", type: "spi" },
                    { id: "uno-d13", display: "D13", label: "SCK", meta: "SPI, LED", functions: "SPI clock, onboard LED", type: "spi" }
                ]
            },
            {
                title: "Analog pins",
                pins: [
                    { id: "uno-a0", display: "A0", label: "ADC0", meta: "Analog", functions: "Analog input 0", type: "analog" },
                    { id: "uno-a1", display: "A1", label: "ADC1", meta: "Analog", functions: "Analog input 1", type: "analog" },
                    { id: "uno-a2", display: "A2", label: "ADC2", meta: "Analog", functions: "Analog input 2", type: "analog" },
                    { id: "uno-a3", display: "A3", label: "ADC3", meta: "Analog", functions: "Analog input 3", type: "analog" },
                    { id: "uno-a4", display: "A4", label: "SDA", meta: "I2C", functions: "I2C data", type: "i2c" },
                    { id: "uno-a5", display: "A5", label: "SCL", meta: "I2C", functions: "I2C clock", type: "i2c" }
                ]
            },
            {
                title: "Power and control",
                pins: [
                    { id: "uno-vin", display: "VIN", label: "Power in", meta: "Input", functions: "7-12V recommended input", type: "power" },
                    { id: "uno-5v", display: "5V", label: "Power", meta: "Output", functions: "5V regulated output", type: "power" },
                    { id: "uno-3v3", display: "3.3V", label: "Power", meta: "Output", functions: "3.3V output (50mA max)", type: "power" },
                    { id: "uno-gnd-1", display: "GND", label: "Ground", meta: "Power", functions: "Ground", type: "ground" },
                    { id: "uno-gnd-2", display: "GND", label: "Ground", meta: "Power", functions: "Ground", type: "ground" },
                    { id: "uno-reset", display: "RESET", label: "Reset", meta: "Control", functions: "Reset line", type: "special" },
                    { id: "uno-ioref", display: "IOREF", label: "IO reference", meta: "Control", functions: "I/O voltage reference", type: "special" },
                    { id: "uno-aref", display: "AREF", label: "Analog ref", meta: "Control", functions: "Analog reference input", type: "special" }
                ]
            }
        ]
    },
    xiao: {
        id: "xiao",
        label: "Seeed Studio XIAO RP2040",
        description: "Compact RP2040 board with 3.3V logic and onboard LEDs.",
        notes: [
            "GPIO is 3.3V only. VBUS is 5V from USB.",
            "D0-D3 are ADC capable inputs."
        ],
        columns: [
            {
                title: "Header pins (1-8)",
                pins: [
                    { id: "xiao-5v", display: "5V", label: "VBUS", meta: "Power", functions: "Power input/output", type: "power" },
                    { id: "xiao-gnd", display: "GND", label: "Ground", meta: "Power", functions: "Ground", type: "ground" },
                    { id: "xiao-3v3", display: "3V3", label: "3V3_OUT", meta: "Power", functions: "3.3V output", type: "power" },
                    { id: "xiao-d0", display: "D0", label: "ADC", meta: "P26", functions: "GPIO, ADC0", type: "analog", chip: "P26" },
                    { id: "xiao-d1", display: "D1", label: "ADC", meta: "P27", functions: "GPIO, ADC1", type: "analog", chip: "P27" },
                    { id: "xiao-d2", display: "D2", label: "ADC", meta: "P28", functions: "GPIO, ADC2", type: "analog", chip: "P28" },
                    { id: "xiao-d3", display: "D3", label: "ADC", meta: "P29", functions: "GPIO, ADC3", type: "analog", chip: "P29" },
                    { id: "xiao-d4", display: "D4", label: "SDA", meta: "P6", functions: "GPIO, I2C data", type: "i2c", chip: "P6" }
                ]
            },
            {
                title: "Header pins (9-16)",
                pins: [
                    { id: "xiao-d5", display: "D5", label: "SCL", meta: "P7", functions: "GPIO, I2C clock", type: "i2c", chip: "P7" },
                    { id: "xiao-d6", display: "D6", label: "TX", meta: "P0", functions: "GPIO, UART transmit", type: "uart", chip: "P0" },
                    { id: "xiao-d7", display: "D7", label: "RX, CSn", meta: "P1", functions: "GPIO, UART receive, CSn", type: "uart", chip: "P1" },
                    { id: "xiao-d8", display: "D8", label: "SCK", meta: "P2", functions: "GPIO, SPI clock", type: "spi", chip: "P2" },
                    { id: "xiao-d9", display: "D9", label: "MISO", meta: "P4", functions: "GPIO, SPI data", type: "spi", chip: "P4" },
                    { id: "xiao-d10", display: "D10", label: "MOSI", meta: "P3", functions: "GPIO, SPI data", type: "spi", chip: "P3" },
                    { id: "xiao-reset", display: "RESET", label: "RUN", meta: "Control", functions: "Reset pin", type: "special" },
                    { id: "xiao-boot", display: "BOOT", label: "RP2040_BOOT", meta: "Control", functions: "Enter boot mode", type: "special" }
                ]
            },
            {
                title: "On-board",
                pins: [
                    { id: "xiao-charge", display: "LED", label: "CHARGE_LED", meta: "VCC_3V3", functions: "Charge status LED (red)", type: "onboard" },
                    { id: "xiao-rgb", display: "RGB", label: "NEOPIX", meta: "RGB LED", functions: "Onboard RGB LED", type: "onboard" },
                    { id: "xiao-led-r", display: "R", label: "USER_LED_R", meta: "IO17_RGB-R", functions: "User red LED channel", type: "onboard" },
                    { id: "xiao-led-g", display: "G", label: "USER_LED_G", meta: "IO16_RGB-G", functions: "User green LED channel", type: "onboard" },
                    { id: "xiao-led-b", display: "B", label: "USER_LED_B", meta: "IO25_RGB-B", functions: "User blue LED channel", type: "onboard" }
                ]
            }
        ]
    }
};

const boardTabs = Array.from(document.querySelectorAll(".board-tab"));
const pinColumns = document.querySelector("[data-pin-columns]");
const boardTitle = document.querySelector("[data-board-title]");
const boardDesc = document.querySelector("[data-board-desc]");
const pinDetail = document.querySelector("[data-pin-detail]");
const boardNotes = document.querySelector("[data-board-notes]");

let currentBoardId = "pi4";
let currentPinMap = new Map();

const buildPinButton = (pin) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "pin-item";
    if (pin.type) {
        button.dataset.type = pin.type;
    }
    button.dataset.pinId = pin.id;

    const number = document.createElement("span");
    number.className = "pin-num";
    number.textContent = pin.display || "";

    const textWrap = document.createElement("span");
    textWrap.className = "pin-text";

    const label = document.createElement("span");
    label.className = "pin-label";
    label.textContent = pin.label || "";

    const meta = document.createElement("span");
    meta.className = "pin-meta";
    meta.textContent = pin.meta || "";

    textWrap.append(label, meta);
    button.append(number, textWrap);

    return button;
};

const renderPinDetail = (pin) => {
    if (!pin) {
        pinDetail.innerHTML = "<p class=\"pin-detail-placeholder\">Select a pin to view details.</p>";
        return;
    }

    pinDetail.innerHTML = "";

    const header = document.createElement("div");
    header.className = "pin-detail-header";

    const pill = document.createElement("span");
    pill.className = "pin-pill";
    if (pin.type) {
        pill.dataset.type = pin.type;
    }
    pill.textContent = pin.display || pin.label || "Pin";

    const title = document.createElement("span");
    title.className = "pin-detail-title";
    title.textContent = pin.display ? `${pin.display} - ${pin.label}` : pin.label;

    header.append(pill, title);

    const meta = document.createElement("p");
    meta.className = "pin-meta";
    meta.textContent = pin.meta || "";

    const list = document.createElement("ul");
    list.className = "pin-detail-list";

    const addLine = (text) => {
        if (!text) {
            return;
        }
        const item = document.createElement("li");
        item.textContent = text;
        list.appendChild(item);
    };

    addLine(pin.physical ? `Header pin: ${pin.physical}` : "");
    addLine(pin.chip ? `Chip pin: ${pin.chip}` : "");
    addLine(pin.functions ? `Functions: ${pin.functions}` : "");
    addLine(pin.notes ? `Notes: ${pin.notes}` : "");

    pinDetail.append(header, meta, list);
};

const setActivePin = (pinId) => {
    const pin = currentPinMap.get(pinId);
    const buttons = Array.from(document.querySelectorAll(".pin-item"));
    buttons.forEach((button) => {
        button.classList.toggle("is-active", button.dataset.pinId === pinId);
    });
    renderPinDetail(pin);
};

const renderBoard = (boardId) => {
    const board = boards[boardId];
    if (!board) {
        return;
    }

    currentBoardId = boardId;
    currentPinMap = new Map();

    boardTitle.textContent = board.label;
    boardDesc.textContent = board.description;

    boardNotes.innerHTML = "";
    board.notes.forEach((note) => {
        const item = document.createElement("li");
        item.textContent = note;
        boardNotes.appendChild(item);
    });

    pinColumns.innerHTML = "";
    board.columns.forEach((column) => {
        const columnWrap = document.createElement("div");
        columnWrap.className = "pin-column";

        const title = document.createElement("div");
        title.className = "pin-column-title";
        title.textContent = column.title;

        const list = document.createElement("div");
        list.className = "pin-list";

        column.pins.forEach((pin) => {
            currentPinMap.set(pin.id, pin);
            const button = buildPinButton(pin);
            button.addEventListener("click", () => setActivePin(pin.id));
            list.appendChild(button);
        });

        columnWrap.append(title, list);
        pinColumns.appendChild(columnWrap);
    });

    const firstPin = board.columns.flatMap((column) => column.pins)[0];
    if (firstPin) {
        setActivePin(firstPin.id);
    } else {
        renderPinDetail(null);
    }
};

boardTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
        const boardId = tab.dataset.board;
        boardTabs.forEach((item) => {
            const isActive = item.dataset.board === boardId;
            item.classList.toggle("is-active", isActive);
            item.setAttribute("aria-selected", String(isActive));
        });
        renderBoard(boardId);
    });
});

renderBoard(currentBoardId);
