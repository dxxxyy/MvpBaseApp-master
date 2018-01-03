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
package com.visionvera.vviptv.ui.presenter;

import android.util.Log;

import com.visionvera.vviptv.api.HealthApi;
import com.visionvera.vviptv.base.Constant;
import com.visionvera.vviptv.base.RxPresenter;
import com.visionvera.vviptv.bean.LoginInfo;
import com.visionvera.vviptv.bean.base.BaseResponse;
import com.visionvera.vviptv.ui.contract.LoginContract;

import javax.inject.Inject;

import rx.Observer;
import rx.Subscription;
import rx.android.schedulers.AndroidSchedulers;
import rx.schedulers.Schedulers;

/**
 * @author xux.
 * @date 2017/12/27.
 */
public class LoginPresenter extends RxPresenter<LoginContract.View> implements LoginContract.Presenter<LoginContract.View> {

    private HealthApi healthApi;

    private static final String TAG = "LoginPresenter";

    @Inject
    public LoginPresenter(HealthApi healthApi) {
        this.healthApi = healthApi;
    }

    public void login(String account, String password) {
        Subscription rxSubscription = healthApi.login(account, password).subscribeOn(Schedulers.io())
                .observeOn(AndroidSchedulers.mainThread())
                .subscribe(new Observer<BaseResponse<LoginInfo>>() {
                    @Override
                    public void onNext(BaseResponse<LoginInfo> baseData) {
                        if (baseData != null && (Constant.REQUEST_SUCCESS).equals(baseData.code) && mView != null) {
                            mView.loginSuccess(baseData.data);
                        }
                    }

                    @Override
                    public void onCompleted() {
                    }

                    @Override
                    public void onError(Throwable e) {
                        Log.e(TAG, "onError: " + e);
                    }
                });
        addSubscrebe(rxSubscription);
    }

}
