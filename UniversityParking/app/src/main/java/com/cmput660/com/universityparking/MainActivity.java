package com.cmput660.com.universityparking;

import android.os.Bundle;
import android.os.Handler;
import android.support.v4.widget.SwipeRefreshLayout;
import android.support.v7.app.AppCompatActivity;
import android.view.Menu;
import android.view.MenuItem;
import android.webkit.WebSettings;
import android.webkit.WebView;

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

            parkingWebView.loadUrl("http://www.youtube.com");

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
