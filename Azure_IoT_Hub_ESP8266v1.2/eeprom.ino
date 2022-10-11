
void writeWord(String kata) {
  delay(10);

  for (int i = 0; i < kata.length(); ++i) {
    Serial.println(kata[i]);
    EEPROM.write(i, kata[i]);
  }

  EEPROM.write(kata.length(), '\0');
  EEPROM.commit();
}

String readWord() {
  String word;
  char readChar;
  int i = 0;

  while (readChar != '\0') {
    readChar = char(EEPROM.read(i));
    delay(10);
    i++;

    if (readChar != '\0') {
      word += readChar;
    }
  }

  return word;
}

int writeEEPROM (String kata, int address){
  EEPROM.begin (512);
  Serial.println("Writing to eeprom this msg:");
  Serial.println(kata);
  EEPROM.put (address, kata);
  address += sizeof(kata);
  EEPROM.commit();
  EEPROM.end();
  return address;
}

String readEEPROM(int address){
  String kata;
  EEPROM.begin (512);
  EEPROM.get(address, kata);
  Serial.println("Data from EEPROM:");
  Serial.println(kata);
  EEPROM.end();
  return kata;
}
