package com.cmput660.com.universityparking;

import android.os.Build;
import android.os.Bundle;
import android.os.Handler;
import android.support.v4.widget.SwipeRefreshLayout;
import android.support.v7.app.AppCompatActivity;
import android.view.Menu;
import android.view.MenuItem;
import android.webkit.WebSettings;
import android.webkit.WebView;

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;

public class MainActivity extends AppCompatActivity {
    private WebView parkingWebView;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        final SwipeRefreshLayout swipeView =(SwipeRefreshLayout)findViewById(R.id.swipe);
        parkingWebView = (WebView) findViewById(R.id.webView);
        WebSettings parkingWebSettings = parkingWebView.getSettings();
        parkingWebSettings.setJavaScriptEnabled(true);

        //Enable HTML5 support
        parkingWebSettings.setAllowFileAccess(true);
        if (Build.VERSION.SDK_INT>=Build.VERSION_CODES.ECLAIR) {
            try {
                //Log.d(TAG, "Enabling HTML5-Features");
                Method m1 = WebSettings.class.getMethod("setDomStorageEnabled", new Class[]{Boolean.TYPE});
                m1.invoke(parkingWebSettings, Boolean.TRUE);

                Method m2 = WebSettings.class.getMethod("setDatabaseEnabled", new Class[]{Boolean.TYPE});
                m2.invoke(parkingWebSettings, Boolean.TRUE);

                Method m3 = WebSettings.class.getMethod("setDatabasePath", new Class[]{String.class});
                m3.invoke(parkingWebSettings, "/data/data/" + getPackageName() + "/databases/");

                Method m4 = WebSettings.class.getMethod("setAppCacheMaxSize", new Class[]{Long.TYPE});
                m4.invoke(parkingWebSettings, 1024*1024*8);

                Method m5 = WebSettings.class.getMethod("setAppCachePath", new Class[]{String.class});
                m5.invoke(parkingWebSettings, "/data/data/" + getPackageName() + "/cache/");

                Method m6 = WebSettings.class.getMethod("setAppCacheEnabled", new Class[]{Boolean.TYPE});
                m6.invoke(parkingWebSettings, Boolean.TRUE);

               // Log.d(TAG, "Enabled HTML5-Features");
            }
            catch (NoSuchMethodException e) {
               // Log.e(TAG, "Reflection fail", e);
            }
            catch (InvocationTargetException e) {
              //  Log.e(TAG, "Reflection fail", e);
            }
            catch (IllegalAccessException e) {
              //  Log.e(TAG, "Reflection fail", e);
            }
        }



        swipeView.setColorSchemeResources(android.R.color.holo_blue_dark,android.R.color.holo_blue_light, android.R.color.holo_green_light,android.R.color.holo_green_dark);
        swipeView.setOnRefreshListener(new SwipeRefreshLayout.OnRefreshListener()
        {
            @Override
            public void onRefresh()
            {
                swipeView.setRefreshing(true);
                ( new Handler()).postDelayed(new Runnable()
                {
                    @Override
                    public void run()
                    {
                        swipeView.setRefreshing(false);
                        parkingWebView.reload();
                        //parkingWebView.loadUrl("http://www.youtube.com");
                    }
                }, 4000);
            }
        });
        if (CheckWiFi.isNetworkConnected(MainActivity.this)){
            parkingWebView.setWebViewClient(new ParkingWebViewClient());

            //parkingWebView.loadUrl("http://www.youtube.com");
            parkingWebView.loadUrl("http://199.116.235.151/mobile");

        }
        else
        {
            parkingWebView.loadUrl("file:///android_asset/error.html");
        }
    }

    public void onBackPressed() {
        if(parkingWebView.canGoBack()) {
            parkingWebView.goBack();
        }
        else{
            super.onBackPressed();
        }

    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.menu_main, menu);
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        // Handle action bar item clicks here. The action bar will
        // automatically handle clicks on the Home/Up button, so long
        // as you specify a parent activity in AndroidManifest.xml.
        int id = item.getItemId();

        //noinspection SimplifiableIfStatement
        if (id == R.id.action_settings) {
            return true;
        }

        return super.onOptionsItemSelected(item);
    }
}
