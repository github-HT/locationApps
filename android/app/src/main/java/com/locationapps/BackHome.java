package com.locationapps;

import android.content.Intent;

import androidx.core.app.ActivityCompat;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;


public class BackHome extends ReactContextBaseJavaModule {
    private static ReactApplicationContext reactContext;

    private static final String DURATION_SHORT_KEY = "SHORT";
    private static final String DURATION_LONG_KEY = "LONG";


    public BackHome(ReactApplicationContext context) {
        super(context);
        reactContext = context;
    }

    @Override
    public String getName() {
        return "BackHome";
    }

    @ReactMethod
    public void go() {
        //启动一个意图,回到桌面
        Intent backHome = new Intent(Intent.ACTION_MAIN);
        backHome.addCategory(Intent.CATEGORY_HOME);
        ActivityCompat.startActivity(getCurrentActivity(), backHome, null);
    }
}