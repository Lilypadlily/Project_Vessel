// Copyright (c) Microsoft Corporation. All rights reserved.
// SPDX-License-Identifier: MIT

/*
 * This is an Arduino-based Azure IoT Hub sample for ESPRESSIF ESP8266 board.
 * It uses our Azure Embedded SDK for C to help interact with Azure IoT.
 * For reference, please visit https://github.com/azure/azure-sdk-for-c.
 * 
 * To connect and work with Azure IoT Hub you need an MQTT client, connecting, subscribing
 * and publishing to specific topics to use the messaging features of the hub.
 * Our azure-sdk-for-c is an MQTT client support library, helping to compose and parse the
 * MQTT topic names and messages exchanged with the Azure IoT Hub.
 *
 * This sample performs the following tasks:
 * - Synchronize the device clock with a NTP server;
 * - Initialize our "az_iot_hub_client" (struct for data, part of our azure-sdk-for-c);
 * - Initialize the MQTT client (here we use Nick Oleary's PubSubClient, which also handle the tcp connection and TLS);
 * - Connect the MQTT client (using server-certificate validation, SAS-tokens for client authentication);
 * - Periodically send telemetry data to the Azure IoT Hub.
 * 
 * To properly connect to your Azure IoT Hub, please fill the information in the `iot_configs.h` file. 
 */

/*********
 * 
 * VERSION UPDATE LIST
 * 
 * MQTT PAYLOAD
 * 1. Timestamp are adjusted to the current time based on the ntp server
 * 
 * Connection protocol
 * 1. The http protocol are moved into a certain function using a local variable as the http and server client
 * not a global variable per 1.1
 * 
*/
// C99 libraries
#include <string.h>
#include <stdbool.h>
#include <time.h>
#include <cstdlib>

// Libraries for MQTT client, WiFi connection and SAS-token generation.
#include <ArduinoJson.h>
#include <ESP8266WiFi.h>
#include <PubSubClient.h>
#include <WiFiClientSecure.h>
#include <ESP8266WebServer.h>
#include <WiFiManager.h> 
#include <ESP8266HTTPClient.h>
#include <base64.h>
#include <bearssl/bearssl.h>
#include <bearssl/bearssl_hmac.h>
#include <libb64/cdecode.h>

// Azure IoT SDK for C includes
#include <az_core.h>
#include <az_iot.h>
#include <azure_ca.h>

//#include <iostream>
#include "ArduinoJson.h"

//OTA Lib
#include <ESP8266HTTPClient.h>
#include <ESP8266httpUpdate.h>

// Additional sample headers 
#include "iot_configs.h"
#include <EEPROM.h>
#include <NewPing.h>

#include <Ticker.h>  //Ticker Library


// When developing for your own Arduino-based platform,
// please follow the format '(ard;<platform>)'. 
#define AZURE_SDK_CLIENT_USER_AGENT "c/" AZ_SDK_VERSION_STRING "(ard;esp8266)"

// Utility macros and defines
//#define LED_PIN 2
#define sizeofarray(a) (sizeof(a) / sizeof(a[0]))
//SAS expiration duration
#define ONE_HOUR_IN_SECS 85600
#define NTP_SERVERS "pool.ntp.org", "time.nist.gov"
#define MQTT_PACKET_SIZE 1024
// ping every 30 S
/*
#define echoPin1 D6
#define trigPin1 D5 //attach pin D3 Arduino to pin Trig of HC-SR04
#define echoPin2 D1 // attach pin D2 Arduino to pin Echo of HC-SR04
#define trigPin2 D0
#define echoPin3 D2 // attach pin D2 Arduino to pin Echo of HC-SR04
#define trigPin3 D8
#define led D4
#define button D7
*/

#define echoPin1 D6
#define trigPin1 D5 //attach pin D3 Arduino to pin Trig of HC-SR04
#define echoPin2 D1 // attach pin D2 Arduino to pin Echo of HC-SR04
#define trigPin2 D0
#define echoPin3 D7 // attach pin D2 Arduino to pin Echo of HC-SR04
#define trigPin3 D8
#define led D4
#define button D3

#define reset_delay 5000
#define update_delay 5000
#define calib_delay 2000
#define PING_DELAY 100000
//Calibration stage
#define iterations 10 //Number of readings in the calibration stage
#define MAX_DISTANCE 150 // Maximum distance (in cm) for the sensors to try to read.
#define MIN_DISTANCE 5 // Minimum distance (in cm) for calibrated threshold.
#define DEFAULT_DISTANCE_MAX 45 // Default distance (in cm) is only used if calibration fails.
#define DEFAULT_DISTANCE_MIN 10 // Default distance (in cm) is only used if calibration fails.

