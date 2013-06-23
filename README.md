Texas Instruments ADS1299 Arduino Library

This folder contains all work and research for the creation of a software bridge between the Texas Instruments ADS1299 EEG/ECG chip and an Arduino.

Hardware References
[1] ADS1299: http://www.ti.com/product/ads1299
[2] ADS1299 Datasheet: http://www.ti.com/lit/ds/sbas499a/sbas499a.pdf
[3] ADS1299 Analog Evaluation Module: http://www.ti.com/lit/ug/slau443/slau443.pdf

Files
ADS2199.h - Arduino library header file
	- contains class methods/variables
ADS1299.cpp - Arduino library cpp file
	- contains content of methods and references to the page numbers in the above documents
	- current methods:
		- WAKEUP()
		- STANDBY()
		- RESET()
		- START()
		- STOP()
		- RDATAC() - read data continuous
		- SDATAC() - stop data continuous
		- RDATA()
		- RREG()
		- WREG()
		- transfer() - SPI bit transfer
		- updateData() - print data from ADS1299 to serial monitor in Arduino IDE
Definitions.h - Contains all of the variable definitions that are relevant to the ADS1299 chip commands and the SPI communication between the chip and the Arduino.
examples/example_2 - an example arduino sketch that show you how to use the currently implemented methods of the library
keywords.txt - defines the keywords that change color automatically in an arduino sketch using this library

Extra Materials
The "reference" folder contains websites that contain relevant information to the development of the code and also options for electrodes and circuit design of active electrodes and other open-source EEG tools.
Links from meeting with Sean Montgomery (from Sensorstar Labs):
- https://www.olimex.com/Products/EEG/OpenEEG/EEG-ANALOG-ASM/
- https://www.olimex.com/Products/EEG/Electrodes/
- https://www.olimex.com/Products/EEG/Electrodes/EEG-AE/
- https://www.olimex.com/Products/EEG/OpenEEG/EEG-SMT/resources/EEG-SMT-SCHEMATIC-REV-B.pdf
- Sean's Website: http://produceconsumerobot.com/biosensing/
- http://www.saelig.com/miva/merchant.mvc?
- http://www.saelig.com/miva/merchant.mvc?
- http://www.saelig.com/supplier/plessey/PS25255.pdf
- http://ieeexplore.ieee.org/xpl/login.jsp?tp=&arnumber=5598518&url=http%3A%2F%2Fieeexplore.ieee.org%2Fxpls%2Fabs_all.jsp%3Farnumber%3D5598518


version 1) developed by Conor Russomanno (6/20/13)

