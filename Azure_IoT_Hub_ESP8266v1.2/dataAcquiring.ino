void sensor_calib(){
  Serial.println("Calibrating...");

  calibrate_distance1 = (calibration_duration_1 / 2) * 0.0343;
  calibrate_distance2 = (calibration_duration_2 / 2) * 0.0343;
  calibrate_distance3 = (calibration_duration_3 / 2) * 0.0343;
  
 //Kalibrasi sensor 1
  calibrate_distance_max1 = 1.15 * calibrate_distance1 ; //The threshold is plus minus 15 %  from calibrate value
  // If the number of calibration distance 20 then the threshold would be 
  calibrate_distance_min1 = 0.85 * calibrate_distance1 ; //The threshold is plus minus 15 %  from calibrate value
  // If the number of calibration distance 20 then the threshold would be 

  if (calibrate_distance_min1 < MIN_DISTANCE) { //If the calibration gave a reading outside of sensible bounds, then the default is used
    calibrate_distance_min1 = DEFAULT_DISTANCE_MIN ;
  }
  if (calibrate_distance_max1 > MAX_DISTANCE ) { //If the calibration gave a reading outside of sensible bounds, then the default is used
    calibrate_distance_max1 = DEFAULT_DISTANCE_MAX;
   }
  
  //delay(1000);
  Serial.print("D1_Min : ");
  Serial.println(calibrate_distance_min1);
  Serial.print("D1_Max : ");
  Serial.println(calibrate_distance_max1);
  
  // kalibrasi sensor 2
  calibrate_distance_max2 = 1.15 * calibrate_distance2 ; //The threshold is plus minus 15 %  from calibrate value
  // If the number of calibration distance 20 then the threshold would be 
  calibrate_distance_min2 = 0.85 * calibrate_distance2 ; //The threshold is plus minus 15 %  from calibrate value
  // If the number of calibration distance 20 then the threshold would be 

  if (calibrate_distance_min2 < MIN_DISTANCE) { //If the calibration gave a reading outside of sensible bounds, then the default is used
    calibrate_distance_min2 = DEFAULT_DISTANCE_MIN;
  }
  if (calibrate_distance_max2 > MAX_DISTANCE ) { //If the calibration gave a reading outside of sensible bounds, then the default is used
    calibrate_distance_max2 = DEFAULT_DISTANCE_MAX;
  }
 
  //delay(1000);
  Serial.print("D2_Min : ");
  Serial.println(calibrate_distance_min2);
  Serial.print("D2_Max : ");
  Serial.println(calibrate_distance_max2);
  
  // kalibrasi sensor 3
  calibrate_distance_max3 = 1.15 * calibrate_distance3 ; //The threshold is plus minus 15 %  from calibrate value
  // If the number of calibration distance 20 then the threshold would be 
  calibrate_distance_min3 = 0.85 * calibrate_distance3 ; //The threshold is plus minus 15 %  from calibrate value
  // If the number of calibration distance 20 then the threshold would be 

  if (calibrate_distance_min3 < MIN_DISTANCE) { //If the calibration gave a reading outside of sensible bounds, then the default is used
    calibrate_distance_min3 = DEFAULT_DISTANCE_MIN;
  }
  if (calibrate_distance_max3 > MAX_DISTANCE ) { //If the calibration gave a reading outside of sensible bounds, then the default is used
    calibrate_distance_max3 = DEFAULT_DISTANCE_MAX;
  }
  //delay(1000);
  Serial.print("D3_Min : ");
  Serial.println(calibrate_distance_min3);
  Serial.print("D3_Max : ");
  Serial.println(calibrate_distance_max3);

  Serial.println("Calibration DONE...");
}