#define HEAPCHECKER 0  

//Device personalization

int dev_id = 1;
String loc = "Bandung Vessel 1";
int locid = 2;



// Translate iot_configs.h defines into variables used by the sample
static const char* ssid = IOT_CONFIG_WIFI_SSID;
static const char* password = IOT_CONFIG_WIFI_PASSWORD;
static const char* host = IOT_CONFIG_IOTHUB_FQDN;
static const char* device_id = IOT_CONFIG_DEVICE_ID;
static const char* device_key = IOT_CONFIG_DEVICE_KEY;
static const int port = 8883;

long but_s, but_e;
// Memory allocated for the sample's variables and structures.
//iot hub client
StaticJsonDocument<300> doc;
String ver, source;

Ticker blinker;
//Wifi client for the mqtt connection
WiFiClientSecure wifi_client;
//ping n update client
//Client for ping connection
WiFiClientSecure ping_client;
WiFiManager wifiManager;

static X509List cert((const char*)ca_pem);
static PubSubClient mqtt_client(wifi_client);
// http client for the http ping connection
static HTTPClient http;
static az_iot_hub_client client;
static char sas_token[200];
static uint8_t signature[512];
static unsigned char encrypted_signature[32];
static char base64_decoded_device_key[32];
static unsigned long next_telemetry_send_time_ms = 0;
static char telemetry_topic[128];
static uint8_t telemetry_payload[100];
static uint32_t telemetry_send_count = 0;

bool setup_mode;
unsigned long start_timer;
unsigned long end_timer;
unsigned long dur_timer;

String current_ver = "";
String server_ver;


//HTTP ping setting

//Your Domain name with URL path or IP address with path
String serverName = "https://barber-functionapp1.azurewebsites.net/";
String OTA_server = "https://barber-functionapp1.azurewebsites.net/api/HttpTrigger_GetLatestVersion";
const int httpsPort = 443;
bool ada_update = 0;
bool update_button = 0;
bool ada_calib = 0;
uint32_t originalram;
// Arduino setup and loop main functions.


bool object_person = false;
bool T_initial = true, X_initial = true;
float calibrate_distance1 = 0, calibrate_distance_max1 = 0, calibrate_distance_min1 = 0;
float calibrate_distance2 = 0, calibrate_distance_max2 = 0, calibrate_distance_min2 = 0;
float calibrate_distance3 = 0, calibrate_distance_max3 = 0, calibrate_distance_min3 = 0;
float calibration_duration_1 = 0,calibration_duration_2 = 0, calibration_duration_3 = 0;
float duration1 = 0,duration2 = 0,duration3 = 0;
float distance1 = 0,distance2 = 0,distance3 = 0;
int iteration = 10 ,count = 0 ;//pembacaan distance

//variabel timer
unsigned long T_timer = 0;// Time Stamp
unsigned long previous_T_timer = 0;// Time Stamp saat D<B
unsigned long previous_X_timer = 0;// Time Stamp saat D>B
unsigned long previous_interval = 0;// Time Stamp saat penanda stop orang
unsigned long total_interval = 0;// Time Stamp lamanya interval antar orang
unsigned long T_total = 0; // Timer total
unsigned long msg_id = 0;

// timer batasan
unsigned long Tx_timer = 20000; // 20 second = 20.000 milli second a.k.a event interval

// varibel pembacaan jarak dengan library NewPing.h
NewPing sonar[3] = {   // Sensor object array.
  NewPing(trigPin1, echoPin1, MAX_DISTANCE), // Each sensor's trigger pin, echo pin, and max distance to ping.
  NewPing(trigPin2, echoPin2, MAX_DISTANCE),
  NewPing(trigPin3, echoPin3, MAX_DISTANCE)
};

float duration,distance;

int current_sensor_reading;
int previous_sensor_reading = 0 ;

void changeState()
{
  digitalWrite(led, !(digitalRead(led)));  //Invert Current State of LED  
}
void ICACHE_RAM_ATTR button_start();

