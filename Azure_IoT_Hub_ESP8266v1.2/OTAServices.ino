void update_started() {
  Serial.println("CALLBACK:  HTTP update process started");
}

void update_finished() {
  Serial.println("CALLBACK:  HTTP update process finished");
}

void update_progress(int cur, int total) {
  Serial.printf("CALLBACK:  HTTP update process at %d of %d bytes...\n", cur, total);
}

void update_error(int err) {
  Serial.printf("CALLBACK:  HTTP update fatal error code %d\n", err);
}

void OTAinit(){
  ESPhttpUpdate.onStart(update_started);
  ESPhttpUpdate.onEnd(update_finished);
  ESPhttpUpdate.onProgress(update_progress);
  ESPhttpUpdate.onError(update_error);
}

void OTAupdate(){
  WiFiClientSecure ping_clientV;

  ping_clientV.setInsecure();
  OTAinit();
  Serial.println(server_ver);
  int yy = writeEEPROM(server_ver, 0);
  current_ver = readEEPROM(0);
  Serial.println(current_ver);
  //delay(5000);
  
  int err = -1;
  while (err<0){
   
    t_httpUpdate_return ret = ESPhttpUpdate.update(ping_clientV, source);
    err = ESPhttpUpdate.getLastError();
   
    switch (ret) {
      case HTTP_UPDATE_FAILED: Serial.printf("HTTP_UPDATE_FAILD Error (%d): %s\n", ESPhttpUpdate.getLastError(), ESPhttpUpdate.getLastErrorString().c_str()); break;
  
      case HTTP_UPDATE_NO_UPDATES: Serial.println("HTTP_UPDATE_NO_UPDATES"); break;
  
      case HTTP_UPDATE_OK: Serial.println("HTTP_UPDATE_OK"); break;
    }
  }
  //delay(5000);
}
