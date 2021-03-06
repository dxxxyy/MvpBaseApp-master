/**
 * Copyright 2016 JustWayward Team
 * <p>
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * <p>
 * http://www.apache.org/licenses/LICENSE-2.0
 * <p>
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package com.visionvera.vviptv;

import android.app.Application;
import android.content.Context;

import com.squareup.leakcanary.LeakCanary;
import com.squareup.leakcanary.RefWatcher;
import com.visionvera.vviptv.component.AppComponent;
import com.visionvera.vviptv.component.DaggerAppComponent;
import com.visionvera.vviptv.module.AppModule;
import com.visionvera.vviptv.module.HealthApiModule;
import com.visionvera.vviptv.utils.AppUtils;
import com.visionvera.vviptv.utils.SharedPreferencesUtil;

/**
 * @author xux.
 * @date 2017/12/25.
 */
public class HealthApplication extends Application {

    private static HealthApplication sInstance;
    private AppComponent appComponent;

    private RefWatcher refWatcher;

    public static RefWatcher getRefWatcher(Context context) {
        HealthApplication application = (HealthApplication) context.getApplicationContext();
        return application.refWatcher;
    }

    @Override
    public void onCreate() {
        super.onCreate();
        refWatcher = LeakCanary.install(this);
        sInstance = this;
        initCompoent();
        AppUtils.init(this);
        initPrefs();
    }

    public static HealthApplication getsInstance() {
        return sInstance;
    }

    private void initCompoent() {
        appComponent = DaggerAppComponent.builder()
                .healthApiModule(new HealthApiModule())
                .appModule(new AppModule(this))
                .build();
    }

    public AppComponent getAppComponent() {
        return appComponent;
    }

    /**
     * 初始化SharedPreference
     */
    protected void initPrefs() {
        SharedPreferencesUtil.init(getApplicationContext(), getPackageName() + "_preference", Context.MODE_MULTI_PROCESS);
    }

}