void button_start(){
  long temp;
  but_s = but_e;
  but_e = millis();
  temp = but_e - but_s;
  Serial.println(temp);
  if (setup_mode){
    switch (temp) {
      case update_delay ... 10000:
        Serial.println("update_delay");
        //if (verCheck_main()){
          Serial.println("update pressed");
          update_button = true;
        break;
      case calib_delay ... update_delay-1000:
        Serial.println("Calib mode started");
        
   
        sensor_calib();
        Serial.println("DONE TEST");
        break;
      default:
        break;
    }
    
  }else{
    switch (temp) {
      case reset_delay ... 10000 :
        Serial.println("reset_delay");
        ESP.restart();
        break;
      default:
        break;
    }
  }
  
}



void setup()
{
  Serial.begin(115200);
  //EEPROM.begin(512);
  ada_update = 0;
  
  setup_mode = 1;
  pinMode(trigPin3, OUTPUT); // Sets the trigPin as an OUTPUT
  pinMode(echoPin3, INPUT); // Sets the echoPin as an INPUT
  pinMode(trigPin1, OUTPUT); // Sets the trigPin as an OUTPUT
  pinMode(echoPin1, INPUT); // Sets the echoPin as an INPUT
  pinMode(trigPin2, OUTPUT); // Sets the trigPin as an OUTPUT
  pinMode(echoPin2, INPUT); // Sets the echoPin as an INPUT
  
  
  pinMode (button,INPUT);
  pinMode (led,OUTPUT);
  attachInterrupt(digitalPinToInterrupt(button), button_start, CHANGE);
  //Initilaize Serial Port
  //pinMode(LED_PIN, OUTPUT);
  //digitalWrite(LED_PIN, HIGH);
  current_ver = readWord();
  Serial.println("System version :");
  Serial.println(current_ver);
  Serial.println("------");
  while (!WiFi.isConnected()){
    Serial.println("Disconnected");
    delay(2000);
    connectToWiFi();
   // manualWiFiinit();
  }
  Serial.println("Connected..");
  
  //manualWiFiinit();
  initializeTime();
  printCurrentTime();
  establishConnection();
  ping_client.setInsecure();
  mqtt_client.disconnect();
 
  //versionCheck();
  http.end();
  ping_client.stop();
  //OTAupdate();
  ////asdasd
  calibration_duration_1 = sonar[0].ping_median(iterations);//iteration = 10,ping_median sonar.ping_median(iterations);
 // delay(500);
  calibration_duration_2 = sonar[1].ping_median(iterations);//iteration = 10,ping_median
 // delay(500);
  calibration_duration_3 = sonar[2].ping_median(iterations);//iteration = 10,ping_median
 // delay(500);
 
  blinker.attach(0.1, changeState);
  Serial.println("blinker 0.1");
  delay(2000);  
  if (ada_update && update_button){
    OTAupdate();
  }
  
  
  blinker.attach (0.5, changeState);
  start_timer = millis();
}

void loop()
{
  setup_mode = 0;
  end_timer = millis();
  dur_timer = end_timer-start_timer;
  
  mqtt_client.disconnect();
  //wifi_client.stop();
  ///asdasd
  /*
  
  */
  uint32_t ram = ESP.getFreeHeap();
  //Serial.printf("1 RAM: %d  change %d\n", ram, (ram - originalram ));
  /******
   * Buat mekanisme ping berbasis timer (PING_DELAY) 10s
   */
   
  if (dur_timer >= PING_DELAY){
    Serial.println("Ping initiated");
    while (!WiFi.isConnected()){
      Serial.println("Disconnected");
      delay(2000);
      connectToWiFi();
    }
    // HTTP PING 

    httpV_ping (1,2,3);
    
    start_timer = millis();
  }else{
    current_sensor_reading = sensor_routines_new();
    Serial.println(current_sensor_reading);
    //if (current_sensor_reading == 40){
    if (dur_timer >= 10000){
      while (!WiFi.isConnected()){
        Serial.println("Disconnected");
        delay(2000);
        connectToWiFi();
      }
      previous_sensor_reading = current_sensor_reading;
      // MQTT DATA SENDING
      if(!mqtt_client.connected()) {
        establishConnection();
      }
        //payload sending
      Serial.println("sending mqtt");
      sendTelemetry();    
    }
    
  }

  // MQTT loop must be called to process Device-to-Cloud and Cloud-to-Device.
 // mqtt_client.loop();
  ram = ESP.getFreeHeap();
  //Serial.printf("2 RAM: %d  change %d\n", ram, (ram - originalram ));
  if(HEAPCHECKER){          // losing bytes work around
    //tcpCleanup();           
    Serial.printf("tcpCleanup completed\n");
  }
  delay(250);
}
