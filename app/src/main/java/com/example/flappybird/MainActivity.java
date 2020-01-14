package com.example.flappybird;

import androidx.appcompat.app.AppCompatActivity;

import android.annotation.SuppressLint;
import android.os.Bundle;
import android.webkit.WebChromeClient;
import android.webkit.WebView;
import android.webkit.WebViewClient;

public class MainActivity extends AppCompatActivity {

    @SuppressLint("SetJavaScriptEnabled")
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        WebView web = (WebView)findViewById(R.id.webView);
        web.getSettings().setJavaScriptEnabled(true);
       //web.setWebChromeClient(new WebChromeClient());

        web.setWebViewClient(new WebViewClient() {
            @Override
            public boolean shouldOverrideUrlLoading(WebView web, String url) {
                web.loadUrl(url);
                return true;
            }
        });
        web.loadUrl("file:///android_asset/www/index.html");

    }


}

