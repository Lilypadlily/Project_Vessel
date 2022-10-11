void httpV_ping (int a, int b, int c){
  WiFiClientSecure ping_clientV;
  HTTPClient httpV;

  ping_clientV.setInsecure();
  mqtt_client.disconnect();
  
  ping_clientV.connect(serverName, httpsPort);
  String serverPath = serverName + "api/device/1/6/8";
  //String serverPath = serverName;
  httpV.begin(ping_clientV, serverPath.c_str());
  
  // Send HTTP GET request
  int httpResponseCode = -99;
  while (httpResponseCode < 0){
    httpResponseCode = httpV.GET();
  
    if (httpResponseCode>0) {
      Serial.print("HTTP Response code: ");
      Serial.println(httpResponseCode);
      //String payload = httpV.getString();
      //Serial.println(payload);
    }
    else {
      Serial.print("Error code: ");
      Serial.println(httpResponseCode);
    }
    
  }
  
  httpV.end();
  ping_clientV.stop();
}

void versionCheck(){
  WiFiClientSecure ping_clientV;
  HTTPClient httpV;

  ping_clientV.setInsecure();
  mqtt_client.disconnect();
  
  ping_clientV.connect(OTA_server, httpsPort);
  //String serverPath = serverName + "api/device/"+a+"/"+b+"/"+c;
  httpV.begin(ping_clientV, OTA_server.c_str());
  
  // Send HTTP GET request
  int httpResponseCode = -1;
  while (httpResponseCode < 0){
    httpResponseCode = httpV.GET();
  
    if (httpResponseCode>0) {
      Serial.print("HTTP Response code: ");
      Serial.println(httpResponseCode);
      String payload = httpV.getString();
      Serial.println(payload);
      DeserializationError error = deserializeJson(doc, payload);

      // Test if parsing succeeds.
      if (error) {
        Serial.println("error des");
      }
      String ver = doc["SoftwareVersion"];
      String source1 = doc["SoftwareRepository"];
      String test;
      server_ver = ver;
      source = source1;
      serializeJson (doc, test);
      //Serial.print(test);
      Serial.print ("Source : ");
      Serial.println (source1);
      Serial.print("Latest ver : ");
      Serial.println(ver);
      Serial.print("Current ver : ");
      Serial.println(current_ver);
      
      if (ver != current_ver){
        Serial.println("Update needed");
        ada_update = 1;
        writeWord(ver);
        //Serial.println("System restarting...");
        delay(5000);
          
         
      }
    
    }
    else {
      Serial.print("Error code: ");
      Serial.println(httpResponseCode);
    }
    
  }
  httpV.end();
  ping_clientV.stop();
  
}
