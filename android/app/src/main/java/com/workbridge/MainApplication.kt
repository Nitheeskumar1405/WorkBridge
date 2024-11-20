package com.workbridge

import android.app.Application
import com.facebook.react.PackageList
import com.facebook.react.ReactApplication
import com.facebook.react.ReactHost
import com.facebook.react.ReactNativeHost
import com.facebook.react.ReactPackage
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.load
import com.facebook.react.defaults.DefaultReactHost.getDefaultReactHost
import com.facebook.react.defaults.DefaultReactNativeHost
import com.facebook.react.soloader.OpenSourceMergedSoMapping
import com.facebook.soloader.SoLoader

class MainApplication : Application(), ReactApplication {

    // ReactNativeHost for both default and new architecture support
    private val mReactNativeHost: ReactNativeHost = object : DefaultReactNativeHost(this) {
        // Add your app's packages here
        override fun getPackages(): List<ReactPackage> =
            PackageList(this).packages.apply {
                // Add additional packages that cannot be autolinked here
                // Example: add(MyReactNativePackage())
            }

        // Specify the JavaScript entry file (default is "index")
        override fun getJSMainModuleName(): String = "index"

        // Enable developer support in debug mode (disable Bridgeless Mode)
        override fun getUseDeveloperSupport(): Boolean = BuildConfig.DEBUG

        // New architecture and Hermes settings
        override val isNewArchEnabled: Boolean = BuildConfig.IS_NEW_ARCHITECTURE_ENABLED
        override val isHermesEnabled: Boolean = BuildConfig.IS_HERMES_ENABLED
    }

    // ReactNativeHost getter for default architecture
    override val reactNativeHost: ReactNativeHost
        get() = mReactNativeHost

    // ReactHost getter for new architecture
    override val reactHost: ReactHost
        get() = getDefaultReactHost(applicationContext, reactNativeHost)

    override fun onCreate() {
        super.onCreate()
        // Initialize SoLoader
        SoLoader.init(this, OpenSourceMergedSoMapping)

        // Load new architecture native entry point if enabled
        if (BuildConfig.IS_NEW_ARCHITECTURE_ENABLED) {
            load()
        }
    }
}
