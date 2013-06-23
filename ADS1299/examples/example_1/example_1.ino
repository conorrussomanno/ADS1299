

// Note: all page references are to the following TI document: http://www.ti.com/lit/ds/sbas499a/sbas499a.pdf

#include <SPI.h>

//SPI Command Definitions (pg. 35)
const byte WAKEUP = 0b00000010;     // Wake-up from standby mode
const byte STANDBY = 0b00000100;   // Enter Standby mode
const byte RESET = 0b00000110;   // Reset the device
const byte START = 0b00001000;   // Start and restart (synchronize) conversions
const byte STOP = 0b00001010;   // Stop conversion
const byte RDATAC = 0b00010000;   // Enable Read Data Continuous mode (default mode at power-up) 
const byte SDATAC = 0b00010001;   // Stop Read Data Continuous mode
const byte RDATA = 0b00010010;   // Read data by command; supports multiple read back

//Register Read Commands
const byte RREG = 0b00000000;
const byte WRET = 0b00000000;

// pins used for the connection with the sensor
// the other you need are controlled by the SPI library):

//Arduino Uno - Pin Assignments; Need to use ICSP for later AVR boards
// SCK = 13
// MISO [DOUT] = 12
// MOSI [DIN] = 11
const int CS = 10; //chip select pin
const int DRDY = 9; //data ready pin

const float tCLK = 0.000666;

boolean deviceIDReturned = false;

void setup() {

  Serial.begin(9600);
  
  // start the SPI library:
  SPI.begin();
  SPI.setClockDivider(SPI_CLOCK_DIV16); //Divides 16MHz clock by 16 to set CLK speed to 1MHz
  SPI.setDataMode(SPI_MODE1);  //clock polarity = 0; clock phase = 1 (pg. 8)
  SPI.setBitOrder(MSBFIRST);  //data format is MSB (pg. 25)
  
  // initalize the  data ready and chip select pins:
  pinMode(DRDY, INPUT);
  pinMode(CS, OUTPUT);


  delay(10);  //delay to ensure connection
  
  digitalWrite(CS, LOW); //Low to communicated
  SPI.transfer(RESET); 
  digitalWrite(CS, HIGH); //Low to communicated
  
  //Set up ADS1299 to communicate
//  digitalWrite(CS, LOW); //Low to communicated
////  SPI.transfer(START);
//  digitalWrite(CS, HIGH); //Low to communicated
  
  delay(10);  //delay to ensure connection

  
}

void loop(){
  //Serial.println("Time: "+ millis()); 
  if(deviceIDReturned == false){
    getDeviceID();
    deviceIDReturned = true;
  }
}

void getDeviceID(){
//  SPI.transfer(START);
  digitalWrite(CS, LOW); //Low to communicated
  SPI.transfer(SDATAC);
  SPI.transfer(0x20); //RREG
  SPI.transfer(0x00); //Asking for 1 byte (hopefully 0b???11110)
  byte temp = SPI.transfer(0x00);
  digitalWrite(CS, HIGH); //Low to communicated
  
  Serial.println(temp, BIN);

}
