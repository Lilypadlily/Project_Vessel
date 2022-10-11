static void connectToWiFi()
{
  Serial.begin(115200);
  Serial.println();
  Serial.print("Connecting to WIFI SSID ");
  Serial.println(ssid);

  WiFi.mode(WIFI_STA);
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED)
  {
    delay(500);
    Serial.print(".");
  }

  Serial.print("WiFi connected, IP address: ");
  Serial.println(WiFi.localIP());
}

void manualWiFiinit ()
{
  int res;
  //wifiManager.resetSettings();
  res = wifiManager.autoConnect("Vessel WiFi Manager");
  if (!res)
  {
    Serial.println("Failed to connect");
  }else{
  Serial.println("Successfully connected to the WiFi!");
  }
}
/*
void reConnectWiFi()
{
    Serial.printf("Attempting to connect : %s\n", WIFI_USER);
    WiFi.reconnect();
    int connectionStatus = WiFi.waitForConnectResult();
    Serial.printf("Connection status: %s\n", getWiFiStatus().c_str());  
}
*/
String getWiFiStatus(){
  switch(WiFi.status())
  {
    case 0:
      // WL_IDLE_STATUS
      return "Idle"; 
      break;  
    case 1:
      // WL_NO_SSID_AVAILABLE
      return "SSID Not Available"; 
      break;  
    case 2:
      // WL_SCAN_COMPLETED
      return "Scan Completed"; 
      break;  
    case 3:
      // WL_CONNECTED
      return "Connected"; 
      break;  
    case 4:
      // WL_CONNECT_FAILED
      return "Connection Failed"; 
      break;  
    case 5:
      // WL_CONNECTION_LOST
      return "Connection Lost"; 
      break;  
    case 6:
      // WL_DISCONNECTED
      return "Disconnected"; 
      break;     
    case 255:
      // WL_NO_SHIELD
      return "No Sheild"; 
      break;           
    default:
      return "Unknown";
    break;
  }
}