int sensor_routines_new (){
  T_timer = millis();
  //  // Determine distance from duration
   duration1 = sonar[0].ping_median(iterations);//sensor 1
   duration2 = sonar[1].ping_median(iterations); // sensor 2
   duration3 = sonar[2].ping_median(iterations); // sensor 3
  
//  // Use 343 metres per second as speed of sound
   distance1 = (duration1 / 2) * 0.0343; //sensor 1
   distance2 = (duration2 / 2) * 0.0343; // sensor 2
   distance3 = (duration3 / 2) * 0.0343; // sensor 3

   Serial.print("T Timer : ");
   Serial.println(T_timer);
   Serial.println("");
   Serial.print("D1 : ");
   
   Serial.println(distance1);
   Serial.print("D2 : ");
   Serial.println(distance2);
   Serial.print("D3 : ");
   Serial.println(distance3);
   Serial.println("");

//kondisi 1 D >B Not all sensor triggered dan T initial {dibagian newping gak ada triger sensor}
/***
 * Default di taro di paling bawah ,else
 * Default = Tidak ada objek ataupun noise
 * Ketika Tinit not true, maka jadi true
 * Ketika Xinit not true, maka jadi true
 */
  if(distance1 < calibrate_distance_min1 &&
            (distance2 < calibrate_distance_min2 ||
            distance3 < calibrate_distance_min3) 
            && T_initial == true && X_initial == true){
        /*
         * Kondisi 2
         */
        total_interval = T_timer - previous_interval;
        Serial.print("Total interval : ");
        Serial.println(total_interval);
        Serial.println("");
        
        previous_T_timer = T_timer;
        Serial.print("Previous T Timer : ");
        Serial.println(previous_T_timer);
        Serial.println("");
        T_initial = false;
  //    delay(20000);
        return 2;
    
   }else if (distance1 < calibrate_distance_min1 &&
            (distance2 < calibrate_distance_min2 || distance3 < calibrate_distance_min3) 
             && T_initial == false  && X_initial == true){
        /*
         * Kondisi 6
         */
         /***
         * 
         * Ini validasi 20 detik
         */
        if (T_timer - previous_T_timer >= Tx_timer ) {
            /* Event code */
            X_initial = true;
            object_person = true;
            //LED CODE     
            /* Update the timing for the next time around */
        //    previous_T_timer = T_timer;//Untuk menandakan awal timer person
            //bagian interval
            // Untuk menandakan berakhirnya interval  
            previous_interval = 0;
            return 61;    
        }
        else{
    //      T_initial = true;
            return 60;
        }  
   }else if (distance1 > calibrate_distance_min1 &&
            distance3 > calibrate_distance_min3 
            && X_initial == false && T_initial == false){
       /*
        * Kondisi 4
        */
        if (T_timer - previous_X_timer >= Tx_timer ) {
        /* Event code */
          T_total = T_timer - previous_T_timer - Tx_timer;
          Serial.print("Previous T Timer : ");
          Serial.println(previous_T_timer);
          Serial.println("");
          Serial.print("Timer Total : ");
          Serial.println(T_total);
          Serial.println("");
         /* Update the timing for the next time around */
          previous_interval = T_timer;//menandakan awal interval
          count++;
          Serial.print("Total orang : ");
          Serial.println(count);
          Serial.print("Previous Interval : ");
          Serial.println(previous_interval);
          Serial.println("");
          object_person = false;
          X_initial = true;
          T_initial = true;
          previous_X_timer = 0;
          previous_T_timer = 0;
          return 40;
        }else{
          return 41;
        }
        /*
         * YANG KONDISI 5, D2 nya diilangin dulu, harusnya && && semua
         * 
         * 
         */
   }else if (distance1 > calibrate_distance_min1  &&
            distance3 > calibrate_distance_min3 
            && X_initial == true && object_person == true && T_initial == false){
      /*
       * Kondisi 5
       */
        X_initial = false;
        previous_X_timer = T_timer;
        //delay(20000);
        return 51;       
   }else{
    /* default
     *
     */
       if (object_person){
          X_initial = true;
          return 10;
       }else{
          T_initial = true;
          previous_T_timer = 0;
          return 11;
       }
   }
  
}
