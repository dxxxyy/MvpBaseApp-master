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
package com.visionvera.vviptv.api;

import com.visionvera.vviptv.base.Constant;
import com.visionvera.vviptv.bean.LoginInfo;
import com.visionvera.vviptv.bean.base.BaseRequest;
import com.visionvera.vviptv.bean.base.BaseResponse;
import com.visionvera.vviptv.bean.request.LoginRequest;

import okhttp3.OkHttpClient;
import retrofit2.Retrofit;
import retrofit2.adapter.rxjava.RxJavaCallAdapterFactory;
import retrofit2.converter.gson.GsonConverterFactory;
import rx.Observable;

/**
 *
 *
 * @author xux.
 * @date 2017/12/25.
 */
public class HealthApi {

    public static HealthApi instance;

    private HealthApiService service;

    public HealthApi(OkHttpClient okHttpClient) {
        Retrofit retrofit = new Retrofit.Builder()
                .baseUrl(Constant.API_BASE_URL)
                .addCallAdapterFactory(RxJavaCallAdapterFactory.create()) // 添加Rx适配器
                .addConverterFactory(GsonConverterFactory.create()) // 添加Gson转换器
                .client(okHttpClient)
                .build();
        service = retrofit.create(HealthApiService.class);
    }

    public static HealthApi getInstance(OkHttpClient okHttpClient) {
        if (instance == null)
            instance = new HealthApi(okHttpClient);
        return instance;
    }

    public Observable<BaseResponse<LoginInfo>> login(String account, String password) {
        LoginRequest loginRequest = new LoginRequest();
        loginRequest.setAccount(account);
        loginRequest.setPassword(password);
        return service.login(new BaseRequest("account/login", loginRequest));
    }

}
